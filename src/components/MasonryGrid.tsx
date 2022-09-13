import type { CloudinaryImage } from '@common/types'
import GridImage from '@components/GridImage'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 5,
  1024: 4,
  769: 3,
}

interface MasonryGridProps {
  images: CloudinaryImage[]
  onClick: Function
}

const MasonryGrid = ({ images, onClick }: MasonryGridProps) => (
  <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-grid-column">
    {images.map((image) => (
      <GridImage key={image.title} image={image} onClick={onClick} />
    ))}
  </Masonry>
)
export default MasonryGrid
