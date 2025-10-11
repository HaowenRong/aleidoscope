'use client'

import '../styles/slider.css'
import PictureFrame from './PictureFrame'

export default function PictureViewer({ frames }) {
  return (
    <div className="slider">
      {frames.map((src, i) => (
        <div key={i} className="slide">
          <PictureFrame
            title="Picture title..."
            imageSrc={src}
            imageAlt={`image ${i + 1}`}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id lacus erat. Curabitur facilisis neque vitae tempus placerat..."
          />
        </div>
      ))}
    </div>
  )
}
