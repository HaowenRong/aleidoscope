import { lookupAlbum } from '@/app/api/jsonReader.mjs'
import '../styles/globals.css'
import '../styles/components.css'
import '../styles/layout.css'
import '../styles/pictureFrame.css'
import ImageBoard from '@/components/ImageBoard'

export default async function AlbumBoard({ album='' }) {

  const albumData = await lookupAlbum(album)

  // return error if no album found
  if (!albumData) {
    return <h1 className='album-title'>404: Album does not exist</h1>
  }

  const { description, images: albumPhotos, date } = albumData
  const numPhotos = albumPhotos.length

  return (
    <div className='album-board-container'>
      <div className='album-header'>
        <div className='context-section'>
          <h1 className='album-title'>{album}</h1>
          <p>{description}</p>
        </div>
        <div className='info-section'>
          <h3 className='album-info'>{date}</h3>
          <h3 className='album-info'>{numPhotos} Photos</h3>
        </div>
      </div>
      <ImageBoard images={albumPhotos}/>
    </div>
  )
}
