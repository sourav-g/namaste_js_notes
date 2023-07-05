//? ---------map -> used for transformation

const arr = [5, 1, 3, 2, 6];
let binaryArr = arr.map(function (item) {
  //! This is synchronous callback, and not taken to WebAPI environment
  //! Synchronous callbacks are BLOCKING
  let binArr = [];
  while (item >= 1) {
    binArr.push(item % 2);
    item = Math.floor(item / 2);
  }
  return binArr.reverse().join("").toString();
  //return item.toString(2);
});

console.log(binaryArr); // [ '101', '1', '11', '10', '110' ]

/************
 2 |  5
 2 |  2 -> 1
   |  1 -> 0
*************/

//?----------filter------------

//filter odd values
function isOdd(x) {
  return x % 2;
}
function isEven(x) {
  return x % 2 === 0;
}

console.log(arr.filter(isOdd));
console.log(arr.filter(isEven));

//?----------reduce -> returns array to single value always (can be object,array also)------------

const sum = arr.reduce(function (acc, x) {
  return acc + x;
}, 0);
console.log(sum);

const arrFreq = [1, 9, 4, 2, 7, 3, 5, 6, 6, 3, 1, 2, 3, 0];
const frequency = arrFreq.reduce(function (acc, x) {
  acc[x] = acc[x] ? ++acc[x] : 1;
  return acc;
}, {});
console.log(frequency);

const findMax = arr.reduce(function (acc, curr) {
  if (curr > acc) {
    acc = curr;
  }
  return acc;
}, arr[0]);
//!reduce always returns a single value; which is accumulator value
console.log(findMax);

//?------More examples---------------------------------

const users = [
  { firstName: "sourav", lastName: "ghosh", age: 31 },
  { firstName: "akshay", lastName: "saini", age: 31 },
  { firstName: "sachin", lastName: "tendulkar", age: 43 },
];

//list of full names
console.log(users.map((users) => users.firstName + " " + users.lastName));

//age frequency
console.log(
  users.reduce(function (acc, curr) {
    acc[curr.age] = acc[curr.age] ? ++acc[curr.age] : 1;
    return acc;
  }, {})
);

//firstName of all ppl less than 30
console.log(users.filter((x) => x.age < 40).map((x) => x.firstName));

console.log(
  users.reduce(function (acc, curr) {
    if (curr.age < 40) {
      acc.push(curr.firstName);
    }
    return acc;
  }, [])
);

/*
initialValue <Optional>

A value to which accumulator is initialized the first time the callback is called. If initialValue is specified, callbackFn starts executing with the first value in the array as currentValue. If initialValue is not specified, accumulator is initialized to the first value in the array, and callbackFn starts executing with the second value in the array as currentValue. In this case, if the array is empty (so that there's no first value to return as accumulator), an error is thrown.
*/
