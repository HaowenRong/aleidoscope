'use client'

import ImageCard from "./ImageCard"
import '../styles/board.css'

export default function ImageBoard({ images }) {
  return (
    <div className="image-board">
      {images.map((src, i) => (
        <ImageCard src={src} images={images} />
      ))}
    </div>
  )
}
