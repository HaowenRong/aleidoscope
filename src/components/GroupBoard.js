'use client'

import ImageBoard from "./ImageBoard"
import { useRef, useState, useEffect } from "react"

export default function GroupBoard({ groups }) {
  const gridRef = useRef(null)
  const [colWidth, setColWidth] = useState(0)

  useEffect(() => {
    if (!gridRef.current) return

    const isMobileView = window.matchMedia('(max-width: 768px)').matches;

    let cols = groups.length > 1 ? 2 : 1
    cols = isMobileView ? 1 : cols
    let columnGap = isMobileView ? 0 : 20

    const observer = new ResizeObserver(([entry]) => {
      const gridWidth = entry.contentRect.width
      const width     = (gridWidth - columnGap) / cols
      setColWidth(width)
    })

    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [groups])

    return (
    <div ref={gridRef} className='groups-container'>
      {groups.map(group => (
        <ImageBoard
          key            = {group.id}
          images         = {group.images.map((image) => image.file_path)}
          containerWidth = {(colWidth)}
          
          // group info
          title          = {group.title}
          desc           = {group.desc}
        />
      ))}
    </div>
  )
}