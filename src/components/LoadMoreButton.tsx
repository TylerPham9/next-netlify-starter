import { Button } from '@chakra-ui/react'
import type { CloudinaryImage, LoadMoreButtonProps } from '@common/types'
import { prepareImageResources } from '@lib/cloudinary'

const LoadMoreButton = ({ setImages, nextCursor, setNextCursor, text }: LoadMoreButtonProps) => {
  async function handleLoadMore(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()

    const results = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ next_cursor: nextCursor }),
    }).then((response) => response.json())
    const { resources, next_cursor: updatedNextCursor } = results

    const newImages: CloudinaryImage[] = prepareImageResources(resources, false)
    setImages((prev: CloudinaryImage[]) => [...prev, ...newImages])
    setNextCursor(updatedNextCursor)
  }

  return nextCursor ? <Button onClick={handleLoadMore}>{text}</Button> : <></>
}

export default LoadMoreButton
