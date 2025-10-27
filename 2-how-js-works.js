/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    HOW JAVASCRIPT WORKS - INTERNALS                          ║
║                    (Senior Interview Preparation)                            ║
╚══════════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. FUNDAMENTAL CHARACTERISTICS OF JAVASCRIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Single-threaded: Only ONE call stack, executes ONE thing at a time
✓ Synchronous: Code executes line by line, top to bottom
✓ Has a single Call Stack: Manages execution order (LIFO)
✓ Everything happens inside an Execution Context (EC)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. MEMORY ARCHITECTURE - WHERE THINGS ACTUALLY LIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL UNDERSTANDING: Call Stack ≠ Stack Memory

There are TWO different memory regions in JavaScript:

┌───────────────────────────────────────────────────────────────────┐
│                    JAVASCRIPT MEMORY MODEL                        │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  1. CALL STACK (Execution Stack)                            │ │
│  │  ════════════════════════════════════════════════════════   │ │
│  │                                                              │ │
│  │  • Stores Execution Context objects (the containers)        │ │
│  │  • Stores primitive values (numbers, strings, booleans)     │ │
│  │  • Stores references/pointers to objects in Heap            │ │
│  │  • LIFO data structure                                      │ │
│  │  • Fixed size (~1-2 MB, varies by engine)                   │ │
│  │  • Fast access                                              │ │
│  │  • Automatic cleanup when EC is popped                      │ │
│  │                                                              │ │
│  │  Structure in Call Stack:                                   │ │
│  │  ┌──────────────────────────────┐                           │ │
│  │  │  Execution Context 3         │                           │ │
│  │  │  ├─ Local primitives          │                           │ │
│  │  │  └─ References to heap        │                           │ │
│  │  ├──────────────────────────────┤                           │ │
│  │  │  Execution Context 2         │                           │ │
│  │  │  ├─ Local primitives          │                           │ │
│  │  │  └─ References to heap        │                           │ │
│  │  ├──────────────────────────────┤                           │ │
│  │  │  Global Execution Context    │                           │ │
│  │  │  ├─ Global primitives         │                           │ │
│  │  │  └─ References to heap        │                           │ │
│  │  └──────────────────────────────┘                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  2. MEMORY HEAP (Dynamic Memory)                            │ │
│  │  ═══════════════════════════════════════════════════════    │ │
│  │                                                              │ │
│  │  • Stores objects, arrays, functions                        │ │
│  │  • Stores closures' preserved environments                  │ │
│  │  • Unstructured memory pool                                 │ │
│  │  • Dynamic size (can grow as needed)                        │ │
│  │  • Slower access than stack                                 │ │
│  │  • Managed by Garbage Collector                             │ │
│  │  • Objects remain here until GC removes them                │ │
│  │                                                              │ │
│  │  Example:                                                    │ │
│  │  { name: "John", age: 30 } ← Lives in Heap                  │ │
│  │  function foo() {} ← Lives in Heap                          │ │
│  │  [1, 2, 3] ← Lives in Heap                                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

KEY INSIGHT:
═══════════
When an Execution Context is created:
  • The EC structure itself goes on the CALL STACK
  • Primitive variables (numbers, strings, etc.) → CALL STACK
  • Objects/Arrays/Functions → MEMORY HEAP (reference stored in stack)

Example:
*/

function demo() {
  var num = 42;           // 42 stored in CALL STACK
  var str = "hello";      // "hello" stored in CALL STACK
  var obj = { x: 10 };    // Object stored in HEAP, reference in STACK
  var arr = [1, 2, 3];    // Array stored in HEAP, reference in STACK
}

/*
Memory Layout when demo() is executing:

CALL STACK:                           MEMORY HEAP:
┌──────────────────────┐              ┌─────────────────────┐
│  demo() EC           │              │                     │
│  ├─ num: 42          │              │  { x: 10 }  ←──┐    │
│  ├─ str: "hello"     │              │                │    │
│  ├─ obj: 0x001  ─────┼──────────────┼────────────────┘    │
│  └─ arr: 0x002  ─────┼──────────────┼─→ [1, 2, 3]         │
└──────────────────────┘              │                     │
                                      └─────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. EXECUTION CONTEXT (EC) - THE CONTAINER FOR CODE EXECUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

An Execution Context is a wrapper that holds all the information needed to
execute a piece of JavaScript code.

┌─────────────────────────────────────────────────────────────┐
│              EXECUTION CONTEXT STRUCTURE                    │
│              (This entire structure lives in CALL STACK)    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. MEMORY COMPONENT (Variable Environment)                │
│     ├─ Stores all variables as key-value pairs             │
│     ├─ Stores function declarations (entire code)          │
│     └─ Initialized during Memory Creation Phase            │
│                                                             │
│  2. CODE COMPONENT (Thread of Execution)                   │
│     ├─ Executes code line by line                          │
│     ├─ One statement at a time                             │
│     └─ Accesses/modifies memory component                  │
│                                                             │
│  3. LEXICAL ENVIRONMENT (Advanced)                         │
│     ├─ Variable Environment                                │
│     ├─ + Reference to outer/parent lexical environment     │
│     └─ Used for scope chain & closures                     │
│                                                             │
│  4. THIS BINDING                                           │
│     └─ Value of 'this' keyword in current context          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Types of Execution Contexts:
1. Global Execution Context (GEC) - Created when script first runs
2. Function Execution Context (FEC) - Created when function is invoked
3. Eval Execution Context - Created inside eval() function (avoid using)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. VAR vs LET/CONST - THE REAL DIFFERENCE (MEMORY PERSPECTIVE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT: The difference is NOT about physical memory location (Stack vs Heap)
The difference is about WHERE they are stored WITHIN the Execution Context

Physical Memory Location depends on VALUE TYPE:
  • Primitives (number, string, boolean, etc.) → CALL STACK (for any keyword)
  • Objects/Arrays/Functions → HEAP (for any keyword)

But WITHIN the Execution Context, they are stored differently:

┌───────────────────────────────────────────────────────────────┐
│  EXECUTION CONTEXT INTERNALS                                  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Variable Environment (Function Environment Record)          │
│  ════════════════════════════════════════════════════════     │
│  • Contains var declarations                                 │
│  • Function-scoped                                           │
│  • Initialized to undefined during Memory Creation Phase     │
│  • Hoisted to function top                                   │
│                                                               │
│  Example:                                                     │
│  function demo() {                                            │
│    var x = 10;  ← Stored in Variable Environment             │
│  }                                                            │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Lexical Environment (Declarative Environment Record)        │
│  ═══════════════════════════════════════════════════════     │
│  • Contains let/const declarations                           │
│  • Block-scoped                                              │
│  • Uninitialized (TDZ) during Memory Creation Phase          │
│  • NOT accessible before declaration line                    │
│  • + Reference to outer environment (scope chain)            │
│                                                               │
│  Example:                                                     │
│  function demo() {                                            │
│    let y = 20;  ← Stored in Lexical Environment              │
│  }                                                            │
│                                                               │
└───────────────────────────────────────────────────────────────┘

DETAILED EXAMPLE:
*/

