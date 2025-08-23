"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Download, Sparkles } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [displayedName, setDisplayedName] = useState("")
  const [currentRole, setCurrentRole] = useState(0)
  const [isTypingRole, setIsTypingRole] = useState(false)
  const [displayedRole, setDisplayedRole] = useState("")

  const fullName = "Alex Johnson"
  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Mobile App Developer",
    "DevOps Engineer",
    "Data Scientist",
    "AI/ML Engineer",
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
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
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
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
    }
  }, [isVisible, currentRole])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 via-purple-500/15 via-cyan-500/10 to-transparent dark:from-indigo-500/25 dark:via-purple-500/20 dark:via-cyan-500/15" />

      <div className="absolute inset-0">
        <div className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 top-1/4 left-1/4 rounded-full bg-gradient-to-r from-indigo-500/15 to-purple-500/15 blur-[40px] animate-float" />
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bottom-1/4 right-1/4 rounded-full bg-gradient-to-r from-purple-500/15 to-cyan-500/15 blur-[40px] animate-float-delayed" />
        <div className="absolute w-24 h-24 sm:w-32 sm:h-32 top-3/4 left-1/3 rounded-full bg-gradient-to-r from-cyan-500/15 to-teal-500/15 blur-[30px] animate-float-slow" />
        <div className="absolute w-16 h-16 sm:w-20 sm:h-20 top-1/3 right-1/3 rounded-full bg-gradient-to-r from-pink-500/15 to-rose-500/15 blur-[25px] animate-pulse" />
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 top-1/2 left-1/2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-[35px] animate-float" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float-dots ${
              i % 3 === 0
                ? "w-1 h-1 bg-indigo-500/40"
                : i % 3 === 1
                  ? "w-0.5 h-0.5 bg-purple-500/30"
                  : "w-1.5 h-1.5 bg-cyan-500/20"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
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
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Download CV
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
