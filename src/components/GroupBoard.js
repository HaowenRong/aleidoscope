'use client'

import ImageBoard from "./ImageBoard"
import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import '../styles/imageBoard.css'
import { getImageUrl } from "@/app/api/supabase"
import LightBox from "./LightBox"

export default function GroupBoard({ groups }) {
  const gridRef = useRef(null)
  const [boardWidth, setBoardWidth] = useState(0)    // tracks board width
  const [selected,   setSelected]   = useState(null) // tracks light box index

  useEffect(() => {
    if (!gridRef.current) return

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width
      setBoardWidth(width)
    })

    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  // attach image urls to groups
  const groupsWithSrc = useMemo(
    () => groups.map(group => ({
      ...group,
      images: group.images
      .filter(image => !image.file_path.includes('_marker'))
      .map(image => ({
        ...image,
        src: getImageUrl(image.file_path)
      }))
    })),
    [groups]
  )

  // lightbox functions
  const imgArr = useMemo(
    () => groupsWithSrc.flatMap(group => group.images),
    [groupsWithSrc]
  )

  const showLightbox = useCallback((img) => {
    const index = imgArr.findIndex(i => i.id === img.id)
    setSelected(index)
  }, [imgArr])

  return (
    <div ref={gridRef} className='groups-container'>
      {selected !== null && imgArr[selected] && (
        <LightBox imgArr={imgArr} selected={selected} setSelected={setSelected}  />
      )}
      {groupsWithSrc.map(group => (
        <ImageBoard
          key            = {group.id}
          images         = {group.images}
          containerWidth = {boardWidth}
          
          // group info
          title          = {group.title}
          desc           = {group.desc}

          // lightbox
          showLightbox   = {showLightbox}
        />
      ))}
    </div>
  )
}