function scopeDemo() {
  console.log(a); // undefined (var is hoisted and initialized)
  // console.log(b); // ReferenceError (let is in TDZ)
  
  var a = 10;     // Goes to Variable Environment
  let b = 20;     // Goes to Lexical Environment
  const c = 30;   // Goes to Lexical Environment
  
  if (true) {
    var d = 40;   // Still in function's Variable Environment
    let e = 50;   // New block's Lexical Environment
  }
  
  console.log(d); // 40 (accessible - var is function-scoped)
  // console.log(e); // ReferenceError (not accessible - let is block-scoped)
}
scopeDemo();
/*
Memory Structure during scopeDemo() execution:

CALL STACK:
┌────────────────────────────────────────────────────────┐
│  scopeDemo() Execution Context                         │
│  ══════════════════════════════════════════════════    │
│                                                        │
│  Variable Environment (Function-scoped):              │
│  ┌──────────────────────────────────────────┐         │
│  │  a: 10                                    │         │
│  │  d: 40                                    │         │
│  └──────────────────────────────────────────┘         │
│                                                        │
│  Lexical Environment (Function level):                │
│  ┌──────────────────────────────────────────┐         │
│  │  b: 20                                    │         │
│  │  c: 30                                    │         │
│  │  outer: <Global Lexical Environment>     │         │
│  └──────────────────────────────────────────┘         │
│                                                        │
│  Lexical Environment (Block level - if statement):    │
│  ┌──────────────────────────────────────────┐         │
│  │  e: 50                                    │         │
│  │  outer: <Function Lexical Environment>   │         │
│  └──────────────────────────────────────────┘         │
│     ↑                                                  │
│     └─ This is destroyed when block ends              │
│                                                        │
└────────────────────────────────────────────────────────┘

KEY DIFFERENCES IN MEMORY CREATION PHASE:
═══════════════════════════════════════════

var declarations:
  Phase 1: Memory allocated AND initialized to undefined
  Phase 2: Assigned actual value
  Result: Can be accessed before declaration (returns undefined)

let/const declarations:
  Phase 1: Memory allocated BUT NOT initialized (marked <uninitialized>)
  Phase 2: Initialized and assigned value at declaration line
  Result: Cannot be accessed before declaration (ReferenceError - TDZ)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4A. CHROME DEVTOOLS SCOPE PANEL - THEORY vs PRACTICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT: Chrome DevTools representation ≠ ECMAScript Spec's theoretical model

The ECMAScript spec defines "Variable Environment" and "Lexical Environment" as
theoretical constructs. Chrome DevTools shows a PRACTICAL representation that's
easier to debug, not the internal implementation details.

CHROME DEVTOOLS SCOPE SECTIONS:
════════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────┐
│  1. BLOCK SCOPE                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  What it shows:                                                         │
│    • let/const variables declared in CURRENT BLOCK (if, for, while, {})│
│    • Only appears when debugger is inside a block                       │
│    • Disappears when block scope ends                                   │
│                                                                         │
│  Maps to: Lexical Environment (Block-level Declarative Record)         │
│                                                                         │
│  Example:                                                               │
│    if (true) {                                                          │
│      let e = 50;  ← Shows in "Block" scope in DevTools                 │
│    }                                                                     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  2. LOCAL SCOPE                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  What it shows:                                                         │
│    • ALL variables in current function (var, let, const, parameters)   │
│    • Function-level variables regardless of declaration keyword        │
│    • 'this', 'arguments' (in non-arrow functions)                      │
│                                                                         │
│  Maps to: Combined view of:                                            │
│    • Variable Environment (var declarations)                           │
│    • Lexical Environment (let/const at function level)                 │
│    • Function Environment Record                                       │
│                                                                         │
│  WHY ALL VARIABLES APPEAR HERE:                                        │
│    DevTools merges Variable Environment and Lexical Environment        │
│    into one "Local" view for developer convenience. Internally,        │
│    they're still separate, but showing them separately would be        │
│    confusing for debugging.                                            │
│                                                                         │
│  Example:                                                               │
│    function demo() {                                                    │
│      var a = 10;   ← Shows in "Local"                                  │
│      let b = 20;   ← Shows in "Local"                                  │
│      const c = 30; ← Shows in "Local"                                  │
│    }                                                                     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  3. SCRIPT SCOPE                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  What it shows:                                                         │
│    • GLOBAL let/const declarations                                     │
│    • Top-level let/const in script/module scope                        │
│    • NOT var declarations (those go to Global)                         │
│                                                                         │
│  Maps to: Global Lexical Environment (Declarative Record)              │
│                                                                         │
│  WHY SEPARATE FROM GLOBAL:                                             │
│    In modern JS, global let/const are NOT properties of window/global  │
│    object. They exist in a separate global lexical environment.        │
│    DevTools separates them to show this distinction.                   │
│                                                                         │
│  Example:                                                               │
│    let globalLet = 100;   ← Shows in "Script" scope                    │
│    const globalConst = 200; ← Shows in "Script" scope                  │
│    var globalVar = 300;   ← Shows in "Global" scope (window.globalVar) │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  4. GLOBAL SCOPE                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  What it shows:                                                         │
│    • Global var declarations                                           │
│    • window object properties (browser)                                │
│    • global object properties (Node.js)                                │
│    • Built-in objects (Array, Object, Math, etc.)                      │
│                                                                         │
│  Maps to: Global Object (window in browser, global in Node.js)        │
│           + Global Variable Environment                                │
│                                                                         │
│  Example:                                                               │
│    var globalVar = 100;  ← Shows in "Global" (window.globalVar)        │
│    window.customProp = 200; ← Shows in "Global"                        │
└─────────────────────────────────────────────────────────────────────────┘

COMPLETE MAPPING: ECMAScript Spec → Chrome DevTools
════════════════════════════════════════════════════════════════════════════════

ECMAScript Theoretical Model:
┌──────────────────────────────────────────┐
│  Execution Context                       │
│  ├─ Variable Environment                 │
│  │  └─ var declarations (function-level) │
│  ├─ Lexical Environment                  │
│  │  ├─ let/const (function-level)        │
│  │  ├─ let/const (block-level)           │
│  │  └─ outer reference (scope chain)     │
│  └─ this binding                         │
└──────────────────────────────────────────┘
          ↓
          ↓ (How Chrome DevTools displays it)
          ↓
Chrome DevTools Practical View:
┌──────────────────────────────────────────┐
│  Block   ← Lexical Env (block-level)    │
│  Local   ← Var Env + Lexical Env        │
│           (function-level, merged)       │
│  Script  ← Global Lexical Env           │
│  Global  ← Global Object + Global Var   │
└──────────────────────────────────────────┘

DETAILED EXAMPLE WITH DEVTOOLS MAPPING:
*/

