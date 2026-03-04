function ObjectDetailHero({
  card = null,
  side = null,
  className = "",
}) {
  const rootClassName = ["object-detail-hero", String(className || "").trim()]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={rootClassName}>
      <div className="object-detail-hero-primary">
        {card}
      </div>
      <div className="object-detail-hero-secondary">
        {side}
      </div>
    </section>
  );
}

export default ObjectDetailHero;
