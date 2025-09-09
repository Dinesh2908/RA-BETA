"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Quote, ExternalLink, Shield, CheckCircle, Users, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import PageLayout from "@/components/page-layout"
import HeroSection from "@/components/hero-section"
import CTASection from "@/components/cta-section"
import { useApp } from "@/contexts/app-context"

// CSV parsing utility
const parseCSV = (csvText: string) => {
  const lines = csvText.trim().split('\n')
  const headers = lines[0].split(',')
  const data = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    if (values.length >= headers.length) {
      const row: any = {}
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || ''
      })
      data.push(row)
    }
  }
  
  return data
}

// Function to extract link from markdown format
const extractLink = (postLink: string) => {
  const match = postLink.match(/\[.*?\]\((.*?)\)/)
  return match ? match[1] : postLink
}

export default function StoriesPage() {
  const router = useRouter()
  const { userType, setUserType } = useApp()
  const [isRow1Paused, setIsRow1Paused] = useState(false)
  const [isRow2Paused, setIsRow2Paused] = useState(false)
  const [selectedSolution, setSelectedSolution] = useState(0)
  const [tenantData, setTenantData] = useState<any[]>([])
  const [landlordData, setLandlordData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Load CSV data
  const loadCSVData = async () => {
    try {
      setIsLoading(true)
      
      // Load tenant data
      const tenantResponse = await fetch('/tenant_problems.csv')
      const tenantCSV = await tenantResponse.text()
      const parsedTenantData = parseCSV(tenantCSV)
      
      // Load landlord data
      const landlordResponse = await fetch('/landlord_problems.csv')
      const landlordCSV = await landlordResponse.text()
      const parsedLandlordData = parseCSV(landlordCSV)
      
      setTenantData(parsedTenantData)
      setLandlordData(parsedLandlordData)
    } catch (error) {
      console.error('Error loading CSV data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    loadCSVData()
  }, [])

  // Transform CSV data to testimonial format
  const transformToTestimonials = (data: any[]) => {
    return data.map((row, index) => ({
      id: index + 1,
      text: row.snippet || '',
      name: row.issue_type || 'Issue',
      role: `${row.city} • ${row.platform}`,
      link: extractLink(row.post_link || ''),
      issueType: row.bucket || 'General'
    }))
  }

  // Get current testimonials based on user type
  const testimonials = userType === "tenant" 
    ? transformToTestimonials(tenantData)
    : transformToTestimonials(landlordData)

  // Split testimonials into two rows
  const row1Testimonials = testimonials.slice(0, Math.ceil(testimonials.length / 2))
  const row2Testimonials = testimonials.slice(Math.ceil(testimonials.length / 2))

  // Scrolling animation effect
  useEffect(() => {
    const animateRow = (rowRef: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', isPaused: boolean) => {
      if (!rowRef.current || isPaused) return

      const row = rowRef.current
      const scrollAmount = 1
      const maxScroll = row.scrollWidth - row.clientWidth

      if (direction === 'left') {
        row.scrollLeft += scrollAmount
        if (row.scrollLeft >= maxScroll) {
          row.scrollLeft = 0
        }
      } else {
        row.scrollLeft -= scrollAmount
        if (row.scrollLeft <= 0) {
          row.scrollLeft = maxScroll
        }
      }
    }

    const interval1 = setInterval(() => {
      animateRow(row1Ref, 'left', isRow1Paused)
    }, 20)

    const interval2 = setInterval(() => {
      animateRow(row2Ref, 'right', isRow2Paused)
    }, 20)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [isRow1Paused, isRow2Paused])

  const handleCardClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  // Tenant solutions data
  const tenantSolutions = [
    {
      id: 0,
      title: "Clear Documentation",
      description: "Time-stamped agreements and condition reports eliminate confusion and disputes",
      icon: Shield,
      badge: "TRANSPARENCY",
      mainTitle: "Documentation-Driven Trust",
      mainDescription: "Revolutionizing rental agreements—clear, time-stamped, and dispute-free documentation that protects both parties."
    },
    {
      id: 1,
      title: "Background Verification",
      description: "Thorough checks ensure both parties can trust each other from day one",
      icon: CheckCircle,
      badge: "VERIFICATION",
      mainTitle: "Verified & Secure",
      mainDescription: "Building trust through comprehensive background checks and identity verification for safe, reliable renting experiences."
    },
    {
      id: 2,
      title: "WhatsApp Support",
      description: "Quick resolution of issues through dedicated support channels",
      icon: Users,
      badge: "SUPPORT",
      mainTitle: "Always Available",
      mainDescription: "24/7 WhatsApp support ensures quick resolution of issues and peace of mind for all rental transactions."
    },
    {
      id: 3,
      title: "Transparent Process",
      description: "No hidden clauses or surprises - everything is clear upfront",
      icon: Target,
      badge: "CLARITY",
      mainTitle: "No Surprises",
      mainDescription: "Complete transparency in every step—from initial agreement to final settlement, with no hidden fees or clauses."
    }
  ]

  // Landlord solutions data
  const landlordSolutions = [
    {
      id: 0,
      title: "Tenant Screening",
      description: "Comprehensive background checks and verification for reliable tenants",
      icon: Shield,
      badge: "SCREENING",
      mainTitle: "Quality Tenant Selection",
      mainDescription: "Advanced screening processes ensure you get verified, reliable tenants who respect your property and agreements."
    },
    {
      id: 1,
      title: "Legal Protection",
      description: "Robust legal framework and documentation to protect your interests",
      icon: CheckCircle,
      badge: "PROTECTION",
      mainTitle: "Legal Security",
      mainDescription: "Comprehensive legal protection with clear documentation, dispute resolution, and property rights enforcement."
    },
    {
      id: 2,
      title: "Property Management",
      description: "Streamlined management tools for efficient property operations",
      icon: Users,
      badge: "MANAGEMENT",
      mainTitle: "Efficient Operations",
      mainDescription: "Professional property management tools that handle tenant communication, maintenance, and administrative tasks."
    },
    {
      id: 3,
      title: "Market Insights",
      description: "Data-driven insights for optimal pricing and tenant matching",
      icon: Target,
      badge: "INSIGHTS",
      mainTitle: "Smart Decisions",
      mainDescription: "Market intelligence and analytics help you make informed decisions about pricing, tenant selection, and property improvements."
    }
  ]

  // Get current solutions based on user type
  const solutions = userType === "tenant" ? tenantSolutions : landlordSolutions

  // Reset selected solution when user type changes
  useEffect(() => {
    setSelectedSolution(0)
  }, [userType])

  // Show loading state while CSV data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FBF8F3" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading real stories...</p>
        </div>
      </div>
    )
  }

  return (
    <PageLayout
      showBackButton={true}
      showSolutionsButton={true}
      showStickySwitch={true}
      onScrollToSection={scrollToSection}
      onScrollToTop={scrollToTop}
    >
      {/* Hero Section */}
      <HeroSection
        title={userType === "tenant" ? (
          <>
            Real
            <br />
            problems
            <br />
            <span style={{ color: "#14B8A6" }}>tenants</span>
            <br />
            face
          </>
        ) : (
          <>
            Real
            <br />
            challenges
            <br />
            <span style={{ color: "#14B8A6" }}>landlords</span>
            <br />
            face
          </>
        )}
        description={userType === "tenant" 
          ? "See the real issues tenants face in the rental market and how RentAid solves them."
          : "See the real challenges landlords face in property management and how RentAid helps."
        }
        badge="Real Stories"
        platformText={{
          title: "REAL PEOPLE",
          subtitle: "REAL",
          description: "RESULTS"
        }}
        image="/diverse-group-two.png"
        imageAlt="Happy users"
        onJumboCTAClick={() => scrollToSection('testimonials-section')}
      />

      {/* Success Stories Section */}
      <section id="testimonials-section" className="px-4 md:px-12 py-16 relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              {userType === "tenant" ? "REAL TENANTS" : "REAL LANDLORDS"}
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              {userType === "tenant" ? "FACING REAL PROBLEMS" : "FACING REAL CHALLENGES"}
            </p>
          </div>

          {/* Scrolling Testimonial Rows */}
          <div className="space-y-8">
            {/* First Row - Scrolling Left */}
            <div 
              ref={row1Ref}
              className="flex gap-6 overflow-x-hidden whitespace-nowrap"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseEnter={() => setIsRow1Paused(true)}
              onMouseLeave={() => setIsRow1Paused(false)}
            >
              {/* Duplicate cards for seamless scrolling */}
              {[...row1Testimonials, ...row1Testimonials].map((testimonial, index) => (
                <Card
                  key={`row1-${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-80 h-64 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-800 border-slate-700 cursor-pointer"
                  onClick={() => handleCardClick(testimonial.link)}
                >
                  <div className="space-y-4 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start">
                      <Quote className="w-6 h-6 text-emerald-400" />
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-white text-sm leading-relaxed flex-grow break-words overflow-hidden" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      "{testimonial.text}"
                    </p>
                    
                    {/* User Info */}
                    <div className="pt-2">
                      <h4 className="text-white font-bold text-sm mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-slate-400 text-xs mb-3">
                        {testimonial.role}
                      </p>
                      
                      {/* Issue Type Badge */}
                      <span className="inline-block px-2 py-1 text-xs bg-emerald-900 text-emerald-200 rounded-full">
                        {testimonial.issueType}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Second Row - Scrolling Right */}
            <div 
              ref={row2Ref}
              className="flex gap-6 overflow-x-hidden whitespace-nowrap"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseEnter={() => setIsRow2Paused(true)}
              onMouseLeave={() => setIsRow2Paused(false)}
            >
              {/* Duplicate cards for seamless scrolling */}
              {[...row2Testimonials, ...row2Testimonials].map((testimonial, index) => (
                <Card
                  key={`row2-${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-80 h-64 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-800 border-slate-700 cursor-pointer"
                  onClick={() => handleCardClick(testimonial.link)}
                >
                  <div className="space-y-4 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start">
                      <Quote className="w-6 h-6 text-emerald-400" />
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-white text-sm leading-relaxed flex-grow break-words overflow-hidden" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      "{testimonial.text}"
                    </p>
                    
                    {/* User Info */}
                    <div className="pt-2">
                      <h4 className="text-white font-bold text-sm mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-slate-400 text-xs mb-3">
                        {testimonial.role}
                      </p>
                      
                      {/* Issue Type Badge */}
                      <span className="inline-block px-2 py-1 text-xs bg-emerald-900 text-emerald-200 rounded-full">
                        {testimonial.issueType}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions-section" className="px-4 md:px-12 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Section - Dynamic Content */}
            <div className="lg:col-span-5 space-y-6">
              <Badge className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100">
                {solutions[selectedSolution].badge}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {solutions[selectedSolution].mainTitle}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {solutions[selectedSolution].mainDescription}
              </p>
            </div>

            {/* Right Section - Interactive Cards Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-6">
                {solutions.map((solution, index) => {
                  const IconComponent = solution.icon
                  return (
                    <Card
                      key={solution.id}
                      className={`p-6 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedSolution === solution.id
                          ? 'bg-emerald-50 border-emerald-200 shadow-md'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedSolution(solution.id)}
                    >
                      <div className="space-y-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedSolution === solution.id
                            ? 'bg-emerald-100'
                            : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            selectedSolution === solution.id
                              ? 'text-emerald-600'
                              : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className={`font-bold text-lg mb-2 ${
                            selectedSolution === solution.id
                              ? 'text-emerald-900'
                              : 'text-gray-900'
                          }`}>
                            {solution.title}
                          </h3>
                          <p className={`text-sm leading-relaxed ${
                            selectedSolution === solution.id
                              ? 'text-emerald-700'
                              : 'text-gray-600'
                          }`}>
                            {solution.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-700 text-white px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-5xl font-bold">
              READY TO{" "}
              <span className="inline-flex items-center mx-2">
                <div className="bg-white text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">——</div>
              </span>{" "}
              JOIN
              <br />
              THE SUCCESS?
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <Button 
              onClick={() => router.push('/')}
              className="bg-white text-emerald-700 hover:bg-gray-100 rounded-full px-8 py-3 font-medium"
            >
              join now →
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
