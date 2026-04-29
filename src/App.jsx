import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

// Layout
import ProtectedRoute from './components/shared/ProtectedRoute'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// User Pages
import DashboardPage from './pages/user/DashboardPage'
import MealLogPage from './pages/user/MealLogPage'
import NutrientAnalysisPage from './pages/user/NutrientAnalysisPage'
import DietPlanPage from './pages/user/DietPlanPage'
import FoodSwapPage from './pages/user/FoodSwapPage'
import ProgressPage from './pages/user/ProgressPage'
import ProfilePage from './pages/user/ProfilePage'

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import FoodDatabasePage from './pages/admin/FoodDatabasePage'
import UserManagementPage from './pages/admin/UserManagementPage'
import RDAConfigPage from './pages/admin/RDAConfigPage'
import InterventionsPage from './pages/admin/InterventionsPage'
import AnalyticsPage from './pages/admin/AnalyticsPage'
import UserActivityMonitorPage from './pages/admin/UserActivityMonitorPage'

// 404 Page
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="font-display font-semibold text-6xl text-slate-900 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-6">Page not found</p>
        <a href="/dashboard" className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition">
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}

export default function App() {
  const { initAuth } = useAuthStore()

  useEffect(() => {
    initAuth()
  }, [])

  return (
    <>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="USER">
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meal-log"
            element={
              <ProtectedRoute requiredRole="USER">
                <MealLogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <ProtectedRoute requiredRole="USER">
                <NutrientAnalysisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diet-plan"
            element={
              <ProtectedRoute requiredRole="USER">
                <DietPlanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/food-swaps"
            element={
              <ProtectedRoute requiredRole="USER">
                <FoodSwapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute requiredRole="USER">
                <ProgressPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="USER">
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/food-database"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <FoodDatabasePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rda-config"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <RDAConfigPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/interventions"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <InterventionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/activity-monitor"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <UserActivityMonitorPage />
              </ProtectedRoute>
            }
          />

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Toast Notifications */}
      <Toaster position="bottom-center" />
    </>
  )
}
