import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
	position: relative;
	overflow: hidden;
  background-image: url('../../assets/landing_0.jpg');  
  background-size: cover;

  .bird {
    background-image: url('../../assets/bird-cells-new.svg');
    background-size: auto 100%;
    width: 88px;
    height: 125px;
    will-change: background-position;
    
    animation-name: fly-cycle;
    animation-timing-function: steps(10);
    animation-iteration-count: infinite;
  
    &--one {
      animation-duration: 1s;
      animation-delay: -0.5s;		
    }
    
    &--two {
      animation-duration: 0.9s;
      animation-delay: -0.75s;
    }
    
    &--three {
      animation-duration: 1.25s;
      animation-delay: -0.25s;
    }
    
    &--four {
      animation-duration: 1.1s;
      animation-delay: -0.5s;
    }
  
  }
  
  .bird-container {
    position: absolute;
    top: 20%;
    left: -10%;
    transform: scale(1.5) translateX(-10vw);
    will-change: transform;

    @media (max-width: 600px) {
      left: -20%;
    }
    
    animation-name: fly-right-one;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    
    &--one {
      animation-duration: 15s;
      animation-delay: 0;
    }
    
    &--two {
      animation-duration: 16s;
      animation-delay: 1s;
    }
    
    &--three {
      animation-duration: 14.6s;
      animation-delay: 9.5s;
    }
    
    &--four {
      animation-duration: 16s;
      animation-delay: 10.25s;
    }
    
  }
  
  @keyframes fly-cycle {
    100% {
      background-position: -900px 0;
    }
  }
  
  @keyframes fly-right-one {
    0% {
      transform: scale(0.6) translateX(-10vw);
    }
    10% {
      transform: translateY(2vh) translateX(10vw) scale(0.6);
    }
    20% {
      transform: translateY(0vh) translateX(30vw) scale(0.6);
    }
    30% {
      transform: translateY(4vh) translateX(50vw) scale(0.6);
    }
    40% {
      transform: translateY(2vh) translateX(70vw) scale(0.5);
    }
    50% {
      transform: translateY(0vh) translateX(90vw) scale(0.5);
    }
    60% {
      transform: translateY(0vh) translateX(110vw) scale(0.4);
    }
    100% {
      transform: translateY(0vh) translateX(110vw) scale(0.4);
    }
  }

  @media (max-width: 600px) {
    @keyframes fly-right-one {
      0% {
        transform: scale(0.3) translateX(-10vw);
      }
      10% {
        transform: translateY(2vh) translateX(10vw) scale(0.3);
      }
      20% {
        transform: translateY(0vh) translateX(30vw) scale(0.3);
      }
      30% {
        transform: translateY(4vh) translateX(50vw) scale(0.3);
      }
      40% {
        transform: translateY(2vh) translateX(70vw) scale(0.2);
      }
      50% {
        transform: translateY(0vh) translateX(90vw) scale(0.2);
      }
      60% {
        transform: translateY(0vh) translateX(110vw) scale(0.1);
      }
      100% {
        transform: translateY(0vh) translateX(110vw) scale(0.1);
      }
    }
  }
`

const StyledLogoWrapper = styled.div`
  transform: translateY(${(props) => -props.offset/5}%);
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

function Landing(props) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }
  }, []);

  return (
    <StyledContainer offset={offset}>
      <div className="bird-container bird-container--one">
        <div className="bird bird--one"></div>
      </div>
      <div className="bird-container bird-container--two">
        <div className="bird bird--two"></div>
      </div>
      <div className="bird-container bird-container--three">
        <div className="bird bird--three"></div>
      </div>
      <div className="bird-container bird-container--four">
        <div className="bird bird--four"></div>
      </div>
      <StyledLogoWrapper offset={offset}>
        <Fade In duration={5000} cascade>
        <StyledLogo>EunGyeol</StyledLogo>
        <StyledLogoSub>은결 이미선 한국화 갤러리</StyledLogoSub>
        </Fade>
      </StyledLogoWrapper>
    </StyledContainer>
  )
}

export default Landing
