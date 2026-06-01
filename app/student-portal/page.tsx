"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  LogOut, 
  CheckCircle, 
  Hash, 
  GraduationCap, 
  ShieldCheck,
  FileText
} from "lucide-react"

export default function StudentPortal() {
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const currentRoll = "786415" 
    
    fetch(`http://localhost/get_student_data.php?roll=${currentRoll}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setStudent(result.data)
        } else {
          setError(result.message)
        }
      })
      .catch(() => setError("Failed to connect to server. Check XAMPP."))
      .finally(() => setLoading(false))
  }, [])

  if (!mounted) return null

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#020617] text-blue-500 font-black uppercase tracking-[0.5em] text-xs">
      Initialising Profile...
    </div>
  )
  
  if (error) return (
    <div className="flex flex-col h-screen items-center justify-center gap-6 bg-[#020617] p-6 text-center">
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full">
        <ShieldCheck className="text-red-500 w-10 h-10" />
      </div>
      <p className="text-red-400 font-black uppercase tracking-widest text-sm">{error}</p>
      <Button 
        onClick={() => window.location.href = '/login'}
        className="bg-white text-black hover:bg-slate-200 font-black uppercase tracking-tighter px-8"
      >
        Return to Login
      </Button>
    </div>
  )

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-700 pb-20 overflow-hidden">
      
      {/* ARCHITECT BACKGROUND AESTHETICS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[120px] rounded-full animate-pulse" />
        
        {/* FIREFLIES */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 dark:bg-blue-500 blur-[1px] animate-firefly"
            style={{
              width: '3px',
              height: '3px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 10 + 's',
              animationDuration: Math.random() * 15 + 10 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28">
        
        {/* TOP NAV BAR */}
        <div className="flex items-center justify-between mb-10 bg-white/40 dark:bg-white/5 backdrop-blur-xl p-4 px-8 rounded-2xl border border-white dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg shadow-emerald-500/30">
              <CheckCircle className="text-white w-4 h-4" />
            </div>
            <h1 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">
              Student <span className="text-blue-600">Portal</span>
            </h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/login'}
            className="text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 dark:text-slate-400"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: IDENTITY CARD */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-2xl rounded-[2.5rem] border-white dark:border-white/5 overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border-none">
              <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </div>

              <CardContent className="relative pt-0 text-center px-8 pb-10">
                <div className="relative -top-12">
                  <div className="inline-flex p-1 bg-white dark:bg-[#1e293b] rounded-full shadow-2xl mb-4">
                    <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-[#020617] flex items-center justify-center border-4 border-white dark:border-[#0f172a]">
                      <User size={48} className="text-blue-600 dark:text-blue-500" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-tight">
                    {student?.full_name}
                  </h2>
                  <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2 flex items-center justify-center gap-1">
                    <Hash className="w-3 h-3" /> Roll: {student?.ssc_roll}
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <Mail size={14} className="text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 truncate">{student?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <Phone size={14} className="text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{student?.phone}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                  <div className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[9px] font-black border border-emerald-500/20 uppercase tracking-[0.2em]">
                    Status: Admitted
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: INFORMATION */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-white/60 dark:bg-[#0f172a]/40 backdrop-blur-2xl rounded-[2.5rem] border-white dark:border-white/5 p-8 md:p-10 shadow-xl border-none">
              <CardHeader className="p-0 mb-10">
                <CardTitle className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white flex items-center gap-3">
                  <BookOpen className="text-blue-600 w-5 h-5" /> Academic Profile
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <DetailItem label="Father's Name" value={student?.father_name} />
                  <DetailItem label="Mother's Name" value={student?.mother_name} />
                  <DetailItem label="Department" value={student?.department} icon={GraduationCap} />
                  <DetailItem label="SSC GPA" value={student?.ssc_gpa} isHigh />
                  
                  <div className="space-y-2 group">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Birth Date</p>
                    <div className="flex items-center gap-2 text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {student?.birth_date || "Pending"}
                    </div>
                    <div className="h-px w-full bg-slate-100 dark:bg-white/5 group-hover:bg-blue-500/30 transition-colors" />
                  </div>

                  <DetailItem label="Religion" value={student?.religion} />
                </div>

                {/* NOTIFICATION BOX */}
                <div className="mt-12 p-6 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-[1.5rem] flex items-start gap-4">
                  <div className="p-2 bg-amber-500 rounded-lg shrink-0 shadow-lg shadow-amber-500/20">
                    <FileText className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">Action Required</h4>
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                      Please bring your original SSC Transcript and 3 copies of your passport-sized photo to the Registrar's Office at CPI for final verification.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes firefly {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.6; transform: translateY(-30px); }
        }
        .animate-firefly { animation: firefly infinite ease-in-out; }
      `}</style>
    </main>
  )
}

function DetailItem({ label, value, isHigh = false, icon: Icon }: { label: string, value: any, isHigh?: boolean, icon?: any }) {
  return (
    <div className="space-y-2 group">
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
         {Icon && <Icon className="w-3 h-3" />} {label}
      </p>
      <p className={`text-sm font-black uppercase tracking-tight ${isHigh ? 'text-blue-600 dark:text-blue-400 text-lg' : 'text-slate-800 dark:text-slate-200'}`}>
        {value || "Not Recorded"}
      </p>
      <div className="h-px w-full bg-slate-100 dark:bg-white/5 group-hover:bg-blue-500/30 transition-colors" />
    </div>
  )
}