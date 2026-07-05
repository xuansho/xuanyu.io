import { base } from '@/config'

function withBase(path: string) {
  return base ? `${base}${path}` : path
}

export function getTagPath(tagName: string): string {
  return withBase(`/tags/${tagName}/`)
}

export function getPostPath(slug: string): string {
  return withBase(`/posts/${slug}/`)
}

export function getSitePath(path: string): string {
  const normalizedPath = path.replace(/^\/|\/$/g, '')
  const sitePath = normalizedPath === '' ? '/' : `/${normalizedPath}/`
  return withBase(sitePath)
}
