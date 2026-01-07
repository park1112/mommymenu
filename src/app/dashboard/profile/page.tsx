'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Edit3, Camera, Baby, Calendar, Heart, TrendingUp,
  Award, Target, BookOpen, Settings, Bell, Shield,
  MapPin, Phone, Mail, User, Scale, Activity, Check, X,
  Link, Image as ImageIcon
} from 'lucide-react'

interface HealthMetric {
  label: string
  value: string
  date: string
  status: 'normal' | 'warning' | 'good'
  icon: any
}

const healthMetrics: HealthMetric[] = [
  { label: '체중', value: '65.2kg', date: '오늘', status: 'normal', icon: Scale },
  { label: '혈압', value: '120/80', date: '3일 전', status: 'good', icon: Activity },
  { label: '혈당', value: '95mg/dL', date: '1주 전', status: 'normal', icon: Target },
  { label: '철분', value: '12.5g/dL', date: '2주 전', status: 'warning', icon: Heart }
]

const achievements = [
  { title: '첫 달 완주', description: '30일 연속 영양 기록', date: '2024.02.15', icon: Calendar },
  { title: '균형 잡힌 식단', description: '모든 영양소 목표 달성', date: '2024.03.01', icon: Target },
  { title: '커뮤니티 활동가', description: '10개 이상 게시글 작성', date: '2024.03.10', icon: BookOpen },
  { title: '건강 관리왕', description: '모든 건강 지표 정상 유지', date: '2024.03.15', icon: Award }
]

const pregnancyProgress = {
  currentWeek: 23,
  currentDay: 3,
  totalWeeks: 40,
  dueDate: '2024-12-25',
  conception: '2024-03-30'
}

const defaultProfile = {
  name: '김임산',
  email: 'pregnant@example.com',
  phone: '010-1234-5678',
  address: '서울시 강남구',
  dueDate: '2024-12-25',
  hospital: '서울대병원',
  doctor: '김산부 교수',
  emergencyContact: '010-9876-5432',
  allergies: '견과류, 해산물',
  medicalHistory: '특이사항 없음',
  avatarUrl: ''
}

