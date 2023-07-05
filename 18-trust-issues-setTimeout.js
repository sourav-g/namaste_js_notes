console.log("Start");

setTimeout(function cb() {
  console.log("Callback");
}, 5000);
//! does not guarantee cb will be executed 'exactly' after 5s
//! all depends on the state of call stack
//! it just guarantees that it will wait 'atleast' 5s

console.log("End");

let startTime = new Date().getTime();
let endTime = startTime;
while (endTime < startTime + 10000) {
  endTime = new Date().getTime();
}

console.log("While expires");

//?---------------------------------------
setTimeout(function cb() {
  console.log("Callback");
}, 0);
//! function has to go through queue, even if timer = 0
//! probably may be used to defer some code

//* Concurrency model in JS
//* call stack + webapi
//* Because of this model; we can do async operations even in a single threaded language
