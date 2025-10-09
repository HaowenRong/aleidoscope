'use client'

import { useState } from 'react'
import Image from 'next/image'

import '../styles/board.css'
import PictureViewer from './PictureViewer'
import ButtonClose from './ButtonClose'

export default function ImageCard({ src, alt='alt', images}) {
  const [selectedImage, displayImage] = useState(null)

  return (
    <>
      <button
        className='image-card-button'
        onClick={() => displayImage('a')}>

        <div className='image-card'>
          <Image src={src} alt={alt} fill
                style={{ objectFit: 'cover' }}
          />
        </div>
      </button>
      {selectedImage && (
        <div className='overlay' onClick={() => displayImage(null)}>
          <ButtonClose />
          <div onClick={(e) => e.stopPropagation()} />
          <PictureViewer frames={images} />
        </div>
      )}
    </>
  )
}
