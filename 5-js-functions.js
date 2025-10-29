var x = 1;
a();
b();
console.log(x);

function a() {
  var x = 10;
  console.log(x);
}

function b() {
  var x = 100;
  console.log(x);
}

//There ECs
//ECs have their own variable environment ( memory) and their independent of other ECs


//? All differences between function declaration and function expression and arrow functions in depth from usage, this operator, memory management, etc etc

/*
=====================================================================
COMPLETE GUIDE: FUNCTION DECLARATION vs FUNCTION EXPRESSION vs ARROW FUNCTIONS
=====================================================================

1. FUNCTION DECLARATION
========================
*/

// Syntax
function greet(name) {
  return `Hello, ${name}`;
}

/*
Key Characteristics:

A. HOISTING
-----------
- Function declarations are FULLY HOISTED
- Both the function name and its body are hoisted
- Can be called BEFORE declaration in code

Example:
*/
sayHello(); // Works! Outputs: "Hello from declaration"

function sayHello() {
  console.log("Hello from declaration");
}

/*
Why? During creation phase, entire function is stored in memory.

Memory during creation phase:
{
  sayHello: function() { console.log("Hello from declaration"); }
}


B. THIS BINDING
---------------
- Has its own 'this' binding
- 'this' depends on HOW the function is called (dynamic binding)
*/

function showThis() {
  console.log(this);
}

showThis(); // 'this' refers to global object (window in browser, global in Node)

const obj1 = {
  name: "Object 1",
  show: function() {
    console.log(this.name); // 'this' refers to obj1
  }
};
obj1.show(); // Output: "Object 1"

/*
C. ARGUMENTS OBJECT
-------------------
- Has access to 'arguments' object (array-like object containing all arguments)
*/

function sumAll() {
  console.log(arguments); // [1, 2, 3, 4, 5]
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15

/*
D. CONSTRUCTOR USAGE
--------------------
- Can be used as constructor function with 'new' keyword
*/

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("John", 30);
console.log(person1); // Person { name: "John", age: 30 }

/*
E. PROTOTYPE PROPERTY
---------------------
- Has 'prototype' property (used for inheritance)
*/

console.log(Person.prototype); // {}
Person.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

/*
F. FUNCTION PROPERTIES
----------------------
- Has 'name' property (function name)
- Has 'length' property (number of parameters)
*/

function testFunc(a, b, c) {}
console.log(testFunc.name);   // "testFunc"
console.log(testFunc.length); // 3


/*
=====================================================================
2. FUNCTION EXPRESSION
========================
*/

// Syntax - Anonymous
const greetExpr = function(name) {
  return `Hello, ${name}`;
};

// Syntax - Named (NFE - Named Function Expression)
const greetNamed = function greetFunction(name) {
  return `Hello, ${name}`;
};

/*
Key Characteristics:

A. HOISTING
-----------
- Variable declaration is hoisted, but NOT the function assignment
- Variable is initialized with 'undefined' during creation phase
- Cannot be called BEFORE definition in code
*/

// console.log(sayHi); // undefined (if accessed before assignment)
// sayHi(); // ❌ TypeError: sayHi is not a function

const sayHi = function() {
  console.log("Hi from expression");
};

sayHi(); // ✅ Works now

/*
Memory during creation phase (before execution):
{
  sayHi: undefined  // Only variable is hoisted, not the function
}

Memory during execution phase (after assignment):
{
  sayHi: function() { console.log("Hi from expression"); }
}


B. THIS BINDING
---------------
- Has its own 'this' binding (same as function declaration)
- 'this' depends on HOW the function is called
*/

const obj2 = {
  name: "Object 2",
  show: function() {
    console.log(this.name); // 'this' refers to obj2
  }
};
obj2.show(); // Output: "Object 2"

/*
C. ARGUMENTS OBJECT
-------------------
- Has access to 'arguments' object (same as function declaration)
*/

const multiply = function() {
  console.log(arguments);
  return arguments[0] * arguments[1];
};

console.log(multiply(5, 10)); // 50

/*
D. CONSTRUCTOR USAGE
--------------------
- Can be used as constructor (if not assigned to const)
*/

const Animal = function(type) {
  this.type = type;
};

const dog = new Animal("Dog");
console.log(dog); // Animal { type: "Dog" }

/*
E. NAMED FUNCTION EXPRESSIONS (NFE)
-----------------------------------
- Name is only accessible INSIDE the function
- Useful for recursion and debugging
*/

const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1); // Using 'fact' inside function
};

console.log(factorial(5)); // 120
// console.log(fact(5)); // ❌ ReferenceError: fact is not defined

/*
Benefits of NFE:
1. Better stack traces in debugging
2. Allows recursion even if outer variable is reassigned
3. More readable code
*/

/*
F. CONDITIONAL FUNCTION CREATION
---------------------------------
- Can be created conditionally (function declarations cannot in strict mode)
*/

let useGreeting = true;
let greeting;

if (useGreeting) {
  greeting = function() { return "Hello!"; };
} else {
  greeting = function() { return "Goodbye!"; };
}

console.log(greeting()); // "Hello!"


/*
=====================================================================
3. ARROW FUNCTIONS (ES6)
==========================
*/

// Syntax - Concise
const greetArrow = (name) => `Hello, ${name}`;

// Syntax - With block body
const greetArrowBlock = (name) => {
  return `Hello, ${name}`;
};

// Syntax - Single parameter (parentheses optional)
const square = x => x * x;

// Syntax - No parameters
const getRandom = () => Math.random();

/*
Key Characteristics:

A. HOISTING
-----------
- Same as function expressions
- Variable is hoisted but not the function
- Cannot be called before definition
*/

// arrowFunc(); // ❌ ReferenceError or TypeError

const arrowFunc = () => {
  console.log("Arrow function");
};

arrowFunc(); // ✅ Works

/*
B. THIS BINDING (MOST IMPORTANT DIFFERENCE!)
---------------------------------------------
- Arrow functions DO NOT have their own 'this'
- They inherit 'this' from the PARENT/ENCLOSING SCOPE (lexical this)
- 'this' is determined at the time of DEFINITION, not INVOCATION
- Cannot change 'this' with call(), apply(), or bind()
*/

// Example 1: Regular function vs Arrow function
const obj3 = {
  name: "Object 3",
  regularFunc: function() {
    console.log("Regular:", this.name); // 'this' refers to obj3
  },
  arrowFunc: () => {
    console.log("Arrow:", this.name); // 'this' refers to global/window
  }
};

obj3.regularFunc(); // Output: "Regular: Object 3"
obj3.arrowFunc();   // Output: "Arrow: undefined" (or window.name)

// Example 2: Arrow functions in callbacks (VERY USEFUL!)
const obj4 = {
  name: "Object 4",
  numbers: [1, 2, 3],
  
  // Problem with regular function
  printWithRegular: function() {
    this.numbers.forEach(function(num) {
      // 'this' here refers to global object, NOT obj4!
      console.log(this.name, num); // undefined 1, undefined 2, undefined 3
    });
  },
  
  // Solution 1: Using arrow function
  printWithArrow: function() {
    this.numbers.forEach((num) => {
      // Arrow function inherits 'this' from parent scope (obj4)
      console.log(this.name, num); // "Object 4" 1, "Object 4" 2, "Object 4" 3
    });
  },
  
  // Solution 2: Old way - using .bind()
  printWithBind: function() {
    this.numbers.forEach(function(num) {
      console.log(this.name, num);
    }.bind(this)); // Manually binding 'this'
  }
};

/*
Example 3: Cannot change 'this' with call/apply/bind
*/

const arrowThis = () => {
  console.log(this);
};

const obj5 = { name: "Try to bind" };
arrowThis.call(obj5);  // Still refers to parent scope's 'this'
arrowThis.apply(obj5); // Still refers to parent scope's 'this'
arrowThis.bind(obj5)(); // Still refers to parent scope's 'this'

