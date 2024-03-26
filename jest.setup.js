import "@testing-library/jest-dom";
const { TextDecoder, TextEncoder, ReadableStream } = require('node:util')

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream }
})

const { Blob, File } = require('node:buffer')
const { fetch, Headers, FormData, Request, Response } = require('undici')

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
})
