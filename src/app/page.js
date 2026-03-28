'use client'

import '../styles/globals.css'
import '../styles/layout.css'
import Banner from '@/components/Banner';
import Highlight from '@/components/highlight';
import { getAllAlbumData } from './api/supabase';
import { useState, useEffect } from 'react';

export default function Root() {

  // get album data
  const [albumData, setAlbumData] = useState([])

  useEffect(() => {
    getAllAlbumData().then(data => {
      console.log(data)
      setAlbumData(data)
    })
  }, [])

  return (
    <main className='main'>
      <Banner images={[
        "/media/album1/land2.jpg",
        "/media/album2/DSC08482.jpg",
        "/media/album1/land3.jpg"
      ]} />
      <div className='content'>
        {albumData.map((album, i) => (
          <Highlight
            key        = {i}
            albumName  = {album.album_name}
            albumDesc  = {album.description}
            albumCover = {`public/${album.album_name}/${album.cover_photo}`}
            albumDate  = {album.date}
            albumLink  = {`/album/${album.album_name}`}
            alignment  = {i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </main>
  );
}