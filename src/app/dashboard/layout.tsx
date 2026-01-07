'use client'

import { MommyMenuLayout } from '@/components/layout/MommyMenuLayout'
import { AuthProvider, NutritionProvider, PregnancyProvider, RecipeProvider } from '@/components/providers'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <PregnancyProvider>
        <NutritionProvider>
          <RecipeProvider>
            <MommyMenuLayout>{children}</MommyMenuLayout>
          </RecipeProvider>
        </NutritionProvider>
      </PregnancyProvider>
    </AuthProvider>
  )
}