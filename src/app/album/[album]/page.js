import '../../../styles/globals.css';
import '../../../styles/components.css'
import '../../../styles/layout.css'
import '../../../styles/pictureFrame.css'
import AlbumBoard from '@/components/AlbumBoard';

export default async function Album({ params }) {
  const { album } = await params

  return (
    <main className='main'>
      <div className='content'>
        <AlbumBoard album={album} />
      </div>
    </main>
  );
}
