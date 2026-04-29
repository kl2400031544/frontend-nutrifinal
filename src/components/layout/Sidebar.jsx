import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  UtensilsCrossed,
  BarChart3,
  ClipboardList,
  ArrowLeftRight,
  TrendingUp,
  UserCircle,
  Database,
  Users,
  Settings2,
  Bell,
  PieChart,
  Activity,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import Avatar from '../ui/Avatar'
import clsx from 'clsx'

const USER_ROUTES = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: UtensilsCrossed, label: 'Meal Log', path: '/meal-log' },
  { icon: BarChart3, label: 'Analysis', path: '/analysis' },
  { icon: ClipboardList, label: 'Diet Plan', path: '/diet-plan' },
  { icon: ArrowLeftRight, label: 'Food Swaps', path: '/food-swaps' },
  { icon: TrendingUp, label: 'Progress', path: '/progress' },
  { icon: UserCircle, label: 'Profile', path: '/profile' },
]

const ADMIN_ROUTES = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
  { icon: Database, label: 'Food Database', path: '/admin/food-database' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Settings2, label: 'RDA Config', path: '/admin/rda-config' },
  { icon: Bell, label: 'Interventions', path: '/admin/interventions' },
  { icon: PieChart, label: 'Analytics', path: '/admin/analytics' },
  { icon: Activity, label: 'Activity Monitor', path: '/admin/activity-monitor' },
]

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const routes = user?.role === 'ADMIN' ? ADMIN_ROUTES : USER_ROUTES
  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="font-display font-semibold text-lg">NutriGuard</span>
          </div>
        </div>

        <nav className="flex-1 overflow-auto p-4 space-y-1">
          {routes.map((route) => {
            const Icon = route.icon
            const active = isActive(route.path)
            return (
              <button
                key={route.path}
                onClick={() => {
                  navigate(route.path)
                  setIsOpen(false)
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition',
                  active
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                )}
              >
                <Icon size={18} />
                {route.label}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Avatar name={user?.name || 'User'} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 lg:hidden z-50 bg-brand-500 text-white p-3 rounded-full shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  )
}
