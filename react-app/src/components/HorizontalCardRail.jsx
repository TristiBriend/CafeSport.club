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

function normalizeWheelDelta(delta, deltaMode) {
  if (!Number.isFinite(delta)) return 0;
  if (deltaMode === 1) return delta * 16;
  if (deltaMode === 2) return delta * window.innerHeight;
  return delta;
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
  visibleDesktop = 4,
  visibleTablet = 3,
  visibleMobile = 1.15,
  showArrows = true,
  scrollStepItems = 1,
  loop = true,
  className = "",
}) {
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const wheelVelocityRef = useRef(0);
  const wheelFrameRef = useRef(0);
  const wheelSettleTimerRef = useRef(0);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const isCarouselMode = mode === "carousel";
  const items = useMemo(
    () => Children.toArray(children).filter(Boolean),
    [children],
  );
  const visibleDesktopSlots = Math.max(1, Math.floor(toVisibleCount(visibleDesktop, 4)));
  const carouselEnabled = isCarouselMode && items.length > visibleDesktopSlots;
  const shouldLoopTrack = carouselEnabled && loop && items.length > 1;
  const renderedItems = useMemo(() => {
    const copyIndexes = shouldLoopTrack ? [0, 1, 2] : [1];
    return copyIndexes.flatMap((copyIndex) =>
      items.map((item, itemIndex) => (
        <div
          key={`rail-${copyIndex}-${itemIndex}`}
          className="card-rail-item"
          data-loop-copy={copyIndex === 1 ? "main" : "clone"}
        >
          {item}
        </div>
      )),
    );
  }, [items, shouldLoopTrack]);

  const railStyle = useMemo(
    () => ({
      "--card-rail-visible-desktop": toVisibleCount(visibleDesktop, 4),
      "--card-rail-visible-tablet": toVisibleCount(visibleTablet, 3),
      "--card-rail-visible-mobile": toVisibleCount(visibleMobile, 1.15),
    }),
    [visibleDesktop, visibleMobile, visibleTablet],
  );

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return undefined;

    function centerLoopTrackIfNeeded() {
      if (!shouldLoopTrack) return;
      const oneLoopWidth = track.scrollWidth / 3;
      if (oneLoopWidth <= 1) return;
      if (track.scrollLeft < oneLoopWidth * 0.5) {
        track.scrollLeft = oneLoopWidth;
      }
    }

    function updateScrollState() {
      if (!carouselEnabled) {
        setCanScroll(false);
        setAtStart(true);
        setAtEnd(true);
        return;
      }

      if (shouldLoopTrack) {
        const oneLoopWidth = track.scrollWidth / 3;
        if (oneLoopWidth > 1) {
          if (track.scrollLeft <= 1) {
            track.scrollLeft += oneLoopWidth;
          } else if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
            track.scrollLeft -= oneLoopWidth;
          }
        }
      }

      const firstChild = track.firstElementChild;
      const childWidth = firstChild ? firstChild.getBoundingClientRect().width : track.clientWidth;
      const logicalItemsWidth =
        childWidth * items.length + getTrackGap(track) * Math.max(0, items.length - 1);
      const nextCanScroll = shouldLoopTrack ? items.length > 1 : logicalItemsWidth - track.clientWidth > 2;
      const nextAtStart = track.scrollLeft <= 1;
      const nextAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      setCanScroll(nextCanScroll);
      setAtStart(shouldLoopTrack ? false : nextCanScroll ? nextAtStart : true);
      setAtEnd(shouldLoopTrack ? false : nextCanScroll ? nextAtEnd : true);
    }

    centerLoopTrackIfNeeded();
    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });

    function stopWheelAnimation() {
      if (wheelFrameRef.current) {
        window.cancelAnimationFrame(wheelFrameRef.current);
        wheelFrameRef.current = 0;
      }
      wheelVelocityRef.current = 0;
    }

    function markWheelScrolling() {
      rail.classList.add("is-wheel-scrolling");
      if (wheelSettleTimerRef.current) {
        window.clearTimeout(wheelSettleTimerRef.current);
      }
      wheelSettleTimerRef.current = window.setTimeout(() => {
        rail.classList.remove("is-wheel-scrolling");
        wheelSettleTimerRef.current = 0;
      }, 140);
    }

    function startWheelAnimation() {
      if (wheelFrameRef.current) return;

      function tick() {
        let velocity = wheelVelocityRef.current;
        if (Math.abs(velocity) < 0.1) {
          stopWheelAnimation();
          return;
        }

        if (shouldLoopTrack) {
          track.scrollLeft += velocity;
        } else {
          const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
          if (maxScrollLeft <= 1) {
            stopWheelAnimation();
            return;
          }

          const nextScrollLeft = Math.max(0, Math.min(maxScrollLeft, track.scrollLeft + velocity));
          track.scrollLeft = nextScrollLeft;

          if ((nextScrollLeft <= 0 && velocity < 0) || (nextScrollLeft >= maxScrollLeft && velocity > 0)) {
            velocity = 0;
          }
        }

        wheelVelocityRef.current = velocity * 0.94;
        wheelFrameRef.current = window.requestAnimationFrame(tick);
      }

      wheelFrameRef.current = window.requestAnimationFrame(tick);
    }

    function handleWheel(event) {
      if (!carouselEnabled) return;
      const deltaX = normalizeWheelDelta(event.deltaX, event.deltaMode);
      const horizontalThreshold = 2;
      const hasHorizontalIntent = Math.abs(deltaX) >= horizontalThreshold;
      if (!hasHorizontalIntent) return;

      const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      if (!shouldLoopTrack && maxScrollLeft <= 1) return;

      const canMove = shouldLoopTrack
        ? items.length > 1
        : deltaX < 0
          ? track.scrollLeft > 0
          : track.scrollLeft < maxScrollLeft;

      if (!canMove) return;
      event.preventDefault();
      markWheelScrolling();
      const clampedInput = Math.max(-48, Math.min(48, deltaX));
      const nextVelocity = wheelVelocityRef.current + clampedInput * 0.7;
      wheelVelocityRef.current = Math.max(-90, Math.min(90, nextVelocity));
      startWheelAnimation();
    }
    rail.addEventListener("wheel", handleWheel, { passive: false });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);
    window.addEventListener("resize", updateScrollState);
    const rafId = window.requestAnimationFrame(() => {
      centerLoopTrackIfNeeded();
      updateScrollState();
    });

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      rail.removeEventListener("wheel", handleWheel);
      stopWheelAnimation();
      if (wheelSettleTimerRef.current) {
        window.clearTimeout(wheelSettleTimerRef.current);
        wheelSettleTimerRef.current = 0;
      }
      rail.classList.remove("is-wheel-scrolling");
      observer.disconnect();
      window.removeEventListener("resize", updateScrollState);
      window.cancelAnimationFrame(rafId);
    };
  }, [carouselEnabled, items.length, shouldLoopTrack]);

  function handleScroll(direction) {
    const track = trackRef.current;
    if (!track || !carouselEnabled) return;
    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScrollLeft <= 1) return;

    if (loop && !shouldLoopTrack && direction > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: getScrollBehavior() });
      return;
    }
    if (loop && !shouldLoopTrack && direction < 0 && atStart) {
      track.scrollTo({ left: maxScrollLeft, behavior: getScrollBehavior() });
      return;
    }

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
    <div ref={railRef} className={wrapperClassName} role="region" aria-label={label} style={railStyle}>
      {shouldRenderArrows ? (
        <button
          className="card-rail-nav is-prev"
          type="button"
          onClick={() => handleScroll(-1)}
          disabled={!canScroll || (!loop && atStart)}
          aria-label={`Defiler ${label} vers la gauche`}
        >
          {"<"}
        </button>
      ) : null}
      <div ref={trackRef} className="card-rail-track">
        {renderedItems}
      </div>
      {shouldRenderArrows ? (
        <button
          className="card-rail-nav is-next"
          type="button"
          onClick={() => handleScroll(1)}
          disabled={!canScroll || (!loop && atEnd)}
          aria-label={`Defiler ${label} vers la droite`}
        >
          {">"}
        </button>
      ) : null}
    </div>
  );
}

export default HorizontalCardRail;
