import { useState } from 'react'
import './ActivityForm.css'

function ActivityForm({ onActivityLogged }) {
  const [formData, setFormData] = useState({
    type: 'Running',
    duration: '',
    intensity: 'Medium',
    calories: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.duration) {
      setMessage('Please enter a duration')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': 'default-user'
        },
        body: JSON.stringify({
          type: formData.type,
          duration: parseInt(formData.duration),
          intensity: formData.intensity,
          calories: parseInt(formData.calories) || 0,
          notes: formData.notes
        })
      })

      if (response.ok) {
        setMessage('Activity logged successfully! 🎉')
        setFormData({
          type: 'Running',
          duration: '',
          intensity: 'Medium',
          calories: '',
          notes: ''
        })
        setTimeout(() => setMessage(''), 3000)
        onActivityLogged()
      } else {
        setMessage('Error logging activity')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="activity-form-container">
      <h2>➕ Log Activity</h2>
      <form onSubmit={handleSubmit} className="activity-form">
        <div className="form-group">
          <label htmlFor="type">Activity Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option>Running</option>
            <option>Cycling</option>
            <option>Swimming</option>
            <option>Gym</option>
            <option>Yoga</option>
            <option>Walking</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              id="duration"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="30"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="intensity">Intensity</label>
            <select
              id="intensity"
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="calories">Calories Burned</label>
          <input
            id="calories"
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any notes about your activity..."
            rows="3"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Logging...' : 'Log Activity'}
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  )
}

export default ActivityForm
