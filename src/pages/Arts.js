import React, { useState, useEffect, useCallback } from "react"
import Modal from "../components/Modal"
import Gallery from "react-photo-gallery"
import ImageGallery from "react-image-gallery"
import { photos } from "../photos"
import './Arts.css'

function Arts () {
  const [images, setImages] = useState([])
  const [focus, setFocus] = useState(false)
  const [focusIdx, setFocusIdx] = useState(0)
  const [intersection, setIntersection] = useState(null)
  const [loadingIdx, setLoadingIdx] = useState(10)
  const [isLoaded, setIsLoaded] = useState(false)

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
    try {
      await img.decode()
    } catch {
      console.log(img.src)
    }
    return { 'width': img.width, 'height': img.height, 'src': img.src }
  }

  useEffect(() => {
    async function fetchData () {
      const getImgs = async () => {
        return await Promise.all(photos.slice(loadingIdx - 10, loadingIdx).map(async (elem) => {
          const meta = await getMeta(elem['original'])
          return { ...elem, ...meta }
        }))
      }

      const _images = await getImgs()
      setImages(images => images.concat(_images))
      setIsLoaded(true)
    }
    fetchData()
  }, [loadingIdx])

  useEffect(() => {
    const _onIntersect = ([entry]) => {
      if (entry.isIntersecting) {
        console.log('Touched!');
        setIsLoaded(false)
        setLoadingIdx(loadingIdx => loadingIdx + 10)
      }
    };

    let observer;
    if (intersection) {
      observer = new IntersectionObserver(_onIntersect, { threshold: 1 });
      observer.observe(intersection);
    }

    return () => observer && observer.disconnect();
  }, [intersection]);

  return (
    <div id='arts'>
      {images &&
        <Gallery photos={images} onClick={focusHandler} />}
      {isLoaded && loadingIdx <= photos.length &&
        <div ref={setIntersection}>Loading...</div>}
      {focus &&
        <Modal visible={focus} setFocus={setFocus} allowScroll={allowScroll}>
          <ImageGallery items={images} startIndex={focusIdx}></ImageGallery>
        </Modal>}
    </div>
  )
}

export default Arts
