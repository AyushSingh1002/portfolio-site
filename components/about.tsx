"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Coffee, Award, Heart, MapPin, Mail, ExternalLink } from "lucide-react"

const stats = [
  { icon: Code,   value: "11+",  label: "Projects Built",  color: "from-indigo-500 to-purple-500" },
  { icon: Coffee, value: "500+", label: "Cups of Coffee",  color: "from-purple-500 to-pink-500" },
  { icon: Award,  value: "12+",   label: "Technologies",    color: "from-cyan-500 to-blue-500" },
  { icon: Heart,  value: "3",    label: "Internships",      color: "from-orange-500 to-red-500" },
]

const interests = ["Java & Next.js", "System Design", "Anime & Storytelling", "Digital Art", "Gym & Fitness", "Open Source"]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState([0, 0, 0, 0])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate counters
          setTimeout(() => {
            const targets = [11, 500, 12, 3]
            targets.forEach((target, i) => {
              let current = 0
              const step = target / 40
              const interval = setInterval(() => {
                current = Math.min(current + step, target)
                setCounters((prev) => {
                  const next = [...prev]
                  next[i] = Math.floor(current)
                  return next
                })
                if (current >= target) clearInterval(interval)
              }, 30)
            })
          }, 400)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">

      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] bg-purple-500/8 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] bg-indigo-500/8 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="ladder-content">

          {/* Section heading */}
          <div className={`ladder-item text-center mb-16 transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-indigo-500 block mb-3">Get to know me</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              About <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Me</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — profile + info */}
            <div className={`ladder-item transition-all duration-800 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>

              {/* Profile card */}
              <div className="relative mb-8">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-0.5 animate-pulse-slow">
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-background">
                        <img src="/professional-developer-headshot.jpg" alt="Ayush" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    {/* Orbit dots */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 animate-bounce opacity-80" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-purple-500 animate-pulse opacity-60" />
                  </div>

                  {/* Name + links */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold mb-1">Ayush Kumar Singh</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-400" />Uttar Pradesh, India</span>
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-indigo-400" />ayushkumar408647@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-green-400 font-medium">Available for projects</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio text */}
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  I'm a motivated full-stack developer with a strong focus on frontend technologies —
                  React, Next.js, and Tailwind CSS. I turn complex ideas into intuitive,
                  responsive, and visually appealing interfaces.
                </p>
                <p>
                  My journey started with small experiments that grew into complete applications.
                  Along the way I've learned that clean code and great design aren't opposites —
                  they reinforce each other.
                </p>
                <p>
                  Beyond code, I'm drawn to design, digital art, and anime storytelling.
                  I enjoy the gym, learning new skills, and contributing to open-source projects that matter.
                </p>
              </div>

              {/* Interests */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Interests & Hobbies</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((item) => (
                    <span key={item} className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors duration-200 cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — animated stats grid */}
            <div className={`ladder-item transition-all duration-800 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="glow-card card-shine group p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-0.5 mb-4`}>
                        <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                          <Icon className="w-5 h-5 text-indigo-400" />
                        </div>
                      </div>
                      <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 animate-count-up`} style={{ animationDelay: `${i * 100}ms` }}>
                        {counters[i]}{stat.value.includes("+") ? "+" : ""}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Tech currently using */}
              <div className="p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Currently Working With</p>
                <div className="grid grid-cols-3 gap-2">
                  {["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Figma"].map((tech) => (
                    <div key={tech} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
