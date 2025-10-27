//* Variable/Func hoisting --> Means allocating memory

console.log(this); // { }

console.log(x); //undefined
//console.log(y); //ReferenceError: y is not defined

//console.log(s); //ReferenceError: s is not defined, make `var s` to remove error

var x = 7; //hoisted
s = 2; //NOT hoisted

//?-----------------------------------------------------
getName();
console.log(z); //2
//hoisted
function getName() {
  console.log("getName This --->");
  console.log(this); //Object [global]
  z = 2; //global varible but NOT hoisted, created at runtime during execution phase.
}
//?-----------------------------------------------------

//getName2(); //TypeError: getName2 is not a function
var getName2 = function () {
  console.log("getName2 This --->");
  console.log(this); //Object [global]
};
getName2();
//?-----------------------------------------------------

//getName3(); //TypeError: getName3 is not a function
var getName3 = () => {
  console.log("getName3 This --->");
  console.log(this); // { }
};
getName3();
//* Questions *//

/*

1. Are global variables hoisted ?   
2. Are global variables part of Global EC ?
3. Difference b/w var x=2 and x = 2 w.r.t GEC ?
4. How hoisting helps ? Why is it done in JS ? Uses of hoisting ?

*/

//* ============== ANSWERS (Interview Perspective) ============== *//

//* 1. Are global variables hoisted?
/*
Answer: It depends on HOW they are declared.

✅ YES - Variables declared with 'var' are hoisted:
   - Memory is allocated during the creation phase of Global EC
   - Initialized with 'undefined' before execution starts
   - Example: var x = 7; // Can access x before this line (returns undefined)

❌ NO - Variables without declaration keywords are NOT hoisted:
   - Created at runtime during execution phase only
   - No memory allocated during creation phase
   - Example: s = 2; // Accessing s before this line throws ReferenceError

⚠️  Note: Variables declared with 'let' and 'const' are technically hoisted but 
   are in Temporal Dead Zone (TDZ) until initialization, so accessing them 
   throws ReferenceError.
*/

//* 2. Are global variables part of Global EC?
/*
Answer: YES, but with important distinctions:

✅ Variables declared with var/let/const in global scope:
   - Created during the creation phase of Global Execution Context
   - var & function declarations → Part of VARIABLE ENVIRONMENT    (part of EC)
   - let & const declarations → Part of LEXICAL ENVIRONMENT (block-scoped)  (also, part of EC)
   - var declarations also become properties of the global object (window/global)
   - let/const do NOT become properties of global object

⚠️  Variables without declaration keywords (implicit globals):
   - Become properties of the global object at runtime.
   - Created during execution phase, not creation phase  (not part of EC at all)
   - Example: z = 2; (inside getName function above)

Key Interview Points:
- Global EC has two phases: Creation & Execution
- Global EC contains BOTH Variable Environment & Lexical Environment
- Declared variables are part of creation phase
- Implicit globals are runtime properties of global object
*/

//* 3. Difference b/w var x=2 and x = 2 w.r.t GEC?
/*
Answer: Major differences in hoisting, scope, and behavior:

┌─────────────────────┬────────────────────┬──────────────────────┐
│     Aspect          │    var x = 2       │    x = 2 (no var)    │
├─────────────────────┼────────────────────┼──────────────────────┤
│ Hoisting            │ ✅ YES             │ ❌ NO                │
│ Creation Phase      │ Memory allocated   │ Not allocated        │
│ Initial Value       │ undefined          │ Doesn't exist        │
│ Before Assignment   │ undefined          │ ReferenceError       │
│ Execution Phase     │ Value assigned     │ Created & assigned   │
│ Global Property     │ ✅ YES             │ ✅ YES               │
│ Strict Mode         │ ✅ Allowed         │ ❌ Error (safer)     │
└─────────────────────┴────────────────────┴──────────────────────┘

Key Interview Points:
- var x = 2: Proper declaration → hoisted → safer & predictable
- x = 2: Implicit global → runtime only → avoided in modern JS
- Always use var/let/const to avoid accidental global pollution
- In strict mode, x = 2 (without declaration) throws ReferenceError
*/

//* 4. How hoisting helps? Why is it done in JS? Uses of hoisting?
/*
Answer: Hoisting is a consequence of JavaScript's two-phase execution model.

WHY IT'S DONE:
─────────────
1. Two-Phase Execution Model:
   Phase 1 (Creation): Memory allocation for variables & functions
   Phase 2 (Execution): Line-by-line code execution
   
2. Parser needs to know about all declarations before execution starts
   to build the execution context properly.

HOW IT HELPS:
─────────────
1. ✅ Function Declarations Work Before Definition:
   getName(); // Works perfectly!
   function getName() { console.log("Hello"); }
   
2. ✅ Code Organization Flexibility:
   - Main logic at top, helper functions at bottom
   - Better readability and code structure
   
3. ✅ Mutual Recursion Made Easy:
   function isEven(n) { return n === 0 ? true : isOdd(n - 1); }
   function isOdd(n) { return n === 0 ? false : isEven(n - 1); }
   // Functions can call each other regardless of order

4. ✅ Forgiving Language Design:
   - More flexible than strict languages
   - Easier for beginners (though can lead to confusion)

IMPORTANT CAVEATS (Interview Red Flags to Avoid):
──────────────────────────────────────────────────
❌ Function expressions are NOT fully hoisted:
   getName(); // TypeError: getName is not a function
   var getName = function() { console.log("Hello"); };
   // Only 'var getName' is hoisted (as undefined), not the function

❌ Arrow functions follow same rule as function expressions:
   getName(); // TypeError: getName is not a function
   var getName = () => { console.log("Hello"); };

✅ Best Practice for Modern JS:
   - Use 'let' and 'const' instead of 'var' (block-scoped, TDZ protection)
   - Declare variables at the top of their scope
   - Don't rely on hoisting for readability
   - Use function declarations only when you need them to be hoisted
*/
