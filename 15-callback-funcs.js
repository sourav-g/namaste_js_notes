//?----What is a callback function in JS----------

setTimeout(function () {
  console.log("timer");
}, 5000);

//* Without callback concept, async operation in JS is NOT possible

function x(y) {
  console.log("x");
  y();
}

x(function y() {
  console.log("y");
});
//y is not called here; passed as a value to x to be called later.
//Hence, callback function.

/* Call Stack progress for the above RUN
y
x
anonymous
--------------------------------

<call stack is empty>

-----------after 5000 ms--------
anonymous
<setTimeout>
anonymous      ?? why this global EC again ??
--------------------------------
*/

//?----Blocking the main thread-------------

//* JS has 1 Call Stack => 1 Main Thread
//* Everything in the JS page is executed through this 1 Call Stack only
//* Not blocking the main thread, means NOT blocking the Call Stack
//* Hence, use Async operations for time-consuming Tasks

//!! So, WebAPIs like setTimeout + callBack ability => facilitates async operations
//!! which is crucial in JS, since it is Single Threaded ( 1 CS)

//?----Event Listeners with Scopes and Closures

//% Approach 1
document
  .getElementById("clickMe")
  .addEventListener("click", incrementButtonCount());

function incrementButtonCount() {
  let count = 0;
  return function () {
    count++;
    console.log("Button Clicked", count);
  };
}

//%Approach 2
function attachEventListeners() {
  let count = 0;
  document.getElementById("clickMe").addEventListener("click", function xyz() {
    console.log("Button Clicked", count);
  });
}
attachEventListeners();

//?----Garbage Collection & remove Event Listeners

//* Event listeners are Heavy; since they form closures and takes up memory
//* even when the event is not occurring
//* Hence, the need to remove them, if no longer used
