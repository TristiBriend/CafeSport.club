function SportFilters({ sports, activeSport, onChange }) {
  const options = ["Tous", ...sports];

  return (
    <div className="filter-row" role="tablist" aria-label="Filtrer par sport">
      {options.map((sport) => (
        <button
          key={sport}
          className={`filter-btn ${activeSport === sport ? "is-active" : ""}`}
          onClick={() => onChange(sport)}
          type="button"
        >
          {sport}
        </button>
      ))}
    </div>
  );
}

export default SportFilters;