/*
C. ARGUMENTS OBJECT
-------------------
- Arrow functions DO NOT have 'arguments' object
- Can use rest parameters instead
*/

const arrowArgs = () => {
  // console.log(arguments); // ❌ ReferenceError: arguments is not defined
};

// Solution: Use rest parameters
const arrowRest = (...args) => {
  console.log(args); // ✅ Works! [1, 2, 3]
  return args.reduce((sum, num) => sum + num, 0);
};

console.log(arrowRest(1, 2, 3)); // 6

/*
D. CONSTRUCTOR USAGE
--------------------
- Arrow functions CANNOT be used as constructors
- No 'prototype' property
- Will throw error if used with 'new' keyword
*/

const ArrowConstructor = () => {};
// const instance = new ArrowConstructor(); // ❌ TypeError: ArrowConstructor is not a constructor

console.log(ArrowConstructor.prototype); // undefined

/*
E. IMPLICIT RETURN
------------------
- Single-expression arrow functions return automatically (no 'return' keyword needed)
*/

const add = (a, b) => a + b; // Implicit return
const addExplicit = (a, b) => { return a + b; }; // Explicit return

// Returning object literals (must wrap in parentheses)
const createPerson = (name, age) => ({ name: name, age: age });
// Without parentheses, JavaScript thinks {} is a code block, not an object!

console.log(createPerson("Alice", 25)); // { name: "Alice", age: 25 }

/*
F. SHORTER SYNTAX
-----------------
- More concise, especially for simple functions
- Great for callbacks, array methods, etc.
*/

// Traditional
const nums = [1, 2, 3, 4, 5];
const doubled1 = nums.map(function(x) { return x * 2; });

// Arrow function
const doubled2 = nums.map(x => x * 2);

/*
G. NO 'new.target'
------------------
- Arrow functions don't have 'new.target'
*/

function RegularFunc() {
  console.log(new.target); // Works
}

const ArrowFunc = () => {
  // console.log(new.target); // ❌ Error in some contexts
};


/*
=====================================================================
4. MEMORY MANAGEMENT COMPARISON
================================
*/

/*
All three types of functions:

A. CREATION PHASE MEMORY
------------------------
*/

// Function Declaration: Entire function stored in memory
function declaredFunc() { return "I'm stored"; }
// Memory: { declaredFunc: [Function: declaredFunc] }

// Function Expression: Only variable name stored (initialized as undefined)
var expressionFunc = function() { return "Not yet stored"; };
// Memory during creation: { expressionFunc: undefined }
// Memory after execution: { expressionFunc: [Function: expressionFunc] }

// Arrow Function: Same as function expression
const arrowFn = () => "Not yet stored";
// Memory during creation: { arrowFn: undefined }
// Memory after execution: { arrowFn: [Function: arrowFn] }

/*
B. MEMORY SIZE
--------------
- Arrow functions are slightly smaller in memory (no 'this', 'arguments', 'prototype')
- But the difference is negligible in practice
- Modern JS engines optimize all function types efficiently
*/

/*
C. CLOSURE BEHAVIOR
-------------------
- All three types can create closures
- All three remember their lexical environment
*/

function outerDeclaration() {
  const secret = "declaration secret";
  return function inner() {
    return secret; // Closure
  };
}

function outerExpression() {
  const secret = "expression secret";
  return function() {
    return secret; // Closure
  };
}

function outerArrow() {
  const secret = "arrow secret";
  return () => secret; // Closure
}

/*
D. GARBAGE COLLECTION
----------------------
- All three are garbage collected the same way
- When no references exist, they're eligible for GC
- Closures keep variables alive as long as inner function exists
*/

let func = function() { 
  let largeArray = new Array(1000000);
  return largeArray[0];
};

func = null; // Now eligible for garbage collection


/*
=====================================================================
5. PERFORMANCE COMPARISON
==========================
*/

/*
A. EXECUTION SPEED
------------------
- Modern JS engines (V8, SpiderMonkey) optimize all three types
- In practice, performance difference is negligible
- Arrow functions might be slightly faster (less overhead, no 'this' binding)
- But optimization should not be the primary reason to choose one over another
*/