function scopeDemo() {
  console.log(a); // undefined (var is hoisted and initialized)
  // console.log(b); // ReferenceError (let is in TDZ)
  
  var a = 10;     // DevTools: Shows in "Local" (Var Env internally)
  let b = 20;     // DevTools: Shows in "Local" (Lexical Env internally)
  const c = 30;   // DevTools: Shows in "Local" (Lexical Env internally)
  
  if (true) {
    var d = 40;   // DevTools: Shows in "Local" (Var Env - function-scoped)
    let e = 50;   // DevTools: Shows in "Block" (Lexical Env - block-scoped)
  }
  
  console.log(d); // 40 (accessible - var is function-scoped)
  // console.log(e); // ReferenceError (not accessible - let is block-scoped)
}

/*
CHROME DEVTOOLS SCOPE PANEL DURING scopeDemo() EXECUTION:
═══════════════════════════════════════════════════════════

When debugger hits line 202 (let e = 50):

┌──────────────────────────────────────────────────────────────┐
│  BLOCK SCOPE                                                 │
├──────────────────────────────────────────────────────────────┤
│  e: 50                                                       │
│                                                              │
│  Why: let e is block-scoped (inside if block)              │
│  Internal: Lexical Environment (Block-level Record)         │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  LOCAL SCOPE                                                 │
├──────────────────────────────────────────────────────────────┤
│  a: 10                                                       │
│  b: 20                                                       │
│  c: 30                                                       │
│  d: 40                                                       │
│  this: Window {...}                                          │
│                                                              │
│  Why: All function-level variables (var, let, const)        │
│  Internal: Variable Environment (a, d) +                    │
│            Lexical Environment (b, c) - MERGED VIEW         │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  SCRIPT SCOPE                                                │
├──────────────────────────────────────────────────────────────┤
│  globalLet: 200                                              │
│  globalObj: {value: 300}                                     │
│                                                              │
│  Why: Global let/const declarations                          │
│  Internal: Global Lexical Environment                       │
│  Note: NOT on window object                                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  GLOBAL SCOPE                                                │
├──────────────────────────────────────────────────────────────┤
│  globalVar: 100                                              │
│  window: Window {...}                                        │
│  document: Document {...}                                    │
│  console: Console {...}                                      │
│  ... (all built-in objects)                                  │
│                                                              │
│  Why: Global var + window properties                         │
│  Internal: Global Object (window)                           │
│  Note: window.globalVar === 100 (accessible as property)    │
└──────────────────────────────────────────────────────────────┘

KEY INSIGHTS:
═════════════════════════════════════════════════════════════════

1. Why all variables appear in LOCAL:
   DevTools merges Variable Environment and Lexical Environment for
   function-level variables because:
   - It's more practical for debugging
   - Developers care about "what variables are accessible" not internal storage
   - Showing them separately would be confusing

2. Why BLOCK is separate:
   Block-scoped variables (let/const in blocks) have temporary lifetime
   and different accessibility rules, so DevTools separates them to show
   they're only accessible within that block.

3. Why SCRIPT exists:
   Global let/const DON'T pollute global object (window). They exist in
   a separate namespace. DevTools separates them to emphasize this.
   
   Example:
   let globalLet = 100;     // NOT a window property
   var globalVar = 200;     // IS a window property
   console.log(window.globalLet);  // undefined
   console.log(window.globalVar);  // 200

4. Internal vs Display:
   Internally, JavaScript engines DO maintain separate Variable and Lexical
   Environments as per ECMAScript spec. DevTools just displays them in a
   more developer-friendly way.

PROOF OF INTERNAL SEPARATION:
*/

