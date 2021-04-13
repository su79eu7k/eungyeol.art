import React, { useState } from "react"
import Gallery from "react-photo-gallery"
import Lightbox from 'react-image-lightbox'
import "react-image-lightbox/style.css"
import { photos } from "../assets/photos"

function Arts() {
  const [artIdx, setArtIdx] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = () => {
    setIsOpen(true)
  }

  return (
    <div id='arts'>
      <Gallery photos={photos} onClick={() => openLightbox()} />
      {isOpen && 
        <Lightbox
        mainSrc={photos[artIdx].src}
        nextSrc={photos[(artIdx + 1) % photos.length].src}
        prevSrc={photos[(artIdx + photos.length - 1) % photos.length].src}
        onCloseRequest={() => setIsOpen(false)}
        onMovePrevRequest={() => setArtIdx((artIdx + photos.length - 1) % photos.length)}
        onMoveNextRequest={() => setArtIdx((artIdx + 1) % photos.length)}
      />
      }
    </div>
  )
}

export default Arts
