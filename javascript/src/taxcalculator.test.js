import { Database } from './database';
import { TaxCalculator } from './taxcalculator';

let shoppingCart = [
    {"productId": "apple", "quantity": 5},
    {"productId": "orange", "quantity": 4},
    {"productId": "milk", "quantity": 2},
    {"productId": "red wine", "quantity": 3},
    {"productId": "stamps", "quantity": 4},
];

test('have all products of shopping cart in database', () => {
    let db = new Database();
    shoppingCart.forEach(item => {
        expect(db.getProduct(item.productId)).toBeDefined();
    });
});

test('getGrandtotal/0 is supposed to be 33.55', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getGrandtotal()).toBeCloseTo(33.55);

})

test('able to calculate taxes and totals', () => {
    let db = new Database();
    let calc = new TaxCalculator(db, shoppingCart);
    expect(Math.round(calc.getSubtotalTax(0.07), 2)).toBeCloseTo(9.98);
});
