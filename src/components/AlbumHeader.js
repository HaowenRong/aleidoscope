
import '../styles/albumHeader.css'
import Image from 'next/image'

export default function AlbumHeader({ title, desc, date, numPhotos, thumbnail }) {


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
        {thumbnail && (
          <Image
            src={thumbnail}
            alt='a'
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading='lazy'
          />
        )}
      </div>
    </div>
  )
}
