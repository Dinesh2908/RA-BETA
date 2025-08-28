"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Share2, Plus } from "lucide-react"

const landlordValues = [
  {
    id: 1,
    name: "profitability",
    title: "Profitability.",
    description: "Maximizing returns while maintaining ethical property management practices.",
    image: "/diverse-person.png",
    initials: "PR",
    joinText: "join us",
  },
  {
    id: 2,
    name: "maintenance",
    title: "Maintenance.",
    description: "Keeping properties in excellent condition for tenant satisfaction and value retention.",
    image: "/diverse-group-two.png",
    initials: "MA",
    joinText: "join us",
  },
  {
    id: 3,
    name: "communication",
    title: "Communication.",
    description: "is essential for building trust and resolving issues effectively.",
    image: "/young-professional-man.png",
    initials: "CO",
    joinText: "join us",
  },
]

const tenantValues = [
  {
    id: 1,
    name: "affordability",
    title: "Affordability.",
    description: "Finding quality housing that fits within your budget and lifestyle needs.",
    image: "/diverse-person.png",
    initials: "AF",
    joinText: "join us",
  },
  {
    id: 2,
    name: "security",
    title: "Security.",
    description: "Ensuring safe and secure living environments for you and your family.",
    image: "/diverse-group-two.png",
    initials: "SE",
    joinText: "join us",
  },
  {
    id: 3,
    name: "rights",
    title: "Rights.",
    description: "are fundamental to fair and respectful tenant-landlord relationships.",
    image: "/young-professional-man.png",
    initials: "RI",
    joinText: "join us",
  },
]

const defaultValues = [
  {
    id: 1,
    name: "creativity",
    title: "Creativity.",
    description: "Creativity fuels innovation and drives meaningful change in leadership.",
    image: "/diverse-person.png",
    initials: "CR",
    joinText: "join us",
  },
  {
    id: 2,
    name: "empathy",
    title: "Empathy.",
    description: "Empathy builds bridges and creates deeper connections between leaders.",
    image: "/diverse-group-two.png",
    initials: "EM",
    joinText: "join us",
  },
  {
    id: 3,
    name: "clarity",
    title: "Clarity.",
    description: "is an under-valued idea in the conversation.",
    image: "/young-professional-man.png",
    initials: "JU",
    joinText: "join us",
  },
]

interface ValuesSectionProps {
  selectedUserType?: "landlord" | "tenant" | null
}

export default function ValuesSection({ selectedUserType }: ValuesSectionProps) {
  const [activeValue, setActiveValue] = useState(2) // Start with the third value (index 2)
  const [isAnimating, setIsAnimating] = useState(false)

  const values =
    selectedUserType === "landlord" ? landlordValues : selectedUserType === "tenant" ? tenantValues : defaultValues

  useEffect(() => {
    setActiveValue(2) // Reset to third value when user type changes
  }, [selectedUserType])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveValue((prev) => (prev + 1) % values.length)
        setIsAnimating(false)
      }, 450)
    }, 4000)

    return () => clearInterval(interval)
  }, [values.length])

  const currentValue = values[activeValue]

  return (
    <section className="px-12 py-16 bg-[#F4F5F6] min-h-screen">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <h2 className="text-[72px] font-[800] text-[#0E0F11] leading-[0.9] tracking-[-0.02em]">Our(</h2>
            <div className="flex -space-x-1 mx-2">
              <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                <AvatarImage src="/diverse-person.png" />
                <AvatarFallback>P1</AvatarFallback>
              </Avatar>
              <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                <AvatarImage src="/diverse-group-two.png" />
                <AvatarFallback>P2</AvatarFallback>
              </Avatar>
              <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                <AvatarImage src="/diverse-group-outdoors.png" />
                <AvatarFallback>P3</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-[72px] font-[800] text-[#0E0F11] leading-[0.9] tracking-[-0.02em]">)</h2>
          </div>
          <Badge className="bg-[#35D0A5] text-white hover:bg-[#35D0A5] rounded-full px-4 py-2 text-sm font-medium">
            1 / values
          </Badge>
        </div>

        <h2 className="text-[72px] font-[800] text-[#0E0F11] leading-[0.9] tracking-[-0.02em] mb-16">Values</h2>

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[28px] shadow-[0_12px_32px_rgba(20,25,30,0.10)] p-9 relative overflow-visible">
              <div
                className={`transition-all duration-450 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  isAnimating ? "opacity-0 transform translate-y-6" : "opacity-100 transform translate-y-0"
                }`}
              >
                <h3 className="text-[40px] font-bold text-[#0E0F11] leading-tight mb-8">{currentValue.title}</h3>

                <div className="relative mb-8 flex justify-center">
                  <div className="relative">
                    <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-br from-[#A8C5E8] to-[#7BA7D9] p-1 shadow-[0_6px_18px_rgba(20,25,30,0.12)]">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={currentValue.image || "/placeholder.svg"} className="object-cover" />
                        <AvatarFallback className="text-2xl">{currentValue.initials}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="absolute -left-20 top-32">
                      <div className="bg-white rounded-full px-4 py-2 shadow-sm flex items-center gap-2 border border-[#E3E6EA]">
                        <span className="text-[#0E0F11] text-sm font-medium">{currentValue.joinText}</span>
                        <div className="w-6 h-6 bg-[#0E0F11] rounded-full flex items-center justify-center">
                          <Plus className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-16 -right-8">
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E3E6EA] hover:shadow-md transition-shadow">
                        <Share2 className="w-4 h-4 text-[#9AA1A9]" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-[20px] leading-[1.4] text-[#0E0F11] mb-8 max-w-md">
                  <span className="bg-[#E9E1DA] px-3 py-1 rounded-full font-medium">
                    {currentValue.title.replace(".", "")}
                  </span>{" "}
                  <span>{currentValue.description}</span>
                </div>

                <button 
                  onClick={() => {
                    const url = selectedUserType 
                      ? `/values?type=${selectedUserType}` 
                      : '/values'
                    window.location.href = url
                  }}
                  className="flex items-center gap-3 text-[16px] text-[#0E0F11] group hover:text-[#9AA1A9] transition-colors border-b border-[#0E0F11] pb-1"
                >
                  Read more
                  <div className="w-6 h-6 bg-[#0E0F11] rounded-full flex items-center justify-center group-hover:bg-[#9AA1A9] transition-colors">
                    <span className="text-white text-xs">↗</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <button
                key={value.id}
                onClick={() => {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setActiveValue(index)
                    setIsAnimating(false)
                  }, 300)
                }}
                className={`text-left transition-all duration-300 w-full ${
                  index === activeValue ? "text-[#0E0F11]" : "text-[#9AA1A9] hover:text-[#0E0F11]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[18px] font-mono transition-all duration-300 ${
                      index === activeValue ? "font-bold" : "font-normal"
                    }`}
                  >
                    0{value.id}
                  </span>
                  <div
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      index === activeValue ? "bg-white px-4 py-2 rounded-full shadow-sm border border-[#E3E6EA]" : ""
                    }`}
                  >
                    <span
                      className={`transition-all duration-300 text-[18px] ${
                        index === activeValue ? "font-bold" : "font-normal"
                      }`}
                    >
                      {value.name}
                    </span>
                    {index === activeValue && (
                      <div className="w-4 h-4 bg-[#0E0F11] rounded-full flex items-center justify-center">
                        <HelpCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-16">
          <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center border border-[#E3E6EA]/50 backdrop-blur-sm">
            <span className="text-[#9AA1A9] text-xl transform rotate-45">↗</span>
          </div>
        </div>
      </div>
    </section>
  )
}
