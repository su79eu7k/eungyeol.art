import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import useReactSimpleMatchMedia from 'react-simple-matchmedia'

const StyledAbout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
`

const StyledSection = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: center;
align-items: center;
margin: 5vh;
`

const StyledPhoto = styled.div`
  padding: 2vh;
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
  font-family: 'Cafe24Oneprettynight';
  font-size: ${props => props.lang === 'English' ? '1.3rem' : '1.3rem'};
  text-align: justify;
  line-height: 2rem;
  max-width: 500px;
  margin-top: 1vh;
  padding: 2vh;
  @media (max-width: 600px) {
    max-width: 300px;
    font-size: 0.9rem;
  }
`

function Home(props) {
  const matched = useReactSimpleMatchMedia('desktop');

  return (
    <StyledAbout>
      <StyledSection>
        {!matched && <StyledPhoto>
          <Fade left>
            <img src='/assets/landing_0.jpg' alt='Pastorale'></img>
          </Fade>
        </StyledPhoto>}
        {props.lang === 'English' && <StyledBio lang='English'>
          <Fade right={!matched} left={matched}>
            "My elder brother who graduated Andong College of Education as a best group among them, was close to idol to my mother. I think he was a perfect son, of course a very special sibling to me as well. After discharged from army, he was assigned to countryside as a teacher. That was when I was 6th grade elementary school student.
          </Fade>
        </StyledBio>}
        {props.lang === 'Korean' && <StyledBio lang='Korean'>
          <Fade right={!matched} left={matched}>
            "우리 오빠는 안동사범을 최우수 그룹으로 나온, 어머니께는 거의 우상. 아들로서는 완벽한 존재였던 것 같다. 물론 내게도 특별한 분이고. 제대 후에 시골에 발령을 받았는데, 내가 6학년 때였어.
          </Fade>
        </StyledBio>}
        {matched && <StyledPhoto>
          <Fade right>
            <img src='/assets/landing_0.jpg' alt='Pastorale'></img>
          </Fade>
        </StyledPhoto>}
      </StyledSection>

      <StyledSection>
        <StyledPhoto>
          <Fade left>
            <img src='/assets/landing_1.jpg' alt='Pastorale'></img>
          </Fade>
        </StyledPhoto>
        {props.lang === 'English' && <StyledBio lang='English'>
          <Fade right>
            As the one who dreamed real countryside, I twisted my parent's arm and transferred to that branch school, following my brother. Other kids were fussing around preparing for junior high school entrance exams saying that they are 6th grade.
          </Fade>
        </StyledBio>}
        {props.lang === 'Korean' && <StyledBio lang='Korean'>
          <Fade right>
            평소 진정한 시골을 그리던 나는, 부모님을 졸라서 오빠를 따라 그 분교로 전학을 갔어. 남들은 6학년이라고 중학교 입시준비 공부 한다고 야단인데.
          </Fade>
        </StyledBio>}
      </StyledSection>

      <StyledSection>
        {!matched && <StyledPhoto>
          <Fade left>
            <img src='/assets/landing_2.jpg' alt='Pastorale'></img>
          </Fade>
        </StyledPhoto>}
        {props.lang === 'English' && <StyledBio lang='English'>
          <Fade right={!matched} left={matched}>
            For the first time in my life, I took a bus and ran for a couple of hours on a dusty road and got off in Gunwi. Crossing a stream and walking a mountain path, taking a rest and drinking water sitting a spring pond, that was really fantastic.
          </Fade>
        </StyledBio>}
        {props.lang === 'Korean' && <StyledBio lang='Korean'>
          <Fade right={!matched} left={matched}>
            난생 처음 버스를 타고 먼지 나는 길을 두어 시간 달려서 군위에서 내렸다. 내를 건너고 산길을 걷고 걸어 진정한 시골 그곳에 도착했는데, 도중에 옹달샘에서 쉬고 물도 마셨지. 정말 좋았어.
          </Fade>
        </StyledBio>}
        {matched && <StyledPhoto>
          <Fade right>
            <img src='/assets/landing_2.jpg' alt='Pastorale'></img>
          </Fade>
        </StyledPhoto>}
      </StyledSection>

      <StyledSection>
        <StyledPhoto>
          <Fade left>
            <img src='/assets/landing_3.jpg' alt='Pastorale'></img>
          </Fade>
        </StyledPhoto>
        {props.lang === 'English' && <StyledBio lang='English'>
          <Fade right>
            Our home was rented house near the cowshed of countryside house, and the roof of my school was thatched one that seems to appear in old novel Sanglogsu(Evergreen). But still everything was fine to me. There, following other kids, digging herbs, feeding cattle on the hills, walked very far away to see a countryside market on the market day, went to school across the stepping stone, pick up lettuce from the field and taste it..."
          </Fade>
        </StyledBio>}
        {props.lang === 'Korean' && <StyledBio lang='Korean'>
          <Fade right>
          우리는 시골집 외양간 옆에 방을 얻어 기거했는데, 학교는 옛날 소설 상록수에 나오는 것 같은 초가지붕이었어. 그래도 모든게 좋더라. 거기서 아이들을 따라 나물도 캐고, 머슴애들은 언덕에서 소도 먹이고, 장 날 되면 엄청 멀리까지 걸어가서 시골 장 구경도 하고, 징검다리 건너 학교다니고, 점심 때는 밭에서 나는 상추도 뜯어서 쌈 싸먹고..."
          </Fade>
        </StyledBio>}
      </StyledSection>
    </StyledAbout>
  )
}

export default Home
