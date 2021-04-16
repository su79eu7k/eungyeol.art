import React, { useState, useEffect, useCallback } from "react"
import Modal from "../components/Modal"
import Gallery from "react-photo-gallery"
import ImageGallery from "react-image-gallery"
import { photos } from "../photos"
import './Arts.css'

function Arts() {
  const [images, setImages] = useState(null)
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

  const getMeta = async (url) => {
    const img = new Image()
    img.src = url
    await img.decode()
    return { 'width': img.width, 'height': img.height, 'src': img.src }
  }

  useEffect(() => {
    async function fetchData() {
      const getImgs = async () => {
        return await Promise.all(photos.map(async (elem) => {
          const meta = await getMeta(elem['original'])
          return { ...elem, ...meta } 
        }))
      }

      setImages(await getImgs())
    }
    fetchData()
  }, [])

  return (
    <div id='arts'>
      {images && 
      <Gallery photos={images} onClick={focusHandler} />
      }
      {focus &&
        <Modal visible={focus} setVisible={setFocus} allowScroll={allowScroll}>
          <ImageGallery items={images} startIndex={focusIdx}></ImageGallery>
        </Modal>
      }
    </div>
  )
}

export default Arts
