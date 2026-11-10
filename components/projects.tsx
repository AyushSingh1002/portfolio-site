"use client"
import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, Star, Eye, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "EasyTrack",
    description:
      "AI-powered resume analyzer and job matcher built with Next.js. Upload resumes, submit job links, and get skill gap analysis, match scores, and improvement tips with a dashboard and payment integration.",
    image: "/easytrack.png",
    technologies: ["Next.js", "Playwright", "OpenAI API", "PostgreSQL", "Tailwind"],
    github: "https://github.com/AyushSingh1002/EasyTrack",
    live: "https://easy-track-v1.vercel.app",
    featured: true,
    stats: { stars: 124, views: "2.3k" },
  },
  {
    title: "Baate V-1.4",
    description:
      "Real-time chat app with messaging, file sharing, stickers, authentication, and live updates. Built using React, Node.js, and Socket.io for a smooth social experience.",
    image: "/chat-application-interface.png",
    technologies: ["React", "Node.js", "Express", "Socket.io", "MongoDB", "JWT"],
    github: "https://github.com/AyushSingh1002/Full-Stack-Chat-webApp",
    live: "https://baate01.onrender.com",
    featured: true,
    stats: { stars: 98, views: "1.9k" },
  },
  {
    title: "Thought Trail",
    description:
      "Storytelling platform for readers and writers with secure authentication, clean UI, and state management for distraction-free creative writing.",
    image: "/thoughttrails.png",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "MERN Stack"],
    github: "https://github.com/AyushSingh1002/ThoughtTrail",
    live: "https://thoughttrail-39h8.onrender.com",
    featured: false,
    stats: { stars: 76, views: "1.2k" },
  },
  {
    title: "Product Kart",
    description:
      "Full-stack e-commerce app with product browsing, cart, orders. Built on the MERN stack with Redux for smooth shopping.",
    image: "/modern-ecommerce-interface.png",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "JWT"],
    github: "https://github.com/AyushSingh1002/Product-Store",
    live: "https://product-store-three-taupe.vercel.app/",
    featured: false,
    stats: { stars: 54, views: "980" },
  },
];



export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [showAll, setShowAll] = useState(false)
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

  const filteredProjects = filter === "featured" ? projects.filter((p) => p.featured) : projects
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="container mx-auto px-6">
        <div className="ladder-content">
          <h2 className="text-3xl font-bold mb-4 text-center ladder-item">My Projects</h2>
          <p className="text-muted-foreground text-center mb-8 ladder-item">
            A collection of projects that showcase my skills and passion for development
          </p>

          <div className="flex justify-center mb-12 ladder-item">
            <div className="bg-muted rounded-lg p-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  filter === "all"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Projects ({projects.length})
              </button>
              <button
                onClick={() => setFilter("featured")}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  filter === "featured"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Featured ({projects.filter((p) => p.featured).length})
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <Card
                key={project.title}
                className={`overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl group ladder-item ${
                  project.featured ? "ring-2 ring-indigo-500/20" : ""
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {project.stats.stars}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {project.stats.views}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 hover:bg-indigo-500/10 hover:border-indigo-500 bg-transparent"
                    >
                      <a href={project.github} className="flex items-center justify-center">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 hover:bg-purple-500/10 hover:border-purple-500 bg-transparent"
                    >
                      <a href={project.live} className="flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length > 4 && (
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
                    See More Projects ({filteredProjects.length - 4} more)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
