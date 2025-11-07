'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

import '../styles/board.css'
import PictureViewer from './PictureViewer'
import ButtonClose from './ButtonClose'

export default function ImageCard({ src, alt = 'alt', images, index }) {
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSelectedIndex(null)
      }
    }

    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex])

  return (
    <>
      <button
        className='image-card-button'
        onClick={() => setSelectedIndex(index)}
      >
        <div className='image-card'>
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
            loading='lazy'
            placeholder='empty'
          />
        </div>
      </button>

      {selectedIndex !== null && (
        <div className='overlay' onClick={() => setSelectedIndex(null)}>
          <ButtonClose />
          <div onClick={(e) => e.stopPropagation()} />
          <PictureViewer
            frames={images}
            startIndex={selectedIndex}
          />
        </div>
      )}
    </>
  )
}


