'use client'

import '../../../styles/globals.css';
import '../../../styles/components.css'
import '../../../styles/layout.css'
import '../../../styles/pictureFrame.css'
import AlbumBoard from '@/components/AlbumBoard';

export default function Album() {
  return (
    <main className='main'>
      <div className='content'>
        <AlbumBoard />
      </div>
    </main>
  );
}
