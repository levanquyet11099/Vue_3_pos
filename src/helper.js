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
  static calculateTotalAmount(products) {
    return this.formatCurrency(
      products.reduce((total, product) => total + product.price_sale * product.quantity, 0),
    )
  }
  static calculateTotalPay(products, discount, type = 0) {
    if (!products) return this.formatCurrency(0)
    const totalAmount = products.reduce(
      (total, product) => total + product.price_sale * product.quantity,
      0,
    )
    const discountedAmount = totalAmount - discount
    if (type == 1) {
      return totalAmount
    } else return this.formatCurrency(discountedAmount)
  }
  static pushOrderLocal(order, shop_id) {
    let dataOrderLocal = localStorage.getItem('orderListOffline_' + shop_id)
    if (dataOrderLocal) {
      let listorder = JSON.parse(dataOrderLocal)
      listorder.push(order)
      localStorage.setItem('orderListOffline_' + shop_id, JSON.stringify(listorder))
    } else {
      const list_order = []
      list_order.push(order)
      localStorage.setItem('orderListOffline_' + shop_id, JSON.stringify(list_order))
    }
  }
  static getStringvalue(value) {
    return value ? value : ''
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
