import { useAdminLogin } from '../hooks/useAdminLogin';
import Logo from '../../../shared/components/Logo';
import { Link } from 'react-router-dom'; 
import bg_image from '../../../assets/Background_Image.png';
const AdminLoginPage = () => {
  const { formData, handleChange, handleSubmit, handleGoogleSsoMock, isLoading, error } =
    useAdminLogin();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat  backdrop-blur-md"
      style={{
      backgroundImage: `url(${bg_image})`,
    }}>
      
      <div className="w-full max-w-[680px]  bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center">
        
        <Logo variant="auth" className="mb-10" />
 
        <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Admin Credentials</h1>
        <p className="text-slate-500 mb-10 font-medium">Nice to see you again</p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

          {/* ... keeping your existing form code untouched ... */}
          <div className="space-y-1.5 flex flex-col items-start">
            <label className="text-sm font-semibold text-slate-700" htmlFor="login">Login</label>
            <input type="text" name="login" id="login" value={formData.login} onChange={handleChange} placeholder="Email or phone number" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition outline-none" />
          </div>

          <div className="space-y-1.5 relative flex flex-col items-start">
            <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition pr-12 outline-none" />
          </div>

          <div className="flex items-center justify-between py-2 text-sm w-full">
            <div className="flex items-center gap-2"><input type="checkbox" name="rememberMe" id="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-slate-300 rounded" /><label htmlFor="rememberMe" className="text-slate-600 font-medium select-none">Remember me</label></div>
            <a href="/forgot-password" className="text-brand-primary font-semibold hover:underline">Forgot password?</a>
          </div>

          <button type="submit" disabled={isLoading} className="w-full p-4 bg-brand-primary text-white rounded-xl text-lg font-semibold shadow hover:bg-brand-secondary transition disabled:opacity-60 cursor-pointer">
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="w-full mt-10 space-y-6">
          <div className="relative w-full flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="absolute bg-white px-4 text-sm font-medium text-slate-400">or</span>
          </div>

          <button type="button" onClick={handleGoogleSsoMock} className="w-full p-4 bg-slate-50 text-slate-700 rounded-xl text-base font-semibold border border-slate-200 shadow-sm hover:bg-slate-100 transition flex items-center justify-center gap-3 cursor-pointer">
            <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-5 w-5" />
            Sign in with Google
          </button>
        </div>

        {/* 🌟 NEW SWITCH NAVIGATION BUTTON FOR PHARMACIST ACCESSIBILITY */}
        <div className="mt-8 pt-4 border-t border-slate-100 w-full text-center">
          <p className="text-sm text-slate-500 font-medium">
            Not an Admin?{' '}
            <Link to="/login/pharmacist" className="text-brand-secondary font-bold hover:underline transition">
              Switch to Pharmacist Desk
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;