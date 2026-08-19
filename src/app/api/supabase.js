import { createClient } from '@supabase/supabase-js'
import imageSize from 'image-size'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

// get all album data
export async function getAlbums() {
  const { data, error } = await supabase
    .from('albums')
    .select(`
      *,
      groups (
        images (count)
      )
    `)
    .order('date', { ascending: false })

  if (error) throw error

  return data.map(({ groups, ...album }) => ({
    ...album,
    photo_count: groups.reduce(
      (sum, group) => sum + (group.images[0].count),
      0
    ),
  }))
}

// get single album data
export async function getAlbum(urlName) {
  const { data, error } = await supabase
    .from('albums')
    .select(`
      *,
      groups (
        *,
        images (*)
      )
    `)
    .eq('url_name', urlName)
    .order('sort_order', { referencedTable: 'groups.images', ascending: true })
    .single()

  if (error) throw error

  const photo_count = data.groups.reduce(
    (sum, group) => sum + group.images.length,
    0
  )

  return { ...data, photo_count }
}

// get all groups as an array
export async function getAllGroups() {
  const { data, error } = await supabase
    .from('albums')
    .select(`
      url_name,
      groups (
        *,
        images (
          *
        )
      )
    `)
    .order('sort_order', { referencedTable: 'groups.images', ascending: true })

  if (error) throw error

  return data.flatMap((album) =>
    album.groups.map((group) => ({
      ...group,
      album_url_name: album.url_name,
    }))
  )
}

// get group data along with its images
export async function getGroupWithImages(groupId) {
  const { data, error } = await supabase
    .from('groups')
    .select(
      `
      *,
      images (
        *
      )
    `
    )
    .eq('id', groupId)
    .order('sort_order', { referencedTable: 'images', ascending: true })
    .single()

  if (error) throw error
  return data
}


// get banner images
export async function getBanners() {
  const { data, error } = await supabase
    .from('banners')
    .select('file_path')

  if (error) throw error

  return data.map(
    (banner) => supabase.storage.from('albums').getPublicUrl(banner.file_path).data.publicUrl
  )
}


// get the path to an image
export function getImageUrl(path, suffix='') {
  if (!path) return null

  path = (path + suffix)

  const { data } = supabase.storage.from('albums').getPublicUrl(path)
  return data.publicUrl
}

// get image dimentions from headers
export async function probeHeader(urls) {
  return Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, {
          headers: { Range: 'bytes=0-65535' }
        })
        const buffer = Buffer.from(await res.arrayBuffer())
        const { width, height } = imageSize(buffer)
        return {
          src:    url,
          width:  width,
          height: height,
          ratio:  width / height
        }
      } catch {
        return { src: url, ratio: 1 }
      }
    })
  )
}

export default supabase