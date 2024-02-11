import {Product} from "../../types";
import api from "../../api-client/api";
import {AxiosResponse} from "axios";
import {ProductResponse} from "../../types/product-response.type";
const subRoute = 'products'

export async function getProducts():Promise<Product[]>{
    const products: AxiosResponse<ProductResponse> = await api.get<ProductResponse>(subRoute)
    return products.data.products
}