var n = 2;

function square(num) {
  var ans = num * num;
  return ans;
}

var square2 = square(n);
var square4 = square(4);

//Steps when new EC is created -->

// 1. Memory Creation Phase
// 2. Code Execution Phase

//* ECs are created in a call stack
//* This call stack is like a EC manager, and maintains order of execution

//* There is single such stack, hence JS is single-threaded
