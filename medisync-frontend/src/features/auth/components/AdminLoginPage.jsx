// import { useAdminLogin } from '../hooks/useAdminLogin';
// import Logo from '../../../shared/components/Logo';
// import { Link } from 'react-router-dom'; 
// import AuthBackground from './AuthBackground'
// import ToggleSwitch from './ToggleSwitch'
// import { Eye, EyeOff } from 'lucide-react'
// import { useState } from 'react'

// const AdminLoginPage = () => {
//   const { formData, handleChange, handleSubmit, handleGoogleSsoMock, isLoading, error } =
//     useAdminLogin();

//     const [showPassword, setShowPassword] = useState(false)

//   const setRememberMe = (value) => {
//     handleChange({
//       target: { name: 'rememberMe', type: 'checkbox', checked: value },
//     })
//   }

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50">
//       <div className="w-full max-w-[500px] bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center">
        
//         <Logo variant="auth" className="mb-10" />

//         <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Admin Credentials</h1>
//         <p className="text-slate-500 mb-10 font-medium">Nice to see you again</p>

//         <form onSubmit={handleSubmit} className="w-full space-y-6">
//           {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

//           {/* ... keeping your existing form code untouched ... */}
//           <div className="space-y-1.5 flex flex-col items-start">
//             <label className="text-sm font-semibold text-slate-700" htmlFor="login">Login</label>
//             <input type="text" name="login" id="login" value={formData.login} onChange={handleChange} placeholder="Email or phone number" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition outline-none" />
//           </div>

//           <div className="space-y-1.5 relative flex flex-col items-start">
//             <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
//             <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition pr-12 outline-none" />
//           </div>

//           <div className="flex items-center justify-between py-2 text-sm w-full">
//             <div className="flex items-center gap-2"><input type="checkbox" name="rememberMe" id="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-slate-300 rounded" /><label htmlFor="rememberMe" className="text-slate-600 font-medium select-none">Remember me</label></div>
//             <a href="/forgot-password" className="text-brand-primary font-semibold hover:underline">Forgot password?</a>
//           </div>

//           <button type="submit" disabled={isLoading} className="w-full p-4 bg-brand-primary text-white rounded-xl text-lg font-semibold shadow hover:bg-brand-secondary transition disabled:opacity-60 cursor-pointer">
//             {isLoading ? 'Signing in...' : 'Sign in'}
//           </button>
//         </form>

//         <div className="w-full mt-10 space-y-6">
//           <div className="relative w-full flex items-center justify-center">
//             <div className="border-t border-slate-200 w-full"></div>
//             <span className="absolute bg-white px-4 text-sm font-medium text-slate-400">or</span>
//           </div>

//           <button type="button" onClick={handleGoogleSsoMock} className="w-full p-4 bg-slate-50 text-slate-700 rounded-xl text-base font-semibold border border-slate-200 shadow-sm hover:bg-slate-100 transition flex items-center justify-center gap-3 cursor-pointer">
//             <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-5 w-5" />
//             Sign in with Google
//           </button>
//         </div>

//         {/* 🌟 NEW SWITCH NAVIGATION BUTTON FOR PHARMACIST ACCESSIBILITY */}
//         <div className="mt-8 pt-4 border-t border-slate-100 w-full text-center">
//           <p className="text-sm text-slate-500 font-medium">
//             Not an Admin?{' '}
//             <Link to="/login/pharmacist" className="text-brand-secondary font-bold hover:underline transition">
//               Switch to Pharmacist Desk
//             </Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;



import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAdminLogin } from '../hooks/useAdminLogin'
import Logo from '../../../shared/components/Logo'
import AuthBackground from './AuthBackground'
import ToggleSwitch from './ToggleSwitch'

const AdminLoginPage = () => {
  const { formData, handleChange, handleSubmit, handleGoogleSsoMock, isLoading, error } =
    useAdminLogin()
  const [showPassword, setShowPassword] = useState(false)

  const setRememberMe = (value) => {
    handleChange({
      target: { name: 'rememberMe', type: 'checkbox', checked: value },
    })
  }

  return (
    <AuthBackground>
      <div className="flex flex-col items-center rounded-[28px] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:px-10 sm:py-12">
        <Logo variant="auth" className="mb-8" />

        <h1 className="mb-1 text-center text-[26px] font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Admin Credentials
        </h1>
        <p className="mb-8 text-center text-sm font-medium text-slate-600">
          Nice to see you again
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500" htmlFor="login">
              Login
            </label>
            <input
              type="text"
              name="login"
              id="login"
              value={formData.login}
              onChange={handleChange}
              placeholder="Email or phone number"
              required
              className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full rounded-xl border-0 bg-slate-100 px-4 py-3.5 pr-12 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#5ab8b2]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition hover:text-[#5ab8b2]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <ToggleSwitch
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={setRememberMe}
              label="Remember me"
            />
            <a
              href="/forgot-password"
              className="text-sm font-semibold text-[#4eada7] hover:text-[#3d9a94] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer rounded-xl bg-[#5ab8b2] py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#4eada7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleSsoMock}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-slate-100 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
            className="h-5 w-5"
          />
          Or sign in with Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          Having Trouble signing in?{' '}
          <Link
            to="/signup/admin"
            className="font-semibold text-[#4eada7] hover:text-[#3d9a94] hover:underline"
          >
            Sign up now
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-slate-400">
          Not an Admin?{' '}
          <Link
            to="/login/pharmacist"
            className="font-semibold text-[#4eada7] hover:underline"
          >
            Pharmacist Desk
          </Link>
        </p>
      </div>
    </AuthBackground>
  )
}

export default AdminLoginPage
