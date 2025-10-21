"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  Palette,
  Smartphone,
  Search,
  Settings,
  HeadphonesIcon,
  ExternalLink,
  Mail,
  Phone,
  Star,
  ArrowRight,
  MousePointer,
  Sparkles,
  CheckCircle,
  MessageCircle,
  Linkedin,
  Computer,
  GithubIcon,
} from "lucide-react"
import Image from "next/image"
import Logo from "@/components/logo"

export default function KylePortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bouncing, setBouncing] = useState(true)

  // Stop bouncing after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setBouncing(false), 3000)
    return () => clearTimeout(timer)
  }, [])
  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll tracking for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id])
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to send email")

      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to send message. Please try again later.")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  // Floating particles component
  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-red-400 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <FloatingParticles />

      {/* Animated background gradient */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.3) 0%, transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Sticky Navigation with glassmorphism */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-lg border-b border-red-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo className="animate-pulse" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "services", "portfolio", "testimonials", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-white/80 hover:text-red-400 transition-all duration-300 hover:scale-110 capitalize relative group"
                >
                  {section}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-red-400 transition-all duration-300 hover:rotate-180"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-red-500/20 animate-in slide-in-from-top duration-300">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {["home", "services", "portfolio", "testimonials", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block px-3 py-2 text-white/80 hover:text-red-400 transition-all duration-300 hover:translate-x-2 capitalize"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with parallax */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 ${visibleSections.includes("home") ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}
            >
              <div className="space-y-6">
                <Badge
                  className={`bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105 ${bouncing ? "animate-bounce" : ""
                    }`}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Freelance Web Developer
                </Badge>
                <h1 className="text-white leading-tight text-5xl font-light">
                  Web Developer, Video Editor & Technician in Malta – Kyle’s Digital Services.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-gradient-x">
                    No Limits.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  I build responsive, SEO-friendly websites — plus video editing, PC repairs, and custom software solutions for businesses and individuals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                >
                  Let's Build Your Site
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("portfolio")}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-red-400"
                >
                  View My Work
                </Button>
              </div>
            </div>
            <div
              className={`relative ${visibleSections.includes("home") ? "animate-in slide-in-from-right duration-1000" : "opacity-0"}`}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-200" />
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-red-400 to-red-500 rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-gradient-to-r from-red-500 to-red-600 rounded w-1/2 animate-pulse animation-delay-300" />
                      <div className="h-8 bg-gradient-to-r from-red-500 to-red-600 rounded w-full animate-pulse animation-delay-600" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-16 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded animate-pulse animation-delay-900" />
                        <div className="h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded animate-pulse animation-delay-1200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with hover animations */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 ${visibleSections.includes("services") ? "animate-in fade-in-50 slide-in-from-bottom duration-1000" : "opacity-0"}`}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105">
              Services
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive web development services tailored for entrepreneurs, professionals, and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: "Custom Design",
                desc: "Tailored to your brand identity",
                color: "red",
              },
              {
                icon: Smartphone,
                title: "Mobile-First",
                desc: "Looks great on any device",
                color: "green",
              },
              {
                icon: HeadphonesIcon,
                title: "Ongoing Support",
                desc: "For updates and maintenance",
                color: "blue",
              },
              {
                icon: Settings,
                title: "Video Editing",
                desc: "Entire video editing solutions",
                color: "blue",
              },
              {
                icon: Search,
                title: "SEO-Optimized",
                desc: "Helps you get found online",
                color: "yellow",
              },
              {
                icon: Computer,
                title: "PC repairs & upgrades",
                desc: "Repair PCs & upgrade existing systems",
                color: "red",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`border-0 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/60 transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 group cursor-pointer ${visibleSections.includes("services") ? "animate-in slide-in-from-bottom duration-1000" : "opacity-0"} ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className={`w-16 h-16 bg-${service.color}-500/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                  >
                    <service.icon
                      className={`w-8 h-8 text-${service.color}-400 group-hover:text-${service.color}-300`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with 3D hover effects */}
      <section id="portfolio" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 ${visibleSections.includes("portfolio") ? "animate-in fade-in-50 slide-in-from-bottom duration-1000" : "opacity-0"}`}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105">
              Portfolio
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Recent Projects</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Take a look at some of the websites I've built for entrepreneurs, professionals, and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Carrozza App",
                desc: "Car management platform with manufacturer database, car listings, and salesperson assignments.",
                result: "Increased car management efficiency by 70%",
                tags: ["Laravel", "PostgreSQL", "Bootstrap"],
                gradient: "from-red-400 to-red-600",
              },
              {
                title: "FitLife Studio",
                desc: "Fitness studio website with class schedules and membership signup.",
                result: "Boosted membership signups by 45%",
                tags: ["Vue.js", "CSS3", "Node.js"],
                gradient: "from-orange-400 to-orange-600",
              },
              {
                title: "Chic Boutique",
                desc: "E-commerce website for a local boutique with online shopping cart.",
                result: "Increased online sales by 50%",
                tags: ["Shopify", "JavaScript", "Stripe"],
                gradient: "from-yellow-400 to-yellow-600",
              },
              {
                title: "TechStart Solutions",
                desc: "Professional consulting website with lead generation forms.",
                result: "Generated 200% more qualified leads",
                tags: ["Next.js", "Sanity", "TypeScript"],
                gradient: "from-green-400 to-green-600",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className={`border-0 bg-black/40 backdrop-blur-lg border border-white/10 overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:-rotate-1 ${visibleSections.includes("portfolio") ? "animate-in slide-in-from-bottom duration-1000" : "opacity-0"}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} group-hover:scale-110 transition-transform duration-500`}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300">{project.desc}</p>
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{project.result}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {project.title === "Carrozza App" ? (
                    <a
                      href="https://happy-marmoset-cachia-13eeac70.koyeb.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full group/btn border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full group/btn border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with animated cards */}
      <section id="testimonials" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 ${visibleSections.includes("testimonials") ? "animate-in fade-in-50 slide-in-from-bottom duration-1000" : "opacity-0"}`}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105">
              Testimonials
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">What Clients Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't just take my word for it - here's what my clients have to say
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Anna Smith",
                role: "Wellness Coach",
                initials: "AS",
                quote:
                  "Kyle built us a sleek, fast site that boosted our bookings by 40%. Great communication and turnaround.",
                color: "red",
              },
              {
                name: "Marcus Johnson",
                role: "Restaurant Owner",
                initials: "MJ",
                quote:
                  "Our new website is stunning and functional. Online orders increased by 65% in the first month. Highly recommend Kyle!",
                color: "orange",
              },
              {
                name: "Sarah Chen",
                role: "E-commerce Entrepreneur",
                initials: "SC",
                quote:
                  "Kyle's attention to detail is incredible. Our e-commerce site looks amazing and works flawlessly. Sales increased by 50% since launch!",
                color: "yellow",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`border-0 bg-black/40 backdrop-blur-lg border border-white/10 group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 ${visibleSections.includes("testimonials") ? "animate-in slide-in-from-bottom duration-1000" : "opacity-0"}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 space-y-6">
                  <div className="flex text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current transition-all duration-300 hover:scale-125"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 italic group-hover:text-gray-200 transition-colors">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-${testimonial.color}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                    >
                      <span className={`text-${testimonial.color}-300 font-semibold`}>{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-red-300 transition-colors">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with interactive form */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-4 mb-16 ${visibleSections.includes("contact") ? "animate-in fade-in-50 slide-in-from-bottom duration-1000" : "opacity-0"}`}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105">
              Contact
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Let's Create Something Great Together</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to take your business online? Get in touch and let's discuss your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div
              className={`space-y-8 ${visibleSections.includes("contact") ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}
            >
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    value: "kyle@webdev.com",
                    color: "red",
                    href: "mailto:kyle@webdev.com",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    value: "+356 79264233",
                    color: "orange",
                    href: "tel:+35679264233"
                  },
                  {
                    icon: MessageCircle,
                    title: "Messenger",
                    value: "Chat on Messenger",
                    color: "blue",
                    href: "https://m.me/@Kyle.Cachia",
                  },
                  {
                    icon: MessageCircle,
                    title: "WhatsApp",
                    value: "Message on WhatsApp",
                    color: "green",
                    href: "https://wa.me/35679264233",
                  },
                  {
                    icon: Linkedin,
                    title: "LinkedIn",
                    value: "Connect on LinkedIn",
                    color: "blue",
                    href: "https://www.linkedin.com/in/kyle-cachia-41bbb8252/",
                  },
                  {
                    icon: GithubIcon,
                    title: "GitHub",
                    value: "GitHub",
                    color: "gray",
                    href: "https://www.github.com/Cachia36",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4 group cursor-pointer">
                    <div
                      className={`w-12 h-12 bg-${contact.color}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                    >
                      <contact.icon className={`w-6 h-6 text-${contact.color}-400`} />
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-red-300 transition-colors">
                        {contact.title}
                      </p>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 group-hover:text-gray-200 transition-colors hover:underline"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card
              className={`border-0 bg-black/40 backdrop-blur-lg border border-white/10 ${visibleSections.includes("contact") ? "animate-in slide-in-from-right duration-1000" : "opacity-0"}`}
            >
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="text-center space-y-4 py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
                    <h3 className="text-2xl font-semibold text-white">Thanks, I'll be in touch soon!</h3>
                    <p className="text-gray-300">Your message has been sent successfully.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20 transition-all duration-300 hover:bg-black/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20 transition-all duration-300 hover:bg-black/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        rows={4}
                        required
                        className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20 transition-all duration-300 hover:bg-black/30"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group"
                    >
                      Send Message
                      <MousePointer className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer with animated elements */}
      <footer className="bg-black/80 backdrop-blur-lg border-t border-red-500/20 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Logo size="lg" />
            <p className="text-gray-400">
              Freelance Web Developer specializing in custom websites for entrepreneurs, professionals, and businesses
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6">
              <a
                href="https://m.me/@Kyle.Cachia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 group"
                title="Message on Messenger"
              >
                <MessageCircle className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              </a>
              <a
                href="https://wa.me/35679264233"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-all duration-300 hover:scale-110 group"
                title="Message on WhatsApp"
              >
                <Phone className="w-5 h-5 text-green-400 group-hover:text-green-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/kyle-cachia-41bbb8252/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/30 transition-all duration-300 hover:scale-110 group"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-500 group-hover:text-blue-400" />
              </a>
            </div>

            <div className="border-t border-red-500/20 pt-8">
              <p className="text-gray-500">© {new Date().getFullYear()} Kyle. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
