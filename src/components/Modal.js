import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import Portal from './Portal'
import { MdClose } from 'react-icons/md'

const fadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1
  }
  100% {
    opacity: 0
  }
`

const ModalWrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: visibility 1s linear;
  ${(props) => props.visible && css`animation: ${fadeIn} 1s`};
  ${(props) => !props.visible && css`animation: ${fadeOut} 1s`};
  display: flex;
  flex-flow: column nowrap;
  & button {
    align-self: flex-end;
    margin:0px;
    padding:0px;
    border-width: 0px;
    background-color: transparent;
  }
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 999;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: visibility 1s linear;
  ${(props) => props.visible && css`animation: ${fadeIn} 1s`};
  ${(props) => !props.visible && css`animation: ${fadeOut} 1s`};
`

function Modal(props) {
  const handleClose = () => {
    props.setFocus(false)
    props.allowScroll()
  }
  return (
    <Portal container='modal-root'>
    <ModalOverlay visible={props.visible} />
    <ModalWrapper visible={props.visible}>
      <button onClick={handleClose}><MdClose style={{
        width: '40px', 
        height: '40px', 
        color: '#ffffff',
      }}/></button>
      {props.children}
    </ModalWrapper>
    </Portal>
  )
}

export default Modal
