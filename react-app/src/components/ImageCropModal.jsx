import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const CROP_PAN_OVERSCAN = 1.08;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getCoverSize(imageSize, frameSize, zoom) {
  const safeZoom = Number(zoom || 1);
  const scale = Math.max(
    frameSize.width / imageSize.width,
    frameSize.height / imageSize.height,
  ) * safeZoom * CROP_PAN_OVERSCAN;
  return {
    width: imageSize.width * scale,
    height: imageSize.height * scale,
  };
}

function clampPosition(position, displaySize, frameSize) {
  const minX = Math.min(0, frameSize.width - displaySize.width);
  const minY = Math.min(0, frameSize.height - displaySize.height);
  return {
    x: clamp(position.x, minX, 0),
    y: clamp(position.y, minY, 0),
  };
}

function centerPosition(displaySize, frameSize) {
  return {
    x: (frameSize.width - displaySize.width) / 2,
    y: (frameSize.height - displaySize.height) / 2,
  };
}

function readImageDimensions(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve({
        image,
        width: Number(image.naturalWidth || 0),
        height: Number(image.naturalHeight || 0),
      });
    };
    image.onerror = () => reject(new Error("Impossible de charger l image."));
    image.src = src;
  });
}

function canvasToBlob(canvas, type = "image/jpeg", quality = 0.92) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

