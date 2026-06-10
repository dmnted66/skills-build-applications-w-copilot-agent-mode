import { User } from '../models/User.js'
import { Activity } from '../models/Activity.js'
import { Goal } from '../models/Goal.js'
import type { IUser, IActivity, IGoal } from '../types/index.js'
import type mongoose from 'mongoose'

export class UserService {
  async getOrCreateUser(externalId: string, name: string, email: string): Promise<IUser> {
    let user = await User.findOne({ externalId })

    if (!user) {
      user = new User({ externalId, name, email })
      await user.save()
    }

    return user
  }

  async getUser(externalId: string): Promise<IUser | null> {
    return User.findOne({ externalId })
  }

  async getUserById(userId: mongoose.Types.ObjectId): Promise<IUser | null> {
    return User.findById(userId)
  }
}

export class ActivityService {
  async createActivity(
    userId: mongoose.Types.ObjectId,
    type: string,
    duration: number,
    intensity: 'Low' | 'Medium' | 'High',
    notes: string,
    calories: number
  ): Promise<IActivity> {
    const activity = new Activity({
      userId,
      type,
      duration,
      intensity,
      notes,
      calories
    })
    return activity.save()
  }

  async getActivities(userId: mongoose.Types.ObjectId): Promise<IActivity[]> {
    return Activity.find({ userId }).sort({ createdAt: -1 })
  }

  async getActivity(activityId: mongoose.Types.ObjectId): Promise<IActivity | null> {
    return Activity.findById(activityId)
  }

  async updateActivity(
    activityId: mongoose.Types.ObjectId,
    updates: Partial<Omit<IActivity, '_id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ): Promise<IActivity | null> {
    return Activity.findByIdAndUpdate(activityId, updates, { new: true })
  }

  async deleteActivity(activityId: mongoose.Types.ObjectId): Promise<IActivity | null> {
    return Activity.findByIdAndDelete(activityId)
  }

  async getUserActivityStats(userId: mongoose.Types.ObjectId): Promise<{
    totalActivities: number
    totalCalories: number
    totalDuration: number
  }> {
    const activities = await Activity.find({ userId })
    return {
      totalActivities: activities.length,
      totalCalories: activities.reduce((sum, a) => sum + a.calories, 0),
      totalDuration: activities.reduce((sum, a) => sum + a.duration, 0)
    }
  }
}

export class GoalService {
  async createGoal(
    userId: mongoose.Types.ObjectId,
    name: string,
    target: number,
    current: number,
    unit: string
  ): Promise<IGoal> {
    const goal = new Goal({
      userId,
      name,
      target,
      current,
      unit
    })
    return goal.save()
  }

  async getGoals(userId: mongoose.Types.ObjectId): Promise<IGoal[]> {
    return Goal.find({ userId }).sort({ createdAt: -1 })
  }

  async getGoal(goalId: mongoose.Types.ObjectId): Promise<IGoal | null> {
    return Goal.findById(goalId)
  }

  async updateGoal(
    goalId: mongoose.Types.ObjectId,
    updates: Partial<Omit<IGoal, '_id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ): Promise<IGoal | null> {
    return Goal.findByIdAndUpdate(goalId, updates, { new: true })
  }

  async deleteGoal(goalId: mongoose.Types.ObjectId): Promise<IGoal | null> {
    return Goal.findByIdAndDelete(goalId)
  }
}

export const userService = new UserService()
export const activityService = new ActivityService()
export const goalService = new GoalService()
