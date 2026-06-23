"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Calendar, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react"

const experiences = [
  {
    role: "Backend Lead Intern",
    company: "Singing Bird App Pvt Ltd",
    period: "Aug 2025 – Feb 2026",
    duration: "7 months",
    type: "Internship · Remote",
    color: "indigo",
    accent: "from-indigo-500 to-purple-600",
    dotColor: "bg-indigo-500",
    borderColor: "border-indigo-500/30",
    tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    summary:
      "Led backend development for a tenant and property management ecosystem — the first time I owned an entire backend architecture solo.",
    highlights: [
      "Designed and built scalable REST APIs consumed by web and mobile clients",
      "Architected authentication systems with role-based access control",
      "Engineered payment workflows and integrated third-party payment services",
      "Collaborated with cross-functional teams across design, frontend, and QA",
      "Supported production deployment and ensured high system reliability",
    ],
    stack: ["Node.js", "Express.js", "PostgreSQL", "Docker", "Git"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "To-Let Global Pvt Ltd",
    period: "Jul 2025 – Nov 2025",
    duration: "5 months",
    type: "Internship · Hybrid",
    color: "purple",
    accent: "from-purple-500 to-cyan-500",
    dotColor: "bg-purple-500",
    borderColor: "border-purple-500/30",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    summary:
      "Contributed across the full stack of a zero-brokerage property rental platform — recognized by the team for technical initiative.",
    highlights: [
      "Built and enhanced features across both frontend (React) and backend (Node.js)",
      "Implemented interactive data visualisation dashboards for property analytics",
      "Integrated third-party APIs to enrich platform functionality",
      "Improved overall UX with responsive design and performance optimisations",
      "Received commendation for strong technical contribution and proactive ownership",
    ],
    stack: ["React", "Node.js", "Express.js", "PostgreSQL", "Docker", "Git"],
  },
  {
    role: "Backend Developer Intern",
    company: "Small Fare Pvt Ltd",
    period: "Apr 2025 – Jun 2025",
    duration: "3 months",
    type: "Internship · Remote",
    color: "cyan",
    accent: "from-cyan-500 to-blue-500",
    dotColor: "bg-cyan-500",
    borderColor: "border-cyan-500/30",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    summary:
      "Developed backend services for an event booking platform, with a focus on payment gateway integrations and secure transaction flows.",
    highlights: [
      "Built and maintained APIs for event booking and ticketing flows",
      "Integrated multiple payment gateways: Razorpay, Cashfree, PhonePe, and BBPS",
      "Designed PostgreSQL schemas for secure, reliable transaction records",
      "Ensured PCI-compliant data handling across all payment workflows",
    ],
    stack: ["Node.js", "Express.js", "PostgreSQL", "Docker", "Git", "Razorpay", "Cashfree", "PhonePe"],
  },
]

const colorMap = {
  indigo: { line: "bg-indigo-500", glow: "shadow-indigo-500/20", number: "text-indigo-400" },
  purple: { line: "bg-purple-500", glow: "shadow-purple-500/20", number: "text-purple-400" },
  cyan:   { line: "bg-cyan-500",   glow: "shadow-cyan-500/20",   number: "text-cyan-400" },
}

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.05 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Reveal each card as it scrolls into view
  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible")
            cardObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    cardRefs.current.forEach((el) => el && cardObserver.observe(el))
    return () => cardObserver.disconnect()
  }, [isVisible])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`py-24 relative overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-[120px] bg-indigo-500/6 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-[100px] bg-purple-500/6 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="ladder-content">

          {/* Heading */}
          <div className={`ladder-item text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-indigo-500 block mb-3">Where I've worked</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Work <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-sm">
              3 internships · 15 months of real-world engineering across product startups
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline spine */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-cyan-500/20 hidden md:block" />

              <div className="space-y-6">
                {experiences.map((exp, i) => {
                  const c = colorMap[exp.color as keyof typeof colorMap]
                  return (
                    <div
                      key={exp.company}
                      ref={(el) => { cardRefs.current[i] = el }}
                      className="scroll-hidden md:pl-16 relative"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-3.5 top-6 w-5 h-5 rounded-full ${exp.dotColor} border-4 border-background shadow-lg ${c.glow} hidden md:flex items-center justify-center z-10`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>

                      {/* Card */}
                      <div
                        className={`group relative rounded-2xl border ${exp.borderColor} bg-card/60 backdrop-blur-sm p-6 cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:shadow-xl ${c.glow} hover:border-opacity-60`}
                        onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                      >
                        {/* Gradient accent strip */}
                        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl bg-gradient-to-b ${exp.accent} opacity-70`} />

                        {/* Header row */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
                          {/* Icon */}
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${exp.accent} p-0.5 shrink-0`}>
                            <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                              <Briefcase className="w-5 h-5 text-muted-foreground" />
                            </div>
                          </div>

                          {/* Role + company */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <h3 className="text-base font-bold">{exp.role}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${exp.tagColor}`}>
                                {exp.duration}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="font-medium text-foreground/80">{exp.company}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {exp.period}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {exp.type}
                              </span>
                            </div>
                          </div>

                          {/* Expand chevron */}
                          <div className={`w-7 h-7 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground shrink-0 transition-all duration-300 ${activeIdx === i ? "rotate-180 bg-indigo-500/10 border-indigo-500/30 text-indigo-400" : "group-hover:border-indigo-500/30"}`}>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>

                        {/* Summary (always visible) */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 pl-0 sm:pl-14">
                          {exp.summary}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 pl-0 sm:pl-14 mb-3">
                          {exp.stack.map((t) => (
                            <span key={t} className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${exp.tagColor}`}>{t}</span>
                          ))}
                        </div>

                        {/* Expandable highlights */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIdx === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                          <div className="pl-0 sm:pl-14 pt-3 border-t border-border/40">
                            <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">Key Contributions</p>
                            <ul className="space-y-2">
                              {exp.highlights.map((h) => (
                                <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Expand hint */}
                        <p className={`text-xs text-muted-foreground/50 mt-2 pl-0 sm:pl-14 transition-opacity duration-200 ${activeIdx === i ? "opacity-0" : "opacity-100"}`}>
                          Click to see key contributions →
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Timeline end marker */}
              <div className="hidden md:flex items-center gap-3 pl-16 mt-8">
                <div className="absolute left-3 w-7 h-7 rounded-full border-2 border-dashed border-indigo-500/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500/50 animate-pulse" />
                </div>
                <p className="text-xs text-muted-foreground italic">The journey continues…</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
