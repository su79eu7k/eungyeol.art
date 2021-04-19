import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

const StyledAbout = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
`

const StyledPhoto = styled.div`
  margin: 0vh 10vh 0vh 10vh;
  & img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    @media (max-width: 900px) {
      width: 200px;
      height: 200px;
    }
  }
`

const StyledBio = styled.div`
  color: #857e7a;
  font-family: 'Cafe24Oneprettynight';
  font-size: 1.2rem;
  text-align: justify;
  max-width: 600px;
  min-height: 400px;
  margin-top: 1vh;
  @media (max-width: 600px) {
    max-width: 300px;
    font-size: 1rem;
  }
`

function About(props) {
  return (
    <StyledAbout>
      <StyledPhoto>
      <Fade left>
        <img src='/assets/portrait.jpg' alt='Portrait of EunGyeol'></img>
        </Fade>
        </StyledPhoto>
      { props.lang === 'Korean' && <StyledBio>
      <Fade right cascade>
        <div>
        <p>
          은결은 한국의 화가이다. 
        </p>
        <p>
          1952년 3월 23일 대한민국 경상북도 안동에서 출생하였으며 독실한 기독교 가정에서 자랐다.
          어린 시절부터 자연 속 삶에 매료되어 13세 때에는 실제로 이를 직접 실행에 옮기기도 하였다.
        </p>
        <p>
          경북대학교 사범대학을 졸업하여 화학 교사를 역임하였다.
          이후 해외 주재원 생활을 하게 된 현재의 배우자와 결혼하여, 그를 따라 프랑스 벨포로 이주 후 그 곳에서 수년간의 해외 생활을 하였다.
          그 시절 그녀는 유럽의 많은 나라들을 여행할 다양한 기회를 갖게 되었으며, 그 곳의 다양한 회화, 예술, 문화들은 그녀의 작품세계에도 적지 않은 영향을 끼치게 되었다. 
        </p>
        <p>
          그녀는 그녀의 전 생애에 걸쳐 그림을 그렸다.
          현재 사랑받는 아내이며, 두 아들의 어머니이자 네 아이들의 할머니이기도 하다.
          그리고 아직도 하나님의 사랑과 계획하심 안에 시골 어딘가에서 자유로운 삶을 살게되길 꿈꾸고 있다.
        </p>
        <p>
          2021년은 그녀의 탄생 70주년이 되는 해이다.
        </p>
        </div>
      </Fade>
      </StyledBio> }
      { props.lang === 'English' && <StyledBio>
      <Fade right cascade>
        <div>
        <p>
          EunGyeol is contemporary Korean painting artist. 
        </p>
        <p>
          She was born in Andong, a small city placed in southern east area of South Korea, March 23, 1952.
          She was raised in devout Christian family.
          Since childhood, she was attracted by living in nature, and she actually tried it when she was thirteen.
        </p>
        <p>
          She graduated Kyungpook National University as a chemistry teacher. 
          And married with present husband and moved to Belfort, France following him due to he was assigned as a expatriate.
          At that time she had many opportunities to travel various European countries and there she influenced by paintings, arts and culture there.
        </p>
        <p>
          She is painting through her whole life time.
          Now she is beloved wife, mother of two son and grandmother of four kids.
          And Still dreaming the life somewhere in countryside with the believe in the love of god and his plan.
        </p>
        <p>
          2021 is the year of her 70th birth anniversary.
        </p>
        </div>
      </Fade>
      </StyledBio> }
    </StyledAbout>
  )
}

export default About
