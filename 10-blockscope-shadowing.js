//* Blocks -> combines multiple statements as one
//* Use it with if,for,while,function, etc

//? Does blocks(by themselves) creates ECs ? No
//* But blocks also have lexical scopes and follows lexical scope chain pattern

//!!!!! Q - So, lexical scope chain is NOT always along with EC ? NO
//So here, within the same GLobal EC, local variable env, scopes are segregated via different
//blocks + global. These scopes are also lexical in nature

var a = 100;
let b = 100;
{
  var a = 10; //! Shadows a=100, overwrites -> since both pointing to same Global Scope
  let b = 20; //! Shadows b=100, DOES not overwrite -> SCOPES are different
  const c = 30;
  console.log(a);
  console.log(b);
  console.log(c);
}
console.log(a);
console.log(b);
console.log(c); //!ReferenceError: c is not defined

//* SCOPE during memory creation phase of EC (Hoisting)

//? Block
//    -> b: 20
//    -> c: 30
//? Script
//    -> b: 100
//? Global
//    -> a: 10

//! Illegal shadowing not allowed
let x = 20;
{
  var x = 30; //Since var is not block scoped, interfering outside at GLOBAL
}

let z = 20;
function y() {
  var z = 30; //Since var is function scoped; now not interfering outside
}

//! Valid shadowing
var y = 20;
{
  let y = 30; //WOrks since let is block scoped, so does not interfere outside
}

//* ALL Scope Rules are same for Arrow Functions as well
