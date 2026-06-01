"use client"

import React, { useEffect, useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LogOut, 
  Users, 
  RefreshCw, 
  GraduationCap, 
  ShieldCheck,
  TrendingUp,
  Search
} from "lucide-react"

export default function AdminDashboard() {
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost/get_admissions.php")
      const data = await res.json()
      setApplicants(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-700 pb-20 relative overflow-hidden">
      
      {/* BACKGROUND AESTHETICS (Matches Login) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[120px] rounded-full animate-pulse" />
        
        {/* FIREFLIES */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 dark:bg-blue-500 blur-[1px] animate-firefly opacity-0"
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/40">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                Admin <span className="text-blue-600">Central</span>
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.2em] ml-1">
              Admission Management System • CPI
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={fetchData} 
              disabled={loading}
              className="rounded-xl font-black text-[10px] uppercase tracking-widest border-slate-200 dark:border-white/10 dark:bg-white/5"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? 'animate-spin' : ''}`} /> 
              Sync Data
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => window.location.href = '/login'}
              className="rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-500/20"
            >
              <LogOut className="w-3.5 h-3.5 mr-2" /> Terminate Session
            </Button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Applicants", val: applicants.length, icon: Users, color: "text-blue-600" },
            { label: "Processing", val: "Active", icon: RefreshCw, color: "text-amber-500" },
            { label: "System Status", val: "Optimal", icon: TrendingUp, color: "text-emerald-500" }
          ].map((stat, i) => (
            <Card key={i} className="bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-md border-white dark:border-white/5 rounded-[1.5rem] shadow-sm hover:translate-y-[-4px] transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {stat.val}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* APPLICANTS TABLE CARD */}
        <Card className="bg-white/60 dark:bg-[#0f172a]/40 backdrop-blur-2xl border-white dark:border-white/5 rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-none">
          <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" /> Recent Online Admissions
            </h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                <input 
                    placeholder="Search applicants..." 
                    className="bg-slate-100/50 dark:bg-white/5 border-none rounded-lg py-1.5 pl-8 pr-4 text-[10px] font-bold outline-none ring-1 ring-slate-200 dark:ring-white/10 focus:ring-blue-500 transition-all w-48"
                />
            </div>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-white/5">
                  <TableRow className="border-slate-100 dark:border-white/5">
                    <TableHead className="text-[10px] font-black uppercase text-slate-400">Student Identity</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-400">Academic Credentials</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-400">Department</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-400">Contact Details</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-400 text-right">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicants.map((student: any) => (
                    <TableRow key={student.id} className="border-slate-100 dark:border-white/5 hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-colors group">
                      <TableCell className="font-bold text-slate-900 dark:text-slate-200 text-xs py-4">
                        {student.full_name}
                      </TableCell>
                      <TableCell>
                        <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Roll: {student.ssc_roll}</div>
                        <div className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 mt-1 uppercase">
                          GPA: {student.ssc_gpa}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            {student.department || "General"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{student.phone}</div>
                        <div className="text-[10px] text-slate-400 lowercase">{student.email}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          {new Date(student.applied_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {applicants.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20">
                        <div className="flex flex-col items-center gap-2 opacity-30">
                            <Users size={40} />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Records Found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes firefly {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.6; transform: translateY(-20px); }
        }
        .animate-firefly { animation: firefly infinite ease-in-out; }
      `}</style>
    </div>
  )
}