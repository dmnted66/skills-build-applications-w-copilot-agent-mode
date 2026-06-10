import { Router } from 'express'
import type { AuthRequest } from '../middleware/index.js'
import { activityService, userService } from '../services/mongoService.js'

export const activityRouter = Router()

// Get all activities for user
activityRouter.get('/', async (req: AuthRequest, res) => {
  try {
    const user = await userService.getUser(req.userId!)
    if (!user) {
      res.status(401).json({ success: false, error: 'User not found' })
      return
    }

    const activities = await activityService.getActivities(user._id)
    res.json({
      success: true,
      data: activities
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch activities'
    })
  }
})

// Create new activity
activityRouter.post('/', async (req: AuthRequest, res) => {
  try {
    const { type, duration, intensity, notes, calories } = req.body

    if (!type || !duration) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: type, duration'
      })
      return
    }

    const user = await userService.getOrCreateUser(req.userId!, 'User', `${req.userId}@octofit.local`)

    const activity = await activityService.createActivity(
      user._id,
      type,
      duration,
      intensity || 'Medium',
      notes || '',
      calories || 0
    )

    res.status(201).json({
      success: true,
      data: activity
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create activity'
    })
  }
})

// Get specific activity
activityRouter.get('/:id', async (req: AuthRequest, res) => {
  try {
    const activity = await activityService.getActivity(req.params.id as any)

    if (!activity) {
      res.status(404).json({
        success: false,
        error: 'Activity not found'
      })
      return
    }

    const user = await userService.getUser(req.userId!)
    if (!user || activity.userId.toString() !== user._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized'
      })
      return
    }

    res.json({
      success: true,
      data: activity
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch activity'
    })
  }
})

// Update activity
activityRouter.put('/:id', async (req: AuthRequest, res) => {
  try {
    const activity = await activityService.getActivity(req.params.id as any)

    if (!activity) {
      res.status(404).json({
        success: false,
        error: 'Activity not found'
      })
      return
    }

    const user = await userService.getUser(req.userId!)
    if (!user || activity.userId.toString() !== user._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized'
      })
      return
    }

    const updated = await activityService.updateActivity(req.params.id as any, req.body)
    res.json({
      success: true,
      data: updated
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update activity'
    })
  }
})

// Delete activity
activityRouter.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const activity = await activityService.getActivity(req.params.id as any)

    if (!activity) {
      res.status(404).json({
        success: false,
        error: 'Activity not found'
      })
      return
    }

    const user = await userService.getUser(req.userId!)
    if (!user || activity.userId.toString() !== user._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized'
      })
      return
    }

    await activityService.deleteActivity(req.params.id as any)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete activity'
    })
  }
})
