'use client'

import ImageBoard from "./ImageBoard"
import { useRef, useState, useEffect } from "react"
import NavigationBtn from "./NavigationBtn"

export default function GroupBoard({ groups }) {
  const gridRef = useRef(null)
  const [boardWidth, setBoardWidth] = useState(0)

  useEffect(() => {
    if (!gridRef.current) return

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width
      setBoardWidth(width)
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
          containerWidth = {boardWidth}
          
          // group info
          title          = {group.title}
          desc           = {group.desc}
        />
      ))}
    </div>
  )
}