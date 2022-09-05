import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Masonry from 'react-masonry-css'

const ImageContainer = styled(Box)`
  position: relative;
  border-radius: 10px;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.15s;
  transition-duration: 0.15s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
`

const breakpointColumnsObj = {
  default: 3,
  769: 2,
}

interface MasonryGridProps {
  images: any[]
  onClick: Function
}

const MasonryGrid = ({ images, onClick }: MasonryGridProps) => (
  <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-grid-column">
    {images.map((image) => {
      return (
        <ImageContainer
          key={image.title}
          _hover={{
            zIndex: '9',
            transform: 'scale(1.5)',
          }}
        >
          <Image
            onClick={() => {
              onClick(image)
            }}
            style={{
              borderRadius: '1em',
            }}
            width={image.width}
            height={image.height}
            src={image.url}
            key={image.title}
            alt={image.title}
            quality="auto:best"
            loading="lazy"
          />
        </ImageContainer>
      )
    })}
  </Masonry>
)
export default MasonryGrid
