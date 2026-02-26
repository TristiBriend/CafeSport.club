import { Link } from "react-router-dom";
import ObjectCardFrame from "./ObjectCardFrame";
import { COMMENT_MODE, getAllComments } from "../services/commentsService";

function toPercentScore(value) {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  const scaled = raw <= 10 ? raw * 10 : raw;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

function getUserMetric(user) {
  const comments = getAllComments().filter((comment) => {
    if (comment.userId && comment.userId === user.id) return true;
    return String(comment.author || "").trim() === String(user.name || "").trim();
  });
  const reviews = comments.filter((comment) => comment.commentType === COMMENT_MODE.REVIEW);
  if (reviews.length) {
    const avg = reviews.reduce((sum, review) => sum + toPercentScore(review.rating), 0) / reviews.length;
    return Math.round(avg);
  }
  const followers = Number(user.followers || 0);
  return Math.max(15, Math.min(95, Math.round(Math.log10(followers + 10) * 28)));
}

function UserCard({
  user,
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
}) {
  if (!user) return null;

  const favoriteSport = Array.isArray(user.favoriteSports) && user.favoriteSports.length
    ? user.favoriteSports[0]
    : "Profil";

  return (
    <ObjectCardFrame
      objectType="user"
      objectId={user.id}
      title={user.name}
      sportLabel={favoriteSport}
      metricValue={getUserMetric(user)}
      image={user.image}
      fallbackLabel={user.name}
      primaryPath={`/user/${user.id}`}
      primaryActionLabel={`Aller a ${user.name}`}
      size={size}
      variant={variant}
      showTags={showTags}
      showMenu={showMenu}
      className={`is-user-card ${className}`.trim()}
      baseFollowCount={Number(user.followers || 0)}
    >
      <p className="object-card-line object-card-line-title typo-body-strong">
        <Link className="object-card-inline-link" to={`/user/${user.id}`}>
          {user.name}
        </Link>
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {user.handle || "@user"} · {user.location || "Monde"}
      </p>
      <p className="object-card-line object-card-line-meta typo-meta">
        {Number(user.followers || 0).toLocaleString("fr-FR")} followers
      </p>
    </ObjectCardFrame>
  );
}

export default UserCard;
