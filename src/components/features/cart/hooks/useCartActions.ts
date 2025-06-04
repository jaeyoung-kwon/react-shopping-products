import { useJaeOMutation } from '@/hooks/useJaeOMutation';
import { refetchData } from '@/services/dataStore';
import { showErrorToast } from '@/services/toastStore';
import { addCartItem, deleteCartItem, updateCartItem } from '..';

export function useCartActions() {
  const { mutate: addCartMutate } = useJaeOMutation({
    mutationFn: addCartItem,
    options: {
      onSuccess: () => {
        refetchData('cartItems');
      },
      onError: () => showErrorToast('장바구니에 담는 데 실패했습니다.'),
    },
  });
  const { mutate: deleteCartMutate } = useJaeOMutation({
    mutationFn: deleteCartItem,
    options: {
      onSuccess: () => {
        refetchData('cartItems');
      },
      onError: () => showErrorToast('장바구니에서 삭제하는 데 실패했습니다.'),
    },
  });
  const { mutate: updateCartMutate } = useJaeOMutation({
    mutationFn: updateCartItem,
    options: {
      onSuccess: () => {
        refetchData('cartItems');
      },
      onError: () => showErrorToast('장바구니 수량 변경에 실패했습니다.'),
    },
  });

  return {
    addCart: addCartMutate,
    deleteCart: deleteCartMutate,
    updateCart: updateCartMutate,
  };
}
