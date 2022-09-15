import type { CloudinaryFetchResults, CloudinaryImage, CloudinaryResource, SearchOptions } from '@common/types'
import { optimizeArrayByHeight, randomizeArray } from '@common/utils'

interface ParamsProps {
  max_results?: string
  next_cursor?: string
}

export async function search(options: SearchOptions = {}): Promise<CloudinaryFetchResults> {
  const params: ParamsProps = {
    max_results: process.env.CLOUDINARY_MAX_RESULTS,
    ...options,
  }

  const paramString: string = Object.keys(params)
    .map((key: string) => {
      const value: string = params[key as keyof typeof params]!
      return value ? `${key}=${encodeURIComponent(value)}` : ''
    })
    .join('&')

  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?${paramString}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString('base64')}`,
      },
    },
  ).then((response: Response) => response.json())
  return results
}

function mapImageResources(resources: CloudinaryResource[]): CloudinaryImage[] {
  return resources.map((resource: CloudinaryResource) => {
    return {
      id: resource.asset_id,
      title: resource.public_id,
      url: resource.public_id,
      width: resource.width,
      height: resource.height,
    }
  })
}

export function prepareImageResources(resources: CloudinaryResource[], optimize: boolean = true): CloudinaryImage[] {
  const randomizedResources = randomizeArray(resources)
  const mappedImages = mapImageResources(randomizedResources)

  const result = optimize ? optimizeArrayByHeight(mappedImages, 6) : mappedImages
  return result
}
