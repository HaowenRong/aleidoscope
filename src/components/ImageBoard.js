'use client'

import Image from 'next/image'
import ImageBoardSkeleton from './ImageBoardSkeleton'
import { useState, useEffect, useRef } from 'react'
import '../styles/imageBoard.css'
import { getImageUrl } from '@/app/api/supabase'
import { useMemo } from 'react'
import GroupHeader from './GroupHeader'

export default function ImageBoard({ images, containerWidth, title, desc }) {
  const [loading,  setLoading]  = useState(true)
  const [rows,     setRows]     = useState([])
  const [selected, setSelected] = useState(null)

  const loadedItemsRef = useRef([])

  // cache image urls
  const imageUrls = useMemo(
    () => images.map((path) => getImageUrl(path)),
    [images]
  )

  // load images to get their dimentions
  useEffect(() => {
    Promise.all(
      imageUrls.map(src => new Promise(resolve => {
        const img = new window.Image()
        img.src = src
        img.onload = () => resolve({ src, ratio: img.naturalWidth / img.naturalHeight })
      }))
    ).then(loaded => {
      loadedItemsRef.current = loaded
      setLoading(false)
    })
  }, [imageUrls])

  // rebuild rows when loading finishes or container width changes
  useEffect(() => {
    if (loading || loadedItemsRef.current.length === 0) return
    if (!containerWidth) return
    setRows(buildRows(loadedItemsRef.current))
  }, [loading, containerWidth])

  // build rows based on image dimentions
  function buildRows(items) {
    const targetHeight = 420
    const gap          = 4

    const builtRows = []
    let row      = []
    let rowRatio = 0

    items.forEach((item, i) => {
      row.push(item)
      rowRatio += item.ratio

      const rowWidth = rowRatio * targetHeight + gap * (row.length - 1)

      if (rowWidth >= containerWidth || i === items.length - 1) {
        const height = (containerWidth - gap * (row.length - 1)) / rowRatio
        builtRows.push(row.map(r => ({ ...r, width: r.ratio * height, height })))
        row      = []
        rowRatio = 0
      }
    })

    return builtRows
  }

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

  if (loading) {
    return <ImageBoardSkeleton />
  }

  return (
    <div className='image-board'>
      <GroupHeader title={title} desc={desc} />
      {selected !== null && imgArr[selected] && (
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
                />
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}