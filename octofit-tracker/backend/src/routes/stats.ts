import { Router } from 'express'
import type { AuthRequest } from '../middleware/index.js'
import { activityService, userService } from '../services/mongoService.js'
import type { DailyStats, WeeklyStats } from '../types/index.js'

export const statsRouter = Router()

// Get daily statistics
statsRouter.get('/daily', async (req: AuthRequest, res) => {
  try {
    const user = await userService.getUser(req.userId!)
    if (!user) {
      res.status(401).json({ success: false, error: 'User not found' })
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const activities = await activityService.getActivities(user._id)
    const todayActivities = activities.filter((activity) => {
      const actDate = new Date(activity.createdAt)
      return actDate >= today && actDate < tomorrow
    })

    const totalCalories = todayActivities.reduce((sum, activity) => sum + activity.calories, 0)
    const totalDuration = todayActivities.reduce((sum, activity) => sum + activity.duration, 0)

    const stats: DailyStats = {
      date: today.toISOString().split('T')[0],
      totalCalories,
      totalDuration,
      activities: todayActivities.length,
      activitiesList: todayActivities
    }

    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily statistics'
    })
  }
})

// Get weekly statistics
statsRouter.get('/weekly', async (req: AuthRequest, res) => {
  try {
    const user = await userService.getUser(req.userId!)
    if (!user) {
      res.status(401).json({ success: false, error: 'User not found' })
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)

    const activities = await activityService.getActivities(user._id)
    const weekActivities = activities.filter((activity) => {
      const actDate = new Date(activity.createdAt)
      return actDate >= weekAgo && actDate <= today
    })

    const totalCalories = weekActivities.reduce((sum, activity) => sum + activity.calories, 0)
    const totalDuration = weekActivities.reduce((sum, activity) => sum + activity.duration, 0)

    const activityBreakdown: Record<string, number> = {}
    weekActivities.forEach((activity) => {
      activityBreakdown[activity.type] = (activityBreakdown[activity.type] || 0) + 1
    })

    const stats: WeeklyStats = {
      startDate: weekAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      totalCalories,
      totalDuration,
      totalActivities: weekActivities.length,
      activityBreakdown
    }

    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weekly statistics'
    })
  }
})
