'use client'

import { useState } from 'react'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import Input from '@/components/ui/input/Input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Edit3, Camera, Baby, Calendar, Heart, TrendingUp,
  Award, Target, BookOpen, Settings, Bell, Shield,
  MapPin, Phone, Mail, User, Scale, Activity
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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: '김임산',
    email: 'pregnant@example.com',
    phone: '010-1234-5678',
    address: '서울시 강남구',
    dueDate: '2024-12-25',
    hospital: '서울대병원',
    doctor: '김산부 교수',
    emergencyContact: '010-9876-5432',
    allergies: '견과류, 해산물',
    medicalHistory: '특이사항 없음'
  })

  const progressPercentage = ((pregnancyProgress.currentWeek * 7 + pregnancyProgress.currentDay) / (pregnancyProgress.totalWeeks * 7)) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'normal': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    // TODO: Save profile data
    console.log('Profile saved:', profile)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">내 프로필</h1>
          <p className="text-gray-600 mt-1">임신 여정과 건강 정보를 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <Button icon={<Settings className="w-4 h-4" />} variant="outline">
            설정
          </Button>
          <Button 
            icon={<Edit3 className="w-4 h-4" />}
            onClick={() => setIsEditing(!isEditing)}
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
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-pink-100 text-pink-600 text-2xl">
                      김
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute -bottom-1 -right-1 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
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
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{profile.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{profile.address}</span>
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
                    <span className="text-sm text-gray-500">출산예정일</span>
                    <p className="font-medium">{profile.dueDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">병원</span>
                    <p className="font-medium">{profile.hospital}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">담당의</span>
                    <p className="font-medium">{profile.doctor}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">비상연락처</span>
                    <p className="font-medium">{profile.emergencyContact}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">알레르기</span>
                    <p className="font-medium">{profile.allergies}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">기존 병력</span>
                    <p className="font-medium">{profile.medicalHistory}</p>
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
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">{metric.label}</p>
                          <p className="text-sm text-gray-500">{metric.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{metric.value}</p>
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
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <IconComponent className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
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
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {pregnancyProgress.currentWeek}주 {pregnancyProgress.currentDay}일
                </div>
                <p className="text-gray-600">임신 진행률</p>
              </div>
              
              <Progress value={progressPercentage} className="h-3" />
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>{Math.round(progressPercentage)}% 완료</span>
                <span>D-{Math.ceil((new Date(pregnancyProgress.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}일</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">예정일</span>
                  <span className="text-sm font-medium">{pregnancyProgress.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">착상일</span>
                  <span className="text-sm font-medium">{pregnancyProgress.conception}</span>
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
                <span className="text-gray-600">총 영양 기록</span>
                <span className="font-semibold text-blue-600">89일</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">커뮤니티 게시글</span>
                <span className="font-semibold text-green-600">12개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">달성한 목표</span>
                <span className="font-semibold text-purple-600">24개</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">전문가 상담</span>
                <span className="font-semibold text-orange-600">3회</span>
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
                <span className="text-sm">식사 알림</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-pink-500">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">운동 알림</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">검진 알림</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-pink-500">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">커뮤니티 알림</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-pink-500">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>
            저장하기
          </Button>
        </div>
      )}
    </div>
  )
}