//* Issues with callbacks
//? 1. CallBack hell            -> code grows horizontally/ Pyramid of doom
//? 2. Inversion of control

const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart, function () {
  //!..
  //!..
  api.proceedToPayment(); //~ giving control of this API to createOrder; risky
});
