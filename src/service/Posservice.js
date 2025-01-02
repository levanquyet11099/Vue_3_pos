
// import http from "../http-common";
import axios from 'axios';
import config from "../config";
class PosService {
    getProducts() {
        return axios.get(config.API_SALEKIT + "product/list", {
            headers: {
                "Content-type": "application/json",
                "shop-id":88
            }
        });
    }
    getProduct(id) {
        return http.get(`/products/${id}`);
    }
    createProduct(data) {
        return http.post("/products", data);
    }
    updateProduct(id, data) {
        return http.put(`/products/${id}`, data);
    }
    deleteProduct(id) {
        return http.delete(`/products/${id}`);
    }
    deleteAllProducts() {
        return http.delete(`/products`);
    }
    findByTitle(title) {
        return http.get(`/products?title=${title}`);
    }
}
export default new PosService();