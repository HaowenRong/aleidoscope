'use client'

import { useParams } from 'next/navigation';

import '../styles/globals.css';
import '../styles/components.css'
import '../styles/layout.css'
import '../styles/pictureFrame.css'
import ImageBoard from '@/components/ImageBoard';

const albums = {
  'album1': [
    '/media/20240403_194554.jpg',
    '/media/DSC02989_03.jpg',
    '/media/DSC03063.jpg',
    '/media/DSC04020.jpg',
    '/media/DSC04579.jpg',
    '/media/20240403_194554.jpg',
    '/media/DSC02989_03.jpg',
    '/media/DSC03063.jpg',
    '/media/DSC04020.jpg',
    '/media/DSC04579.jpg',
    '/media/20240403_194554.jpg',
    '/media/DSC02989_03.jpg',
    '/media/DSC03063.jpg',
    '/media/DSC04020.jpg',
    '/media/DSC04579.jpg',
    '/media/20240403_194554.jpg',
    '/media/DSC02989_03.jpg',
    '/media/DSC03063.jpg',
    '/media/DSC04020.jpg',
    '/media/DSC04579.jpg',
    '/media/20240403_194554.jpg',
    '/media/DSC02989_03.jpg',
    '/media/DSC03063.jpg',
    '/media/DSC04020.jpg',
    '/media/DSC04579.jpg',
    '/media/20240403_194554.jpg',
    '/media/DSC02989_03.jpg',
    '/media/DSC03063.jpg',
    '/media/DSC04020.jpg',
    '/media/DSC04579.jpg'
  ],
  'album2': [
    '/media/DSC02989_03.jpg',
    '/media/DSC03063.jpg',
    '/media/DSC04020.jpg',
    '/media/DSC04579.jpg'
  ],
  'album3': [
    '/media/DSC02989_03.jpg',
    '/media/DSC03063.jpg',
    '/media/DSC04020.jpg'
  ]
}

export default function AlbumBoard({album='', description='', date='', numPhotos='0'}) {
  if (album === '') {
    const urlParams = useParams()
    album = urlParams.album
  }

  console.log(album)
  console.log(albums)

  // check if album exists
  if (!(album in albums)) {
    return (
      <h1 className='album-title'>404: Album does not exist</h1>
    )
  }

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
      <ImageBoard images={albums[album]}/>
    </div>
    
  );
}
