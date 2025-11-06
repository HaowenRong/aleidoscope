import '../../styles/globals.css';
import '../../styles/components.css'
import '../../styles/layout.css'
import '../../styles/photoStream.css'

import PhotoStreamFrame from '@/components/PhotoStreamFrame';

export default function PhotoStream() {
  return (
    <main className='main'>
      <div className='picture-stream'>
        <PhotoStreamFrame
          album='album1'
          imageAlt='img2'
          albumLink='/album/album1'
        />
        <PhotoStreamFrame
          album='album2'
          imageAlt='img2'
          albumLink='/album/album2'
          alignment='right'
        />
        <PhotoStreamFrame
          album='album3'
          imageAlt='img3'
          description='This is a description'
          albumLink='/album/album3'
        />
      </div>
    </main>
  );
}
