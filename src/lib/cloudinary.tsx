import type { CloudinaryFetchResults, CloudinaryImage, CloudinaryResource, SearchOptions } from '@common/types'

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

/* eslint-disable no-param-reassign */
function randomizeArray(resources: CloudinaryResource[]): CloudinaryResource[] {
  for (let i = resources.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = resources[i]
    resources[i] = resources[j]!
    resources[j] = temp!
  }
  return resources
}

function optimizeHeights(images: CloudinaryImage[]): CloudinaryImage[] {
  for (let i = 1; i < 6; i += 1) {
    let j = i
    while (images[i - 1]?.height === images[j]?.height) {
      j += 1
    }
    const temp = images[i]
    images[i] = images[j]!
    images[j] = temp!
  }
  return images
}
/* eslint-enable no-param-reassign */

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

export function prepareImageResources(resources: CloudinaryResource[]): CloudinaryImage[] {
  const randomizedResources = randomizeArray(resources)
  const mappedImages = mapImageResources(randomizedResources)
  const result = optimizeHeights(mappedImages)
  return result
}
