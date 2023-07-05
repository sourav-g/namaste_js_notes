function x() {
  var y = 1;

  //*setTimeout takes this callBack func, and stores it `somewhere else`
  //*and attaches a timer to it; meanwhile JS keeps executing from next line onwards

  //*After 3s, the function is taken and put into the Stack and run.
  //!Dive deep into later

  setTimeout(function () {
    //* This function forms a closure
    //console.log(y);
  }, 3000);
  console.log("Namaste JavaScript");
}
x();

//?---Using var---------------------------------------------------------------------------------

function z() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
      //* 5 copies of this callback fn (forming a closure with surrounding state) is stored, all pointing to
      //* same `reference of i`  ( which is 6 by the time the callbacks are run)
      //* when this console is exe; i is taken from Closure(z)
      //console.log(i);
    }, i * 1000); //* this is `value of i`
  }
}
z();

//?---Using let------------------------------------------------------------------------------

function q() {
  //! Use `let` to make distinct j; since let is block scoped; hence different mem location
  //! so all j are different in each iteration
  //! Gotcha -> taking let j=1 initialization outside the loop, will again behave as var
  for (let j = 1; j <= 5; j++) {
    setTimeout(function () {
      //* different references to j
      //* when this console is exe; j is taken from Block(z)
      //! Block(z) value changing from 1 -> 5  ?????
      //console.log(i);
    }, j * 1000); //* this is `value of j`
  }
}
q();

//?---Fixing using var but forming own closure--------------------------------------------------------------------------------

function c() {
  for (var d = 1; d <= 5; d++) {
    //* Wrapping within a close func, by supplying new copy of i everytime
    //* Now setTimeout callback forms a closure over this distinct copy everytime
    function close(d) {
      setTimeout(function () {
        console.log(d);
      }, d * 1000);
    }
    close(d);
  }
}
c();
