import '../../styles/globals.css';
import '../../styles/components.css'
import '../../styles/layout.css'
import '../../styles/pictureFrame.css'
import AlbumBoard from '@/components/AlbumBoard';

export default function Albums() {
  return (
    <main className='main'>
      <div className='content'>
        <AlbumBoard album='album1'
                    description='Album Desc.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id lacus erat...'
                    date='2000/10/20'
                    numPhotos='20'/>
        <AlbumBoard album='album2'
                    description='Album Desc.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id lacus erat...'
                    date='2002/10/20'
                    numPhotos='30'/>
        <AlbumBoard album='album3'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id lacus erat...'
                    date='2004/10/20'
                    numPhotos='40'/>
      </div>
    </main>
  );
}
