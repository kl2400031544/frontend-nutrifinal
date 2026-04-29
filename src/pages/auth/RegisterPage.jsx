import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  registerStep1Schema,
  registerStep2Schema,
  registerStep3Schema,
} from '../../utils/validators'
import { useAuthStore } from '../../store/authStore'
import { ALLERGIES, HEALTH_CONDITIONS, DIETARY_PREFERENCES } from '../../constants/nutrients'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'
import { Mail, Lock } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
    age: '',
    gender: '',
    weight: '',
    height: '',
    allergies: [],
    healthConditions: [],
    dietaryPreference: 'vegetarian',
    mealFrequency: 3,
    notificationPreferences: {
      dailyReminder: true,
      deficiencyAlerts: true,
      weeklySummary: true,
    },
  })

  const calculatePasswordStrength = (pwd) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[!@#$%^&*]/.test(pwd)) strength++
    setPasswordStrength(strength)
  }

  const {
    register: registerField,
    handleSubmit: handleStep1Submit,
    formState: { errors: errors1 },
  } = useForm({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    },
  })

  const {
    register: registerField2,
    handleSubmit: handleStep2Submit,
    formState: { errors: errors2 },
    setValue: setValue2,
  } = useForm({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      age: formData.age,
      gender: formData.gender,
      weight: formData.weight,
      height: formData.height,
      allergies: formData.allergies,
      healthConditions: formData.healthConditions,
    },
  })

  const {
    register: registerField3,
    handleSubmit: handleStep3Submit,
    formState: { errors: errors3 },
  } = useForm({
    resolver: zodResolver(registerStep3Schema),
    defaultValues: {
      dietaryPreference: formData.dietaryPreference,
      mealFrequency: formData.mealFrequency,
      notificationPreferences: formData.notificationPreferences,
    },
  })

  const onStep1Submit = handleStep1Submit((data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep(2)
  })

  const onStep2Submit = handleStep2Submit((data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep(3)
  })

  const onStep3Submit = handleStep3Submit(async (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setIsSubmitting(true)

    const submitData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      age: parseInt(formData.age),
      gender: formData.gender,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      allergies: formData.allergies,
      healthConditions: formData.healthConditions,
      dietaryPreference: data.dietaryPreference,
      mealFrequency: data.mealFrequency,
      notificationPreferences: data.notificationPreferences,
      profileComplete: true,
    }

    const result = await registerUser(submitData)

    if (result.success) {
      toast.success('Registration successful! Welcome to NutriGuard')
      const redirectPath =
        result.user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'
      navigate(redirectPath)
    } else {
      toast.error(result.error || 'Registration failed')
    }
    setIsSubmitting(false)
  })

  const toggleAllergy = (allergy) => {
    setFormData((prev) => {
      const nextAllergies = prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy]
      setValue2('allergies', nextAllergies, { shouldValidate: true, shouldDirty: true })
      return {
        ...prev,
        allergies: nextAllergies,
      }
    })
  }

  const toggleHealthCondition = (condition) => {
    setFormData((prev) => {
      const nextConditions = prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter((c) => c !== condition)
        : [...prev.healthConditions, condition]
      setValue2('healthConditions', nextConditions, { shouldValidate: true, shouldDirty: true })
      return {
        ...prev,
        healthConditions: nextConditions,
      }
    })
  }

  return (
    <AuthLayout>
      <div>
        <h1 className="font-display font-semibold text-2xl mb-1">Join NutriGuard</h1>
        <p className="text-slate-600 mb-6">Create your account in 3 steps</p>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-8 justify-center">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition ${
                step === currentStep
                  ? 'bg-brand-500'
                  : step < currentStep
                  ? 'bg-brand-300'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Account Info */}
        {currentStep === 1 && (
          <form onSubmit={onStep1Submit} className="space-y-4">
            <h2 className="font-semibold text-slate-900 mb-4">Account Information</h2>

            <Input
              label="Full Name"
              placeholder="John Doe"
              error={errors1.fullName?.message}
              {...registerField('fullName')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              leftIcon={<Mail size={18} />}
              error={errors1.email?.message}
              {...registerField('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock size={18} />}
              error={errors1.password?.message}
              showPasswordToggle
              {...registerField('password', {
                onChange: (e) => {
                  calculatePasswordStrength(e.target.value)
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                },
              })}
            />

            {formData.password && (
              <div className="space-y-1">
                <div className="flex gap-1 h-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition ${
                        i < passwordStrength
                          ? passwordStrength <= 1
                            ? 'bg-rose-500'
                            : passwordStrength <= 2
                            ? 'bg-amber-500'
                            : 'bg-brand-500'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600">
                  {passwordStrength === 0 && 'Very weak'}
                  {passwordStrength === 1 && 'Weak'}
                  {passwordStrength === 2 && 'Fair'}
                  {passwordStrength === 3 && 'Strong'}
                  {passwordStrength === 4 && 'Very strong'}
                </p>
              </div>
            )}

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={errors1.confirmPassword?.message}
              showPasswordToggle
              {...registerField('confirmPassword')}
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role
              </label>
              <div className="space-y-2">
                {['USER', 'ADMIN'].map((role) => (
                  <label key={role} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      value={role}
                      checked={formData.role === role}
                      className="w-4 h-4"
                      {...registerField('role', {
                        onChange: (e) =>
                          setFormData((prev) => ({ ...prev, role: e.target.value })),
                      })}
                    />
                    <div>
                      <p className="font-medium text-slate-900">{role}</p>
                      {role === 'ADMIN' && (
                        <p className="text-xs text-slate-500">
                          Admin access requires approval
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" size="md" className="w-full">
              Next: Health Profile
            </Button>
          </form>
        )}

        {/* Step 2: Health Profile */}
        {currentStep === 2 && (
          <form onSubmit={onStep2Submit} className="space-y-4">
            <h2 className="font-semibold text-slate-900 mb-4">Health Profile</h2>
            <input type="hidden" {...registerField2('allergies')} />
            <input type="hidden" {...registerField2('healthConditions')} />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Age"
                type="number"
                placeholder="12"
                error={errors2.age?.message}
                {...registerField2('age', { valueAsNumber: true })}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  value={formData.gender}
                  {...registerField2('gender', {
                    onChange: (e) =>
                      setFormData((prev) => ({ ...prev, gender: e.target.value })),
                  })}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors2.gender && (
                  <p className="text-rose-500 text-xs mt-1">{errors2.gender.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Weight (kg)"
                type="number"
                placeholder="45"
                error={errors2.weight?.message}
                {...registerField2('weight', { valueAsNumber: true })}
              />

              <Input
                label="Height (cm)"
                type="number"
                placeholder="150"
                error={errors2.height?.message}
                {...registerField2('height', { valueAsNumber: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Known Allergies
              </label>
              <div className="flex flex-wrap gap-2">
                {ALLERGIES.map((allergy) => (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => toggleAllergy(allergy)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      formData.allergies.includes(allergy)
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Health Conditions
              </label>
              <div className="flex flex-wrap gap-2">
                {HEALTH_CONDITIONS.map((condition) => (
                  <button
                    key={condition}
                    type="button"
                    onClick={() => toggleHealthCondition(condition)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      formData.healthConditions.includes(condition)
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </Button>
              <Button type="submit" size="md" className="w-full">
                Next: Preferences
              </Button>
            </div>
          </form>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <form onSubmit={onStep3Submit} className="space-y-4">
            <h2 className="font-semibold text-slate-900 mb-4">Preferences</h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dietary Preference
              </label>
              <div className="space-y-2">
                {DIETARY_PREFERENCES.map((pref) => (
                  <label
                    key={pref.value}
                    className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                  >
                    <input
                      type="radio"
                      value={pref.value}
                      checked={formData.dietaryPreference === pref.value}
                      className="w-4 h-4"
                      {...registerField3('dietaryPreference', {
                        onChange: (e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dietaryPreference: e.target.value,
                          })),
                      })}
                    />
                    <span className="font-medium text-slate-900">{pref.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Meal Frequency
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
                value={formData.mealFrequency}
                {...registerField3('mealFrequency', {
                  valueAsNumber: true,
                  onChange: (e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mealFrequency: Number(e.target.value),
                    })),
                })}
              >
                <option value={3}>3 meals/day</option>
                <option value={4}>4 meals/day</option>
                <option value={5}>5 meals/day</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Notification Preferences
              </label>
              <div className="space-y-2">
                {[
                  {
                    key: 'dailyReminder',
                    label: 'Daily Meal Reminder',
                  },
                  {
                    key: 'deficiencyAlerts',
                    label: 'Deficiency Alerts',
                  },
                  {
                    key: 'weeklySummary',
                    label: 'Weekly Summary',
                  },
                ].map((notif) => (
                  <label
                    key={notif.key}
                    className="flex items-center gap-3 p-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        formData.notificationPreferences[notif.key]
                      }
                      className="w-4 h-4 rounded accent-brand-500"
                      {...registerField3(`notificationPreferences.${notif.key}`, {
                        onChange: (e) =>
                          setFormData((prev) => ({
                            ...prev,
                            notificationPreferences: {
                              ...prev.notificationPreferences,
                              [notif.key]: e.target.checked,
                            },
                          })),
                      })}
                    />
                    <span className="text-slate-900 font-medium">
                      {notif.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </Button>
              <Button
                type="submit"
                size="md"
                className="w-full"
                loading={isSubmitting}
              >
                Create Account
              </Button>
            </div>

            <p className="text-center text-slate-600 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-brand-600 hover:text-brand-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
