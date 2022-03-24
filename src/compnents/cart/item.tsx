import { SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { CartType, DELETE_CART, UPDATE_CART } from "../../graphql/carts";
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART);
        const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>(
          QueryKeys.CART
        );
        if (!prevCart?.[id]) return prevCart;

        const newCart = {
          ...(prevCart || {}),
          [id]: { ...prevCart[id], amount },
        };
        queryClient.setQueryData(QueryKeys.CART, newCart);
        return prevCart;
      },

      onSuccess: (newValue) => {
        const prevCart = queryClient.getQueryData<{
          [key: string]: CartType;
        }>(QueryKeys.CART);
        const newCart = {
          ...(prevCart || {}),
          [id]: newValue,
        };
        queryClient.setQueryData(QueryKeys.CART, newCart);
      },
    }
  );

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART);
      },
    }
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement)?.value);
    updateCart({ id, amount });
  };

  const handleDeleteItem = () => {
    deleteCart({ id });
  };
  return (
    <li className="cart-item">
      <input className="cart-item__checkbox" type="checkbox" name="" id="" />
      <img src={imageUrl} />
      <p className="price">{price} </p>
      <p className="cart-item__title">{title}</p> {amount}
      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        onChange={handleUpdateAmount}
      />
      <button
        type="button"
        className="cart-item__button"
        onClick={handleDeleteItem}
      >
        삭제
      </button>
    </li>
  );
};

export default CartItem;
