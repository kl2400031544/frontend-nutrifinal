# Real-Time Sync - Quick Reference

## 🚀 Quick Start for Developers

### Import Hooks
```javascript
import { useSync, useSyncAdmin, useSyncListener } from '@/hooks/useSync'
```

### User Pages - Track Actions
```javascript
export default function MealLogPage() {
  const { trackMealLogged, trackMealDeleted, trackDeficiency } = useSync()
  
  // Emit event when user logs meal
  handleAddFood() {
    addFood()
    trackMealLogged(meal, nutrients)
  }
}
```

### Admin Pages - Listen for Updates
```javascript
export default function AdminDashboardPage() {
  const { userActivityFeed } = useSyncAdmin()
  const [stats, setStats] = useState(initialStats)

  useEffect(() => {
    if (userActivityFeed.length > 0) {
      updateStats(userActivityFeed[0])
    }
  }, [userActivityFeed])
}
```

### Send Admin Intervention
```javascript
import { useSyncStore } from '@/store/syncStore'

export default function InterventionsPage() {
  const { sendIntervention } = useSyncStore()
  
  handleSend() {
    sendIntervention(
      'admin1',              // Admin ID
      userId,                // Target user
      message,               // Message content
      deficiency             // Type: 'Vitamin D', 'Iron', etc
    )
  }
}
```

### User Receives Intervention
```javascript
export default function DashboardPage() {
  const { newNotification } = useSync()
  const [interventions, setInterventions] = useState([])

  useEffect(() => {
    if (newNotification?.type === 'intervention_received') {
      setInterventions(prev => [newNotification, ...prev])
    }
  }, [newNotification])
}
```

---

## 📊 Event Types

```javascript
// Events emitted by users
'meal_logged'              // User logs food
'meal_deleted'             // User deletes meal
'deficiency_detected'      // System detects deficiency
'profile_updated'          // User updates profile

// Events emitted by admins
'intervention_sent'        // Admin sends message
'intervention_acknowledged' // User acknowledges
```

---

## 🔌 Available Hooks

### useSync() - For User Pages
```javascript
const {
  trackMealLogged,           // (meal, nutrients) → emit event
  trackMealDeleted,          // (mealId) → emit event
  trackDeficiency,           // (nutrient, severity, percent)
  trackProfileUpdate,        // (updates) → emit event
  liveUpdates,               // Array of recent updates
  newNotification,           // Latest notification received
  myActivities,              // User's own activities
  myStats,                   // User's statistics
  unreadNotifications,       // Array of unread messages
  sendIntervention,          // Send message (admin only)
  userAcknowledgedIntervention, // Mark as read
} = useSync()
```

### useSyncAdmin() - For Admin Pages
```javascript
const {
  trackedUsers,              // { userId: { data } }
  allUserActivities,         // Array of all activities
  allNotifications,          // Array of all notifications
  userActivityFeed,          // Live feed (last 50 items)
  syncEmitter,               // Direct event access
} = useSyncAdmin()
```

### useSyncListener(eventType, callback)
```javascript
// Listen for specific event
useSyncListener('meal_logged', (data) => {
  console.log('User logged meal:', data)
})
```

---

## 🎯 Common Patterns

### Pattern: Display Real-Time Metrics
```javascript
const { userActivityFeed } = useSyncAdmin()
const [activeUsers, setActiveUsers] = useState(0)

useEffect(() => {
  if (userActivityFeed.length > 0) {
    // Count unique users in last hour
    setActiveUsers(getUniqueUsers(userActivityFeed))
  }
}, [userActivityFeed])
```

### Pattern: Show Activity List
```javascript
const { userActivityFeed } = useSyncAdmin()

return (
  <div>
    {userActivityFeed.map(activity => (
      <div key={activity.id}>
        {getActivityIcon(activity.type)} {activity.user}
        {formatTime(activity.timestamp)}
      </div>
    ))}
  </div>
)
```

### Pattern: Filter Activities
```javascript
const { userActivityFeed } = useSyncAdmin()
const [filter, setFilter] = useState('all')

const filtered = filter === 'all' 
  ? userActivityFeed 
  : userActivityFeed.filter(a => a.type === filter)
```

---

## ✅ Testing Checklist

### User Actions
- [ ] Log a meal
- [ ] Delete a meal
- [ ] Update profile
- [ ] Receive intervention
- [ ] Acknowledge intervention

### Admin Actions
- [ ] View activity feed
- [ ] Send intervention
- [ ] Track user status
- [ ] View dashboard metrics
- [ ] Filter activities

