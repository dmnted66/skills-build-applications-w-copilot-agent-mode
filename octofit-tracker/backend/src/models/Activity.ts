import mongoose from 'mongoose'
import type { Document } from 'mongoose'

// TypeScript interface
export interface IActivity extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  type: string
  duration: number
  intensity: 'Low' | 'Medium' | 'High'
  notes?: string
  calories: number
  createdAt: Date
  updatedAt: Date
}

// Mongoose schema
const activitySchema = new mongoose.Schema<IActivity>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Running', 'Cycling', 'Swimming', 'Gym', 'Yoga', 'Walking', 'Other'],
      index: true
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    intensity: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    }
  },
  { timestamps: true }
)

// Index for querying activities by user and date
activitySchema.index({ userId: 1, createdAt: -1 })

export const Activity = mongoose.model<IActivity>('Activity', activitySchema)
