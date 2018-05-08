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
        expect(db.getProduct(item.productId).productId).toBe(item.productId);
    });
});

//HELPER TESTS//
test('round/2 is supposed to round up when arg1>x.xx5 and down when arg1<x.xx4 if the precision is 2', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.round(6.664534,2)).toBe(6.66);
  expect(calc.round(4.035534,2)).toBe(4.04);
});
test('getItemTax/1 is supposed to be netto price of red wine', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  let productItem = db.getProduct("red wine")
  expect(calc.getItemTax(productItem)).toBe(productItem.price - productItem.price / (productItem.taxRate+1));
});

//GRANDTOTAL TESTS//
test('getGrandtotal/0 is supposed to be 33.55', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getGrandtotal()).toBe(33.55);
});

test('getGrandtotalTax/0 is supposed to be 4', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getGrandtotalTax()).toBe(4);
});

//SUBTOTAL TESTS//
test('getSubtotal/1 is supposed to be 9.98 with a tax rate of 7%', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getSubtotal(0.07)).toBe(9.98);
});
test('getSubtotalTax/1 is supposed to be 0.65 with a tax rate of 7%', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getSubtotalTax(0.07)).toBe(0.65);
});

test('getSubtotal/1 is supposed to be 20.97 with a tax rate of 19%', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getSubtotal(0.19)).toBe(20.97);
});
test('getSubtotalTax/1 is supposed to be 3.35 with a tax rate of 19%', () => {
  let db = new Database();
  let calc = new TaxCalculator(db, shoppingCart);
  expect(calc.getSubtotalTax(0.19)).toBe(3.35);
});
