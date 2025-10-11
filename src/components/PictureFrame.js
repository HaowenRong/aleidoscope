'use client'

import Image from 'next/image'

export default function PictureFrame({ title, imageSrc, imageAlt, description }) {
  return (
    <div className="picture-frame" onClick={(e) => e.stopPropagation()}>
      <div className="picture-title">
        <h1 className="text">{title}</h1>
      </div>
      <div className="picture-container">
        <Image
          
          src={imageSrc}
          alt={imageAlt}
          width={1000}
          height={1000}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            height: 'auto',
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}

        />
        <div className="picture-desc">
          <div className="text">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}
