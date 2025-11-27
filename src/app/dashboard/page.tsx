import { PregnancyStatusWidget } from '@/components/dashboard/PregnancyStatusWidget';
import { MealTimelineWidget } from '@/components/dashboard/MealTimelineWidget';
import { NutritionStatusWidget } from '@/components/dashboard/NutritionStatusWidget';
import { HealthMetricsWidget } from '@/components/dashboard/HealthMetricsWidget';
import { AIRecommendationWidget } from '@/components/dashboard/AIRecommendationWidget';
import { QuickActionsWidget } from '@/components/dashboard/QuickActionsWidget';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-orange-50/30">
      <div className="p-4 lg:p-6 space-y-8">
        {/* Hero Section - Organic Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main pregnancy status - takes more visual weight */}
          <div className="lg:col-span-8 slide-up">
            <PregnancyStatusWidget />
          </div>
          
          {/* Nutrition status - offset positioning */}
          <div className="lg:col-span-4 lg:mt-6 blossom-grow" style={{ animationDelay: '0.2s' }}>
            <NutritionStatusWidget />
          </div>
        </div>

        {/* Meal Timeline - Floating Design */}
        <div className="relative">
          <div className="absolute -top-4 -left-2 w-6 h-6 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full opacity-60 gentle-float" />
          <div className="absolute top-2 -right-4 w-4 h-4 bg-gradient-to-br from-orange-300 to-amber-300 rounded-full opacity-50 gentle-float" style={{ animationDelay: '1s' }} />
          
          <div className="slide-up" style={{ animationDelay: '0.4s' }}>
            <MealTimelineWidget />
          </div>
        </div>

        {/* Secondary Widgets - Organic Masonry-style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Health Metrics - Larger presence */}
          <div className="md:col-span-3 lg:col-span-4 blossom-grow" style={{ animationDelay: '0.6s' }}>
            <HealthMetricsWidget />
          </div>
          
          {/* AI Recommendations - Offset */}
          <div className="md:col-span-3 lg:col-span-5 md:mt-8 lg:mt-4 slide-up" style={{ animationDelay: '0.8s' }}>
            <AIRecommendationWidget />
          </div>
          
          {/* Quick Actions - Small but prominent */}
          <div className="md:col-span-3 lg:col-span-3 md:col-start-2 lg:col-start-10 lg:-mt-4 blossom-grow" style={{ animationDelay: '1s' }}>
            <QuickActionsWidget />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="relative">
          {/* Organic floating decorations */}
          <div className="absolute top-20 left-16 w-2 h-2 bg-pink-300 rounded-full opacity-40 gentle-float" />
          <div className="absolute top-40 right-32 w-3 h-3 bg-rose-300 rounded-full opacity-30 gentle-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-50 gentle-float" style={{ animationDelay: '3s' }} />
          
          {/* Breathing space for visual rhythm */}
          <div className="h-16" />
        </div>
      </div>
    </div>
  );
}