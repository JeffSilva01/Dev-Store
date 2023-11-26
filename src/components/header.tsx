import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CartWidget } from './cart-widget'

export async function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          DevStore
        </Link>
        <form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
          <Search className="w-5 text-zinc-500 h-5" />
          <input
            type="text"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
            placeholder="Buscar produto..."
          />
        </form>
      </div>
      <div className="flex items-center gap-4 divide-zinc-700">
        <CartWidget />
        <div className="w-px h-4 bg-zinc-700" />
        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Account</span>
          <Image
            src="https://github.com/jeffsilva01.png"
            width={24}
            height={24}
            alt=""
            className="h-6 w-6 rounded-full "
          />
        </Link>
      </div>
    </header>
  )
}
