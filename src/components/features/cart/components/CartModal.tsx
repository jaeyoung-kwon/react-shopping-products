import { Flex, Loading } from '@/components/common';
import { ProductRowCard } from '@/components/features/product';
import { useJaeO } from '@/hooks/useJaeO';
import styled from '@emotion/styled';
import { Modal } from '@jae-o/modal-component-module';
import { getShoppingCartList } from '../api';
import { Cart } from '../type';

function CartModal() {
  const { data } = useJaeO<Cart[]>({
    fetchKey: 'cartItems',
    fetchFn: getShoppingCartList,
  });

  if (!data) return <Loading />;

  const totalPrice = data.reduce(
    (acc, curCart) => acc + curCart.quantity * curCart.product.price,
    0
  );

  return (
    <Modal.Container
      title="장바구니"
      showCloseButton={false}
      position="bottom"
      style={{ maxHeight: 'calc(100% - 120px)', overflow: 'auto' }}
    >
      {data.map(({ id, quantity, product }) => (
        <Flex key={id}>
          <Separator />
          <ProductRowCard
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            cartId={id}
            cartCount={quantity}
          />
        </Flex>
      ))}
      <Flex>
        <Separator />
        <TotalPriceBox>
          <TotalPriceLabel>총 결제 금액</TotalPriceLabel>
          <TotalPrice>{`${totalPrice.toLocaleString()}원`}</TotalPrice>
        </TotalPriceBox>
      </Flex>
      <Modal.CloseTrigger>
        <Modal.WideButton>닫기</Modal.WideButton>
      </Modal.CloseTrigger>
    </Modal.Container>
  );
}

const Separator = styled.div`
  width: 100%;
  border: 1px solid #0000001a;
`;

const TotalPriceBox = styled(Flex)`
  height: 42px;

  flex-direction: row;
  justify-content: space-between;
`;

const TotalPriceLabel = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

const TotalPrice = styled.p`
  font-weight: 700;
  font-size: 24px;
`;

export default CartModal;
