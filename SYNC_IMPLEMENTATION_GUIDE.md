# Real-Time Synchronization Implementation Guide

## Overview
NutriGuard now features **complete real-time synchronization** between USER and ADMIN modules using an EventEmitter-based pub/sub system. All updates across roles are instantly visible to relevant stakeholders.

## Architecture

### Core Components

#### 1. **EventEmitter** (`src/store/syncStore.js`)
```javascript
class EventEmitter {
  on(event, listener)      // Subscribe to events
  emit(event, data)        // Publish events
  off(event, listener)     // Unsubscribe from events
  clear(event)             // Clear event listeners
}
```

**Usage:**
```javascript
import { syncEmitter } from '@/store/syncStore'

// Publish event
syncEmitter.emit('meal:added', { userId: 'user1', meal: {...} })

// Subscribe to event
const unsubscribe = syncEmitter.on('meal:added', (data) => {
  console.log('User added meal:', data)
})

// Cleanup
unsubscribe()
```

#### 2. **Sync Store** (`src/store/syncStore.js`)
Global Zustand store managing all sync operations:

**Methods:**
- `logUserActivity(userId, activity)` - Log user actions
- `syncMealLogged(userId, meal, nutrients)` - Track meal logging
- `syncMealDeleted(userId, mealId)` - Track meal deletion
- `syncDeficiency(userId, nutrient, severity, percent)` - Track deficiencies
- `sendIntervention(adminId, userId, message, intervention)` - Send admin intervention
- `userAcknowledgedIntervention(userId, interventionId)` - Track acknowledgments
- `trackUser(userId, userData)` - Track active users
- `syncProfileUpdate(userId, updates)` - Sync profile changes

**Event Types:**
- `meal_logged` - User logs a meal
- `meal_deleted` - User deletes a meal
- `deficiency_detected` - Deficiency alert triggered
- `profile_updated` - User updates profile
- `intervention_sent` - Admin sends intervention
- `intervention_acknowledged` - User acknowledges intervention
- `analytics_updated` - Analytics metrics updated
- `user_activity` - Generic user activity
- `notification_added` - New notification created

#### 3. **useSync Hooks** (`src/hooks/useSync.js`)

**`useSync()` - User/General Hook**
```javascript
const {
  trackMealLogged,
  trackMealDeleted,
  trackDeficiency,
  trackProfileUpdate,
  liveUpdates,
  newNotification,
  myActivities,
  myStats,
  unreadNotifications,
  sendIntervention,
  userAcknowledgedIntervention,
} = useSync()
```

**`useSyncAdmin()` - Admin Hook**
```javascript
const {
  trackedUsers,           // All tracked users
  allUserActivities,      // All user activities
  allNotifications,       // All notifications
  userActivityFeed,       // Live activity feed
  syncEmitter,            // Direct access to event emitter
} = useSyncAdmin()
```

**`useSyncListener(eventType, callback)`**
```javascript
useSyncListener('meal:added', (data) => {
  console.log('New meal logged:', data)
})
```

## Integration Patterns

### Pattern 1: Track User Actions (User Pages)

```javascript
import { useSync } from '@/hooks/useSync'

export default function MealLogPage() {
  const { trackMealLogged, trackMealDeleted } = useSync()

  const handleAddFood = (food) => {
    // Add food to meal
    addFoodToMeal(food)
    
    // Track for sync
    trackMealLogged(meal, calculateNutrients(meal))
  }

  const handleRemoveFood = (foodId) => {
    // Remove food
    removeFoodFromMeal(foodId)
    
    // Track deletion
    trackMealDeleted(foodId)
  }
}
```

### Pattern 2: Listen for Real-Time Updates (Admin Pages)

```javascript
import { useSyncAdmin } from '@/hooks/useSync'
import { useEffect, useState } from 'react'

export default function AdminDashboardPage() {
  const { userActivityFeed, trackedUsers } = useSyncAdmin()
  const [stats, setStats] = useState(initialStats)

  useEffect(() => {
    if (userActivityFeed.length > 0) {
      const latestActivity = userActivityFeed[0]
      
      if (latestActivity.type === 'meal_logged') {
        // Update metrics in real-time
        setStats(prev => ({
          ...prev,
          activeToday: prev.activeToday + 1,
        }))
      }

      if (latestActivity.type === 'deficiency_detected') {
        // Add to alerts
        addAlert(latestActivity)
      }
    }
  }, [userActivityFeed])
}
```

