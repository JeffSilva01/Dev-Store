import { api } from '@/data/api'
import { Product } from '@/data/type/product'
import { apiDatoCMS, query } from '@/lib/datocms'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const { data } = await apiDatoCMS({
    query: query.GET_PRODUCT_BY_SLUG,
    variables: { slug },
  })

  return data.product
}

export default async function Image({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        About Acme
      </div>
    ),
    {
      ...size,
    },
  )
}
