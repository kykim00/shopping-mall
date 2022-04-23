import { Products, Resolver } from "./types";
import { v4 as uuid } from "uuid";
import { DBfield, writeDB } from "../dbController";

const setJSON = (data: Products) => writeDB(DBfield.PRODUDCTS, data);

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
  Mutation: {
    addProduct: (parent, { imageUrl, price, title, description }, { db }) => {
      const newProduct = {
        id: uuid(),
        imageUrl,
        price,
        title,
        description,
        createdAt: Date.now(),
      };
      db.products.push(newProduct);
      setJSON(db.products);
      return newProduct;
    },
    updateProduct: (parent, { id, ...data }, { db }) => {
      const existProductIndex = db.products.findIndex((item) => item.id === id);
      if (existProductIndex < 0) {
        throw new Error("없는 상품입니다.");
      }
      const updatedItem = { ...db.products[existProductIndex], ...data };
      db.products.splice(existProductIndex, 1, updatedItem);
      setJSON(db.products);
      return updatedItem;
    },
    deleteProduct: (parent, { id }, { db }) => {
      const existProductIndex = db.products.findIndex((item) => item.id === id);
      if (existProductIndex < 0) {
        throw new Error("없는 상품입니다.");
      }
      const updatedItem = {
        ...db.products[existProductIndex],
      };
      delete updatedItem.createdAt;
      db.products.splice(existProductIndex, 1, updatedItem);
      setJSON(db.products);
      return id;
    },
  },
};

export default productResolver;
