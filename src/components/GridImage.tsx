import { Box } from '@chakra-ui/react'
import type { CloudinaryImage } from '@common/types'
import styled from '@emotion/styled'
import Image from 'next/image'

const ImageContainer = styled(Box)`
  overflow: 'hidden';
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.15s;
  transition-duration: 0.15s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
`

interface GridImageProps {
  image: CloudinaryImage
  onClick: Function
}

const GridImage = ({ image, onClick }: GridImageProps) => (
  <ImageContainer
    key={image.title}
    // TODO: Change Border coloring
    // border="5px"
    // borderColor="blue"
    // borderStyle="solid"
    borderRadius="10px"
    marginTop="10px"
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
        borderRadius: '6px',
      }}
      objectFit="cover"
      width={image.width / 2}
      height={image.height / 2}
      src={image.url}
      key={image.title}
      alt={image.title}
      quality="auto:best"
      loading="lazy"
    />
  </ImageContainer>
)

export default GridImage