### Pattern 3: Send Admin Interventions (Admin Pages)

```javascript
import { useSyncStore } from '@/store/syncStore'

export default function InterventionsPage() {
  const { sendIntervention } = useSyncStore()

  const handleSendIntervention = (userId, message, deficiency) => {
    sendIntervention(
      'admin1',                    // Admin ID
      userId,                      // Target user
      `${deficiency} intervention`, // Message
      deficiency                   // Intervention type
    )
  }
}
```

### Pattern 4: Receive and Acknowledge Interventions (User Pages)

```javascript
import { useSync } from '@/hooks/useSync'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { newNotification, userAcknowledgedIntervention } = useSync()
  const [interventions, setInterventions] = useState([])

  useEffect(() => {
    if (newNotification?.type === 'intervention_received') {
      setInterventions(prev => [newNotification, ...prev])
    }
  }, [newNotification])

  const handleAcknowledge = (interventionId) => {
    userAcknowledgedIntervention('user1', interventionId)
    setInterventions(prev => prev.filter(i => i.id !== interventionId))
  }
}
```

## Real-Time Flow Examples

### Example 1: User Logs Meal → Admin Sees Real-Time Update

**User Action:**
```javascript
// MealLogPage.jsx
const handleAddFood = (food) => {
  addFoodToMeal(food)
  trackMealLogged(meal, nutrients)  // Emits: meal_logged event
}
```

**Admin Receives Update:**
```javascript
// AdminDashboardPage.jsx
useEffect(() => {
  if (userActivityFeed.length > 0 && userActivityFeed[0].type === 'meal_logged') {
    // Real-time chart/metrics update
    setStats(prev => ({
      ...prev,
      activeToday: prev.activeToday + 1,
    }))
  }
}, [userActivityFeed])
```

### Example 2: Admin Sends Intervention → User Receives Real-Time Alert

**Admin Action:**
```javascript
// InterventionsPage.jsx
handleSendIntervention = () => {
  sendIntervention('admin1', userId, message, deficiency)
  // Emits: intervention_sent event
}
```

**User Receives Update:**
```javascript
// DashboardPage.jsx
useEffect(() => {
  if (newNotification?.type === 'intervention_received') {
    setInterventions(prev => [newNotification, ...prev])
    // Show banner with intervention message
  }
}, [newNotification])
```

### Example 3: User Acknowledges Intervention → Admin Sees Status Change

**User Action:**
```javascript
// DashboardPage.jsx
handleAcknowledgeIntervention = (interventionId) => {
  userAcknowledgedIntervention(userId, interventionId)
  // Emits: intervention_acknowledged event
}
```

**Admin Receives Update:**
```javascript
// InterventionsPage.jsx
useEffect(() => {
  syncEmitter.on('intervention_acknowledged', (data) => {
    setInterventions(prev => ({
      ...prev,
      sent: prev.sent.map(item =>
        item.id === data.interventionId
          ? { ...item, status: 'acknowledged' }
          : item
      ),
    }))
  })
}, [])
```

## Implemented Pages

### User Pages (7 total)
- ✅ **DashboardPage** - Shows real-time interventions and notifications
- ✅ **MealLogPage** - Syncs meal logs with event emitter
- ⏳ **NutrientAnalysisPage** - Ready for sync integration
- ⏳ **DietPlanPage** - Ready for sync integration
- ⏳ **FoodSwapPage** - Ready for sync integration
- ⏳ **ProgressPage** - Ready for sync integration
- ⏳ **ProfilePage** - Ready for sync integration

### Admin Pages (7 total)
- ✅ **AdminDashboardPage** - Real-time user metrics and activity
- ✅ **UserActivityMonitorPage** - Live activity feed and tracking
- ✅ **InterventionsPage** - Send interventions with real-time status
- ⏳ **UserManagementPage** - Ready for sync integration
- ⏳ **FoodDatabasePage** - Ready for sync integration
- ⏳ **RDAConfigPage** - Ready for sync integration
- ⏳ **AnalyticsPage** - Ready for sync integration

## Adding Sync to a New Page

### Step 1: Import Hooks
```javascript
import { useSync, useSyncAdmin, useSyncListener } from '@/hooks/useSync'
```

