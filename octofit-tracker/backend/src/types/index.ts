import type { Document } from 'mongoose'

// User types
export interface IUser extends Document {
  externalId: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

// Activity types
export interface IActivity extends Document {
  userId: string
  type: string
  duration: number
  intensity: 'Low' | 'Medium' | 'High'
  notes?: string
  calories: number
  createdAt: Date
  updatedAt: Date
}

// Goal types
export interface IGoal extends Document {
  userId: string
  name: string
  target: number
  current: number
  unit: string
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface DailyStats {
  date: string
  totalCalories: number
  totalDuration: number
  activities: number
  activitiesList: IActivity[]
}

export interface WeeklyStats {
  startDate: string
  endDate: string
  totalCalories: number
  totalDuration: number
  totalActivities: number
  activityBreakdown: Record<string, number>
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
