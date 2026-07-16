import '../../../styles/globals.css';

import AlbumHeader from '@/components/AlbumHeader';
import ImageBoard from '@/components/ImageBoard';
import BackButton from '@/components/BackBtn';
import { getFolderImages, getAlbumData, getNumInFolder } from '@/app/api/supabase';

export default async function Album({ params }) {
  
  const { album } = await params

  const albumData  = await getAlbumData(album)
  const numPhotos  = await getNumInFolder(`public/${album}`)
  const albumImages = await getFolderImages(`public/${album}`)

  return (
    <main className='main'>
      <div className='content'>
        <BackButton />
        <AlbumHeader
          title     = {albumData.title}
          desc      = {albumData.description}
          date      = {albumData.date}
          numPhotos = {numPhotos}
          thumbnail = {`public/${albumData.url_name}/${albumData.cover_photo}`}
        />
        <ImageBoard images={albumImages} />
      </div>
    </main>
  );
}
