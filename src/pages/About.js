import React, { useMemo } from 'react'
import styled from 'styled-components'
import { theme, media } from '../styles/theme'
import { fadeInUp } from '../styles/animations'
import { Divider } from '../components/shared'
import { usePageTitle } from '../hooks/usePageTitle'
import { LanguageTransition } from '../components/PageTransition'
import { useLanguage } from '../contexts/LanguageContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} 0;
  animation: ${fadeInUp} 0.8s ease-out;
`

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${theme.spacing['3xl']};
`

const PortraitWrapper = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing['2xl']};

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 1px solid ${theme.colors.goldMuted};
    border-radius: 50%;
  }
`

const Portrait = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  display: block;

  ${media.md} {
    width: 160px;
    height: 160px;
  }
`

const Name = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textPrimary};
  letter-spacing: 0.1em;
  margin-bottom: ${theme.spacing.sm};
  text-align: center;

  ${media.md} {
    font-size: ${theme.fontSizes['2xl']};
  }
`

const Title = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.normal};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
`

const BioSection = styled.section`
  max-width: 700px;
`

const BioParagraph = styled.p`
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.lineHeights.loose};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }

  ${media.md} {
    font-size: ${theme.fontSizes.base};
    line-height: ${theme.lineHeights.relaxed};
    text-align: left;
  }
`

const Highlight = styled.span`
  color: ${theme.colors.gold};
`

// 바이오 데이터
const bioData = {
  Korean: [
    '은결(이미선)은 한국의 화가이다.',
    '1952년 경북 안동에서 태어나 기독교 집안에서 자랐다. 어린 시절부터 자연과 함께하는 삶을 동경했다.',
    '경북대학교 사범대학에서 화학을 전공했다. 결혼 후 남편의 해외 발령을 따라 프랑스 벨포에서 수년간 생활했다. 이 시기에 유럽 여러 나라를 여행하며 다양한 예술과 문화를 접했고, 이는 그녀의 작품에 영향을 주었다.',
    '평생 그림을 그려왔다. 지금은 두 아들과 네 손주를 둔 할머니로, 여전히 자연 속에서의 소박한 삶을 꿈꾸고 있다.',
  ],
  English: [
    'EunGyeol (Lee, Mi Sun) is a Korean painter.',
    'She was born in Andong, South Korea in 1952 and grew up in a Christian family. From an early age, she was drawn to life close to nature.',
    "She studied chemistry education at Kyungpook National University. After marriage, she lived in Belfort, France for several years, following her husband's overseas assignment. During this time, she traveled throughout Europe, where she encountered various art and cultures that influenced her work.",
    'She has painted throughout her life. Now a grandmother of four, she still dreams of a simple life in the countryside.',
  ],
}

function About() {
  const { lang } = useLanguage()
  const currentBio = bioData[lang] || bioData.Korean
  const pageTitle = lang === 'English' ? 'About' : '작가 소개'

  // 연도 계산 (렌더링마다 재계산 방지)
  const { currentYear, yearsFromBirth } = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const birthYear = 1952
    return {
      currentYear: year,
      yearsFromBirth: year - birthYear
    }
  }, [])

  usePageTitle(pageTitle, lang)

  return (
    <Container>
      <ProfileSection>
        <PortraitWrapper>
          <Portrait src="/assets/portrait.jpg" alt="Portrait of EunGyeol" />
        </PortraitWrapper>
        <LanguageTransition lang={lang}>
          <Name>
            {lang === 'English' ? 'Lee, Mi Sun' : '이미선'}
          </Name>
          <Title>
            {lang === 'English' ? 'Artist · EunGyeol' : '화가 · 은결'}
          </Title>
        </LanguageTransition>
      </ProfileSection>

      <Divider />

      <LanguageTransition lang={lang}>
        <BioSection>
          {currentBio.map((paragraph, index) => (
            <BioParagraph key={index}>
              {paragraph}
            </BioParagraph>
          ))}
          <BioParagraph>
            {lang === 'English'
              ? <><Highlight>{currentYear}</Highlight> marks {yearsFromBirth} years since her birth.</>
              : <><Highlight>{currentYear}</Highlight>년은 그녀의 탄생 {yearsFromBirth}주년이 되는 해이다.</>
            }
          </BioParagraph>
        </BioSection>
      </LanguageTransition>
    </Container>
  )
}

export default About
