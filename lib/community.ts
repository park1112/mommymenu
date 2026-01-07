// 커뮤니티 기능
export interface CommunityPost {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  authorWeek: number
  title: string
  content: string
  category: PostCategory
  tags: string[]
  images?: string[]
  likes: number
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
  isLiked?: boolean
  isBookmarked?: boolean
}

export interface Comment {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  likes: number
  createdAt: Date
  isLiked?: boolean
  replies?: Comment[]
}

export interface CommunityGroup {
  id: string
  name: string
  description: string
  category: GroupCategory
  memberCount: number
  isJoined: boolean
  coverImage?: string
  tags: string[]
}

export type PostCategory = 
  | 'question' 
  | 'tip' 
  | 'recipe' 
  | 'experience' 
  | 'review'
  | 'announcement'

export type GroupCategory =
  | 'trimester'
  | 'symptom'
  | 'nutrition'
  | 'exercise'
  | 'regional'
  | 'hobby'

// 샘플 커뮤니티 데이터
export const samplePosts: CommunityPost[] = [
  {
    id: '1',
    authorId: 'user1',
    authorName: '행복한예비맘',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=happymom&backgroundColor=ffd5dc',
    authorWeek: 24,
    title: '입덧 완화에 도움된 음식 공유해요!',
    content: '안녕하세요! 24주차 예비맘입니다. 초기에 입덧이 너무 심해서 고생했는데, 생강차와 레몬워터가 정말 도움이 많이 됐어요. 특히 아침에 일어나자마자 따뜻한 생강차 한 잔이 속을 진정시켜주더라구요. 혹시 입덧으로 고생하시는 분들 계시면 한번 시도해보세요!',
    category: 'tip',
    tags: ['입덧', '생강차', '레몬워터', '임신초기'],
    likes: 42,
    comments: [
      {
        id: 'c1',
        authorId: 'user2',
        authorName: '쑥쑥이맘',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ssukssukmom&backgroundColor=c0aede',
        content: '저도 생강차 도움 많이 받았어요! 꿀 넣어서 마시니 더 좋더라구요 ☺️',
        likes: 5,
        createdAt: new Date('2024-03-10T10:30:00'),
        isLiked: false
      },
      {
        id: 'c2',
        authorId: 'user3',
        authorName: '건강한아기',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=healthybaby&backgroundColor=b6e3f4',
        content: '좋은 정보 감사합니다! 저는 크래커도 도움이 됐어요',
        likes: 3,
        createdAt: new Date('2024-03-10T11:00:00'),
        isLiked: true
      }
    ],
    createdAt: new Date('2024-03-10T09:00:00'),
    updatedAt: new Date('2024-03-10T09:00:00'),
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '2',
    authorId: 'user4',
    authorName: '영양만점맘',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nutritionmom&backgroundColor=ffdfbf',
    authorWeek: 28,
    title: '임산부 철분 보충 레시피 - 시금치 소고기 볶음',
    content: `오늘은 철분 보충에 좋은 시금치 소고기 볶음 레시피를 공유할게요!

재료:
- 소고기 200g
- 시금치 1단
- 마늘 3쪽
- 간장 2큰술
- 참기름 1큰술
- 깨소금 약간

만드는 법:
1. 소고기는 먹기 좋은 크기로 썰어 간장, 참기름으로 밑간
2. 시금치는 깨끗이 씻어 살짝 데치기
3. 팬에 기름 두르고 마늘 볶기
4. 소고기 넣고 익히기
5. 시금치 넣고 볶아주기
6. 깨소금으로 마무리

철분 흡수를 도와주는 비타민C가 풍부한 과일과 함께 드시면 더 좋아요!`,
    category: 'recipe',
    tags: ['철분', '레시피', '시금치', '소고기', '영양식'],
    images: [],
    likes: 68,
    comments: [
      {
        id: 'c3',
        authorId: 'user5',
        authorName: '요리초보맘',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cookingmom&backgroundColor=d1d4f9',
        content: '와 너무 맛있어보여요! 오늘 저녁에 해봐야겠어요 😋',
        likes: 8,
        createdAt: new Date('2024-03-10T14:00:00'),
        isLiked: false
      }
    ],
    createdAt: new Date('2024-03-10T13:00:00'),
    updatedAt: new Date('2024-03-10T13:00:00'),
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '3',
    authorId: 'user6',
    authorName: '첫째맘이',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=firstmom&backgroundColor=ffd5dc',
    authorWeek: 32,
    title: '붓기 관리 어떻게 하고 계신가요?',
    content: '32주 접어들면서 발목이랑 손가락 붓기가 심해지네요 ㅠㅠ 압박스타킹 신고 있고, 짠 음식도 피하고 있는데 다른 분들은 어떻게 관리하고 계신지 궁금해요. 좋은 방법 있으면 공유 부탁드려요!',
    category: 'question',
    tags: ['붓기', '임신후기', '부종관리'],
    likes: 15,
    comments: [
      {
        id: 'c4',
        authorId: 'user7',
        authorName: '둘째준비중',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=secondbaby&backgroundColor=c0aede',
        content: '저는 자기 전에 다리 벽에 올리고 15분 정도 있어요. 도움 많이 돼요!',
        likes: 12,
        createdAt: new Date('2024-03-10T16:00:00'),
        isLiked: true
      },
      {
        id: 'c5',
        authorId: 'user8',
        authorName: '건강관리중',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=healthycare&backgroundColor=b6e3f4',
        content: '칼륨이 많은 바나나, 아보카도 먹으면 좋다고 해서 매일 먹고 있어요',
        likes: 7,
        createdAt: new Date('2024-03-10T16:30:00'),
        isLiked: false
      }
    ],
    createdAt: new Date('2024-03-10T15:30:00'),
    updatedAt: new Date('2024-03-10T15:30:00'),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '4',
    authorId: 'user9',
    authorName: '운동하는맘',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sportymom&backgroundColor=ffdfbf',
    authorWeek: 20,
    title: '임산부 요가 3개월 후기',
    content: '임신 확인 후 바로 시작한 임산부 요가 3개월째 후기입니다! 처음엔 몸이 뻣뻣해서 힘들었는데 지금은 훨씬 유연해졌어요. 특히 허리 통증이 많이 개선됐고, 숙면에도 도움이 되더라구요. 출산 때까지 꾸준히 할 예정이에요!',
    category: 'experience',
    tags: ['운동', '요가', '임산부요가', '건강관리'],
    likes: 35,
    comments: [],
    createdAt: new Date('2024-03-10T18:00:00'),
    updatedAt: new Date('2024-03-10T18:00:00'),
    isLiked: true,
    isBookmarked: false
  }
]

