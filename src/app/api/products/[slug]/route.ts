import { z } from 'zod'
import { products } from '../data.json'

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const slug = z.string().parse(params.slug)

  const product = products.find((product) => product.slug === slug)

  if (!product) {
    return Response.json({ message: 'Product not Found' }, { status: 400 })
  }

  return Response.json({ product })
}
