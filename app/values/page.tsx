"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Users, Target, Shield, TrendingUp, CheckCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import PageLayout from "@/components/page-layout"
import HeroSection from "@/components/hero-section"
import CTASection from "@/components/cta-section"
import { useApp } from "@/contexts/app-context"

const landlordValues = [
  {
    id: 1,
    name: "profitability",
    title: "Profitability.",
    description: "Maximizing returns while maintaining ethical property management practices.",
    longDescription: "We believe that successful property management should be profitable for landlords while ensuring fair treatment of tenants. Our platform helps landlords optimize their rental income through better tenant screening, reduced vacancy rates, and streamlined property management processes.",
    image: "/diverse-person.png",
    initials: "PR",
    benefits: [
      "Optimized rental pricing strategies",
      "Reduced tenant turnover costs",
      "Efficient property management tools",
      "Data-driven investment decisions"
    ],
    examples: [
      "Automated rent collection and tracking",
      "Tenant screening and verification",
      "Property maintenance scheduling",
      "Market analysis and pricing insights"
    ]
  },
  {
    id: 2,
    name: "maintenance",
    title: "Maintenance.",
    description: "Keeping properties in excellent condition for tenant satisfaction and value retention.",
    longDescription: "Regular maintenance is crucial for preserving property value and ensuring tenant satisfaction. Our platform provides tools for proactive maintenance scheduling, quick issue resolution, and long-term property care planning.",
    image: "/diverse-group-two.png",
    initials: "MA",
    benefits: [
      "Preventive maintenance scheduling",
      "Quick issue resolution tracking",
      "Property value preservation",
      "Tenant satisfaction improvement"
    ],
    examples: [
      "Automated maintenance reminders",
      "Digital work order management",
      "Vendor coordination tools",
      "Property condition documentation"
    ]
  },
  {
    id: 3,
    name: "communication",
    title: "Communication.",
    description: "is essential for building trust and resolving issues effectively.",
    longDescription: "Clear and consistent communication between landlords and tenants is the foundation of successful rental relationships. Our platform facilitates transparent communication, document sharing, and issue resolution tracking.",
    image: "/young-professional-man.png",
    initials: "CO",
    benefits: [
      "Transparent communication channels",
      "Document sharing and storage",
      "Issue resolution tracking",
      "Relationship building tools"
    ],
    examples: [
      "In-app messaging system",
      "Document upload and sharing",
      "Communication history tracking",
      "Automated notifications"
    ]
  },
]

const tenantValues = [
  {
    id: 1,
    name: "affordability",
    title: "Affordability.",
    description: "Finding quality housing that fits within your budget and lifestyle needs.",
    longDescription: "We understand that finding affordable, quality housing is a top priority for tenants. Our platform helps tenants find properties that offer the best value for their budget while ensuring transparency in all costs.",
    image: "/diverse-person.png",
    initials: "AF",
    benefits: [
      "Transparent pricing information",
      "Hidden cost prevention",
      "Budget-friendly options",
      "Value for money assessment"
    ],
    examples: [
      "Detailed cost breakdowns",
      "Utility cost estimates",
      "Deposit protection schemes",
      "Rent comparison tools"
    ]
  },
  {
    id: 2,
    name: "security",
    title: "Security.",
    description: "Ensuring safe and secure living environments for you and your family.",
    longDescription: "Tenant security goes beyond physical safety to include financial security, legal protection, and peace of mind. Our platform ensures that tenants are protected through proper documentation, secure payments, and legal compliance.",
    image: "/diverse-group-two.png",
    initials: "SE",
    benefits: [
      "Secure payment processing",
      "Legal compliance assurance",
      "Document protection",
      "Dispute resolution support"
    ],
    examples: [
      "Encrypted payment systems",
      "Legal document verification",
      "Security deposit protection",
      "24/7 support access"
    ]
  },
  {
    id: 3,
    name: "rights",
    title: "Rights.",
    description: "are fundamental to fair and respectful tenant-landlord relationships.",
    longDescription: "Tenant rights are the cornerstone of fair rental relationships. Our platform educates tenants about their rights, ensures legal compliance, and provides support when rights are challenged.",
    image: "/young-professional-man.png",
    initials: "RI",
    benefits: [
      "Rights education and awareness",
      "Legal compliance monitoring",
      "Dispute resolution support",
      "Advocacy and representation"
    ],
    examples: [
      "Rights documentation library",
      "Legal compliance checkers",
      "Dispute mediation services",
      "Legal resource connections"
    ]
  },
]

