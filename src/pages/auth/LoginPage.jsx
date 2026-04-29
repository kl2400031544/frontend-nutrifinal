import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../utils/validators'
import { useAuthStore } from '../../store/authStore'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import toast from 'react-hot-toast'
import { Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const result = await login(data.email, data.password)

    if (result.success) {
      toast.success('Login successful!')
      const redirectPath =
        result.user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'
      navigate(redirectPath)
    } else {
      toast.error(result.error || 'Invalid email or password')
    }
    setIsSubmitting(false)
  }

  return (
    <AuthLayout>
      <div>
        <h1 className="font-display font-semibold text-2xl mb-1">Welcome back</h1>
        <p className="text-slate-600 mb-6">Sign in to your NutriGuard account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            leftIcon={<Mail size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock size={18} />}
            error={errors.password?.message}
            showPasswordToggle
            {...register('password')}
          />

          <Button
            type="submit"
            size="md"
            loading={isSubmitting}
            className="w-full"
          >
            Sign in
          </Button>
        </form>

        <p className="text-center text-slate-600 text-sm mb-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign up
          </Link>
        </p>

        <div className="border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500 font-medium mb-3">Demo Credentials</p>
          <Card className="bg-slate-800 border-0">
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div>
                <p className="text-slate-400 mb-1">Admin:</p>
                <p>admin@nutriguard.com / Admin@123</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">User:</p>
                <p>user@nutriguard.com / User@123</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AuthLayout>
  )
}
