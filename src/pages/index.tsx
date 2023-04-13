import Select from '@/dui/core/Select'
import Head from 'next/head'
import { FaHeart } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | PIIC</title>
      </Head>
      <main>Welcome</main>

      <Select.Wrapper>
        <Select.Label>This is Select</Select.Label>
        <Select.Description>Lorem ipsum dolor sit amet.</Select.Description>
        <Select icon={<FaHeart />} placeholder="pick one">
          <option value="React">React</option>
          <option value="Vue">Vue</option>
          <option value="Angular">Angular</option>
        </Select>
        <Select.Error>Error</Select.Error>
      </Select.Wrapper>
    </>
  )
}
