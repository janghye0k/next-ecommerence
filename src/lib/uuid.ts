import { randomUUID } from 'crypto'

const generate = {
  uuid() {
    return this.uuidv4()
  },
  uuidv4() {
    return (String([1e7]) + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c: any) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16),
    )
  },
}

/**
 * generate uuid
 * @returns {string} uuid
 */
export default function uuid() {
  return randomUUID?.() ?? generate.uuid()
}
