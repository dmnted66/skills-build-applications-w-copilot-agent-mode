import mongoose from 'mongoose'
import type { Document } from 'mongoose'

// TypeScript interface
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  externalId: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

// Mongoose schema
const userSchema = new mongoose.Schema<IUser>(
  {
    externalId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  },
  { timestamps: true }
)

export const User = mongoose.model<IUser>('User', userSchema)
