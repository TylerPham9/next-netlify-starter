export interface SearchOptionsProps {
  next_cursor?: string
}

export interface CloudinaryResourceProps {
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

export interface ImageProps {
  id: string
  title: string
  image: string
  width: number
  height: number
}

export interface ResourceProps {
  resources: CloudinaryResourceProps[]
  next_cursor?: string
}
