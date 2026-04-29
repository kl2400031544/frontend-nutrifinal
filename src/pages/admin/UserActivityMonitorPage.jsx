import { useEffect, useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useSyncAdmin } from '../../hooks/useSync'
import { formatDate } from '../../utils/formatters'
import { Activity, AlertCircle, Users, TrendingUp } from 'lucide-react'

export default function UserActivityMonitorPage() {
  const { userActivityFeed, trackedUsers } = useSyncAdmin()
  const [filteredActivity, setFilteredActivity] = useState([])
  const [activityFilter, setActivityFilter] = useState('all')

  useEffect(() => {
    if (activityFilter === 'all') {
      setFilteredActivity(userActivityFeed)
    } else {
      setFilteredActivity(userActivityFeed.filter(a => a.type === activityFilter))
    }
  }, [userActivityFeed, activityFilter])

  const getActivityIcon = (type) => {
    switch (type) {
      case 'meal_logged':
        return '🍽️'
      case 'meal_deleted':
        return '🗑️'
      case 'deficiency_detected':
        return '⚠️'
      case 'profile_updated':
        return '👤'
      case 'intervention_acknowledged':
        return '✅'
      default:
        return '📝'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'meal_logged':
        return 'info'
      case 'deficiency_detected':
        return 'danger'
      case 'intervention_acknowledged':
        return 'success'
      default:
        return 'neutral'
    }
  }

  const getActivityLabel = (type) => {
    switch (type) {
      case 'meal_logged':
        return 'Meal Logged'
      case 'meal_deleted':
        return 'Meal Deleted'
      case 'deficiency_detected':
        return 'Deficiency Detected'
      case 'profile_updated':
        return 'Profile Updated'
      case 'intervention_acknowledged':
        return 'Intervention Acknowledged'
      default:
        return 'Activity'
    }
  }

  const activeUserCount = Object.keys(trackedUsers).length
  const criticalDeficiencies = userActivityFeed.filter(
    a => a.type === 'deficiency_detected' && a.severity === 'critical'
  ).length

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="font-display font-semibold text-3xl text-slate-900">User Activity Monitor</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Active Users</p>
                <p className="text-3xl font-bold text-slate-900">{activeUserCount}</p>
              </div>
              <Users className="text-brand-500" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Activities</p>
                <p className="text-3xl font-bold text-slate-900">{userActivityFeed.length}</p>
              </div>
              <Activity className="text-blue-500" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Critical Cases</p>
                <p className="text-3xl font-bold text-slate-900">{criticalDeficiencies}</p>
              </div>
              <AlertCircle className="text-rose-500" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Last Update</p>
                <p className="text-xl font-bold text-slate-900">
                  {userActivityFeed.length > 0 ? 'Just now' : 'Waiting...'}
                </p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </Card>
        </div>

        {/* Activity Filter */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'meal_logged', 'deficiency_detected', 'profile_updated', 'intervention_acknowledged'].map(
            filter => (
              <button
                key={filter}
                onClick={() => setActivityFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activityFilter === filter
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {filter === 'all' ? 'All' : getActivityLabel(filter)}
              </button>
            )
          )}
        </div>

        {/* Activity Feed */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Live Activity Feed</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredActivity.length > 0 ? (
              filteredActivity.map(activity => (
                <div key={activity.id} className="flex items-start gap-4 pb-3 border-b border-slate-200 last:border-0">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-slate-900">
                        {getActivityLabel(activity.type)}
                      </p>
                      <Badge variant={getActivityColor(activity.type)}>
                        User {activity.userId}
                      </Badge>
                    </div>
                    
                    {activity.type === 'meal_logged' && (
                      <p className="text-sm text-slate-600">
                        Logged {activity.data?.meal?.mealType} - {activity.data?.meal?.totalCalories} kcal
                      </p>
                    )}

                    {activity.type === 'deficiency_detected' && (
                      <p className="text-sm text-slate-600">
                        {activity.data?.nutrient} - {activity.data?.severity} ({Math.round(activity.data?.percent)}%)
                      </p>
                    )}

                    {activity.type === 'profile_updated' && (
                      <p className="text-sm text-slate-600">
                        Updated {Object.keys(activity.data || {}).join(', ')}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>No activities yet. Waiting for user actions...</p>
              </div>
            )}
          </div>
        </Card>

        {/* Tracked Users */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Tracked Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(trackedUsers).map(([userId, data]) => (
              <div key={userId} className="p-4 border border-slate-200 rounded-xl">
                <p className="font-medium text-slate-900">User {userId}</p>
                <p className="text-sm text-slate-600">
                  Last tracked: {data.lastTracked ? new Date(data.lastTracked).toLocaleTimeString() : 'Never'}
                </p>
                {data.lastProfileUpdate && (
                  <p className="text-sm text-slate-500">
                    Profile update: {new Date(data.lastProfileUpdate).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
