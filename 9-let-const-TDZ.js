//? TDZ - Temporal Dead Zone
//* The phase between Hoisting -> till it gets some value
//? Are let & const hoisted ?
//* Yes, but different from var hoisting

console.log(a); //! Reference Error : Cannot access a before initialization
//! This appears whenever trying to access varible that is in TDZ
console.log(b);

let a = 10; //All region before this line, is TDZ for a
var b = 100;

//* Let & const not attached to window object unlike var, in this case
//* they have a separate storage (Script ?)

let x = 2;
let x = 5; //! Syntax Error -> duplicate
const y;    //! Syntax Error -> declaration & assignment should happen together
const y = 3;
const y = 3; //! Syntax Error -> duplicate
y = 10; //! Type Error  -> since const type of varibale

//***** USE - const > let > var  ******//
//****  Shrink TDZ window -> 0, by moving initializations to the TOP */

//? Difference b/w Syntax, Reference & Type Error ?


//---------------------------------------------27-10-2025---------------------------------------------//


/*
 * ============================================================================
 * TEMPORAL DEAD ZONE (TDZ) - INTERVIEW GUIDE
 * ============================================================================
 * Last Updated: 27-10-2025
 * 
 * Topics Covered:
 * 1. What is TDZ?
 * 2. Hoisting & Memory Allocation (var vs let/const)
 * 3. Variable Environment vs Lexical Environment
 * 4. Key Differences & Interview Questions
 */

// ============================================================================
// 1. WHAT IS TDZ (TEMPORAL DEAD ZONE)?
// ============================================================================

//* TDZ = Time between hoisting and initialization of let/const variables

console.log(a); //! ReferenceError: Cannot access 'a' before initialization
let a = 10;     // ← Line 10 is TDZ for 'a' (line 1 to 9)

console.log(b); // undefined (no TDZ for var)
var b = 100;

//? Are let & const hoisted?
//* YES! But they remain uninitialized (in TDZ) until declaration line

// ============================================================================
// 2. HOISTING & MEMORY ALLOCATION
// ============================================================================

/*
 * QUESTION: Is memory allocated for let/const during TDZ?
 * ANSWER: YES! But the variable is marked as UNINITIALIZED
 */

// var hoisting:
console.log(x); // undefined (NOT "not defined" error!)
var x = 5;

/*
 * WHY undefined and not "not defined"?
 * 
 * Because var IS HOISTED! Here's what happens:
 * 
 * // WHAT YOU WRITE:
 * console.log(x);
 * var x = 5;
 * 
 * // HOW JS ENGINE EXECUTES:
 * var x = undefined;  // ← Hoisted to top + initialized
 * console.log(x);     // undefined (variable exists!)
 * x = 5;              // Assignment happens here
 */

// Process:
// 1. Memory allocated in Variable Environment
// 2. Initialized with 'undefined'
// 3. Immediately accessible (that's why no error!)

// let/const hoisting:
// console.log(y); // ReferenceError (NOT undefined!)
let y = 10;

/*
 * WHY ReferenceError and not undefined?
 * 
 * Because let IS hoisted BUT left UNINITIALIZED!
 * 
 * // WHAT YOU WRITE:
 * console.log(y);
 * let y = 10;
 * 
 * // HOW JS ENGINE EXECUTES:
 * // let y;  // ← Hoisted but UNINITIALIZED (in TDZ)
 * console.log(y);  // ReferenceError (can't access!)
 * let y = 10;      // Initialization happens here (TDZ ends)
 */

// Process:
// 1. Memory allocated in Lexical Environment
// 2. Marked as <uninitialized> (NOT undefined!)
// 3. NOT accessible until declaration line (TDZ)

/*
 * KEY DIFFERENCE:
 * var  → Memory allocated + initialized with 'undefined'
 * let  → Memory allocated + left UNINITIALIZED (TDZ)
 * 
 * SIDE-BY-SIDE COMPARISON:
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                        var                   let/const           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Hoisted?            YES ✓                   YES ✓               │
 * │ Initialized?        YES (undefined)         NO (uninitialized)  │
 * │ Accessible before?  YES (undefined)         NO (ReferenceError) │
 * │ TDZ?                NO                       YES                 │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * BOTH ARE HOISTED! The difference is in INITIALIZATION.
 */

// ============================================================================
// 3. VARIABLE ENVIRONMENT vs LEXICAL ENVIRONMENT
// ============================================================================

//? Where are variables stored?

