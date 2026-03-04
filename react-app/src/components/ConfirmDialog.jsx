import { useEffect } from "react";
import { createPortal } from "react-dom";

function ConfirmDialog({
  open = false,
  title = "Confirmation",
  message = "",
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  tone = "default",
  isBusy = false,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  const safeTone = String(tone || "").trim().toLowerCase() === "danger" ? "danger" : "default";

  useEffect(() => {
    if (!open || isBusy) return undefined;
    function handleEscape(event) {
      if (event.key === "Escape") {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isBusy, onCancel, open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="confirm-dialog-backdrop"
      role="presentation"
      onClick={() => {
        if (!isBusy) onCancel();
      }}
    >
      <section
        className="confirm-dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title || "Confirmation"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="confirm-dialog-head">
          <h2>{title || "Confirmation"}</h2>
        </div>
        {message ? (
          <div className="confirm-dialog-body">
            <p>{message}</p>
          </div>
        ) : null}
        <div className="confirm-dialog-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            disabled={isBusy}
          >
            {cancelLabel || "Annuler"}
          </button>
          <button
            type="button"
            className={`btn btn-primary confirm-dialog-confirm ${safeTone === "danger" ? "is-danger" : ""}`.trim()}
            onClick={onConfirm}
            disabled={isBusy}
          >
            {confirmLabel || "Confirmer"}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export default ConfirmDialog;
