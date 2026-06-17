"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components"
import emailjs from "@emailjs/browser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Search, Activity, Database, Send, Smile, Frown, Loader2, User, CheckCircle, Printer, BookOpen } from "lucide-react"
import { supabase } from "@/lib/supabase"

const LocalFixStyles = createGlobalStyle`
  [data-radix-popper-content-wrapper] {
    z-index: 100 !important;
  }
  button, .redirect-btn {
    position: relative;
    overflow: hidden;
  }
  @media print {
    .no-print { display: none !important; }
    .print-only { display: block !important; }
    body { background: white !important; color: black !important; padding: 0; margin: 0; }
    .marksheet-card { 
      background: white !important; 
      color: black !important; 
      border: 2px solid #000 !important;
      box-shadow: none !important;
      width: 100% !important;
      position: absolute;
      top: 0;
      left: 0;
    }
    .text-white { color: black !important; }
    .text-blue-400 { color: #2563eb !important; }
    .bg-slate-950\/90 { background: white !important; }
    .bg-blue-600 { background: #2563eb !important; -webkit-print-color-adjust: exact; }
  }
`;

export default function ResultsPage() {
  const [mounted, setMounted] = useState(false)
  
  // Database Query States
  const [rollNo, setRollNo] = useState("")
  const [department, setDepartment] = useState("COMPUTER SCIENCE")
  const [semester, setSemester] = useState("5TH SEMESTER")
  const [loading, setLoading] = useState(false)
  const [studentData, setStudentData] = useState<any>(null)
  const [error, setError] = useState("")

  // Feedback State
  const [feedbackText, setFeedbackText] = useState("")
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  useEffect(() => { 
    setMounted(true) 
  }, [])

  const handleSearch = async () => {
    if (!rollNo.trim()) {
      setError("Please enter a valid board roll number")
      return
    }
    
    setLoading(true)
    setError("")
    setStudentData(null)

    try {
      // Direct integration with our centralized cloud database instancing layer
      const { data, error: dbError } = await supabase
        .from('results')
        .select('*')
        .eq('roll_num', rollNo.trim())
        .eq('department', department)
        .eq('semester', semester)
        .single()

      if (dbError) {
        if (dbError.code === 'PGRST116') {
          setError("No certified marksheet found matching these structural parameters.")
        } else {
          setError(`Database Error: ${dbError.message}`)
        }
      } else if (data) {
        setStudentData(data)
      }
    } catch (err) {
      setError("An unexpected system exception occurred while mapping records.")
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) return;
    
    setIsSendingFeedback(true);

    const templateParams = {
      message: feedbackText,
      from_name: 'Portal User',
      to_email: 'tarekmolla228@gmail.com',
    };

    try {
      await emailjs.send(
        'service_25hvb3t',
        'template_8fx6hqv',
        templateParams, 
        'Bp7PNtQBBl6M1XPe-'
      );
      
      alert("Feedback sent successfully!");
      setFeedbackText("");
    } catch (err) {
      console.error('EmailJS Error:', err);
      alert("Failed to securely send parameters over standard mail server pipelines.");
    } finally {
      setIsSendingFeedback(false);
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <LocalFixStyles />
      
      {/* Cinematic Hero */}
      <section className="relative h-[450px] w-full flex items-center justify-center overflow-hidden no-print">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full animate-pulse opacity-40">
            <Image 
              src="/images/ag0ilsyuoai-72tf0ezktwdothekvqkd.png" 
              alt="Background" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <Award className="w-12 h-12 text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
            <span className="text-white">Portal </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 inline-block">Results</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-bold">
            Internal Student Database Access
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column (Utilities) */}
          <div className="lg:col-span-4 space-y-6 no-print">
            <StyledWrapper>
              <div className="card">
                <div className="content">
                  <div className="back">
                    <div className="back-content">
                      <Activity className="w-10 h-10 text-blue-500 mb-2" />
                      <strong className="text-lg uppercase font-black">BTEB Live</strong>
                    </div>
                  </div>
                  <div className="front">
                    <div className="front-content">
                      <span className="badge">External Server</span>
                      <div className="py-4">
                        <p className="text-xl font-black text-white text-center">BTEB Official</p>
                        <p className="text-[10px] text-blue-400/60 text-center uppercase tracking-widest font-bold mt-1">Status: Online</p>
                      </div>
                      <a href="https://btebresultszone.com/results" target="_blank" rel="noreferrer" className="redirect-btn">Connect Server</a>
                    </div>
                  </div>
                </div>
              </div>
            </StyledWrapper>

            {/* Feedback Card */}
            <div className="grid grid-cols-6 gap-3 rounded-[35px] p-6 shadow-2xl border border-white/5 bg-slate-900/50 backdrop-blur-md">
              <h1 className="text-center text-white text-2xl font-black col-span-6 mb-2">Feedback</h1>
              <textarea 
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="col-span-6 h-24 resize-none outline-none rounded-2xl p-4 text-sm border border-white/10 bg-black/20 text-white placeholder:text-white/20 focus:border-blue-500 transition-all" 
                placeholder="Notice an error?" />
              <div className="col-span-6 grid grid-cols-6 gap-3 pt-1">
                <button className="col-span-1 flex justify-center items-center rounded-xl p-3 border border-white/10 bg-white/5 hover:bg-blue-500/10 transition-colors">
                  <Smile className="w-5 h-5 text-white/50" />
                </button>
                <button className="col-span-1 flex justify-center items-center rounded-xl p-3 border border-white/10 bg-white/5 hover:bg-blue-500/10 transition-colors">
                  <Frown className="w-5 h-5 text-white/50" />
                </button>
                <span className="col-span-1" />
                <button 
                  onClick={handleFeedbackSubmit}
                  disabled={isSendingFeedback}
                  className="col-span-3 flex items-center justify-center gap-2 rounded-xl p-3 bg-blue-600 text-white shadow-lg active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSendingFeedback ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                  <span className="font-black uppercase text-[10px] tracking-widest">
                    {isSendingFeedback ? "Sending" : "Submit"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Search & Results) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-white/5 shadow-2xl rounded-[40px] overflow-hidden bg-slate-900/40 backdrop-blur-md no-print">
              <CardHeader className="p-10 pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-600/20">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-black uppercase tracking-tight text-white">Internal Search</CardTitle>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-500">Query: poly_db_v2</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Department</Label>
                      <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger className="h-14 border-2 border-white/10 rounded-full px-8 text-sm font-bold bg-black/20 text-white focus:border-blue-500 transition-all">
                          <SelectValue placeholder="Select Technology" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                          <SelectItem value="COMPUTER SCIENCE">COMPUTER SCIENCE</SelectItem>
                          <SelectItem value="CIVIL TECHNOLOGY">CIVIL TECHNOLOGY</SelectItem>
                          <SelectItem value="ELECTRICAL">ELECTRICAL</SelectItem>
                          <SelectItem value="MECHANICAL">MECHANICAL</SelectItem>
                          <SelectItem value="POWER">POWER</SelectItem>
                          <SelectItem value="ELECTRONICS">ELECTRONICS</SelectItem>
                          <SelectItem value="ENVIRONMENTAL">ENVIRONMENTAL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Roll Number</Label>
                      <Input 
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        className="h-14 border-2 border-white/10 rounded-full px-8 text-sm font-bold bg-black/20 text-white focus:border-blue-500 transition-all" 
                        placeholder="e.g. 787784" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Semester</Label>
                    <Select value={semester} onValueChange={setSemester}>
                      <SelectTrigger className="h-14 border-2 border-white/10 rounded-full px-8 text-sm font-bold bg-black/20 text-white focus:border-blue-500 transition-all">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                          <SelectItem key={s} value={`${s}TH SEMESTER`}>{s}th Semester</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-16 rounded-full text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all text-white border-none"
                  >
                    {loading ? <Loader2 className="animate-spin mr-2 w-5 h-5" /> : <Search className="w-5 h-5 mr-3" />}
                    {loading ? "Accessing Database..." : "Fetch Marksheet"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Error Processing Layout Section */}
            {error && (
              <div className="p-4 rounded-[20px] border border-red-500/20 bg-red-500/10 text-red-400 font-bold uppercase tracking-wider text-xs text-center animate-in zoom-in-95 duration-200">
                {error}
              </div>
            )}

            {/* RESULT CARD */}
            {studentData && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="marksheet-card border-blue-500/50 bg-blue-600/10 rounded-[40px] overflow-hidden p-1 shadow-2xl">
                  <div className="bg-slate-950/90 backdrop-blur-xl rounded-[38px] p-8 border border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-lg">
                          <User className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <span className="px-2 py-0.5 rounded-md bg-blue-600 text-[10px] font-bold text-white uppercase tracking-tighter">Verified Result</span>
                             <CheckCircle className="w-3 h-3 text-blue-400" />
                          </div>
                          <h2 className="text-3xl font-black uppercase text-white leading-none mb-1">{studentData.student_name}</h2>
                          <p className="text-sm font-bold text-blue-400 uppercase tracking-widest">Roll: {studentData.roll_num} | {studentData.department}</p>
                        </div>
                      </div>
                      <div className="text-center md:text-right">
                         <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Semester Ranking: {studentData.semester}</p>
                         <div className="flex items-baseline gap-2 justify-center md:justify-end leading-none">
                            <span className="text-6xl font-black text-white">{studentData.gpa ? Number(studentData.gpa).toFixed(2) : "0.00"}</span>
                            <span className="text-lg font-bold text-blue-500/50">GPA</span>
                         </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 no-print">
                        <Button 
                          onClick={handlePrint} 
                          className="flex-1 md:flex-none rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold uppercase tracking-widest text-[10px] h-12 px-8 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                        >
                          <Printer className="w-4 h-4 mr-2" /> Print Marksheet
                        </Button>
                        <Button 
                          onClick={handlePrint} 
                          variant="outline"
                          className="flex-1 md:flex-none rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] h-12 px-8 transition-all active:scale-95"
                        >
                          <BookOpen className="w-4 h-4 mr-2" /> Download Details
                        </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const StyledWrapper = styled.div`
  .card { width: 100%; height: 240px; perspective: 1000px; }
  .content {
    width: 100%; height: 100%; transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 35px;
    position: relative;
  }
  .card:hover .content { transform: rotateY(180deg); }
  .front, .back { 
    position: absolute; 
    width: 100%; 
    height: 100%; 
    backface-visibility: hidden; 
    border-radius: 35px; 
  }
  .back { 
    background: #0f172a; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    overflow: hidden; 
    border: 1px solid rgba(255,255,255,0.1); 
    z-index: 2;
    pointer-events: auto;
  }
  .card:hover .back {
    pointer-events: none;
  }
  .back::before { position: absolute; content: ''; width: 40%; height: 200%; background: linear-gradient(90deg, transparent, #3b82f6, transparent); animation: rotate 4s infinite linear; }
  .back-content { position: absolute; width: 98%; height: 98%; background: #0f172a; border-radius: 33px; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 1; }
  .front { 
    transform: rotateY(180deg); 
    background: #020617; 
    padding: 25px; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 1;
    pointer-events: none;
  }
  .card:hover .front {
    z-index: 5;
    pointer-events: auto;
  }
  .front-content { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
  .badge { background: #1e293b; border: 1px solid #334155; color: #60a5fa; padding: 4px 12px; border-radius: 10px; font-size: 9px; font-weight: 900; width: fit-content; text-transform: uppercase; margin: 0 auto; }
  .redirect-btn { 
    display: block; 
    width: 100%; 
    padding: 12px; 
    background: #2563eb; 
    color: white; 
    text-align: center; 
    font-size: 11px; 
    font-weight: 900; 
    border-radius: 15px; 
    text-transform: uppercase; 
    text-decoration: none;
    cursor: pointer;
  }
  .redirect-btn:hover { background: #1d4ed8; }
  @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;