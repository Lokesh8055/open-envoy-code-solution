const StatsGrid = ({ data }) => {
    const stats = [
      { label: "Blank Lines", value: data.blank, key: "blank" },
      { label: "Comments", value: data.comment, key: "comment" },
      { label: "Code Lines", value: data.code, key: "code" },
      { label: "Total Lines", value: data.total, key: "total", isTotal: true },
    ];
  
    return (
      <div className="stats-grid">
        {stats.map(({ label, value, key, isTotal }) => (
          <div key={key} className={`stat-item ${isTotal ? 'total' : ''}`}>
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
          </div>
        ))}
      </div>
    );
  };

export default StatsGrid