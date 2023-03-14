import { NextApiRequest, NextApiResponse } from 'next'

function exceptionHandler(
  error: any,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.error(error)
  if (!!error?.statusCode) {
    return res.status(error.statusCode).json(error)
  }
  const message =
    error instanceof Error ? error.message : 'An unknown error occurred.'
  return res.status(500).json({ success: false, error: message })
}

export default exceptionHandler
