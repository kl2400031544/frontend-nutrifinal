import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordChangeSchema } from '../../utils/validators'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import { useAuthStore } from '../../store/authStore'
import { DIETARY_PREFERENCES, ALLERGIES, HEALTH_CONDITIONS } from '../../constants/nutrients'
import toast from 'react-hot-toast'
import { calculateBMI } from '../../utils/formatters'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('personal')
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || 'User Name',
    email: user?.email || 'user@example.com',
    age: user?.age || 14,
    gender: user?.gender || 'male',
    weight: user?.weight || 50,
    height: user?.height || 150,
    allergies: user?.allergies || [],
    healthConditions: user?.healthConditions || [],
    dietaryPreference: user?.dietaryPreference || 'vegetarian',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordChangeSchema),
  })

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
    setEditMode(false)
  }

  const onPasswordSubmit = (data) => {
    // Handle password change
    toast.success('Password changed successfully!')
  }

  const bmi = calculateBMI(profileData.weight, profileData.height)

  const toggleAllergy = (allergy) => {
    setProfileData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }))
  }

  const toggleHealthCondition = (condition) => {
    setProfileData((prev) => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter((c) => c !== condition)
        : [...prev.healthConditions, condition],
    }))
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display font-semibold text-3xl text-slate-900">Profile</h1>
        </div>

        {/* Profile Header */}
        <Card className="flex items-center gap-4">
          <Avatar name={profileData.name} size="lg" />
          <div className="flex-1">
            <h2 className="font-semibold text-lg text-slate-900">{profileData.name}</h2>
            <p className="text-slate-600">{profileData.email}</p>
          </div>
          {!editMode && (
            <Button variant="secondary" size="sm" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          )}
        </Card>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-8">
            {['personal', 'health', 'preferences', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 font-medium transition ${
                  activeTab === tab
                    ? 'text-brand-600 border-b-2 border-brand-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'personal'
                  ? 'Personal Info'
                  : tab === 'health'
                  ? 'Health Profile'
                  : tab === 'preferences'
                  ? 'Preferences'
                  : 'Security'}
              </button>
            ))}
          </div>
        </div>

        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <Card className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                disabled={!editMode}
              />
              <Input
                label="Email"
                type="email"
                value={profileData.email}
                disabled
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Age"
                type="number"
                value={profileData.age}
                onChange={(e) =>
                  setProfileData({ ...profileData, age: parseInt(e.target.value) })
                }
                disabled={!editMode}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Gender
                </label>
                <select
                  value={profileData.gender}
                  onChange={(e) =>
                    setProfileData({ ...profileData, gender: e.target.value })
                  }
                  disabled={!editMode}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 disabled:opacity-50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {editMode && (
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" size="sm" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Health Profile Tab */}
        {activeTab === 'health' && (
          <div className="space-y-4">
            <Card>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Input
                  label="Weight (kg)"
                  type="number"
                  value={profileData.weight}
                  onChange={(e) =>
                    setProfileData({ ...profileData, weight: parseFloat(e.target.value) })
                  }
                  disabled={!editMode}
                />
                <Input
                  label="Height (cm)"
                  type="number"
                  value={profileData.height}
                  onChange={(e) =>
                    setProfileData({ ...profileData, height: parseFloat(e.target.value) })
                  }
                  disabled={!editMode}
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">BMI</label>
                  <div className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium">
                    {bmi}
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Known Allergies
              </label>
              <div className="flex flex-wrap gap-2">
                {ALLERGIES.map((allergy) => (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => editMode && toggleAllergy(allergy)}
                    disabled={!editMode}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      profileData.allergies.includes(allergy)
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    } ${!editMode ? 'opacity-70' : 'hover:bg-slate-200'}`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Health Conditions
              </label>
              <div className="flex flex-wrap gap-2">
                {HEALTH_CONDITIONS.map((condition) => (
                  <button
                    key={condition}
                    type="button"
                    onClick={() => editMode && toggleHealthCondition(condition)}
                    disabled={!editMode}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      profileData.healthConditions.includes(condition)
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    } ${!editMode ? 'opacity-70' : 'hover:bg-slate-200'}`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </Card>

            {editMode && (
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <Card className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dietary Preference
              </label>
              <select
                value={profileData.dietaryPreference}
                onChange={(e) =>
                  setProfileData({ ...profileData, dietaryPreference: e.target.value })
                }
                disabled={!editMode}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 disabled:opacity-50"
              >
                {DIETARY_PREFERENCES.map((pref) => (
                  <option key={pref.value} value={pref.value}>
                    {pref.label}
                  </option>
                ))}
              </select>
            </div>

            {editMode && (
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" size="sm" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <Card>
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
              <h3 className="font-semibold text-slate-900">Change Password</h3>

              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                error={errors.currentPassword?.message}
                showPasswordToggle
                {...register('currentPassword')}
              />

              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                error={errors.newPassword?.message}
                showPasswordToggle
                hint="Min 8 chars, 1 uppercase, 1 number, 1 special char"
                {...register('newPassword')}
              />

              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                showPasswordToggle
                {...register('confirmPassword')}
              />

              <Button type="submit" size="sm">
                Update Password
              </Button>
            </form>
          </Card>
        )}
      </div>
    </AppShell>
  )
}
