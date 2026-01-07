'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import { Progress } from '@/components/ui/progress'
import { getRecipeById, useFavorites } from '@/components/providers'
import {
  ArrowLeft, Heart, Clock, ChefHat, Users, Star,
  Flame, Beef, Wheat, Droplets, Leaf, AlertTriangle,
  CheckCircle, Share2, Printer, BookmarkPlus, Copy, Check
} from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function RecipeDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [showShareToast, setShowShareToast] = useState(false)

  const recipe = getRecipeById(resolvedParams.id)

  // 공유 기능
  const handleShare = async () => {
    const shareData = {
      title: recipe?.name || '맘미메뉴 레시피',
      text: recipe?.description || '임산부를 위한 건강한 레시피',
      url: window.location.href
    }

    if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // 공유 취소시 무시
      }
    } else {
      // 클립보드에 URL 복사
      await navigator.clipboard.writeText(window.location.href)
      setShowShareToast(true)
      setTimeout(() => setShowShareToast(false), 2000)
    }
  }

  // 인쇄 기능
  const handlePrint = () => {
    window.print()
  }

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          레시피를 찾을 수 없습니다
        </h1>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
      </div>
    )
  }

  const isLiked = isFavorite(recipe.id)

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움'
      case 'medium': return '보통'
      case 'hard': return '어려움'
      default: return difficulty
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'hard': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const getMealTypeLabel = (type: string) => {
    switch (type) {
      case 'breakfast': return '아침'
      case 'lunch': return '점심'
      case 'dinner': return '저녁'
      case 'snack': return '간식'
      default: return type
    }
  }

  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <div className="space-y-6 max-w-4xl mx-auto print:max-w-none">
      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg shadow-lg print:hidden">
          <Check className="w-5 h-5" />
          <span>링크가 복사되었습니다</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} title="공유하기">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint} title="인쇄하기">
            <Printer className="w-4 h-4" />
          </Button>
          <Button
            variant={isLiked ? 'primary' : 'outline'}
            size="sm"
            onClick={() => toggleFavorite(recipe.id)}
            className={isLiked ? 'bg-pink-500 hover:bg-pink-600' : ''}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Main Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Placeholder */}
            <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-900/30 dark:to-rose-900/20 rounded-xl flex items-center justify-center">
              <ChefHat className="w-16 h-16 text-pink-400 dark:text-pink-500" />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs rounded-full">
                    {getMealTypeLabel(recipe.mealType)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                    {getDifficultyLabel(recipe.difficulty)}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {recipe.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {recipe.description}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>총 {totalTime}분</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings}인분</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{recipe.rating} ({recipe.reviewCount})</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Favorite Button - Large */}
              <Button
                onClick={() => toggleFavorite(recipe.id)}
                className={`w-full md:w-auto ${
                  isLiked
                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? '찜한 레시피' : '찜하기'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            영양 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Nutrients */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {recipe.nutrients.calories}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">칼로리 (kcal)</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Beef className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {recipe.nutrients.protein}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">단백질</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <Wheat className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {recipe.nutrients.carbs}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">탄수화물</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Droplets className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {recipe.nutrients.fat}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">지방</div>
            </div>
          </div>

          {/* Additional Nutrients */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">식이섬유</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{recipe.nutrients.fiber}g</span>
            </div>
            {recipe.nutrients.folate && (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-sm text-green-700 dark:text-green-400">엽산</span>
                <span className="font-semibold text-green-700 dark:text-green-400">{recipe.nutrients.folate}mcg</span>
              </div>
            )}
            {recipe.nutrients.iron && (
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-sm text-red-700 dark:text-red-400">철분</span>
                <span className="font-semibold text-red-700 dark:text-red-400">{recipe.nutrients.iron}mg</span>
              </div>
            )}
            {recipe.nutrients.calcium && (
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-sm text-blue-700 dark:text-blue-400">칼슘</span>
                <span className="font-semibold text-blue-700 dark:text-blue-400">{recipe.nutrients.calcium}mg</span>
              </div>
            )}
            {recipe.nutrients.omega3 && (
              <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <span className="text-sm text-teal-700 dark:text-teal-400">오메가3</span>
                <span className="font-semibold text-teal-700 dark:text-teal-400">{recipe.nutrients.omega3}mg</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pregnancy Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-500" />
            임신 중 효능
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recipe.pregnancyBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cautions */}
      {recipe.cautions && recipe.cautions.length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
              <AlertTriangle className="w-5 h-5" />
              주의사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recipe.cautions.map((caution, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{caution}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookmarkPlus className="w-5 h-5 text-pink-500" />
            재료 ({recipe.servings}인분)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {ingredient.name}
                  {ingredient.notes && (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      ({ingredient.notes})
                    </span>
                  )}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cooking Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-orange-500" />
            조리 순서
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-gray-900 dark:text-gray-100">{step.instruction}</p>
                  {step.duration && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}분</span>
                    </div>
                  )}
                  {step.tip && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                      💡 {step.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Author & Date */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pb-6">
        {recipe.author && <span>레시피 제공: {recipe.author}</span>}
        <span>등록일: {recipe.createdAt}</span>
      </div>
    </div>
  )
}
