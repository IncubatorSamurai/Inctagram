export type Photo = {
  id: string
  fileUrl: string
  croppedFileUrl?: string | null
  filteredFileUrl?: string | null
  zoomInit?: number | null
  cropInit?: { x: number; y: number } | null
  aspectInit?: number | null
  type: string
}