import { ListOrder } from './stores/store'
export class Helper {
  static formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'code',
    })
      .format(value)
      .replace('VND', '')
      .trim()
  }
  static calculateTotalAmount(products, type = 0) {
    const total = products.reduce(
      (total, product) => total + product.price_sale * product.quantity,
      0,
    )
    if (type == 1) {
      return total
    } else {
      return this.formatCurrency(total)
    }
  }
  static calculateTotalPay(products, discount, point = 0, type = 0) {
    if (!products) return this.formatCurrency(0)
    const totalAmount = products.reduce(
      (total, product) => total + product.price_sale * product.quantity,
      0,
    )
    const discountedAmount = totalAmount - discount - point
    if (type == 1) {
      return discountedAmount
    } else return this.formatCurrency(discountedAmount)
  }
  static calculatePoint(point, rate) {
    if (!point) return 0
    if (!rate) return point
    return point * rate
  }
  static pushOrderLocal(order, shop_id) {
    let dataOrderLocal = localStorage.getItem('orderListOffline_' + shop_id)
    if (dataOrderLocal) {
      let listorder = JSON.parse(dataOrderLocal)
      listorder.push(order)
      localStorage.setItem('orderListOffline_' + shop_id, JSON.stringify(listorder))
      ListOrder().set(listorder)
    } else {
      const list_order = []
      list_order.push(order)
      localStorage.setItem('orderListOffline_' + shop_id, JSON.stringify(list_order))
      ListOrder().set(list_order)
    }
  }
  static getStringvalue(value) {
    return value ? `${value}` : ''
  }
  static getMaxId(shop_id) {
    let dataOrder = localStorage.getItem('orderListOffline_' + shop_id)
    let maxId = 0
    if (dataOrder) {
      let listorder = JSON.parse(dataOrder)
      listorder.forEach((order) => {
        if (order.id > maxId) {
          maxId = order.id
        }
      })
    }
    return this.getStringvalue(maxId + 1)
  }
}
