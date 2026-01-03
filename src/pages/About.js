import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme, media } from '../styles/theme'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} 0;
`

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${theme.spacing['3xl']};
  animation: ${fadeIn} 1s ease-out;
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

const Divider = styled.div`
  width: 60px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${theme.colors.gold},
    transparent
  );
  margin: ${theme.spacing['2xl']} 0;
`

const BioSection = styled.section`
  max-width: 700px;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
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
    '은결은 한국의 화가이다.',
    '1952년 3월 23일 대한민국 경상북도 안동에서 출생하였으며 독실한 기독교 가정에서 자랐다. 어린 시절부터 자연 속 삶에 매료되어 13세 때에는 실제로 이를 직접 실행에 옮기기도 하였다.',
    '경북대학교 사범대학을 졸업하여 화학 교사를 역임하였다. 이후 해외 주재원 생활을 하게 된 현재의 배우자와 결혼하여, 그를 따라 프랑스 벨포로 이주 후 그 곳에서 수년간의 해외 생활을 하였다. 그 시절 그녀는 유럽의 많은 나라들을 여행할 기회를 갖게 되었으며, 그 곳의 다양한 회화, 예술, 문화들은 그녀의 작품세계에도 적지 않은 영향을 끼치게 되었다.',
    '그녀는 그녀의 전 생애에 걸쳐 그림을 그렸다. 현재 사랑받는 아내이며, 두 아들의 어머니이자 네 아이들의 할머니이기도 하다. 그리고 아직도 하나님의 사랑과 계획하심 안에 시골 어딘가에서 자유로운 삶을 살게되길 꿈꾸고 있다.',
  ],
  English: [
    'EunGyeol is a contemporary Korean painting artist.',
    'She was born in Andong, a small city placed in the southern east area of South Korea, on March 23, 1952. She was raised in a devout Christian family. Since childhood, she was attracted by living in nature, and she actually tried it when she was thirteen.',
    'She graduated from Kyungpook National University as a chemistry teacher. She married her present husband and moved to Belfort, France, following him as he was assigned as an expatriate. At that time, she had many opportunities to travel to various European countries, where she was influenced by the paintings, arts, and culture.',
    'She has been painting throughout her whole lifetime. Now she is a beloved wife, mother of two sons, and grandmother of four children. She still dreams of living somewhere in the countryside, believing in the love of God and His plan.',
  ],
}

function About({ lang }) {
  const currentBio = bioData[lang] || bioData.Korean
  const currentYear = new Date().getFullYear()
  const birthYear = 1952
  const age = currentYear - birthYear

  return (
    <Container>
      <ProfileSection>
        <PortraitWrapper>
          <Portrait src="/assets/portrait.jpg" alt="Portrait of EunGyeol" />
        </PortraitWrapper>
        <Name>
          {lang === 'English' ? 'Lee, Mi Sun' : '이미선'}
        </Name>
        <Title>
          {lang === 'English' ? 'Artist · EunGyeol' : '화가 · 은결'}
        </Title>
      </ProfileSection>

      <Divider />

      <BioSection>
        {currentBio.map((paragraph, index) => (
          <BioParagraph key={index}>
            {paragraph}
          </BioParagraph>
        ))}
        <BioParagraph>
          {lang === 'English'
            ? <><Highlight>{currentYear}</Highlight> marks the year of her {age}th birthday.</>
            : <><Highlight>{currentYear}</Highlight>년은 그녀의 탄생 {age}주년이 되는 해이다.</>
          }
        </BioParagraph>
      </BioSection>
    </Container>
  )
}

export default About