// This code proves var and let are stored differently internally:
function proofOfSeparation() {
  console.log(varTest);  // undefined (var is initialized)
  // console.log(letTest);  // ReferenceError (let is not initialized)
  
  var varTest = "var";   // Variable Environment
  let letTest = "let";   // Lexical Environment
  
  // But in DevTools "Local", both appear together for convenience
}

// This proves global let/const are NOT on window:
let globalLetTest = "script scope";
var globalVarTest = "global scope";

console.log(window.globalLetTest);  // undefined (not on window)
console.log(window.globalVarTest);  // "global scope" (on window)

/*
SCOPE CHAIN IN DEVTOOLS:
═════════════════════════════════════════════════════════════════

The order matters! Scope chain resolution:
Block → Local → Script → Global

When JavaScript looks for a variable:
1. Check Block scope (if inside a block)
2. Check Local scope (function scope)
3. Check Script scope (global let/const)
4. Check Global scope (global var + window properties)

This matches the internal Lexical Environment chain:
Current LE → Outer LE → ... → Global LE → null

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. PRACTICAL EXAMPLE - WHERE EVERYTHING LIVES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

var globalVar = 100;                    // Primitive → CALL STACK
let globalLet = 200;                    // Primitive → CALL STACK
const globalObj = { value: 300 };       // Object → HEAP, reference → STACK

function process() {
  var localVar = 10;                    // Primitive → CALL STACK
  let localLet = 20;                    // Primitive → CALL STACK
  const localArr = [1, 2, 3];           // Array → HEAP, reference → STACK
  
  function inner() {
    let innerLet = 30;                  // Primitive → CALL STACK
    const innerObj = { x: 40 };         // Object → HEAP, reference → STACK
  }
  inner();
}
process();
/*
Complete Memory Layout:

CALL STACK:                                    MEMORY HEAP:
┌───────────────────────────────────┐          ┌──────────────────────┐
│  Global Execution Context         │          │                      │
│  ───────────────────────────────  │          │  { value: 300 }      │
│  Variable Environment:            │          │         ↑            │
│    globalVar: 100                 │          │         │            │
│  Lexical Environment:             │          │         │            │
│    globalLet: 200                 │          │         │            │
│    globalObj: 0x101 ──────────────┼──────────┼─────────┘            │
│    outer: null                    │          │                      │
└───────────────────────────────────┘          │  [1, 2, 3]           │
                                               │      ↑               │
When process() is called:                      │      │               │
┌───────────────────────────────────┐          │      │               │
│  process() Execution Context      │          │      │               │
│  ───────────────────────────────  │          │      │               │
│  Variable Environment:            │          │      │               │
│    localVar: 10                   │          │      │               │
│  Lexical Environment:             │          │      │               │
│    localLet: 20                   │          │      │               │
│    localArr: 0x102 ───────────────┼──────────┼──────┘               │
│    outer: <Global LE>             │          │                      │
└───────────────────────────────────┘          │  { x: 40 }           │
                                               │      ↑               │
When inner() is called:                        │      │               │
┌───────────────────────────────────┐          │      │               │
│  inner() Execution Context        │          │      │               │
│  ───────────────────────────────  │          │      │               │
│  Lexical Environment:             │          │      │               │
│    innerLet: 30                   │          │      │               │
│    innerObj: 0x103 ───────────────┼──────────┼──────┘               │
│    outer: <process() LE>          │          │                      │
└───────────────────────────────────┘          └──────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. VARIABLE ENVIRONMENT vs LEXICAL ENVIRONMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VARIABLE ENVIRONMENT:
  • Component of Execution Context
  • Stores variable and function bindings (mainly var and function declarations)
  • Contains actual memory allocations
  • Simple storage mechanism
  • Function-scoped

LEXICAL ENVIRONMENT:
  • Variable Environment + Reference to outer environment
  • Stores let/const bindings (in modern JS)
  • Defines scope and accessibility
  • Creates the scope chain
  • Critical for closures
  • Block-scoped (for let/const)

  Formula: Lexical Environment = Variable Environment + [[Scope]]

LEXICAL ENVIRONMENT STRUCTURE:
  {
    EnvironmentRecord: {
      // Stores actual variables and functions
      Type: "Declarative" | "Object" | "Global"
    },
    outer: <reference to parent lexical environment>
  }

IMPORTANT NOTE:
In modern JavaScript (ES6+), the distinction is more nuanced:
- Global/Function Environment Record (contains var declarations)
- Declarative Environment Record (contains let/const declarations)
- Both are part of the overall Lexical Environment structure
- The outer reference links them for scope chain

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. TWO PHASES OF EXECUTION CONTEXT CREATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every Execution Context is created in TWO phases:

┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: MEMORY CREATION PHASE (Hoisting Happens Here)    │
├─────────────────────────────────────────────────────────────┤
│  • JavaScript engine scans the entire code                  │
│  • Allocates memory for variables and functions             │
│  • Variables (var): Set to 'undefined'                      │
│  • Variables (let/const): Allocated but <uninitialized>     │
│  • Functions: Store entire function code                    │
│  • This creates "hoisting" behavior                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: CODE EXECUTION PHASE                              │
├─────────────────────────────────────────────────────────────┤
│  • Executes code line by line, top to bottom                │
│  • Variables get their actual values assigned               │
│  • Functions are invoked/executed                           │
│  • New Execution Contexts created for function calls        │
│  • Return statements send values back                       │
└─────────────────────────────────────────────────────────────┘

Example showing the difference:
*/

