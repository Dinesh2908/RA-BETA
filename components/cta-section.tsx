"use client"

import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface CTASectionProps {
  title: ReactNode
  buttonText: string
  onButtonClick: () => void
  className?: string
}

export default function CTASection({ 
  title, 
  buttonText, 
  onButtonClick, 
  className = "bg-emerald-700 text-white px-4 py-16" 
}: CTASectionProps) {
  return (
    <section className={className}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-bold">
            {title}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <Button 
            onClick={onButtonClick}
            className="bg-white text-emerald-700 hover:bg-gray-100 rounded-full px-8 py-3 font-medium"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  )
}
