import { Children, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

function toVisibleCount(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getTrackGap(track) {
  if (!track) return 0;
  const styles = window.getComputedStyle(track);
  const raw = styles.columnGap || styles.gap || "0";
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getScrollBehavior() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "smooth";
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function clamp(value, min, max) {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}

function getPreviewPosition(itemRect, hoverScale, side) {
  const viewportInset = 12;
  const anchorX = side === "left" ? 0 : side === "right" ? 1 : 0.5;
  const anchorY = 0.12;
  const scaledWidth = itemRect.width * hoverScale;
  const scaledHeight = itemRect.height * hoverScale;
  return {
    left: clamp(
      itemRect.left - (scaledWidth - itemRect.width) * anchorX,
      viewportInset,
      window.innerWidth - viewportInset - scaledWidth,
    ),
    top: clamp(
      itemRect.top - (scaledHeight - itemRect.height) * anchorY,
      viewportInset,
      window.innerHeight - viewportInset - scaledHeight,
    ),
  };
}

function HorizontalCardRail({
  children,
  label = "Cards",
  itemType = "event",
  mode = "default",
  visibleDesktop = 3.6,
  visibleTablet = 3,
  visibleMobile = 1.15,
  showArrows = true,
  scrollStepItems = 1,
  className = "",
}) {
  const trackRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [hoverEdge, setHoverEdge] = useState(null);
  const [hoverPreview, setHoverPreview] = useState(null);
  const isCarouselMode = mode === "carousel";
  const overlayRef = useRef(null);
  const overlayContentRef = useRef(null);
  const previewSourceElementRef = useRef(null);
  const previewSourceItemRef = useRef(null);
  const items = useMemo(
    () => Children.toArray(children).filter(Boolean),
    [children],
  );
  const visibleDesktopSlots = Math.max(1, Math.floor(toVisibleCount(visibleDesktop, 4)));
  const carouselEnabled = isCarouselMode && items.length >= visibleDesktopSlots;

  function getHoverMetrics(itemElement) {
    const track = trackRef.current;
    if (!track || !itemElement || !carouselEnabled) return null;

    const trackRect = track.getBoundingClientRect();
    const itemRect = itemElement.getBoundingClientRect();
    const rail = itemElement.closest(".card-rail");
    const rawHoverScale = rail
      ? window.getComputedStyle(rail).getPropertyValue("--card-rail-hover-scale")
      : "";
    const parsedHoverScale = Number.parseFloat(rawHoverScale);
    const hoverScale =
      Number.isFinite(parsedHoverScale) && parsedHoverScale > 1 ? parsedHoverScale : 1.18;
    const horizontalOverflowBudget = Math.max(
      12,
      itemRect.width * ((hoverScale - 1) / 2) + 8,
    );
    const leftSpace = itemRect.left - trackRect.left;
    const rightSpace = trackRect.right - itemRect.right;

    let side = "";
    if (leftSpace < horizontalOverflowBudget && leftSpace <= rightSpace) {
      side = "left";
    } else if (rightSpace < horizontalOverflowBudget) {
      side = "right";
    }

    return { hoverScale, itemRect, side };
  }

  function resetHoverPreview() {
    previewSourceElementRef.current = null;
    previewSourceItemRef.current = null;
    setHoverPreview(null);
  }

  function updateHoverEdge(itemIndex, itemElement) {
    const metrics = getHoverMetrics(itemElement);
    if (!metrics) {
      setHoverEdge((current) => (current ? null : current));
      return;
    }

    const { side } = metrics;

    setHoverEdge((current) => {
      if (!side) {
        return current ? null : current;
      }
      if (current?.index === itemIndex && current.side === side) {
        return current;
      }
      return { index: itemIndex, side };
    });
  }

  function updateHoverPreview(itemIndex, itemElement) {
    const metrics = getHoverMetrics(itemElement);
    if (!metrics) {
      resetHoverPreview();
      return;
    }

    const sourceElement = itemElement.firstElementChild ?? itemElement;
    const position = getPreviewPosition(metrics.itemRect, metrics.hoverScale, metrics.side);
    previewSourceElementRef.current = sourceElement;
    previewSourceItemRef.current = itemElement;
    setHoverPreview({
      index: itemIndex,
      side: metrics.side,
      scale: metrics.hoverScale,
      width: metrics.itemRect.width,
      left: position.left,
      top: position.top,
    });
  }

  function clearHoverEdge(itemIndex, event) {
    const relatedTarget = event?.relatedTarget;
    if (
      event?.currentTarget &&
      typeof Node !== "undefined" &&
      relatedTarget instanceof Node &&
      event.currentTarget.contains(relatedTarget)
    ) {
      return;
    }

    setHoverEdge((current) => (current && current.index === itemIndex ? null : current));
  }

  function clearHoverPreview(itemIndex, event) {
    const relatedTarget = event?.relatedTarget;
    if (typeof Node !== "undefined" && relatedTarget instanceof Node) {
      if (event?.currentTarget?.contains(relatedTarget)) {
        return;
      }
      if (overlayRef.current?.contains(relatedTarget)) {
        return;
      }
      if (previewSourceItemRef.current?.contains(relatedTarget)) {
        return;
      }
    }

    if (hoverPreview && hoverPreview.index !== itemIndex) {
      return;
    }

    resetHoverPreview();
  }

  useEffect(() => {
    if (!hoverPreview) return undefined;

    const overlayContent = overlayContentRef.current;
    const sourceElement = previewSourceElementRef.current;
    if (!overlayContent || !sourceElement) return undefined;

    overlayContent.replaceChildren(sourceElement.cloneNode(true));

    const rafId = window.requestAnimationFrame(() => {
      const overlayElement = overlayRef.current;
      if (!overlayElement) return;

      const rect = overlayElement.getBoundingClientRect();
      const viewportInset = 12;
      const offsetLeft = Math.max(0, viewportInset - rect.left) - Math.max(0, rect.right - (window.innerWidth - viewportInset));
      const offsetTop = Math.max(0, viewportInset - rect.top) - Math.max(0, rect.bottom - (window.innerHeight - viewportInset));

      if (Math.abs(offsetLeft) < 1 && Math.abs(offsetTop) < 1) {
        return;
      }

      setHoverPreview((current) => {
        if (!current || current.index !== hoverPreview.index) {
          return current;
        }
        return {
          ...current,
          left: current.left + offsetLeft,
          top: current.top + offsetTop,
        };
      });
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      overlayContent.replaceChildren();
    };
  }, [hoverPreview?.index]);

  useEffect(() => {
    if (!hoverPreview) return undefined;

    const track = trackRef.current;
    function handleDismiss() {
      resetHoverPreview();
    }

    window.addEventListener("resize", handleDismiss);
    window.addEventListener("scroll", handleDismiss, true);
    track?.addEventListener("scroll", handleDismiss, { passive: true });

    return () => {
      window.removeEventListener("resize", handleDismiss);
      window.removeEventListener("scroll", handleDismiss, true);
      track?.removeEventListener("scroll", handleDismiss);
    };
  }, [hoverPreview]);

  const renderedItems = items.map((item, itemIndex) => (
    <div
      key={`rail-${itemIndex}`}
      className={[
        "card-rail-item",
        hoverEdge?.index === itemIndex && hoverEdge.side === "left" ? "is-edge-left" : "",
        hoverEdge?.index === itemIndex && hoverEdge.side === "right" ? "is-edge-right" : "",
        hoverPreview?.index === itemIndex ? "is-preview-source" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={(event) => {
        updateHoverEdge(itemIndex, event.currentTarget);
        updateHoverPreview(itemIndex, event.currentTarget);
      }}
      onMouseLeave={(event) => {
        clearHoverEdge(itemIndex, event);
        clearHoverPreview(itemIndex, event);
      }}
      onFocus={(event) => updateHoverEdge(itemIndex, event.currentTarget)}
      onBlur={(event) => clearHoverEdge(itemIndex, event)}
    >
      {item}
    </div>
  ));

  const railStyle = useMemo(
    () => ({
      "--card-rail-visible-desktop": toVisibleCount(visibleDesktop, 4),
      "--card-rail-visible-tablet": toVisibleCount(visibleTablet, 3),
      "--card-rail-visible-mobile": toVisibleCount(visibleMobile, 1.15),
    }),
    [visibleDesktop, visibleMobile, visibleTablet],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    function updateScrollState() {
      if (!carouselEnabled) {
        setCanScroll(false);
        setAtStart(true);
        setAtEnd(true);
        return;
      }

      const firstChild = track.firstElementChild;
      const childWidth = firstChild ? firstChild.getBoundingClientRect().width : track.clientWidth;
      const logicalItemsWidth =
        childWidth * items.length + getTrackGap(track) * Math.max(0, items.length - 1);
      const nextCanScroll = logicalItemsWidth - track.clientWidth > 2;
      const nextAtStart = track.scrollLeft <= 1;
      const nextAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      setCanScroll(nextCanScroll);
      setAtStart(nextCanScroll ? nextAtStart : true);
      setAtEnd(nextCanScroll ? nextAtEnd : true);
    }

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);
    window.addEventListener("resize", updateScrollState);
    const rafId = window.requestAnimationFrame(updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
      window.removeEventListener("resize", updateScrollState);
      window.cancelAnimationFrame(rafId);
    };
  }, [carouselEnabled, items.length]);

  function handleScroll(direction) {
    const track = trackRef.current;
    if (!track || !carouselEnabled) return;
    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScrollLeft <= 1) return;

    const firstChild = track.firstElementChild;
    const childWidth = firstChild ? firstChild.getBoundingClientRect().width : track.clientWidth;
    const stepItems = toVisibleCount(scrollStepItems, 1);
    const step = (childWidth + getTrackGap(track)) * stepItems;
    track.scrollBy({ left: direction * step, behavior: getScrollBehavior() });
  }

  const wrapperClassName = [
    "card-rail",
    `is-${itemType}`,
    isCarouselMode ? "is-carousel" : "is-default",
      "is-hover-reveal",
      "is-peek",
      canScroll ? "is-scrollable" : "is-static",
      hoverPreview ? "has-hover-preview" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

  const shouldRenderArrows = showArrows && carouselEnabled;
  const shouldRenderHoverPreview = hoverPreview && typeof document !== "undefined";
  const hoverPreviewTransformOrigin = hoverPreview
    ? hoverPreview.side === "left"
      ? "left 12%"
      : hoverPreview.side === "right"
        ? "right 12%"
        : "center 12%"
    : "center 12%";

  return (
    <>
      <div className={wrapperClassName} role="region" aria-label={label} style={railStyle}>
        {shouldRenderArrows ? (
          <button
            className="card-rail-nav is-prev"
            type="button"
            onClick={() => handleScroll(-1)}
            disabled={!canScroll || atStart}
            aria-label={`Defiler ${label} vers la gauche`}
          >
            {"<"}
          </button>
        ) : null}
        <div className="card-rail-viewport">
          <div ref={trackRef} className="card-rail-track">
            {renderedItems}
          </div>
        </div>
        {shouldRenderArrows ? (
          <button
            className="card-rail-nav is-next"
            type="button"
            onClick={() => handleScroll(1)}
            disabled={!canScroll || atEnd}
            aria-label={`Defiler ${label} vers la droite`}
          >
            {">"}
          </button>
        ) : null}
      </div>
      {shouldRenderHoverPreview
        ? createPortal(
            <div
              ref={overlayRef}
              className="card-rail-hover-overlay"
              aria-hidden="true"
              style={{
                top: `${hoverPreview.top}px`,
                left: `${hoverPreview.left}px`,
                width: `${hoverPreview.width}px`,
                transform: `scale(${hoverPreview.scale})`,
                transformOrigin: hoverPreviewTransformOrigin,
              }}
              onMouseLeave={(event) => clearHoverPreview(hoverPreview.index, event)}
            >
              <div ref={overlayContentRef} className="card-rail-hover-overlay-content" />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

export default HorizontalCardRail;
