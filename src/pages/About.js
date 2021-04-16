import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

const StyledAbout = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`

const StyledPhoto = styled.div`
  & img {
    width:300px;
    height:300px;
    object-fit:cover;
    border-radius:50%;
    @media (max-width: 600px) {
      width:200px;
      height:200px;
    }
    margin-top: 2vh;
    margin-bottom: 2vh;
  }
`

const StyledBio = styled.div`
  color: #443c36;
  font-family: 'Roboto', sans-serif;
  text-align: justify;
  max-width: 80%;
  @media (min-width: 900px) {
    max-width: 50%;
    margin-left: 10vh;
  }
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`

function About() {
  return (
    <StyledAbout>
      <StyledPhoto>
      <Fade bottom>
        <img src='/assets/portrait.jpg' alt='Portrait of SeogGyeong'></img>
        </Fade>
        </StyledPhoto>
      <StyledBio>
      <Fade bottom>
        <p>
          SeogGyeong(March 23, 1952 ~) is contemporary Korean painting artist. 
        </p>
        <p>
          She was born in Andong, a small city placed in southern east area of South Korea, March 1952.
          She was raised in a devout Christian family.
          Since childhood, she was attracted by living in the nature, and she actually tried it when she was thirteen.
        </p>
        <p>
          She graduated Kyungpook National University as a chemistry teacher. 
          And married with present husband and moved to Belfort, France following him that assigned as expatriate.
          At that time she had many opportunities to travel various European countries and there she influenced by paintings, arts and culture there.
        </p>
        <p>
          She is beloved wife, mother of two son and grandmother of four kids.
          She is painting through her whole life time.
          And Still dreaming the life in nature with the believe in god's plan.
        </p>
        <p>
          2021 is the year of her 70th birth anniversary.
        </p>
      </Fade>
      </StyledBio>
    </StyledAbout>
  )
}

export default About
