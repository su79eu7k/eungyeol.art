import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 80vh;
  overflow: hidden;

  #far {
    position: absolute;
    z-index: -5000;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-image: url('../../assets/landing_l0.png');  
    transform: translateY(${(props) => props.offset/10}%);
  }

  #mid {
    position: absolute;
    z-index: -4000;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-image: url('../../assets/landing_l1.png');
    transform: translateY(${(props) => props.offset/30}%);
  }

  #front {
    position: absolute;
    z-index: -3000;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-image: url('../../assets/landing_l2.png');
    transform: translateY(${(props) => -props.offset/50}%);
  }
`

const StyledLogoWrapper = styled.div`
  transform: translateY(${(props) => -props.offset/10}%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const StyledLogo = styled.div`
  margin-top: 3vh;
  color: #443c36;
  font-family: 'Beth Ellen', cursive;
  font-size: 5vh;
  @media (max-width: 600px) {
    font-size: 4vh;
  }
`

const StyledLogoSub = styled.div`
  color: #443c36;
  font-family: 'WandohopeB';
  font-size: 4vh;
  @media (max-width: 600px) {
    font-size: 3vh;
  }
`

function Landing2 (props) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, []);

  return (
    <StyledContainer offset={offset}>
      <div id='far'></div>
      <div id='mid'></div>
      <div id='front'></div>
      <StyledLogoWrapper offset={offset}>
        <StyledLogo>EunGyeol</StyledLogo>
        <StyledLogoSub>은결 이미선 한국화 갤러리</StyledLogoSub>
      </StyledLogoWrapper>
    </StyledContainer>
  )
}

export default Landing2
