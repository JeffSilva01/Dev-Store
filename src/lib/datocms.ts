import { env } from '@/env'

const SEARCH_PRODUCT_BY_TITLE = `
query SearchProductByTitle($query: String!) {
  allProducts(filter: {title: {matches: {pattern: $query}}}) {
    title
    description
    price
    id
    image {
      url
    }
    featured
  }
}  
`

const GET_PRODUCT_BY_SLUG = `
query GetProductBySlug($slug: String!) {
  product(filter: {slug: {eq: $slug}}) {
    title
    description
    price
    id
    slug
    image {
      url
    }
    featured
  }
}
`

const GET_PRODUCT_FEATURED = `
query GetProductFeatured {
  allProducts(filter: {featured: {eq: true}}) {
    title
    description
    price
    id
    slug
    image {
      url
    }
    featured
  }
}
`

export const query = {
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCT_FEATURED,
  SEARCH_PRODUCT_BY_TITLE,
}

type ApiProps = {
  query: string
  variables?: { [key: string]: string | number | boolean }
  includeDrafts?: boolean
}

export async function apiDatoCMS({
  query,
  variables = {},
  includeDrafts = false,
}: ApiProps) {
  const response = await fetch(env.NEXT_PUBLIC_DATOCMS_BASE_URL, {
    headers: {
      Authorization: `Bearer ${env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
    },
    method: 'POST',
    body: JSON.stringify({ query, variables }),
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${JSON.stringify(
        responseBody,
      )}`,
    )
  }

  return responseBody
}
