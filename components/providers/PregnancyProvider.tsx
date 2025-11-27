'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface PregnancyInfo {
  dueDate: string
  lastMenstrualPeriod: string
  currentWeek: number
  currentDay: number
  trimester: 1 | 2 | 3
  conceptionDate: string
}

interface BabyDevelopment {
  week: number
  size: {
    length: string
    weight: string
    comparison: string
  }
  development: string[]
  nextMilestones: string[]
}

interface MaternalHealth {
  weightGain: number
  targetWeightGain: { min: number; max: number }
  bloodPressure?: { systolic: number; diastolic: number; date: string }
  bloodSugar?: { level: number; date: string }
  ironLevel?: { level: number; date: string }
}

interface Appointments {
  id: string
  type: 'checkup' | 'ultrasound' | 'test' | 'consultation'
  date: string
  doctor: string
  hospital: string
  notes?: string
  completed: boolean
}

interface PregnancyContextType {
  pregnancyInfo: PregnancyInfo
  babyDevelopment: BabyDevelopment
  maternalHealth: MaternalHealth
  upcomingAppointments: Appointments[]
  
  // Actions
  updatePregnancyInfo: (info: Partial<PregnancyInfo>) => void
  updateMaternalHealth: (health: Partial<MaternalHealth>) => void
  addAppointment: (appointment: Omit<Appointments, 'id'>) => void
  updateAppointment: (id: string, updates: Partial<Appointments>) => void
  deleteAppointment: (id: string) => void
  
  // Computed values
  getDaysUntilDue: () => number
  getProgressPercentage: () => number
  getCurrentTrimesterInfo: () => { name: string; weeks: string; description: string }
  getWeightGainStatus: () => 'under' | 'normal' | 'over'
  
  isLoading: boolean
  error: string | null
}

const PregnancyContext = createContext<PregnancyContextType | undefined>(undefined)

