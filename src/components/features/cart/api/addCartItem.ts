import { baseAPI } from '@/api/baseAPI';

export async function addCartItem(id: string) {
  return baseAPI<null>({
    method: 'POST',
    path: `/cart-items`,
    body: {
      productId: id,
      quantity: 1,
    },
  });
}
