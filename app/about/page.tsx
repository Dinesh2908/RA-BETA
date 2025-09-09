"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Shield, TrendingUp, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import PageLayout from "@/components/page-layout"
import HeroSection from "@/components/hero-section"
import CTASection from "@/components/cta-section"
import { useApp } from "@/contexts/app-context"

export default function AboutPage() {
  const router = useRouter()
  const { userType, setUserType } = useApp()

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
    <PageLayout
      showBackButton={true}
      showValuesButton={true}
      onScrollToSection={scrollToSection}
      onScrollToTop={scrollToTop}
    >
      {/* Hero Section */}
      <HeroSection
        title={
          <>
            Building the trust
            <br />
            layer for
            <br />
            <span style={{ color: "#14B8A6" }}>renting</span>
            <br />
            in India
          </>
        }
        description="We're starting in Hyderabad, creating clean, compliant renting that keeps both sides protected and respected."
        badge="About RentAid"
        platformText={{
          title: "A PLATFORM TO",
          subtitle: "REVOLUTIONIZE",
          description: "RENTAL EXPERIENCES"
        }}
        image="/diverse-group-outdoors.png"
        imageAlt="Diverse group collaboration"
      />

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
      <CTASection
        title={
          <>
            JOIN{" "}
            <span className="inline-flex items-center mx-2">
              <div className="bg-white text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">——</div>
            </span>{" "}
            THE
            <br />
            WAITING LIST
          </>
        }
        buttonText="join now →"
        onButtonClick={() => router.push('/?showForm=tenant')}
      />
    </PageLayout>
  )
}
