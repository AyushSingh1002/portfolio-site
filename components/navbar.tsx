"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

const NAV = ["home", "about", "experience", "skills", "projects", "contact"] as const

function launchLadder(id: string, cb: () => void) {
  const overlay = document.createElement("div")
  overlay.className = "ladder-transition-overlay"
  overlay.innerHTML = `<div class="ladder-transition">${Array.from({ length: 12 }, () => `<div class="ladder-bar"></div>`).join("")}</div>`
  document.body.appendChild(overlay)
  requestAnimationFrame(() => overlay.querySelector(".ladder-transition")?.classList.add("active"))
  setTimeout(cb, 480)
  setTimeout(() => {
    overlay.querySelector(".ladder-transition")?.classList.add("reverse")
    setTimeout(() => document.body.contains(overlay) && document.body.removeChild(overlay), 600)
  }, 1000)
}

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const pos = window.scrollY + 120
      for (const id of [...NAV].reverse()) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop) { setActive(id); break }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goto = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    launchLadder(id, () => el.scrollIntoView({ behavior: "smooth", block: "start" }))
    setMenuOpen(false)
  }

  if (!mounted) return null
  const isDark = theme === "dark"

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-effect shadow-lg py-3" : "py-5 bg-transparent"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => goto("home")} className="group flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tight">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">AKS</span>
              <span className="text-indigo-500 group-hover:animate-pulse">.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((s) => (
              <button
                key={s}
                onClick={() => goto(s)}
                className={`relative px-4 py-2 rounded-lg text-sm capitalize font-medium transition-all duration-300 ${
                  active === s
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {s}
                {active === s && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <Sun className={`w-4 h-4 absolute transition-all duration-500 ${isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`} />
              <Moon className={`w-4 h-4 absolute transition-all duration-500 ${!isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-16 inset-x-4 z-50 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl p-4 animate-slide-in">
            {NAV.map((s) => (
              <button
                key={s}
                onClick={() => goto(s)}
                className={`w-full text-left px-4 py-3 rounded-xl capitalize text-sm font-medium transition-all duration-200 ${
                  active === s
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}
