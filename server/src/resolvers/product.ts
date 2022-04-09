import { Resolver } from "./types";

const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + "",
    imageUrl: `https://picsum.photos/id/${i + 10}/200/150`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1645002236711 + i * 1000 * 60 * 10).toString(),
  })))();

const productResolver: Resolver = {
  Query: {
    // parent: 이 함수를 호출한 상위 쿼리
    // args : 쿼리에서 전달된 인자
    // context : 서버에서 전달된 컨텍스트
    // info : 쿼리에 대한 정보
    products: (parent, args, { db }, info) => {
      return db.products;
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((item: any) => item.id === id);
      if (found) return found;
      return null;
    },
  },
};

export default productResolver;
