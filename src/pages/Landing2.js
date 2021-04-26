import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  height: 100vh;
  background-image: url('../../assets/landing_0.jpg');
  background-size: cover;
  transform: translateY(${(props) => -props.offset/50}%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
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
      <StyledLogoWrapper offset={offset}>
        <StyledLogo>EunGyeol</StyledLogo>
        <StyledLogoSub>은결 이미선 한국화 갤러리</StyledLogoSub>
      </StyledLogoWrapper>
    </StyledContainer>
  )
}

export default Landing2
