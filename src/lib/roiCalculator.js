/**
 * ROI projection model — conservative, speed-to-conversion heuristics.
 * Used by the interactive performance impact calculator.
 */

const TARGET_LOAD_SEC = 0.75;

/** Rough Lighthouse score → LCP seconds (marketing estimate). */
export function scoreToLoadTime(score) {
  const clamped = Math.min(100, Math.max(30, score));
  return 4.6 - (clamped / 100) * 3.2;
}

export function computeRoiProjection({
  traffic,
  orderValue,
  speedScore,
}) {
  const currentLoad = scoreToLoadTime(speedScore);
  const targetLoad = TARGET_LOAD_SEC;
  const loadImprovementSec = Math.max(0, currentLoad - targetLoad);

  // ~6% relative conversion lift per 0.5s saved + penalty for sub-70 scores
  const conversionLiftPct = Math.min(
    48,
    Math.round((loadImprovementSec / 0.5) * 6 + Math.max(0, 72 - speedScore) * 0.12)
  );

  const baselineConversion = 0.022;
  const improvedConversion =
    baselineConversion * (1 + conversionLiftPct / 100);

  const monthlyRevenueBefore = traffic * baselineConversion * orderValue;
  const monthlyRevenueAfter = traffic * improvedConversion * orderValue;
  const revenueLift = Math.max(0, monthlyRevenueAfter - monthlyRevenueBefore);

  return {
    conversionLiftPct,
    revenueLift,
    currentLoadSec: currentLoad,
    targetLoadSec: targetLoad,
    loadImprovementSec,
    monthlyRevenueBefore,
    monthlyRevenueAfter,
  };
}

export function formatTraffic(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(Math.round(n));
}

export function formatCurrency(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `$${Math.round(n / 1000)}k`;
  if (n >= 1_000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${Math.round(n).toLocaleString()}`;
}

export function formatSeconds(n) {
  return `${n.toFixed(2)}s`;
}
