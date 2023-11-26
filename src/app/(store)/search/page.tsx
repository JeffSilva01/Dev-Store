import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { apiDatoCMS, query as queries } from '@/lib/datocms'
import { Product } from '@/data/type/product'

type SearchProps = {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const { data } = await apiDatoCMS({
    query: queries.SEARCH_PRODUCT_BY_TITLE,
    variables: { query },
  })

  return data.allProducts
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/moletom-never-stop-learning`}
            className="relative group flex items-start justify-center rounded-lg bg-zinc-900 overflow-hidden"
          >
            <Image
              src={product.image.url}
              width={480}
              quality={100}
              height={480}
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
    </div>
  )
}
