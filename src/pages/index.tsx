// import Head from 'next/head'
// import Header from '@components/Header'
// import Footer from '@components/Footer'
import { Box, Button, Container, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import type { ImageProps, ResourceProps } from '@common/types'
import Layout from '@components/Layout'
import MasonryGrid from '@components/MasonryGrid'
import { prepareImageResources, search } from '@lib/cloudinary'
import Image from 'next/image'
import { useState } from 'react'

interface HomeProps {
  images: ImageProps[]
  nextCursor: string
}

const Home = ({ images: defaultImages, nextCursor: defaultCursor }: HomeProps) => {
  const [images, setImages] = useState(defaultImages)
  const [nextCursor, setNextCursor] = useState(defaultCursor)
  const [modalImage, setModalImage] = useState<ImageProps | undefined>(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // useEffect(() => {
  //   const grid = new MasonryGrid(ImageContainer, {
  //     gap: 5,
  //     // useResizeObserver: true,
  //     // observeChildren: true,
  //   });
  //   grid.renderItems()
  //   setGrid(grid)
  // })
  // useEffect(() => {
  //   (async function run() {
  //     const results = await fetch('/api/search', {
  //       method: 'POST',
  //       body: JSON.stringify({ nextCursor })
  //     }).then(response => response.json())
  //     console.log(results)
  //   })()
  // }, [])
  function updateModal(image: ImageProps) {
    setModalImage(image)
    onOpen()
  }

  async function handleLoadMore(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()

    const results = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ next_cursor: nextCursor }),
    }).then((response) => response.json())
    // console.log(results)
    const { resources, next_cursor: updatedNextCursor } = results

    // console.log('Updated Next Cursor:', updatedNextCursor)
    const newImages: ImageProps[] = prepareImageResources(resources)

    setImages((prev) => [...prev, ...newImages])
    setNextCursor(updatedNextCursor)
  }

  return (
    <Layout>
      <>
        <Modal blockScrollOnMount={false} closeOnOverlayClick isOpen={isOpen} onClose={onClose} isCentered size="lg">
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Modal Title</ModalHeader> */}
            {/* <ModalCloseButton /> */}
            {/* <ModalBody> */}
            {modalImage ? (
              <Image
                style={{
                  borderRadius: '10px',
                }}
                width={modalImage.width}
                height={modalImage.height}
                src={`/w_1000/${modalImage.url}`}
                alt={modalImage.title}
                loading="lazy"
              />
            ) : (
              <Box />
            )}
            {/* </ModalBody> */}

            {/* <ModalFooter> */}
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button> */}
            {/* <Button variant='ghost'>Secondary Action</Button> */}
            {/* </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
      <Container maxW="container.lg">
        <MasonryGrid images={images} onClick={updateModal} />
        <Button onClick={handleLoadMore}>Load More Results</Button>
      </Container>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const results = await search()

  const { resources }: ResourceProps = results

  const nextCursor: string | null = results?.next_cursor || null
  const images: ImageProps[] = prepareImageResources(resources)
  return {
    props: {
      images,
      nextCursor,
    },
  }
}
