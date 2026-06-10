import { useState } from 'react'
import './ActivityList.css'

function ActivityList({ activities, onActivityDeleted }) {
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (activityId) => {
    try {
      setDeletingId(activityId)
      const response = await fetch(`/api/activities/${activityId}`, {
        method: 'DELETE',
        headers: {
          'X-User-ID': 'default-user'
        }
      })

      if (response.ok) {
        onActivityDeleted()
      }
    } catch (error) {
      console.error('Error deleting activity:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const getActivityEmoji = (type) => {
    const emojiMap = {
      'Running': '🏃',
      'Cycling': '🚴',
      'Swimming': '🏊',
      'Gym': '💪',
      'Yoga': '🧘',
      'Walking': '🚶',
      'Other': '🏋️'
    }
    return emojiMap[type] || '🏃'
  }

  if (activities.length === 0) {
    return (
      <div className="activity-list-container">
        <h2>📋 Recent Activities</h2>
        <div className="empty-state">
          <p>No activities logged yet. Start by logging your first activity! 🎉</p>
        </div>
      </div>
    )
  }

  return (
    <div className="activity-list-container">
      <h2>📋 Recent Activities ({activities.length})</h2>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity._id} className="activity-item">
            <div className="activity-icon">
              {getActivityEmoji(activity.type)}
            </div>
            <div className="activity-details">
              <div className="activity-type">{activity.type}</div>
              <div className="activity-meta">
                {activity.duration} min • {activity.intensity} intensity
                {activity.calories > 0 && ` • ${activity.calories} cal`}
              </div>
              {activity.notes && <div className="activity-notes">{activity.notes}</div>}
              <div className="activity-time">
                {new Date(activity.createdAt).toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => handleDelete(activity._id)}
              disabled={deletingId === activity._id}
              className="delete-btn"
              title="Delete activity"
            >
              {deletingId === activity._id ? '...' : '×'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityList
