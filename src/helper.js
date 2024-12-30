export class Helper {
    static formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code'
      }).format(value).replace('VND', '').trim();
    }
    static calculateTotalAmount(products) {
      return this.formatCurrency( products.reduce((total, product) => total + product.price * product.quantity, 0) )
    }
  }