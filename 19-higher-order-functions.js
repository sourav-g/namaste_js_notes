//* Functional programming

function x() {
  console.log("Namaste");
}

//~ Here, y is a higher order function; since it is taking another function as input
//~ x is the callback function

function y(x) {
  x();
}

//?----Code duplication----------------------------------------------------

const radius = [1, 2, 3, 4];

const calculateArea = function (radius) {
  const output = [];
  for (let i = 0; i < radius.length; i++) {
    output.push(Math.PI * radius[i] * radius[i]);
  }
  return output;
};

console.log(calculateArea(radius));

const calculateCircumference = function (radius) {
  const output = [];
  for (let i = 0; i < radius.length; i++) {
    output.push(2 * Math.PI * radius[i]);
  }
  return output;
};

console.log(calculateCircumference(radius));

//?----More modular code--------------------------------------------------

const area = function (radius) {
  return Math.PI * radius * radius;
};
const circumference = function (radius) {
  return 2 * Math.PI * radius;
};

//higher order function
const calculate = function (radius, logic) {
  const output = [];
  for (let i = 0; i < radius.length; i++) {
    output.push(logic(radius[i]));
  }
  return output;
};

console.log(calculate(radius, area));
console.log(radius.map(area));
//console.log(calculate(radius, circumference));

//?---------------------
//resusability
//modularity
//pure functions
//composition of functions
