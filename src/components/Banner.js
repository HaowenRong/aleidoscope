'use client'

import Image from 'next/image'
import '../styles/banner.css'
import NavigationBtn from './NavigationBtn'

import { useState, useEffect } from 'react'

export default function Banner({ banners = [], interval = 5000 }) {
  const [current, setCurrent] = useState(0)

  // move slide
  const prev = () => setCurrent(current === 0 ? banners.length - 1 : current - 1)
  const next = () => setCurrent(current === banners.length - 1 ? 0 : current + 1)

  // auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === banners.length - 1 ? 0 : prev + 1))
    }, interval)

    return () => clearInterval(timer)
  }, [current, banners.length, interval])

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
        {banners.map((banner, i) => (
          <div 
            key={i}
            className={`banner-slide${i === current ? ' active' : ''}`}
          >
            <Image
              src={banner.publicUrl}
              alt={`Slide ${i}`}
              fill
              sizes="100vw"
              priority={i === 0}
              quality={75}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              loading='eager'
              onClick={() => setCurrent(i)}
            />
            <div className='link-section'>
              {banner.album && (
                <>
                  <NavigationBtn
                    icon='solar:album-bold'
                    href={{ pathname: `/album/${banner.album}` }}
                    text='View album'
                  />
                  <NavigationBtn
                    icon='solar:earth-bold'
                    href={{ pathname: '/atlas', query: { album: banner.album } }}
                    text='View on map'
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='banner-dots'>
        {banners.map((_, i) => (
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