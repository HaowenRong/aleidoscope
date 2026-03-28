'use client'

import HighlightInfo from './highlightInfo'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/highlight.css'
import { getNumInFolder, getImageUrl } from '@/app/api/supabase'
import { useState, useEffect } from 'react'

export default function Highlight({ albumName, albumDesc, albumCover, albumDate, albumLink, alignment='left' }) {
  const align = alignment === 'right' ? 'right' : ''

  // get the cover image url
  const albumCoverUrl = getImageUrl(albumCover)

  // get number of photos
  const [numPhotos, setNumPhotos] = useState(0)

  useEffect(() => {
    getNumInFolder(`public/${albumName}`).then(setNumPhotos)
  }, [])

  return (
    <Link href={albumLink} className={`highlight-frame ${align}`}>
      <div className='image-section'>
        {albumCover && (
          <Image
            src     = {albumCoverUrl}
            alt     = {'imageAlt'}
            width   = {1000}
            height  = {1000}
            loading = 'lazy'
          />
        )}
      </div>
      <HighlightInfo
        title         = {albumName}
        desc          = {albumDesc}
        date          = {albumDate}
        numPhotos     = {numPhotos}
        textAlignment = {align}
      />
    </Link>
  )
}
