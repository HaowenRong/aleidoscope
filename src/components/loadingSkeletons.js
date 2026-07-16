import '../styles/loadingSkeletons.css'

export default function ImageBoardSkeleton({}) {
  return (
    <div className='imageBoardLoadingContainer'>
      <div className='card' />
      <div className='card' />
      <div className='card' />
      <div className='card' />
      <div className='card' />
      <div className='card' />
    </div>
  );
}
