
// import http from "../http-common";
import axios from 'axios';
import config from "../config";
class PosService {
    getProducts() {
        return axios.get(config.API_SALEKIT + "product/list", {
            headers: {
                "Content-type": "application/json",
                "shop-id":104
            }
        });
    }
   
    trademark() {
        return axios.get(config.API_SALEKIT +`trademark/list`,{
            headers: {
                "Content-type": "application/json",
                "shop-id":104
            }
        });
    }
    category() {
        return axios.get(config.API_SALEKIT +`category/list`,{
            headers: {
                "Content-type": "application/json",
                "shop-id":104
            }
        });
    }
    //https://api.salekit.com:3039/api/v1/brand/list?user_id=36225
    brand() {
        return axios.get(config.API_SALEKIT +`brand/list?user_id=36225`,{
            headers: {
                "Content-type": "application/json",
                "shop-id":104
            }
        });
    }
    //https://api.salekit.com:3039/api/v1/customer/search?keywords=a
    customer(keywords) {
        return axios.get(config.API_SALEKIT +`customer/search?keywords=`+keywords,{
            headers: {
                "Content-type": "application/json",
                "shop-id":104
            }
        });
    }

}
export default new PosService();