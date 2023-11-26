'use client'
import { useCart } from '@/context/cart-context'
import { ShoppingBag } from 'lucide-react'

export function CartWidget() {
  const { items } = useCart()

  return (
    <button className="flex items-center gap-2">
      <ShoppingBag size={16} />
      <span className="text-sm">Cart ({items.length})</span>
    </button>
  )
}
