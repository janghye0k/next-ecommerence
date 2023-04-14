import { Rating } from '@/dui/core'
import Head from 'next/head'
import { FaCartPlus, FaEbay, FaHeart, FaSquare, FaTable } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | PIIC</title>
      </Head>
      <main>Welcome</main>
      <Rating icon={<FaHeart />} size="xs" />
      <br />
      <Rating
        icons={[
          <FaCartPlus key="1" />,
          <FaHeart key="1" />,
          <FaSquare key="1" />,
          <FaTable key="1" />,
          <FaEbay key="1" />,
        ]}
        colors={['gray', 'green', 'pink', 'purple', 'theme']}
        size="sm"
      />
      <br />
      <Rating precision />
      <br />
      <Rating size="lg" color="blue" />
      <br />
      <Rating size="xl" color="teal" selectedOnly />
    </>
  )
}
