export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 text-white flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center font-bold">
              N
            </div>
            <span className="font-display font-semibold text-2xl">NutriGuard</span>
          </div>
        </div>

        <div>
          <h2 className="font-display font-semibold text-3xl mb-3 leading-tight">
            Nourishing futures, one meal at a time
          </h2>
          <p className="text-slate-400 text-lg">
            Balance your diet, detect nutrient deficits, thrive with NutriGuard.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-500">© 2026 NutriGuard. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  )
}
