/*
Every function in JS has access to its outer lexical environment.
Even when this function is executed in a scope other than its original scope (lexical scope),
it remembers its outer lexical env
*/

function outer(b) {
  var a = 100;
  return function inner() {
    //* Inner forms a closure with both a & b; since both part of outer environment
    console.log(a, b);
  };
}
outer("Hello")();

function outest() {
  let c = 200;
  return function outer(b) {
    let a = 100;
    return function inner() {
      console.log(a, b, c);
    };
  };
}
outest()("Hello")();

//?----- Data hiding and encapsulation using Closure-----------------

//! Here, count variable can be changed by anyone from outside the func
var count = 0;
function incrementCounter() {
  count++;
}

//! Now, count is not accessible from outside (like a private variable)
function counter() {
  var count = 0;
  return function incrementCounter() {
    count++;
    console.log(count);
  };
}

var counter1 = counter();
counter1();
counter1();

var counter2 = counter(); //* This is an independent counter instance again; does not affect counter1
counter2();
counter2();
counter2();

//?--------------------------------------------------------
//* More generalised counter (using function constructor)

function Counter() {
  var count = 0;
  this.incrementCounter = function () {
    count++;
  };
  this.decrementCounter = function () {
    count--;
  };
}
var counter3 = new Counter();
counter3.incrementCounter();
counter3.incrementCounter();
counter3.decrementCounter();

//* By just returning the methods ( what is the diff w.r.t above ?????????)
function Counter2() {
  var count = 1;
  return {
    incrementCounter: function () {
      count++;
      console.log(count);
    },
    decrementCounter: function () {
      count--;
      console.log(count);
    },
  };
}
var x = Counter2();
console.log(x.incrementCounter);
console.log(x.incrementCounter());

//?---Garbage Collection in case of closures--------------------------------------------

function a() {
  var x = 0,
    z = 10;
  return function b() {
    console.log(x);
  };
}

var y = a();
//...         //! Even though func a is called, x is not GCed, since its part of a closure for b
//! This adds to memory
//! Interestingly, z is GCed smartly, since its Never used

y();
