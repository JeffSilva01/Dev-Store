import Link from 'next/link'
import Image from 'next/image'
import { api } from '@/data/api'
import { Product } from '@/data/type/product'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured')
  const { products } = await response.json()

  return products
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid gap-6 max-h-[860px] grid-cols-9 grid-rows-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 flex items-start justify-center rounded-lg bg-zinc-900 overflow-hidden"
      >
        <Image
          src={highlightedProduct.image}
          width={830}
          quality={100}
          height={830}
          alt=""
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="relative group col-span-3 row-span-3 flex items-start justify-center rounded-lg bg-zinc-900 overflow-hidden"
        >
          <Image
            src={product.image}
            width={830}
            quality={100}
            height={830}
            alt=""
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
