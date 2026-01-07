'use client'

import { useState, useEffect } from 'react'
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/card/Card'
import Button from '@/components/ui/button/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MessageCircle, Heart, Share2, TrendingUp, Users,
  PlusCircle, Search, Baby, Bookmark,
  BookOpen, Camera, Award, Pin, Send, X, ChevronDown, ChevronUp
} from 'lucide-react'
import {
  communityManager,
  CommunityPost,
  CommunityGroup,
  PostCategory
} from '@/lib/community'
import { usePregnancy } from '@/components/providers'

export default function CommunityPage() {
  const { pregnancyInfo } = usePregnancy()
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [groups, setGroups] = useState<CommunityGroup[]>([])
  const [popularTags, setPopularTags] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<'all' | PostCategory>('all')
  const [selectedTab, setSelectedTab] = useState<'posts' | 'groups' | 'tags'>('posts')
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState<PostCategory>('tip')

  // 댓글 관련 상태
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null)
  const [commentContent, setCommentContent] = useState('')
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())

  useEffect(() => {
    // 초기 데이터 로드
    setPosts(communityManager.getPosts())
    setGroups(communityManager.getGroups())
    setPopularTags(communityManager.getPopularTags())
  }, [])

  const handleLike = (postId: string) => {
    communityManager.toggleLike(postId)
    setPosts(communityManager.getPosts())
  }

  const handleBookmark = (postId: string) => {
    communityManager.toggleBookmark(postId)
    setPosts(communityManager.getPosts())
  }

  const handleJoinGroup = (groupId: string) => {
    communityManager.toggleGroupMembership(groupId)
    setGroups(communityManager.getGroups())
  }

  // 댓글 추가
  const handleAddComment = (postId: string) => {
    if (commentContent.trim()) {
      communityManager.addComment(postId, {
        authorId: 'currentUser',
        authorName: '나',
        content: commentContent
      })
      setPosts(communityManager.getPosts())
      setCommentContent('')
      setActiveCommentPostId(null)
      // 댓글 추가 후 해당 게시물의 댓글 펼치기
      setExpandedComments(prev => new Set(prev).add(postId))
    }
  }

  // 댓글 좋아요
  const handleCommentLike = (postId: string, commentId: string) => {
    communityManager.toggleCommentLike(postId, commentId)
    setPosts(communityManager.getPosts())
  }

  // 댓글 펼치기/접기 토글
  const toggleCommentExpand = (postId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      communityManager.createPost({
        authorId: 'currentUser',
        authorName: '나',
        authorWeek: pregnancyInfo.currentWeek,
        title: newPostContent.split('\n')[0].slice(0, 50),
        content: newPostContent,
        category: newPostCategory,
        tags: [],
        isLiked: false,
        isBookmarked: false
      })
      setPosts(communityManager.getPosts())
      setNewPostContent('')
      setShowNewPost(false)
    }
  }

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const popularTopics = [
    [
  { name: '입덧 관리', count: 245, trend: '+12%' },
  { name: '임신 운동', count: 189, trend: '+8%' },
  { name: '영양 식단', count: 167, trend: '+15%' },
  { name: '출산 준비', count: 143, trend: '+5%' },
  { name: '태교 방법', count: 128, trend: '+10%' },
  { name: '병원 후기', count: 112, trend: '+3%' }
]

  ]

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'all': return '전체'
      case 'question': return '질문'
      case 'tip': return '팁'
      case 'story': return '일상'
      case 'recipe': return '레시피'
      default: return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'question': return 'bg-blue-100 text-blue-700'
      case 'tip': return 'bg-green-100 text-green-700'
      case 'experience': return 'bg-purple-100 text-purple-700'
      case 'recipe': return 'bg-orange-100 text-orange-700'
      case 'review': return 'bg-pink-100 text-pink-700'
      case 'announcement': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diff < 60) return '방금 전'
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
    return `${Math.floor(diff / 86400)}일 전`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">커뮤니티</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">예비 엄마들과 함께 나누는 소중한 경험</p>
        </div>
        <div className="flex gap-2">
          <Button icon={<Search className="w-4 h-4" />} variant="outline">
            검색
          </Button>
          <Button 
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => setShowNewPost(!showNewPost)}
          >
            글 쓰기
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            {(['posts', 'groups', 'tags'] as const).map((tab) => (
              <Button
                key={tab}
                variant={selectedTab === tab ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedTab(tab)}
              >
                {tab === 'posts' ? '게시글' : tab === 'groups' ? '모임' : '인기 태그'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedTab === 'posts' && (
        <>
          {/* New Post Form */}
          {showNewPost && (
            <Card className="border-pink-200 dark:border-pink-900 bg-pink-50 dark:bg-pink-950/50">
              <CardContent className="p-4">
                <textarea
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  rows={4}
                  placeholder="예비맘들과 나누고 싶은 이야기를 적어주세요..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <div className="flex justify-between items-center mt-3">
                  <select
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as PostCategory)}
                  >
                    <option value="question">질문</option>
                    <option value="tip">팁</option>
                    <option value="recipe">레시피</option>
                    <option value="experience">경험</option>
                    <option value="review">리뷰</option>
                  </select>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowNewPost(false)}>
                      취소
                    </Button>
                    <Button onClick={handleCreatePost}>
                      게시하기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {(['all', 'question', 'tip', 'recipe', 'experience', 'review'] as const).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category as any)}
                  >
                    {getCategoryLabel(category)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback className="bg-pink-100 text-pink-600">
                          {post.authorName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{post.authorName}</span>
                          {post.authorWeek && (
                            <span className="text-sm text-pink-600 dark:text-pink-400">
                              {post.authorWeek}주차
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">{getTimeAgo(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {getCategoryLabel(post.category)}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{post.content}</p>
                    {post.images && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {post.images.map((image, index) => (
                          <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 text-sm ${post.isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'} hover:text-red-500`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button
                        onClick={() => toggleCommentExpand(post.id)}
                        className={`flex items-center gap-2 text-sm ${expandedComments.has(post.id) ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} hover:text-blue-500`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.length}</span>
                        {post.comments.length > 0 && (
                          expandedComments.has(post.id)
                            ? <ChevronUp className="w-3 h-3" />
                            : <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className={`flex items-center gap-2 text-sm ${post.isBookmarked ? 'text-yellow-500' : 'text-gray-500 dark:text-gray-400'} hover:text-yellow-500`}
                      >
                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <Button
                      variant={activeCommentPostId === post.id ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => {
                        if (activeCommentPostId === post.id) {
                          setActiveCommentPostId(null)
                          setCommentContent('')
                        } else {
                          setActiveCommentPostId(post.id)
                        }
                      }}
                    >
                      {activeCommentPostId === post.id ? '취소' : '답글 달기'}
                    </Button>
                  </div>

                  {/* Comment Input */}
                  {activeCommentPostId === post.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-pink-100 text-pink-600 text-sm">나</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="댓글을 입력하세요..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleAddComment(post.id)
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                            disabled={!commentContent.trim()}
                            className="rounded-full px-3"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comments Section */}
                  {expandedComments.has(post.id) && post.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        댓글 {post.comments.length}개
                      </h4>
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={comment.authorAvatar} />
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                              {comment.authorName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                  {comment.authorName}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {getTimeAgo(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                            </div>
                            <button
                              onClick={() => handleCommentLike(post.id, comment.id)}
                              className={`mt-1 flex items-center gap-1 text-xs ${
                                comment.isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                              } hover:text-red-500`}
                            >
                              <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                              <span>{comment.likes > 0 ? comment.likes : '좋아요'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{group.name}</h3>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{group.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {group.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{group.memberCount}명 참여중</span>
                  <Button 
                    variant={group.isJoined ? "outline" : "primary"}
                    size="sm"
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    {group.isJoined ? '나가기' : '가입하기'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === 'tags' && (
        <Card>
          <CardHeader>
            <CardTitle>인기 태그</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {popularTags.map((tag, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/50 dark:to-purple-900/50 text-pink-700 dark:text-pink-300 rounded-full hover:shadow-md transition-all"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 작업</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Baby className="w-6 h-6" />
              <span className="text-sm">임신 일기</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm">육아 정보</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">동기 모임</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Award className="w-6 h-6" />
              <span className="text-sm">전문가 상담</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}