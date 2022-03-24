import { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { CartType, UPDATE_CART } from "../../graphql/carts";
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount })
  );
  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement)?.value);
    updateCart(
      { id, amount },
      {
        onSuccess: () => queryClient.invalidateQueries(QueryKeys.CART),
      }
    );
  };
  return (
    <li className="cart-item">
      <img src={imageUrl} />
      <p className="price">{price} </p>
      <p className="cart-item__title">{title}</p> {amount}
      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        onChange={handleUpdateAmount}
      />
    </li>
  );
};

export default CartItem;
