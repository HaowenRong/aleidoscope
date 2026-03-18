import { lookupAlbum } from '@/app/api/jsonReader.mjs'
import AlbumHeader from './AlbumHeader'
import Link from 'next/link'
import Image from 'next/image'

export default async function PhotoStreamFrame({ album, imageAlt, albumLink='', alignment='left' }) {
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
    <Link href={albumLink} className={`stream-picture-frame ${align}`}>
      <div className='image-container'>
        <Image
          src={coverPhoto}
          alt={imageAlt}
          width={1000}
          height={1000}
          style={{
            maxWidth: '100%',
            maxHeight: '40svh',
            height: 'auto',
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
          loading='lazy'
        />
      </div>

      <AlbumHeader
        title={albumName}
        desc={description}
        date={date}
        numPhotos={numPhotos}
        textAlignment={align}
      />

    </Link>
  )
}
