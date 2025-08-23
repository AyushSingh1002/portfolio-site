"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    content:
      "Alex delivered an exceptional user interface that exceeded our expectations. His attention to detail and modern design approach really made our product stand out.",
    rating: 5,
    avatar: "/placeholder.svg?key=avatar1",
  },
  {
    name: "Michael Rodriguez",
    role: "Startup Founder",
    content:
      "Working with Alex was a game-changer for our startup. He transformed our ideas into a beautiful, functional web application that our users absolutely love.",
    rating: 5,
    avatar: "/placeholder.svg?key=avatar2",
  },
  {
    name: "Emily Johnson",
    role: "Marketing Director",
    content:
      "Alex's expertise in frontend development helped us create a landing page that significantly improved our conversion rates. Highly recommended!",
    rating: 5,
    avatar: "/placeholder.svg?key=avatar3",
  },
]

export function Testimonials() {
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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="container mx-auto px-6">
        <div className="ladder-content">
          <h2 className="text-3xl font-bold mb-4 text-center ladder-item">What Clients Say</h2>
          <p className="text-muted-foreground text-center mb-12 ladder-item max-w-2xl mx-auto">
            Don't just take my word for it. Here's what some of my clients have to say about working with me.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="ladder-item hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-indigo-500/30 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gradient-to-r from-indigo-500 to-purple-500 p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-background">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
