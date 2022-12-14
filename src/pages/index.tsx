// import Head from 'next/head'
// import Header from '@components/Header'
// import Footer from '@components/Footer'
import { Box, Center, Container, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import type { CloudinaryFetchResults, CloudinaryImage } from '@common/types'
import Layout from '@components/Layout'
import LoadMoreButton from '@components/LoadMoreButton'
import MasonryGrid from '@components/MasonryGrid'
import { prepareImageResources, search } from '@lib/cloudinary'
import Image from 'next/image'
import { useState } from 'react'

interface HomeProps {
  images: CloudinaryImage[]
  nextCursor: string
}

const Home = ({ images: defaultImages, nextCursor: defaultCursor }: HomeProps) => {
  const [images, setImages] = useState(defaultImages)
  const [nextCursor, setNextCursor] = useState(defaultCursor)
  const [modalImage, setModalImage] = useState<CloudinaryImage | undefined>(undefined)
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
  function updateModal(image: CloudinaryImage) {
    setModalImage(image)
    onOpen()
  }

  return (
    <Layout>
      <>
        <Modal blockScrollOnMount={true} closeOnOverlayClick isOpen={isOpen} onClose={onClose} isCentered size="lg">
          <ModalOverlay />
          <ModalContent
            style={{
              borderRadius: '22px',
              // border: '8px',
              // borderColor: 'blue',
              // borderStyle: 'solid',
            }}
          >
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
                src={modalImage.url}
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
      <Container maxW="container.lg" centerContent={true}>
        <MasonryGrid images={images} onClick={updateModal} />
        <Center height={'100px'}>
          <LoadMoreButton
            setImages={setImages}
            nextCursor={nextCursor}
            setNextCursor={setNextCursor}
            text="Load More Results"
          />
        </Center>
      </Container>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const results = await search()

  const { resources }: CloudinaryFetchResults = results

  const nextCursor: string | null = results?.next_cursor || null
  const images: CloudinaryImage[] = prepareImageResources(resources)

  return {
    props: {
      images,
      nextCursor,
    },
  }
}
