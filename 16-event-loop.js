//? Why is JS having one call stack ? Can it not use CPU capability
//? and have more than 1; and hence multi-threaded

//* anything put into the call stack; is 'immediately' executed
//* it does not wait for anything

//? Callback fns registered in WebAPI env. How ?
//? Does WebAPI env has a dedicated memory to store things ?

//* 1. MicroTask queue (priority high)
//     Promises callback and mutation observer callback goes here

//* 2. Callback/Task queue
//     Everything else goes here

//! Starvation of the queue

/*
1. When does the event loop actually start? 
- Event loop, as the name suggests, is a single-thread, loop that is `almost infinite`. It's always running and doing its job. ❤️

2.  Are only asynchronous web API callbacks are registered in the web API environment? 
- YES, the synchronous callback functions like what we pass inside map, filter, and reduce aren't registered in the Web API environment. It's just those async callback functions that go through all this.

3. Does the web API environment stores only the callback function and pushes the same callback to queue/microtask queue? 
- Yes, the callback functions are stored, and a reference is scheduled in the queues. Moreover, in the case of event listeners(for example click handlers), the original callbacks stay in the web API environment forever, that's why it's advised to explicitly remove the listeners when not in use so that the garbage collector does its job.

4. How does it matter if we delay for setTimeout would be 0ms. Then callback will move to queue without any wait? 

No, there are trust issues with setTimeout() 😅. The callback function needs to wait until the Call Stack is empty. So the 0 ms callback might have to wait for 100ms also if the stack is busy.  It's a very beautiful concept, and I've covered this in detail in the next episode of Namaste JavaScript. 🔥
*/
