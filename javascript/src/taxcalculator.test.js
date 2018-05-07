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

//GRANDTOTAL TESTS//
test('getGrandtotal/0 is supposed to be 33.55', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getGrandtotal()).toBeCloseTo(33.55);
})

test('getGrandtotalTax/0 is supposed to be 4', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getGrandtotalTax()).toBeCloseTo(4);
})

//SUBTOTAL TESTS//
test('getSubtotal/1 is supposed to be 9.98 with a tax rate of 7%', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getSubtotal(0.07)).toBeCloseTo(9.98);
})
test('getSubtotalTax/1 is supposed to be 0.65 with a tax rate of 7%', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getSubtotalTax(0.07)).toBeCloseTo(0.65);
})


test('able to calculate taxes and totals', () => {
    let db = new Database();
    let calc = new TaxCalculator(db, shoppingCart);
    expect(Math.round(calc.getSubtotalTax(0.07), 2)).toBeCloseTo(9.98);
});
