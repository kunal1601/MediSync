import { Link } from 'react-router-dom'
import Logo from '../../../shared/components/Logo'
import AuthBackground from './AuthBackground'

export default function AdminSignupPage() {
  return (
    <AuthBackground>
      <div className="flex flex-col items-center rounded-[28px] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:px-10 sm:py-12">
        <Logo variant="auth" className="mb-8" />
        <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">Create Admin Account</h1>
        <p className="mb-6 text-center text-sm text-slate-500">
          Sign-up flow ready for backend integration.
        </p>
        <Link
          to="/login/admin"
          className="font-semibold text-[#4eada7] hover:underline"
        >
          Back to Sign in
        </Link>
      </div>
    </AuthBackground>
  )
}
