import { Resend } from 'resend'

// Singleton — one client for the whole app
export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_ADDRESS =
  process.env.RESEND_DEFAULT_FROM_ADDRESS || 'onboarding@resend.dev'
export const FROM_NAME =
  process.env.RESEND_DEFAULT_FROM_NAME || 'Used Steinways'
export const ADMIN_EMAIL = 'usedsteinwayadmin@gmail.com'
