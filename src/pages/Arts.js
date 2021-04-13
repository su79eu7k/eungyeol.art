import React, { useState, useCallback } from "react"
import Modal from "../components/Modal"
import Gallery from "react-photo-gallery"
import ImageGallery from "react-image-gallery"
import { photos } from "../assets/photos"
import './Arts.css'

function Arts() {
  const [focus, setFocus] = useState(false)
  const [focusIdx, setFocusIdx] = useState(0)

  const handleTouchMove = useCallback((e) => {
    e.preventDefault()
  }, [])

  const rejectScroll = () => {
    document.body.style.overflow = 'hidden'
    document.body.addEventListener('touchmove', handleTouchMove, {
      capture: false,
      once: false,
      passive: false
    })
  }

  const allowScroll = () => {
    document.body.style.overflow = 'auto'
    document.body.removeEventListener('touchmove', handleTouchMove)
  }

  const focusHandler = (event, { index }) => {
    rejectScroll()

    setFocus(true)
    setFocusIdx(index)
  }

  // function getMeta(url){   
  //   const img = new Image();
  //   img.addEventListener("load", function(){
  //       alert( this.naturalWidth +' '+ this.naturalHeight );
  //   });
  //   img.src = url;
  // }

  return (
    <div id='arts'>
      <Gallery photos={photos.map((elem) => { return { ...elem, 'src': elem['original'] } })} onClick={focusHandler} />
      {focus &&
        <Modal visible={focus} setVisible={setFocus} allowScroll={allowScroll}>
          <ImageGallery items={photos} startIndex={focusIdx}></ImageGallery>
        </Modal>
      }
    </div>
  )
}

export default Arts
