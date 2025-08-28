"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, HelpCircle, Mail, MoreHorizontal, X, Home, Building } from "lucide-react"
import { supabase, testSupabaseConnection } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ValuesSection from "@/components/values-section"

export default function HomePage() {
  const [selectedUserType, setSelectedUserType] = useState<"landlord" | "tenant" | null>(null)
  const [isTextFading, setIsTextFading] = useState(false)
  const [showForm, setShowForm] = useState<"tenant" | "landlord" | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showStickySwitch, setShowStickySwitch] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [tenantForm, setTenantForm] = useState({
    fullName: "",
    whatsapp: "",
    whatsappConsent: false,
    email: "",
    location: "",
    moveTimeline: "",
    biggestHeadache: ""
  })
  
  const [landlordForm, setLandlordForm] = useState({
    fullName: "",
    whatsapp: "",
    whatsappConsent: false,
    email: "",
    location: "",
    propertyType: "",
    biggestPain: "",
    activeUnits: ""
  })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFormSubmit = async (formType: "tenant" | "landlord") => {
    if (isSubmitting) return // Prevent double submission
    
    setIsSubmitting(true)
    try {
      // Validate required fields
      const formData = formType === "tenant" ? tenantForm : landlordForm
      if (!formData.fullName || !formData.whatsapp) {
        console.error('Required fields missing')
        alert('Please fill in all required fields.')
        setIsSubmitting(false)
        return
      }

      // Validate phone number format (10 digits)
      const phoneRegex = /^[0-9]{10}$/
      if (!phoneRegex.test(formData.whatsapp)) {
        console.error('Invalid phone number format')
        alert('Please enter a valid 10-digit phone number.')
        setIsSubmitting(false)
        return
      }

      // Validate email format if provided
      if (formData.email && !formData.email.includes('@')) {
        console.error('Invalid email format')
        alert('Please enter a valid email address.')
        setIsSubmitting(false)
        return
      }

      // Validate location is selected
      if (!formData.location) {
        alert('Please select a location.')
        setIsSubmitting(false)
        return
      }

      // Validate landlord-specific fields ONLY if submitting as landlord
      if (formType === "landlord") {
        if (!(landlordForm as any).propertyType) {
          alert('Please select what you rent out.')
          setIsSubmitting(false)
          return
        }
        if (!(landlordForm as any).activeUnits) {
          alert('Please select how many active units you have.')
          setIsSubmitting(false)
          return
        }
      }

      // Validate tenant-specific fields ONLY if submitting as tenant
      if (formType === "tenant") {
        if (!(tenantForm as any).moveTimeline) {
          alert('Please select when you are hoping to move.')
          setIsSubmitting(false)
          return
        }
      }

      // Prepare data for Supabase - matching your exact database schema
      const submissionData = {
        full_name: formData.fullName, // Full name is name
        phone_number: formData.whatsapp, // WhatsApp number is phone_number
        email: formData.email || '', // Email (optional) is email
        location: formData.location || '', // Property location dropdown is location
        rent_out_type: formType === "landlord" ? (landlordForm as any).propertyType : null, // What do you rent out drop-down is rent_out_type
        extra_comments: formType === "landlord" 
          ? (landlordForm as any).biggestPain 
          : (tenantForm as any).biggestHeadache, // Biggest pain/headache is extra_comments for both
        activeunits: formType === "landlord" ? (landlordForm as any).activeUnits : null, // How many active units? is activeunits type text
        islandlord: formType === "landlord", // if user is submitting the form as a landlord then islandlord is true else false
        istenant: formType === "tenant", // if user is submitting the form as a tenant then istenant is true else false
        date_to_move_in: formType === "tenant" ? (tenantForm as any).moveTimeline : null // When are you hoping to move? is date_to_move_in type text
      }

      console.log('Submitting data to Supabase:', submissionData)

      // Test connection first
      const connectionTest = await testSupabaseConnection()
      if (!connectionTest) {
        alert('Unable to connect to database. Please try again.')
        setIsSubmitting(false)
        return
      }

      // Insert data into Supabase
      const { data, error } = await supabase
        .from('contact_form_submissions')
        .insert([submissionData])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        // Show detailed error to user
        let errorMessage = 'There was an error submitting your form. Please try again.'
        
        if (error.code === '23505') {
          errorMessage = 'This phone number has already been submitted. Please use a different number.'
        } else if (error.code === '23514') {
          errorMessage = 'Please check your input data and try again.'
        } else if (error.message) {
          errorMessage = `Error: ${error.message}`
        }
        
        alert(errorMessage)
        setIsSubmitting(false)
        return
      }

      console.log('Form submitted successfully:', data)
      console.log('Submitted record ID:', data?.[0]?.id)
      setFormSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false)
        setShowForm(null)
        setTenantForm({
          fullName: "",
          whatsapp: "",
          whatsappConsent: false,
          email: "",
          location: "",
          moveTimeline: "",
          biggestHeadache: ""
        })
        setLandlordForm({
          fullName: "",
          whatsapp: "",
          whatsappConsent: false,
          email: "",
          location: "",
          propertyType: "",
          biggestPain: "",
          activeUnits: ""
        })
      }, 3000)
    } catch (error) {
      console.error('Unexpected error submitting form:', error)
      alert('An unexpected error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (selectedUserType) {
      setIsTextFading(true)
      const timer = setTimeout(() => {
        setIsTextFading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [selectedUserType])

  useEffect(() => {
    const handleScroll = () => {
      // Find the hero text element (the "I am a Landlord/Tenant" text)
      const heroText = document.querySelector('h1')
      if (heroText) {
        const heroTextBottom = heroText.offsetTop + heroText.offsetHeight
        setShowStickySwitch(window.scrollY > heroTextBottom - 50)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle URL query parameters for form display
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const showFormParam = urlParams.get('showForm')
    if (showFormParam === 'tenant' || showFormParam === 'landlord') {
      setShowForm(showFormParam)
      // Clear the URL parameter after setting the form
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const getPlatformText = () => {
    if (selectedUserType === "landlord") {
      return {
        title: "A PLATFORM TO",
        subtitle: "PROPERTY",
        description: "MANAGEMENT.",
      }
    } else if (selectedUserType === "tenant") {
      return {
        title: "A PLATFORM TO",
        subtitle: "TENANT",
        description: "RIGHTS.",
      }
    } else {
      return {
        title: "A PLATFORM TO",
        subtitle: "OPEN-SOURCE",
        description: "LEADERSHIP.",
      }
    }
  }

  const platformText = getPlatformText()

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF8F3" }}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white relative">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 text-sm">
            Help <HelpCircle className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={() => scrollToSection('values-section')}
            className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
          >
            Values <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button onClick={scrollToTop} className="hover:opacity-80 transition-opacity">
            <img src="/rentaid-logo.png" alt="Rentaid" className="h-18 w-auto" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = '/about'}
            className="text-sm hover:opacity-80 transition-opacity"
          >
            About
          </button>

          <button 
            onClick={() => scrollToSection('waiting-list-section')}
            className="text-sm hover:opacity-80 transition-opacity"
          >
            Join <span className="text-gray-400">⊕</span>
          </button>
        </div>
      </header>

      {/* Sticky Switch */}
      <div 
        className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ease-in-out ${
          showStickySwitch 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 px-2 py-1">
          <button
            onClick={() => setSelectedUserType("tenant")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
              selectedUserType === "tenant" 
                ? "text-white shadow-sm" 
                : "text-gray-600 hover:text-gray-800"
            }`}
            style={{
              backgroundColor: selectedUserType === "tenant" ? "#14B8A6" : "transparent"
            }}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Tenant</span>
          </button>
          <button
            onClick={() => setSelectedUserType("landlord")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
              selectedUserType === "landlord" 
                ? "text-white shadow-sm" 
                : "text-gray-600 hover:text-gray-800"
            }`}
            style={{
              backgroundColor: selectedUserType === "landlord" ? "#14B8A6" : "transparent"
            }}
          >
            <Building className="w-4 h-4" />
            <span className="text-sm font-medium">Landlord</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left Column - Typography */}
            <div className="lg:col-span-5 space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-gray-900 leading-[0.92] tracking-tight">
                  <span className="block sm:inline">I am a</span>
                  <br className="hidden sm:block" />
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 sm:block">
                    <button
                      onClick={() => setSelectedUserType("landlord")}
                      className={`hover:opacity-80 transition-opacity ${
                        selectedUserType === "landlord" ? "text-emerald-600" : ""
                      }`}
                    >
                      Landlord
                    </button>
                    <span className="block sm:inline"> /</span>
                    <span className="sm:hidden">/</span>
                    <br className="hidden sm:block" />
                    <button
                      onClick={() => setSelectedUserType("tenant")}
                      className={`hover:opacity-80 transition-opacity ${
                        selectedUserType === "tenant" ? "text-emerald-600" : ""
                      }`}
                    >
                      Tenant
                    </button>
                    <span className="block sm:inline"> ?</span>
                  </div>
                </h1>

                {selectedUserType && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full h-12 md:h-16 px-4 md:px-8 pr-3 md:pr-4">
                    <span className="text-2xl md:text-4xl font-bold text-gray-900 mr-2 md:mr-4 capitalize">
                      {selectedUserType}
                    </span>
                    <div
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#35D0A5" }}
                    >
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full" style={{ backgroundColor: "#0F6E58" }}>
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                For those who were
                <br />
                <strong className="text-gray-900 font-bold">encouraged</strong>
                <br />
                to be leaders.
              </p>

              {/* Jumbo CTA at bottom left */}
              <div className="pt-8 md:pt-12">
                <button
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: "#35D0A5" }}
                >
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Right Column - Media Cards */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6">
              {/* Floating utility buttons */}
              <div className="flex justify-end gap-3 mb-6 md:mb-8">
                <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex justify-center leading-9">{/* Logo moved to header */}</div>

              <Card
                className="rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: "#D8E6FF" }}
              >
                <div
                  className={`space-y-2 transition-opacity duration-300 ${isTextFading ? "opacity-0" : "opacity-100"}`}
                >
                  <h3 className="text-2xl font-bold uppercase tracking-wide text-gray-900 leading-tight">
                    {platformText.title}{" "}
                    <div className="inline-flex items-center mx-2">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src="/attendee-1.png" />
                      </Avatar>
                    </div>{" "}
                    TO
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="bg-white border-2 border-gray-300 rounded-full px-4 py-1">
                      <span className="text-sm font-medium text-gray-700">——</span>
                    </div>
                    <span className="text-2xl font-bold uppercase tracking-wide text-gray-900">
                      {platformText.subtitle}
                    </span>
                  </div>
                  <p className="text-2xl font-bold uppercase tracking-wide text-gray-900">{platformText.description}</p>
                </div>
              </Card>

              {/* Bottom Image Card */}
              <div className="relative group">
                <Card className="bg-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img
                    src="/desk-collaboration.png"
                    alt="People collaborating"
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  {/* Ellipsis chip */}
                  <div className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </div>
                </Card>
              </div>

              {/* Bottom right link */}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center pt-16">
            <div className="flex flex-col items-center opacity-30">
              <span className="text-sm text-gray-600 mb-2">scroll</span>
              <div className="animate-bounce">
                <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview */}

      {/* Tenant and Landlord Cards Section */}
      <section className="px-4 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tenant Card */}
            <Card
              className="p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: "#111827", borderColor: "#334155" }}
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#F8FAFC" }}>
                Move in with confidence
              </h3>
              <p className="mb-6" style={{ color: "#E2E8F0" }}>
                Sign up for early access to renting that's documented, transparent, and drama-free.
              </p>
                              <ul className="space-y-2 mb-8 text-sm" style={{ color: "#E2E8F0" }}>
                  <li>• Clear, time-stamped agreements</li>
                  <li>• Fewer surprises at move-out</li>
                  <li>• Friendly support on WhatsApp</li>
                </ul>

              </Card>

            {/* Landlord Card */}
            <Card
              className="p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: "#111827", borderColor: "#334155" }}
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#F8FAFC" }}>
                Fewer disputes, happier stays
              </h3>
              <p className="mb-6" style={{ color: "#E2E8F0" }}>
                Get early access to a simple way to rent to serious, documented tenants.
              </p>
                              <ul className="space-y-2 mb-8 text-sm" style={{ color: "#E2E8F0" }}>
                  <li>• Clean, professional contracts</li>
                  <li>• Proof of condition when it matters</li>
                  <li>• Less back-and-forth, more peace</li>
                </ul>

              </Card>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setShowForm("tenant")}
            className="text-white rounded-full px-6 hover:opacity-90"
            style={{ backgroundColor: "#14B8A6" }}
          >
            Join the waiting list →
          </Button>
        </div>
      </section>

      {/* Our Values Section */}
      <div id="values-section">
        <ValuesSection selectedUserType={selectedUserType} />
        <div className="flex justify-center mt-8">

        </div>
      </div>

      <section id="about-section" className="px-4 py-12" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: "#F8FAFC" }}>
              About RentAid
            </h2>
            <Badge className="hover:opacity-90" style={{ backgroundColor: "#14B8A6", color: "#0F172A" }}>
              2 / about
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-8" style={{ color: "#E2E8F0" }}>
                We're building the trust layer for renting in India—starting in Hyderabad. Clean, compliant renting that
                keeps both sides protected and respected.
              </p>
              <p className="text-lg mb-8" style={{ color: "#E2E8F0" }}>
                Around{" "}
                <span className="font-bold" style={{ color: "#F8FAFC" }}>
                  2,000+
                </span>{" "}
                people have shown interest in early access across PGs, flats, and gated communities.
              </p>

              <Button 
                onClick={() => window.location.href = '/about'}
                className="text-white rounded-full px-6 hover:opacity-90" 
                style={{ backgroundColor: "#111827" }}
              >
                read more →
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="p-6 rounded-2xl" style={{ backgroundColor: "#14B8A6" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1" style={{ color: "#0F172A" }}>
                      Community confidence this month
                    </p>
                    <p className="text-3xl font-bold" style={{ color: "#0F172A" }}>
                      90% 👍
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Benefits Section */}
      <section className="px-4 md:px-12 py-12" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "#F8FAFC" }}>
            What you get in Beta
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
                Tenants
              </h3>
              <ul className="space-y-4" style={{ color: "#E2E8F0" }}>
                <li>• Calm move-ins with clear, time-stamped paperwork</li>
                <li>• Fewer deposit fights and last-minute shocks</li>
                <li>• Priority support while we're learning together</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
                Landlords
              </h3>
              <ul className="space-y-4" style={{ color: "#E2E8F0" }}>
                <li>• Professional, documented renting without the headache</li>
                <li>• Less back-and-forth, fewer misunderstandings</li>
                <li>• Early-adopter badge when we launch publicly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Join Waiting List */}
      <section id="waiting-list-section" className="bg-emerald-700 text-white px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-5xl font-bold">
              JOIN{" "}
              <span className="inline-flex items-center mx-2">
                <div className="bg-white text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">——</div>
              </span>{" "}
              THE
              <br />
              WAITING LIST
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <Button 
              onClick={() => setShowForm("tenant")}
              className="bg-white text-emerald-700 hover:bg-gray-100 rounded-full px-8 py-3 font-medium"
            >
              join now →
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card
            className="w-full max-w-md p-6 rounded-3xl"
            style={{ backgroundColor: "#111827", borderColor: "#334155" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>
                Join the Beta
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(null)}
                className="rounded-full hover:opacity-80"
                style={{ color: "#E2E8F0" }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center bg-gray-800 rounded-full p-1" style={{ backgroundColor: "#1F2937" }}>
                <button
                  onClick={() => setShowForm("tenant")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    showForm === "tenant" 
                      ? "text-white shadow-sm" 
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  style={{
                    backgroundColor: showForm === "tenant" ? "#14B8A6" : "transparent"
                  }}
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">Tenant</span>
                </button>
                <button
                  onClick={() => setShowForm("landlord")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    showForm === "landlord" 
                      ? "text-white shadow-sm" 
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  style={{
                    backgroundColor: showForm === "landlord" ? "#14B8A6" : "transparent"
                  }}
                >
                  <Building className="w-4 h-4" />
                  <span className="text-sm font-medium">Landlord</span>
                </button>
              </div>
            </div>

            {!formSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleFormSubmit(showForm)
                }}
                className="space-y-4"
              >
                <p className="text-sm mb-6" style={{ color: "#E2E8F0" }}>
                  30 seconds. {showForm === "tenant" ? "Hyderabad only (for now)." : "Hyderabad properties first."}
                </p>

                <div>
                  <Label htmlFor="fullName" style={{ color: "#F8FAFC" }}>
                    Full name <span style={{ color: "#EF4444" }}>*</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="fullName"
                      value={showForm === "tenant" ? tenantForm.fullName : landlordForm.fullName}
                      onChange={(e) => {
                        if (showForm === "tenant") {
                          setTenantForm({ ...tenantForm, fullName: e.target.value })
                        } else {
                          setLandlordForm({ ...landlordForm, fullName: e.target.value })
                        }
                      }}
                      required
                      style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="whatsapp" style={{ color: "#F8FAFC" }}>
                    WhatsApp number <span style={{ color: "#EF4444" }}>*</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="10-digit number (e.g., 9876543210)"
                      value={showForm === "tenant" ? tenantForm.whatsapp : landlordForm.whatsapp}
                      onChange={(e) => {
                        if (showForm === "tenant") {
                          setTenantForm({ ...tenantForm, whatsapp: e.target.value })
                        } else {
                          setLandlordForm({ ...landlordForm, whatsapp: e.target.value })
                        }
                      }}
                      required
                      style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox
                      id="whatsappConsent"
                      checked={showForm === "tenant" ? tenantForm.whatsappConsent : landlordForm.whatsappConsent}
                      onCheckedChange={(checked) => {
                        if (showForm === "tenant") {
                          setTenantForm({ ...tenantForm, whatsappConsent: checked as boolean })
                        } else {
                          setLandlordForm({ ...landlordForm, whatsappConsent: checked as boolean })
                        }
                      }}
                    />
                    <Label htmlFor="whatsappConsent" className="text-sm" style={{ color: "#E2E8F0" }}>
                      Contact me on WhatsApp about the beta
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" style={{ color: "#F8FAFC" }}>
                    Email <span style={{ color: "#6B7280" }}>(optional)</span>
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={showForm === "tenant" ? tenantForm.email : landlordForm.email}
                      onChange={(e) => {
                        if (showForm === "tenant") {
                          setTenantForm({ ...tenantForm, email: e.target.value })
                        } else {
                          setLandlordForm({ ...landlordForm, email: e.target.value })
                        }
                      }}
                      style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}
                    />
                  </div>
                </div>

                {showForm === "tenant" ? (
                  <>
                                          <div>
                        <Label htmlFor="location" style={{ color: "#F8FAFC" }}>
                          Where in Hyderabad are you looking? <span style={{ color: "#EF4444" }}>*</span>
                        </Label>
                        <div className="mt-2">
                        <Select onValueChange={(value) => setTenantForm({ ...tenantForm, location: value })}>
                          <SelectTrigger style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}>
                            <SelectValue placeholder="Select area" />
                          </SelectTrigger>
                          <SelectContent style={{ backgroundColor: "#1F2937", borderColor: "#374151" }}>
                            <SelectItem value="hitech-city">Hi-Tech City</SelectItem>
                            <SelectItem value="gachibowli">Gachibowli</SelectItem>
                            <SelectItem value="kondapur">Kondapur</SelectItem>
                            <SelectItem value="madhapur">Madhapur</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="moveTimeline" style={{ color: "#F8FAFC" }}>
                        When are you hoping to move? <span style={{ color: "#EF4444" }}>*</span>
                      </Label>
                      <div className="mt-2">
                        <Select onValueChange={(value) => setTenantForm({ ...tenantForm, moveTimeline: value })}>
                          <SelectTrigger style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent style={{ backgroundColor: "#1F2937", borderColor: "#374151" }}>
                            <SelectItem value="0-30">0–30 days</SelectItem>
                            <SelectItem value="30-60">30–60 days</SelectItem>
                            <SelectItem value="60-90">60–90 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="biggestHeadache" style={{ color: "#F8FAFC" }}>Biggest renting headache?</Label>
                      <div className="mt-2">
                        <Textarea
                          id="biggestHeadache"
                          placeholder="deposits / unclear rules / last-minute issues / other"
                          value={tenantForm.biggestHeadache}
                          onChange={(e) => setTenantForm({ ...tenantForm, biggestHeadache: e.target.value })}
                          style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="location" style={{ color: "#F8FAFC" }}>
                        Property location <span style={{ color: "#EF4444" }}>*</span>
                      </Label>
                      <div className="mt-2">
                        <Select onValueChange={(value) => setLandlordForm({ ...landlordForm, location: value })}>
                          <SelectTrigger style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}>
                            <SelectValue placeholder="Select area" />
                          </SelectTrigger>
                          <SelectContent style={{ backgroundColor: "#1F2937", borderColor: "#374151" }}>
                            <SelectItem value="hitech-city">Hi-Tech City</SelectItem>
                            <SelectItem value="gachibowli">Gachibowli</SelectItem>
                            <SelectItem value="kondapur">Kondapur</SelectItem>
                            <SelectItem value="madhapur">Madhapur</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="propertyType" style={{ color: "#F8FAFC" }}>
                        What do you rent out? <span style={{ color: "#EF4444" }}>*</span>
                      </Label>
                      <div className="mt-2">
                        <Select onValueChange={(value) => setLandlordForm({ ...landlordForm, propertyType: value })}>
                          <SelectTrigger style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent style={{ backgroundColor: "#1F2937", borderColor: "#374151" }}>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="independent">Independent home</SelectItem>
                            <SelectItem value="pg">PG/Hostel</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="biggestPain" style={{ color: "#F8FAFC" }}>Biggest pain right now?</Label>
                      <div className="mt-2">
                        <Textarea
                          id="biggestPain"
                          placeholder="disputes / documentation / no-shows / other"
                          value={landlordForm.biggestPain}
                          onChange={(e) => setLandlordForm({ ...landlordForm, biggestPain: e.target.value })}
                          style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="activeUnits" style={{ color: "#F8FAFC" }}>
                        How many active units? <span style={{ color: "#EF4444" }}>*</span>
                      </Label>
                      <div className="mt-2">
                        <Select onValueChange={(value) => setLandlordForm({ ...landlordForm, activeUnits: value })}>
                          <SelectTrigger style={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F8FAFC" }}>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent style={{ backgroundColor: "#1F2937", borderColor: "#374151" }}>
                            <SelectItem value="1-2">1–2</SelectItem>
                            <SelectItem value="3-5">3–5</SelectItem>
                            <SelectItem value="6+">6+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white rounded-full py-3 hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: "#14B8A6" }}
                >
                  {isSubmitting 
                    ? "Submitting..." 
                    : showForm === "tenant" 
                      ? "Count me in 🚀" 
                      : "I'm in 🙌"
                  }
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <h4 className="text-xl font-bold mb-4" style={{ color: "#F8FAFC" }}>
                  {showForm === "tenant" ? "You're on the list." : "Welcome aboard."}
                </h4>
                <p className="mb-4" style={{ color: "#E2E8F0" }}>
                  {showForm === "tenant"
                    ? "We'll message you on WhatsApp with early-access steps."
                    : "Expect a WhatsApp message with your early-access link."}
                </p>
                <p className="text-sm" style={{ color: "#E2E8F0", opacity: 0.8 }}>
                  {showForm === "tenant"
                    ? "P.S. Share this with a friend—referrals get priority."
                    : "Founding landlords get a launch-day shout-out."}
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