// GLOBAL SCOPE
var globalVar = "I'm in Variable Environment";
let globalLet = "I'm in Lexical Environment";
const globalConst = "Also in Lexical Environment";

// Verification:
console.log(window.globalVar);    // ✅ "I'm in Variable Environment"
console.log(window.globalLet);    // ❌ undefined (not in window)
console.log(window.globalConst);  // ❌ undefined (not in window)

/*
 * STORAGE LOCATIONS:
 * 
 * Variable Environment (VE):
 * ├─ Stores: var declarations
 * ├─ Location: Global Object (window) / Activation Object
 * ├─ Scope: Function-scoped
 * └─ Initialized: undefined (immediately)
 * 
 * Lexical Environment (LE):
 * ├─ Stores: let/const declarations
 * ├─ Location: Script scope (separate from window)
 * ├─ Scope: Block-scoped
 * └─ Initialized: Uninitialized (TDZ)
 */

// FUNCTION SCOPE EXAMPLE
function demo() {
    console.log(funcVar);  // undefined (hoisted)
    // console.log(funcLet);  // ReferenceError (TDZ)
    
    var funcVar = 10;
    let funcLet = 20;
    
    if (true) {
        var blockVar = 30;  // Function-scoped
        let blockLet = 40;  // Block-scoped
    }
    
    console.log(blockVar);  // ✅ 30 (accessible - function scoped)
    // console.log(blockLet); // ❌ ReferenceError (block scoped)
}

/*
 * IMPORTANT: How var is HOISTED
 * 
 * The above function is interpreted by JavaScript engine as:
 * 
 * function demo() {
 *     // CREATION PHASE - Hoisting happens here:
 *     var funcVar = undefined;  // ← Declaration hoisted & initialized
 *     var blockVar = undefined; // ← Even though declared inside if block!
 *     // let funcLet;  // ← Hoisted but UNINITIALIZED (TDZ)
 *     
 *     // EXECUTION PHASE:
 *     console.log(funcVar);  // undefined (already declared & initialized)
 *     // console.log(funcLet);  // ReferenceError (in TDZ)
 *     
 *     funcVar = 10;  // Assignment happens here
 *     funcLet = 20;  // Initialization happens here (TDZ ends)
 *     
 *     if (true) {
 *         blockVar = 30;  // Assignment happens here
 *         // let blockLet declaration happens here
 *     }
 *     
 *     console.log(blockVar);  // 30
 * }
 * 
 * KEY POINT:
 * var IS hoisted → Declaration moved to top + initialized with undefined
 * let IS hoisted → Declaration registered but left UNINITIALIZED (TDZ)
 */

/*
 * MEMORY STRUCTURE:
 * 
 * Variable Environment (Function level):
 * ┌────────────────────────┐
 * │ funcVar: undefined → 10│
 * │ blockVar: undefined→30 │ ← All vars accessible throughout
 * └────────────────────────┘
 * 
 * Lexical Environment (Block level):
 * ┌────────────────────────┐
 * │ funcLet: 20            │ ← Function block
 * └────────────────────────┘
 *          ↓
 * ┌────────────────────────┐
 * │ blockLet: 40           │ ← If block (new LE)
 * └────────────────────────┘
 */

// ============================================================================
// 4. KEY DIFFERENCES (INTERVIEW QUESTIONS)
// ============================================================================

//? Q1: Difference between var, let, and const?

/*
 * SCOPING:
 * var   → Function-scoped
 * let   → Block-scoped
 * const → Block-scoped
 * 
 * HOISTING:
 * var   → Hoisted + initialized with 'undefined'
 * let   → Hoisted + uninitialized (TDZ)
 * const → Hoisted + uninitialized (TDZ)
 * 
 * RE-DECLARATION:
 * var   → ✅ Allowed
 * let   → ❌ SyntaxError
 * const → ❌ SyntaxError
 * 
 * RE-ASSIGNMENT:
 * var   → ✅ Allowed
 * let   → ✅ Allowed
 * const → ❌ TypeError
 * 
 * GLOBAL OBJECT:
 * var   → Attached to window
 * let   → NOT attached to window
 * const → NOT attached to window
 */

//? Q2: Why does var cause issues in loops?

// Problem with var:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
    // Output: 3, 3, 3 (all closures reference same 'i')
}

// Solution with let:
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 100);
    // Output: 0, 1, 2 (new binding per iteration)
}

//? Q3: Can you access typeof for TDZ variables?

