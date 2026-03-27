import '../../styles/globals.css'
import '../../styles/layout.css'
import '../../styles/about.css'


export default function About() {
  return (
    <main className='main'>
      <div className='content'>

        <div className='about-card'>
          <h1 className='about-title'>What is this?</h1>
          <p className='about-desc'>
            This is a website that I built using Next.js to share some of my photography.
          </p>
          <p className='about-desc'>
            Currently, this is only a front-end and the photos and albums are hard coded in a JSON file, but in the future I plan to connect this to a CDN so that I can upload images there where they will be stored and can be dynamically loaded here.
          </p>
        </div>

      </div>
    </main>
  );
}
