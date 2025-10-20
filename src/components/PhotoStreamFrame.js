'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function PhotoStreamFrame({ title, imageSrc, imageAlt, description, alignment='left' }) {
  const align = alignment === 'right' ? 'right' : ''

  return (
    <Link href='/' className={`stream-picture-frame ${align}`}>
      <div className='image-container'>
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
      </div>
      
      <div className='info-section'>
        <div className={`title ${align}`}>
          <h1 className='text'>{title}</h1>
        </div>
        <div className='desc'>
          <p className={`text ${align}`}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
