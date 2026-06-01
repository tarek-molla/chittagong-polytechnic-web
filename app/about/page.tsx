"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image"
import styled from 'styled-components';
import { GraduationCap, MapPin, Github, Linkedin, Youtube, Target, Eye, Coffee } from "lucide-react"

// --- STYLED COMPONENTS ---
const StyledCardWrapper = styled.div`
  .card { width: 260px; height: 140px; perspective: 1000px; cursor: pointer; }
  .card-inner {
    width: 100%; height: 100%; position: relative; transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .card:hover .card-inner { transform: rotateY(180deg); }
  .card-front, .card-back {
    position: absolute; width: 100%; height: 100%; backface-visibility: hidden;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
  }
  .card-front { background: #0f172a; color: #fff; transform: rotateY(0deg); }
  .card-back { background: #0891b2; color: #fff; transform: rotateY(180deg); }
  .coffee-icon { color: #ffdd00; margin-bottom: 4px; }
`;

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const team = [
    { name: "Tarek", role: "Visionary (Leader)", color: "border-cyan-500", glow: "rgba(6,182,212,0.6)", text: "text-cyan-500", img: "/images/logo.jpeg", isLeader: true },
    { name: "Shafayat Hossen", role: "Frontend", color: "border-green-500", glow: "rgba(34,197,94,0.5)", text: "text-green-600", img: "/images/shafayat-hossen.jpeg" },
    { name: "Farzana Akther Riya", role: "Backend", color: "border-purple-500", glow: "rgba(168,85,247,0.5)", text: "text-purple-600", img: "/images/428898539-370321285874752-497409.png" },
    { name: "Mahi", role: "Database", color: "border-pink-500", glow: "rgba(236,72,153,0.5)", text: "text-pink-600", img: "/images/whatsapp-20image-202025-12-28-20at-201.jpeg" },
    { name: "Tasnia Pranty", role: "Database", color: "border-red-500", glow: "rgba(239,68,68,0.5)", text: "text-red-600", img: "/images/534418092-1459246708718984-18966.png" },
    { name: "Ajoy Sushil", role: "Backend", color: "border-blue-500", glow: "rgba(59,130,246,0.5)", text: "text-blue-600", img: "/images/600314580-122094610047185099-300.png" },
  ]

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes beam { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .glow-text { 
           background: linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6); 
           background-size: 200% auto; -webkit-background-clip: text; 
           -webkit-text-fill-color: transparent; animation: flow 3s linear infinite; 
        }
        .leader-beam::before { 
           content: ""; position: absolute; inset: -8px; 
           background: conic-gradient(from 0deg, transparent, #06b6d4, transparent 30%); 
           animation: beam 3s linear infinite; border-radius: 50%; z-index: 0;
        }
        @media (prefers-color-scheme: light) {
          .text-muted-foreground { color: #1e293b !important; opacity: 1 !important; font-weight: 700 !important; }
          .bg-black\\/20 { background: rgba(0,0,0,0.08); }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
          <Image src="/images/ag0ilsxmrnaeudvnbrkymbql5ivwt0or.png" alt="CPI" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter glow-text mb-4 uppercase leading-none">CPI CAMPUS</h1>
          <p className="text-blue-700 dark:text-blue-400 tracking-[0.5em] text-[10px] font-black uppercase">Technical Excellence Since 1962</p>
        </div>
      </section>

      {/* CAMPUS LIFE & MAP */}
      <section className="py-8 bg-black/5 dark:bg-black/20 border-y border-foreground/5">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h2 className="text-lg font-black italic text-foreground flex items-center gap-2">
               <GraduationCap className="text-blue-500 w-5 h-5" /> CAMPUS LIFE
            </h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-foreground/10 shadow-2xl bg-muted">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/CD3lTqr0sys" title="CPI Tour" allowFullScreen />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-black italic text-foreground flex items-center gap-2">
               <MapPin className="text-red-500 w-5 h-5" /> FIND US
            </h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-foreground/10 shadow-2xl bg-muted">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.663162817865!2d91.81055747596035!3d22.36913614049071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd905243a983d%3A0xc367de1c2f217ee3!2sChattogram%20Polytechnic%20Institute!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                className="w-full h-full border-0 dark:invert-[0.9] dark:hue-rotate-180" 
                allowFullScreen 
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* THE ARCHITECTS GRID */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase glow-text mb-1">The Architects</h2>
          <p className="text-muted-foreground tracking-[0.4em] text-[9px] font-bold uppercase">Engineering the digital experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6 max-w-4xl mx-auto px-4">
          {team.map((member) => (
            <div key={member.name} className="group relative flex flex-col items-center">
              <div className="relative w-36 h-36 mb-4">
                {member.isLeader && <div className="leader-beam absolute inset-0" />}
                <div className={`absolute inset-[-4px] rounded-full border-2 ${member.color} ${member.isLeader ? 'opacity-100 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'opacity-0 group-hover:opacity-100'} transition-all duration-500`} />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background bg-secondary/20 shadow-lg z-10">
                  <Image src={member.img} alt={member.name} fill className={`object-cover ${member.isLeader ? '' : 'grayscale'} group-hover:grayscale-0 transition-all duration-500`} />
                </div>
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-foreground">{member.name}</h3>
              <p className={`${member.text} text-[9px] font-black uppercase tracking-widest mt-1 py-1 px-3 rounded-full bg-foreground/10 border border-foreground/5`}>{member.role}</p>
              
              {member.isLeader && (
                <div className="mt-3 flex gap-x-2">
                  <a href="https://github.com/tarek-molla" target="_blank" style={{clipPath: 'url(#squircleClip)'}} className="w-8 h-8 bg-foreground/10 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"><Github size={14} /></a>
                  <a href="https://www.linkedin.com/in/tarek-molla-001aa3361/" target="_blank" style={{clipPath: 'url(#squircleClip)'}} className="w-8 h-8 bg-foreground/10 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"><Linkedin size={14} /></a>
                  <a href="https://www.youtube.com/@TarekHatake07" target="_blank" style={{clipPath: 'url(#squircleClip)'}} className="w-8 h-8 bg-foreground/10 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Youtube size={14} /></a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-foreground/5 bg-black/5 dark:bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 dark:text-blue-400">
                <Target size={18} />
                <h3 className="text-sm font-black uppercase italic">Our Mission</h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed uppercase font-bold">
                Empowering students with technical mastery to lead the industrial future.
              </p>
            </div>

            <div className="flex justify-center">
              <StyledCardWrapper>
                <div className="card">
                  <div className="card-inner">
                    <div className="card-front">
                      <Coffee className="coffee-icon" size={32} />
                      <p className="font-black uppercase tracking-widest text-[10px]">Support the dev</p>
                    </div>
                    <div className="card-back">
                      <p className="text-[9px] uppercase font-bold opacity-60 mb-1">Bkash / Nagad</p>
                      <p className="font-black text-lg tracking-tighter text-white">01629648980</p>
                    </div>
                  </div>
                </div>
              </StyledCardWrapper>
            </div>

            <div className="space-y-2 md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-2 text-purple-600 dark:text-purple-400">
                <Eye size={18} />
                <h3 className="text-sm font-black uppercase italic">Our Vision</h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed uppercase font-bold">
                To be the premier engineering hub for innovation and excellence.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-foreground/5 flex justify-between items-center opacity-70">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground">© 2026 ARCHITECTS TEAM</p>
            <div className="flex gap-x-2 text-foreground">
               <Github size={12} />
               <Linkedin size={12} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}