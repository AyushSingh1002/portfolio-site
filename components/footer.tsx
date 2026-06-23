"use client"

import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp, Code2 } from "lucide-react"

const socials = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/AyushSingh1002" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-kumar-singh-1b21e/" },
  { icon: Twitter,  label: "Twitter",  href: "https://twitter.com" },
  { icon: Mail,     label: "Email",    href: "mailto:ayushkumar408647@gmail.com" },
]

const navLinks = ["home", "about", "experience", "skills", "projects", "contact"]

export function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <footer className="relative border-t border-border/60 overflow-hidden">
      {/* Subtle gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full blur-[80px] bg-indigo-500/6 pointer-events-none" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand col */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-black">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">AKS</span>
                <span className="text-indigo-500">.</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              Full Stack Developer crafting exceptional digital experiences with modern web technologies.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm text-muted-foreground hover:text-indigo-400 capitalize transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-indigo-500 group-hover:w-3 transition-all duration-300" />
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact quick info */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:ayushkumar408647@gmail.com" className="hover:text-indigo-400 transition-colors duration-200 break-all">
                  ayushkumar408647@gmail.com
                </a>
              </li>
              <li>Uttar Pradesh, India</li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Open to opportunities</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/40 gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            © {new Date().getFullYear()} Ayush Kumar Singh
            <span className="text-border">·</span>
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400 mx-0.5" /> using
            <Code2 className="w-3 h-3 text-indigo-400 mx-0.5" /> Next.js & Tailwind
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group w-9 h-9 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
