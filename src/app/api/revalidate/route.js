import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

// update page on post
export async function POST(request) {
  const secret = request.headers.get('webhook-secret')

  // verify sender
  if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}