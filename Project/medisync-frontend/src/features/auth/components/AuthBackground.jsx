export default function AuthBackground({ children }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4 sm:p-6">
      {/* Teal gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, #8fd4cf 0%, #6ec4c0 35%, #5ab8b2 70%, #4eada7 100%)',
        }}
      />

      {/* Medical icon pattern tile */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: 'url(/auth-bg-pattern.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '320px 320px',
        }}
      />

      {/* Soft vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-teal-900/10" />

      <div className="relative z-10 w-full max-w-[440px]">{children}</div>
    </div>
  )
}
