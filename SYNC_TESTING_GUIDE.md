# Real-Time Sync Testing Guide

Complete step-by-step testing procedures for NutriGuard's real-time synchronization system.

## Prerequisites

- Two browser tabs/windows open
- Development server running (`npm run dev`)
- Admin credentials: `admin@nutriguard.com` / `Admin@123`
- User credentials: `user@nutriguard.com` / `User@123`

## Test Suite

### Test 1: User Meal Logging → Admin Real-Time Update

**Objective:** Verify that when a user logs a meal, admin dashboards update in real-time

**Steps:**

1. **Setup**
   - Browser Tab 1: Login as ADMIN
   - Navigate to: `/admin/dashboard`
   - Note the "Active Today" metric (e.g., 342)
   
2. **Action**
   - Browser Tab 2: Login as USER
   - Navigate to: `/meal-log`
   - Click "+ Add Food" (floating button or button in component)
   - Select a food item (e.g., "Milk")
   - Confirm addition to meal
   
3. **Verification**
   - Switch to Tab 1 (Admin Dashboard)
   - **Expected:** "Active Today" count increased by 1
   - Recent activity shows the meal log event
   - **✅ PASS:** If metrics updated in real-time

**Troubleshooting:**
- If metrics don't update: Check browser console for errors
- Ensure `useSyncAdmin()` hook is initialized
- Verify `userActivityFeed` is in dependency array

---

### Test 2: Admin Sends Intervention → User Receives Real-Time Alert

**Objective:** Verify bidirectional sync: admin intervention reaches user instantly

**Steps:**

1. **Setup**
   - Browser Tab 1: Admin at `/admin/interventions`
   - Verify "Pending" tab shows at least one user (e.g., "Rahul Kumar - Vitamin D")
   - Browser Tab 2: User at `/dashboard`
   - No interventions should be visible initially
   
2. **Action**
   - Tab 1: Click "Send" button next to a pending user
   - Modal appears asking for intervention message
   - Type a message: "Include fortified milk or spend 30 min in sunlight daily"
   - Click "Send"
   - Message should move to "Sent" tab
   
3. **Verification**
   - Switch to Tab 2 (User Dashboard)
   - **Expected:** Amber intervention banner appears at top
   - Shows the intervention message
   - "Got it" button available to acknowledge
   - **✅ PASS:** If intervention appears within 1 second

**Troubleshooting:**
- If intervention doesn't appear: Check if `useSync()` hook is loading notifications
- Verify `newNotification.type === 'intervention_received'`
- Check browser DevTools Network tab for any errors

---

### Test 3: User Acknowledges Intervention → Admin Sees Status Change

**Objective:** Verify intervention acknowledgment syncs back to admin

**Steps:**

1. **Setup**
   - From Test 2: User should have intervention banner visible
   - Tab 1 (Admin): Stay on `/admin/interventions` → "Sent" tab
   - Tab 2 (User): At `/dashboard` with intervention banner

2. **Action**
   - Tab 2: Click "Got it" button on intervention banner
   - Intervention banner disappears
   
3. **Verification**
   - Switch to Tab 1 (Admin Interventions)
   - Find the intervention you just sent
   - **Expected:** Status badge changed from "delivered" to "acknowledged"
   - Shows timestamp of acknowledgment
   - **✅ PASS:** If status updates in real-time

**Troubleshooting:**
- If status doesn't update: Check if `syncEmitter.on('intervention_acknowledged')` listener is active
- Verify intervention ID matches in event payload
- Check Zustand store for state updates

---

### Test 4: Activity Feed Real-Time Updates

**Objective:** Verify live activity monitor shows user actions instantly

**Steps:**

1. **Setup**
   - Tab 1 (Admin): Navigate to `/admin/activity-monitor`
   - Observe current activity count
   - Tab 2 (User): Navigate to `/meal-log`

2. **Action**
   - Tab 2: Perform multiple actions:
     - Add food item to breakfast
     - Add food item to lunch
     - Delete one food item
   - Each action triggers sync event

3. **Verification**
   - Tab 1: Watch activity feed in real-time
   - **Expected:** Each action appears in feed immediately (within 1 sec)
   - Correct icons and labels:
     - 🍽️ "Meal Logged" for additions
     - 🗑️ "Meal Deleted" for removals
   - Timestamps show "just now"
   - Active users list updated
   - **✅ PASS:** If all actions visible in real-time feed

**Troubleshooting:**
- If feed doesn't update: Check `useSyncAdmin()` is initialized
- Verify `userActivityFeed` state is updating
- Check for JavaScript errors in console

---

### Test 5: Multiple Users Simultaneously

**Objective:** Verify sync works with multiple concurrent user actions

