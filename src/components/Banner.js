'use client'

import Image from 'next/image'
import '../styles/banner.css'

import { useState, useEffect } from 'react'

export default function Banner({ images = [], interval = 5000 }) {
  const [current, setCurrent] = useState(0)

  // move slide
  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1)
  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1)

  // auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1))
    }, interval)

    return () => clearInterval(timer)
  }, [current, images.length, interval])

  // arrow key slide
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [current])

  return (
    <div className='banner'>
      <div className='banner-track' style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <div key={i} className='banner-slide'>
            <Image
              src={src}
              alt={`Slide ${i}`}
              fill
              sizes="100vw"
              priority={i === 0}
              quality={85}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ))}
      </div>

      <div className='banner-dots'>
        {images.map((_, i) => (
          <button
            key={i}
            className={`banner-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}