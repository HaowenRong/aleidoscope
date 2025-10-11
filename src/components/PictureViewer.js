'use client'

import { useEffect, useRef } from 'react'
import '../styles/slider.css'
import PictureFrame from './PictureFrame'

export default function PictureViewer({ frames, startIndex = 0 }) {
  const sliderIndexes = useRef(null)

  useEffect(() => {
    if (sliderIndexes.current && startIndex >= 0 && startIndex < frames.length) {
      const slide = sliderIndexes.current.children[startIndex]
      if (slide) {
        slide.scrollIntoView({ behavior: 'instant', inline: 'center' })
      }
    }
  }, [startIndex, frames])

  return (
    <div className="slider" ref={sliderIndexes}>
      {frames.map((src, i) => (
        <div key={i} className="slide">
          <PictureFrame
            title={`Picture`}
            imageSrc={src}
            imageAlt={`image ${i + 1}`}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id lacus erat..."
          />
        </div>
      ))}
    </div>
  )
}
