import './Dashboard.css'

function Dashboard({ stats }) {
  if (!stats) return null

  return (
    <div className="dashboard">
      <h2>📊 Daily Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-label">Calories Burned</div>
            <div className="stat-value">{stats.totalCalories}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-label">Total Duration</div>
            <div className="stat-value">{stats.totalDuration} min</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-label">Activities</div>
            <div className="stat-value">{stats.activities}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-label">Date</div>
            <div className="stat-value">{new Date(stats.date).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
