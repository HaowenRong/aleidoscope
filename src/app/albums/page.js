import '../../styles/globals.css';
import '../../styles/components.css'
import '../../styles/layout.css'
import '../../styles/pictureFrame.css'
import ImageBoard from '@/components/ImageBoard';
import AlbumBoard from '@/components/AlbumBoard';

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
  '/media/DSC07009.jpg'
]


export default function Albums() {
  return (
    <main className='main'>
      <div className='content'>
        <AlbumBoard album='album1'/>
        <AlbumBoard album='album2'/>
        <AlbumBoard album='album3'/>
      </div>
    </main>
  );
}
