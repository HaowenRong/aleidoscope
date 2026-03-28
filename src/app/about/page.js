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
            I'll feature a more comprehensive about section in the near future but for now the website is mostly complete with its core functionality being implemented and being integrated with the supabase db.
          </p>
        </div>

      </div>
    </main>
  );
}
