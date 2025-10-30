'use client'

import { useParams } from 'next/navigation';

import '../styles/globals.css';
import '../styles/components.css'
import '../styles/layout.css'
import '../styles/pictureFrame.css'
import ImageBoard from '@/components/ImageBoard';


async function getAlbums() {
  const response = await fetch('/media/albums.json');
  const data = await response.json();

  return data;
}

const albumsJson = await getAlbums()
const albums = albumsJson['albums']

export default function AlbumBoard({album=''}) {
  if (album === '') {
    const urlParams = useParams()
    album = urlParams.album
  }

  // check if album exists
  for (var i in albums) {
    const albumName = albums[i]['albumName']

    if (album == albumName) {
      const description = albums[i]['description']
      const albumPhotos = albums[i]['images']
      const date = albums[i]['date']
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
      );
    }
  }

  if (!(album in albums)) {
    return (
      <h1 className='album-title'>404: Album does not exist</h1>
    )
  }
}
