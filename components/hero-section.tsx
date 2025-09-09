"use client"

import { ArrowRight, Mail, MoreHorizontal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useApp } from "@/contexts/app-context"
import { ReactNode } from "react"

interface HeroSectionProps {
  title: ReactNode
  subtitle?: ReactNode
  description: string
  badge?: string
  platformText?: {
    title: string
    subtitle: string
    description: string
  }
  image?: string
  imageAlt?: string
  showUserTypeToggle?: boolean
  showJumboCTA?: boolean
  onJumboCTAClick?: () => void
}

export default function HeroSection({
  title,
  subtitle,
  description,
  badge,
  platformText,
  image,
  imageAlt = "Hero image",
  showUserTypeToggle = false,
  showJumboCTA = true,
  onJumboCTAClick
}: HeroSectionProps) {
  const { userType, setUserType } = useApp()

  const getPlatformText = () => {
    if (userType === "landlord") {
      return {
        title: "A PLATFORM TO",
        subtitle: "PROPERTY",
        description: "MANAGEMENT.",
      }
    } else if (userType === "tenant") {
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

  const currentPlatformText = platformText || getPlatformText()

  return (
    <section className="px-4 md:px-12 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column - Typography */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              {badge && (
                <Badge className="mb-4" style={{ backgroundColor: "#14B8A6", color: "#0F172A" }}>
                  {badge}
                </Badge>
              )}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[0.92] tracking-tight">
                {title}
                {subtitle && (
                  <>
                    <br />
                    {subtitle}
                  </>
                )}
                {showUserTypeToggle && (
                  <>
                    <br />
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 sm:block">
                      <button
                        onClick={() => setUserType("landlord")}
                        className={`hover:opacity-80 transition-opacity ${
                          userType === "landlord" ? "text-emerald-600" : ""
                        }`}
                      >
                        Landlord
                      </button>
                      <span className="block sm:inline"> /</span>
                      <span className="sm:hidden">/</span>
                      <br className="hidden sm:block" />
                      <button
                        onClick={() => setUserType("tenant")}
                        className={`hover:opacity-80 transition-opacity ${
                          userType === "tenant" ? "text-emerald-600" : ""
                        }`}
                      >
                        Tenant
                      </button>
                      <span className="block sm:inline"> ?</span>
                    </div>
                  </>
                )}
              </h1>

              {userType && showUserTypeToggle && (
                <div className="inline-flex items-center bg-gray-100 rounded-full h-12 md:h-16 px-4 md:px-8 pr-3 md:pr-4">
                  <span className="text-2xl md:text-4xl font-bold text-gray-900 mr-2 md:mr-4 capitalize">
                    {userType}
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
              {description}
            </p>

            {/* Jumbo CTA at bottom left */}
            {showJumboCTA && (
              <div className="pt-8 md:pt-12">
                <button
                  onClick={onJumboCTAClick}
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: "#35D0A5" }}
                >
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                </button>
              </div>
            )}
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
                  {currentPlatformText.title}{" "}
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
                    {currentPlatformText.subtitle}
                  </span>
                </div>
                <p className="text-2xl font-bold uppercase tracking-wide text-gray-900">
                  {currentPlatformText.description}
                </p>
              </div>
            </Card>

            {/* Bottom Image Card */}
            <div className="relative group">
              <Card className="bg-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img
                  src={image || "/desk-collaboration.png"}
                  alt={imageAlt}
                  className="w-full h-48 object-cover rounded-2xl"
                />
                {/* Ellipsis chip */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </div>
              </Card>
            </div>
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
  )
}
