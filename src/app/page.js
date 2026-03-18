import '../styles/globals.css';
import '../styles/components.css'
import '../styles/layout.css'
import { redirect } from 'next/navigation'

export default function Root() {
  redirect('/photo-stream')
}