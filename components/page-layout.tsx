"use client"

import { ReactNode } from "react"
import MobileNav from "./mobile-nav"
import StickySwitch from "./sticky-switch"

interface PageLayoutProps {
  children: ReactNode
  showBackButton?: boolean
  showSolutionsButton?: boolean
  showValuesButton?: boolean
  showStickySwitch?: boolean
  stickySwitchClassName?: string
  onScrollToSection?: (sectionId: string) => void
  onScrollToTop?: () => void
}

export default function PageLayout({
  children,
  showBackButton = false,
  showSolutionsButton = false,
  showValuesButton = false,
  showStickySwitch = false,
  stickySwitchClassName = "",
  onScrollToSection,
  onScrollToTop
}: PageLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF8F3" }}>
      {/* Mobile Navigation */}
      <MobileNav 
        onScrollToSection={onScrollToSection}
        onScrollToTop={onScrollToTop}
        showBackButton={showBackButton}
        showSolutionsButton={showSolutionsButton}
        showValuesButton={showValuesButton}
      />

      {/* Sticky Switch */}
      {showStickySwitch && (
        <StickySwitch className={stickySwitchClassName} />
      )}

      {/* Page Content */}
      {children}
    </div>
  )
}
