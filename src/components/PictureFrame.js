'use client'

import Image from 'next/image'

export default function PictureFrame({ title, imageSrc, imageAlt, description }) {
  return (
    <div className="picture-frame" onClick={(e) => e.stopPropagation()}>
      <div className="picture-title">
        <h1 className="text">{title}</h1>
      </div>
      <div className="picture-container">
        <div className="picture">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="picture-desc">
          <div className="text">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}
