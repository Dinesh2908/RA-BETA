"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HelpCircle, Mail, ArrowLeft, X, Menu, Home, Building } from "lucide-react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"

interface MobileNavProps {
  onScrollToSection?: (sectionId: string) => void
  onScrollToTop?: () => void
  showBackButton?: boolean
  showSolutionsButton?: boolean
  showValuesButton?: boolean
}

export default function MobileNav({ 
  onScrollToSection, 
  onScrollToTop, 
  showBackButton = false,
  showSolutionsButton = false,
  showValuesButton = false
}: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { userType, setUserType, currentPage } = useApp()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavigation = (action: () => void) => {
    action()
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="flex items-center justify-between p-4 bg-white relative lg:hidden">
        {/* Left side - Help button */}
        <div className="flex items-center">
          <button 
            onClick={() => handleNavigation(() => {})}
            className="flex items-center gap-1 text-sm"
          >
            Help <HelpCircle className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button 
            onClick={() => handleNavigation(() => onScrollToTop?.())} 
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/rentaid-logo.png" alt="Rentaid" className="h-12 w-auto" />
          </button>
        </div>

        {/* Right side - Menu button */}
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              {/* Close button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-4">
                {showBackButton && (
                  <button
                    onClick={() => handleNavigation(() => router.push('/'))}
                    className={`w-full flex items-center gap-3 p-4 text-left rounded-lg transition-colors ${
                      currentPage === 'home' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Back to Home</span>
                    {currentPage === 'home' && <div className="w-2 h-2 bg-emerald-500 rounded-full ml-auto"></div>}
                  </button>
                )}

                {showValuesButton && (
                  <button
                    onClick={() => handleNavigation(() => router.push('/values'))}
                    className={`w-full flex items-center gap-3 p-4 text-left rounded-lg transition-colors ${
                      currentPage === 'values' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <span className="font-medium">Values</span>
                    {currentPage === 'values' && <div className="w-2 h-2 bg-emerald-500 rounded-full ml-auto"></div>}
                  </button>
                )}

                {showSolutionsButton && (
                  <button
                    onClick={() => handleNavigation(() => onScrollToSection?.('solutions-section'))}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <span className="font-medium">Solutions</span>
                  </button>
                )}

                <button
                  onClick={() => handleNavigation(() => router.push('/about'))}
                  className={`w-full flex items-center gap-3 p-4 text-left rounded-lg transition-colors ${
                    currentPage === 'about' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">About</span>
                  {currentPage === 'about' && <div className="w-2 h-2 bg-emerald-500 rounded-full ml-auto"></div>}
                </button>

                <button
                  onClick={() => handleNavigation(() => router.push('/stories'))}
                  className={`w-full flex items-center gap-3 p-4 text-left rounded-lg transition-colors ${
                    currentPage === 'stories' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">Stories</span>
                  {currentPage === 'stories' && <div className="w-2 h-2 bg-emerald-500 rounded-full ml-auto"></div>}
                </button>

                <button
                  onClick={() => handleNavigation(() => onScrollToSection?.('waiting-list-section'))}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-medium">Join</span>
                  <span className="text-gray-400">⊕</span>
                </button>

                <button
                  onClick={() => handleNavigation(() => {})}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900 font-medium">Contact</span>
                </button>
              </div>

              {/* User Type Toggle */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">I am a:</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setUserType("tenant")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      userType === "tenant" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Tenant
                  </button>
                  <button 
                    onClick={() => setUserType("landlord")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      userType === "landlord" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    Landlord
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header - Hidden on mobile */}
      <header className="hidden lg:flex items-center justify-between p-4 bg-white relative">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 text-sm">
            Help <HelpCircle className="w-4 h-4 text-gray-400" />
          </button>
          {showValuesButton && (
            <button 
              onClick={() => handleNavigation(() => router.push('/values'))}
              className={`flex items-center gap-1 text-sm transition-opacity ${
                currentPage === 'values' 
                  ? 'text-emerald-600 font-medium' 
                  : 'hover:opacity-80'
              }`}
            >
              Values <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
          )}
          {showSolutionsButton && (
            <button 
              onClick={() => onScrollToSection?.('solutions-section')}
              className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
            >
              Solutions <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
          )}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button onClick={() => onScrollToTop?.()} className="hover:opacity-80 transition-opacity">
            <img src="/rentaid-logo.png" alt="Rentaid" className="h-18 w-auto" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {showBackButton && (
            <button 
              onClick={() => router.push('/')}
              className={`text-sm transition-opacity flex items-center gap-2 ${
                currentPage === 'home' 
                  ? 'text-emerald-600 font-medium' 
                  : 'hover:opacity-80'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          )}
          <button 
            onClick={() => router.push('/about')}
            className={`text-sm transition-opacity ${
              currentPage === 'about' 
                ? 'text-emerald-600 font-medium' 
                : 'hover:opacity-80'
            }`}
          >
            About
          </button>
          <button 
            onClick={() => router.push('/stories')}
            className={`text-sm transition-opacity ${
              currentPage === 'stories' 
                ? 'text-emerald-600 font-medium' 
                : 'hover:opacity-80'
            }`}
          >
            Stories
          </button>
          <button 
            onClick={() => onScrollToSection?.('waiting-list-section')}
            className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
          >
            Join <span className="text-gray-400">⊕</span>
          </button>
        </div>
      </header>
    </>
  )
}
