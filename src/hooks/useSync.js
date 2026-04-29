import { useEffect, useState, useCallback } from 'react'
import { useSyncStore, syncEmitter } from '../store/syncStore'
import { useAuthStore } from '../store/authStore'

export const useSync = () => {
  const user = useAuthStore(state => state.user)
  const {
    logUserActivity,
    syncMealLogged,
    syncMealDeleted,
    syncDeficiency,
    syncProfileUpdate,
    sendIntervention,
    userAcknowledgedIntervention,
    syncAnalytics,
    getUserActivities,
    getTrackedUserStats,
    getUnreadNotifications,
    addNotification,
  } = useSyncStore()

  // ============ TRACK USER ACTIONS ============
  const trackMealLogged = useCallback((meal, nutrients = {}) => {
    if (user?.id) {
      syncMealLogged(user.id, meal, nutrients)
    }
  }, [user?.id, syncMealLogged])

  const trackMealDeleted = useCallback((mealId) => {
    if (user?.id) {
      syncMealDeleted(user.id, mealId)
    }
  }, [user?.id, syncMealDeleted])

  const trackDeficiency = useCallback((nutrient, severity, percent) => {
    if (user?.id) {
      syncDeficiency(user.id, nutrient, severity, percent)
    }
  }, [user?.id, syncDeficiency])

  const trackProfileUpdate = useCallback((updates) => {
    if (user?.id) {
      syncProfileUpdate(user.id, updates)
    }
  }, [user?.id, syncProfileUpdate])

  // ============ LISTEN FOR REAL-TIME UPDATES ============
  const [liveUpdates, setLiveUpdates] = useState([])
  const [newNotification, setNewNotification] = useState(null)

  useEffect(() => {
    const unsubscribe = syncEmitter.on('user_activity', (activity) => {
      setLiveUpdates(prev => [activity, ...prev])
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = syncEmitter.on('notification_added', (notification) => {
      setNewNotification(notification)
      setTimeout(() => setNewNotification(null), 5000) // Clear after 5s
    })
    return unsubscribe
  }, [])

  // ============ GET CURRENT DATA ============
  const myActivities = user?.id ? getUserActivities(user.id) : []
  const myStats = user?.id ? getTrackedUserStats(user.id) : null
  const unreadNotifications = getUnreadNotifications()

  return {
    // Tracking functions
    trackMealLogged,
    trackMealDeleted,
    trackDeficiency,
    trackProfileUpdate,

    // Real-time data
    liveUpdates,
    newNotification,
    myActivities,
    myStats,
    unreadNotifications,

    // Direct store functions
    sendIntervention,
    userAcknowledgedIntervention,
    syncAnalytics,
    addNotification,
  }
}

// Admin-specific sync hook
export const useSyncAdmin = () => {
  const { trackedUsers, userActivities, notifications } = useSyncStore()

  const [userActivityFeed, setUserActivityFeed] = useState([])

  useEffect(() => {
    const unsubscribe = syncEmitter.on('user_activity', (activity) => {
      setUserActivityFeed(prev => [activity, ...prev].slice(0, 50)) // Keep last 50
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = syncEmitter.on('deficiency_alert', (data) => {
      setUserActivityFeed(prev => [{
        type: 'deficiency_alert',
        ...data,
        timestamp: new Date().toISOString(),
      }, ...prev].slice(0, 50))
    })
    return unsubscribe
  }, [])

  return {
    trackedUsers,
    allUserActivities: userActivities,
    allNotifications: notifications,
    userActivityFeed,
    syncEmitter,
  }
}

// Real-time listener hook
export const useSyncListener = (eventType, callback) => {
  useEffect(() => {
    const unsubscribe = syncEmitter.on(eventType, callback)
    return unsubscribe
  }, [eventType, callback])
}
