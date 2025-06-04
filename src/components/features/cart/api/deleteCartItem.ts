import { baseAPI } from '@/api/baseAPI';

export async function deleteCartItem(cartId: string) {
  return baseAPI<null>({
    method: 'DELETE',
    path: `/cart-items/${cartId}`,
  });
}