/*
B. CREATION SPEED
-----------------
- Function declarations are created during parsing (hoisting)
- Function expressions and arrow functions are created during execution
- In tight loops, there might be a tiny difference, but it's rarely noticeable
*/


/*
=====================================================================
6. WHEN TO USE EACH TYPE
=========================
*/

/*
USE FUNCTION DECLARATION WHEN:
-------------------------------
✓ You need hoisting (call function before declaration)
✓ Creating top-level functions or utility functions
✓ Need to use as constructor
✓ Want better debugging (function name shows in stack traces)
✓ Writing methods for prototypes
✓ Traditional, widely understood syntax

Example:
*/
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

/*
USE FUNCTION EXPRESSION WHEN:
------------------------------
✓ Conditional function creation
✓ Creating functions in a specific order (avoiding hoisting)
✓ Immediately Invoked Function Expressions (IIFE)
✓ Want more control over when function is defined
✓ Named Function Expressions for better debugging and recursion

Example - IIFE:
*/
(function() {
  console.log("Runs immediately!");
})();

// Example - Conditional
let operation;
if (Math.random() > 0.5) {
  operation = function() { return "heads"; };
} else {
  operation = function() { return "tails"; };
}

/*
USE ARROW FUNCTION WHEN:
------------------------
✓ Short, simple functions (callbacks, array methods)
✓ You need lexical 'this' (most common use case!)
✓ Don't need 'arguments' object
✓ Won't be used as constructor
✓ Working with array methods (map, filter, reduce, etc.)
✓ Callback functions
✓ Promise chains and async code

Example - Callbacks:
*/
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

// Clean, readable arrow functions in array methods
const adults = users.filter(user => user.age >= 18);
const names = users.map(user => user.name);
const totalAge = users.reduce((sum, user) => sum + user.age, 0);

// Example - Lexical 'this' in event handlers
class Button {
  constructor() {
    this.count = 0;
    this.element = document.createElement('button');
    
    // Arrow function preserves 'this' context
    this.element.addEventListener('click', () => {
      this.count++;
      console.log(this.count); // 'this' correctly refers to Button instance
    });
    
    // Regular function would lose 'this' context
    // this.element.addEventListener('click', function() {
    //   this.count++; // ❌ 'this' refers to element, not Button instance
    // });
  }
}

/*
AVOID ARROW FUNCTIONS WHEN:
----------------------------
✗ Defining methods in objects (unless you specifically want parent scope's 'this')
✗ Need to use as constructor
✗ Need 'arguments' object
✗ Need to dynamically change 'this' with call/apply/bind
✗ Function name is important for debugging
*/


/*
=====================================================================
7. PRACTICAL EXAMPLES & COMMON PITFALLS
========================================
*/

/*
PITFALL 1: Arrow Functions as Object Methods
----------------------------------------------
*/

// ❌ BAD - Arrow function as method
const person2 = {
  name: "John",
  greet: () => {
    console.log(`Hello, ${this.name}`); // 'this' is NOT person2!
  }
};
person2.greet(); // "Hello, undefined"

// ✅ GOOD - Regular function as method
const person3 = {
  name: "John",
  greet: function() {
    console.log(`Hello, ${this.name}`); // 'this' IS person3
  }
};
person3.greet(); // "Hello, John"

