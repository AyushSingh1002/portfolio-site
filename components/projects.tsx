"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, ArrowUpRight, Star, Eye } from "lucide-react"

const projects = [
  {
    title: "EasyTrack",
    tagline: "AI Resume Analyser & Job Matcher",
    description:
      "Upload a resume, submit a job URL — get skill-gap analysis, match scores, and improvement tips. Powered by OpenAI with a dashboard and payment integration.",
    image: "/easytrack.png",
    technologies: ["Next.js", "Playwright", "OpenAI API", "PostgreSQL", "Tailwind"],
    github: "https://github.com/AyushSingh1002/EasyTrack",
    live: "https://portfolio-site-three-blond.vercel.app",
    featured: true,
    accent: "from-indigo-500 to-purple-600",
    stats: { stars: 124, views: "2.3k" },
  },
  {
    title: "Baate V-1.4",
    tagline: "Real-time Chat Application",
    description:
      "Messaging, file sharing, stickers, and live updates via Socket.io. Full authentication with JWT and a polished social-first experience.",
    image: "/chat-application-interface.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
    github: "https://github.com/AyushSingh1002/Full-Stack-Chat-webApp",
    live: "https://baate01.onrender.com",
    featured: true,
    accent: "from-purple-500 to-cyan-500",
    stats: { stars: 98, views: "1.9k" },
  },
  {
    title: "Thought Trail",
    tagline: "Creative Storytelling Platform",
    description:
      "Distraction-free platform for readers and writers. Clean UI, secure auth, and smooth state management built on the MERN stack.",
    image: "/thoughttrails.png",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/AyushSingh1002/ThoughtTrail",
    live: "https://thoughttrail-39h8.onrender.com",
    featured: false,
    accent: "from-cyan-500 to-indigo-500",
    stats: { stars: 76, views: "1.2k" },
  },
  {
    title: "Product Kart",
    tagline: "Full-Stack E-Commerce App",
    description:
      "Product browsing, cart, and order management with Redux for predictable state. Full MERN stack with JWT authentication.",
    image: "/modern-ecommerce-interface.png",
    technologies: ["React", "Express", "MongoDB", "Redux", "JWT"],
    github: "https://github.com/AyushSingh1002/Product-Store",
    live: "https://product-store-three-taupe.vercel.app/",
    featured: false,
    accent: "from-orange-500 to-pink-500",
    stats: { stars: 54, views: "980" },
  },
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [hovered, setHovered] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target) }
      },
      { threshold: 0.05 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const shown = filter === "featured" ? projects.filter((p) => p.featured) : projects

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-24 relative overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Deco */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="ladder-content">

          {/* Header */}
          <div className={`ladder-item text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-indigo-500 block mb-3">What I've built</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              Selected <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>

            {/* Filter pills */}
            <div className="inline-flex items-center p-1 rounded-xl bg-muted/50 border border-border/60">
              {(["all", "featured"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 ${
                    filter === f
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "all" ? `All (${projects.length})` : `Featured (${projects.filter((p) => p.featured).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Featured — large 2-col */}
          {filter === "all" && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {projects.filter((p) => p.featured).map((project) => (
                <div
                  key={project.title}
                  className="ladder-item group relative rounded-2xl overflow-hidden border border-border/60 bg-card/50 card-shine transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
                  onMouseEnter={() => setHovered(project.title)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.accent} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                    {/* Hover overlay buttons */}
                    <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${hovered === project.title ? "opacity-100" : "opacity-0"}`}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm text-white text-sm font-medium hover:bg-indigo-600 transition-colors">
                        <Github className="w-4 h-4" /> Code
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 text-black text-sm font-medium hover:bg-white transition-colors">
                        <ArrowUpRight className="w-4 h-4" /> Live
                      </a>
                    </div>

                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium border border-white/20">
                      ⭐ Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold">{project.title}</h3>
                        <p className="text-xs text-indigo-400 font-medium">{project.tagline}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3" />{project.stats.stars}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{project.stats.views}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All / smaller cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
            {(filter === "featured" ? shown : shown.filter((p) => !p.featured)).map((project) => (
              <div
                key={project.title}
                className="ladder-item group flex gap-4 p-5 rounded-2xl border border-border/60 bg-card/50 card-shine transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-30`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-bold text-sm">{project.title}</h3>
                      <p className="text-xs text-indigo-400 mb-1">{project.tagline}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2 shrink-0">
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-indigo-400 transition-colors">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-indigo-400 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{t}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer link */}
          <div className={`ladder-item text-center mt-10 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <a href="https://github.com/AyushSingh1002" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-indigo-400 transition-colors duration-300">
              View all repositories on GitHub
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
