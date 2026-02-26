import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageCropModal from "./ImageCropModal";
import ObjectTagsWidget from "./ObjectTagsWidget";
import ScoreBadge from "./ScoreBadge";
import {
  getTargetFollowerCount,
  isTargetFollowed,
  toggleTargetFollow,
} from "../services/userFollowService";
import { useSocialSync } from "../contexts/SocialSyncContext";
import { useAuth } from "../contexts/AuthContext";
import {
  canUploadCatalogImageToCloud,
  uploadAthleteImageFile,
} from "../services/catalogImageStorageService";
import {
  canAdminDeleteCatalogType,
  deleteCatalogObject,
  getDeleteDependencies,
} from "../services/adminCatalogModerationService";

function IconMore() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5.2" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="18.8" cy="12" r="1.8" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7.5h2l1.2-1.8h3.6L15 7.5h2A2.5 2.5 0 0 1 19.5 10v7A2.5 2.5 0 0 1 17 19.5H7A2.5 2.5 0 0 1 4.5 17v-7A2.5 2.5 0 0 1 7 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="13.2" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

const OBJECT_CARD_SIZES = new Set(["large", "medium", "small", "miniature"]);
const CARD_CROP_ASPECT_FALLBACK = 1 / 1.4;

function normalizeId(value) {
  return String(value || "").trim();
}

