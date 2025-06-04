import { baseAPI } from '@/api/baseAPI';

export async function updateCartItem({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) {
  return baseAPI<null>({
    method: 'PATCH',
    path: `/cart-items/${id}`,
    body: {
      quantity,
    },
  });
}
