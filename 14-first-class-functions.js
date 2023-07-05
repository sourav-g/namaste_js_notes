//? Anonymous functions
//? First class functions
//? Function statement vs expression vs declaration

//?----------Function statement aka Function declaration------------

a();
function a() {
  console.log("a");
}

//?----------Function expression-------------------------------------

//b(); //! TypeError : b is not a function
var b = function () {
  console.log("b");
};

//~ difference between above 2 is in HOISTING

//?----------Anonymous function-------------------------------------

//! cannot create w/o name in statements;
//! hence used in a place where functions are used as VALUES (like in expressions)
var c = function () {};

//?----------Named function expression------------------------------

var d = function x() {
  console.log(x); //* x is there in inside scope
};
//x(); //!ReferenceError: x is not defined; since x is not there in outside scope
d();

//?----------Difference between parameters & arguments---------------

var p = function (param1, param2) {
  //* parameters
  console.log("param");
};
p(1, 2); //* arguments

//?----------First class functions------------------------------------

//* Ability to USE functions as values; (passing as an arg (or) returning from another func)
//* is known as FC Functions

var s = function (param) {
  console.log(param);
};
s(function () {});

var t = function (param) {
  return function () {};
};
console.log(t());
