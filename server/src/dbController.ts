import fs from "fs";
import { resolve } from "path";

export enum DBfield {
  CART = "cart",
  PRODUDCTS = "products",
}

const basePath = resolve();

const filenames = {
  [DBfield.CART]: resolve(basePath, "src/db/cart.json"),
  [DBfield.PRODUDCTS]: resolve(basePath, "src/db/products.json"),
};

export const readDB = (target: DBfield) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], "utf8"));
  } catch (err) {
    console.error(err);
  }
};

export const writeDB = (target: DBfield, data: any) => {
  try {
    fs.writeFileSync(filenames[target], JSON.stringify(data, null, "  "));
  } catch (err) {
    console.error(err);
  }
};
