"use client"

import type React from "react"
import emailjs from "emailjs-com"
import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Twitter, Mail, MapPin, Send, CheckCircle, ArrowUpRight } from "lucide-react"

const socials = [
  { icon: Github,   label: "GitHub",   sub: "AyushSingh1002",       href: "https://github.com/AyushSingh1002", color: "hover:border-gray-400 hover:text-gray-300" },
  { icon: Linkedin, label: "LinkedIn", sub: "Connect with me",       href: "https://www.linkedin.com/in/ayush-kumar-singh-1b21e/", color: "hover:border-blue-400 hover:text-blue-400" },
  { icon: Twitter,  label: "Twitter",  sub: "@ayush_dev",            href: "https://twitter.com", color: "hover:border-sky-400 hover:text-sky-400" },
  { icon: Mail,     label: "Email",    sub: "ayushkumar408647@gmail.com", href: "mailto:ayushkumar408647@gmail.com", color: "hover:border-indigo-400 hover:text-indigo-400" },
]

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); observer.unobserve(e.target) } },
      { threshold: 0.05 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      console.log("Sending email...")
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!,
      )
      console.log("Email sent successfully!")
      
      setSent(true)
      ;(e.target as HTMLFormElement).reset()
    } catch(err) {
      console.error("Error sending email:", err)
      setError("Couldn't send message. Please email me directly at ayushkumar408647@gmail.com")
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-border/60 bg-background/50 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all duration-300"

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-24 relative overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] bg-indigo-500/8 pointer-events-none animate-float" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-purple-500/8 pointer-events-none animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[80px] bg-cyan-500/5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="ladder-content">

          {/* Header */}
          <div className={`ladder-item text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-indigo-500 block mb-3">Let's connect</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Work <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Together</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Have a project in mind, or just want to say hi? I'm always open to new ideas and collaborations.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

            {/* Left sidebar */}
            <div className="lg:col-span-2 space-y-6">

              {/* Social cards */}
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, sub, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ladder-item group p-4 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${color}`}
                  >
                    <Icon className="w-5 h-5 mb-3 transition-colors" />
                    <div className="text-sm font-semibold">{label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">{sub}</div>
                    <ArrowUpRight className="w-3 h-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              {/* Quick contact info */}
              <div className="ladder-item p-5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">Email</p>
                    <a href="mailto:ayushkumar408647@gmail.com" className="text-sm hover:text-indigo-400 transition-colors break-all">
                      ayushkumar408647@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">Location</p>
                    <p className="text-sm">Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>

              {/* Availability badge */}
              <div className="ladder-item p-4 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-semibold text-green-400">Available for Projects</span>
                </div>
                <p className="text-xs text-muted-foreground">Open to freelance work and collaborations. Usually reply within 24 hours.</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 ladder-item">
              <div className="p-8 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-xl shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Send a Message</h3>
                    <p className="text-xs text-muted-foreground">I'll respond within 24 hours</p>
                  </div>
                </div>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold">Message sent!</h4>
                    <p className="text-muted-foreground text-sm">Thanks for reaching out — I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Full Name *</label>
                        <input name="user_name" type="text" required placeholder="Jane Smith" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Email *</label>
                        <input name="user_email" type="email" required placeholder="jane@example.com" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Subject</label>
                      <input name="subject" type="text" placeholder="Project Discussion" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Message *</label>
                      <textarea name="message" required rows={5} placeholder="Tell me about your project, timeline, and budget..." className={`${inputCls} resize-none`} />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-interactive flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-indigo-500/40 transition-shadow"
                    >
                      {submitting ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                      ) : (
                        <><Send className="w-4 h-4" />Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
