import { lookupAlbum } from '@/app/api/jsonReader.mjs'
import Link from 'next/link'
import Image from 'next/image'

export default async function PhotoStreamFrame({ album, imageAlt, albumLink='', alignment='left' }) {
  const align = alignment === 'right' ? 'right' : ''

  const albumData = await lookupAlbum(album)

  // return error if no album found
  if (!albumData) {
    return <div href={albumLink} className={`stream-picture-frame ${align}`}>
              <div className='image-container' />
              
              <div className='info-section'>
                <div className={`title ${align}`}>
                  <h1 className='text'>Error loading album</h1>
                </div>
                <div className='desc'>
                  <p className={`text ${align}`}>
                    Unable to retrieve album data
                  </p>
                </div>
              </div>
            </div>
  }

  const { albumName, description, images: albumPhotos,coverPhoto, date } = albumData
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
            maxHeight: '100%',
            height: 'auto',
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>
      
      <div className='info-section'>
        <h1 className={`title ${align}`}>
          {albumName}
        </h1>
        <div className={`album-data ${align}`}>
          <p className='date'>
            {date}
          </p>

          <div className='dot'></div>
          
          <p className='count'>
            {numPhotos} Photos
          </p>
        </div>
        <p className={`desc ${align}`}>
          {description}
        </p>
      </div>
    </Link>
  )
}