export const sampleGroups: CommunityGroup[] = [
  {
    id: 'g1',
    name: '2024년 12월 출산 예정 모임',
    description: '같은 달 출산 예정인 예비맘들의 정보 공유 공간',
    category: 'trimester',
    memberCount: 342,
    isJoined: true,
    tags: ['12월출산', '2024년']
  },
  {
    id: 'g2',
    name: '임산부 영양 관리 모임',
    description: '건강한 임신을 위한 영양 정보와 레시피 공유',
    category: 'nutrition',
    memberCount: 1250,
    isJoined: false,
    tags: ['영양', '레시피', '건강식단']
  },
  {
    id: 'g3',
    name: '입덧 극복 서포트 그룹',
    description: '입덧으로 고생하는 예비맘들의 경험 공유와 응원',
    category: 'symptom',
    memberCount: 890,
    isJoined: false,
    tags: ['입덧', '임신초기', '증상관리']
  },
  {
    id: 'g4',
    name: '서울 강남 예비맘 모임',
    description: '강남 지역 예비맘들의 병원 정보 및 육아 정보 공유',
    category: 'regional',
    memberCount: 456,
    isJoined: false,
    tags: ['서울', '강남', '지역모임']
  }
]

// 커뮤니티 관리 클래스
export class CommunityManager {
  private posts: CommunityPost[] = []
  private groups: CommunityGroup[] = []
  private isLoaded: boolean = false

  constructor() {
    this.loadFromStorage()
  }

