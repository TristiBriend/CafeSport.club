import { useEffect } from "react";
import { createPortal } from "react-dom";
import FriendnotesPanel from "./FriendnotesPanel";

function FriendnotesModal({
  open = false,
  eventId = null,
  eventTitle = "",
  onClose = () => {},
}) {
  const safeEventId = String(eventId || "").trim();

  useEffect(() => {
    if (!open) return undefined;
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  if (!open || !safeEventId || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="friendnotes-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Note de mes amis"
      onClick={onClose}
    >
      <div
        className="friendnotes-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="friendnotes-modal-head">
          <div>
            <h2>Note de mes amis</h2>
            {eventTitle ? <p>{eventTitle}</p> : null}
          </div>
          <button
            type="button"
            className="ghost small"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
        <FriendnotesPanel eventId={safeEventId} title="" />
      </div>
    </div>,
    document.body,
  );
}

export default FriendnotesModal;
