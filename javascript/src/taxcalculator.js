
export class TaxCalculator {
    constructor(database, shoppingCart) {


        this.database = database;
        this.shoppingCart = shoppingCart;

    }

    round(number, precision) {
      var shift = function (number, precision) {
        var numArray = ("" + number).split("e");
        return  + (numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
      };
      return shift(Math.round(shift(number, +precision)), -precision);
    }

    getGrandtotal() {
      let grandtotal = 0.00;
      this.shoppingCart.forEach(shoppingCartItem => {
        let productItem = this.database.getProduct(shoppingCartItem.productId);
        grandtotal += productItem.price * shoppingCartItem.quantity;
      });
      return this.round(grandtotal,2);
    }

    getGrandtotalTax() {
      let grandtotalTax = 0.00;
      this.shoppingCart.forEach(shoppingCartItem => {
        let productItem = this.database.getProduct(shoppingCartItem.productId);
        grandtotalTax += this.getItemTax(productItem) * shoppingCartItem.quantity;
      });
      return this.round(grandtotalTax,2);
    }

    getSubtotal(taxRate) {
      let subtotal = 0.00;
      this.shoppingCart.forEach(shoppingCartItem => {
        let productItem = this.database.getProduct(shoppingCartItem.productId);
        if (productItem.taxRate == taxRate) {
          subtotal += productItem.price * shoppingCartItem.quantity;
        }
      });
      return this.round(subtotal,2);
    }

    getSubtotalTax(taxRate) {
      let subtotalTax = 0;
      this.shoppingCart.forEach(shoppingCartItem => {
        let productItem = this.database.getProduct(shoppingCartItem.productId);
        if (productItem.taxRate == taxRate) {
          subtotalTax += this.getItemTax(productItem) * shoppingCartItem.quantity;
        }
      });
      return this.round(subtotalTax,2);
    }

    getItemTax(productItem) {
      return productItem.price - productItem.price / (productItem.taxRate+1)
    }

}
