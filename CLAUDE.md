# EunGyeol Art Portfolio

어머니 70세 생일 선물로 제작한 화가 포트폴리오 웹사이트입니다.

**Live Site:** http://eungyeol.com

## Tech Stack

- **Framework:** React 18 (Create React App)
- **Styling:** styled-components
- **Routing:** react-router-dom v6
- **Build:** react-scripts

## Project Structure

```
src/
├── App.js                    # 메인 앱, 라우팅 설정
├── index.js                  # 엔트리포인트
├── photos.js                 # 작품 이미지 데이터
├── components/
│   ├── NavBar.js             # 네비게이션 바
│   ├── Footer.js             # 푸터
│   ├── MasonryGallery.js     # 메이슨리 갤러리
│   ├── ImageViewer.js        # 이미지 뷰어 (라이트박스)
│   ├── Modal.js              # 모달 컴포넌트
│   ├── ArtDecoBackground.js  # 배경 애니메이션
│   ├── PageTransition.js     # 페이지 전환 효과
│   ├── ScrollToTop.js        # 스크롤 복원
│   ├── Icons.js              # SVG 아이콘들
│   └── shared/               # 공용 컴포넌트
├── pages/
│   ├── Landing.js            # 랜딩 페이지 (/)
│   ├── Home.js               # 홈 페이지 (/home)
│   ├── Arts.js               # 작품 갤러리 (/arts)
│   └── About.js              # 소개 페이지 (/about)
├── styles/
│   ├── theme.js              # 디자인 시스템 (색상, 타이포, 간격)
│   ├── GlobalStyle.js        # 전역 스타일
│   └── animations.js         # 애니메이션 정의
├── contexts/
│   └── LanguageContext.js    # 다국어 지원 (한/영)
└── hooks/
    └── usePageTitle.js       # 페이지 타이틀 훅
```

## Design System

Art Deco 스타일의 웜 크림 + 초콜릿 브라운 테마를 사용합니다.

**주요 색상:**
- 배경: `#FFFCF7` (웜 크림)
- 골드 액센트: `#C9A962`
- 텍스트: `#5D4E37` (초콜릿 브라운)

**폰트:**
- Display: Cormorant Garamond, Noto Serif KR
- Body: Pretendard, Noto Sans KR

## Commands

```bash
npm start    # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm test     # 테스트 실행
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Landing | 풀스크린 랜딩 페이지 |
| `/home` | Home | 메인 홈 페이지 |
| `/arts` | Arts | 작품 갤러리 (메이슨리) |
| `/about` | About | 작가 소개 |

## Key Features

- **Lazy Loading:** 페이지 컴포넌트 lazy 로딩
- **다국어 지원:** 한국어/영어 전환 (LanguageContext)
- **반응형:** 모바일/태블릿/데스크톱 대응
- **Art Deco 배경:** 애니메이션 배경 효과
- **이미지 뷰어:** 갤러리 라이트박스 기능