export function PregnancyProvider({ children }: { children: ReactNode }) {
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyInfo>({
    dueDate: '2024-12-25',
    lastMenstrualPeriod: '2024-03-30',
    currentWeek: 23,
    currentDay: 3,
    trimester: 2,
    conceptionDate: '2024-04-13'
  })

  const [maternalHealth, setMaternalHealth] = useState<MaternalHealth>({
    weightGain: 5.2,
    targetWeightGain: { min: 11.5, max: 16 },
    bloodPressure: { systolic: 120, diastolic: 80, date: '2024-09-08' },
    bloodSugar: { level: 95, date: '2024-09-01' },
    ironLevel: { level: 12.5, date: '2024-08-28' }
  })

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointments[]>([
    {
      id: '1',
      type: 'checkup',
      date: '2024-09-15',
      doctor: '김산부 교수',
      hospital: '서울대병원',
      notes: '정기검진 + 혈액검사',
      completed: false
    },
    {
      id: '2',
      type: 'ultrasound',
      date: '2024-09-22',
      doctor: '김산부 교수',
      hospital: '서울대병원',
      notes: '24주 정밀초음파',
      completed: false
    }
  ])

  const [babyDevelopment, setBabyDevelopment] = useState<BabyDevelopment>({
    week: 23,
    size: {
      length: '28.9cm',
      weight: '501g',
      comparison: '망고'
    },
    development: [
      '청각이 발달하여 엄마 목소리를 들을 수 있어요',
      '피부가 붉고 투명하지만 서서히 불투명해지고 있어요',
      '손톱과 발톱이 자라기 시작해요',
      '뇌 발달이 활발하게 진행되고 있어요'
    ],
    nextMilestones: [
      '24주: 생존 가능성 증가',
      '25주: 폐 발달 가속화',
      '26주: 눈꺼풀이 열리기 시작',
      '27주: 2삼분기 마지막 주'
    ]
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-calculate current week and trimester based on due date
  useEffect(() => {
    const updatePregnancyData = () => {
      const dueDate = new Date(pregnancyInfo.dueDate)
      const today = new Date()
      const totalDays = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      const totalWeeks = 40
      const remainingWeeks = Math.ceil(totalDays / 7)
      const currentWeek = totalWeeks - remainingWeeks
      const currentDay = 7 - (totalDays % 7)
      
      let trimester: 1 | 2 | 3 = 1
      if (currentWeek >= 14 && currentWeek <= 27) trimester = 2
      else if (currentWeek >= 28) trimester = 3

      setPregnancyInfo(prev => ({
        ...prev,
        currentWeek: Math.max(1, currentWeek),
        currentDay: Math.max(1, Math.min(7, currentDay)),
        trimester
      }))

      // Update baby development based on current week
      setBabyDevelopment(prev => ({
        ...prev,
        week: Math.max(1, currentWeek)
      }))
    }

    updatePregnancyData()
    const interval = setInterval(updatePregnancyData, 24 * 60 * 60 * 1000) // Update daily

    return () => clearInterval(interval)
  }, [pregnancyInfo.dueDate])

  const updatePregnancyInfo = (info: Partial<PregnancyInfo>) => {
    setPregnancyInfo(prev => ({ ...prev, ...info }))
  }

  const updateMaternalHealth = (health: Partial<MaternalHealth>) => {
    setMaternalHealth(prev => ({ ...prev, ...health }))
  }

  const addAppointment = (appointment: Omit<Appointments, 'id'>) => {
    const newAppointment: Appointments = {
      ...appointment,
      id: Date.now().toString()
    }
    setUpcomingAppointments(prev => [...prev, newAppointment])
  }

  const updateAppointment = (id: string, updates: Partial<Appointments>) => {
    setUpcomingAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
    )
  }

  const deleteAppointment = (id: string) => {
    setUpcomingAppointments(prev => prev.filter(apt => apt.id !== id))
  }

  const getDaysUntilDue = () => {
    const dueDate = new Date(pregnancyInfo.dueDate)
    const today = new Date()
    return Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  const getProgressPercentage = () => {
    const totalWeeks = 40
    const currentProgress = pregnancyInfo.currentWeek * 7 + pregnancyInfo.currentDay
    const totalDays = totalWeeks * 7
    return Math.min((currentProgress / totalDays) * 100, 100)
  }

  const getCurrentTrimesterInfo = () => {
    switch (pregnancyInfo.trimester) {
      case 1:
        return {
          name: '1삼분기',
          weeks: '1-13주',
          description: '초기 임신 단계로 태아의 주요 기관이 형성되는 중요한 시기입니다.'
        }
      case 2:
        return {
          name: '2삼분기',
          weeks: '14-27주',
          description: '안정기로 접어들어 입덧이 줄어들고 태아의 움직임을 느낄 수 있는 시기입니다.'
        }
      case 3:
        return {
          name: '3삼분기',
          weeks: '28-40주',
          description: '출산 준비 시기로 태아가 빠르게 성장하며 출산을 위한 준비를 하는 시기입니다.'
        }
    }
  }

  const getWeightGainStatus = (): 'under' | 'normal' | 'over' => {
    if (maternalHealth.weightGain < maternalHealth.targetWeightGain.min) return 'under'
    if (maternalHealth.weightGain > maternalHealth.targetWeightGain.max) return 'over'
    return 'normal'
  }

  const value = {
    pregnancyInfo,
    babyDevelopment,
    maternalHealth,
    upcomingAppointments,
    updatePregnancyInfo,
    updateMaternalHealth,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getDaysUntilDue,
    getProgressPercentage,
    getCurrentTrimesterInfo,
    getWeightGainStatus,
    isLoading,
    error
  }

  return (
    <PregnancyContext.Provider value={value}>
      {children}
    </PregnancyContext.Provider>
  )
}

export function usePregnancy() {
  const context = useContext(PregnancyContext)
  if (context === undefined) {
    throw new Error('usePregnancy must be used within a PregnancyProvider')
  }
  return context
}