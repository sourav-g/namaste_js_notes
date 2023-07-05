//? TDZ - Temporal Dead Zone
//* The phase between Hoisting -> till it gets some value
//? Are let & const hoisted ?
//* Yes, but different from var hoisting

console.log(a); //! Reference Error : Cannot access a before initialization
//! This appears whenever trying to access varible that is in TDZ
console.log(b);

let a = 10; //All region before this line, is TDZ for a
var b = 100;

//* Let & const not attached to window object unlike var, in this case
//* they have a separate storage (Script ?)

let x = 2;
let x = 5; //! Syntax Error -> duplicate
const y;    //! Syntax Error -> declaration & assignment should happen together
const y = 3;
const y = 3; //! Syntax Error -> duplicate
y = 10; //! Type Error  -> since const type of varibale

//***** USE - const > let > var  ******//
//****  Shrink TDZ window -> 0, by moving initializations to the TOP */

//? Difference b/w Syntax, Reference & Type Error ?
