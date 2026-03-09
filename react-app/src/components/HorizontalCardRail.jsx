import { Children, useEffect, useMemo, useRef, useState } from "react";

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
  const isCarouselMode = mode === "carousel";
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

  const renderedItems = items.map((item, itemIndex) => (
    <div
      key={`rail-${itemIndex}`}
      className={[
        "card-rail-item",
        hoverEdge?.index === itemIndex && hoverEdge.side === "left" ? "is-edge-left" : "",
        hoverEdge?.index === itemIndex && hoverEdge.side === "right" ? "is-edge-right" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={(event) => {
        updateHoverEdge(itemIndex, event.currentTarget);
      }}
      onMouseLeave={(event) => {
        clearHoverEdge(itemIndex, event);
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
      className,
    ]
      .filter(Boolean)
      .join(" ");

  const shouldRenderArrows = showArrows && carouselEnabled;
  return (
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
  );
}

export default HorizontalCardRail;
