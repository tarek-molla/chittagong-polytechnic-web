"use client"

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  User, 
  Lock, 
  ArrowRight, 
  Loader2,
  AlertCircle 
} from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const role = activeTab === 'student' ? 'student' : 'admin';

    try {
      const res = await fetch("http://localhost/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role }),
      });
      
      const result = await res.json();

      if (result.success) {
        window.location.href = result.role === "admin" ? "/admin-dashboard" : "/student-portal";
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection failed. Check your PHP server.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-700 px-4">
      
      {/* 1. PROFESSIONAL FILM BURN OVERLAY (Reacts to Theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] rounded-full animate-leak-slow mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-400/20 dark:bg-indigo-600/10 blur-[100px] rounded-full animate-leak-reverse mix-blend-multiply dark:mix-blend-overlay" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* 2. GLOWING FIREFLIES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/40 dark:bg-blue-400 blur-[1px] animate-firefly"
            style={{
              width: Math.random() * 3 + 2 + 'px',
              height: Math.random() * 3 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 10 + 's',
              animationDuration: Math.random() * 15 + 10 + 's',
              boxShadow: '0 0 8px 1px rgba(59, 130, 246, 0.4)',
            }}
          />
        ))}
      </div>

      {/* 3. COMPACT CONTAINER (Mixed with Nav) */}
      <div className="relative z-10 w-full max-w-[360px] mt-20 md:mt-28 -translate-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <div className="bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-2xl rounded-[1.8rem] shadow-xl dark:shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-white dark:border-white/5 overflow-hidden">
          {/* Top accent line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
          
          <div className="p-7 md:p-9">
            <div className="text-center mb-7">
              <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                CPI Portal
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-[8px] font-black uppercase tracking-[0.4em] mt-1.5 opacity-60">
                Authorized Access
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[9px] font-bold uppercase tracking-tight rounded-xl flex items-center gap-2">
                <AlertCircle size={12} /> {error}
              </div>
            )}

            {/* SLIM TAB SYSTEM */}
            <div className="flex bg-slate-200/50 dark:bg-slate-900/60 rounded-xl p-1 mb-7 border border-slate-300/30 dark:border-white/5">
              <button 
                type="button"
                onClick={() => setActiveTab('student')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'student' ? 'bg-white dark:bg-[#1e293b] text-blue-600 shadow-sm dark:text-blue-400' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <GraduationCap size={14} /> Student
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('teacher')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'teacher' ? 'bg-white dark:bg-[#1e293b] text-emerald-600 shadow-sm dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <User size={14} /> Teacher
              </button>
            </div>

            {/* COMPACT FORM */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                  {activeTab === 'student' ? 'Roll Number' : 'Employee ID'}
                </label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    name="username"
                    required 
                    className="w-full pl-10 pr-4 py-3 bg-slate-100/50 dark:bg-[#020617]/40 border border-slate-200 dark:border-white/5 rounded-xl focus:ring-1 focus:ring-blue-600/50 focus:border-blue-600 outline-none transition-all text-[11px] font-bold text-slate-900 dark:text-white"
                    placeholder={activeTab === 'student' ? "787784" : "admin_cpi"}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    name="password"
                    type="password" 
                    required 
                    className="w-full pl-10 pr-4 py-3 bg-slate-100/50 dark:bg-[#020617]/40 border border-slate-200 dark:border-white/5 rounded-xl focus:ring-1 focus:ring-blue-600/50 focus:border-blue-600 outline-none transition-all text-[11px] font-bold text-slate-900 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] text-white transition-all flex items-center justify-center gap-2 shadow-2xl active:scale-[0.98] ${
                  activeTab === 'student' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
                }`}
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : `Log in as ${activeTab}`}
                {!loading && <ArrowRight size={14} />}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-[7px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.7em] opacity-40">
          © 2026 ARCHITECTS • CPI
        </p>
      </div>

      <style jsx global>{`
        @keyframes firefly {
          0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
          50% { opacity: 0.7; transform: translateY(-30px) scale(1.2); }
        }
        @keyframes leak-slow {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(5%, 10%); opacity: 0.7; }
        }
        @keyframes leak-reverse {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(-5%, -10%); opacity: 0.7; }
        }
        .animate-firefly { animation: firefly infinite ease-in-out; }
        .animate-leak-slow { animation: leak-slow 15s infinite ease-in-out; }
        .animate-leak-reverse { animation: leak-reverse 20s infinite ease-in-out; }
      `}</style>
    </main>
  );
}