**Steps:**

1. **Setup**
   - Open 3 tabs total:
     - Tab 1: ADMIN at `/admin/dashboard`
     - Tab 2: USER 1 at `/meal-log`
     - Tab 3: USER 2 at `/meal-log` (same or different browser)

2. **Action**
   - Tab 2: Add a food item
   - Tab 3: Add a different food item
   - Tab 2: Delete a food item
   - Tab 3: Add another food item
   - Rapidly perform 5-10 actions in sequence

3. **Verification**
   - Tab 1: Admin dashboard metrics update
   - All events appear in Activity Monitor
   - No events are lost or missed
   - Correct user IDs shown for each action
   - **✅ PASS:** If all concurrent actions handled correctly

---

### Test 6: Deficiency Detection Real-Time Alert

**Objective:** Verify system detects deficiencies and alerts admin in real-time

**Steps:**

1. **Setup**
   - Tab 1 (Admin): `/admin/dashboard`
   - Note "Critical Cases" metric
   - Tab 2 (User): `/meal-log`

2. **Action**
   - Tab 2: Add foods that create deficiency (low in Vitamin D):
     - Add only Rice, Dal, Vegetables
     - Skip fortified milk or vitamin D sources
   - System calculates deficiency
   - Deficiency event emitted if threshold exceeded

3. **Verification**
   - Tab 1: Monitor dashboard for:
     - "Critical Cases" metric increase
     - New alert in "Recent Deficiency Alerts" table
     - Activity monitor shows "Deficiency Detected" event
   - Badge shows severity (critical/moderate/mild)
   - **✅ PASS:** If deficiency detected and alerted within 2 seconds

---

### Test 7: Page Refresh & Persistence

**Objective:** Verify sync state persists across page refreshes

**Steps:**

1. **Setup**
   - Tab 1 (Admin): `/admin/dashboard`
   - Tab 2 (User): Send intervention from admin

2. **Action**
   - Tab 2: Refresh page (F5)
   - User should still be logged in
   - Check notification badge or intervention state

3. **Verification**
   - Intervention persists after refresh
   - Dashboard metrics maintained
   - No re-authentication needed
   - Activity feed still visible
   - **✅ PASS:** If state persists across refresh

**Troubleshooting:**
- If logged out: Check `isAuthenticated` localStorage key
- If interventions lost: Sync state not persisting properly
- Check IndexedDB or localStorage in DevTools

---

### Test 8: Notification Center

**Objective:** Verify unread notifications appear on dashboard

**Steps:**

1. **Setup**
   - Tab 1 (Admin): Multiple interventions pending
   - Tab 2 (User): Dashboard open

2. **Action**
   - Tab 1: Send 2-3 interventions to same user
   - Don't acknowledge them

3. **Verification**
   - Tab 2: Dashboard shows blue notification banner
   - Displays count of unread notifications
   - Lists first 3 notifications
   - "Got it" button clears each intervention
   - **✅ PASS:** If all notifications appear

---

### Test 9: Filter & Search in Activity Monitor

**Objective:** Verify activity filtering works in admin monitor

**Steps:**

1. **Setup**
   - Tab 1: Multiple user actions already logged
   - Admin at `/admin/activity-monitor`

2. **Action**
   - Click filter buttons: "Meal Logged", "Deficiency Detected", etc.
   - Feed should filter to show only that activity type

3. **Verification**
   - Only selected activity type shows
   - Other activities hidden
   - "All" button restores full feed
   - **✅ PASS:** If filtering works correctly

---

### Test 10: Cross-Tab Communication

**Objective:** Verify sync works across different browser tabs

**Steps:**

1. **Setup**
   - Same browser, two windows:
     - Window 1: Admin at `/admin/dashboard`
     - Window 2: Admin at `/admin/activity-monitor`

2. **Action**
   - Tab 3 (different window): User logs meal
   - Both admin windows should update

3. **Verification**
   - Both windows show updated metrics
   - Both show activity in feed
   - No race conditions or conflicts
   - **✅ PASS:** If sync works across tabs

---

## Performance Testing

### Test 11: Rapid-Fire Events

**Steps:**
```javascript
// Open DevTools console as user
// Rapidly emit events
const { trackMealLogged } = useSync()

// Simulate 10 rapid meals
for(let i = 0; i < 10; i++) {
  trackMealLogged(mockMeal, mockNutrients)
  await new Promise(r => setTimeout(r, 100))
}
```

**Verification:**
- Admin sees all 10 events
- No UI freezes
- Memory doesn't grow excessively
- All events processed in order
- **✅ PASS:** If system handles load

### Test 12: Memory Leak Detection

