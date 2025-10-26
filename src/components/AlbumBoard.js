'use client'

import { useParams } from 'next/navigation';

import '../styles/globals.css';
import '../styles/components.css'
import '../styles/layout.css'
import '../styles/pictureFrame.css'
import ImageBoard from '@/components/ImageBoard';

const albums = {
  'album1': [
    '/media/DSC00235_05.jpg',
    '/media/DSC07672.jpg',
    '/media/DSC07929.jpg',
    '/media/DSC07557.jpg',
    '/media/DSC07009.jpg'
  ],
  'album2': [
    '/media/DSC07672.jpg',
    '/media/DSC07929.jpg',
    '/media/DSC07557.jpg',
    '/media/DSC07009.jpg'
  ],
  'album3': [
    '/media/DSC00235_05.jpg',
    '/media/DSC07672.jpg',
    '/media/DSC07929.jpg',
    '/media/DSC07557.jpg'
  ]
}

export default function AlbumBoard() {
  const urlParams = useParams()
  const album = urlParams.album
  console.log(album)
  console.log(albums)

  // check if album exists
  if (!(album in albums)) {
    return (
      <h1 className='album-title'>404: Album does not exist</h1>
    )
  }

  return (
    <div>
      <h1 className='album-title'>{urlParams.album}</h1>
      <ImageBoard images={albums[album]}/>
    </div>
    
  );
}
