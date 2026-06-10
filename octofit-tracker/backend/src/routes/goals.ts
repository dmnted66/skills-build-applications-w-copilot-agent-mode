import { Router } from 'express'
import type { AuthRequest } from '../middleware/index.js'
import { goalService, userService } from '../services/mongoService.js'

export const goalRouter = Router()

// Get all goals for user
goalRouter.get('/', async (req: AuthRequest, res) => {
  try {
    const user = await userService.getUser(req.userId!)
    if (!user) {
      res.status(401).json({ success: false, error: 'User not found' })
      return
    }

    const goals = await goalService.getGoals(user._id)
    res.json({
      success: true,
      data: goals
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch goals'
    })
  }
})

// Create new goal
goalRouter.post('/', async (req: AuthRequest, res) => {
  try {
    const { name, target, current, unit } = req.body

    if (!name || !target) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, target'
      })
      return
    }

    const user = await userService.getOrCreateUser(req.userId!, 'User', `${req.userId}@octofit.local`)

    const goal = await goalService.createGoal(user._id, name, target, current || 0, unit || '')

    res.status(201).json({
      success: true,
      data: goal
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create goal'
    })
  }
})

// Get specific goal
goalRouter.get('/:id', async (req: AuthRequest, res) => {
  try {
    const goal = await goalService.getGoal(req.params.id as any)

    if (!goal) {
      res.status(404).json({
        success: false,
        error: 'Goal not found'
      })
      return
    }

    const user = await userService.getUser(req.userId!)
    if (!user || goal.userId.toString() !== user._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized'
      })
      return
    }

    res.json({
      success: true,
      data: goal
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch goal'
    })
  }
})

// Update goal
goalRouter.put('/:id', async (req: AuthRequest, res) => {
  try {
    const goal = await goalService.getGoal(req.params.id as any)

    if (!goal) {
      res.status(404).json({
        success: false,
        error: 'Goal not found'
      })
      return
    }

    const user = await userService.getUser(req.userId!)
    if (!user || goal.userId.toString() !== user._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized'
      })
      return
    }

    const updated = await goalService.updateGoal(req.params.id as any, req.body)
    res.json({
      success: true,
      data: updated
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update goal'
    })
  }
})

// Delete goal
goalRouter.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const goal = await goalService.getGoal(req.params.id as any)

    if (!goal) {
      res.status(404).json({
        success: false,
        error: 'Goal not found'
      })
      return
    }

    const user = await userService.getUser(req.userId!)
    if (!user || goal.userId.toString() !== user._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Unauthorized'
      })
      return
    }

    await goalService.deleteGoal(req.params.id as any)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete goal'
    })
  }
})
