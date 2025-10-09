import '../../styles/globals.css';
import '../../styles/components.css'

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

      <ImageBoard images={images} />

    </main>
  );
}
