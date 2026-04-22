'use client'

import '../styles/albumHeader.css'
import Image from 'next/image'
import { getImageUrl } from '@/app/api/supabase'

export default function AlbumHeader({ title, desc, date, numPhotos, thumbnail }) {

  // get the cover image url
  const albumCoverUrl = getImageUrl(thumbnail)

  return (
    <div className={'album-header }'}>
      <div className='album-info'>
        <div className={'album-data'}>
          <p className='data'>{date}</p>
          <p className='separator'>·</p>
          <p className='data'>{numPhotos} Photos</p>
        </div>
        <h1 className={'title'}>{title}</h1>
        <p className={'desc'}>{desc}</p>
      </div>

      <div className='thumbnail'>
        {albumCoverUrl && (
          <Image
            src={albumCoverUrl}
            alt={albumCoverUrl}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading='lazy'
            quality={40}
          />
        )}
        <div className='shadow' />
      </div>
    </div>
  )
}
