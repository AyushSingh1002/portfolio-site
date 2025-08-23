"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    setMounted(true)

    // Navbar scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const overlay = document.createElement("div")
      overlay.className = "ladder-transition-overlay"
      overlay.innerHTML = `
        <div class="ladder-transition">
          ${Array.from(
            { length: 12 },
            (_, i) => `<div class="ladder-bar" style="animation-delay: ${i * 40}ms"></div>`,
          ).join("")}
        </div>
      `
      document.body.appendChild(overlay)

      // Start ladder animation
      requestAnimationFrame(() => {
        const transition = overlay.querySelector(".ladder-transition")
        if (transition) {
          transition.classList.add("active")
        }
      })

      // Scroll to section and trigger content ladder animation
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })

        const sectionContent = element.querySelector(".ladder-content")
        if (sectionContent) {
          sectionContent.classList.add("ladder-animate")
        }
      }, 480)

      // Reverse animation and cleanup
      setTimeout(() => {
        const transition = overlay.querySelector(".ladder-transition")
        if (transition) {
          transition.classList.add("reverse")
          setTimeout(() => {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay)
            }
          }, 600)
        }
      }, 1000)
    }
    setIsMobileMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-4 ${
          isScrolled ? "glass-effect shadow-lg backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-bold text-indigo-500 hover:scale-110 transition-transform duration-300 ease-out"
          >
            Portfolio
          </button>

          <div className="hidden lg:flex space-x-8">
            {["home", "about", "skills", "projects", "contact"].map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link transition-all duration-300 ease-out capitalize relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:scale-105 animate-fade-in-up ${
                  activeSection === section
                    ? "text-indigo-500 after:w-full"
                    : "text-foreground/70 hover:text-indigo-500 after:w-0 hover:after:w-full"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-all duration-300 ease-out hover:scale-110 relative overflow-hidden group"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <Sun
                  className={`w-5 h-5 absolute transition-all duration-500 ease-in-out ${
                    theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
                  }`}
                />
                <Moon
                  className={`w-5 h-5 absolute transition-all duration-500 ease-in-out ${
                    theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:scale-110 transition-transform duration-300 ease-out"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-20 right-4 left-4 bg-card border rounded-lg shadow-lg p-6 animate-slide-in">
            <div className="flex flex-col space-y-4">
              {["home", "about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-left py-3 px-4 text-foreground hover:text-indigo-500 hover:bg-accent rounded-lg transition-all duration-300 ease-out capitalize text-lg"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
