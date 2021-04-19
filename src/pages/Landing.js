import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

const StyledContainer = styled.div`
  background-color: #e2dfde;;
  section {
    min-height: 100vh; 
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &#one {
      background-image: url('../../assets/landing_0.jpg');
    }
    &#two {
      background-image: url('../../assets/landing_1.jpg');
    }
    &#three {
      background-image: url('../../assets/landing_2.jpg');
    }
    &#four {
      background-image: url('../../assets/landing_3.jpg');
    }
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  }
`

const StyledBio = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5px 20px 5px 20px;
  color: #443c36;
  font-family: 'WandohopeR';
  font-size: 1.5rem;
  text-align: justify;
  max-width: 65%;
  @media (max-width: 600px) {
    max-width: 300px;
    font-size: 0.9rem;
  }
`

function Landing (props) {
  return (
    <StyledContainer>
      <section id='one'>
        <StyledBio>
          <Fade In duration={3000} cascade>
            <div>
              <p>
                우리 오빠는 안동사범을 최우수 그룹으로 나온, 어머니께는 거의 우상. <br />
                아들로서는 완벽한 존재였던 것 같다. 물론 내게도 특별한 분이고. <br />
                제대 후에 시골에 발령을 받았는데, 내가 6학년 때였어.
              </p>
            </div>
          </Fade>
        </StyledBio>
      </section>
      <section id='two'>
        <StyledBio>
          <Fade In duration={3000} cascade>
            <div>
              <p>
                평소 진정한 시골을 그리던 나는, <br />
                부모님을 졸라서 오빠를 따라 그 분교로 전학을 갔어. <br />
                남들은 6학년이라고 중학교 입시준비 공부 한다고 야단인데.
              </p>
            </div>
          </Fade>
        </StyledBio>
      </section>
      <section id='three'>
        <StyledBio>
          <Fade In duration={3000} cascade>
            <div>
              <p>
                난생 처음 버스를 타고 먼지 나는 길을 두어 시간 달려서 군위에서 내렸다. <br />
                내를 건너고 산길을 걷고 걸어 진정한 시골 그곳에 도착했는데, <br />
                도중에 옹달샘에서 쉬고 물도 마셨지. 정말 좋았어.
              </p>
            </div>
          </Fade>
        </StyledBio>
      </section>
      <section id='four'>
        <StyledBio>
          <Fade In duration={3000} cascade>
            <div>
              <p>
                우리는 시골집 외양간 옆에 방을 얻어 기거했는데, 학교는 옛날 소설 상록수에 나오는 것 같은 초가지붕이었어. 그래도 모든게 좋더라. 거기서 아이들을 따라 나물도 캐고, 머슴애들은 언덕에서 소도 먹이고, 장 날 되면 엄청 멀리까지 걸어가서 시골 장 구경도 하고, 징검다리 건너 학교다니고, 점심 때는 밭에서 나는 상추도 뜯어서 쌈 싸먹고..."
              </p>
            </div>
          </Fade>
        </StyledBio>
      </section>
    </StyledContainer>
  )
}

export default Landing
