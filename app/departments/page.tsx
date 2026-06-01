"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  Monitor, Cpu, Zap, Building, Cog, GraduationCap, 
  Leaf, Battery, User, FileText, Search 
} from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DepartmentsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const departments = [
    {
      name: "Computer Science",
      icon: Monitor,
      color: "text-blue-500",
      description: "Software development, database management, and networking.",
      teacherInfo: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty",
      digitalContent: "https://drive.google.com/drive/u/1/folders/1inTHtnDWnCngMPfZjEiUmRWR9v3_m2U-",
      semesterPlan: "https://chattogram.polytech.gov.bd/pages/static-pages/691c1e1581fc96cef9e658a8"
    },
    {
      name: "Electronics",
      icon: Cpu,
      color: "text-emerald-500",
      description: "Microprocessors, telecommunications, and embedded systems.",
      teacherInfo: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfd81fc96cef9e65293%22%7D",
      digitalContent: "https://drive.google.com/drive/u/1/folders/14Z0NdsE2NU4HMx8wwwPwHP8PKE2JeigL",
      semesterPlan: "https://chattogram.polytech.gov.bd/pages/static-pages/691c1e2181fc96cef9e65dfe"
    },
    {
      name: "Electrical",
      icon: Zap,
      color: "text-yellow-500",
      description: "Power systems, machines, and renewable energy technologies.",
      teacherInfo: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfe81fc96cef9e652da%22%7D",
      digitalContent: "https://drive.google.com/drive/u/1/folders/1dJ0f4Tr8ebdz7FWRNK29563GiiFc87K1",
      semesterPlan: "https://chattogram.polytech.gov.bd/pages/static-pages/691c1e1e81fc96cef9e65cd3"
    },
    {
      name: "Civil",
      icon: Building,
      color: "text-orange-500",
      description: "Structural design, surveying, and infrastructure development.",
      teacherInfo: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfc81fc96cef9e65215%22%7D",
      digitalContent: "https://drive.google.com/drive/u/1/folders/1XL_kVP45UPf1htMmPg3lWtBDc8VoviS0",
      semesterPlan: "https://chattogram.polytech.gov.bd/pages/static-pages/691c1e1f81fc96cef9e65cd6"
    },
    {
      name: "Mechanical",
      icon: Cog,
      color: "text-red-500",
      description: "Manufacturing processes, thermal systems, and automotive tech.",
      teacherInfo: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfe81fc96cef9e65349%22%7D",
      digitalContent: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfe81fc96cef9e65349%22%7D#",
      semesterPlan: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfe81fc96cef9e65349%22%7D#"
    },
    {
      name: "Environmental",
      icon: Leaf,
      color: "text-green-500",
      description: "Pollution control, waste management, and sustainability.",
      teacherInfo: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfd81fc96cef9e65274%22%7D",
      digitalContent: "https://drive.google.com/drive/u/1/folders/12HRWASVV0E6sQntgBURrB11bG1yO6wDA",
      semesterPlan: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfd81fc96cef9e65274%22%7D"
    },
    {
      name: "Power",
      icon: Battery,
      color: "text-cyan-500",
      description: "Generation, transmission, and solar/wind energy systems.",
      teacherInfo: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfd81fc96cef9e652d8%22%7D",
      digitalContent: "https://drive.google.com/drive/u/1/folders/1tQAVMj9KSsd4HL5TPCEiVYxaHWOwCbrB",
      semesterPlan: "https://chattogram.polytech.gov.bd/views/teacher-list-faculty?filters=%7B%22faculty%22%3A%20%22691c1dfd81fc96cef9e652d8%22%7D"
    },
  ]

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full animate-zoom opacity-40">
            <img
              src="/images/ag0ilsyuoai-72tf0ezktwdothekvqkd.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center z-10 animate-reveal">
          <GraduationCap className="w-12 h-12 text-blue-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
          
          {/* UPDATED GLOW TEXT SECTION */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
            <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Our </span>
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 inline-block"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.5))' 
              }}
            >
              Departments
            </span>
          </h1>

          <p className="text-foreground/60 text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-bold mb-8">
            Explore quality diploma programs and technical expertise.
          </p>

          {/* GLOW SEARCH BAR */}
          <div className="max-w-lg mx-auto relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 group-focus-within:text-blue-500 z-30 transition-colors" />
            <Input 
              placeholder="Search departments..." 
              className="pl-14 h-14 text-lg 
                        bg-white dark:bg-zinc-900/80 
                        border-2 border-blue-400/50 dark:border-blue-500/30 
                        text-slate-900 dark:text-white rounded-full 
                        transition-all duration-300
                        /* The Glow Effect */
                        shadow-[0_0_15px_rgba(59,130,246,0.4)] 
                        focus:shadow-[0_0_25px_rgba(59,130,246,0.6)] 
                        focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16 px-4 relative z-10 -mt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredDepartments.map((dept, idx) => (
              <Card 
                key={dept.name} 
                className="group border-card-border bg-card-gradient hover:-translate-y-2 hover:border-blue-500/40 transition-all duration-500 animate-reveal shadow-2xl"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-500">
                      <dept.icon className={`w-6 h-6 ${dept.color} group-hover:text-white transition-colors`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold tracking-tight">{dept.name}</CardTitle>
                      <CardDescription className="text-[10px] uppercase tracking-wider font-bold text-blue-500">4 Years (Diploma)</CardDescription>
                    </div>
                  </div>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4 min-h-[40px]">{dept.description}</p>
                  
                  <div className="grid grid-cols-1 gap-2 border-t border-white/5 pt-4">
                    <Button variant="outline" size="sm" asChild className="w-full justify-start text-[9px] font-black uppercase tracking-[0.2em] h-9 bg-white/5 border-white/10 hover:bg-blue-600 hover:text-white transition-all">
                      <Link href={dept.teacherInfo} target="_blank" rel="noopener noreferrer">
                        <User className="w-3.5 h-3.5 mr-2" /> Teacher Info
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="w-full justify-start text-[9px] font-black uppercase tracking-[0.2em] h-9 bg-white/5 border-white/10 hover:bg-blue-600 hover:text-white transition-all">
                      <Link href={dept.digitalContent} target="_blank" rel="noopener noreferrer">
                        <Monitor className="w-3.5 h-3.5 mr-2" /> Digital Content
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="w-full justify-start text-[9px] font-black uppercase tracking-[0.2em] h-9 bg-white/5 border-white/10 hover:bg-blue-600 hover:text-white transition-all">
                      <Link href={dept.semesterPlan} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-3.5 h-3.5 mr-2" /> Semester Plan
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-20">
              <p className="text-foreground/40 italic">No departments found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-background relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-reveal">
            <h2 className="text-3xl font-black tracking-tighter text-foreground mb-2">Why Choose CPI?</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Experienced Faculty", desc: "Industry experts and qualified teachers." },
              { title: "Modern Labs", desc: "State-of-the-art facilities for hands-on training." },
              { title: "Industry Connections", desc: "Strong partnerships for job placements." },
              { title: "BTEB Recognized", desc: "Approved by Bangladesh Technical Education Board." }
            ].map((item) => (
              <Card key={item.title} className="border-card-border bg-card-gradient/50">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" /> {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/60">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}