// import http from "../http-common";
import axios from 'axios'
import config from '../config'
const token = localStorage.getItem('token')
class PosService {
  getProducts() {
    return axios.get(config.API_SALEKIT + 'product/list', {
      headers: {
        'Content-type': 'application/json',
        // 'shop-id': 104,
        token: token,
      },
    })
  }

  trademark() {
    return axios.get(config.API_SALEKIT + `trademark/list`, {
      headers: {
        'Content-type': 'application/json',
        // 'shop-id': 104,
        token: token,
      },
    })
  }
  category() {
    return axios.get(config.API_SALEKIT + `category/list`, {
      headers: {
        'Content-type': 'application/json',
        // 'shop-id': 104,
        token: token,
      },
    })
  }
  //https://api.salekit.com:3039/api/v1/brand/list?user_id=36225
  brand(user_id) {
    return axios.get(config.API_SALEKIT + `brand/list?user_id=` + user_id, {
      headers: {
        'Content-type': 'application/json',
        // 'shop-id': 104,
        token: token,
      },
    })
  }
  //https://api.salekit.com:3039/api/v1/customer/search?keywords=a
  customer(keywords) {
    return axios.get(config.API_SALEKIT + `customer/search?keywords=` + keywords, {
      headers: {
        'Content-type': 'application/json',
        // 'shop-id': 104,
        token: token,
      },
    })
  }
  createOrder(data, id) {
    return axios.post(config.API_SALEKIT + 'order/create?Affiliate-Id=' + id, data, {
      headers: {
        'Content-type': 'application/json',
        'shop-id': 104,
      },
    })
  }
  userInfo(token) {
    // return axios.get(config.API_SALEKIT + 'user/info', {
    return axios.get('https://salekit.com/apiv1/user/info', {
      headers: {
        'Content-type': 'application/json',
        token: token,
      },
    })
  }
  checkCoupon(coupon) {
    return axios.get(config.API_SALEKIT + 'coupon/check?code=' + coupon, {
      headers: {
        'Content-type': 'application/json',
        token: token,
      },
    })
  }
  createCustomer(data) {
    return axios.post(config.API_SALEKIT + 'customer/addinfo', data, {
      headers: {
        'Content-type': 'application/json',
        token: token,
      },
    })
  }
  printOrder(data) {
    return axios.post(config.API_SALEKIT + 'order/print', data, {
      headers: {
        'Content-type': 'application/json',
        token: token,
      },
    })
  }
}
export default new PosService()
