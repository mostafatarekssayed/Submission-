import { getProducts } from "../product.controller";
import { Product } from "../../../types";
import productsMock from "../../../mock/products.mock";
import api from "../../../api-client/api";
describe("get products", () => {
  it("get all products", async () => {
    const spy = jest.spyOn(api, "get");
    spy.mockResolvedValue({ data: { products: productsMock } });
    const products: Product[] = await getProducts();
    expect(products.length).toBe(productsMock.length);
  });
});
