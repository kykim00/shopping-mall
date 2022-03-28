import { Product } from "../../graphql/products";

const ProductDetail = ({
  item: { title, imageUrl, price, description },
}: {
  item: Product;
}) => (
  <div className="product-detail">
    <p className="product-detail__title">{title}</p>
    <img className="product-detail__image" src={imageUrl} alt=""></img>
    <p className="product-detail__description">{description}</p>
    <p className="product-detail__price">{price}</p>
  </div>
);

export default ProductDetail;
