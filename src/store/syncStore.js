import { create } from 'zustand'

// Event emitter for real-time updates
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = []
    this.events[event].push(listener)
    return () => {
      this.events[event] = this.events[event].filter(l => l !== listener)
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data))
    }
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener)
    }
  }

  clear(event) {
    if (event) delete this.events[event]
    else this.events = {}
  }
}

export const syncEmitter = new EventEmitter()

// Sync Store - Tracks all real-time updates
export const useSyncStore = create((set, get) => ({
  // User activity logs
  userActivities: [],
  
  // Real-time notifications
  notifications: [],
  
  // Admin tracking data
  trackedUsers: {},
  
  // Sync status
  lastSyncTime: null,
  isSyncing: false,

  // ============ USER ACTIVITY TRACKING ============
  logUserActivity: (userId, activity) => {
    const newActivity = {
      id: Date.now(),
      userId,
      type: activity.type, // 'meal_logged', 'profile_updated', 'meal_deleted'
      data: activity.data,
      timestamp: new Date().toISOString(),
    }
    
    set(state => ({
      userActivities: [newActivity, ...state.userActivities],
      lastSyncTime: new Date(),
    }))

    // Emit for real-time admin updates
    syncEmitter.emit('user_activity', newActivity)
  },

  // ============ MEAL LOGGING SYNC ============
  syncMealLogged: (userId, meal, nutrients = {}) => {
    const safeNutrients = nutrients || {}
    const activity = {
      type: 'meal_logged',
      data: {
        meal,
        nutrients: safeNutrients,
        deficiencies: safeNutrients.deficiencies || [],
      },
    }
    get().logUserActivity(userId, activity)
    syncEmitter.emit('meal_logged', { userId, meal, nutrients })
  },

  syncMealDeleted: (userId, mealId) => {
    const activity = {
      type: 'meal_deleted',
      data: { mealId },
    }
    get().logUserActivity(userId, activity)
    syncEmitter.emit('meal_deleted', { userId, mealId })
  },

  // ============ DEFICIENCY TRACKING ============
  syncDeficiency: (userId, nutrient, severity, percent) => {
    const activity = {
      type: 'deficiency_detected',
      data: { nutrient, severity, percent },
    }
    get().logUserActivity(userId, activity)
    syncEmitter.emit('deficiency_alert', { userId, nutrient, severity, percent })
  },

  // ============ ADMIN NOTIFICATIONS ============
  addNotification: (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false,
    }
    set(state => ({
      notifications: [newNotification, ...state.notifications],
    }))
    syncEmitter.emit('notification_added', newNotification)
  },

  dismissNotification: (notificationId) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== notificationId),
    }))
  },

  // ============ ADMIN TRACKING ============
  trackUser: (userId, userData) => {
    set(state => ({
      trackedUsers: {
        ...state.trackedUsers,
        [userId]: {
          ...state.trackedUsers[userId],
          ...userData,
          lastTracked: new Date().toISOString(),
        },
      },
    }))
    syncEmitter.emit('user_tracked', { userId, userData })
  },

  untrackUser: (userId) => {
    set(state => {
      const { [userId]: removed, ...rest } = state.trackedUsers
      return { trackedUsers: rest }
    })
  },

  // ============ PROFILE UPDATES ============
  syncProfileUpdate: (userId, updates) => {
    const activity = {
      type: 'profile_updated',
      data: updates,
    }
    get().logUserActivity(userId, activity)
    get().trackUser(userId, { lastProfileUpdate: new Date().toISOString() })
    syncEmitter.emit('profile_updated', { userId, updates })
  },

  // ============ ADMIN INTERVENTION ============
  sendIntervention: (adminId, userId, message, intervention) => {
    const notification = {
      type: 'intervention_received',
      from: 'admin',
      userId,
      message,
      intervention,
      actionRequired: true,
    }
    get().addNotification(notification)
    syncEmitter.emit('intervention_sent', { adminId, userId, message, intervention })
  },

  userAcknowledgedIntervention: (userId, interventionId) => {
    const notification = {
      type: 'intervention_acknowledged',
      userId,
      interventionId,
      acknowledged: true,
    }
    syncEmitter.emit('intervention_acknowledged', notification)
  },

  // ============ ANALYTICS SYNC ============
  syncAnalytics: (userId, metrics) => {
    get().trackUser(userId, { 
      analytics: metrics,
      analyticsUpdated: new Date().toISOString(),
    })
    syncEmitter.emit('analytics_updated', { userId, metrics })
  },

  // ============ DATA RETRIEVAL ============
  getUserActivities: (userId) => {
    const state = get()
    return state.userActivities.filter(a => a.userId === userId)
  },

  getTrackedUserStats: (userId) => {
    return get().trackedUsers[userId] || null
  },

  getUnreadNotifications: () => {
    return get().notifications.filter(n => !n.read)
  },

  // ============ CLEAR & RESET ============
  clearOldActivities: (hoursToKeep = 24) => {
    const cutoffTime = new Date(Date.now() - hoursToKeep * 60 * 60 * 1000).toISOString()
    set(state => ({
      userActivities: state.userActivities.filter(a => a.timestamp > cutoffTime),
    }))
  },

  resetSync: () => {
    set({
      userActivities: [],
      notifications: [],
      trackedUsers: {},
      lastSyncTime: null,
      isSyncing: false,
    })
    syncEmitter.clear()
  },
}))
