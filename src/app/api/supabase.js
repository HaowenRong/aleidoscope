import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

// get album data
export async function getAllAlbumData() {
  const { data, error } = await supabase
    .from('albums')
    .select('*')

  if (error) {
    console.error(error)
    return []
  }
  
  return data
}

// get single album data
export async function getAlbumData(name) {
  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('album_name', name)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

// get single image
export function getImageUrl(path) {
  const { data } = supabase.storage
    .from('albums')
    .getPublicUrl(path)

  return data.publicUrl
}

// get all images from a folder
export async function getFolderImages(folder) {
  const { data, error } = await supabase.storage
    .from('albums')
    .list(folder, {
      sortBy: { column: 'created_at', order: 'asc' }
    })

  if (error) {
    console.error(error)
    return []
  }

  return data.map(file => getImageUrl(`${folder}/${file.name}`))
}

// get the number of photos in a folder
export async function getNumInFolder(folder) {
  const { data, error } = await supabase.storage
    .from('albums')
    .list(folder, {
      sortBy: { column: 'created_at', order: 'asc' }
    })

  if (error) {
    console.error(error)
    return 0
  }

  return data.length
}

// get banner images
export async function getBannerImages() {
  const { data, error } = await supabase.storage
    .from('albums/banner')
    .list(folder, {
      sortBy: { column: 'created_at', order: 'asc' }
    })

  if (error) {
    console.error(error)
    return []
  }

  return data.map(file => getImageUrl(`${folder}/${file.name}`))
}

export default supabase