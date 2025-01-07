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
  static calculateTotalPay(products, discount) {
    if (!products) return this.formatCurrency(0)
    const totalAmount = products.reduce(
      (total, product) => total + product.price_sale * product.quantity,
      0,
    )
    const discountedAmount = totalAmount - discount
    return this.formatCurrency(discountedAmount)
  }
  static pushOrderLocal(order) {
    let dataOrderLocal = localStorage.getItem('orderListOffline')
    if (dataOrderLocal) {
      dataOrderLocal.push(order)
      localStorage.setItem('orderListOffline', dataOrderLocal)
    } else {
      localStorage.setItem('orderListOffline', order)
    }
  }
}
