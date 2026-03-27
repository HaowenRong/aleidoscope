import '../styles/globals.css'
import '../styles/layout.css'
import Banner from '@/components/Banner';
import Highlight from '@/components/highlight';

export default function Root() {
  return (
      <main className='main'>
        <Banner images={[
          "/media/album1/land2.jpg",
          "/media/album2/DSC08482.jpg",
          "/media/album1/land3.jpg"
        ]} />
        <div className='content'>
          <Highlight
            album='album1'
            imageAlt='img2'
            albumLink='/album/album1'
          />
          <Highlight
            album='album2'
            imageAlt='img2'
            albumLink='/album/album2'
            alignment='right'
          />
        </div>
      </main>
    );
}