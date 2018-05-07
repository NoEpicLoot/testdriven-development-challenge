
export class TaxCalculator {
    constructor(database, shoppingCart) {


        this.database = database;
        this.shoppingCart = shoppingCart;


    }

    getGrandtotal() {
      let grandtotal = 0.00;
      this.shoppingCart.forEach(shoppingCartItem => {
          let productItem = this.database.getProduct(shoppingCartItem.productId);
          grandtotal += productItem.price * shoppingCartItem.quantity;
      });
      return grandtotal;
    }

    getGrandtotalTax() {
      let grandtotalTax = 0.00;
      this.shoppingCart.forEach(shoppingCartItem => {
          let productItem = this.database.getProduct(shoppingCartItem.productId);
          grandtotalTax += Math.round((productItem.price * shoppingCartItem.quantity) * productItem.taxRate, 2);
      });
      return grandtotalTax;
    }

    getSubtotal(taxRate) {
      let subtotal = 0.00;
      this.shoppingCart.forEach(shoppingCartItem => {
          let productItem = this.database.getProduct(shoppingCartItem.productId);
          if (productItem.taxRate == taxRate) {
            subtotal += productItem.price * shoppingCartItem.quantity;
          }
      });
      return subtotal;
    }

    getSubtotalTax(taxRate) {
      let subtotalTax = 0;
      this.shoppingCart.forEach(shoppingCartItem => {
          let productItem = this.database.getProduct(shoppingCartItem.productId);
          if (productItem.taxRate == taxRate) {
            subtotalTax += productItem.price * shoppingCartItem.quantity;
          }
      });
      return subtotalTax - (subtotalTax / (taxRate+1));
    }

}
