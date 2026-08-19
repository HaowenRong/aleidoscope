import '../../../styles/globals.css';

import AlbumHeader from '@/components/AlbumHeader';
import BackButton from '@/components/BackBtn';
import { getAlbum } from '@/app/api/supabase';
import GroupBoard from '@/components/GroupBoard';

export default async function Album({ params }) {

  const { album } = await params

  const albumData = await getAlbum(album)
  console.log(albumData)

  return (
    <main className='main'>
      <div className='content album-container'>
        <BackButton />
        <AlbumHeader
          title     = {albumData.title}
          desc      = {albumData.description}
          dataPoints={[
            { title: 'Groups',      data: albumData.groups.length },
            { title: 'Photos',      data: albumData.photo_count   },
            { title: 'Album Date ', data: albumData.date          },
          ]}
          thumbnail = {`public/${albumData.url_name}/${albumData.cover_photo}`}

        />
        <GroupBoard groups={albumData.groups}  />
      </div>
    </main>
  )
}
