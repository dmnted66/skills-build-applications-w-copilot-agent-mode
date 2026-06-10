# OctoFit Tracker Backend

> Modern Express.js backend with TypeScript and MongoDB

## Quick Start

```bash
# Install dependencies
npm install

# Development (with ts-node)
npm run dev

# Build TypeScript
npm run build

# Production
npm start

# Watch mode
npm run watch

# Linting
npm run lint
npm run lint:fix
```

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express 4.18** - Web framework
- **TypeScript 5.3** - Type safety
- **MongoDB** - Database
- **Mongoose 8.0** - ODM for MongoDB
- **ESLint** - Code linting
- **ts-node** - TypeScript execution

## Prerequisites

- Node.js 18+
- MongoDB 4.4+ (local or cloud)

## Setup MongoDB

### Local MongoDB

```bash
# macOS (with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### MongoDB Cloud (Atlas)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Copy connection string
4. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/octofit-tracker
```

## Configuration

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
PORT=5000
NODE_ENV=development
API_BASE_URL=http://localhost:5000
```

## Database Models

### User
```typescript
{
  externalId: string (unique)
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}
```

### Activity
```typescript
{
  userId: ObjectId (ref: User)
  type: string (enum: Running, Cycling, Swimming, Gym, Yoga, Walking, Other)
  duration: number (minutes)
  intensity: 'Low' | 'Medium' | 'High'
  notes?: string
  calories: number
  createdAt: Date
  updatedAt: Date
}
```

### Goal
```typescript
{
  userId: ObjectId (ref: User)
  name: string
  target: number
  current: number
  unit: string
  createdAt: Date
  updatedAt: Date
}
```

## API Endpoints

### Health Check
- `GET /api/health` - Server status

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create activity
- `GET /api/activities/:id` - Get activity by ID
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create goal
- `GET /api/goals/:id` - Get goal by ID
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

### Statistics
- `GET /api/stats/daily` - Daily statistics
- `GET /api/stats/weekly` - Weekly statistics

## Project Structure

```
src/
├── index.ts                 # Main application
├── db/
│   └── connection.ts       # MongoDB connection
├── models/
│   ├── User.ts            # User schema
│   ├── Activity.ts        # Activity schema
│   └── Goal.ts            # Goal schema
├── types/
│   └── index.ts           # TypeScript type definitions
├── middleware/
│   └── index.ts           # Auth & error middleware
├── services/
│   └── mongoService.ts    # MongoDB service layer
└── routes/
    ├── activities.ts      # Activity endpoints
    ├── goals.ts           # Goal endpoints
    └── stats.ts           # Statistics endpoints
```

## Features

✅ Full TypeScript support  
✅ MongoDB with Mongoose ODM  
✅ Type-safe database models  
✅ RESTful API design  
✅ User authentication via headers  
✅ Error handling middleware  
✅ CORS enabled  
✅ ES Modules support  
✅ Database indexing  
✅ Validation via Mongoose schemas  

## Services

### UserService
- `getOrCreateUser()` - Get or create user
- `getUser()` - Get user by external ID
- `getUserById()` - Get user by MongoDB ID

### ActivityService
- `createActivity()` - Create new activity
- `getActivities()` - Get user activities
- `getActivity()` - Get activity by ID
- `updateActivity()` - Update activity
- `deleteActivity()` - Delete activity
- `getUserActivityStats()` - Get aggregated stats

### GoalService
- `createGoal()` - Create new goal
- `getGoals()` - Get user goals
- `getGoal()` - Get goal by ID
- `updateGoal()` - Update goal
- `deleteGoal()` - Delete goal

## Development Tips

### Add a New Route

```typescript
import { Router } from 'express'
import type { AuthRequest } from '../middleware/index.js'

export const myRouter = Router()

myRouter.get('/', async (req: AuthRequest, res) => {
  try {
    // Your logic
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error message' })
  }
})
```

### Query Activities

```typescript
const activities = await activityService.getActivities(userId)
const specific = await activityService.getActivity(activityId)
```

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Make sure MongoDB is running
```bash
# Check if running
mongo

# Or start it
mongod
```

### Type Errors

```bash
# Rebuild TypeScript
npm run build

# Check for errors
npx tsc --noEmit
```

## Production Deployment

```bash
# Build
npm run build

# Deploy dist/ folder
npm start
```

## Performance Optimizations

- Database indexes on `userId` and `createdAt`
- Efficient queries with proper filtering
- Mongoose schema validation
- Error handling to prevent crashes

---

**Built with Node.js, Express, TypeScript, and MongoDB! 🚀🗄️**
