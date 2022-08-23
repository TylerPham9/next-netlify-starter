import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Image from 'next/image'


// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

const files = [
  'IMG_20171126_123334.jpg', 'IMG_20171217_103724.jpg', 'IMG_20171226_203054.jpg',
  'IMG_20171126_123337.jpg', 'IMG_20171217_103729.jpg', 'IMG_20171226_203126.jpg',
  'IMG_20171126_123755.jpg', 'IMG_20171217_103804.jpg', 'IMG_20171226_203129.jpg',
  'IMG_20171126_123832.jpg', 'IMG_20171218_203143.jpg', 'IMG_20171228_215216.jpg',
  'IMG_20171212_223840.jpg', 'IMG_20171222_174159.jpg', 'IMG_20210728_113228.jpg',
  'IMG_20171212_223842.jpg', 'IMG_20171222_174204.jpg', 'IMG_20210805_094749~2.jpg',
  'IMG_20171212_224051.jpg', 'IMG_20171226_202943.jpg', 'IMG_20171212_224058.jpg',
  'IMG_20171226_202949.jpg',
]

export default function Home() {
  // const files = [
  //   'IMG_20171126_123334.jpg'
  // ]
  // let temp = 'IMG_20171126_123334.jpg'
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div >
          <div className="masonry">

            {files.map(element => (
              <div className='item'>
                <img src={`/assets/${element}?nf_resize=fit&w=100`} />
                {/* <img
                  style='max-width: 100%'
                  src={`/assets/${element}?nf_resize=fit&w=300`}
                  alt="Picture of the author"
                  layout='fill'
                  key={element}
                  // width={300}
                  width={500}
                  height={500}

                /> */}
              </div>
            ))}

          </div>
        </div>

        {/* <Image
          src={`/assets/IMG_20171126_123334.jpg`}
          alt="Picture of the author"
          width={500}
          height={500}
        /> */}

      </main>
      {/* <CloudinaryContext cloudName="dxjywo2kk">
        <div>
          <Image publicId="IMG_20180113_131841_bqeyxg" width="500" />
        </div>
      </CloudinaryContext> */}

      <Footer />
    </div>
  )
}
