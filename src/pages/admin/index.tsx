import { getSession } from '@/lib/next-auth'
import { GetServerSideProps } from 'next'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context.req, context.res)
  if (!session || session.user.role !== 1)
    return { redirect: { destination: '/' }, props: {} }
  return { props: {} }
}

function index() {
  return <div>Admin</div>
}

export default index
