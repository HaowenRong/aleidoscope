'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import '../styles/imageBoard.css'

export default function ImageBoard({ images }) {
  const [rows, setRows] = useState([])
  const containerRef = useRef(null)

  // load images to get their dimentions
  useEffect(() => {
    Promise.all(
      images.map(src => new Promise(resolve => {
        const img = new window.Image()
        img.src = src
        img.onload = () => resolve({ src, ratio: img.naturalWidth / img.naturalHeight })
      }))
    ).then(loaded => {
      buildRows(loaded)
    })
  }, [images])

  // build rows based on image dimentions
  function buildRows(items) {
    const containerWidth = containerRef.current?.offsetWidth || 800
    const targetHeight = 420
    const gap = 4

    const result = []
    let row = []
    let rowRatio = 0

    // calculate heights so that rows can be filled
    items.forEach((item, i) => {
      row.push(item)
      rowRatio += item.ratio

      const rowWidth = rowRatio * targetHeight + gap * (row.length - 1)

      if (rowWidth >= containerWidth || i === items.length - 1) {
        const height = (containerWidth - gap * (row.length - 1)) / rowRatio
        result.push(row.map(r => ({ ...r, width: r.ratio * height, height })))
        row = []
        rowRatio = 0
      }
    })

    setRows(result)
  }

  // check and rebuild rows on window resize
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (rows.length > 0) buildRows(rows.flat().map(i => ({ src: i.src, ratio: i.ratio })))
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [rows])

  return (
    <div className='image-board' ref={containerRef}>
      {rows.map((row, r) => (
        <div key={r} className='image-row'>
          {row.map((img, i) => (
            <div
              key={i}
              className='image'
              style={{
                width: img.width,
                height: img.height,
                flexShrink: 0 
              }}
            >
              <button
                className='image-btn'
                onClick={() => lightbox()}
              >
                <div
                  className='image'
                  style={{
                    width: img.width,
                    height: img.height,
                    flexShrink: 0
                  }}
                >
                  <Image
                    src={img.src}
                    alt={`Image ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}