function x() {
  var a = 23;
  function y() {
    console.log(a);
  }
  y();
}
x();

//* Scope while -> Debug at Line 4

//  1. Local
//      ->this
//  2. Closure ( x )
//      ->a : 23
//  3. Global
//      ->{....}

//*-------------------------------------------------------------------------------------------------
function z() {
  var b = 900;
  function x() {
    var a = 23;
    function y() {
      console.log(a, b);
    }
    y();
  }
  x();
}
z();

//* Scope while -> Debug at Line 25

//  1. Local
//      ->this
//  2. Closure ( x )
//      ->a : 23
//  3. Closure ( z )
//      ->b : 900
//  4. Global
//      ->{....}

//*-------------------------------------------------------------------------------------------------
//* Closure --> Function along with its lexical scope,bundled together; forms a closure

function x() {
  var a = 23; //* not garbage collected on returning y, since part of closure
  function y() {
    console.log(a);
  }
  a = 100;
  return y; //* Function y along with its Lexical scope is returned; closure is returned
  //* reference to a returned; not the value
}
var z = x();
console.log(z);
//...
//...
z();

//*-------------------------------------------------------------------------------------------------

//*Uses of Closures ---

// Module design pattern
// Currying
// Data hiding & encapsulation
// Functions like once            //! Check this function
// Memoize
// Maintaining state in async world
// setTimeouts
// Iterators
// and many more.......

//*Disadvantages of Closures ---

// Can be over consumption of memory, since every time a closure is formed;
// those closed over variables are NOT garbage collected, till program expires

// Can lead to memory leaks if NOT handled properly

// Garbage Collector -> A program in the browser or JS engine which frees up the
// unutilised memory