console.log(varExample);  // undefined (var is initialized in Phase 1)
// console.log(letExample);  // ReferenceError (let is uninitialized in Phase 1)

var varExample = "I'm hoisted and initialized";
let letExample = "I'm hoisted but not initialized (TDZ)";

/*
Phase 1 - Memory Creation:
  Variable Environment:
    varExample: undefined  ← Initialized to undefined
  
  Lexical Environment:
    letExample: <uninitialized>  ← Memory allocated but NOT initialized

Phase 2 - Code Execution:
  Line 1: console.log(varExample) → prints "undefined"
  Line 2: console.log(letExample) → ReferenceError (accessing uninitialized)
  Line 4: varExample = "I'm hoisted and initialized"
  Line 5: letExample = "I'm hoisted but not initialized (TDZ)"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. CALL STACK - THE EXECUTION CONTEXT MANAGER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Call Stack is a LIFO (Last In, First Out) data structure that:
  • Manages execution contexts
  • Tracks where we are in code execution
  • Handles function invocation and return
  • Maintains order of execution

Other Names:
  • Execution Context Stack
  • Program Stack
  • Control Stack
  • Runtime Stack
  • Machine Stack

Call Stack Properties:
  • Size Limit: ~1-2 MB (browser dependent)
  • Max Frames: ~10,000-50,000 execution contexts (varies)
  • Stack Overflow: Occurs with infinite recursion
  • Synchronous: Processes one thing at a time
  • LIFO: Last context in is first context out

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. MEMORY MANAGEMENT IN JAVASCRIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEMORY LIFECYCLE:
1. Allocation: Memory is allocated when variables/functions are declared
2. Usage: Reading and writing to allocated memory
3. Release: Memory is freed when no longer needed (Garbage Collection)

MEMORY STORAGE:
  • Stack Memory (Call Stack): Stores primitive values and references
    - Fixed size (~1-2 MB)
    - Fast access (LIFO operations)
    - Automatic memory management
    - Stores execution contexts
    - Cleaned up automatically when function returns

  • Heap Memory: Stores objects and functions
    - Dynamic size (can grow as needed)
    - Slower access (unstructured)
    - Managed by garbage collector
    - Can grow/shrink during runtime
    - Objects persist until GC removes them

GARBAGE COLLECTION:
  • Algorithm: Mark-and-Sweep (modern browsers)
  • Process:
    1. Mark: GC marks all reachable objects from roots
    2. Sweep: Removes unmarked (unreachable) objects
  • Roots: Global variables, currently executing functions, call stack
  • Automatic: Developer doesn't control when GC runs
  • Additional: Generational GC for optimization (V8)

MEMORY LEAKS TO AVOID:
  1. Unintended global variables
  2. Forgotten timers/callbacks
  3. Closures retaining large objects
  4. DOM references not cleaned up
  5. Circular references (mostly handled by modern GC)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. COMPLETE EXAMPLE WALKTHROUGH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

var n = 2;
function square(num) {
  var ans = num * num;
  return ans;
}
var square2 = square(n);
var square4 = square(4);

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP-BY-STEP EXECUTION BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╔═══════════════════════════════════════════════════════════════════════╗
║  STEP 1: GLOBAL EXECUTION CONTEXT (GEC) CREATION                      ║
╚═══════════════════════════════════════════════════════════════════════╝

CALL STACK:
┌──────────────────────┐
│  Global EC           │ ← Created and pushed
└──────────────────────┘

─────────────────────────────────────────────────────────────────────────
PHASE 1 - MEMORY CREATION (Hoisting)
─────────────────────────────────────────────────────────────────────────

Memory Component (Variable Environment):
┌────────────────────────────────────────────────────────────┐
│  n:       undefined                                        │
│  square:  function square(num) { ... }  [entire code]     │
│  square2: undefined                                        │
│  square4: undefined                                        │
└────────────────────────────────────────────────────────────┘

Lexical Environment:
{
  environmentRecord: { n, square, square2, square4 },
  outer: null  // Global has no outer environment
}

─────────────────────────────────────────────────────────────────────────
PHASE 2 - CODE EXECUTION
─────────────────────────────────────────────────────────────────────────

Line 1: var n = 2;
  ✓ Memory already allocated (undefined → 2)
  Memory: { n: 2, square: fn, square2: undefined, square4: undefined }

Line 2-5: function square(num) { ... }
  ✓ Already in memory from Phase 1, skip

Line 6: var square2 = square(n);
  ✓ Function invocation detected: square(n) where n = 2
  ✓ New Function Execution Context created for square(2)
  ✓ Control shifts to new EC

╔═══════════════════════════════════════════════════════════════════════╗
║  STEP 2: FUNCTION EXECUTION CONTEXT for square(2)                     ║
╚═══════════════════════════════════════════════════════════════════════╝

CALL STACK:
┌──────────────────────┐
│  square(2) EC        │ ← New EC pushed on top
├──────────────────────┤
│  Global EC           │
└──────────────────────┘

─────────────────────────────────────────────────────────────────────────
PHASE 1 - MEMORY CREATION
─────────────────────────────────────────────────────────────────────────

Memory Component:
┌────────────────────────────────────────┐
│  num: undefined  (parameter)           │
│  ans: undefined                        │
└────────────────────────────────────────┘

Lexical Environment:
{
  environmentRecord: { num, ans },
  outer: <Global Lexical Environment>  // Reference to outer scope
}

Arguments Object: { 0: 2, length: 1 }
this binding: global object (or undefined in strict mode)

─────────────────────────────────────────────────────────────────────────
PHASE 2 - CODE EXECUTION
─────────────────────────────────────────────────────────────────────────

Parameters assigned:
  num = 2  (argument passed from square(n))
  Memory: { num: 2, ans: undefined }

Line 3: var ans = num * num;
  ans = 2 * 2 = 4
  Memory: { num: 2, ans: 4 }

Line 4: return ans;
  ✓ Returns value 4 to calling context
  ✓ This EC is marked for destruction
  ✓ Popped from call stack
  ✓ Memory is freed (both Stack and Heap references)

CALL STACK (After return):
┌──────────────────────┐
│  Global EC           │ ← Control returns here
└──────────────────────┘

─────────────────────────────────────────────────────────────────────────
BACK TO GLOBAL EC - Line 6 continued
─────────────────────────────────────────────────────────────────────────

  square2 = 4  (returned value assigned)
  Memory: { n: 2, square: fn, square2: 4, square4: undefined }

╔═══════════════════════════════════════════════════════════════════════╗
║  STEP 3: FUNCTION EXECUTION CONTEXT for square(4)                     ║
╚═══════════════════════════════════════════════════════════════════════╝

Line 7: var square4 = square(4);
  ✓ Function invocation: square(4)
  ✓ New Function Execution Context created

CALL STACK:
┌──────────────────────┐
│  square(4) EC        │ ← New EC pushed
├──────────────────────┤
│  Global EC           │
└──────────────────────┘

─────────────────────────────────────────────────────────────────────────
PHASE 1 - MEMORY CREATION
─────────────────────────────────────────────────────────────────────────

Memory: { num: undefined, ans: undefined }

─────────────────────────────────────────────────────────────────────────
PHASE 2 - CODE EXECUTION
─────────────────────────────────────────────────────────────────────────

  num = 4
  ans = 4 * 4 = 16
  return 16
  ✓ EC destroyed and popped from stack

CALL STACK (After return):
┌──────────────────────┐
│  Global EC           │
└──────────────────────┘

─────────────────────────────────────────────────────────────────────────
BACK TO GLOBAL EC - Line 7 continued
─────────────────────────────────────────────────────────────────────────

  square4 = 16  (returned value assigned)
  Memory: { n: 2, square: fn, square2: 4, square4: 16 }

╔═══════════════════════════════════════════════════════════════════════╗
║  STEP 4: PROGRAM COMPLETION                                           ║
╚═══════════════════════════════════════════════════════════════════════╝

  ✓ All code executed
  ✓ Global EC is popped from call stack
  ✓ Call stack is now empty
  ✓ Program terminates

CALL STACK:
(Empty)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. VISUAL TIMELINE OF CALL STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Time →

t0: Program starts
    ┌──────────────┐
    │  Global EC   │
    └──────────────┘

t1: square(2) called
    ┌──────────────┐
    │  square(2)   │
    ├──────────────┤
    │  Global EC   │
    └──────────────┘

t2: square(2) returns
    ┌──────────────┐
    │  Global EC   │
    └──────────────┘

t3: square(4) called
    ┌──────────────┐
    │  square(4)   │
    ├──────────────┤
    │  Global EC   │
    └──────────────┘

t4: square(4) returns
    ┌──────────────┐
    │  Global EC   │
    └──────────────┘

t5: Program ends
    (empty)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. ADVANCED CONCEPTS FOR SENIOR INTERVIEWS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. SCOPE CHAIN & LEXICAL SCOPING
─────────────────────────────────────────────────────────────────────────
Scope chain is formed through lexical environment references.
Each execution context has a reference to its outer lexical environment.
This chain is used for variable resolution.
*/

