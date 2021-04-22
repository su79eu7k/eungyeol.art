import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
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

const StyledNav = styled.nav`
  & ul {
    padding: 0px;
    display: flex;
    flex-flow: row nowrap;
    & li {
      list-style-type: none;
      padding-left: 20px;
      padding-right: 20px;
      & a, a:visited {
        color: #857e7a;
        text-decoration: none;
      }
      & a:hover {
        text-decoration: underline;
      }
      & button {
        margin: 0px;
        padding: 0px;
        border-width: 0px;
        background-color: transparent;
        font-family: inherit;
        font-size: inherit;
        color: #857e7a;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
`

function NavBar (props) {
  const handleLang = () => {
    if (props.lang === 'English') {
      props.setLang('Korean')
    } else {
      props.setLang('English')
    }
  }
  return (
    <StyledHeader>
      <StyledLogo>
        EunGyeol
      </StyledLogo>
      <StyledLogoSub>
        은결 이미선 한국화 갤러리
      </StyledLogoSub>
      <StyledNav>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/arts'>Gallery</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          {/* <li><NavLink to='/contact'>Contact</NavLink></li> */}
          <li><button onClick={handleLang}>{props.lang === 'English' ? 'English' : 'Korean'}</button></li>
        </ul>
      </StyledNav>
    </StyledHeader>
  )
}

export default NavBar
