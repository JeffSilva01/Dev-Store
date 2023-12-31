import { AddToCartButton } from '@/components/add-to-cart-button'
import { ProductSize } from '@/components/product-size'
import { Product } from '@/data/type/product'
import { apiDatoCMS, query } from '@/lib/datocms'
import { Metadata } from 'next'
import Image from 'next/image'

type ProductProps = {
  params: {
    slug: string
  }
  searchParams: {
    size: 'P' | 'M' | 'G' | 'GG'
  }
}

async function getProduct(slug: string): Promise<Product> {
  const { data } = await apiDatoCMS({
    query: query.GET_PRODUCT_BY_SLUG,
    variables: { slug },
  })

  return data.product
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const { data } = await apiDatoCMS({
    query: query.GET_PRODUCT_FEATURED,
  })

  return data.allProducts.map((product: Product) => ({ slug: product.slug }))
}

export default async function Product({ params, searchParams }: ProductProps) {
  const product = await getProduct(params.slug)
  const { size } = searchParams

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image.url}
          width={1000}
          height={1000}
          quality={100}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanos</span>
          <div className="flex gap-2">
            <ProductSize href="?size=P" active={size === 'P'}>
              P
            </ProductSize>
            <ProductSize href="?size=M" active={size === 'M'}>
              M
            </ProductSize>
            <ProductSize href="?size=G" active={size === 'G'}>
              G
            </ProductSize>
            <ProductSize href="?size=GG" active={size === 'GG'}>
              GG
            </ProductSize>
          </div>
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
