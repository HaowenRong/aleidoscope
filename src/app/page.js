'use client'

import '../styles/globals.css'
import '../styles/layout.css'
import Banner from '@/components/Banner';
import Highlight from '@/components/highlight';
import { getAllAlbumData, getFolderImages } from './api/supabase';
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

  // get banner images
  const [bannerImages, setBannerImages] = useState([])

  useEffect(() => {
    getFolderImages('banner', 'name').then(data => {
      console.log(data)
      setBannerImages(data)
    })
  }, [])

  return (
    <main className='main'>
      <Banner images={ bannerImages } />
      <div className='content'>
        {albumData.map((album, i) => (
          <Highlight
            key        = {i}
            albumName  = {album.title}
            albumDesc  = {album.description}
            albumCover = {`public/${album.url_name}/${album.cover_photo}`}
            albumDate  = {album.date}
            urlName    = {album.url_name}
            alignment  = {i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </main>
  );
}