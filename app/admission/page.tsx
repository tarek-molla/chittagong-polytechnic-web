"use client"

import { useEffect, useState } from "react"
import { 
  User, Mail, Phone, Calendar, Globe, 
  MapPin, GraduationCap, ArrowRight, Loader2, CheckCircle2 
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdmissionPage() {
  const [mounted, setMounted] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    email: "",
    phone: "",
    nationality: "BANGLADESHI",
    birthDate: "",
    religion: "",
    department: "COMPUTER SCIENCE"
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)

  useEffect(() => setMounted(true), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch("http://localhost/api/apply.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setStatus({ type: 'success', msg: result.message })
        // Optional: Clear form
        setFormData({
          name: "", fatherName: "", motherName: "", email: "",
          phone: "", nationality: "BANGLADESHI", birthDate: "",
          religion: "", department: "COMPUTER SCIENCE"
        })
      } else {
        setStatus({ type: 'error', msg: result.message || "Submission failed" })
      }
    } catch (error) {
      setStatus({ type: 'error', msg: "Connection Error: Is XAMPP running?" })
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 overflow-x-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full scale-110 animate-slow-zoom will-change-transform">
            <img
              src="/images/ag0ilsxmrnaeudvnbrkymbql5ivwt0or.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-0" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <div className="inline-block p-3 rounded-2xl bg-blue-500/10 backdrop-blur-md mb-6 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <GraduationCap className="w-10 h-10 text-blue-500" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">Online </span>
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 inline-block"
              style={{ filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.6))' }}
            >
              Application
            </span>
          </h1>

          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto uppercase tracking-[0.4em] font-black italic">
            Shape Your Tech Destiny
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-30 -mt-20 px-4 pb-20">
        <Card className="w-full max-w-4xl mx-auto border-card-border bg-card-gradient backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] overflow-hidden">
          
          <CardHeader className="relative overflow-hidden bg-blue-600 p-6 text-center text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            <div className="relative z-10">
              <CardTitle className="text-2xl font-black tracking-tighter uppercase italic">
                Student Information Form
              </CardTitle>
              <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mt-1">Official Enrollment 2026</p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 md:p-10">
            {/* Status Notification */}
            {status && (
              <div className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${
                status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
              }`}>
                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Loader2 className="w-5 h-5" />}
                <p className="font-black uppercase text-xs tracking-widest">{status.msg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
              
              {/* Manual Fields for better binding */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Full Name *</Label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input name="name" value={formData.name} onChange={handleChange} required placeholder="JOHN DOE" className="pl-11 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Father's Name *</Label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder="FATHER'S NAME" className="pl-11 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Mother's Name *</Label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input name="motherName" value={formData.motherName} onChange={handleChange} required placeholder="MOTHER'S NAME" className="pl-11 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Email Address *</Label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="EMAIL@EXAMPLE.COM" className="pl-11 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Phone Number *</Label>
                <div className="relative group">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input name="phone" value={formData.phone} onChange={handleChange} required placeholder="01XXXXXXXXX" className="pl-11 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Nationality *</Label>
                <div className="relative group">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input name="nationality" value={formData.nationality} onChange={handleChange} required placeholder="BANGLADESHI" className="pl-11 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Date of Birth *</Label>
                <div className="relative group">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="pl-11 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Religion *</Label>
                <div className="relative group">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input name="religion" value={formData.religion} onChange={handleChange} required placeholder="RELIGION" className="pl-11 h-12 rounded-xl bg-slate-500/5 dark:bg-white/5 border-white/10" />
                </div>
              </div>

              {/* Department Dropdown */}
              <div className="space-y-1.5 md:col-span-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Department Choice *</Label>
                <select 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-xl border border-white/10 bg-slate-500/5 dark:bg-white/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option className="bg-slate-900" value="COMPUTER SCIENCE">COMPUTER SCIENCE</option>
                  <option className="bg-slate-900" value="CIVIL TECHNOLOGY">CIVIL TECHNOLOGY</option>
                  <option className="bg-slate-900" value="ELECTRICAL">ELECTRICAL</option>
                  <option className="bg-slate-900" value="MECHANICAL">MECHANICAL</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="md:col-span-3 pt-6 mt-4 border-t border-white/5">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.3em] shadow-[0_15px_30px_-10px_rgba(37,99,235,0.5)] transition-all active:scale-95 group"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Finalize Submission 
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
      `}</style>
    </div>
  )
}