import { Header } from '@/components/common';
import { Cart, getShoppingCartList } from '@/components/features/cart';
import { useJaeO } from '@/hooks/useJaeO';
import CartButton from './CartButton';

function ShopHeader() {
  const { data: cartList } = useJaeO<Cart[]>({
    fetchKey: 'cartItems',
    fetchFn: getShoppingCartList,
  });

  return (
    <Header
      title="SHOP"
      right={<CartButton itemsCount={cartList?.length ?? 0} />}
    />
  );
}
export default ShopHeader;
