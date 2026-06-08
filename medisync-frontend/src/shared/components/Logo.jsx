// import { Link } from 'react-router-dom';
// // import logoImg from '../../assets/Final_logo.JPG';

// const LOGO_SRC = '/logo-transparent.png'

// /**
//  * Reusable Logo Component for MediSync
//  * @param {string} variant - 'auth' for login cards, 'navbar' for the navigation header
//  * @param {string} className - Optional positioning overrides passed from parent components
//  */
// const Logo = ({ variant = 'navbar', className = '' }) => {
  
//   // Variant A: The Login/Authentication Card Shield (Keeps the specific visual capsule)
//   if (variant === 'auth') {
//     return (
//       <div className={`border border-slate-200 bg-slate-50 px-12 py-5 rounded-full shadow-inner flex items-center justify-center max-w-[280px] select-none ${className}`}>
//         <img 
//           src={logoImg} 
//           alt="MediSync Logo" 
//           className="h-16 w-auto object-contain mix-blend-multiply" 
//         />
//       </div>
//     );
//   }

//   // Variant B: The Navbar Variant - 100% Transparent, Clickable, and Clean
//   return (
//     <Link 
//       to="/dashboard/owner" 
//       className={`flex items-center justify-start select-none cursor-pointer focus:outline-none bg-transparent hover:opacity-90 active:scale-98 transition ${className}`}
//       title="Return to Owner Dashboard"
//     >
//       <div className="bg-white p-1 rounded-lg flex items-center justify-center overflow-hidden">
//         <img 
//           src={logoImg} 
//           alt="MediSync Logo" 
//           className="h-[52px] w-auto object-contain mix-blend-multiply"
//         />
//       </div>
//     </Link>
//   );
// };

// export default Logo;




import { Link } from 'react-router-dom'

const LOGO_SRC = '/logo-transparent.png'

const Logo = ({ variant = 'navbar', className = '' }) => {
  if (variant === 'auth') {
    return (
      <div
        className={`mx-auto flex h-[92px] w-[248px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200/60 bg-white px-5 shadow-[0_6px_28px_rgba(0,0,0,0.1)] ${className}`}
      >
        <img
          src={LOGO_SRC}
          alt="MediSync Pharmacy Management System"
          className="pointer-events-none block h-[72px] w-auto max-w-[200px] object-contain object-center"
          draggable={false}
        />
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center justify-center select-none ${className}`}>
        <img
          src={LOGO_SRC}
          alt="MediSync Logo"
          className="h-[72px] w-auto object-contain object-center"
        />
      </div>
    )
  }

  return (
    <Link
      to="/dashboard/owner"
      className={`flex cursor-pointer items-center justify-start bg-transparent transition select-none hover:opacity-90 active:scale-[0.98] focus:outline-none ${className}`}
      title="Return to Owner Dashboard"
    >
      <div className="flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-lg bg-white">
        <img
          src={LOGO_SRC}
          alt="MediSync Logo"
          className="h-[48px] w-auto object-contain object-center"
        />
      </div>
    </Link>
  )
}

export default Logo
