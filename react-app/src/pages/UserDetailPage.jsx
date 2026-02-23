import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ObjectTagsWidget from "../components/ObjectTagsWidget";
import ScoreBadge from "../components/ScoreBadge";
import {
  getActivitiesForUser,
  getListsForUser,
  getUserById,
} from "../services/catalogService";
import {
  COMMENT_MODE,
  getAllComments,
  getCommentDateLabel,
  getCommentModeLabel,
  getLikedComments,
} from "../services/commentsService";
import { getEventById } from "../services/eventsService";
import {
  getUserFollowerCount,
  isUserFollowed,
  toggleUserFollow,
} from "../services/userFollowService";

function normalizeRating(value) {
  const raw = Number(value);
  if (!Number.isFinite(raw) || raw <= 0) return 0;
  const scaled = raw <= 10 ? raw * 10 : raw;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

function UserDetailPage() {
  const { userId } = useParams();
  const user = getUserById(userId);
  const [isFollowed, setIsFollowed] = useState(false);
  const [resolvedFollowers, setResolvedFollowers] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    setIsFollowed(isUserFollowed(user.id));
    setResolvedFollowers(getUserFollowerCount(user.id, Number(user.followers || 0)));
  }, [user?.followers, user?.id]);

  if (!user) {
    return (
      <section className="simple-page">
        <h1>User introuvable</h1>
        <Link className="btn btn-ghost" to="/users">
          Retour users
        </Link>
      </section>
    );
  }

  const activities = getActivitiesForUser(user.id);
  const lists = getListsForUser(user.id);
  const followers = resolvedFollowers;
  const followingCount = Number(user.following || Math.max(1, Math.round(followers * 0.45)));
  const allComments = getAllComments();
  const userComments = allComments.filter(
    (comment) => comment.author === user.name || comment.userId === user.id,
  );
  const userReviews = userComments.filter((comment) => comment.commentType === COMMENT_MODE.REVIEW);
  const commentsByDate = [...userComments]
    .sort((a, b) => Date.parse(b.createdAt || "") - Date.parse(a.createdAt || ""))
    .slice(0, 8);
  const bestReviews = [...userReviews]
    .sort((a, b) => (b.totalLikes || 0) - (a.totalLikes || 0))
    .slice(0, 3);
  const likedEntries = getLikedComments({ limit: 8 });

  const collectionBySport = userReviews.reduce((acc, review) => {
    const event = getEventById(review.eventId);
    const sport = event?.sport || "Autre";
    acc[sport] = (acc[sport] || 0) + 1;
    return acc;
  }, {});
  const sportCollectionRows = Object.entries(collectionBySport)
    .sort((a, b) => b[1] - a[1]);

  const ratingBuckets = [
    { id: "r0-19", label: "0-19", min: 0, max: 19 },
    { id: "r20-39", label: "20-39", min: 20, max: 39 },
    { id: "r40-59", label: "40-59", min: 40, max: 59 },
    { id: "r60-79", label: "60-79", min: 60, max: 79 },
    { id: "r80-100", label: "80-100", min: 80, max: 100 },
  ].map((bucket) => {
    const count = userReviews.filter((review) => {
      const rating = normalizeRating(review.rating);
      return rating >= bucket.min && rating <= bucket.max;
    }).length;
    return {
      ...bucket,
      count,
    };
  });
  const maxBucketCount = Math.max(1, ...ratingBuckets.map((bucket) => bucket.count));
  const averageRating = userReviews.length
    ? userReviews.reduce((sum, review) => sum + normalizeRating(review.rating), 0) / userReviews.length
    : 0;
  const likesReceived = userComments.reduce((sum, comment) => sum + Number(comment.totalLikes || 0), 0);

  function handleToggleFollow() {
    const next = toggleUserFollow(user.id);
    setIsFollowed(next);
    setResolvedFollowers(getUserFollowerCount(user.id, Number(user.followers || 0)));
  }

  return (
    <section>
      <Link className="back-link" to="/users">
        {"<- Retour users"}
      </Link>

      <article className="event-detail-card">
        <div className="event-detail-head">
          <span className="event-chip">{user.handle}</span>
          <span className="event-status">{user.location || "N/A"}</span>
        </div>
        <h1>{user.name}</h1>
        <p className="event-detail-subtitle">{user.badge || "Membre"}</p>
        <p className="event-meta">{user.bio || ""}</p>
        <div className="event-detail-actions">
          <button
            className={`watch-btn detail-watch-btn ${isFollowed ? "is-active" : ""}`}
            onClick={handleToggleFollow}
            type="button"
          >
            {isFollowed ? "Ne plus suivre" : "Suivre"}
          </button>
          <Link
            className="btn btn-ghost"
            to={`/feed?scope=object&targetType=user&targetId=${encodeURIComponent(user.id)}&mode=recent`}
          >
            Ouvrir le feed profil
          </Link>
        </div>
        <ObjectTagsWidget
          objectType="user"
          objectId={user.id}
          title="Tags du profil"
          compact
        />
        <div className="event-detail-grid">
          <div>
            <span className="detail-label">Followers</span>
            <strong>{followers.toLocaleString("fr-FR")}</strong>
          </div>
          <div>
            <span className="detail-label">Suivis</span>
            <strong>{followingCount.toLocaleString("fr-FR")}</strong>
          </div>
          <div>
            <span className="detail-label">Avis</span>
            <strong>{userComments.length}</strong>
          </div>
          <div>
            <span className="detail-label">Likes recus</span>
            <strong>{likesReceived.toLocaleString("fr-FR")}</strong>
          </div>
        </div>
      </article>

      <section className="related-section">
        <div className="group-title">
          <h2>A propos</h2>
          <span>{(user.favoriteSports || []).length || 1}</span>
        </div>
        <article className="entity-card">
          <p className="event-meta">{user.bio || "Pas de bio."}</p>
          <p className="event-meta">Localisation: {user.location || "Monde"}</p>
          <p className="event-meta">Badge: {user.badge || "Membre actif"}</p>
          <p className="event-meta">
            Sports preferes: {(user.favoriteSports || []).join(", ") || "Multi-sport"}
          </p>
        </article>
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Activites recentes</h2>
          <span>{activities.length}</span>
        </div>
        {activities.length ? (
          <div className="entity-grid">
            {activities.map((activity) => (
              <article key={activity.id} className="entity-card">
                <h3>{activity.type}</h3>
                <p className="event-meta">{activity.label}</p>
                <p className="event-meta">{activity.dateLabel || activity.dateISO || ""}</p>
              </article>
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <h3>Aucune activite</h3>
            <p className="event-meta">Pas d&apos;activite recente pour ce profil.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Collection de critiques par sport</h2>
          <span>{sportCollectionRows.length}</span>
        </div>
        {sportCollectionRows.length ? (
          <div className="entity-grid">
            {sportCollectionRows.map(([sport, count]) => (
              <article key={sport} className="entity-card">
                <h3>{sport}</h3>
                <p className="event-meta">{count} critiques</p>
              </article>
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <h3>Aucune critique</h3>
            <p className="event-meta">Aucune critique publiee par sport pour le moment.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Meilleures critiques</h2>
          <span>{bestReviews.length}</span>
        </div>
        {bestReviews.length ? (
          <div className="entity-grid">
            {bestReviews.map((review) => {
              const event = getEventById(review.eventId);
              return (
                <article key={review.id} className="entity-card">
                  <h3>
                    <Link to={`/event/${review.eventId}`}>{event?.title || "Evenement"}</Link>
                  </h3>
                  <p className="event-meta">{review.note}</p>
                  <p className="event-meta">
                    <span className="score-inline">
                      <span className="score-inline-label">Note</span>
                      <ScoreBadge variant="badge" value={normalizeRating(review.rating)} scale="percent" />
                    </span>
                  </p>
                  <p className="event-meta">{review.totalLikes || 0} likes</p>
                </article>
              );
            })}
          </div>
        ) : (
          <article className="entity-card">
            <h3>Aucune critique marquee</h3>
            <p className="event-meta">Les critiques avec plus de likes apparaitront ici.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Ratings</h2>
          <span>{userReviews.length}</span>
        </div>
        <article className="entity-card">
          <p className="event-meta">
            <span className="score-inline">
              <span className="score-inline-label">Moyenne</span>
              <ScoreBadge variant="community-chip" value={averageRating} scale="percent" />
              <span>{userReviews.length} critiques</span>
            </span>
          </p>
          <div className="rating-distribution-list">
            {ratingBuckets.map((bucket) => (
              <div key={bucket.id} className="rating-distribution-item">
                <span className="detail-label">{bucket.label}</span>
                <div className="rating-bar-track">
                  <div
                    className="rating-bar-fill"
                    style={{ width: `${Math.round((bucket.count / maxBucketCount) * 100)}%` }}
                  />
                </div>
                <span className="event-meta">{bucket.count}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Classements publies</h2>
          <span>{lists.length}</span>
        </div>
        {lists.length ? (
          <div className="entity-grid">
            {lists.map((list) => (
              <article key={list.id} className="entity-card">
                <h3>
                  <Link to={`/list/${list.id}`}>{list.title}</Link>
                </h3>
                <p className="event-meta">{list.sport}</p>
              </article>
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <h3>Aucun classement</h3>
            <p className="event-meta">Ce profil n&apos;a pas encore publie de classement.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Commentaires que j&apos;ai likes</h2>
          <span>{likedEntries.length}</span>
        </div>
        {likedEntries.length ? (
          <div className="entity-grid">
            {likedEntries.map((entry) => (
              <article key={entry.id} className="entity-card">
                <h3>
                  <Link to={`/event/${entry.eventId}`}>Voir evenement</Link>
                </h3>
                <p className="event-meta">
                  {entry.kind === "reply" ? `Reponse a ${entry.item.parentAuthor}` : "Commentaire"}
                </p>
                <p className="event-meta">{entry.item.note}</p>
                <p className="event-meta">{entry.item.totalLikes || 0} likes</p>
              </article>
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <h3>Aucun like enregistre</h3>
            <p className="event-meta">Like des commentaires pour les retrouver ici.</p>
          </article>
        )}
      </section>

      <section className="related-section">
        <div className="group-title">
          <h2>Avis recents</h2>
          <span>{commentsByDate.length}</span>
        </div>
        {commentsByDate.length ? (
          <div className="entity-grid">
            {commentsByDate.map((comment) => (
              <article key={comment.id} className="entity-card">
                <h3>
                  <Link to={`/event/${comment.eventId}`}>Voir evenement</Link>
                </h3>
                <p className="event-meta">{getCommentModeLabel(comment)}</p>
                <p className="event-meta">{comment.note}</p>
                <p className="event-meta">
                  {comment.totalLikes || 0} likes · {getCommentDateLabel(comment)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <article className="entity-card">
            <h3>Aucun avis</h3>
            <p className="event-meta">Aucun avis recent pour ce profil.</p>
          </article>
        )}
      </section>
    </section>
  );
}

export default UserDetailPage;
