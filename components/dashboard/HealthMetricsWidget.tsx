'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export function HealthMetricsWidget() {
  // Sample data for mini charts
  const weightData = [
    { day: '월', value: 62.1 },
    { day: '화', value: 62.3 },
    { day: '수', value: 62.5 },
    { day: '목', value: 62.4 },
    { day: '금', value: 62.6 },
    { day: '토', value: 62.8 },
    { day: '일', value: 63.0 },
  ]

  const bloodSugarData = [
    { time: '6시', value: 85 },
    { time: '9시', value: 120 },
    { time: '12시', value: 95 },
    { time: '15시', value: 110 },
    { time: '18시', value: 90 },
    { time: '21시', value: 105 },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-2xl">❤️</span>
          <span className="text-gray-900 dark:text-gray-100">건강 지표</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weight tracking */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">체중 변화</span>
            <span className="text-sm text-green-600 dark:text-green-400">+0.2kg (주간)</span>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                />
                <XAxis dataKey="day" hide />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center">
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">63.0kg</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">오늘</span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          {/* Blood sugar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">혈당 (오늘)</span>
              <span className="text-sm text-blue-600 dark:text-blue-400">평균 96 mg/dL</span>
            </div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodSugarData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[70, 140]} hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>정상 범위</span>
              <span>70-140 mg/dL</span>
            </div>
          </div>
        </div>

        {/* Activity summary */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">6,234</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">걸음수</div>
            </div>
            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">7.2h</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">수면시간</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}