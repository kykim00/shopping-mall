import { DBfield, writeDB } from "../dbController";
import { Cart, Resolver } from "./types";

const setJSON = (data: Cart) => writeDB(DBfield.CART, data);

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, { db }, info) => {
      return db.cart;
    },
  },
  Mutation: {
    addCart: (parent, { id }, { db }, info) => {
      if (!id) throw Error("상품 id가 없습니다.");
      const targetProduct = db.products.find((item) => item.id === id);
      if (!targetProduct) throw Error("상품이 없습니다.");

      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex > -1) {
        const newCartItem = {
          id,
          amount: db.cart[existCartIndex].amount + 1,
        };
        db.cart.splice(existCartIndex, 1, newCartItem);
        setJSON(db.cart);
        return newCartItem;
      }
      const newItem = {
        id,
        amount: 1,
      };
      db.cart.push(newItem);
      setJSON(db.cart);
    },
    updateCart: (parent, { id, amount }, { db }) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);

      if (existCartIndex < 0) {
        throw new Error("없는 데이터입니다");
      }
      const newCartItem = {
        id,
        amount,
      };
      db.cart.splice(existCartIndex, 1, newCartItem);
      setJSON(db.cart);
      return newCartItem;
    },
    deleteCart: (parent, { id }, { db }) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);

      if (existCartIndex < 0) {
        throw new Error("없는 데이터입니다");
      }
      db.cart.splice(existCartIndex, 1);
      setJSON(db.cart);
      return id;
    },
    executePay: (parent, { ids }, { db }) => {
      const newCartData = db.cart.filter(
        (cartItem) => !ids.includes(cartItem.id)
      );
      db.cart = newCartData;
      setJSON(db.cart);
      return ids;
    },
  },
  CartItem: {
    product: (cartItem, args, { db }) =>
      db.products.find((product) => product.id === cartItem.id),
  },
};

export default cartResolver;
