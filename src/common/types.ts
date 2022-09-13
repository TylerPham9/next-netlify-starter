export interface SearchOptions {
  next_cursor?: string
}

export interface CloudinaryResource {
  asset_id: string
  public_id: string
  format: string
  version: number
  resource_type: string
  type: string
  created_at: string
  bytes: number
  width: number
  height: number
  folder: string
  url: string
  secure_url: string
}

export interface CloudinaryImage {
  id: string
  title: string
  url: string
  width: number
  height: number
}

export interface CloudinaryFetchResults {
  resources: CloudinaryResource[]
  next_cursor?: string
}

export interface LoadMoreButtonProps {
  setImages: Function
  nextCursor: string
  setNextCursor: Function
  text: string
}
