"use client"

import { useEffect, useRef, useState } from "react"
import {
  Code, Code2, Palette, Database, GitBranch, Package,
  Figma, Zap, Globe, Smartphone, Layers,
} from "lucide-react"

const skillGroups = [
  {
    title: "Frontend",
    color: "indigo",
    skills: [
      { name: "React",         icon: Code,      tag: "Library" },
      { name: "Next.js",       icon: Code2,     tag: "Framework" },
      { name: "TypeScript",    icon: Code2,     tag: "Language" },
      { name: "JavaScript",    icon: Code,      tag: "Language" },
      { name: "Tailwind CSS",  icon: Palette,   tag: "Styling" },
      { name: "HTML / CSS",    icon: Layers,    tag: "Core" },
    ],
  },
  {
    title: "Backend & Data",
    color: "purple",
    skills: [
      { name: "Node.js",       icon: Code2,     tag: "Runtime" },
      { name: "Express.js",    icon: Package,   tag: "Framework" },
      { name: "PostgreSQL",    icon: Database,  tag: "Database" },
      { name: "MongoDB",       icon: Database,  tag: "Database" },
      { name: "REST APIs",     icon: Globe,     tag: "Protocol" },
      { name: "Socket.io",     icon: Zap,       tag: "Real-time" },
    ],
  },
  {
    title: "Tools & Integrations",
    color: "cyan",
    skills: [
      { name: "Git & GitHub",  icon: GitBranch, tag: "Version Control" },
      { name: "Docker",        icon: Package,   tag: "DevOps" },
      { name: "Razorpay",      icon: Zap,       tag: "Payments" },
      { name: "Cashfree",      icon: Zap,       tag: "Payments" },
      { name: "Figma",         icon: Figma,     tag: "Design" },
      { name: "UI / UX",       icon: Smartphone,tag: "Design" },
    ],
  },
]

const colorMap: Record<string, { pill: string; icon: string; border: string; glow: string; dot: string }> = {
  indigo: {
    pill:   "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    icon:   "text-indigo-400",
    border: "border-indigo-500/30",
    glow:   "hover:shadow-indigo-500/20",
    dot:    "bg-indigo-500",
  },
  purple: {
    pill:   "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon:   "text-purple-400",
    border: "border-purple-500/30",
    glow:   "hover:shadow-purple-500/20",
    dot:    "bg-purple-500",
  },
  cyan: {
    pill:   "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    icon:   "text-cyan-400",
    border: "border-cyan-500/30",
    glow:   "hover:shadow-cyan-500/20",
    dot:    "bg-cyan-500",
  },
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Stagger-reveal each skill card
          let delay = 0
          skillGroups.forEach((group) => {
            group.skills.forEach((skill) => {
              setTimeout(() => {
                setRevealedCards((prev) => new Set([...prev, skill.name]))
              }, delay)
              delay += 60
            })
          })
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-24 relative overflow-hidden bg-muted/20 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Decorative */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-[100px] bg-purple-500/8 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="ladder-content">

          {/* Heading */}
          <div className={`ladder-item text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-indigo-500 block mb-3">What I use</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Skills & <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">Technologies</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              A toolkit built through real projects — from idea to production.
            </p>
          </div>

          {/* Three columns */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillGroups.map((group) => {
              const c = colorMap[group.color]
              return (
                <div
                  key={group.title}
                  className={`ladder-item p-6 rounded-2xl border ${c.border} bg-card/50 backdrop-blur-sm transition-all duration-500`}
                >
                  {/* Group header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-2 h-8 rounded-full ${c.dot}`} />
                    <h3 className="text-lg font-bold">{group.title}</h3>
                  </div>

                  {/* Skill chips — no percentages */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const Icon = skill.icon
                      const revealed = revealedCards.has(skill.name)
                      return (
                        <div
                          key={skill.name}
                          className={`group flex items-center gap-2 px-3 py-2 rounded-xl border ${c.pill} transition-all duration-300 hover:scale-105 hover:shadow-lg ${c.glow} cursor-default ${revealed ? "animate-skill-pop" : "opacity-0"}`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${c.icon} group-hover:scale-110 transition-transform`} />
                          <span className="text-xs font-medium">{skill.name}</span>
                          <span className="text-[10px] opacity-50 hidden group-hover:inline transition-all">{skill.tag}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom note */}
          <p className={`ladder-item text-center text-sm text-muted-foreground mt-10 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            Always learning — currently exploring <span className="text-indigo-400">AI integrations</span> & <span className="text-purple-400">cloud infra</span>.
          </p>

        </div>
      </div>
    </section>
  )
}
