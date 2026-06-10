# OctoFit Tracker

A full-stack fitness tracking application built with GitHub Copilot agent mode.

## 🚀 Overview

OctoFit Tracker is a comprehensive fitness tracking application that helps users monitor their activities, track goals, and maintain a healthy lifestyle. The application consists of a modern frontend interface and a robust backend API.

## 📁 Project Structure

```
octofit-tracker/
├── frontend/          # Web-based user interface
│   ├── index.html     # Main HTML file
│   └── package.json   # Frontend metadata
└── backend/           # Python Flask API
    ├── app.py         # Main application file
    ├── requirements.txt # Python dependencies
    └── package.json   # Backend metadata
```

## ✨ Features

### Frontend
- 📊 **Daily Stats Dashboard** - View calories, steps, and water intake
- 📈 **Weekly Progress Tracking** - Monitor workouts and fitness metrics
- 🎯 **Goal Management** - Set and track personalized fitness goals
- ➕ **Activity Logging** - Log workouts with details and notes
- 📋 **Activity History** - View recent activities and achievements
- 📱 **Responsive Design** - Works on desktop and mobile devices

### Backend API
- 👤 **User Management** - Create and manage user profiles
- 🏃 **Activity Tracking** - Log and retrieve fitness activities
- 🎯 **Goal Management** - Create, update, and track goals
- 📊 **Statistics** - Get daily and weekly fitness statistics
- 💪 **Health Metrics** - Track calories, duration, and intensity
- ✅ **Health Check** - API status monitoring

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (with modern gradients and flexbox)
- Vanilla JavaScript

### Backend
- Python 3.8+
- Flask 2.3.0
- Flask-CORS for cross-origin requests

## 📦 Installation

### Frontend Setup
```bash
cd octofit-tracker/frontend
# No dependencies needed! Just open index.html in a browser
# Or use a local server:
python -m http.server 8000
```

### Backend Setup
```bash
cd octofit-tracker/backend
pip install -r requirements.txt
python app.py
```

The backend will start on `http://localhost:5000`

## 🎯 API Endpoints

### Users
- `GET /api/users` - Get current user profile
- `POST /api/users` - Create new user

### Activities
- `GET /api/activities` - Get all user activities
- `POST /api/activities` - Log new activity
- `GET /api/activities/<id>` - Get specific activity
- `DELETE /api/activities/<id>` - Delete activity

### Goals
- `GET /api/goals` - Get all user goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/<id>` - Update goal

### Statistics
- `GET /api/stats/daily` - Get daily statistics
- `GET /api/stats/weekly` - Get weekly statistics
- `GET /api/health` - API health check

## 🚀 Quick Start

1. **Start the Backend:**
   ```bash
   cd octofit-tracker/backend
   pip install -r requirements.txt
   python app.py
   ```

2. **Start the Frontend:**
   ```bash
   cd octofit-tracker/frontend
   python -m http.server 8000
   ```

3. **Open your browser:**
   - Frontend: http://localhost:8000
   - API: http://localhost:5000/api/health

## 📝 Usage Example

### Logging an Activity
```javascript
fetch('http://localhost:5000/api/activities', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-User-ID': 'user123'
  },
  body: JSON.stringify({
    type: 'Running',
    duration: 45,
    intensity: 'High',
    calories: 500,
    notes: 'Great morning run!'
  })
})
```

### Getting Daily Stats
```javascript
fetch('http://localhost:5000/api/stats/daily', {
  headers: {
    'X-User-ID': 'user123'
  }
})
```

## 🔐 Security Notes

- The current implementation uses in-memory storage (for demo purposes)
- In production, implement proper authentication and database storage
- Use environment variables for sensitive configuration
- Add input validation and rate limiting
- Enable HTTPS for all API communications

## 🤝 Contributing

This project was built as an exercise in GitHub Copilot agent mode. Feel free to fork and extend with additional features!

## 📄 License

MIT License - See LICENSE file for details

## 🎓 Built with GitHub Copilot

This application demonstrates the power of GitHub Copilot in building full-stack applications efficiently and effectively.

---

**Happy tracking! 🏃‍♂️💪🎯**