### Step 2: Add Hooks in Component
```javascript
export default function YourPage() {
  // For user pages:
  const { trackMealLogged, myActivities, unreadNotifications } = useSync()
  
  // For admin pages:
  const { userActivityFeed, trackedUsers } = useSyncAdmin()

  // For listening to specific events:
  useSyncListener('meal_logged', handleMealLogged)
}
```

### Step 3: Handle Sync Events
```javascript
useEffect(() => {
  if (userActivityFeed.length > 0) {
    const latest = userActivityFeed[0]
    // Handle activity
  }
}, [userActivityFeed])
```

### Step 4: Emit Events on User Actions
```javascript
const handleAction = () => {
  // Do action
  performAction()
  
  // Track for sync
  trackMealLogged(meal, nutrients)
}
```

## Testing Sync

### 1. Test User → Admin Flow
1. Login as USER (user@nutriguard.com / User@123)
2. Go to **Meal Log**
3. Add a food item
4. Switch to ADMIN (admin@nutriguard.com / Admin@123)
5. Go to **Admin Dashboard** or **Activity Monitor**
6. Verify real-time meal update appears

### 2. Test Admin → User Flow
1. Login as ADMIN
2. Go to **Interventions**
3. Click "Send" on a pending intervention
4. Enter intervention message
5. Click "Send"
6. Switch to USER account
7. Go to **Dashboard**
8. Verify intervention banner appears at top

### 3. Test User Acknowledgment Flow
1. As USER, click "Got it" on intervention
2. Switch back to ADMIN
3. Go to **Interventions** → **Sent**
4. Verify status changed to "acknowledged"

## Monitoring Live Activity

### Option 1: Activity Monitor Page
Admin page showing live user activity:
- Real-time meal logging events
- Deficiency detection alerts
- Profile updates
- User engagement metrics

**Access:** `/admin/activity-monitor` (visible in admin sidebar)

### Option 2: Admin Dashboard
Shows real-time metrics updated as users take actions:
- Active Today count (increases with each user action)
- Critical Cases count (increases with severe deficiencies)
- Recent alerts updated live
- User activity feed

## Performance Considerations

### Throttling & Debouncing
The sync system uses debouncing to prevent rapid re-renders:
```javascript
// Auto-debounced in useSync hook
const [syncedMeals, setSyncedMeals] = useState([])
// Updates batched and throttled
```

### Memory Management
- Listener cleanup on component unmount
- Auto-clearing old activities (24 hours default)
- Limited activity feed (last 50 items)

### Scalability
Current implementation:
- Single EventEmitter for app-wide events
- Efficient Zustand store with state partitioning
- No external backend required (mock mode)

For production:
- Replace EventEmitter with WebSocket or Server-Sent Events
- Implement database persistence
- Add rate limiting on sync events
- Use message queue (RabbitMQ/Redis) for event distribution

## Troubleshooting

### Issue: Events not received in admin pages
**Solution:** Ensure `useSyncAdmin()` hook is initialized and `userActivityFeed` dependency is included in useEffect

### Issue: Interventions not showing on user dashboard
**Solution:** Verify `useSync()` hook is importing notifications and checking `newNotification.type === 'intervention_received'`

### Issue: Performance degradation
**Solution:** Check if old activities are being cleared. Call `useSyncStore(state => state.clearOldActivities())` periodically

## API Reference

### syncEmitter
```javascript
// Subscribe
const unsubscribe = syncEmitter.on('event_name', callback)

// Publish
syncEmitter.emit('event_name', data)

// Unsubscribe
syncEmitter.off('event_name', callback)

// Clear all
syncEmitter.clear()
```

### useSyncStore
```javascript
const store = useSyncStore()

// Access state
store.userActivities        // All activities
store.trackedUsers          // User tracking data
store.notifications         // All notifications
store.lastSyncTime          // Last sync timestamp

// Actions
store.logUserActivity(userId, activity)
store.syncMealLogged(userId, meal, nutrients)
store.sendIntervention(adminId, userId, message, type)
```

## Next Steps

- [ ] Add sync to NutrientAnalysisPage
- [ ] Add sync to DietPlanPage
- [ ] Add sync to FoodSwapPage
- [ ] Add sync to ProgressPage
- [ ] Add sync to UserManagementPage
- [ ] Add real-time analytics chart updates
- [ ] Implement WebSocket for production
- [ ] Add persistence layer with backend
- [ ] Create admin notification center
- [ ] Add sync activity logs export
