"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { GraduationCap, Calendar, Award, Building2, ArrowRight } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LoadingScreen from "@/components/ui/loading-screen"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const quickAccessCards = [
    { title: "Departments", description: "Technical units", icon: Building2, href: "/departments" },
    { title: "Admission", description: "Apply online", icon: GraduationCap, href: "/admission" },
    { title: "Notices", description: "Schedules", icon: Calendar, href: "/notices" },
    { title: "Results", description: "Check results", icon: Award, href: "/results" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen w-full transition-colors duration-500">
      
      {/* COMPACT HERO */}
      <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full animate-zoom">
            <Image
              src="/images/ag0ilsybapnq-cq4xlc94ykyl7vw6eu9.png"
              alt="CPI Campus"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="animate-reveal opacity-0">
            <span className="inline-block text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
              Est. 1962 • Technical Excellence
            </span>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Chittagong Polytechnic <br className="hidden md:block" /> Institute
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 animate-reveal opacity-0 [animation-delay:400ms]">
              {/* UPGRADED APPLY NOW BUTTON */}
              <Link href="/admission">
                <StyledWrapper>
                  <button className="button">
                    Apply Now
                    <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                      <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd" />
                    </svg>
                  </button>
                </StyledWrapper>
              </Link>

              <Button asChild variant="outline" size="default" className="bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20 rounded-full px-8 h-[46px] text-base font-bold shadow-lg transition-all hover:scale-105">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT CARDS */}
      <section ref={sectionRef} className="py-16 px-4 bg-background relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {quickAccessCards.map((card, idx) => (
              <Link 
                key={card.title} 
                href={card.href} 
                className={`group transition-all duration-1000 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <Card className="h-full border-card-border bg-card-gradient hover:-translate-y-2 hover:shadow-bg-glow hover:border-blue-500/40 transition-all duration-500">
                  <CardHeader className="p-4 md:p-6 text-center flex flex-col items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-500  animate-float">
                      <card.icon className="w-6 h-6 md:w-7 md:h-7 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <CardTitle className="text-lg md:text-xl font-bold text-foreground transition-colors group-hover:text-blue-500">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-foreground/60 text-xs md:text-sm leading-tight hidden sm:block">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.6rem;
    padding-inline: 1.5rem;
    background-color: rgb(0 107 179);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffff;
    gap: 10px;
    font-weight: bold;
    border: 3px solid #ffffff4d;
    outline: none;
    overflow: hidden;
    font-size: 16px;
  }

  .icon {
    width: 22px;
    height: 22px;
    transition: all 0.3s ease-in-out;
  }

  .button:hover {
    transform: scale(1.05);
    border-color: #fff9;
  }

  .button:hover .icon {
    transform: translate(4px);
  }

  .button:hover::before {
    animation: shine 1.5s ease-out infinite;
  }

  .button::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }

  @keyframes shine {
    0% {
      left: -100px;
    }
    60% {
      left: 100%;
    }
    to {
      left: 100%;
    }
  }
`;