const defaultValues = [
  {
    id: 1,
    name: "creativity",
    title: "Creativity.",
    description: "Creativity fuels innovation and drives meaningful change in leadership.",
    longDescription: "We believe that creative thinking is essential for solving complex problems in the rental market. Our platform encourages innovative approaches to property management, tenant relations, and service delivery.",
    image: "/diverse-person.png",
    initials: "CR",
    benefits: [
      "Innovative problem-solving",
      "Creative service delivery",
      "Adaptive solutions",
      "Continuous improvement"
    ],
    examples: [
      "AI-powered tenant matching",
      "Smart property management",
      "Innovative payment solutions",
      "Creative communication tools"
    ]
  },
  {
    id: 2,
    name: "empathy",
    title: "Empathy.",
    description: "Empathy builds bridges and creates deeper connections between leaders.",
    longDescription: "Understanding and respecting the perspectives of both landlords and tenants is crucial for building a better rental ecosystem. Our platform promotes empathy through transparent communication and fair treatment.",
    image: "/diverse-group-two.png",
    initials: "EM",
    benefits: [
      "Better understanding",
      "Improved relationships",
      "Conflict prevention",
      "Community building"
    ],
    examples: [
      "Perspective-sharing tools",
      "Conflict resolution guides",
      "Community forums",
      "Feedback systems"
    ]
  },
  {
    id: 3,
    name: "clarity",
    title: "Clarity.",
    description: "is an under-valued idea in the conversation.",
    longDescription: "Clear communication and transparent processes eliminate confusion and build trust. Our platform ensures that all rental processes, from application to move-out, are clear and understandable.",
    image: "/young-professional-man.png",
    initials: "CL",
    benefits: [
      "Reduced misunderstandings",
      "Increased trust",
      "Efficient processes",
      "Better outcomes"
    ],
    examples: [
      "Clear documentation",
      "Transparent pricing",
      "Simple processes",
      "Easy-to-understand terms"
    ]
  },
]

export default function ValuesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userType, setUserType } = useApp()
  const urlUserType = searchParams.get('type') as "landlord" | "tenant" | null

  const values = userType === "landlord" ? landlordValues : userType === "tenant" ? tenantValues : defaultValues

  useEffect(() => {
    if (urlUserType) {
      setUserType(urlUserType)
    }
  }, [urlUserType, setUserType])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageLayout
      showBackButton={true}
      showValuesButton={true}
      showStickySwitch={true}
      onScrollToSection={(sectionId) => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })}
      onScrollToTop={scrollToTop}
    >
      {/* Hero Section */}
      <HeroSection
        title={
          <>
            The principles
            <br />
            that guide
            <br />
            <span style={{ color: "#14B8A6" }}>our mission</span>
          </>
        }
        description={userType === "landlord" 
          ? "Discover how our values shape the landlord experience and drive success in property management."
          : userType === "tenant"
          ? "Explore the values that ensure your rights, security, and satisfaction as a tenant."
          : "Learn about the core values that drive innovation and positive change in the rental industry."
        }
        badge="Our Values"
        platformText={{
          title: "A PLATFORM TO",
          subtitle: "EMBODY",
          description: "CORE VALUES"
        }}
        image="/collaborative-workspace.png"
        imageAlt="Collaborative workspace"
      />

      {/* Main Values Section */}
      <section id="values-section" className="px-4 md:px-12 py-16 bg-[#F4F5F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">Our Values</h2>
              <div className="flex -space-x-1 mx-2">
                <Avatar className="w-8 h-8 md:w-12 h-12 border-2 border-white shadow-sm">
                  <AvatarImage src="/diverse-person.png" />
                  <AvatarFallback>P1</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 md:w-12 h-12 border-2 border-white shadow-sm">
                  <AvatarImage src="/diverse-group-two.png" />
                  <AvatarFallback>P2</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 md:w-12 h-12 border-2 border-white shadow-sm">
                  <AvatarImage src="/diverse-group-outdoors.png" />
                  <AvatarFallback>P3</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <Badge className="bg-[#35D0A5] text-white hover:bg-[#35D0A5] rounded-full px-4 py-2 text-sm font-medium">
              2 / values
            </Badge>
          </div>

          {/* Values Grid - All values displayed statically */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={value.id} className="bg-white rounded-[28px] shadow-[0_12px_32px_rgba(20,25,30,0.10)] p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#A8C5E8] to-[#7BA7D9] p-1 shadow-[0_6px_18px_rgba(20,25,30,0.12)] mb-6">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={value.image || "/placeholder.svg"} className="object-cover" />
                      <AvatarFallback className="text-2xl">{value.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    {value.longDescription}
                  </p>
                </div>

                {/* Benefits and Examples */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {value.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Platform Features
                    </h4>
                    <ul className="space-y-2">
                      {value.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    onClick={() => router.push('/?showForm=tenant')}
                    className="text-white rounded-full px-6 hover:opacity-90"
                    style={{ backgroundColor: "#14B8A6" }}
                  >
                    Join the Beta →
                  </Button>
                </div>
              </Card>
            ))}
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
