
"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Download, Sparkles } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [displayedName, setDisplayedName] = useState("")
  const [currentRole, setCurrentRole] = useState(0)
  const [isTypingRole, setIsTypingRole] = useState(false)
  const [displayedRole, setDisplayedRole] = useState("")
  const [dots, setDots] = useState<{ left: string; top: string; delay: string; duration: string; size: string; color: string }[]>([])

  const fullName = "Ayush Kumar Singh"
const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Enthusiast",
  "DevOps Learner",
  "Open Source Contributor",
];


  // fade-in animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // typing effect for name
  useEffect(() => {
    if (!isVisible) return
    let currentIndex = 0
    const typingTimer = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingTimer)
      }
    }, 100)
    return () => clearInterval(typingTimer)
  }, [isVisible])

  // typing effect for roles
  useEffect(() => {
    if (!isVisible) return
    const typeRole = () => {
      setIsTypingRole(true)
      const currentRoleText = roles[currentRole]
      let currentIndex = 0
      setDisplayedRole("")
      const typingTimer = setInterval(() => {
        if (currentIndex <= currentRoleText.length) {
          setDisplayedRole(currentRoleText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingTimer)
          setIsTypingRole(false)
        }
      }, 80)
      return () => clearInterval(typingTimer)
    }

    typeRole()
    const roleTimer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 4000)

    return () => clearInterval(roleTimer)
  }, [isVisible, currentRole])

  // ✅ generate random dots only on client
  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => {
      const size =
        i % 3 === 0 ? "w-1 h-1" : i % 3 === 1 ? "w-0.5 h-0.5" : "w-1.5 h-1.5"
      const color =
        i % 3 === 0
          ? "bg-indigo-500/40"
          : i % 3 === 1
          ? "bg-purple-500/30"
          : "bg-cyan-500/20"

      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${3 + Math.random() * 4}s`,
        size,
        color,
      }
    })
    setDots(generated)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* background glow blobs */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 via-purple-500/15 via-cyan-500/10 to-transparent dark:from-indigo-500/25 dark:via-purple-500/20 dark:via-cyan-500/15" />

      {/* floating dots (hydration-safe) */}
      <div className="absolute inset-0 overflow-hidden">
        {dots.map((dot, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float-dots ${dot.size} ${dot.color}`}
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
              animationDuration: dot.duration,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <div className="ladder-content">
          <div className="max-w-4xl mx-auto text-center lg:text-left">
            <div
              className={`flex items-center justify-center lg:justify-start mb-4 transition-all duration-1000 ease-out ladder-item ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Sparkles className="w-6 h-6 text-indigo-500 mr-2 animate-pulse" />
              <span className="text-indigo-500 font-medium">Welcome to my portfolio</span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 transition-all duration-1000 ease-out ladder-item ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Hi, I'm{" "}
              <span className="text-indigo-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent relative">
                {displayedName}
                <span className="animate-pulse text-indigo-500">|</span>
              </span>
            </h1>

            <h2
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 text-muted-foreground transition-all duration-1000 delay-200 ease-out ladder-item ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="inline-block transition-all duration-500 ease-in-out">
                {displayedRole}
                <span className={`animate-pulse text-indigo-500 ${isTypingRole ? "opacity-100" : "opacity-0"}`}>|</span>
              </span>
            </h2>

            <p
              className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 delay-300 ease-out ladder-item ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              I build exceptional digital experiences with modern web technologies, creating beautiful and functional
              applications that users love. Let's bring your ideas to life!
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 sm:space-x-4 sm:space-y-0 justify-center lg:justify-start transition-all duration-1000 delay-500 ease-out ladder-item ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg hover-lift hover:shadow-2xl hover:shadow-indigo-500/25 transform transition-all duration-300 ease-out text-sm sm:text-base font-medium relative overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg hover-lift transform transition-all duration-300 ease-out text-sm sm:text-base font-medium backdrop-blur-sm"
              >
                Get In Touch
              </button>

<button className="group px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-muted-foreground/30 text-muted-foreground hover:border-indigo-500 hover:text-indigo-500 rounded-lg hover-lift transform transition-all duration-300 ease-out text-sm sm:text-base font-medium flex items-center justify-center">
      <a
        href="/resume.pdf"
        download="Ayush Kumar Singh's-CV.pdf"
        className="flex items-center justify-center w-full h-full"
      >
        <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
        Download CV
      </a>
    </button>
            </div>

            <div
              className={`mt-12 sm:mt-16 flex justify-center lg:justify-start transition-all duration-1000 delay-700 ease-out ladder-item ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() => scrollToSection("about")}
                className="flex flex-col items-center text-muted-foreground hover:text-indigo-500 transition-colors duration-300 group"
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <ChevronDown className="w-6 h-6 animate-bounce group-hover:text-indigo-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
