import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import ProductList from "../../compnents/products/list";
import GET_PRODUCTS, { Products } from "../../graphql/products";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const ProductPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersectionObserver(fetchMoreRef);

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>(
      QueryKeys.PRODUCTS,
      ({ pageParam = "" }) =>
        graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.products.at(-1)?.id;
        },
      }
    );

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [intersecting]);

  /* 
  data: {
    pages: [
      {products: [...]},
      {products: [...]},
    ],
    pageParams: [undefined, ...]
  }
  */

  return (
    <div>
      <h2>상품 목록</h2>
      <ProductList list={data?.pages || []} />
      <div ref={fetchMoreRef} />
    </div>
  );
};

export default ProductPage;
