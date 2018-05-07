
export class TaxCalculator {
    constructor(database, shoppingCart) {


        this.database = database;
        this.shoppingCart = shoppingCart;


    }

    getGrandtotal() {
      let grandtotal = 0;

      // for (let shoppingCartItem of this.shoppingCart) {
      //   let productItem = this.database.getProduct(shoppingCartItem.productId);
      //   grandtotal += productItem.price * shoppingCartItem.quantity;
      // }
      this.shoppingCart.forEach(shoppingCartItem => {
          let productItem = this.database.getProduct(shoppingCartItem.productId);
          let priceFloat = parseFloat(productItem.price);
          let quantityFloat = parseFloat(shoppingCartItem.quantity);
          grandtotal += priceFloat * quantityFloat;
          console.log(Number.isNaN(priceFloat), Number.isNaN(quantityFloat), Number.isNaN(grandtotal));

      });
      console.log(grandtotal);
      return parseFloat(grandtotal);
    }

    getGrandtotalTax() {
        return 0; // TODO
    }

    getSubtotal(taxRate) {
        return 0; // TODO
    }

    getSubtotalTax(taxRate) {
        return 0; // TODO
    }
}
