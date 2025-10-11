'use client'

import ImageCard from "./ImageCard"
import '../styles/board.css'

export default function ImageBoard({ images }) {
  return (
    <div className="image-board">
      {images.map((src, i) => (
        <ImageCard
          key={i}
          index={i}
          src={src}
          alt={`Image ${i + 1}`}
          images={images}
        />
      ))}
    </div>
  )
}
