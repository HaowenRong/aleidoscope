import { lookupAlbum } from '@/app/api/jsonReader.mjs'
import HighlightInfo from './highlightInfo'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/highlight.css'

export default async function Highlight({ album, imageAlt, albumLink='', alignment='left' }) {
  const align = alignment === 'right' ? 'right' : ''

  const albumData = await lookupAlbum(album)

  // return error if no album found
  if (!albumData) {
    return <div href={albumLink} className={`stream-picture-frame ${align}`}>
              <AlbumHeader
                title='Error loading album'
                desc='Unable to retrieve album data'
                date=''
                numPhotos=''
                textAlignment={align}
              />
            </div>
  }

  const { albumName, description, images: albumPhotos, coverPhoto, date } = albumData
  const numPhotos = albumPhotos.length

  return (
    <Link href={albumLink} className={`highlight-frame ${align}`}>
      <div className='image-section'>
          <Image
            src={coverPhoto}
            alt={imageAlt}
            width={1000}
            height={1000}
            loading='lazy'
          />
      </div>
      <HighlightInfo
        title={albumName}
        desc={description}
        date={date}
        numPhotos={numPhotos}
        textAlignment={align}
      />
    </Link>
  )
}
