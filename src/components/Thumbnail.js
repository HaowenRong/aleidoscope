'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getImageUrl } from '@/app/api/supabase'
import ThumbnailSkeleton from './ThumbnailSkeleton'

export default function Thumbnail({ thumbnail }) {
  const [loading,       setLoading]       = useState(true)
  const [albumCoverUrl, setAlbumCoverUrl] = useState(null)

  // get the cover image url
  useEffect(() => {
    setAlbumCoverUrl(getImageUrl(thumbnail))
    setLoading(false)
  }, [thumbnail])

  if (loading) {
    return (<ThumbnailSkeleton />)
  }

  return (
    <div className='thumbnail'>
      {albumCoverUrl && (
        <Image
          src={albumCoverUrl}
          alt={albumCoverUrl}
          fill
          sizes='100'
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          loading='eager'
          quality={20}
        />
      )}
      <div className='shadow' />
    </div>
  )
}
