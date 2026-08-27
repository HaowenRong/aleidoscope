import { Suspense } from 'react'
import AtlasPageContent from '@/components/AtlasPageContent'

export default function Atlas() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AtlasPageContent  />
    </Suspense>
  )
}