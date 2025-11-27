'use client'

import { MommyMenuLayout } from '@/components/layout/MommyMenuLayout'
import { AuthProvider, NutritionProvider, PregnancyProvider } from '@/components/providers'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <PregnancyProvider>
        <NutritionProvider>
          <MommyMenuLayout>{children}</MommyMenuLayout>
        </NutritionProvider>
      </PregnancyProvider>
    </AuthProvider>
  )
}