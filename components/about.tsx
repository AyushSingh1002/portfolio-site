"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Coffee, Code, Heart } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Code, label: "Projects Completed", value: "50+" },
    { icon: Coffee, label: "Cups of Coffee", value: "1000+" },
    { icon: Award, label: "Happy Clients", value: "25+" },
    { icon: Heart, label: "Years Experience", value: "3+" },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="container mx-auto px-6">
        <div className="ladder-content">
          <h2 className="text-3xl font-bold mb-12 text-center ladder-item">About Me</h2>

          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="md:w-1/3 flex justify-center ladder-item">
              <div className="relative">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 p-1 animate-pulse-slow">
                  <div className="w-full h-full rounded-full overflow-hidden bg-background">
                    <img src="/professional-developer-headshot.png" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500 rounded-full animate-bounce opacity-80" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse opacity-60" />
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-cyan-500 rounded-full animate-ping opacity-40" />
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              <h3 className="text-2xl font-semibold ladder-item bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Who I Am
              </h3>
              <p className="text-muted-foreground ladder-item leading-relaxed">
                I'm a passionate frontend developer with 3 years of experience building modern web applications. I
                specialize in React, Next.js, and TypeScript, and I'm dedicated to creating performant, accessible, and
                visually appealing user interfaces that make a difference.
              </p>
              <p className="text-muted-foreground ladder-item leading-relaxed">
                My journey in web development started when I built my first website in college. Since then, I've worked
                with startups and agencies to deliver high-quality digital products that solve real-world problems and
                delight users.
              </p>
              <p className="text-muted-foreground ladder-item leading-relaxed">
                When I'm not coding, you can find me hiking mountain trails, reading sci-fi novels, experimenting with
                new cooking recipes, or contributing to open-source projects that make the web a better place.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ladder-item">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={stat.label} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-bold text-indigo-500 mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
