import type {
  CloudinaryResourceProps,
  ImageProps,
  ResourceProps as SearchResultsProps,
  SearchOptionsProps,
} from '@common/types'

interface ParamsProps {
  max_results?: string
  next_cursor?: string
}

export async function search(options: SearchOptionsProps = {}): Promise<SearchResultsProps> {
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
function randomizeArray(resources: CloudinaryResourceProps[]): CloudinaryResourceProps[] {
  for (let i = resources.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = resources[i]
    resources[i] = resources[j]!
    resources[j] = temp!
  }
  return resources
}
/* eslint-enable no-param-reassign */

function mapImageResources(resources: CloudinaryResourceProps[]): ImageProps[] {
  return resources.map((resource: CloudinaryResourceProps) => {
    const splitUrl: string[] = resource.secure_url.split(`${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`)

    return {
      id: resource.asset_id,
      title: resource.public_id,
      url: splitUrl[1]!,
      width: resource.width,
      height: resource.height,
    }
  })
}

export function prepareImageResources(resources: CloudinaryResourceProps[]): ImageProps[] {
  const randomizedResources = randomizeArray(resources)
  return mapImageResources(randomizedResources)
}
