"use client"

import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import { LayoutDashboard, LogIn, Bell, Building2, GraduationCap, Zap } from "lucide-react"

export default function Navbar() {
  const navLinks = [
    { name: "Dept", href: "/departments", icon: Building2 },
    { name: "Apply", href: "/admission", icon: GraduationCap },
    { name: "Notice", href: "/notices", icon: Bell },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 animate-reveal">
      <nav className="w-full max-w-5xl flex items-center justify-between px-5 py-2 bg-black/45 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        
        {/* LOGO */}
        <Link 
          href="/" 
          className="text-lg font-black tracking-tighter text-white transition-all duration-500 hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        >
          CPI<span className="text-blue-500 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,1)]">.</span>
        </Link>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="group relative px-4 py-2 text-white/70 hover:text-blue-400 transition-all duration-300 flex items-center gap-2"
            >
              <div className="absolute inset-0 bg-white/5 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-10" />
              <link.icon className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
              <span>{link.name}</span>
            </Link>
          ))}
          
          {/* RESULTS PORTAL - Updated with Live Indicator */}
          <Link 
            href="/results" 
            className="group ml-2 relative text-blue-400 border-l border-white/10 pl-5 flex items-center gap-2 hover:text-blue-300 transition-all duration-300"
          >
            <div className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </div>
            <LayoutDashboard className="w-3.5 h-3.5 group-hover:scale-110 group-hover:rotate-6 transition-transform" /> 
            <span className="tracking-[0.3em]">Results</span>
          </Link>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-4">
          <div className="hover:scale-110 transition-transform duration-300">
            <ThemeToggle />
          </div>
          <Link href="/login">
            <button className="relative overflow-hidden group px-5 py-2 rounded-full bg-blue-600 text-[9px] font-black uppercase text-white flex items-center gap-2 transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] active:scale-95">
              <LogIn className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /> 
              <span className="hidden sm:inline">Student Login</span>
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}