function outer() {
  var a = 10;
  function inner() {
    var b = 20;
    console.log(a + b); // Can access 'a' via scope chain
  }
  inner();
}
// outer();

/*
Lexical Environment Chain:
inner() → outer() → Global

When 'a' is accessed in inner():
1. Check inner's environment: Not found
2. Check outer's environment: Found! (a = 10)
3. Use the value

─────────────────────────────────────────────────────────────────────────
B. CLOSURES - The Result of Lexical Scoping
─────────────────────────────────────────────────────────────────────────
A closure is when a function "remembers" its lexical environment even when
executed outside its original scope.
*/

function createCounter() {
  var count = 0; // This variable persists due to closure
  return function() {
    count++;
    return count;
  };
}
var counter = createCounter();
// counter(); // 1
// counter(); // 2
// The inner function maintains reference to 'count' even though
// createCounter() execution context is gone from call stack

/*
Memory Perspective:
- createCounter's execution context is popped from call stack
- But its Lexical Environment is NOT garbage collected
- Why? The returned function still references it (closure)
- This Lexical Environment is stored in HEAP memory, not Stack
- The function maintains a [[Scope]] property pointing to it

─────────────────────────────────────────────────────────────────────────
C. HOISTING - The Result of Memory Creation Phase
─────────────────────────────────────────────────────────────────────────
*/

