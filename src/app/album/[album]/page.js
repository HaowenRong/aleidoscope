import '../../../styles/globals.css';

import AlbumHeader from '@/components/AlbumHeader';
import ImageBoard from '@/components/ImageBoard';
import { lookupAlbum } from '@/app/api/jsonReader.mjs'
import BackButton from '@/components/BackBtn';

export default async function Album({ params }) {
  const { album } = await params

  const albumData = await lookupAlbum(album)
  const { albumName, description, images: albumPhotos, coverPhoto, date } = albumData
  const numPhotos = albumPhotos.length

  return (
    <main className='main'>
      <div className='content'>
        <BackButton />
        <AlbumHeader
          title={albumName}
          desc={description}
          date={date}
          numPhotos={numPhotos}
          thumbnail={coverPhoto}
        />
        <ImageBoard images={albumPhotos} />
      </div>
    </main>
  );
}
