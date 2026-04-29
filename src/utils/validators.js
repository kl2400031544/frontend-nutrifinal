import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const registerStep1Schema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name must be at most 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    role: z.enum(['USER', 'ADMIN']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const registerStep2Schema = z.object({
  age: z
    .number()
    .int('Age must be a whole number')
    .min(6, 'Must be between 6 and 18')
    .max(18, 'Must be between 6 and 18'),
  gender: z.enum(['male', 'female', 'other']),
  weight: z
    .number()
    .min(10, 'Weight must be at least 10 kg')
    .max(150, 'Weight must be at most 150 kg'),
  height: z
    .number()
    .min(80, 'Height must be at least 80 cm')
    .max(220, 'Height must be at most 220 cm'),
  allergies: z.array(z.string()),
  healthConditions: z.array(z.string()),
})

export const registerStep3Schema = z.object({
  dietaryPreference: z.enum(['vegetarian', 'non-vegetarian', 'vegan']),
  mealFrequency: z.number().int().min(3).max(5),
  notificationPreferences: z.object({
    dailyReminder: z.boolean(),
    deficiencyAlerts: z.boolean(),
    weeklySummary: z.boolean(),
  }),
})

export const foodItemSchema = z.object({
  name: z
    .string()
    .min(2, 'Food name must be at least 2 characters')
    .max(100, 'Food name must be at most 100 characters'),
  category: z.string().min(1, 'Category is required'),
  calories: z.number().min(0).max(9000),
  protein: z.number().min(0).max(900),
  carbs: z.number().min(0).max(900),
  fat: z.number().min(0).max(900),
  fiber: z.number().min(0),
  iron: z.number().min(0),
  calcium: z.number().min(0),
  vitaminD: z.number().min(0),
  vitaminB12: z.number().min(0),
  zinc: z.number().min(0),
  vitaminC: z.number().min(0),
})

export const profileEditSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  age: z.number().int().min(6).max(18),
  gender: z.enum(['male', 'female', 'other']),
  weight: z.number().min(10).max(150),
  height: z.number().min(80).max(220),
  allergies: z.array(z.string()),
  healthConditions: z.array(z.string()),
  dietaryPreference: z.enum(['vegetarian', 'non-vegetarian', 'vegan']),
})

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
