import { Header }      from '@/components/layout/Header'
import { Footer }      from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import { CartDrawer }   from '@/components/commerce/CartDrawer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
