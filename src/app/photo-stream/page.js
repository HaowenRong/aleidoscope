import '../../styles/globals.css';
import '../../styles/components.css'
import '../../styles/layout.css'
import '../../styles/photoStream.css'

import PhotoStreamFrame from '@/components/PhotoStreamFrame';

const images = [
  '/media/DSC00235_05.jpg',
  '/media/DSC07672.jpg',
  '/media/DSC07929.jpg',
  '/media/DSC07557.jpg',
  '/media/DSC07009.jpg'
]

export default function PhotoStream() {
  return (
    <main className='main'>
      <div className='picture-stream'>
        <PhotoStreamFrame
          title='Title'
          imageSrc={images[0]}
          imageAlt='img'
          description='This is a description'
        />
        <PhotoStreamFrame
          title='Title'
          imageSrc={images[2]}
          imageAlt='img'
          description='This is a description'
          alignment='right'
        />
        <PhotoStreamFrame
          title='Title'
          imageSrc={images[4]}
          imageAlt='img'
          description='This is a description'
        />
      </div>
    </main>
  );
}