### Sync Verification
- [ ] Meal appears on admin dashboard within 1s
- [ ] Intervention appears on user dashboard within 1s
- [ ] Admin sees acknowledgment status update
- [ ] Activity feed shows all actions
- [ ] Page refresh doesn't lose state

---

## 🐛 Debug Commands

### Enable Logging
```javascript
// In DevTools console
window.syncEmitter.on('meal_logged', console.log)
window.syncEmitter.on('intervention_sent', console.log)

// View store state
import { useSyncStore } from '@/store/syncStore'
console.log(useSyncStore.getState())
```

### Emit Test Event
```javascript
// Test meal event
window.syncEmitter.emit('meal_logged', {
  userId: 'test-user',
  meal: { mealType: 'breakfast', totalCalories: 500 },
  timestamp: new Date().toISOString(),
})
```

### Clear State
```javascript
import { useSyncStore } from '@/store/syncStore'
useSyncStore.getState().resetSync()
```

---

## 📍 Pages with Sync

### User Pages (2/7 Complete)
- ✅ DashboardPage - Shows interventions & notifications
- ✅ MealLogPage - Tracks meals & events
- ⏳ NutrientAnalysisPage
- ⏳ DietPlanPage
- ⏳ FoodSwapPage
- ⏳ ProgressPage
- ⏳ ProfilePage

### Admin Pages (3/7 Complete)
- ✅ AdminDashboardPage - Real-time metrics
- ✅ UserActivityMonitorPage - Activity feed
- ✅ InterventionsPage - Send & track
- ⏳ UserManagementPage
- ⏳ FoodDatabasePage
- ⏳ RDAConfigPage
- ⏳ AnalyticsPage

---

## 🔗 Routes

```
User:
/dashboard                  - Real-time dashboard
/meal-log                  - Track meals
/analysis, /diet-plan, etc - Other user pages

Admin:
/admin/dashboard           - Real-time metrics
/admin/activity-monitor    - Live activity feed (NEW)
/admin/interventions       - Send interventions
/admin/food-database, etc  - Other admin pages
```

---

## 📝 Files Reference

```
src/store/syncStore.js              - EventEmitter + Zustand store
src/hooks/useSync.js                - useSync, useSyncAdmin, useSyncListener

Pages with sync:
src/pages/user/DashboardPage.jsx                    - 2/7
src/pages/user/MealLogPage.jsx                      - From previous
src/pages/admin/AdminDashboardPage.jsx              - 3/7
src/pages/admin/UserActivityMonitorPage.jsx         - NEW
src/pages/admin/InterventionsPage.jsx               - 3/7

Documentation:
SYNC_IMPLEMENTATION_GUIDE.md  - Complete API reference
SYNC_TESTING_GUIDE.md         - 17 test procedures
SYNC_COMPLETION_REPORT.md     - Full report
```

---

## 🎓 Learning Resources

1. **Start Here:** SYNC_IMPLEMENTATION_GUIDE.md → Architecture section
2. **How-To:** Look at patterns → Integration Patterns section
3. **Testing:** SYNC_TESTING_GUIDE.md → Test 1-5 for basics
4. **Deep Dive:** DashboardPage & InterventionsPage source code
5. **Debug:** Use console logging patterns above

---

## ⚡ Performance Tips

- Events are auto-debounced
- Keep activity feed under 100 items
- Clean up listeners with useEffect return
- Activity feed limited to last 50 items
- Old activities auto-cleared after 24 hours

---

## 🚀 Deploy to Production

```bash
# Build
npm run build

# Test sync still works
npm run preview

# Deploy dist/ folder

# In production:
# - Change VITE_USE_MOCK=false
# - Point VITE_API_BASE_URL to real API
# - Replace mock API with real endpoints
```

---

## 📞 Quick Help

| Problem | Solution |
|---------|----------|
| Intervention not showing | Ensure `useSync()` initialized in component |
| Metrics not updating | Check if `userActivityFeed` in dependency array |
| Memory growing | Verify event listeners cleaned up on unmount |
| Events not firing | Add console.log to check if hook initialized |
| Stale data | Refresh page (temp) or check Zustand persist |

---

## 🎯 Next Steps

1. Integrate sync into remaining pages
2. Add WebSocket for production scale
3. Add database persistence
4. Implement real-time analytics
5. Create admin notification center

---

**Last Updated:** Current Session  
**Version:** 1.0  
**Status:** ✅ READY TO USE