  // LocalStorage에서 데이터 로드
  private loadFromStorage(): void {
    if (typeof window === 'undefined') {
      this.posts = samplePosts
      this.groups = sampleGroups
      return
    }

    const savedPosts = localStorage.getItem('mommymenu-community-posts')
    const savedGroups = localStorage.getItem('mommymenu-community-groups')

    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts)
        // Date 객체 복원
        this.posts = parsed.map((post: CommunityPost) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
          comments: post.comments.map((comment: Comment) => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          }))
        }))
      } catch (e) {
        this.posts = samplePosts
      }
    } else {
      this.posts = samplePosts
    }

    if (savedGroups) {
      try {
        this.groups = JSON.parse(savedGroups)
      } catch (e) {
        this.groups = sampleGroups
      }
    } else {
      this.groups = sampleGroups
    }

    this.isLoaded = true
  }

  // LocalStorage에 데이터 저장
  private saveToStorage(): void {
    if (typeof window === 'undefined') return

    localStorage.setItem('mommymenu-community-posts', JSON.stringify(this.posts))
    localStorage.setItem('mommymenu-community-groups', JSON.stringify(this.groups))
  }

  // 게시글 목록 가져오기
  getPosts(category?: PostCategory, limit?: number): CommunityPost[] {
    let filteredPosts = this.posts

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category)
    }

    if (limit) {
      filteredPosts = filteredPosts.slice(0, limit)
    }

    return filteredPosts.sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    )
  }

  // 게시글 상세 가져오기
  getPost(postId: string): CommunityPost | undefined {
    return this.posts.find(post => post.id === postId)
  }

  // 게시글 작성
  createPost(post: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>): CommunityPost {
    const newPost: CommunityPost = {
      ...post,
      id: Date.now().toString(),
      likes: 0,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.posts.unshift(newPost)
    this.saveToStorage()
    return newPost
  }

  // 좋아요 토글
  toggleLike(postId: string): boolean {
    const post = this.posts.find(p => p.id === postId)
    if (post) {
      post.isLiked = !post.isLiked
      post.likes += post.isLiked ? 1 : -1
      this.saveToStorage()
      return post.isLiked
    }
    return false
  }

  // 북마크 토글
  toggleBookmark(postId: string): boolean {
    const post = this.posts.find(p => p.id === postId)
    if (post) {
      post.isBookmarked = !post.isBookmarked
      this.saveToStorage()
      return post.isBookmarked
    }
    return false
  }

  // 댓글 추가
  addComment(postId: string, comment: Omit<Comment, 'id' | 'likes' | 'createdAt'>): Comment | null {
    const post = this.posts.find(p => p.id === postId)
    if (post) {
      const newComment: Comment = {
        ...comment,
        id: Date.now().toString(),
        likes: 0,
        createdAt: new Date()
      }
      post.comments.push(newComment)
      this.saveToStorage()
      return newComment
    }
    return null
  }

  // 댓글 좋아요 토글
  toggleCommentLike(postId: string, commentId: string): boolean {
    const post = this.posts.find(p => p.id === postId)
    if (post) {
      const comment = post.comments.find(c => c.id === commentId)
      if (comment) {
        comment.isLiked = !comment.isLiked
        comment.likes += comment.isLiked ? 1 : -1
        this.saveToStorage()
        return comment.isLiked
      }
    }
    return false
  }

  // 그룹 목록 가져오기
  getGroups(category?: GroupCategory): CommunityGroup[] {
    if (category) {
      return this.groups.filter(group => group.category === category)
    }
    return this.groups
  }

  // 그룹 가입/탈퇴
  toggleGroupMembership(groupId: string): boolean {
    const group = this.groups.find(g => g.id === groupId)
    if (group) {
      group.isJoined = !group.isJoined
      group.memberCount += group.isJoined ? 1 : -1
      this.saveToStorage()
      return group.isJoined
    }
    return false
  }

  // 인기 태그 가져오기
  getPopularTags(limit: number = 10): string[] {
    const tagCount: { [key: string]: number } = {}
    
    this.posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })
    
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag]) => tag)
  }
}

export const communityManager = new CommunityManager()