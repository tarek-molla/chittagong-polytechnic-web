import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-card-border bg-background py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Branding Column */}
        <div className="md:col-span-2">
          <h3 className="text-3xl font-black mb-4 tracking-tighter text-foreground">
            CPI<span className="text-blue-600">.</span>
          </h3>
          <p className="text-foreground/50 text-base max-w-sm leading-relaxed font-medium">
            Building the foundation of Bangladesh's technical future since 1962. Nasirabad, Chattogram.
          </p>
        </div>
        
        {/* Resources Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-blue-500">Resources</h4>
          <nav className="flex flex-col gap-2 text-sm font-bold text-foreground/60">
            <Link href="/results" className="hover:text-blue-500 transition-colors">Results Portal</Link>
            <Link href="/student-portal" className="hover:text-blue-500 transition-colors">Student Login</Link>
            <Link href="/library" className="hover:text-blue-500 transition-colors">Digital Library</Link>
          </nav>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-blue-500">Contact</h4>
          <address className="not-italic text-sm font-bold text-foreground/60 leading-relaxed">
            info@cpi.gov.bd <br />
            +880 31 681031
          </address>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-card-border text-[9px] text-foreground/30 font-black tracking-[0.4em] uppercase text-center">
        © 2026 Chittagong Polytechnic Institute. Engineered for Excellence.
      </div>
    </footer>
  )
}