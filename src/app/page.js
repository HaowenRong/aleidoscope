import '../styles/globals.css';
import '../styles/components.css'

import PictureViewer from '@/components/PictureViewer';
import ImageCard     from '@/components/ImageCard';
import ImageBoard from '@/components/ImageBoard';

const images = [
  '/media/DSC00235_05.jpg',
  '/media/DSC07672.jpg',
  '/media/DSC07929.jpg',
  '/media/DSC07557.jpg',
  '/media/DSC07009.jpg',
  '/media/DSC00235_05.jpg',
  '/media/DSC07672.jpg',
  '/media/DSC07929.jpg',
  '/media/DSC07557.jpg',
  '/media/DSC07009.jpg',
  '/media/DSC00235_05.jpg',
  '/media/DSC07672.jpg',
  '/media/DSC07929.jpg',
  '/media/DSC07557.jpg',
  '/media/DSC07009.jpg',
]


export default function Home() {
  return (
    <main className='main'>
      
      <PictureViewer frames={images} />

    </main>
  );
}
