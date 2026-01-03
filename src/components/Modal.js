import React, { useEffect, useCallback } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Portal from './Portal'
import { MdClose } from 'react-icons/md'
import { theme, media } from '../styles/theme'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.overlay};
  z-index: 999;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transition: visibility 0.5s linear;
  ${props => props.visible && css`animation: ${fadeIn} 0.5s ease-out`};
  ${props => !props.visible && css`animation: ${fadeOut} 0.5s ease-out`};
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  display: flex;
  flex-direction: column;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transition: visibility 0.5s linear;
  ${props => props.visible && css`animation: ${fadeIn} 0.5s ease-out`};
  ${props => !props.visible && css`animation: ${fadeOut} 0.5s ease-out`};
`

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: ${theme.colors.white};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: ${theme.colors.gold};
    color: ${theme.colors.gold};
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.gold};
    outline-offset: 2px;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  ${media.md} {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  ${media.sm} {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`

function Modal({ visible, setFocus, allowScroll, children }) {
  const handleClose = useCallback(() => {
    setFocus(false)
    allowScroll()
  }, [setFocus, allowScroll])

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    if (visible) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [visible, handleClose])

  // 언마운트 시 정리
  useEffect(() => {
    return () => {
      allowScroll()
    }
  }, [allowScroll])

  return (
    <Portal container='modal-root'>
      <ModalOverlay visible={visible} onClick={handleClose} />
      <ModalWrapper
        visible={visible}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery"
      >
        <CloseButton
          onClick={handleClose}
          aria-label="Close modal"
        >
          <MdClose />
        </CloseButton>
        {children}
      </ModalWrapper>
    </Portal>
  )
}

export default Modal
