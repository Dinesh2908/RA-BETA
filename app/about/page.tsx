"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, HelpCircle, Mail, X, Home, Building, ArrowLeft, Users, Target, Shield, TrendingUp, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()
  const [selectedUserType, setSelectedUserType] = useState<"landlord" | "tenant" | null>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            onClick={() => router.push('/')}
            className="text-sm hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <button 
            onClick={() => router.push('/stories')}
            className="text-sm hover:opacity-80 transition-opacity"
          >
            Stories
          </button>
          <button 
            onClick={() => {
              const url = selectedUserType 
                ? `/values?type=${selectedUserType}` 
                : '/values'
              router.push(url)
            }}
            className="text-sm hover:opacity-80 transition-opacity"
          >
            Values
          </button>
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
          >
            Join <span className="text-gray-400">⊕</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left Column - Typography */}
            <div className="lg:col-span-5 space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                <Badge className="mb-4" style={{ backgroundColor: "#14B8A6", color: "#0F172A" }}>
                  About RentAid
                </Badge>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[0.92] tracking-tight">
                  Building the trust
                  <br />
                  layer for
                  <br />
                  <span style={{ color: "#14B8A6" }}>renting</span>
                  <br />
                  in India
                </h1>
              </div>

              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                We're starting in Hyderabad, creating clean, compliant renting that keeps both sides protected and respected.
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

              <Card
                className="rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: "#D8E6FF" }}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold uppercase tracking-wide text-gray-900 leading-tight">
                    A PLATFORM TO
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="bg-white border-2 border-gray-300 rounded-full px-4 py-1">
                      <span className="text-sm font-medium text-gray-700">——</span>
                    </div>
                    <span className="text-2xl font-bold uppercase tracking-wide text-gray-900">
                      REVOLUTIONIZE
                    </span>
                  </div>
                  <p className="text-2xl font-bold uppercase tracking-wide text-gray-900">RENTAL EXPERIENCES</p>
                </div>
              </Card>

              {/* Bottom Image Card */}
              <div className="relative group">
                <Card className="bg-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img
                    src="/diverse-group-outdoors.png"
                    alt="Diverse group collaboration"
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To eliminate the uncertainty and disputes that plague the rental market in India. We believe that renting should be transparent, fair, and stress-free for both tenants and landlords.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By creating a comprehensive platform that handles documentation, verification, and communication, we're building the foundation for a more trustworthy rental ecosystem.
              </p>
            </div>
            <div className="space-y-6">
              <Card className="p-6 rounded-2xl" style={{ backgroundColor: "#14B8A6" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1" style={{ color: "#0F172A" }}>
                      Community trust score
                    </p>
                    <p className="text-3xl font-bold" style={{ color: "#0F172A" }}>
                      90% 👍
                    </p>
                  </div>
                  <Shield className="w-8 h-8" style={{ color: "#0F172A" }} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-12 py-16" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: "#F8FAFC" }}>
            The Numbers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#1F2937" }}>
              <div className="flex items-center justify-center mb-4">
                <Users className="w-12 h-12" style={{ color: "#14B8A6" }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: "#F8FAFC" }}>
                2,000+
              </h3>
              <p className="text-sm" style={{ color: "#E2E8F0" }}>
                People interested in early access
              </p>
            </Card>
            <Card className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#1F2937" }}>
              <div className="flex items-center justify-center mb-4">
                <Target className="w-12 h-12" style={{ color: "#14B8A6" }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: "#F8FAFC" }}>
                Hyderabad
              </h3>
              <p className="text-sm" style={{ color: "#E2E8F0" }}>
                Starting point for our platform
              </p>
            </Card>
            <Card className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#1F2937" }}>
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-12 h-12" style={{ color: "#14B8A6" }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: "#F8FAFC" }}>
                Beta
              </h3>
              <p className="text-sm" style={{ color: "#E2E8F0" }}>
                Early access program active
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#14B8A6" }}>
                  <span className="text-white font-bold text-xl">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Documentation</h3>
              <p className="text-gray-600 text-sm">
                Clear, time-stamped agreements and condition reports that protect both parties
              </p>
            </Card>
            <Card className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#14B8A6" }}>
                  <span className="text-white font-bold text-xl">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Verification</h3>
              <p className="text-gray-600 text-sm">
                Background checks and identity verification to ensure trust and safety
              </p>
            </Card>
            <Card className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#14B8A6" }}>
                  <span className="text-white font-bold text-xl">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Support</h3>
              <p className="text-gray-600 text-sm">
                Dedicated WhatsApp support to resolve issues quickly and efficiently
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values-section" className="px-4 md:px-12 py-16" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: "#F8FAFC" }}>
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#1F2937" }}>
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8" style={{ color: "#14B8A6" }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#F8FAFC" }}>
                Trust
              </h3>
              <p className="text-sm" style={{ color: "#E2E8F0" }}>
                Building reliable relationships through transparency
              </p>
            </Card>
            <Card className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#1F2937" }}>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" style={{ color: "#14B8A6" }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#F8FAFC" }}>
                Quality
              </h3>
              <p className="text-sm" style={{ color: "#E2E8F0" }}>
                Delivering excellence in every interaction
              </p>
            </Card>
            <Card className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#1F2937" }}>
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8" style={{ color: "#14B8A6" }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#F8FAFC" }}>
                Community
              </h3>
              <p className="text-sm" style={{ color: "#E2E8F0" }}>
                Fostering connections and mutual support
              </p>
            </Card>
            <Card className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#1F2937" }}>
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8" style={{ color: "#14B8A6" }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#F8FAFC" }}>
                Innovation
              </h3>
              <p className="text-sm" style={{ color: "#E2E8F0" }}>
                Continuously improving the rental experience
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              onClick={() => router.push('/?showForm=tenant')}
              className="bg-white text-emerald-700 hover:bg-gray-100 rounded-full px-8 py-3 font-medium"
            >
              join now →
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