// ✅ ALSO GOOD - ES6 method shorthand
const person4 = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`); // 'this' IS person4
  }
};

/*
PITFALL 2: Forgetting 'this' Binding in Callbacks
--------------------------------------------------
*/

class Counter {
  constructor() {
    this.count = 0;
  }
  
  // ❌ BAD - Regular function loses 'this' in setTimeout
  incrementBad() {
    setTimeout(function() {
      this.count++; // 'this' is NOT Counter instance!
      console.log(this.count); // NaN or error
    }, 1000);
  }
  
  // ✅ GOOD - Arrow function preserves 'this'
  incrementGood() {
    setTimeout(() => {
      this.count++; // 'this' IS Counter instance!
      console.log(this.count);
    }, 1000);
  }
  
  // ✅ ALSO GOOD - Using .bind()
  incrementBind() {
    setTimeout(function() {
      this.count++;
      console.log(this.count);
    }.bind(this), 1000);
  }
}

/*
PITFALL 3: Implicit Return with Objects
-----------------------------------------
*/

// ❌ BAD - JavaScript thinks {} is a code block
const makePerson = (name) => { name: name };
console.log(makePerson("John")); // undefined

// ✅ GOOD - Wrap object in parentheses
const makePersonGood = (name) => ({ name: name });
console.log(makePersonGood("John")); // { name: "John" }

/*
PITFALL 4: Hoisting Confusion
------------------------------
*/

// ❌ This works (function declaration is hoisted)
hoistedFunc();
function hoistedFunc() {
  console.log("I'm hoisted!");
}

// ❌ This fails (function expression is not hoisted)
// notHoistedFunc(); // TypeError: notHoistedFunc is not a function
const notHoistedFunc = function() {
  console.log("I'm not hoisted!");
};

/*
PITFALL 5: Arrow Functions with Multiple Statements
-----------------------------------------------------
*/

// ❌ BAD - Forgot return keyword with block body
const multiply1 = (a, b) => {
  a * b; // No return!
};
console.log(multiply1(2, 3)); // undefined

// ✅ GOOD - Explicit return with block body
const multiply2 = (a, b) => {
  return a * b;
};
console.log(multiply2(2, 3)); // 6

// ✅ ALSO GOOD - Implicit return (no block)
const multiply3 = (a, b) => a * b;
console.log(multiply3(2, 3)); // 6


/*
=====================================================================
8. SUMMARY TABLE
================
*/

/*
┌─────────────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ Feature                 │ Declaration      │ Expression       │ Arrow Function   │
├─────────────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Hoisting                │ ✅ Full          │ ❌ Partial*      │ ❌ Partial*      │
│ 'this' binding          │ ✅ Dynamic       │ ✅ Dynamic       │ ❌ Lexical       │
│ 'arguments' object      │ ✅ Yes           │ ✅ Yes           │ ❌ No            │
│ Can be constructor      │ ✅ Yes           │ ✅ Yes           │ ❌ No            │
│ 'prototype' property    │ ✅ Yes           │ ✅ Yes           │ ❌ No            │
│ Implicit return         │ ❌ No            │ ❌ No            │ ✅ Yes**         │
│ 'new.target'            │ ✅ Yes           │ ✅ Yes           │ ❌ No            │
│ Can use call/apply/bind │ ✅ Yes           │ ✅ Yes           │ ⚠️ Ignored       │
│ Syntax length           │ Long             │ Medium           │ Short            │
│ Best for                │ Top-level funcs  │ Conditional      │ Callbacks        │
│                         │ Constructors     │ IIFEs            │ Array methods    │
│                         │                  │                  │ Lexical 'this'   │
└─────────────────────────┴──────────────────┴──────────────────┴──────────────────┘

* Variable name is hoisted but initialized as undefined
** Only for single-expression functions without {}


KEY TAKEAWAYS:
==============

1. HOISTING: Only function declarations are fully hoisted

2. 'this' BINDING: Arrow functions inherit 'this' from parent scope (MOST IMPORTANT!)

3. Arrow functions are NOT a complete replacement for regular functions

4. Choose based on your needs:
   - Need 'this' context? → Use regular function or arrow based on what 'this' you need
   - Short callback? → Arrow function
   - Constructor? → Function declaration or expression
   - Object method? → Regular function (method shorthand)
   
5. Arrow functions are perfect for:
   - Callbacks
   - Array methods
   - Promises
   - When you need lexical 'this'

6. Avoid arrow functions for:
   - Object methods
   - Constructors
   - When you need 'arguments'
   - Prototype methods

7. Memory and performance differences are negligible in practice

8. All three can create closures and capture variables from outer scopes
*/

/*
=====================================================================
9. INTERVIEW CHEAT SHEET: 'this' BINDING
=========================================
*/

/*
Quick Summary for Interviews:
==============================

QUESTION: "How does 'this' work in different types of functions?"

ANSWER:

1. FUNCTION DECLARATION & EXPRESSION → DYNAMIC 'this'
======================================================
*/

function regularFunc() { console.log(this); }
const funcExpr = function() { console.log(this); };

/*
'this' value depends on HOW the function is CALLED (not where it's defined):

a) Simple call → Global object (window/global) [or undefined in strict mode]
   regularFunc(); // window/global

b) Method call → Object that calls it
   obj.method(); // 'this' = obj

c) Constructor call → New object being created
   new Person(); // 'this' = new Person instance

d) call/apply/bind → Explicitly set 'this'
   func.call(obj); // 'this' = obj

e) Event handler → Element that triggered event
   button.onclick = regularFunc; // 'this' = button


2. ARROW FUNCTION → LEXICAL 'this' (Inherited)
===============================================
*/

const arrowFunc = () => { console.log(this); };

/*
'this' value depends on WHERE the function is DEFINED (not how it's called):

- Arrow function DOES NOT have its own 'this'
- It inherits 'this' from the PARENT SCOPE
- 'this' is captured at the time of function DEFINITION
- CANNOT be changed with call/apply/bind
- CANNOT be used as constructor (no new keyword)

Rule: Arrow function's 'this' = Parent scope's 'this'


REAL INTERVIEW EXAMPLES:
========================
*/

// Example 1: Object Method
const obj = {
  name: "Interview",
  
  // Regular function - 'this' = obj ✅
  regular: function() {
    console.log(this.name); // "Interview"
  },
  
  // Arrow function - 'this' = global/window ❌
  arrow: () => {
    console.log(this.name); // undefined (this = window)
  }
};

obj.regular(); // "Interview"
obj.arrow();   // undefined


// Example 2: Callback Problem & Solution
const person = {
  name: "John",
  hobbies: ["coding", "reading"],
  
  // ❌ PROBLEM: Regular function in callback
  showHobbiesBad() {
    this.hobbies.forEach(function(hobby) {
      console.log(this.name + " likes " + hobby);
      // ❌ 'this' = undefined/window (NOT person!)
    });
  },
  
  // ✅ SOLUTION: Arrow function in callback
  showHobbiesGood() {
    this.hobbies.forEach((hobby) => {
      console.log(this.name + " likes " + hobby);
      // ✅ 'this' = person (inherited from parent scope)
    });
  }
};


// Example 3: setTimeout
const counter = {
  count: 0,
  
  // ❌ PROBLEM: Regular function loses 'this'
  startBad() {
    setTimeout(function() {
      this.count++; // ❌ 'this' = window/undefined
    }, 1000);
  },
  
  // ✅ SOLUTION 1: Arrow function
  startGood() {
    setTimeout(() => {
      this.count++; // ✅ 'this' = counter
    }, 1000);
  },
  
  // ✅ SOLUTION 2: bind() with regular function
  startWithBind() {
    setTimeout(function() {
      this.count++; // ✅ 'this' = counter
    }.bind(this), 1000);
  }
};


// Example 4: Class Methods
class MyClass {
  constructor() {
    this.value = 42;
  }
  
  // Regular method - needs careful handling
  regularMethod() {
    console.log(this.value);
  }
  
  // Arrow method - automatically binds 'this'
  arrowMethod = () => {
    console.log(this.value);
  }
}

const instance = new MyClass();

// Direct call works for both
instance.regularMethod(); // 42
instance.arrowMethod();   // 42

// Callback context - DIFFERENT behavior!
setTimeout(instance.regularMethod, 100);  // ❌ undefined (loses 'this')
setTimeout(instance.arrowMethod, 100);    // ✅ 42 (keeps 'this')


/*
INTERVIEW Q&A:
==============

Q1: "What is the main difference between regular and arrow functions regarding 'this'?"
A1: Regular functions have DYNAMIC 'this' (depends on HOW called).
    Arrow functions have LEXICAL 'this' (depends on WHERE defined, inherits from parent).

Q2: "Can you change 'this' in an arrow function using call/apply/bind?"
A2: NO. Arrow functions ignore call/apply/bind. They always use lexical 'this' from parent scope.

Q3: "When should you use arrow functions?"
A3: - Callbacks (forEach, map, filter, setTimeout, etc.)
    - When you need to preserve 'this' from outer scope
    - Short, simple functions
    DO NOT use for: Object methods, Constructors, When you need dynamic 'this'

Q4: "Why can't arrow functions be used as constructors?"
A4: Arrow functions don't have their own 'this', so they can't create a new instance.
    They also lack the 'prototype' property needed for constructors.

Q5: "How to fix 'this' in a callback with regular function?"
A5: Three ways:
    1. Use arrow function: setTimeout(() => {}, 1000)
    2. Use .bind(this): setTimeout(function() {}.bind(this), 1000)
    3. Store 'this' in variable: const self = this; setTimeout(function() { self... }, 1000)
*/


/*
TRICKY INTERVIEW QUESTIONS:
===========================
*/

// Q: What will this print?
const obj1 = {
  name: "Object 1",
  getName: function() {
    return () => {
      console.log(this.name);
    };
  }
};

const arrowFromRegular = obj1.getName();
arrowFromRegular(); // ❓

/* 
Answer: "Object 1"
Explanation: Arrow function inherits 'this' from getName() method.
When getName() was called as obj1.getName(), its 'this' was obj1.
The returned arrow function captures that 'this' = obj1.
*/


// Q: What will this print?
const obj2 = {
  name: "Object 2",
  getName: () => {
    return function() {
      console.log(this.name);
    };
  }
};

const regularFromArrow = obj2.getName();
regularFromArrow(); // ❓

/*
Answer: undefined (or window.name if exists)
Explanation: Regular function has dynamic 'this'.
Called as regularFromArrow() (simple call), so 'this' = global/window.
*/


// Q: What will this print?
function outer() {
  this.name = "Outer";
  
  const inner = () => {
    console.log(this.name);
  };
  
  inner();
}

const o = new outer(); // ❓

/*
Answer: "Outer"
Explanation: When called with 'new', outer's 'this' = new object.
Arrow function 'inner' inherits that 'this', so this.name = "Outer".
*/


// Q: What will this print?
const obj3 = {
  name: "Object 3",
  regularFunc: function() {
    console.log("Regular:", this.name);
    
    const arrowFunc = () => {
      console.log("Arrow:", this.name);
    };
    
    arrowFunc();
  }
};

obj3.regularFunc(); // ❓

/*
Answer: 
  Regular: Object 3
  Arrow: Object 3

Explanation: 
- regularFunc called as obj3.regularFunc(), so its 'this' = obj3
- arrowFunc inherits 'this' from regularFunc, which is obj3
- Both print "Object 3"
*/


/*
GOLDEN RULES FOR INTERVIEWS:
=============================

1. Regular Function 'this' → "WHO called me?"
   - obj.method() → 'this' = obj
   - method() → 'this' = window/undefined
   - new Method() → 'this' = new instance
   - method.call(obj) → 'this' = obj

2. Arrow Function 'this' → "WHERE was I born?"
   - Look at parent scope's 'this'
   - Ignore how function is called
   - Cannot be changed

3. When in doubt:
   - Need dynamic 'this'? → Regular function
   - Need to preserve 'this'? → Arrow function
   - Object method? → Regular function (or method shorthand)
   - Callback? → Arrow function

4. Common Interview Trap:
   - Arrow function as object method = ❌ WRONG (loses 'this')
   - Arrow function in callback = ✅ RIGHT (preserves 'this')
*/


/*
ONE-LINE ANSWER FOR INTERVIEWS:
================================

"Regular functions have DYNAMIC 'this' determined by HOW they're called,
while arrow functions have LEXICAL 'this' inherited from WHERE they're defined."
*/


/*
=====================================================================
END OF COMPREHENSIVE GUIDE
=====================================================================
*/