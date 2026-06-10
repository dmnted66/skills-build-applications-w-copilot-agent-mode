import mongoose from 'mongoose'
import type { Document } from 'mongoose'

// TypeScript interface
export interface IGoal extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  name: string
  target: number
  current: number
  unit: string
  createdAt: Date
  updatedAt: Date
}

// Mongoose schema
const goalSchema = new mongoose.Schema<IGoal>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    target: {
      type: Number,
      required: true,
      min: 1
    },
    current: {
      type: Number,
      default: 0,
      min: 0
    },
    unit: {
      type: String,
      trim: true,
      maxlength: 50
    }
  },
  { timestamps: true }
)

// Index for querying goals by user
goalSchema.index({ userId: 1, createdAt: -1 })

export const Goal = mongoose.model<IGoal>('Goal', goalSchema)
