'use client'

import { useCart } from '@/context/cart-context'

type AddToCartButtonProps = {
  productId: string
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  return (
    <button
      onClick={() => addToCart(productId)}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold to-white"
    >
      Adicionar ao Carrinho
    </button>
  )
}
