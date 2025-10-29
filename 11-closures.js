?//?A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives a function access to its outer scope. In JavaScript, closures are created every time a function is created, at function creation time.


//? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

function x() {
  var a = 23;
  function y() {
    console.log(a);
  }
  y();
}
x();

//* Scope while -> Debug at Line (console.log(a))

//  1. Local
//      ->this
//  2. Closure ( x )
//      ->a : 23
//  3. Global
//      ->{....}

/*
? When X starts executing :
    1. Execution Context of X is created
    2. Lexical Environment of X is created (Variable Env + Enclosing LE)
    2.  a and y are hoisted in this Lexical Env
    3.  y function object created in memory with y.[[Environment]] = X's LE
    4.  Using 3, now Closure is created.

*/

//* Closures are created whenever a function is defined, not just when it's returned.
/* 
? Why a closure is formed ?
  ? 1) Function y is created inside x's scope - When y is defined, it forms a closure over the variables in its lexical environment (the scope where it was created)
  ? 2) y has access to x's variables - The function y "remembers" and has access to variable a from its parent scope, even though a isn't passed as a parameter
  ? 3) Closure ≠ Returning a function - A closure exists whenever an inner function accesses variables from an outer function's scope. Whether you return the function, call it immediately, or pass it as a callback - the closure is still there.
*/




//*---------------------------------------------------
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

//* Scope while -> Debug at Line (console.log(a, b))

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



//?  ------NICE EXPlanation -------

function x() {
  var a = 23;
  function y() {
    console.log(a);
  }
  y(); // x's EC is STILL on stack - normal scope chain lookup
}
x();

/*
 YES: y can access x's scope because it's lexically sitting inside x
⚠️ BUT: The mechanism of access differs:
      If x's EC is on stack → simple scope chain traversal
      If x's EC is gone → closure mechanism (which preserved the variables because of the lexical relationship)
    
*/

//?-------------------------------------

//? ============================================================================
//? COMPREHENSIVE SUMMARY: CLOSURES, LEXICAL SCOPING & SCOPE CHAIN
//? ============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────┐
│  1. THE FUNDAMENTAL HIERARCHY                                           │
└─────────────────────────────────────────────────────────────────────────┘

  LEXICAL SCOPING (The Rule)
        ↓
  Functions are scoped based on WHERE they are written, not where called
        ↓
  LEXICAL ENVIRONMENT REFERENCES (The Mechanism)
        ↓
  Every function stores [[Environment]] reference to outer lexical environment
        ↓
  CLOSURE (The Consequence/Feature)
        ↓
  Inner function preserves access to outer variables even after outer is done

  KEY INSIGHT: Closures don't create lexical scoping - 
               Lexical scoping creates closures!
*/

//? ─────────────────────────────────────────────────────────────────────────
//? 2. SCOPE CHAIN vs CLOSURE - Same Mechanism, Different Context
//? ─────────────────────────────────────────────────────────────────────────

/*
The UNDERLYING MECHANISM is always the same: Lexical Environment References
We just use different TERMINOLOGY based on context:

┌──────────────────┬────────────────────────────────────────────────────┐
│  TERM            │  WHEN WE USE IT                                    │
├──────────────────┼────────────────────────────────────────────────────┤
│  Scope Chain     │  General term for how functions access variables  │
│                  │  through lexical environment references            │
├──────────────────┼────────────────────────────────────────────────────┤
│  Closure         │  Specific term when we highlight that inner        │
│                  │  function preserves outer variables AFTER outer    │
│                  │  function has finished executing                   │
└──────────────────┴────────────────────────────────────────────────────┘
*/

//* Example 1: Scope Chain (No practical closure)
function outer1() {
  let x = 10;
  function inner() {
    console.log(x); // Accessed via scope chain
  }
  inner(); // Called immediately while outer1 is still executing
  // After outer1 finishes, both inner and x are garbage collected
}
outer1();

//* Example 2: Closure (Practical use)
function outer2() {
  let x = 10;
  function inner() {
    console.log(x); // Accessed via closure
  }
  return inner; // inner outlives outer2
}
let fn = outer2(); // outer2's EC is GONE from call stack
fn(); // But x is preserved! Prints: 10
// Closure prevents x from being garbage collected

/*
In BOTH examples:
  - inner's [[Environment]] points to outer's lexical environment
  - The mechanism is IDENTICAL
  - DevTools shows "Closure(outer)" in both cases
  
The difference:
  - Example 1: Normal scope chain access (outer still executing)
  - Example 2: Closure's power visible (outer already finished)
*/

//? ─────────────────────────────────────────────────────────────────────────
//? 3. WHEN ARE CLOSURES FORMED? (Hoisting vs Execution Phase)
//? ─────────────────────────────────────────────────────────────────────────

/*
"Closures are formed when function is DEFINED"
But "defined" means different things for different function types:
*/

//* Case 1: FUNCTION DECLARATION - Created during HOISTING/CREATION PHASE
function testDeclaration() {
  console.log("Start");
  
  // 'inner' function object is created during HOISTING phase
  // [[Environment]] is set during creation phase
  // BEFORE this line executes!
  function inner() {
    console.log(x); // Closure formed during hoisting
  }
  
  var x = 100; // This executes later
  return inner;
}

/*
Timeline for Function Declaration:
  1. Creation Phase (Hoisting):
     - Function object 'inner' created in memory
     - inner.[[Environment]] = testDeclaration's lexical environment
     - Closure is formed at this point
  
  2. Execution Phase:
     - Code runs line by line
     - x = 100 assigns value
     - inner is returned
*/

