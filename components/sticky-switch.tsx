"use client"

import { Home, Building } from "lucide-react"
import { useApp } from "@/contexts/app-context"

interface StickySwitchProps {
  className?: string
}

export default function StickySwitch({ className = "" }: StickySwitchProps) {
  const { userType, setUserType } = useApp()

  return (
    <div className={`fixed top-16 lg:top-20 left-1/2 transform -translate-x-1/2 z-40 ${className}`}>
      <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 px-2 py-1">
        <button
          onClick={() => setUserType("tenant")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            userType === "tenant" 
              ? "text-white shadow-sm" 
              : "text-gray-600 hover:text-gray-800"
          }`}
          style={{
            backgroundColor: userType === "tenant" ? "#14B8A6" : "transparent"
          }}
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Tenant</span>
        </button>
        <button
          onClick={() => setUserType("landlord")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            userType === "landlord" 
              ? "text-white shadow-sm" 
              : "text-gray-600 hover:text-gray-800"
          }`}
          style={{
            backgroundColor: userType === "landlord" ? "#14B8A6" : "transparent"
          }}
        >
          <Building className="w-4 h-4" />
          <span className="text-sm font-medium">Landlord</span>
        </button>
      </div>
    </div>
  )
}
