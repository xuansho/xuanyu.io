import type { CollectionEntry } from 'astro:content'
import MarkdownIt from 'markdown-it'

type ExcerptScene = 'list' | 'meta' | 'og' | 'feed'

const markdownParser = new MarkdownIt()
const excerptLengths: Record<ExcerptScene, { cjk: number, other: number }> = {
  list: {
    cjk: 120,
    other: 240,
  },
  meta: {
    cjk: 120,
    other: 240,
  },
  og: {
    cjk: 70,
    other: 140,
  },
  feed: {
    cjk: 70,
    other: 140,
  },
}

const htmlEntityMap: Record<string, string> = {
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&quot;': '"',
  '&apos;': '\'',
  '&nbsp;': ' ',
}

// Creates a clean text excerpt with length limits by scene
function getExcerpt(text: string, scene: ExcerptScene): string {
  const length = excerptLengths[scene].other
  // Remove HTML tags
  let cleanText = text.replace(/<[^>]*>/g, '')

  // Decode HTML entities
  Object.entries(htmlEntityMap).forEach(([entity, char]) => {
    cleanText = cleanText.replace(new RegExp(entity, 'g'), char)
  })

  // Normalize whitespace
  cleanText = cleanText.replace(/\s+/g, ' ')

  // Normalize CJK punctuation spacing
  cleanText = cleanText.replace(/([。？！："」』])\s+/g, '$1')

  const excerpt = cleanText.slice(0, length).trim()

  // Remove trailing punctuation and add ellipsis
  if (cleanText.length > length) {
    return `${excerpt.replace(/\p{P}+$/u, '')}...`
  }

  return excerpt
}

// Generates post description from existing description or content
export function getPostDescription(
  post: CollectionEntry<'posts'>,
  scene: ExcerptScene,
): string {
  if (post.data.description) {
    // Only truncate for og scene, return full description for other scenes
    return scene === 'og'
      ? getExcerpt(post.data.description, scene)
      : post.data.description
  }

  const rawContent = post.body || ''
  const cleanContent = rawContent
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/^\s*#{1,6}\s+\S.*$/gm, '') // Remove Markdown headings
    .replace(/^\s*::.*$/gm, '') // Remove directive containers
    .replace(/^\s*>\s*\[!.*\]$/gm, '') // Remove GitHub admonition markers
    .replace(/\n{2,}/g, '\n\n') // Normalize newlines

  const renderedContent = markdownParser.render(cleanContent)
  return getExcerpt(renderedContent, scene)
}
