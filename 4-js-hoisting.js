//* Variable/Func hoisting --> Means allocating memory

console.log(this); // { }

console.log(x); //undefined
//console.log(y); //ReferenceError: y is not defined

//console.log(s); //ReferenceError: s is not defined, make `var s` to remove error

var x = 7; //hoisted
s = 2; //NOT hoisted

//?-----------------------------------------------------
getName();
console.log(z); //2
//hoisted
function getName() {
  console.log("getName This --->");
  console.log(this); //Object [global]
  z = 2; //global varible but NOT hoisted
}
//?-----------------------------------------------------

//getName2(); //TypeError: getName2 is not a function
var getName2 = function () {
  console.log("getName2 This --->");
  console.log(this); //Object [global]
};
getName2();
//?-----------------------------------------------------

//getName3(); //TypeError: getName3 is not a function
var getName3 = () => {
  console.log("getName3 This --->");
  console.log(this); // { }
};
getName3();
//* Questions *//

/*

1. Are global variables hoisted ?   ~ No 
2. Are global variables part of Global EC ?
3. Difference b/w var x=2 and x = 2 w.r.t GEC ?
4. How hoisting helps ? Why is it done in JS ? Uses of hoisting ?

*/

//? https://blog.caplin.com/2012/01/18/javascript-is-hard-part-2-the-hidden-world-of-hoisting/
