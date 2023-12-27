import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

type ProductSize = LinkProps & {
  children: ReactNode
  active: boolean
}

export function ProductSize({
  children,
  active = false,
  ...rest
}: ProductSize) {
  return (
    <Link
      data-active={active}
      className="data-[active=true]:border data-[active=true]:border-violet-500 flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
      {...rest}
    >
      {children}
    </Link>
  )
}
