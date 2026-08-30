/**
 * Responsive scaling shell for micro-UI previews (code terminals, gauges, node graphs).
 * Allows horizontal pan on narrow viewports without expanding the page width.
 */
export default function MicroUiScale({ children, className = "" }) {
  return (
    <div
      className={`w-full min-w-0 overflow-x-auto scrollbar-none sm:overflow-x-visible ${className}`}
    >
      {children}
    </div>
  );
}
