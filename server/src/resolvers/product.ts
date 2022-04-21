import { Resolver } from "./types";

const productResolver: Resolver = {
  Query: {
    // parent: 이 함수를 호출한 상위 쿼리
    // args : 쿼리에서 전달된 인자
    // context : 서버에서 전달된 컨텍스트
    // info : 쿼리에 대한 정보
    products: (parent, { cursor = "" }, { db }, info) => {
      const fromIndex =
        db.products.findIndex((product) => product.id === cursor) + 1;
      return db.products.slice(fromIndex, fromIndex + 15) || [];
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((item) => item.id === id);
      if (found) return found;
      return null;
    },
  },
};

export default productResolver;
