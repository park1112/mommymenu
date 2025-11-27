'use client'

import * as React from 'react'
import { useDevice } from '@/hooks/useDevice'
import MobileLayout from './MobileLayout'
import DesktopLayout from './DesktopLayout'

interface AdaptiveLayoutProps {
  children: React.ReactNode
}

export default function AdaptiveLayout({ children }: AdaptiveLayoutProps) {
  const { isMobile, isTablet } = useDevice()
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // For SSR, always render desktop layout initially to prevent hydration mismatch
  // After client mount, render the appropriate layout
  if (!isClient) {
    return <DesktopLayout>{children}</DesktopLayout>
  }

  // Use mobile layout for mobile and tablet devices
  if (isMobile || isTablet) {
    return <MobileLayout>{children}</MobileLayout>
  }

  // Use desktop layout for larger screens
  return <DesktopLayout>{children}</DesktopLayout>
}