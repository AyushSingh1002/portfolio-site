"use client"

import type React from "react"
import emailjs from "emailjs-com"
import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  emailjs
    .sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      e.currentTarget, // ✅ this will only work if attached directly to <form>
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
    )
    .then(
      () => {
        console.log("✅ Email sent successfully");
        e.currentTarget?.reset(); // ✅ safe reset
      },
      (error) => {
        console.error("❌ Failed:", error.text);
      }
    );
};




  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ayushkumar408647@gmail.com",
      href: "mailto:ayushkumar408647@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 846-791-4977",
      href: "tel:+918467914977",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Uttar Pradesh, India",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/AyushSingh1002",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ayush-kumar-singh-1b21e/",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:ayushkumar408647@gmail.com",
      color: "hover:text-red-500",
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 top-0 right-0 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-[100px] animate-pulse" />
        <div className="absolute w-80 h-80 bottom-0 left-0 rounded-full bg-gradient-to-tr from-cyan-500/10 to-teal-500/10 blur-[80px] animate-pulse" />
        <div className="absolute w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-[60px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="ladder-content">
          <div className="text-center mb-16 ladder-item">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? I'm here to help you create something extraordinary. Let's discuss your
              project and make it happen!
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form - Takes 2 columns on large screens */}
              <div className="lg:col-span-2 ladder-item">
                <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Send Message</h3>
                      <p className="text-muted-foreground">I'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h4 className="text-2xl font-bold text-green-500 mb-3">Message Sent Successfully!</h4>
                      <p className="text-muted-foreground text-lg">
                        Thank you for reaching out. I'll respond to you soon!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <Label htmlFor="name" className="text-sm font-semibold text-foreground">
        Full Name *
      </Label>
      <Input
        id="name"
        name="user_name"  // ✅ must match EmailJS template variable
        type="text"
        className="h-12 bg-background/50 border-border/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
        placeholder="John Doe"
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-semibold text-foreground">
        Email Address *
      </Label>
      <Input
        id="email"
        name="user_email"  // ✅ must match EmailJS template variable
        type="email"
        className="h-12 bg-background/50 border-border/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
        placeholder="john@example.com"
        required
      />
    </div>
  </div>
  <div className="space-y-2">
    <Label htmlFor="subject" className="text-sm font-semibold text-foreground">
      Subject
    </Label>
    <Input
      id="subject"
      name="subject"  // ✅ add subject
      type="text"
      className="h-12 bg-background/50 border-border/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
      placeholder="Project Discussion"
    />
  </div>
  <div className="space-y-2">
    <Label htmlFor="message" className="text-sm font-semibold text-foreground">
      Message *
    </Label>
    <Textarea
      id="message"
      name="message"  // ✅ must match EmailJS template variable
      rows={6}
      className="bg-background/50 border-border/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none rounded-xl"
      placeholder="Tell me about your project, timeline, and budget..."
      required
    />
  </div>
  <Button
    type="submit"
    className="w-full h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
        Sending Message...
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <Send className="w-5 h-5 mr-3" />
        Send Message
      </div>
    )}
  </Button>
</form>

                  )}
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-6 ladder-item">
                {/* Contact Information */}
                <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-6 border border-border/50 shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    Contact Info
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map((info) => {
                      const IconComponent = info.icon
                      return (
                        <a
                          key={info.label}
                          href={info.href}
                          className="flex items-center p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 group hover:scale-105"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-5 h-5 text-indigo-500" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{info.label}</div>
                            <div className="text-muted-foreground text-sm">{info.value}</div>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-6 border border-border/50 shadow-xl">
                  <h3 className="text-xl font-bold mb-6 text-center">Connect With Me</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 hover:border-indigo-500/50 transition-all duration-300 group hover:scale-105 ${social.color}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconComponent className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium text-xs">{social.label}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Availability Status */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-6 border border-green-500/20 shadow-xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse mr-3" />
                      <span className="text-green-500 font-bold">Available for Projects</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Currently accepting new freelance projects and collaborations. Let's create something amazing
                      together!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