function normalizeType(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeObjectCardSize(size) {
  const raw = String(size || "").trim().toLowerCase();
  if (!raw || raw === "default") return "medium";
  if (raw === "compact") return "small";
  if (OBJECT_CARD_SIZES.has(raw)) return raw;
  return "medium";
}

function toSportSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getImagePath(value) {
  const image = String(value || "").trim();
  if (!image) return "";
  if (/^(https?:)?\/\//.test(image) || image.startsWith("data:") || image.startsWith("blob:")) {
    return image;
  }
  return image.startsWith("/") ? image : `/${image}`;
}

function getInitials(value) {
  const source = String(value || "").trim();
  if (!source) return "?";
  const [first = "", second = ""] = source.split(/\s+/);
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase() || "?";
}

function toPercentScore(value) {
  const raw = Number(value || 0);
  if (!Number.isFinite(raw)) return 0;
  const scaled = raw <= 10 ? raw * 10 : raw;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

function buildObjectFeedPath(targetType, targetId) {
  const safeType = String(targetType || "").trim();
  const safeId = String(targetId || "").trim();
  if (!safeType || !safeId) return "/feed";
  const params = new URLSearchParams({
    scope: "object",
    mode: "recent",
    targetType: safeType,
    targetId: safeId,
  });
  return `/feed?${params.toString()}`;
}

function ObjectCardFrame({
  objectType,
  objectId,
  title,
  sportLabel = "",
  metricValue = 0,
  image = "",
  fallbackLabel = "",
  primaryPath = "",
  primaryActionLabel = "Voir la page",
  size = "default",
  variant = "listing",
  showTags = true,
  showMenu = true,
  className = "",
  baseFollowCount = 0,
  menuExtraActions = [],
  children,
}) {
  const { isAdmin, currentUser } = useAuth();
  const normalizedSize = normalizeObjectCardSize(size);
  const isCompact = normalizedSize === "small";
  const metricPercent = toPercentScore(metricValue);
  const [imageOverrideUrl, setImageOverrideUrl] = useState("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState("");
  const [cropSourceFile, setCropSourceFile] = useState(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [cropAspect, setCropAspect] = useState(CARD_CROP_ASPECT_FALLBACK);
  const resolvedImage = imageOverrideUrl || image;
  const imagePath = getImagePath(resolvedImage);
  const fallbackInitials = getInitials(fallbackLabel || title);
  const sportPath = useMemo(() => {
    const slug = toSportSlug(sportLabel);
    return slug ? `/sports/${slug}` : "";
  }, [sportLabel]);
  const sportActionLabel = String(sportLabel || "").trim()
    ? `Aller a ${String(sportLabel).trim()}`
    : "";
  const feedPath = useMemo(
    () => buildObjectFeedPath(objectType, objectId),
    [objectId, objectType],
  );
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [resolvedFollowers, setResolvedFollowers] = useState(Number(baseFollowCount || 0));
  const [isAdminDeleting, setIsAdminDeleting] = useState(false);
  const moreMenuRef = useRef(null);
  const photoInputRef = useRef(null);
  const mediaRef = useRef(null);
  const { revisionByDomain } = useSocialSync();
  const followsRevision = Number(revisionByDomain?.follows || 0);
  const canAdminEditPhoto = Boolean(
    isAdmin
      && normalizeType(objectType) === "athlete"
      && currentUser?.firebaseUid
      && canUploadCatalogImageToCloud()
      && normalizeId(objectId),
  );

  useEffect(() => {
    const safeType = String(objectType || "").trim();
    const safeId = String(objectId || "").trim();
    if (!safeType || !safeId) {
      setIsFollowed(false);
      setResolvedFollowers(Math.max(0, Number(baseFollowCount || 0)));
      return;
    }
    setIsFollowed(isTargetFollowed(safeType, safeId));
    setResolvedFollowers(getTargetFollowerCount(safeType, safeId, Number(baseFollowCount || 0)));
  }, [baseFollowCount, objectId, objectType, followsRevision]);

  useEffect(() => {
    if (!isMoreMenuOpen) return undefined;
    function handlePointerDown(event) {
      if (!moreMenuRef.current?.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMoreMenuOpen(false);
      }
    }
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMoreMenuOpen]);

  useEffect(() => {
    setImageOverrideUrl("");
    setPhotoUploadError("");
    setCropSourceFile(null);
    setIsCropOpen(false);
  }, [image, objectId]);

  useEffect(() => {
    const mediaElement = mediaRef.current;
    if (!mediaElement) return undefined;

    function updateCropAspect() {
      const rect = mediaElement.getBoundingClientRect();
      const width = Number(rect.width || 0);
      const height = Number(rect.height || 0);
      if (width <= 0 || height <= 0) return;
      const nextAspect = width / height;
      if (!Number.isFinite(nextAspect) || nextAspect <= 0) return;
      setCropAspect(nextAspect);
    }

    updateCropAspect();
    const observer = new ResizeObserver(updateCropAspect);
    observer.observe(mediaElement);
    return () => observer.disconnect();
  }, [normalizedSize, isMoreMenuOpen, showTags]);

  function handleToggleMenu() {
    setIsMoreMenuOpen((value) => !value);
  }

  function handlePickPhoto() {
    if (!canAdminEditPhoto || isUploadingPhoto) return;
    photoInputRef.current?.click();
  }

  async function handlePhotoChange(changeEvent) {
    const file = changeEvent.target.files?.[0];
    changeEvent.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoUploadError("Selectionne une image valide.");
      return;
    }
    if (file.size > 2_500_000) {
      setPhotoUploadError("Image trop lourde (max 2.5 MB).");
      return;
    }

    setPhotoUploadError("");
    setCropSourceFile(file);
    setIsCropOpen(true);
  }

  function handleCloseCropModal() {
    if (isUploadingPhoto) return;
    setIsCropOpen(false);
    setCropSourceFile(null);
  }

  async function handleConfirmCroppedPhoto(croppedFile) {
    if (!croppedFile) return;
    setIsUploadingPhoto(true);
    try {
      const { url } = await uploadAthleteImageFile(currentUser.firebaseUid, objectId, croppedFile);
      setImageOverrideUrl(url);
      setPhotoUploadError("");
      setIsCropOpen(false);
      setCropSourceFile(null);
    } catch {
      setPhotoUploadError("Upload impossible pour le moment.");
    } finally {
      setIsUploadingPhoto(false);
    }
  }

  function handleToggleFollow() {
    const safeType = String(objectType || "").trim();
    const safeId = String(objectId || "").trim();
    if (!safeType || !safeId) return;
    const next = toggleTargetFollow(safeType, safeId);
    setIsFollowed(next);
    setResolvedFollowers(getTargetFollowerCount(safeType, safeId, Number(baseFollowCount || 0)));
    setIsMoreMenuOpen(false);
  }

  async function handleAdminDelete() {
    const safeType = String(objectType || "").trim();
    const safeId = String(objectId || "").trim();
    if (!isAdmin || !canAdminDeleteCatalogType(safeType) || !safeId || isAdminDeleting) return;

    const dependencies = await getDeleteDependencies({ type: safeType, id: safeId });
    if (dependencies.blocked) {
      const detail = dependencies.dependencies
        .map((item) => `- ${item.label}: ${item.count}`)
        .join("\n");
      window.alert(`Suppression bloquee pour ${String(title || "cet objet").trim()}.\nDependances detectees:\n${detail}`);
      setIsMoreMenuOpen(false);
      return;
    }

    const confirmed = window.confirm(`Supprimer definitivement ${String(title || "cet objet").trim()} de la base ?`);
    if (!confirmed) return;

    setIsAdminDeleting(true);
    try {
      const result = await deleteCatalogObject({ type: safeType, id: safeId });
      if (!result?.ok && result?.reason === "blocked_by_dependencies") {
        const detail = (result?.dependencies?.dependencies || [])
          .map((item) => `- ${item.label}: ${item.count}`)
          .join("\n");
        window.alert(`Suppression bloquee.\n${detail}`);
      } else if (!result?.ok) {
        window.alert("Suppression impossible pour le moment.");
      }
    } catch {
      window.alert("Erreur pendant la suppression.");
    } finally {
      setIsAdminDeleting(false);
      setIsMoreMenuOpen(false);
    }
  }

  const followLabel = isFollowed
    ? `Ne plus suivre ${String(title || "cet objet").trim()}`
    : `Suivre ${String(title || "cet objet").trim()}`;

  return (
    <div
      className={`object-card-shell ${isCompact ? "compact" : ""} ${isMoreMenuOpen ? "is-more-open" : ""}`.trim()}
      data-size={normalizedSize}
    >
      <article
        className={`object-card ${variant === "detail" ? "is-detail" : "is-listing"} ${isMoreMenuOpen ? "is-more-open" : ""} ${className}`.trim()}
      >
        <div className="event-corner-meta" aria-label={`${sportLabel}, score ${metricPercent}`}>
          <span className="event-corner-leading">
            <ScoreBadge variant="community-chip" value={metricPercent} scale="percent" />
          </span>
          <span className="event-corner-trailing">
            {sportLabel ? (
              <span className="event-corner-chip event-corner-chip-sport" title={sportLabel}>
                {sportLabel}
              </span>
            ) : null}
            {showMenu ? (
              <div className="object-card-more-menu" ref={moreMenuRef}>
                <button
                  type="button"
                  className="object-card-more-btn"
                  aria-label="Options de la carte"
                  aria-haspopup="menu"
                  aria-expanded={isMoreMenuOpen}
                  onClick={handleToggleMenu}
                >
                  <IconMore />
                </button>
                {isMoreMenuOpen ? (
                  <div className="object-card-more-popover" role="menu" aria-label="Actions">
                    <button type="button" className="object-card-more-action" role="menuitem" onClick={handleToggleFollow}>
                      {followLabel}
                    </button>
                    <Link
                      to={feedPath}
                      className="object-card-more-action"
                      role="menuitem"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      Ouvrir le feed
                    </Link>
                    {primaryPath ? (
                      <Link
                        to={primaryPath}
                        className="object-card-more-action"
                        role="menuitem"
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        {primaryActionLabel}
                      </Link>
                    ) : null}
                    {sportPath && sportActionLabel ? (
                      <Link
                        to={sportPath}
                        className="object-card-more-action"
                        role="menuitem"
                        onClick={() => setIsMoreMenuOpen(false)}
                      >
                        {sportActionLabel}
                      </Link>
                    ) : null}
                    {Array.isArray(menuExtraActions)
                      ? menuExtraActions.map((action) => {
                        const key = `${action?.label || ""}-${action?.to || ""}`;
                        if (action?.to) {
                          return (
                            <Link
                              key={key}
                              to={action.to}
                              className="object-card-more-action"
                              role="menuitem"
                              onClick={() => setIsMoreMenuOpen(false)}
                            >
                              {action.label}
                            </Link>
                          );
                        }
                        return (
                          <button
                            key={key}
                            type="button"
                            className="object-card-more-action"
                            role="menuitem"
                            disabled={Boolean(action?.disabled)}
                            onClick={() => setIsMoreMenuOpen(false)}
                          >
                            {action?.label || "Action"}
                          </button>
                        );
                      })
                      : null}
                    {isAdmin && canAdminDeleteCatalogType(objectType) ? (
                      <button
                        type="button"
                        className="object-card-more-action is-danger"
                        role="menuitem"
                        onClick={handleAdminDelete}
                        disabled={isAdminDeleting}
                      >
                        {isAdminDeleting ? "Suppression..." : "Supprimer de la base"}
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </span>
        </div>

        <div className="object-card-body">
          <div className="object-card-media" ref={mediaRef}>
            <input
              ref={photoInputRef}
              className="catalog-photo-upload-input"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {canAdminEditPhoto ? (
              <button
                type="button"
                className="profile-photo-upload-icon-btn object-card-photo-upload-icon-btn"
                onClick={handlePickPhoto}
                disabled={isUploadingPhoto}
                aria-label={isUploadingPhoto ? "Upload en cours" : "Modifier la photo athlete"}
                title={isUploadingPhoto ? "Upload en cours..." : "Modifier la photo"}
              >
                <CameraIcon />
              </button>
            ) : null}
            {photoUploadError ? <p className="catalog-photo-upload-error">{photoUploadError}</p> : null}
            {imagePath ? <img src={imagePath} alt={String(title || "").trim() || "Object"} loading="lazy" /> : null}
            <div className={`object-card-media-overlay ${imagePath ? "" : "is-no-image"}`.trim()}>
              {!imagePath ? <span className="object-card-media-fallback">{fallbackInitials}</span> : null}
              <div className="object-card-description">{children}</div>
              {showTags ? (
                <div className="object-card-tags">
                  <ObjectTagsWidget objectType={objectType} objectId={objectId} title="Tags" compact />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {variant === "detail" ? (
          <p className="object-card-followers event-meta">
            {Math.max(0, Number(resolvedFollowers || 0)).toLocaleString("fr-FR")} followers
          </p>
        ) : null}
      </article>
      <ImageCropModal
        open={isCropOpen}
        file={cropSourceFile}
        aspect={cropAspect || CARD_CROP_ASPECT_FALLBACK}
        previewVariant="object"
        title="Recadrer la photo de l athlete"
        isBusy={isUploadingPhoto}
        onCancel={handleCloseCropModal}
        onConfirm={handleConfirmCroppedPhoto}
      />
    </div>
  );
}

export default ObjectCardFrame;
