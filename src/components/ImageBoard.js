'use client'

import Image from 'next/image'
import ImageBoardSkeleton from './ImageBoardSkeleton'
import { useState, useEffect } from 'react'
import '../styles/imageBoard.css'
import GroupHeader from './GroupHeader'
import { probeHeader } from '@/app/api/supabase'

export default function ImageBoard({ images, containerWidth, title, desc, showLightbox }) {
  const [loading,       setLoading]       = useState(true) // tracks state for loading skeleton
  const [imgProperties, setImgProperties] = useState([]) // stores image properties 
  const [rows,          setRows]          = useState([])

  useEffect(() => {
    probeHeader(images.map(img => img.src)).then(results => {
      const idedResults = results.map((result, i) => ({
        ...result,
        id: images[i].id
      }))
      setImgProperties(idedResults)
      setLoading(false)
    })
  }, [images])

  // rebuild rows on changes to width
  useEffect(() => {
    if (loading || imgProperties.length === 0) return
    if (!containerWidth) return
    setRows(buildRows(imgProperties))
  }, [loading, containerWidth, imgProperties])

  // build rows based on image dimentions
  function buildRows(images) {
    const targetHeight = 520
    const gap          = 4

    const builtRows = []
    let row      = []
    let rowRatio = 0

    images.forEach((item, i) => {
      row.push(item)
      rowRatio += item.ratio

      const rowWidth = rowRatio * targetHeight + gap * (row.length - 1)

      if (rowWidth >= containerWidth || i === images.length - 1) {
        const height = (containerWidth - gap * (row.length - 1)) / rowRatio
        builtRows.push(row.map(r => ({ ...r, width: r.ratio * height, height })))
        row      = []
        rowRatio = 0
      }
    })

    return builtRows
  }

  if (loading) {
    return <ImageBoardSkeleton />
  }

  return (
    <div className='group-board'>
      <GroupHeader title={title} desc={desc} />

      <div className='images-container'>
        {rows.map((row, r) => (
          <div key={r} className='image-row'>
            {row.map((img, i) => (
              <button
                key={i}
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
                    sizes={`${Math.ceil(img.width)}px`}
                    style={{ objectFit: 'cover' }}
                    loading='lazy'
                  />
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}