console.log(x); // undefined (not ReferenceError)
var x = 5;
// Equivalent to:
// var x; (memory creation)
// console.log(x); (execution - x is undefined)
// x = 5; (assignment)

// greet(); // Works! Function is hoisted with full code
function greet() {
  console.log("Hello");
}

// sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi");
};
// 'sayHi' is hoisted as variable (undefined), not as function

/*
─────────────────────────────────────────────────────────────────────────
D. TEMPORAL DEAD ZONE (TDZ) - let/const Behavior
─────────────────────────────────────────────────────────────────────────
let and const are hoisted but remain uninitialized until declaration line.
*/

// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
// TDZ exists from start of block until declaration line

/*
Memory Creation for let/const:
- Variables are allocated in memory (Lexical Environment)
- But marked as <uninitialized>
- Not accessible until code execution reaches declaration
- Accessing them in TDZ throws ReferenceError

─────────────────────────────────────────────────────────────────────────
E. THIS BINDING IN EXECUTION CONTEXT
─────────────────────────────────────────────────────────────────────────
Every execution context has a 'this' binding determined at creation time.

Rules:
1. Global Context: 'this' → global object (window in browser)
2. Function Context (normal call): 'this' → global object (undefined in strict)
3. Method Call: 'this' → object calling the method
4. Constructor: 'this' → newly created object
5. Arrow Functions: 'this' → lexically inherited from outer context
6. Explicit Binding: call/apply/bind can set 'this'
*/

const obj = {
  name: "Test",
  regularFunc: function() {
    console.log(this); // 'this' = obj
  },
  arrowFunc: () => {
    console.log(this); // 'this' = lexical (global/undefined)
  }
};

/*
─────────────────────────────────────────────────────────────────────────
F. EXECUTION CONTEXT IN DIFFERENT SCENARIOS
─────────────────────────────────────────────────────────────────────────

1. IIFE (Immediately Invoked Function Expression):
*/
(function() {
  var temp = "I'm isolated";
  // Creates its own execution context
  // Variables don't pollute global scope
})();

/*
2. Recursive Functions:
Each recursion creates new execution context on call stack.
Stack overflow occurs when recursion is too deep.
*/

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
// factorial(5) creates 6 execution contexts on stack

