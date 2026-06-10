#!/usr/bin/env python3
"""
OctoFit Tracker Backend API

A simple REST API for fitness tracking that manages activities, goals, and user stats.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import json
import os

app = Flask(__name__)
CORS(app)

# In-memory data storage (in production, use a database)
users = {}
activities = {}
goals = {}

# Helper functions
def get_user_id_from_request():
    """Extract user ID from request headers"""
    return request.headers.get('X-User-ID', 'default-user')

def generate_activity_id():
    """Generate a unique activity ID"""
    return f"activity_{datetime.now().timestamp()}"

# User endpoints
@app.route('/api/users', methods=['GET'])
def get_user():
    """Get user profile"""
    user_id = get_user_id_from_request()
    if user_id not in users:
        users[user_id] = {
            'id': user_id,
            'name': 'Octo Fit',
            'email': 'user@octofit.com',
            'created_at': datetime.now().isoformat()
        }
    return jsonify(users[user_id])

@app.route('/api/users', methods=['POST'])
def create_user():
    """Create a new user"""
    user_id = get_user_id_from_request()
    data = request.json
    users[user_id] = {
        'id': user_id,
        'name': data.get('name', 'Octo Fit'),
        'email': data.get('email', 'user@octofit.com'),
        'created_at': datetime.now().isoformat()
    }
    return jsonify(users[user_id]), 201

# Activity endpoints
@app.route('/api/activities', methods=['GET'])
def get_activities():
    """Get all activities for a user"""
    user_id = get_user_id_from_request()
    user_activities = [a for a in activities.values() if a['user_id'] == user_id]
    return jsonify(user_activities)

@app.route('/api/activities', methods=['POST'])
def create_activity():
    """Log a new activity"""
    user_id = get_user_id_from_request()
    data = request.json
    
    activity_id = generate_activity_id()
    activity = {
        'id': activity_id,
        'user_id': user_id,
        'type': data.get('type', 'Other'),
        'duration': data.get('duration', 0),
        'intensity': data.get('intensity', 'Medium'),
        'notes': data.get('notes', ''),
        'calories': data.get('calories', 0),
        'created_at': datetime.now().isoformat()
    }
    
    activities[activity_id] = activity
    return jsonify(activity), 201

@app.route('/api/activities/<activity_id>', methods=['GET'])
def get_activity(activity_id):
    """Get a specific activity"""
    if activity_id not in activities:
        return jsonify({'error': 'Activity not found'}), 404
    return jsonify(activities[activity_id])

@app.route('/api/activities/<activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    """Delete an activity"""
    if activity_id not in activities:
        return jsonify({'error': 'Activity not found'}), 404
    
    del activities[activity_id]
    return '', 204

# Goals endpoints
@app.route('/api/goals', methods=['GET'])
def get_goals():
    """Get all goals for a user"""
    user_id = get_user_id_from_request()
    user_goals = [g for g in goals.values() if g['user_id'] == user_id]
    return jsonify(user_goals)

@app.route('/api/goals', methods=['POST'])
def create_goal():
    """Create a new goal"""
    user_id = get_user_id_from_request()
    data = request.json
    
    goal_id = f"goal_{datetime.now().timestamp()}"
    goal = {
        'id': goal_id,
        'user_id': user_id,
        'name': data.get('name', ''),
        'target': data.get('target', 0),
        'current': data.get('current', 0),
        'unit': data.get('unit', ''),
        'created_at': datetime.now().isoformat()
    }
    
    goals[goal_id] = goal
    return jsonify(goal), 201

@app.route('/api/goals/<goal_id>', methods=['PUT'])
def update_goal(goal_id):
    """Update a goal"""
    if goal_id not in goals:
        return jsonify({'error': 'Goal not found'}), 404
    
    data = request.json
    goals[goal_id]['current'] = data.get('current', goals[goal_id]['current'])
    goals[goal_id]['target'] = data.get('target', goals[goal_id]['target'])
    
    return jsonify(goals[goal_id])

# Stats endpoints
@app.route('/api/stats/daily', methods=['GET'])
def get_daily_stats():
    """Get daily statistics for a user"""
    user_id = get_user_id_from_request()
    today = datetime.now().date()
    
    today_activities = [
        a for a in activities.values()
        if a['user_id'] == user_id and 
        datetime.fromisoformat(a['created_at']).date() == today
    ]
    
    total_calories = sum(a['calories'] for a in today_activities)
    total_duration = sum(a['duration'] for a in today_activities)
    activity_count = len(today_activities)
    
    return jsonify({
        'date': today.isoformat(),
        'total_calories': total_calories,
        'total_duration': total_duration,
        'activities': activity_count,
        'activities_list': today_activities
    })

@app.route('/api/stats/weekly', methods=['GET'])
def get_weekly_stats():
    """Get weekly statistics for a user"""
    user_id = get_user_id_from_request()
    today = datetime.now().date()
    week_ago = today - timedelta(days=7)
    
    week_activities = [
        a for a in activities.values()
        if a['user_id'] == user_id and
        week_ago <= datetime.fromisoformat(a['created_at']).date() <= today
    ]
    
    total_calories = sum(a['calories'] for a in week_activities)
    total_duration = sum(a['duration'] for a in week_activities)
    activity_types = {}
    
    for activity in week_activities:
        activity_type = activity['type']
        activity_types[activity_type] = activity_types.get(activity_type, 0) + 1
    
    return jsonify({
        'start_date': week_ago.isoformat(),
        'end_date': today.isoformat(),
        'total_calories': total_calories,
        'total_duration': total_duration,
        'total_activities': len(week_activities),
        'activity_breakdown': activity_types
    })

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🐙 OctoFit Tracker Backend API")
    print("Starting server on http://localhost:5000")
    print("API Documentation: http://localhost:5000/api/health")
    app.run(debug=True, port=5000)
