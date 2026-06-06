import { Link } from 'react-router-dom';
import logoImg from '../../assets/Final_logo.JPG';

/**
 * Reusable Logo Component for MediSync
 * @param {string} variant - 'auth' for login cards, 'navbar' for the navigation header
 * @param {string} className - Optional positioning overrides passed from parent components
 */
const Logo = ({ variant = 'navbar', className = '' }) => {
  
  // Variant A: The Login/Authentication Card Shield (Keeps the specific visual capsule)
  if (variant === 'auth') {
    return (
      <div className={`border border-slate-200 bg-slate-50 px-12 py-5 rounded-full shadow-inner flex items-center justify-center max-w-[280px] select-none ${className}`}>
        <img 
          src={logoImg} 
          alt="MediSync Logo" 
          className="h-16 w-auto object-contain mix-blend-multiply" 
        />
      </div>
    );
  }

  // Variant B: The Navbar Variant - 100% Transparent, Clickable, and Clean
  return (
    <Link 
      to="/dashboard/owner" 
      className={`flex items-center justify-start select-none cursor-pointer focus:outline-none bg-transparent hover:opacity-90 active:scale-98 transition ${className}`}
      title="Return to Owner Dashboard"
    >
      <div className="bg-white p-1 rounded-lg flex items-center justify-center overflow-hidden">
        <img 
          src={logoImg} 
          alt="MediSync Logo" 
          className="h-[52px] w-auto object-contain mix-blend-multiply"
        />
      </div>
    </Link>
  );
};

export default Logo;