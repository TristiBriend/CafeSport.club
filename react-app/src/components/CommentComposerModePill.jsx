import ScoreBadge from "./ScoreBadge";

function CommentComposerModePill({ mode = "comment" }) {
  if (mode !== "teaser" && mode !== "live" && mode !== "review") return null;

  const label = mode === "teaser"
    ? "Teaser"
    : (mode === "live" ? "Live" : "Critique");
  const badgeVariant = mode === "teaser"
    ? "teaser-chip"
    : (mode === "live" ? "live-chip" : "review-chip");

  return (
    <div className="comment-composer-mode-pill" aria-label={`Mode ${label.toLowerCase()}`}>
      <ScoreBadge variant={badgeVariant} />
      <span className="comment-composer-mode-label">{label}</span>
    </div>
  );
}

export default CommentComposerModePill;
