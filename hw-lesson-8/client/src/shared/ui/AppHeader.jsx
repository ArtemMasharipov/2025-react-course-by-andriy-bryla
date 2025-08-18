import MainNavbar from './Navbar'

export default function AppHeader() {
  return (
  <header className="fixed top-0 left-0 right-0 z-30 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-semibold text-lg text-slate-800 tracking-tight truncate">
            HW Lesson 8
          </span>
        </div>
        <MainNavbar />
      </div>
    </header>
  )
}
