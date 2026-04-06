'use client'

import '../../../styles/globals.css';

import AlbumHeader from '@/components/AlbumHeader';
import ImageBoard from '@/components/ImageBoard';
import BackButton from '@/components/BackBtn';
import { getFolderImages, getAlbumData, getNumInFolder } from '@/app/api/supabase';
import { use, useEffect, useState } from 'react';

export default function Album({ params }) {
  const { album } = use(params)

  // get album data
  const [albumData, setAlbumData] = useState('')

  useEffect(() => {
    getAlbumData(album).then(data => {
      setAlbumData(data)
    })
  }, [])

  // get number of photos
  const [numPhotos, setNumPhotos] = useState(0)

  useEffect(() => {
    getNumInFolder(`public/${album}`).then(setNumPhotos)
  }, [])

  // get album images
  const [albumImages, setImages] = useState([])

  useEffect(() => {
    getFolderImages(`public/${album}`).then(data => {
      setImages(data)
    })
  }, [])

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
