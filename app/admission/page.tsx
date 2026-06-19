"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, Globe, Calendar, BookOpen, GraduationCap, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AdmissionPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    email: "",
    phone: "",
    nationality: "BANGLADESHI",
    dob: "",
    religion: "",
    department: "COMPUTER SCIENCE"
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      setMessage({ type: "error", text: "Please complete all mandatory fields." })
      return
    }

    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      // Client-Side Safe Insert running directly inside static constraints
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            full_name: formData.fullName,
            father_name: formData.fatherName,
            mother_name: formData.motherName,
            email_address: formData.email,
            phone_number: formData.phone,
            nationality: formData.nationality,
            date_of_birth: formData.dob,
            religion: formData.religion,
            department_choice: formData.department
          }
        ])

      if (error) {
        setMessage({ type: "error", text: error.message })
      } else {
        setMessage({ type: "success", text: "Enrollment Form submitted successfully!" })
        setFormData({
          fullName: "",
          fatherName: "",
          motherName: "",
          email: "",
          phone: "",
          nationality: "BANGLADESHI",
          dob: "",
          religion: "",
          department: "COMPUTER SCIENCE"
        })
      }
    } catch (err) {
      setMessage({ type: "error", text: "A communication fault occurred with the database." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 animate-pulse">
        <Image 
          src="/images/ag0ilsyuoai-72tf0ezktwdothekvqkd.png" 
          alt="Overlay" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950 z-10" />

      <Card className="w-full max-w-4xl border-white/5 bg-slate-900/40 backdrop-blur-xl rounded-[40px] shadow-2xl relative z-20 overflow-hidden">
        <CardHeader className="bg-blue-600 p-8 text-center text-white relative">
          <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-90 drop-shadow-md" />
          <CardTitle className="text-3xl font-black uppercase tracking-wider">Student Information Form</CardTitle>
          <p className="text-xs uppercase font-bold tracking-widest text-blue-100 mt-1">Official Enrollment 2026</p>
        </CardHeader>
        
        <CardContent className="p-6 md:p-10">
          {message.text && (
            <div className={`p-4 mb-8 rounded-2xl text-center text-xs font-black uppercase tracking-wider border ${
              message.type === "success" 
                ? "bg-green-500/10 border-green-500/20 text-green-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <Input id="fullName" value={formData.fullName} onChange={handleChange} className="h-12 pl-12 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500" placeholder="Tarek Molla" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Father's Name *</Label>
                <div className="relative">
                  <User className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <Input id="fatherName" value={formData.fatherName} onChange={handleChange} className="h-12 pl-12 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500" placeholder="Father's Name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mother's Name *</Label>
                <div className="relative">
                  <User className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <Input id="motherName" value={formData.motherName} onChange={handleChange} className="h-12 pl-12 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500" placeholder="Mother's Name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} className="h-12 pl-12 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500" placeholder="example@mail.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <Input id="phone" value={formData.phone} onChange={handleChange} className="h-12 pl-12 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500" placeholder="01XXXXXXXXX" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nationality *</Label>
                <div className="relative">
                  <Globe className="absolute left-4 top-4 w-4 h-4 text-slate-400 z-10" />
                  <Input id="nationality" value={formData.nationality} onChange={handleChange} className="h-12 pl-12 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date of Birth *</Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 w-4 h-4 text-slate-400 z-10" />
                  <Input id="dob" type="date" value={formData.dob} onChange={handleChange} className="h-12 pl-12 pr-4 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500 dark:[color-scheme:dark]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Religion *</Label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <Input id="religion" value={formData.religion} onChange={handleChange} className="h-12 pl-12 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500" placeholder="Religion" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Department Choice *</Label>
                <Select value={formData.department} onValueChange={(val) => handleSelectChange("department", val)}>
                  <SelectTrigger className="h-12 rounded-xl bg-black/20 border-white/10 text-white focus:border-blue-500">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="COMPUTER SCIENCE">COMPUTER SCIENCE</SelectItem>
                    <SelectItem value="CIVIL TECHNOLOGY">CIVIL TECHNOLOGY</SelectItem>
                    <SelectItem value="ELECTRICAL">ELECTRICAL</SelectItem>
                    <SelectItem value="MECHANICAL">MECHANICAL</SelectItem>
                    <SelectItem value="ELECTRONICS">ELECTRONICS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.99]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Processing Submission..." : "Finalize Submission"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}