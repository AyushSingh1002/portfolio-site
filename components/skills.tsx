"use client"

import { useEffect, useRef, useState } from "react"
import {
  Code,
  Code2,
  Type,
  Database,
  GitBranch,
  Package,
  TestTube2,
  Figma,
  Palette,
  Zap,
  Globe,
  Smartphone,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML / CSS", icon: Code, level: 95 },
      { name: "JavaScript (ES6+)", icon: Code2, level: 90 },
      { name: "React", icon: Code, level: 88 },
      { name: "Next.js", icon: Code2, level: 85 },
      { name: "Tailwind CSS", icon: Palette, level: 90 },
    ],
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Node.js", icon: Code2, level: 78 },
      { name: "Express.js", icon: Package, level: 75 },
      { name: "SQL (PostgreSQL)", icon: Database, level: 72 },
      { name: "Git & GitHub", icon: GitBranch, level: 85 },
      { name: "REST APIs", icon: Globe, level: 80 },
      { name: "Docker (Basics)", icon: Package, level: 60 },
    ],
  },
  {
    title: "Design & Extras",
    skills: [
      { name: "Figma", icon: Figma, level: 82 },
      { name: "UI / UX Basics", icon: Smartphone, level: 78 },
      { name: "Animations (GSAP / Framer)", icon: Zap, level: 70 },
    ],
  },
]

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({})
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => {
            const levels: { [key: string]: number } = {}
            skillCategories.forEach((category) => {
              category.skills.forEach((skill) => {
                levels[skill.name] = skill.level
              })
            })
            setAnimatedLevels(levels)
          }, 500)
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-20 bg-muted/50 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="container mx-auto px-6">
        <div className="ladder-content">
          <h2 className="text-3xl font-bold mb-4 text-center ladder-item">Skills & Technologies</h2>
          <p className="text-muted-foreground text-center mb-12 ladder-item">
            Here are the technologies I work with to bring ideas to life
          </p>

          <div className="space-y-12">
            {skillCategories.slice(0, showAll ? skillCategories.length : 2).map((category, categoryIndex) => (
              <div key={category.title} className="ladder-item">
                <h3 className="text-xl font-semibold mb-6 text-center text-indigo-500">{category.title}</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {category.skills.slice(0, showAll ? category.skills.length : 4).map((skill, index) => {
                    const IconComponent = skill.icon
                    const currentLevel = animatedLevels[skill.name] || 0
                    return (
                      <div
                        key={skill.name}
                        className="bg-background/50 backdrop-blur-sm rounded-lg p-3 md:p-6 border border-border/50 hover:border-indigo-500/50 transition-all duration-300 group"
                      >
                        <div className="md:hidden flex flex-col items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-4 h-4 text-indigo-500" />
                          </div>
                          <span className="text-xs mt-1 text-center font-medium truncate w-full">{skill.name}</span>
                        </div>

                        <div className="hidden md:block">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="w-5 h-5 text-indigo-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">{skill.name}</h4>
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${currentLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 ladder-item">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="group hover:bg-indigo-500/10 hover:border-indigo-500 transition-all duration-300"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  See More Skills
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
