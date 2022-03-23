import { Link } from "react-router-dom";
import { Product } from "../../types";

export const ProductItem = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}: Product) => (
  <li className="product-item">
    <Link to={`/products/${id}`}>
      <p className="product-item__category">{category}</p>
      <p className="product-item__title">{title}</p>
      <p className="product-item__description">{description}</p>
      <img className="product-item__image" src={image} alt=""></img>
      <p className="product-item__price">{price}</p>
      <p className="product-item__rating">{rating.rate}</p>
    </Link>
  </li>
);
