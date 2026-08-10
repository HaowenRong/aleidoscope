import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

// get all album data
export async function getAlbums() {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .order("date", { ascending: false })

  if (error) throw error
  return data
}

// get single album data
export async function getAlbum(urlName) {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("url_name", urlName)
    .single()

  if (error) throw error
  return data
}

// get album data along with groups and images
export async function getAlbumWithAll(urlName) {
  const { data, error } = await supabase
    .from("albums")
    .select(
      `
      *,
      groups (
        *,
        images (
          *
        )
      )
    `
    )
    .eq("url_name", urlName)
    .order("sort_order", { referencedTable: "groups.images", ascending: true })
    .single()

  if (error) throw error
  return data
}

// get groups in an album
export async function getAlbumGroups(albumId) {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("album_id", albumId)
    .order("date", { ascending: true })

  if (error) throw error
  return data
}

// get all groups as an array
export async function getAllGroups() {
  const { data, error } = await supabase
    .from("albums")
    .select(`
      url_name,
      groups (
        *
      )
    `)

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
    .from("groups")
    .select(
      `
      *,
      images (
        *
      )
    `
    )
    .eq("id", groupId)
    .order("sort_order", { referencedTable: "images", ascending: true })
    .single()

  if (error) throw error
  return data
}

// get the path to an image
export function getImageUrl(path) {
  if (!path) return null

  const { data } = supabase.storage.from("albums").getPublicUrl(path)
  return data.publicUrl
}

export default supabase