async function buildCroppedFile({
  sourceImage,
  imageSize,
  frameSize,
  displaySize,
  position,
  aspect,
}) {
  const sxRaw = (-position.x / displaySize.width) * imageSize.width;
  const syRaw = (-position.y / displaySize.height) * imageSize.height;
  const swRaw = (frameSize.width / displaySize.width) * imageSize.width;
  const shRaw = (frameSize.height / displaySize.height) * imageSize.height;

  const sx = clamp(sxRaw, 0, imageSize.width);
  const sy = clamp(syRaw, 0, imageSize.height);
  const sw = clamp(swRaw, 1, imageSize.width - sx);
  const sh = clamp(shRaw, 1, imageSize.height - sy);

  const targetWidth = Math.min(1920, Math.max(480, Math.round(sw)));
  const targetHeight = Math.max(320, Math.round(targetWidth / aspect));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.drawImage(sourceImage, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
  const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
  if (!blob) return null;
  return new File([blob], `crop-${Date.now()}.jpg`, { type: "image/jpeg" });
}

function ImageCropModal({
  open = false,
  file = null,
  aspect = 1 / 1.4,
  previewVariant = "event",
  title = "Recadrer l image",
  isBusy = false,
  onCancel = () => {},
  onConfirm = () => {},
}) {
  const frameRef = useRef(null);
  const pointerStateRef = useRef({
    active: false,
    pointerId: null,
    target: null,
    startClientX: 0,
    startClientY: 0,
    startX: 0,
    startY: 0,
  });
  const [imageUrl, setImageUrl] = useState("");
  const [imageData, setImageData] = useState(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !file) return undefined;
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    setImageData(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setError("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, open]);

  useEffect(() => {
    if (!imageUrl) return undefined;
    let cancelled = false;
    readImageDimensions(imageUrl)
      .then((result) => {
        if (cancelled) return;
        setImageData(result);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Impossible de lire cette image.");
      });
    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!open || !frameRef.current) return undefined;
    const observer = new ResizeObserver((entries) => {
      const rect = entries?.[0]?.contentRect;
      if (!rect) return;
      setFrameSize({
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
      });
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [open]);

  const displaySize = useMemo(() => {
    if (!imageData || !frameSize.width || !frameSize.height) return null;
    return getCoverSize(
      { width: imageData.width, height: imageData.height },
      frameSize,
      zoom,
    );
  }, [frameSize, imageData, zoom]);

  useEffect(() => {
    if (!displaySize || !frameSize.width || !frameSize.height) return;
    setPosition((current) => {
      const currentZero = current.x === 0 && current.y === 0;
      const next = currentZero
        ? centerPosition(displaySize, frameSize)
        : clampPosition(current, displaySize, frameSize);
      if (next.x === current.x && next.y === current.y) return current;
      return next;
    });
  }, [displaySize, frameSize]);

  useEffect(() => {
    if (!open) return undefined;
    function handleEscape(event) {
      if (event.key === "Escape" && !isBusy && !isExporting) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isBusy, isExporting, onCancel, open]);

  useEffect(() => {
    if (!pointerStateRef.current.active) return undefined;
    function handlePointerMove(event) {
      const state = pointerStateRef.current;
      if (!state.active || state.pointerId !== event.pointerId || !displaySize) return;
      const deltaX = event.clientX - state.startClientX;
      const deltaY = event.clientY - state.startClientY;
      const next = clampPosition(
        { x: state.startX + deltaX, y: state.startY + deltaY },
        displaySize,
        frameSize,
      );
      setPosition(next);
    }

    function handlePointerUp(event) {
      const state = pointerStateRef.current;
      if (!state.active || state.pointerId !== event.pointerId) return;
      if (state.target && typeof state.target.releasePointerCapture === "function") {
        try {
          state.target.releasePointerCapture(event.pointerId);
        } catch {
          // noop
        }
      }
      pointerStateRef.current = {
        active: false,
        pointerId: null,
        target: null,
        startClientX: 0,
        startClientY: 0,
        startX: 0,
        startY: 0,
      };
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [displaySize, frameSize]);

  function handleImagePointerDown(event) {
    if (!displaySize || isBusy || isExporting) return;
    const target = event.currentTarget;
    if (target && typeof target.setPointerCapture === "function") {
      try {
        target.setPointerCapture(event.pointerId);
      } catch {
        // noop
      }
    }
    pointerStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      target,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: position.x,
      startY: position.y,
    };
  }

  function handleZoomChange(event) {
    const nextZoom = clamp(Number(event.target.value || 1), 1, 3);
    setZoom(nextZoom);
  }

  async function handleConfirm() {
    if (!imageData || !displaySize || isBusy || isExporting) return;
    setError("");
    setIsExporting(true);
    try {
      const croppedFile = await buildCroppedFile({
        sourceImage: imageData.image,
        imageSize: { width: imageData.width, height: imageData.height },
        frameSize,
        displaySize,
        position,
        aspect,
      });
      if (!croppedFile) {
        setError("Recadrage impossible.");
        return;
      }
      await onConfirm(croppedFile);
    } finally {
      setIsExporting(false);
    }
  }

  if (!open) return null;

  return createPortal(
    <div className="image-crop-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="image-crop-modal-panel">
        <h3 className="image-crop-modal-title">{title}</h3>
        <div className="image-crop-stage-wrap">
          <div
            ref={frameRef}
            className={`image-crop-stage image-crop-stage--${previewVariant}`}
            style={{ "--crop-aspect": String(aspect) }}
          >
            {imageData && displaySize ? (
              <>
                <img
                  src={imageUrl}
                  alt="Apercu recadrage"
                  className="image-crop-stage-image"
                  draggable={false}
                  onPointerDown={handleImagePointerDown}
                  style={{
                    width: `${displaySize.width}px`,
                    height: `${displaySize.height}px`,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                  }}
                />
                <span className="image-crop-stage-vintage-layer" aria-hidden="true" />
                <span className="image-crop-stage-ui-layer" aria-hidden="true" />
                <button
                  type="button"
                  className="image-crop-stage-pan-layer"
                  aria-label="Deplacer l image"
                  onPointerDown={handleImagePointerDown}
                  disabled={isBusy || isExporting}
                />
              </>
            ) : (
              <div className="image-crop-stage-loading">Chargement...</div>
            )}
          </div>
        </div>
        <label className="image-crop-zoom-label" htmlFor="image-crop-zoom-range">
          Zoom
        </label>
        <input
          id="image-crop-zoom-range"
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={zoom}
          className="image-crop-zoom-range"
          onChange={handleZoomChange}
          disabled={isBusy || isExporting}
        />
        {error ? <p className="image-crop-error">{error}</p> : null}
        <div className="image-crop-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            disabled={isBusy || isExporting}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={isBusy || isExporting || !imageData}
          >
            {isBusy || isExporting ? "Validation..." : "Valider"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ImageCropModal;
