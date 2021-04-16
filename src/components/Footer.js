import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.header`
  background-color: #dbdada;
  color: #857e7a;
  font-family: 'Roboto', sans-serif;
  font-size: .6rem;
  padding: .8vh;
  text-align: center;
`

function NavBar () {
  return (
    <StyledFooter>
      Copyright 2021. Lee, Mi Sun. All rights reserved.
    </StyledFooter>
  )
}

export default NavBar
