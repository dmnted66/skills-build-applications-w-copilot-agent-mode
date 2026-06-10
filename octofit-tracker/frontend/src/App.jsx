import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'

function App() {
  const [activities, setActivities] = useState([])
  const [dailyStats, setDailyStats] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchActivities()
    fetchDailyStats()
  }, [])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/activities', {
        headers: {
          'X-User-ID': 'default-user'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setActivities(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDailyStats = async () => {
    try {
      const response = await fetch('/api/stats/daily', {
        headers: {
          'X-User-ID': 'default-user'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setDailyStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching daily stats:', error)
    }
  }

  const handleActivityLogged = () => {
    fetchActivities()
    fetchDailyStats()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐙 OctoFit Tracker</h1>
        <p>Your Personal Fitness Companion</p>
      </header>

      <main className="app-main">
        {dailyStats && <Dashboard stats={dailyStats} />}
        
        <div className="content-grid">
          <section className="section">
            <ActivityForm onActivityLogged={handleActivityLogged} />
          </section>
          
          <section className="section">
            {loading ? (
              <div className="loading">Loading activities...</div>
            ) : (
              <ActivityList activities={activities} onActivityDeleted={fetchActivities} />
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React 19 and Vite | OctoFit Tracker v1.0.0</p>
      </footer>
    </div>
  )
}

export default App