//* Case 2: FUNCTION EXPRESSION - Created during EXECUTION PHASE
function testExpression() {
  console.log("Start");
  
  // 'inner' is created ONLY when this line EXECUTES
  const inner = function() {
    console.log(x); // Closure formed during execution
  };
  
  var x = 100;
  return inner;
}

/*
Timeline for Function Expression:
  1. Creation Phase (Hoisting):
     - Only 'inner' variable is hoisted (undefined)
     - No function object yet
  
  2. Execution Phase:
     - When 'const inner = function()...' line executes:
       * Function object is created
       * [[Environment]] is set
       * Closure is formed
*/

//* Case 3: ARROW FUNCTION - Same as Function Expression
function testArrow() {
  console.log("Start");
  
  // Created when this line executes
  const inner = () => {
    console.log(x);
  };
  
  var x = 100;
  return inner;
}

//? ─────────────────────────────────────────────────────────────────────────
//? 4. THE INTERNAL MECHANISM: [[Environment]] Property
//? ─────────────────────────────────────────────────────────────────────────

/*
Every function has an internal property: [[Environment]]

This property stores a reference to the Lexical Environment 
where the function was created.

Example visualization:
*/

function outer() {
  let count = 0;
  let name = "JavaScript";
  
  function increment() {
    count++;
    console.log(count);
  }
  
  function getName() {
    console.log(name);
  }
  
  return { increment, getName };
}

const counter = outer();

/*
After outer() executes:

outer's Lexical Environment (preserved in memory):
  {
    count: 0,
    name: "JavaScript",
    outer: <reference to Global LE>
  }
  ↑
  |
  [[Environment]] property of both increment and getName
  points to this

When counter.increment() is called:
  1. Look for 'count' in increment's local scope - NOT FOUND
  2. Follow [[Environment]] reference to outer's LE - FOUND!
  3. Access and modify count
  4. This is closure in action!
*/

//? ─────────────────────────────────────────────────────────────────────────
//? 5. KEY TAKEAWAYS
//? ─────────────────────────────────────────────────────────────────────────

/*
✅ LEXICAL SCOPING = The fundamental rule
   "Functions access variables based on WHERE they're written"

✅ LEXICAL ENVIRONMENT REFERENCES = The implementation
   "Functions store [[Environment]] reference to outer scope"

✅ CLOSURE = The powerful feature
   "Inner functions preserve outer variables even after outer is done"

✅ SCOPE CHAIN = General term for variable lookup through LE references

✅ When formed:
   - Function Declarations: During hoisting (creation phase)
   - Function Expressions/Arrows: During execution (when line runs)

✅ DevTools shows "Closure(functionName)" because:
   - Variable is accessed from outer lexical environment
   - This is true whether outer is still executing or not
   - The mechanism is always the same (LE references)

✅ The real power of closure:
   - Data persistence after function returns
   - Data hiding and encapsulation
   - Creating private variables
   - Maintaining state in async operations
*/

//? ─────────────────────────────────────────────────────────────────────────
//? 6. PRACTICAL COMPARISON EXAMPLE
//? ─────────────────────────────────────────────────────────────────────────

//* Scenario A: Inner function called immediately (No practical closure benefit)
function scenarioA() {
  let data = "I will be garbage collected soon";
  
  function process() {
    console.log(data); // Accesses via scope chain
  }
  
  process(); // Called immediately
  // After scenarioA ends, 'data' is garbage collected
}
scenarioA();

//* Scenario B: Inner function returned (Closure's real power)
function scenarioB() {
  let data = "I will persist!";
  
  function process() {
    console.log(data); // Accesses via closure
  }
  
  return process; // Function outlives scenarioB
}

const persistentFunc = scenarioB(); 
// scenarioB's execution context is GONE
// But 'data' is NOT garbage collected due to closure!

setTimeout(() => {
  persistentFunc(); // Still works! Prints: "I will persist!"
}, 2000);

/*
BOTH use the same mechanism ([[Environment]] reference)
BOTH create closures technically
BUT only Scenario B demonstrates closure's VALUE:
  - Data persistence
  - Function outliving its creator
  - Memory preservation
*/

//? ============================================================================
//? END OF COMPREHENSIVE SUMMARY
//? ============================================================================



/*

!The Optimization: Stack vs. Heap -----------------------------------------------

The JavaScript engine makes a critical decision based on whether a closed-over variable needs to persist.

*Scenario 1: y is called only inside x (Your original example)
In this case, the engine's static analysis can see that the inner function y does not "escape" the scope of x. It is defined and executed entirely within x's lifecycle.

?What happens: The variable a can live on the stack within the execution context (stack frame) of x.

?Why: There is no need for a to exist after x completes. When x returns, its entire stack frame, including a, can be safely destroyed. The closure exists and is used for the lookup, but it's a short-lived one.

*Scenario 2: y is returned from x (The classic closure example)
Here, the engine sees that the inner function y is being returned, meaning it can be called later, long after x has finished.

?What happens: The engine recognizes that a must survive. Therefore, it promotes the variable a from the stack to the heap.

?Why: The stack frame for x will be destroyed, but the heap is a separate memory area for longer-lived objects. The closure created for y now holds a reference to the variable a on the heap, ensuring it remains available for as long as y exists.​

In summary, the closure is conceptually formed in both cases. However, the underlying memory management is different. The act of returning the inner function (or passing it to something like setTimeout) is the signal to the engine that the closed-over variables need to be moved to the heap for long-term persistence.

*/