const defaultNotifications = {
  meals: true,
  exercise: false,
  checkup: true,
  community: true
}

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [profile, setProfile] = useState(defaultProfile)
  const [notifications, setNotifications] = useState(defaultNotifications)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [avatarUrlInput, setAvatarUrlInput] = useState('')
  const [avatarPreviewError, setAvatarPreviewError] = useState(false)

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('mommymenu-profile')
    const savedNotifications = localStorage.getItem('mommymenu-notifications')

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile))
      } catch (e) {
        console.error('Failed to parse saved profile:', e)
      }
    }

    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications))
      } catch (e) {
        console.error('Failed to parse saved notifications:', e)
      }
    }

    setIsLoaded(true)
  }, [])

  // Save notifications to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mommymenu-notifications', JSON.stringify(notifications))
    }
  }, [notifications, isLoaded])

  const progressPercentage = ((pregnancyProgress.currentWeek * 7 + pregnancyProgress.currentDay) / (pregnancyProgress.totalWeeks * 7)) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'warning': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'normal': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate save delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    // Save to localStorage
    localStorage.setItem('mommymenu-profile', JSON.stringify(profile))

    setIsSaving(false)
    setIsEditing(false)
    setShowSaveSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const handleCancel = () => {
    // Restore from localStorage
    const savedProfile = localStorage.getItem('mommymenu-profile')
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile))
      } catch (e) {
        setProfile(defaultProfile)
      }
    }
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Save Success Toast */}
      {showSaveSuccess && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-in slide-in-from-top-2">
          <Check className="w-5 h-5" />
          <span>프로필이 저장되었습니다</span>
          <button onClick={() => setShowSaveSuccess(false)} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Avatar URL Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-pink-500" />
                프로필 이미지 설정
              </CardTitle>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview */}
              <div className="flex justify-center">
                <Avatar className="h-32 w-32 border-4 border-pink-100 dark:border-pink-900">
                  {avatarUrlInput && !avatarPreviewError ? (
                    <AvatarImage
                      src={avatarUrlInput}
                      onError={() => setAvatarPreviewError(true)}
                    />
                  ) : null}
                  <AvatarFallback className="bg-pink-100 text-pink-600 text-4xl">
                    {profile.name?.[0] || '김'}
                  </AvatarFallback>
                </Avatar>
              </div>

              {avatarPreviewError && avatarUrlInput && (
                <p className="text-center text-sm text-red-500">
                  이미지를 불러올 수 없습니다. URL을 확인해주세요.
                </p>
              )}

              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  이미지 URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={avatarUrlInput}
                      onChange={(e) => {
                        setAvatarUrlInput(e.target.value)
                        setAvatarPreviewError(false)
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  인터넷에서 이미지 주소를 복사하여 붙여넣으세요
                </p>
              </div>

              {/* Sample Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  샘플 이미지
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=mom1&backgroundColor=ffd5dc',
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=mom2&backgroundColor=ffd5dc',
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=mom3&backgroundColor=ffd5dc',
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=mom4&backgroundColor=ffd5dc',
                  ].map((url, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setAvatarUrlInput(url)
                        setAvatarPreviewError(false)
                      }}
                      className={`p-1 rounded-lg border-2 transition-colors ${
                        avatarUrlInput === url
                          ? 'border-pink-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`샘플 ${index + 1}`}
                        className="w-full h-auto rounded"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setAvatarUrlInput('')
                    setAvatarPreviewError(false)
                  }}
                >
                  초기화
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    setProfile(prev => ({ ...prev, avatarUrl: avatarUrlInput }))
                    localStorage.setItem('mommymenu-profile', JSON.stringify({
                      ...profile,
                      avatarUrl: avatarUrlInput
                    }))
                    setShowAvatarModal(false)
                    setShowSaveSuccess(true)
                    setTimeout(() => setShowSaveSuccess(false), 3000)
                  }}
                  disabled={avatarPreviewError}
                >
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">내 프로필</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">임신 여정과 건강 정보를 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <Button
            icon={<Settings className="w-4 h-4" />}
            variant="outline"
            onClick={() => router.push('/dashboard/settings')}
          >
            설정
          </Button>
          <Button
            icon={<Edit3 className="w-4 h-4" />}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            loading={isSaving}
          >
            {isEditing ? '저장' : '편집'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-pink-500" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatarUrl || undefined} />
                    <AvatarFallback className="bg-pink-100 text-pink-600 text-2xl">
                      {profile.name?.[0] || '김'}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => {
                      setAvatarUrlInput(profile.avatarUrl || '')
                      setAvatarPreviewError(false)
                      setShowAvatarModal(true)
                    }}
                    className="absolute -bottom-1 -right-1 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
                    title="프로필 이미지 변경"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="이름"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                      <Input
                        label="이메일"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                      <Input
                        label="전화번호"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                      <Input
                        label="주소"
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">{profile.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{profile.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                의료 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="출산예정일"
                    type="date"
                    value={profile.dueDate}
                    onChange={(e) => setProfile({...profile, dueDate: e.target.value})}
                  />
                  <Input
                    label="병원"
                    value={profile.hospital}
                    onChange={(e) => setProfile({...profile, hospital: e.target.value})}
                  />
                  <Input
                    label="담당의"
                    value={profile.doctor}
                    onChange={(e) => setProfile({...profile, doctor: e.target.value})}
                  />
                  <Input
                    label="비상연락처"
                    value={profile.emergencyContact}
                    onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                  />
                  <Input
                    label="알레르기"
                    value={profile.allergies}
                    onChange={(e) => setProfile({...profile, allergies: e.target.value})}
                  />
                  <Input
                    label="기존 병력"
                    value={profile.medicalHistory}
                    onChange={(e) => setProfile({...profile, medicalHistory: e.target.value})}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">출산예정일</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{profile.dueDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">병원</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{profile.hospital}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">담당의</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{profile.doctor}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">비상연락처</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{profile.emergencyContact}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">알레르기</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{profile.allergies}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">기존 병력</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{profile.medicalHistory}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Health Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                건강 지표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthMetrics.map((metric, index) => {
                  const IconComponent = metric.icon
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{metric.label}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{metric.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{metric.value}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(metric.status)}`}>
                          {metric.status === 'good' ? '좋음' : metric.status === 'warning' ? '주의' : '정상'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                달성 뱃지
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                        <IconComponent className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pregnancy Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-pink-500" />
                임신 진행 상황
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                  {pregnancyProgress.currentWeek}주 {pregnancyProgress.currentDay}일
                </div>
                <p className="text-gray-600 dark:text-gray-400">임신 진행률</p>
              </div>

              <Progress value={progressPercentage} className="h-3" />

              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{Math.round(progressPercentage)}% 완료</span>
                <span>D-{Math.ceil((new Date(pregnancyProgress.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}일</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">예정일</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{pregnancyProgress.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">착상일</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{pregnancyProgress.conception}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                활동 통계
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">총 영양 기록</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">89일</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">커뮤니티 게시글</span>
                <span className="font-semibold text-green-600 dark:text-green-400">12개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">달성한 목표</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">24개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">전문가 상담</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">3회</span>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                알림 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">식사 알림</span>
                <button
                  onClick={() => toggleNotification('meals')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.meals ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.meals ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">운동 알림</span>
                <button
                  onClick={() => toggleNotification('exercise')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.exercise ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.exercise ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">검진 알림</span>
                <button
                  onClick={() => toggleNotification('checkup')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.checkup ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.checkup ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">커뮤니티 알림</span>
                <button
                  onClick={() => toggleNotification('community')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.community ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.community ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleSave} loading={isSaving}>
            저장하기
          </Button>
        </div>
      )}
    </div>
  )
}