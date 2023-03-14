import { StorageClient } from '@supabase/storage-js'

function createSupabaseStorage() {
  const storageClient = new StorageClient(process.env.SUPABASE_STORAGE_URL, {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
  })
  return storageClient
}

function uploadFile(path: string, file: File) {
  const storageClient = createSupabaseStorage()
  return storageClient.from('piic').upload(path, file)
}

function downloadFile(path: string) {
  const storageClient = createSupabaseStorage()
  return storageClient.from('piic').download(path)
}

function replaceFile(path: string, file: File) {
  const storageClient = createSupabaseStorage()
  return storageClient
    .from('piic')
    .update(path, file, { cacheControl: '3600', upsert: true })
}

function deleteFile(path: string) {
  const storageClient = createSupabaseStorage()
  return storageClient.from('piic').remove([path])
}

function getFileUrl(path: string) {
  const storageClient = createSupabaseStorage()
  return storageClient.from('piic').getPublicUrl(path)
}

export { uploadFile, downloadFile, replaceFile, deleteFile, getFileUrl }
export default createSupabaseStorage
