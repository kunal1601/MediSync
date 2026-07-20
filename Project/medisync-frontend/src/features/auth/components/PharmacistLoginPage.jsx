import { useState } from 'react';
import { usePharmacistLogin } from '../hooks/usePharmacistLogin';
import Logo from '../../../shared/components/Logo';
import { Link } from 'react-router-dom'; //  Import Link component
import bg_image from '../../../assets/Background_Image.png';
const PharmacistLoginPage = () => {
  const { formData, handleChange, handleSubmit, isLoading, error } = usePharmacistLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat  backdrop-blur-md"
          style={{
          backgroundImage: `url(${bg_image})`,
        }}>
      <div className="w-full max-w-[650px] bg-white p-12 pt-12 pb-12 rounded-3xl shadow-xl flex flex-col items-center">
           
        <Logo variant="auth" className="mb-8 scale-125" />

        <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Pharmacist Credentials</h1>
        <p className="text-slate-500 mb-12 font-medium">Nice to see you again</p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

          {/* ... keeping your existing form code untouched ... */}
          <div className="space-y-1.5 flex flex-col items-start">
            <label className="text-sm font-semibold text-slate-700" htmlFor="login">Login</label>
            <input type="text" name="login" id="login" value={formData.login} onChange={handleChange} placeholder="Email or phone number" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition outline-none" />
          </div>

          <div className="space-y-1.5 relative flex flex-col items-start w-full">
            <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
            <input type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition pr-12 outline-none" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-slate-400 hover:text-brand-primary transition cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
          </div>

          <div className="flex items-center justify-between py-2 text-sm w-full">
            <div className="flex items-center gap-2"><input type="checkbox" name="rememberMe" id="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-slate-300 rounded" /><label htmlFor="rememberMe" className="text-slate-600 font-medium select-none">Remember me</label></div>
            <a href="/forgot-password" className="text-brand-primary font-semibold hover:underline">Forgot password?</a>
          </div>

          <button type="submit" disabled={isLoading} className="w-full p-4 bg-brand-primary text-white rounded-xl text-lg font-semibold shadow hover:bg-brand-secondary transition disabled:opacity-60 cursor-pointer">
            {isLoading ? 'Verifying Profile...' : 'Sign in'}
          </button>
        </form>

        {/* 🌟 NEW SWITCH NAVIGATION BUTTON FOR OWNER/ADMIN ACCESSIBILITY */}
        <div className="mt-8 pt-4 border-t border-slate-100 w-full text-center">
          <p className="text-sm text-slate-500 font-medium">
            Are you a Store Administrator?{' '}
            <Link to="/login/admin" className="text-brand-primary font-bold hover:underline transition">
              Switch to Admin Portal
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default PharmacistLoginPage;