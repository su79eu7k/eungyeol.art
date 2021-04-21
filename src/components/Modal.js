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
  & button#close {
    margin: 0px;
    padding: 20px;
    align-self: flex-end;
    transform: scale(1.2); 
    color: #fff;
    transition: all .2s ease-out;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    outline: none;
    position: absolute;
    z-index: 4;
    filter: drop-shadow(0 2px 2px #1a1a1a);
    &:hover {
      cursor:pointer;
      color: #337ab7;
      transform: scale(1.3); 
    }
    & svg {
      width: 36px;
      height: 36px;
    }
  }
  @media (max-width: 768px) {
    button#close {
      padding: 15px;
      &:hover {
        color: #fff;
        transform: scale(1.2); 
      }
      & svg {
        width: 24px;
        height: 24px;
    }
  }
  @media (max-width: 480px) {
    button#close {
    padding: 10px;
    & svg {
      width: 16px;
      height: 16px;
    }
  }
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
      <button id='close' onClick={handleClose}><MdClose /></button>
      {props.children}
    </ModalWrapper>
    </Portal>
  )
}

export default Modal