console.log(typeof undeclaredVar);     // "undefined" (no error)
// console.log(typeof variableInTDZ);  // ReferenceError (in TDZ)
let variableInTDZ = 10;

//? Q4: What are different error types?

// 1. SyntaxError (Parsing phase - before execution)
// let x = 1;
// let x = 2; // SyntaxError: Identifier 'x' has already been declared

// 2. ReferenceError (Variable not accessible)
// console.log(a); // ReferenceError: Cannot access 'a' before initialization
// let a = 10;

// 3. TypeError (Wrong operation on type)
// const PI = 3.14;
// PI = 3.14159; // TypeError: Assignment to constant variable

//? Q5: What's the best practice?

//* BEST PRACTICE: const > let > var
//* 1. Use const by default
//* 2. Use let when you need to reassign
//* 3. Avoid var (legacy code only)

// ============================================================================
// 5. REAL-WORLD SCENARIOS (INTERVIEW CODING QUESTIONS)
// ============================================================================

// Scenario 1: Variable shadowing
let count = 10;
{
    let count = 20; // Different variable (new LE)
    console.log(count); // 20
}
console.log(count); // 10

// Scenario 2: Closure with let vs var
function createCounters() {
    const counters = [];
    
    // Using let (correct)
    for (let i = 0; i < 3; i++) {
        counters.push(() => i);
    }
    
    return counters;
}

const counters = createCounters();
console.log(counters[0]()); // 0
console.log(counters[1]()); // 1
console.log(counters[2]()); // 2

// Scenario 3: TDZ with function parameters
function example(value = getValue()) {
    // getValue is called if value is undefined
    // let getValue = () => 10; // ❌ ReferenceError if used
    const getValue = () => 10; // Must be declared before
    return value;
}

// Scenario 4: const with objects (Common Interview Question)
const person = { name: "John" };
person.name = "Jane";  // ✅ Works (object is mutable)
person.age = 30;       // ✅ Works (can add properties)
// person = {};        // ❌ TypeError (can't reassign)

//* const makes the BINDING constant, NOT the value immutable

// Scenario 5: TDZ in switch statements (Tricky!)
switch(1) {
    case 1:
        let value = 10;
        console.log(value); // 10
        break;
    case 2:
        // console.log(value); // ReferenceError (TDZ even in same switch)
        // let value = 20;     // SyntaxError: duplicate declaration
        break;
}

//* Each case is NOT a separate block by default - wrap in braces!

// Scenario 6: Destructuring and TDZ
// const { name } = person; // ❌ ReferenceError if person in TDZ
// let person = { name: "John" };

const user = { name: "Alice" };
const { name: userName } = user; // ✅ Works
console.log(userName); // "Alice"

// Scenario 7: Function hoisting vs variable hoisting
console.log(typeof funcDeclaration); // "function" (fully hoisted)
console.log(typeof funcExpression);  // undefined (var hoisting)
// console.log(typeof arrowFunc);    // ReferenceError (TDZ)

function funcDeclaration() { return "I'm hoisted"; }
var funcExpression = function() { return "Only var is hoisted"; };
const arrowFunc = () => "I'm in TDZ";

// ============================================================================
// 6. TRICKY INTERVIEW EDGE CASES (Advanced)
// ============================================================================

//? Edge Case 1: What's the output?
function test1() {
    console.log(a); // ?
    console.log(b); // ?
    var a = 1;
    let b = 2;
}
// test1(); 
// Output: undefined, ReferenceError

//? Edge Case 2: What's the output?
var x = 1;
{
    console.log(x); // ReferenceError (not 1!)
    let x = 2;      // x is in TDZ above
}
// Explanation: let x shadows outer var x, creating TDZ in entire block

//? Edge Case 3: What's the output?
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 0);
}
// Output: 3,3,3 then 0,1,2

//? Edge Case 4: What's the output?
console.log(typeof a); // undefined (no declaration yet)
console.log(typeof b); // ReferenceError (in TDZ)
var a;
let b;

//? Edge Case 5: Is this valid?
{
    function foo() { return 1; }
}
{
    function foo() { return 2; }
}
console.log(foo()); // Depends on mode (strict vs non-strict)
// In strict mode: ReferenceError (block-scoped)
// In non-strict mode: 2 (function-scoped)

//? Edge Case 6: What happens here?
let a = 1;
function outer() {
    console.log(a); // ReferenceError (not 1!)
    let a = 2;      // a is in TDZ above in function scope
}
// outer();

