"use client"

import { Heart, ArrowUp, Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/AyushSingh1002", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-kumar-singh-1b21e/", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:ayushkumar408647@gmail.com", label: "Email" },
  ]

  return (
    <footer className="relative py-12 border-t bg-muted/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Ayush Kumar Singh
            </h3>
            <p className="text-sm text-muted-foreground">Full Stack Developer & UI/UX Designer</p>
          </div>

          <div className="flex justify-center space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-indigo-500/10 hover:text-indigo-500 transition-all duration-300 hover:scale-110"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <IconComponent className="w-5 h-5" />
                  </a>
                </Button>
              )
            })}
          </div>

          <div className="text-center md:text-right">
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              className="hover:bg-indigo-500/10 hover:text-indigo-500 transition-all duration-300 group"
            >
              <ArrowUp className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Back to Top
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            © 2025 Ayush Kumar Singh. Made with{" "}
            <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" fill="currentColor" />
            and lots of coffee
          </p>
          <p className="text-xs text-muted-foreground mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
