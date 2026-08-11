import '../../../styles/globals.css';

import AlbumHeader from '@/components/AlbumHeader';
import BackButton from '@/components/BackBtn';
import { getAlbum } from '@/app/api/supabase';
import GroupBoard from '@/components/GroupBoard';

export default async function Album({ params }) {

  const { album } = await params

  const albumData = await getAlbum(album)

  return (
    <main className='main'>
      <div className='content'>
        <BackButton />
        <AlbumHeader
          title     = {albumData.title}
          desc      = {albumData.description}
          date      = {albumData.date}
          numPhotos = {albumData.photo_count}
          thumbnail = {`public/${albumData.url_name}/${albumData.cover_photo}`}
        />
        <GroupBoard groups={albumData.groups} />
      </div>
    </main>
  );
}
