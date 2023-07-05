//Global object in browser --> Window
//`this` in global points to --> Window

console.log(this);
console.log(window);

console.log(this === window);

//* Anything which is NOT inside ANY Function --> is in Global space

var a = 10;
function b() {
  var x = 10;
}
console.log(window.a);
console.log(a);
console.log(this.a);
