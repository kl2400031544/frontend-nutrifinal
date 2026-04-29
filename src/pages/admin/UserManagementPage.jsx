import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Mail, Users } from 'lucide-react'

export default function UserManagementPage() {
  const users = [
    { id: 1, name: 'Rahul Kumar', email: 'rahul@email.com', age: 14, status: 'active' },
    { id: 2, name: 'Priya Singh', email: 'priya@email.com', age: 16, status: 'active' },
    { id: 3, name: 'Arjun Patel', email: 'arjun@email.com', age: 12, status: 'inactive' },
  ]

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="font-display font-semibold text-3xl text-slate-900">User Management</h1>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-slate-600 font-medium">Name</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Email</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Age</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Status</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-900">{user.name}</td>
                    <td className="py-3 text-slate-700">{user.email}</td>
                    <td className="py-3 text-slate-700">{user.age}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 flex gap-2">
                      <Button size="sm" variant="secondary">View</Button>
                      <Button size="sm" leftIcon={<Mail size={14} />}>Notify</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
