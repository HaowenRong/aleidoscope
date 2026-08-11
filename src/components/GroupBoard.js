'use client'

import ImageBoard from "./ImageBoard"
import { useRef, useState, useEffect } from "react"

export default function GroupBoard({ groups }) {
  const gridRef = useRef(null)
  const [colWidth, setColWidth] = useState(0)

  useEffect(() => {
    if (!gridRef.current) return

    const observer = new ResizeObserver(([entry]) => {
      const gridWidth = entry.contentRect.width
      const columnGap = 4
      const width     = (gridWidth - columnGap) / 2
      setColWidth(width)
    })

    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

    return (
    <div ref={gridRef} className='image-board-container'>
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