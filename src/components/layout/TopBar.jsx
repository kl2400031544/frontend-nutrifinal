import { Menu, Bell, Search } from 'lucide-react'
import Avatar from '../ui/Avatar'
import { useAuthStore } from '../../store/authStore'
import Input from '../ui/Input'

export default function TopBar({ onMenuClick }) {
  const { user } = useAuthStore()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-slate-900">
          {getGreeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block w-48">
          <Input
            placeholder="Search..."
            leftIcon={<Search size={18} />}
          />
        </div>

        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
          <Avatar name={user?.name || 'User'} size="sm" />
        </div>
      </div>
    </header>
  )
}
