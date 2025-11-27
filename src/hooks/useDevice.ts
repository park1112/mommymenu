'use client'

import { useState, useEffect } from 'react'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  deviceType: DeviceType
  screenWidth: number
  screenHeight: number
  isTouchDevice: boolean
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceType: 'desktop',
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 1080,
    isTouchDevice: false
  })

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      let deviceType: DeviceType = 'desktop'
      let isMobile = false
      let isTablet = false
      let isDesktop = false

      if (width < 640) {
        deviceType = 'mobile'
        isMobile = true
      } else if (width < 1024) {
        deviceType = 'tablet'
        isTablet = true
      } else {
        deviceType = 'desktop'
        isDesktop = true
      }

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        screenWidth: width,
        screenHeight: height,
        isTouchDevice
      })
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return deviceInfo
}