**Steps:**
1. Open DevTools → Performance tab
2. Record memory usage while:
   - Sending 50 events over 1 minute
   - Perform multiple interventions
   - Switch pages repeatedly

**Verification:**
- Memory steadily stays around 50-100MB
- No continuous growth
- Garbage collection happening
- **✅ PASS:** If no memory leaks detected

---

## Error Handling Tests

### Test 13: Network Errors

**Steps:**
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Try to log meal and send intervention
4. Restore connection

**Verification:**
- UI doesn't crash
- Graceful error handling
- Retry mechanisms work when online
- **✅ PASS:** If errors handled gracefully

### Test 14: Invalid Data

**Steps:**
```javascript
// Try sending malformed data
syncEmitter.emit('meal_logged', null)
syncEmitter.emit('meal_logged', {})
syncEmitter.emit('meal_logged', { userId: null })
```

**Verification:**
- No JavaScript errors
- Console warnings only
- UI remains functional
- **✅ PASS:** If validation works

---

## Regression Tests

### Test 15: Authentication Still Works

- [ ] Login as user works
- [ ] Login as admin works
- [ ] Logout works
- [ ] Session persists on refresh
- [ ] Protected routes redirect

### Test 16: Core Features Unaffected

- [ ] Meal logging still works
- [ ] Meal deletion works
- [ ] Profile updates work
- [ ] Analytics display correctly
- [ ] Charts render properly

### Test 17: Mobile Responsiveness

- [ ] Test on iPhone 12 viewport
- [ ] Test on iPad Pro viewport
- [ ] Test on Android viewport
- [ ] All sync features work on mobile
- [ ] Intervention banners display correctly

---

## Test Results Template

```markdown
# Sync Testing Results - [DATE]

## Environment
- Browser: [Chrome/Firefox/Safari]
- OS: [Windows/Mac/Linux]
- Network: [Wifi/Ethernet/4G]

## Test Results

| Test # | Name | Result | Notes |
|--------|------|--------|-------|
| 1 | Meal → Admin Update | PASS/FAIL | |
| 2 | Intervention Send | PASS/FAIL | |
| 3 | Acknowledgment Sync | PASS/FAIL | |
| 4 | Activity Feed | PASS/FAIL | |
| 5 | Multiple Users | PASS/FAIL | |
| 6 | Deficiency Alert | PASS/FAIL | |
| 7 | Persistence | PASS/FAIL | |
| 8 | Notifications | PASS/FAIL | |
| 9 | Filtering | PASS/FAIL | |
| 10 | Cross-Tab | PASS/FAIL | |
| 11 | Performance | PASS/FAIL | |
| 12 | Memory | PASS/FAIL | |
| 13 | Error Handling | PASS/FAIL | |
| 14 | Invalid Data | PASS/FAIL | |
| 15 | Auth | PASS/FAIL | |
| 16 | Core Features | PASS/FAIL | |
| 17 | Mobile | PASS/FAIL | |

## Summary
- Total Tests: 17
- Passed: [X]
- Failed: [Y]
- Success Rate: [X/17]

## Issues Found
1. [Issue]
   - Severity: [High/Medium/Low]
   - Steps to reproduce: [...]
   - Expected: [...]
   - Actual: [...]

## Sign-Off
- Tested by: [Name]
- Date: [DATE]
- Status: [READY FOR PRODUCTION / NEEDS FIXES]
```

---

## Debugging Tips

### Enable Debug Logging

Add to any component:
```javascript
useEffect(() => {
  window.syncEmitter = syncEmitter
  console.log('Sync store:', useSyncStore.getState())
}, [])

// In console:
window.syncEmitter.on('any_event', console.log)
```

### Check Browser DevTools

1. **Storage Tab**
   - Application → localStorage → nutriguard_token
   - Verify auth token present

2. **Network Tab**
   - Verify no 404/500 errors
   - Check mock API responses

3. **Console Tab**
   - Look for sync-related logs
   - Check for JavaScript errors

4. **React DevTools**
   - Inspect `useSyncStore` state
   - Check Zustand store changes
   - Verify reducer actions

### Common Issues

| Issue | Solution |
|-------|----------|
| Events not firing | Check if component has useSync/useSyncAdmin hook |
| State not updating | Verify dependency arrays in useEffect |
| Memory growing | Check for event listener cleanup |
| Stale data | Verify Zustand store subscriptions |
| Auth lost after refresh | Check localStorage keys in DevTools |

---

## Continuous Integration

For automated testing, use:
```bash
# Run tests
npm test

# Generate coverage report
npm test -- --coverage

# Test specific file
npm test -- syncStore.test.js
```

---

**Last Updated:** [Current Date]
**Maintained by:** NutriGuard Team
