import { lookupAlbum } from '@/app/api/jsonReader.mjs'
import AlbumHeader from './AlbumHeader'
import '../styles/pictureFrame.css'
import '../styles/photoStream.css'
import ImageBoard from '@/components/ImageBoard'

export default async function AlbumBoard({ album='' }) {

  const albumData = await lookupAlbum(album)

  // return error if no album found
  if (!albumData) {
    return <h1 className='album-title'>404: Album does not exist</h1>
  }

  const { albumName, description, images: albumPhotos, date } = albumData
  const numPhotos = albumPhotos.length

  return (
    <div className='album-board-container'>
      <AlbumHeader
        title={albumName}
        desc={description}
        date={date}
        photos={numPhotos}
        underline={true}
      />
      <ImageBoard images={albumPhotos}/>
    </div>
  )
}
