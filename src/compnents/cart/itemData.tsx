import { CartType } from "../../graphql/carts";

export const ItemData = ({
  imageUrl,
  price,
  title,
}: Pick<CartType, "imageUrl" | "price" | "title">) => (
  <>
    <img src={imageUrl} />
    <p className="price">{price} </p>
    <p className="cart-item__title">{title}</p>
  </>
);
