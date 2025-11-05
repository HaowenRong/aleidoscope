'use client'

import { useParams } from 'next/navigation';

import '../../../styles/globals.css';
import '../../../styles/components.css'
import '../../../styles/layout.css'
import '../../../styles/pictureFrame.css'
import AlbumBoard from '@/components/AlbumBoard';

export default function Album() {
  const params    = useParams()
  const albumName = params.album

  return (
    <main className='main'>
      <div className='content'>
        <AlbumBoard album={albumName} />
      </div>
    </main>
  );
}
