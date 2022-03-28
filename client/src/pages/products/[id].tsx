import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProductDetail from "../../compnents/products/detail";
import { GET_PRODUCT, Product } from "../../graphql/products";
import { fetcher, graphqlFetcher, QueryKeys } from "../../queryClient";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  );
  console.log(data);
  if (!data) return null;
  return (
    <div>
      <h2>상품 상세</h2>
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductDetailPage;
