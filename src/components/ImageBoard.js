'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import '../styles/imageBoard.css'

export default function ImageBoard({ images }) {
  const [rows, setRows]         = useState([])
  const [selected, setSelected] = useState(null)

  const containerRef            = useRef(null)

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


  const imgArr = rows.flat()

  // lightbox functions
  function showLightbox(img) {
    const index = imgArr.findIndex(i => i.src === img.src)
    setSelected(index)
  }

  function prev() {
    setSelected(i => (i === 0 ? 0 : i - 1))
  }

  function next() {
    setSelected(i => (i === imgArr.length - 1 ? imgArr.length - 1 : i + 1))
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape')     setSelected(null)
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selected])



  return (
    <div className='image-board' ref={containerRef}>
      {selected !== null && (
        <div className='lightbox'>
          <div className='image-container' onClick={e => e.stopPropagation()}>
            <Image
              src={imgArr[selected].src}
              alt={`Image ${selected + 1}`}
              fill
              style={{ objectFit: 'contain' }}
            />

            <button className='lightbox-navi-btn left' onClick={ e => prev()}>‹</button>

            <div className='lightbox-navibar'>
              <div className='image-indicator'>
                <p className='count'>{selected + 1}</p>
                <p className=''>/</p>
                <p className='count'>{imgArr.length}</p>
              </div>
            </div>

            <button className='lightbox-navi-btn right' onClick={ e => next()}>›</button>

            <button className='lightbox-btn close' onClick={ e => setSelected(null)}>×</button>
          </div>
        </div>
      )}

      {rows.map((row, r) => (
        <div key={r} className='image-row'>
          {row.map((img, i) => (
            <button
              className='image-btn'
              onClick={() => showLightbox(img)}
            >
              <div
                className='image'
                style={{
                  width:  img.width,
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
          ))}
        </div>
      ))}
    </div>
  )
}