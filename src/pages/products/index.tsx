import { useQuery } from "react-query";
import { ProductItem } from "../../compnents/products/item";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";

const ProductPage = () => {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: "GET",
      path: "PRODUCTS",
    })
  );
  return (
    <div>
      <h2>상품 목록</h2>
      <ul className="products">
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