/*
3. Async Operations (Brief mention):
setTimeout, Promises, async/await don't block the call stack.
They use Event Loop, Callback Queue, and Microtask Queue.
The call stack must be empty before callbacks execute.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
13. KEY INTERVIEW QUESTIONS & ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1: What is an Execution Context?
A: A container/wrapper that holds all the information needed to execute code,
   including variables, functions, scope chain, and 'this' binding.
   It has two main components: Memory (Variable Environment) and Code
   (Thread of Execution).

Q2: Where is the Execution Context stored in memory?
A: The EC structure itself is stored in the CALL STACK. The variables it
   contains are stored based on their type: primitives in STACK, objects
   in HEAP (with references in STACK).

Q3: Difference between Variable Environment and Lexical Environment?
A: Variable Environment stores variable and function bindings (mainly var).
   Lexical Environment = Variable Environment + reference to outer environment.
   Lexical Environment is used for scope resolution and closures. In modern
   JS, let/const are stored in Lexical Environment's block scope.

Q4: Where are var, let, and const stored differently?
A: PHYSICALLY, they're in the same place (primitives in Stack, objects in Heap).
   LOGICALLY within the EC:
   - var: Variable Environment (function-scoped, initialized to undefined)
   - let/const: Lexical Environment (block-scoped, uninitialized in TDZ)
   This difference affects scope, hoisting behavior, and accessibility.

Q5: What's the difference between Call Stack and Stack Memory?
A: They're related but different:
   - Call Stack: LIFO structure that manages execution contexts
   - Stack Memory: Physical memory region where primitives and references
     are stored. The Call Stack uses Stack Memory for storage.

Q6: Explain the two phases of execution context creation.
A: Phase 1 (Memory Creation): JavaScript allocates memory for all variables
   (var → undefined, let/const → uninitialized) and stores complete function
   code. This creates hoisting.
   Phase 2 (Code Execution): JavaScript executes code line by line,
   assigns actual values, and creates new execution contexts for function calls.

Q7: What is the Call Stack and why is JavaScript single-threaded?
A: Call Stack is a LIFO data structure that manages execution contexts.
   JavaScript has only ONE call stack, meaning it can execute only one thing
   at a time, making it single-threaded.

Q8: How does JavaScript manage memory?
A: Memory is allocated in two places:
   - Stack (Call Stack): For primitives and references (fast, fixed size ~1-2MB)
   - Heap: For objects and functions (dynamic size, managed by GC)
   Garbage Collection (Mark-and-Sweep) automatically frees unreferenced memory.

Q9: What happens when a function returns?
A: 1. Return value is passed back to calling context
   2. Current execution context is popped from call stack
   3. Control returns to previous execution context
   4. Stack memory is freed automatically
   5. Heap objects are freed IF no references exist (GC handles this)

Q10: Explain hoisting in terms of execution context.
A: Hoisting is the result of Memory Creation Phase. Variables and functions
   are allocated memory before code execution:
   - var: undefined (accessible before declaration)
   - let/const: <uninitialized> in TDZ (not accessible before declaration)
   - functions: complete code (fully accessible)

Q11: What is the relationship between scope chain and lexical environment?
A: Scope chain is formed by linking lexical environments through their
   'outer' references. When resolving variables, JavaScript traverses
   this chain from inner to outer scopes until found or reaches global.

Q12: How do closures relate to execution context and memory?
A: When a function is returned/passed, it maintains a [[Scope]] reference to
   its lexical environment. Even when the outer function's execution context
   is popped from call stack, the lexical environment persists in HEAP memory
   due to this reference, creating a closure. This prevents GC from cleaning it.

Q13: What causes stack overflow?
A: Excessive recursion without base case or too deep recursion exceeds
   call stack size limit (~1-2MB or 10K-50K frames), causing stack overflow.
   Each recursive call adds a new EC to the stack without removing previous ones.

Q14: Why can't we access let/const before declaration but can access var?
A: In Memory Creation Phase:
   - var is allocated AND initialized to undefined (in Variable Environment)
   - let/const are allocated but NOT initialized (in Lexical Environment, TDZ)
   This is a deliberate design choice in ES6 to catch errors early.

Q15: Explain Chrome DevTools Scope panel (Block, Local, Script, Global).
A: Chrome DevTools shows a PRACTICAL view, not the spec's internal structure:
   - Block: let/const in current block (Lexical Env - block level)
   - Local: ALL function-level variables (Variable Env + Lexical Env merged)
   - Script: Global let/const (NOT on window object)
   - Global: Global var + window properties
   
   Why all variables appear in LOCAL:
   DevTools merges Variable and Lexical Environments for convenience. Internally,
   they're still separate (var in Var Env, let/const in Lexical Env), but 
   DevTools combines them because developers care about "what's accessible" not
   "where it's stored internally".
   
   Key: global let ≠ window property, but global var = window property.
   DevTools separates "Script" scope to show this distinction.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
14. PERFORMANCE IMPLICATIONS & BEST PRACTICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Avoid Deep Recursion:
   - Use iteration when possible
   - Implement tail call optimization patterns (though not widely supported)
   - Consider trampolining for deep recursion

2. Minimize Closures Over Large Data:
   - Closures keep entire lexical environment alive in heap
   - Can prevent garbage collection
   - Store only what's needed, not entire objects

3. Manage Memory:
   - Clear event listeners when done
   - Null out large objects when finished
   - Avoid unintended global variables
   - Use WeakMap/WeakSet for cache that can be GC'd

4. Understand Scope:
   - Block scope (let/const) vs Function scope (var)
   - Use block scope to limit variable lifetime
   - Reduces memory footprint
   - Prefer const > let > var

5. Call Stack Awareness:
   - Monitor recursion depth
   - Use async operations for long-running tasks
   - Prevent blocking the main thread
   - Break up synchronous work with setImmediate/setTimeout

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15. SUMMARY DIAGRAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    JavaScript Execution Model
                            │
                            ▼
            ┌───────────────────────────────┐
            │     JavaScript Engine         │
            └───────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   Call Stack          Memory Heap        Garbage Collector
   (Stack Memory)      (Dynamic Memory)   (Mark & Sweep)
        │                   │
        │                   │
   Stores:             Stores:
   - ECs               - Objects
   - Primitives        - Arrays
   - References        - Functions
                       - Closures' environments
        │
        ▼
   ┌─────────────┐
   │  Global EC  │ ← Always at bottom
   └─────────────┘
        │
   Function ECs pushed/popped here (LIFO)
        │
   Each EC has:
   ├─ Variable Environment (var, function-scoped)
   ├─ Thread of Execution (Code execution)
   ├─ Lexical Environment (let/const, block-scoped + scope chain)
   └─ this binding

   Created in 2 Phases:
   1. Memory Creation (Hoisting)
      - var → undefined
      - let/const → <uninitialized> (TDZ)
      - functions → complete code
   2. Code Execution
      - Assigns values
      - Creates new ECs for function calls

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 KEY TAKEAWAYS FOR INTERVIEWS:

1. Execution Context lives in CALL STACK (Stack Memory)
2. Primitives → Stack, Objects → Heap (regardless of var/let/const)
3. var vs let/const difference is SCOPE and INITIALIZATION, not physical memory
4. Call Stack is LIFO structure managing ECs (~1-2 MB size)
5. Heap is dynamic memory for objects, managed by Garbage Collector
6. Closures keep Lexical Environments alive in Heap even after EC is popped
7. Hoisting = Memory Creation Phase (Phase 1)
8. TDZ = Time between hoisting and initialization for let/const
9. Chrome DevTools "Local" merges Variable & Lexical Environments for convenience
10. Scope chain in DevTools: Block → Local → Script → Global

🎯 Master these concepts and you'll ace any JavaScript internals question
   in senior-level interviews!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
