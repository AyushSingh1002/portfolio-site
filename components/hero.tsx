"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Download, Github, Linkedin, ArrowRight } from "lucide-react"

const roles = [
  "Full Stack Developer",
  "Backend Lead",
  "Frontend Developer",
  "API & Systems Engineer",
  "Open Source Contributor",
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)
  const [displayedRole, setDisplayedRole] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [dots, setDots] = useState<{ left: string; top: string; delay: string; duration: string; size: number; color: string }[]>([])
  const [orbs, setOrbs] = useState<{ width: string; height: string; top: string; left: string; color: string; duration: string; delay: string }[]>([])

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  // Typewriter
  useEffect(() => {
    if (!isVisible) return
    const role = roles[currentRole]
    let timeout: ReturnType<typeof setTimeout>
    if (!isDeleting && displayedRole.length < role.length) {
      timeout = setTimeout(() => setDisplayedRole(role.slice(0, displayedRole.length + 1)), 80)
    } else if (!isDeleting && displayedRole.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayedRole.length > 0) {
      timeout = setTimeout(() => setDisplayedRole(displayedRole.slice(0, -1)), 40)
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false)
      setCurrentRole((p) => (p + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [isVisible, displayedRole, isDeleting, currentRole])

  // Client-only particles
  useEffect(() => {
    setDots(
      Array.from({ length: 40 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${4 + Math.random() * 5}s`,
        size: i % 3 === 0 ? 4 : i % 3 === 1 ? 2 : 6,
        color: i % 3 === 0 ? "rgba(99,102,241,0.5)" : i % 3 === 1 ? "rgba(139,92,246,0.4)" : "rgba(6,182,212,0.3)",
      }))
    )
    setOrbs([
      { width: "600px", height: "600px", top: "-10%", left: "-5%", color: "rgba(99,102,241,0.12)", duration: "18s", delay: "0s" },
      { width: "500px", height: "500px", top: "30%", left: "60%", color: "rgba(139,92,246,0.10)", duration: "22s", delay: "3s" },
      { width: "400px", height: "400px", top: "70%", left: "20%", color: "rgba(6,182,212,0.08)", duration: "15s", delay: "1s" },
    ])
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Animated gradient orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[100px] pointer-events-none"
          style={{
            width: orb.width, height: orb.height,
            top: orb.top, left: orb.left,
            background: orb.color,
            animation: `float-slow ${orb.duration} ease-in-out infinite`,
            animationDelay: orb.delay,
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: dot.left, top: dot.top,
              width: `${dot.size}px`, height: `${dot.size}px`,
              background: dot.color,
              animation: `float-dots ${dot.duration} ease-in-out infinite`,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 z-10 pt-24">
        <div className="ladder-content max-w-5xl mx-auto">

          {/* Top badge */}
          <div className={`ladder-item flex items-center gap-3 mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-indigo-400 font-medium">Available for work</span>
            </div>
          </div>

          {/* Main heading — split layout */}
          <div className={`ladder-item mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight">
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block mt-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Ayush Kumar
              </span>
              <span className="block text-foreground/90">Singh
                <span className="text-indigo-500">.</span>
              </span>
            </h1>
          </div>

          {/* Typewriter role */}
          <div className={`ladder-item flex items-center gap-3 mb-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="h-px w-10 bg-gradient-to-r from-indigo-500 to-transparent" />
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
              {displayedRole}
              <span className="inline-block w-0.5 h-6 bg-indigo-500 ml-1 align-middle animate-typing-cursor" />
            </span>
          </div>

          {/* Bio */}
          <p className={`ladder-item text-lg text-muted-foreground max-w-xl leading-relaxed mb-10 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            I craft exceptional digital experiences — turning complex ideas into
            beautiful, fast, and accessible web applications.
          </p>

          {/* CTAs */}
          <div className={`ladder-item flex flex-wrap gap-4 mb-14 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button
              onClick={() => scrollTo("projects")}
              className="group btn-interactive flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3.5 rounded-xl border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400 font-semibold text-sm backdrop-blur-sm transition-all duration-300"
            >
              Get In Touch
            </button>
            <a
              href="/resume.pdf"
              download="Ayush_Kumar_Singh_CV.pdf"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border/60 text-muted-foreground hover:text-indigo-400 hover:border-indigo-500/40 font-semibold text-sm transition-all duration-300"
            >
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              Download CV
            </a>
          </div>

          {/* Social row + stats */}
          <div className={`ladder-item flex flex-col sm:flex-row items-start sm:items-center gap-8 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-4">
              <a href="https://github.com/AyushSingh1002" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/ayush-kumar-singh-1b21e/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <div className="h-6 w-px bg-border/60" />
              <span className="text-sm text-muted-foreground">ayushkumar408647@gmail.com</span>
            </div>

            {/* Mini stats */}
            <div className="flex items-center gap-6 sm:ml-auto">
              {[["12+", "Projects"], ["3", "Internships"], ["8+", "Technologies"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{val}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-indigo-400 transition-colors duration-300 group"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-indigo-500 to-transparent group-hover:h-14 transition-all duration-500" />
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>

    </section>
  )
}
