const cart = ["shoes", "pants", "kurta"];

// Consumer
const promise = createOrder(cart);
promise
  .then(function (orderId) {
    console.log(`Order Id: ${orderId}`);
    return orderId;
  })
  .then(function (orderId) {
    return proceedToPayment(orderId);

    /* Dont do this, will again result in Promise Hell
    
    return proceedToPayment(orderId).then(function (paymentInfo) {
      console.log(paymentInfo);
    });*/
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch(function (err) {
    //! handling error gracefully
    //! this catch will handle any error in the above chain
    console.log(err.message);
  });

//! handle catch at individual .then() level, if you want to continue the chain
//! to the next .then()

//?Q - What about .success() and .error() ?

// Producer
function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    //createOrder
    //validateCart
    //orderId
    if (!validateCart(cart)) {
      const err = new Error("Cart is not valid");
      reject(err);
    }
    // logic for create order
    const orderId = "12345";
    if (orderId) {
      setTimeout(function () {
        resolve(orderId);
      }, 2000);
    }
  });
  return pr;
}

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("Payment successful");
  });
}

function validateCart(cart) {
  return true;
}