//? Edge Case 7: const with arrays
const arr = [1, 2, 3];
arr.push(4);        // ✅ Works
arr[0] = 100;       // ✅ Works
// arr = [4, 5, 6]; // ❌ TypeError
console.log(arr);   // [100, 2, 3, 4]

//? Edge Case 8: Nested blocks
{
    let x = 1;
    {
        let x = 2; // Different variable (shadowing)
        console.log(x); // 2
    }
    console.log(x); // 1
}

//? Edge Case 9: for...in and for...of with let
const obj = { a: 1, b: 2 };
for (let key in obj) {
    console.log(key); // "a", "b" (new binding each iteration)
}

// ============================================================================
// 7. QUICK REFERENCE FOR INTERVIEWS
// ============================================================================

/*
 * TDZ KEY POINTS:
 * 
 * ✓ TDZ = Time between hoisting and initialization
 * ✓ Both var and let/const are hoisted
 * ✓ var → initialized with undefined (no TDZ)
 * ✓ let/const → uninitialized (has TDZ)
 * ✓ Memory IS allocated during TDZ
 * ✓ Accessing TDZ variable → ReferenceError
 * ✓ TDZ helps catch bugs early
 * 
 * ENVIRONMENT STORAGE:
 * 
 * ✓ Variable Environment → stores var (function-scoped)
 * ✓ Lexical Environment → stores let/const (block-scoped)
 * ✓ var in global scope → attached to window
 * ✓ let/const in global scope → NOT attached to window
 * 
 * BEST PRACTICES:
 * 
 * ✓ Declare variables at the top of their scope
 * ✓ Use const by default
 * ✓ Use let when reassignment needed
 * ✓ Avoid var in modern JavaScript
 * ✓ Minimize TDZ window by early declaration
 */

// ============================================================================
// 8. COMMON INTERVIEW MISTAKES TO AVOID
// ============================================================================

// ❌ Mistake 1: Thinking let/const are not hoisted
// They ARE hoisted, just not initialized

// ❌ Mistake 2: Thinking TDZ means no memory allocation
// Memory IS allocated, but variable is uninitialized

// ❌ Mistake 3: Using var in loops with callbacks
// Always use let in loops

// ❌ Mistake 4: Accessing variable before declaration
// Always declare at the top of scope

// ❌ Mistake 5: Confusing error types
// Learn: SyntaxError vs ReferenceError vs TypeError

// ============================================================================
// 9. HOW TO EXPLAIN IN INTERVIEWS (Verbal Answers)
// ============================================================================

/*
 * Q: "Explain TDZ in JavaScript"
 * 
 * ANSWER:
 * "TDZ stands for Temporal Dead Zone. It's the period between when a 
 * let/const variable is hoisted and when it's initialized with a value.
 * 
 * During this period, the variable exists in memory but cannot be accessed.
 * If you try to access it, you get a ReferenceError.
 * 
 * This is different from var, which is hoisted and immediately initialized
 * with undefined, so you can access it before declaration without errors.
 * 
 * TDZ is actually a feature that helps catch bugs by preventing accidental
 * use of variables before they're properly initialized."
 */

/*
 * Q: "Why do we need let and const if we already have var?"
 * 
 * ANSWER:
 * "var has several problems:
 * 
 * 1. Function scoping - var ignores block boundaries, leading to bugs
 * 2. Global pollution - var in global scope attaches to window object
 * 3. Silent failures - accessing before declaration gives undefined
 * 4. Closure issues - especially problematic in loops with callbacks
 * 
 * let and const solve these with:
 * - Block scoping for better encapsulation
 * - TDZ for early error detection
 * - No global object pollution
 * - Proper closure behavior in loops
 * 
 * const adds immutability for the binding, making code more predictable."
 */

/*
 * Q: "What's the difference between Variable Environment and Lexical Environment?"
 * 
 * ANSWER:
 * "Every execution context has both:
 * 
 * Variable Environment:
 * - Stores var declarations
 * - Function-scoped or global
 * - Variables initialized with undefined immediately
 * - In global scope, attached to window object
 * 
 * Lexical Environment:
 * - Stores let/const declarations
 * - Block-scoped
 * - Variables left uninitialized (TDZ)
 * - Separate from window object
 * 
 * This separation enables block scoping and better memory management."
 */

// ============================================================================
// END OF TDZ INTERVIEW GUIDE
// ============================================================================
// Total Sections: 9
// Best Practice: Review sections 6, 7, 8, 9 before interviews
// ============================================================================
