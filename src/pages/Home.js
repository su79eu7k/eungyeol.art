import React from 'react'
import styled from 'styled-components'
import { theme, media } from '../styles/theme'
import { fadeInUp } from '../styles/animations'
import { PageTitle } from '../components/shared'
import { usePageTitle } from '../hooks/usePageTitle'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  align-items: center;
  margin-bottom: ${theme.spacing['4xl']};
  opacity: 0;
  animation: ${fadeInUp} 1s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};

  &:nth-child(even) {
    direction: rtl;

    > * {
      direction: ltr;
    }
  }

  ${media.lg} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
    text-align: center;

    &:nth-child(even) {
      direction: ltr;
    }
  }

  ${media.md} {
    margin-bottom: ${theme.spacing['3xl']};
  }
`

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.radii.md};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid ${theme.colors.goldMuted};
    border-radius: ${theme.radii.md};
    pointer-events: none;
    z-index: 1;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform ${theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.02);
  }

  ${media.lg} {
    max-width: 500px;
    margin: 0 auto;
  }

  ${media.sm} {
    max-width: 100%;
  }
`

const TextContent = styled.div`
  ${media.lg} {
    max-width: 600px;
    margin: 0 auto;
  }
`

const StoryText = styled.p`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.lineHeights.loose};
  text-align: justify;

  ${media.md} {
    font-size: ${theme.fontSizes.base};
    line-height: ${theme.lineHeights.relaxed};
  }

  ${media.sm} {
    text-align: left;
  }
`

const QuoteMark = styled.span`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.gold};
  line-height: 1;
  display: block;
  margin-bottom: ${theme.spacing.sm};

  ${media.lg} {
    text-align: center;
  }
`

// 스토리 데이터
const stories = {
  English: [
    {
      image: '/assets/landing_0.jpg',
      alt: 'Pastorale',
      text: '"My elder brother who graduated Andong College of Education as a best group among them, was close to idol to my mother. I think he was a perfect son, of course a very special sibling to me as well. After discharged from army, he was assigned to countryside as a teacher. That was when I was 6th grade elementary school student.',
    },
    {
      image: '/assets/landing_1.jpg',
      alt: 'Pastorale',
      text: 'As the one who dreamed real countryside, I twisted my parent\'s arm and transferred to that branch school, following my brother. Other kids were fussing around preparing for junior high school entrance exams saying that they are 6th grade.',
    },
    {
      image: '/assets/landing_2.jpg',
      alt: 'Pastorale',
      text: 'For the first time in my life, I took a bus and ran for a couple of hours on a dusty road and got off in Gunwi. Crossing a stream and walking a mountain path, taking a rest and drinking water sitting a spring pond, that was really fantastic.',
    },
    {
      image: '/assets/landing_3.jpg',
      alt: 'Pastorale',
      text: 'Our home was rented house near the cowshed of countryside house, and the roof of my school was thatched one that seems to appear in old novel Sanglogsu(Evergreen). But still everything was fine to me. There, following other kids, digging herbs, feeding cattle on the hills, walked very far away to see a countryside market on the market day, went to school across the stepping stone, pick up lettuce from the field and taste it..."',
    },
  ],
  Korean: [
    {
      image: '/assets/landing_0.jpg',
      alt: '전원',
      text: '"우리 오빠는 안동사범을 최우수 그룹으로 나온, 어머니께는 거의 우상. 아들로서는 완벽한 존재였던 것 같다. 물론 내게도 특별한 분이고. 제대 후에 시골에 발령을 받았는데, 내가 6학년 때였어.',
    },
    {
      image: '/assets/landing_1.jpg',
      alt: '전원',
      text: '평소 진정한 시골을 그리던 나는, 부모님을 졸라서 오빠를 따라 그 분교로 전학을 갔어. 남들은 6학년이라고 중학교 입시준비 공부 한다고 야단인데.',
    },
    {
      image: '/assets/landing_2.jpg',
      alt: '전원',
      text: '난생 처음 버스를 타고 먼지 나는 길을 두어 시간 달려서 군위에서 내렸다. 내를 건너고 산길을 걷고 걸어 진정한 시골 그곳에 도착했는데, 도중에 옹달샘에서 쉬고 물도 마셨지. 정말 좋았어.',
    },
    {
      image: '/assets/landing_3.jpg',
      alt: '전원',
      text: '우리는 시골집 외양간 옆에 방을 얻어 기거했는데, 학교는 옛날 소설 상록수에 나오는 것 같은 초가지붕이었어. 그래도 모든게 좋더라. 거기서 아이들을 따라 나물도 캐고, 머슴애들은 언덕에서 소도 먹이고, 장 날 되면 엄청 멀리까지 걸어가서 시골 장 구경도 하고, 징검다리 건너 학교다니고, 점심 때는 밭에서 나는 상추도 뜯어서 쌈 싸먹고..."',
    },
  ],
}

function Home({ lang }) {
  const currentStories = stories[lang] || stories.Korean
  const pageTitle = lang === 'English' ? 'Her Story' : '그녀의 이야기'

  usePageTitle(pageTitle, lang)

  return (
    <Container>
      <PageTitle>{pageTitle}</PageTitle>

      {currentStories.map((story, index) => (
        <Section key={index} delay={`${0.2 + index * 0.15}s`}>
          <ImageWrapper>
            <img src={story.image} alt={story.alt} loading="lazy" />
          </ImageWrapper>
          <TextContent>
            {index === 0 && <QuoteMark>"</QuoteMark>}
            <StoryText>{story.text}</StoryText>
          </TextContent>
        </Section>
      ))}
    </Container>
  )
}

export default Home
