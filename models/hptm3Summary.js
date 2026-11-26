/* ============================================================
   hptm3Summary.js
   Turns the rows of the existing GetHPTM3 stored procedure into the
   day summary the HPTM 3 dashboard shows. No new SQL objects are needed.

   GetHPTM3 returns one row per second in which a tag was logged, with
     TestDateTime, InchargeName, OperatorName, PipeDiameter, PipeClass,
     TotalTestedPipes, TotalPassedPipes, TotalRejectedPipes, ReWorkCount,
     MaxPressure1 ...
   The four "Total" columns are PLC running totals, so the pipes of a period are the
   DIFFERENCE between one reading and the one before it.

   Production day = selDate 06:00 to the next day 06:00.
   Shifts: A 06:00-14:00, B 14:00-22:00, C 22:00-06:00.
   ============================================================ */

const DAY_START_HOUR = 6;

/** Rows are read this long BEFORE the day, so the first reading inside it has a previous total to subtract from. */
const PREROLL_HOURS = 6;

/** One step of a running total larger than this is not a real number of pipes (logger gap or PLC glitch), so it is ignored. */
const MAX_STEP = 20;

const HOUR_MS = 3600 * 1000;

/** [column in GetHPTM3, field of the summary row] */
const COUNTERS = [
  ["TotalTestedPipes", "TestedPipes"],
  ["TotalPassedPipes", "PassedPipes"],
  ["TotalRejectedPipes", "RejectedPipes"],
  ["ReWorkCount", "ReworkPipes"],
];

const SHIFT_ORDER = { A: 1, B: 2, C: 3 };

/**
 * Times are handled as "wall-clock milliseconds": the plant's clock time written as if it were UTC.
 * That is exactly what the mssql driver hands back for a DATETIME2 column, and what the dashboard
 * strips the trailing "Z" from, so everything lines up without any time-zone arithmetic.
 */
function wallMs(v) {
  if (v instanceof Date) return v.getTime();
  if (v === null || v === undefined || v === "") return NaN;
  const s = String(v).trim().replace(" ", "T");
  return Date.parse(/(Z|[+-]\d\d:?\d\d)$/.test(s) ? s : s + "Z");
}

function num(v) {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function has(v) {
  return v !== null && v !== undefined && String(v).trim() !== "";
}

function shiftOf(ms) {
  const h = new Date(ms).getUTCHours();
  if (h >= 6 && h < 14) return "A";
  if (h >= 14 && h < 22) return "B";
  return "C";
}

/**
 * 'YYYY-MM-DD' -> the window to read from GetHPTM3.
 * from / to are ISO text (YYYY-MM-DDTHH:mm:ss). They are sent as VARCHAR and converted by SQL Server,
 * so the result does not depend on the Node server's time zone or on the SQL language setting.
 */
function dayWindow(selDate) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(selDate));
  if (!m) throw new Error("selDate must be in YYYY-MM-DD format.");
  const start = Date.UTC(+m[1], +m[2] - 1, +m[3], DAY_START_HOUR);
  const end = start + 24 * HOUR_MS;
  const iso = (ms) => new Date(ms).toISOString().slice(0, 19);
  return { start, end, from: iso(start - PREROLL_HOURS * HOUR_MS), to: iso(end) };
}

/**
 * Pipes added by one running total.
 * points = [{ i: row index, v: value }] of the readings that carry this total, oldest first.
 */
function increments(points) {
  const out = [];
  let prev = null;
  for (let k = 0; k < points.length; k++) {
    const { i, v } = points[k];
    if (prev === null) { prev = v; continue; }
    // A single reading that dips and comes straight back is PLC noise: skip it, keep the old baseline.
    if (v < prev && k + 1 < points.length && points[k + 1].v >= prev) continue;
    let d = v - prev;
    if (d < 0) d = v;            // the total was reset: the new value is what has been counted since
    prev = v;
    if (d > 0 && d <= MAX_STEP) out.push({ i, d });
  }
  return out;
}

/**
 * rows = recordset of GetHPTM3 (or GetHPTM3_Shift_Summary, same columns) read with dayWindow(selDate).
 * Returns the rows the dashboard reads:
 *   ReportDate, Shift, INCHARGENAME, OPERATORNAME, PIPECLASSNAME, PipeDia,
 *   TestedPipes, PassedPipes, RejectedPipes, ReworkPipes, MaxPressure1
 */
function summarise(rows, selDate) {
  const { start, end } = dayWindow(selDate);

  const list = (rows || [])
    .map((r) => ({ r, t: wallMs(r.TestDateTime) }))
    .filter((x) => Number.isFinite(x.t))
    .sort((a, b) => a.t - b.t);

  // 1) every reading gets the latest known incharge, operator, size and class
  //    (a reading that did not log them still belongs to the same set-up)
  let incharge = null, operator = null, dia = null, cls = null;
  const info = list.map(({ r, t }) => {
    if (has(r.InchargeName)) incharge = String(r.InchargeName).trim();
    if (has(r.OperatorName)) operator = String(r.OperatorName).trim();
    const d = num(r.PipeDiameter);
    if (d !== null) dia = d;
    if (has(r.PipeClass)) cls = String(r.PipeClass).trim();
    return { t, shift: shiftOf(t), incharge, operator, dia, cls };
  });

  const groups = new Map();
  const keyOf = (x) => [x.shift, x.cls, x.dia, x.incharge, x.operator].join("|");
  const groupOf = (x) => {
    const k = keyOf(x);
    let g = groups.get(k);
    if (!g) {
      g = {
        ReportDate: selDate,
        Shift: x.shift,
        INCHARGENAME: x.incharge,
        OPERATORNAME: x.operator,
        PIPECLASSNAME: x.cls,
        PipeDia: x.dia,
        TestedPipes: 0, PassedPipes: 0, RejectedPipes: 0, ReworkPipes: 0,
        MaxPressure1: null,
      };
      groups.set(k, g);
    }
    return g;
  };

  // 2) pipes = increase of each running total, counted for the set-up and shift of the reading that shows it
  for (const [col, field] of COUNTERS) {
    const points = [];
    list.forEach(({ r }, i) => {
      const v = num(r[col]);
      if (v !== null) points.push({ i, v });
    });
    for (const { i, d } of increments(points)) {
      const x = info[i];
      if (x.t < start || x.t >= end) continue;   // readings before 06:00 only provide the starting value
      groupOf(x)[field] += d;
    }
  }

  // 3) highest test pressure seen for each set-up
  list.forEach(({ r }, i) => {
    const x = info[i];
    const p = num(r.MaxPressure1);
    if (p === null || x.t < start || x.t >= end) return;
    const g = groups.get(keyOf(x));
    if (g && (g.MaxPressure1 === null || p > g.MaxPressure1)) g.MaxPressure1 = p;
  });

  return [...groups.values()].sort((a, b) =>
    (SHIFT_ORDER[a.Shift] - SHIFT_ORDER[b.Shift]) ||
    String(a.PIPECLASSNAME).localeCompare(String(b.PIPECLASSNAME)) ||
    ((a.PipeDia ?? 0) - (b.PipeDia ?? 0)) ||
    String(a.INCHARGENAME).localeCompare(String(b.INCHARGENAME)) ||
    String(a.OPERATORNAME).localeCompare(String(b.OPERATORNAME)));
}

module.exports = { summarise, dayWindow, increments, shiftOf, wallMs, MAX_STEP, PREROLL_HOURS };