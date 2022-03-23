import { Product } from "../../types";

const ProductDetail = ({
  item: {
    category,
    title,
    image,
    price,
    description,
    rating: { rate },
  },
}: {
  item: Product;
}) => (
  <div className="product-detail">
    <p className="product-detail__category">{category}</p>
    <p className="product-detail__title">{title}</p>
    <p className="product-detail__description">{description}</p>
    <img className="product-detail__image" src={image} alt=""></img>
    <p className="product-detail__price">{price}</p>
    <p className="product-detail__rating">{rate}</p>
  </div>
);

export default ProductDetail;
