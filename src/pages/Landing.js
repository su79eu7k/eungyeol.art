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
  margin: 0vh 5vh 0vh 5vh;
  & img {
    width: 500px;
    object-fit: scale-down;
    border-radius: 3%;
    @media (max-width: 600px) {
      width:300px;
    }
  }
`

const StyledBio = styled.div`
  color: #857e7a;
  font-family: 'Roboto', sans-serif;
  text-align: justify;
  max-width: 500px;
  @media (max-width: 600px) {
    max-width: 300px;
    font-size: 0.9rem;
  }
`

function Landing() {
  return (
    <StyledAbout>
      <StyledPhoto>
      <Fade left>
        <img src='/assets/landing.jpg' alt='Pastorale'></img>
      </Fade>
      </StyledPhoto>
      <StyledBio>
      <Fade right cascade>
        <div>
          <p>
            <i>"...My elder brother who graduated Andong College of Education as a best group among them, was close to idol to my mother. I think he was a perfect son, of course a very special sibling to me as well.</i>
          </p>
          <p>
            <i>After discharged from army, he was assigned to countryside as a teacher. That was when I was 6th grade elementary school student. As the one who dreamed real countryside, I twisted my parent's arm and transferred to that branch school, following my brother. Other kids were fussing around preparing for junior high school entrance exams saying that they are 6th grade.</i>
          </p>
          <p>
            <i>For the first time in my life, I took a bus and ran for a couple of hours on a dusty road and got off in Gunwi. Crossing a stream and walking a mountain path, taking a rest and drinking water sitting a spring pond, that was really fantastic.</i>
          </p>
          <p>
            <i>Our home was rented house near the cowshed of countryside house, and the roof of my school was thatched one that seems to appear in old novel Sanglogsu(Evergreen). But still everything was fine to me. There, following other kids, digging herbs, feeding cattle on the hills, walked very far away to see a countryside market on the market day, went to school across the stepping stone, pick up lettuce from the field and taste it..."</i>
            </p>
        </div>
      </Fade>
      </StyledBio>
    </StyledAbout>
  )
}

export default Landing
