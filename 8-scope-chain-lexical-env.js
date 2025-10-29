//* IMPORTANT interview topic

function a() {
  var b = 10;
  c();
  function c() {
    console.log(b);
  }
}

a();

//* Lexical environment for a EC
//~ Local variable environment + Ref To Lexical env of parent EC (lexical parent -> where that func is defined)

//? Eg - Lexical of c -> Local of c + Lexical of a
//? Eg - Lexical of a -> Local of a + Lexical of global
//? Eg - Lexical of global -> Local of global + null

//* Chain of Lexical Environments, from inner to outer => SCOPE CHAIN

//? Eg - Scope Chain for  c

//  1. Local
//      ->this
//  2. Closure ( a )
//      ->b : 10
//  3. Global
//      ->{....}

/*
Any time you hear lexical, think definition.
So, the lexical scope of a car, variable, phone, function, 
or swimsuit refers to its definition region.
*/

//? --------------------------------29/10/2025--------------------------------

/*
========================================================================================================
                    SCOPE CHAIN PROCESS IN JAVASCRIPT - COMPLETE EXPLANATION
========================================================================================================

PHASE 1: MEMORY CREATION PHASE (Setup)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
During this phase, JavaScript engine:
1. Creates Execution Context
2. Sets up [[Environment]] internal slot for functions
3. [[Environment]] is LEXICALLY DETERMINED - it points to where the function was DEFINED, not called
4. This happens BEFORE any code execution
5. This linkage is IMMUTABLE - once set, it never changes

PHASE 2: EXECUTION PHASE (Runtime)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
During this phase, JavaScript engine:
1. Creates Lexical Environment for each execution context
2. Lexical Environment = Variable Environment + outer reference
3. outer reference uses the [[Environment]] internal slot to link to parent
4. When a variable is accessed, JS traverses this chain (SCOPE CHAIN)

KEY DIFFERENCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[[Environment]] = STATIC blueprint set during function creation (WHERE function is written)
Lexical Environment = DYNAMIC runtime structure created during execution (WHEN function runs)

The [[Environment]] is the TEMPLATE that determines how Lexical Environments will be linked!
========================================================================================================
*/

//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!                              EXAMPLE 1: BASIC SCOPE CHAIN
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

var globalVar = "I'm global";

function outer() {
  var outerVar = "I'm in outer";
  
  function inner() {
    var innerVar = "I'm in inner";
    console.log(innerVar);   // Found in inner's own scope
    console.log(outerVar);   // Found in outer's scope (via scope chain)
    console.log(globalVar);  // Found in global scope (via scope chain)
  }
  
  inner();
}

// outer();

/*
MEMORY CREATION PHASE - [[Environment]] LINKAGE SETUP:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: Global Execution Context Created
┌─────────────────────────────────────────────────────┐
│        GLOBAL EXECUTION CONTEXT (GEC)               │
│                                                     │
│  Memory Component (Variable Environment):          │
│  ┌──────────────────────────────────────────┐     │
│  │  globalVar: undefined (hoisted)          │     │
│  │  outer: function object ──┐              │     │
│  └────────────────────────────│──────────────┘     │
│                                │                    │
│  [[Environment]] setup:        │                    │
│  outer.[[Environment]] ────────┘                    │
│  (Points to Global Scope - where it's defined)     │
└─────────────────────────────────────────────────────┘

Step 2: When outer() is parsed, inner function is encountered
┌────────────────────────────────────────────────────┐
│         OUTER FUNCTION OBJECT                      │
│                                                    │
│  During parsing of outer function body:           │
│  ┌─────────────────────────────────────────┐     │
│  │  inner: function object ──┐             │     │
│  └───────────────────────────│─────────────┘     │
│                               │                   │
│  [[Environment]] setup:       │                   │
│  inner.[[Environment]] ───────┘                   │
│  (Points to outer's scope - where it's defined)   │
└────────────────────────────────────────────────────┘

⚠️  IMPORTANT: At this point, NO EXECUTION has happened!
                [[Environment]] is just a BLUEPRINT for future linkages!


EXECUTION PHASE - LEXICAL ENVIRONMENT FORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: Global Code Execution Starts
┌─────────────────────────────────────────────────────────────┐
│        GLOBAL EXECUTION CONTEXT                             │
│                                                             │
│  Lexical Environment:                                       │
│  ┌──────────────────────────────────────────────────┐     │
│  │  Environment Record:                              │     │
│  │    globalVar: "I'm global"  (initialized now)    │     │
│  │    outer: <function>                              │     │
│  │                                                   │     │
│  │  outer: null (no parent scope)                   │     │
│  └──────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘

Step 2: outer() is CALLED - New Execution Context Created
┌─────────────────────────────────────────────────────────────┐
│        OUTER EXECUTION CONTEXT                              │
│                                                             │
│  Lexical Environment:                                       │
│  ┌──────────────────────────────────────────────────┐     │
│  │  Environment Record:                              │     │
│  │    outerVar: "I'm in outer"                      │     │
│  │    inner: <function>                              │     │
│  │                                                   │     │
│  │  outer: ───────────┐  (Uses outer.[[Environment]])│     │
│  └────────────────────│──────────────────────────────┘     │
│                       │                                     │
│                       ▼                                     │
│              Points to Global Lexical Environment          │
└─────────────────────────────────────────────────────────────┘

Step 3: inner() is CALLED - New Execution Context Created
┌─────────────────────────────────────────────────────────────┐
│        INNER EXECUTION CONTEXT                              │
│                                                             │
│  Lexical Environment:                                       │
│  ┌──────────────────────────────────────────────────┐     │
│  │  Environment Record:                              │     │
│  │    innerVar: "I'm in inner"                      │     │
│  │                                                   │     │
│  │  outer: ───────────┐  (Uses inner.[[Environment]])│     │
│  └────────────────────│──────────────────────────────┘     │
│                       │                                     │
│                       ▼                                     │
│              Points to Outer Lexical Environment           │
└─────────────────────────────────────────────────────────────┘


THE COMPLETE SCOPE CHAIN AT RUNTIME:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When console.log(globalVar) executes inside inner():

  ┌─────────────────────────────────────────┐
  │   INNER's Lexical Environment           │
  │   ├─ innerVar: "I'm in inner"           │
  │   └─ outer: ─────────┐                  │
  └──────────────────────│──────────────────┘
                         │
                         │ (Chain Link 1)
                         ▼
  ┌─────────────────────────────────────────┐
  │   OUTER's Lexical Environment           │
  │   ├─ outerVar: "I'm in outer"           │
  │   ├─ inner: <function>                  │
  │   └─ outer: ─────────┐                  │
  └──────────────────────│──────────────────┘
                         │
                         │ (Chain Link 2)
                         ▼
  ┌─────────────────────────────────────────┐
  │   GLOBAL Lexical Environment            │
  │   ├─ globalVar: "I'm global"  ← FOUND!  │
  │   ├─ outer: <function>                  │
  │   └─ outer: null (end of chain)         │
  └─────────────────────────────────────────┘

VARIABLE LOOKUP PROCESS (SCOPE CHAIN TRAVERSAL):
1. Look for 'globalVar' in inner's Environment Record - NOT FOUND
2. Follow outer reference to outer's Lexical Environment
3. Look for 'globalVar' in outer's Environment Record - NOT FOUND
4. Follow outer reference to Global Lexical Environment
5. Look for 'globalVar' in Global Environment Record - FOUND! ✓
6. Return value: "I'm global"

If not found even in global → ReferenceError!
*/


//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!                    EXAMPLE 2: COMPLEX NESTED SCOPE CHAIN
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

var level = "global";

function levelOne() {
  var level = "one";
  
  function levelTwo() {
    var level = "two";
    
    function levelThree() {
      var level = "three";
      console.log(level); // "three" - found in own scope
    }
    
    levelThree();
    console.log(level); // "two" - found in own scope
  }
  
  levelTwo();
  console.log(level); // "one" - found in own scope
}

// levelOne();

/*
MEMORY CREATION PHASE - [[Environment]] LINKAGES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Global Scope:
  └─ levelOne.[[Environment]] → Global Scope
      └─ levelTwo.[[Environment]] → levelOne Scope
          └─ levelThree.[[Environment]] → levelTwo Scope

This forms a STATIC BLUEPRINT before any execution!


EXECUTION PHASE - RUNTIME MEMORY LAYOUT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When all functions are executing (Call Stack at deepest point):

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    CALL STACK                           ┃
┃  ┌───────────────────────────────────────────────┐      ┃
┃  │    levelThree() Execution Context             │      ┃
┃  │    Lexical Env: {level: "three"} → outer ─┐   │      ┃
┃  └────────────────────────────────────────────┼──┘      ┃
┃  ┌────────────────────────────────────────────┼──┐      ┃
┃  │    levelTwo() Execution Context            │  │      ┃
┃  │    Lexical Env: {level: "two"} → outer ─┐  │  │      ┃
┃  └──────────────────────────────────────────┼──┴──┘      ┃
┃  ┌──────────────────────────────────────────┼──┐         ┃
┃  │    levelOne() Execution Context           │  │         ┃
┃  │    Lexical Env: {level: "one"} → outer ─┐ │  │         ┃
┃  └──────────────────────────────────────────┼─┴──┘         ┃
┃  ┌──────────────────────────────────────────┼─┐           ┃
┃  │    Global Execution Context               │ │           ┃
┃  │    Lexical Env: {level: "global"} → null  │ │           ┃
┃  └────────────────────────────────────────────┴─┘           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

SCOPE CHAIN from levelThree():
  levelThree's LE → levelTwo's LE → levelOne's LE → Global LE → null

Variable Shadowing: Each "level" variable shadows the outer ones!
*/


//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!                    EXAMPLE 3: CLOSURE AND SCOPE CHAIN
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

function createCounter() {
  var count = 0;        // Private variable
  var secretKey = 999;  // Another private variable
  
  function increment() {
    count++;
    console.log("Count:", count);
  }
  
  return increment; // Return function - CLOSURE CREATED!
}

var counter = createCounter();
// counter();  // 1
// counter();  // 2
// counter();  // 3

/*
CRITICAL CONCEPT: CLOSURE = Function + Its [[Environment]] Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEMORY CREATION - [[Environment]] Setup:
When createCounter is parsed:
  └─ increment.[[Environment]] → createCounter's scope

EXECUTION:
Step 1: createCounter() is called
┌─────────────────────────────────────────────────────────────┐
│   createCounter Execution Context                           │
│   Lexical Environment:                                      │
│   ┌──────────────────────────────────────────────────┐     │
│   │  count: 0                                         │     │
│   │  secretKey: 999                                   │     │
│   │  increment: <function>                            │     │
│   │  outer: → Global                                  │     │
│   └──────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘

Step 2: createCounter() RETURNS increment function
        createCounter's Execution Context is POPPED from Call Stack
        BUT... increment function still has [[Environment]] pointing to it!

Step 3: counter() is called (which is increment)
┌─────────────────────────────────────────────────────────────┐
│   increment Execution Context                               │
│   Lexical Environment:                                      │
│   ┌──────────────────────────────────────────────────┐     │
│   │  (no local variables)                             │     │
│   │  outer: ───────────┐                              │     │
│   └────────────────────│──────────────────────────────┘     │
│                        │                                    │
│                        ▼                                    │
│   ┌─────────────────────────────────────────────────┐      │
│   │ createCounter's Lexical Environment (PRESERVED!) │      │
│   │  count: 1 (incremented)                          │      │
│   │  secretKey: 999                                  │      │
│   │  increment: <function>                           │      │
│   └─────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘

KEY POINTS:
1. [[Environment]] was set during memory creation (STATIC)
2. Even though createCounter finished executing, its Lexical Environment is preserved
3. This preservation happens because increment.[[Environment]] references it
4. This is GARBAGE COLLECTION aware - if no references exist, it gets cleaned up
5. count and secretKey remain private - cannot be accessed from outside!

SCOPE CHAIN for counter():
  increment's LE → createCounter's LE (CLOSURE!) → Global LE → null
*/


//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!                    EXAMPLE 4: SCOPE CHAIN IS LEXICAL, NOT DYNAMIC
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

var name = "Global";

function outer() {
  var name = "Outer";
  
  function inner() {
    console.log(name); // Which "name"?
  }
  
  return inner;
}

function caller() {
  var name = "Caller";
  var innerFunc = outer();
  innerFunc(); // Logs "Outer", NOT "Caller"!
}

// caller();

/*
WHY DOES IT LOG "Outer" and NOT "Caller"?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEMORY CREATION PHASE:
  inner.[[Environment]] → outer's scope (where inner is DEFINED)
  
EXECUTION PHASE:
  When innerFunc() is called from within caller():
  
  ┌─────────────────────────────────────────┐
  │   inner/innerFunc Execution Context     │
  │   Lexical Environment:                  │
  │   └─ outer: ───────────┐                │
  └────────────────────────│────────────────┘
                           │
                           │ (Uses [[Environment]], NOT call location!)
                           ▼
  ┌─────────────────────────────────────────┐
  │   outer's Lexical Environment           │
  │   ├─ name: "Outer"  ← FOUND HERE!       │
  │   ├─ inner: <function>                  │
  │   └─ outer: → Global                    │
  └─────────────────────────────────────────┘

❌ WRONG ASSUMPTION: "inner is called from caller, so it should use caller's scope"
✅ CORRECT: "inner was DEFINED in outer, so it uses outer's scope (LEXICAL)"

COMPARISON:
  LEXICAL SCOPING (JavaScript):   Based on WHERE code is written
  DYNAMIC SCOPING (some languages): Based on WHERE code is called

JavaScript uses LEXICAL SCOPING, determined at COMPILE TIME, not RUNTIME!
*/


//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!                    EXAMPLE 5: SCOPE CHAIN WITH BLOCKS
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

var globalVar = "global";

function testBlockScope() {
  var functionVar = "function scope";
  
  if (true) {
    let blockLet = "block let";
    const blockConst = "block const";
    var blockVar = "block var"; // Goes to function scope!
    
    {
      let innerBlock = "inner block";
      console.log(blockLet);    // Accessible
      console.log(functionVar); // Accessible
      console.log(globalVar);   // Accessible
    }
    
    // console.log(innerBlock); // ReferenceError!
  }
  
  console.log(blockVar);    // Accessible (var is function-scoped)
  // console.log(blockLet); // ReferenceError! (let is block-scoped)
}

// testBlockScope();

/*
MEMORY LAYOUT WITH BLOCKS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When innermost block executes:

┌───────────────────────────────────────────────────────────┐
│  INNER BLOCK Lexical Environment                          │
│  ├─ Declarative Environment Record:                       │
│  │    innerBlock: "inner block"                           │
│  └─ outer: ───────────┐                                   │
└────────────────────────│───────────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────────────┐
│  IF BLOCK Lexical Environment                             │
│  ├─ Declarative Environment Record:                       │
│  │    blockLet: "block let"                               │
│  │    blockConst: "block const"                           │
│  └─ outer: ───────────┐                                   │
└────────────────────────│───────────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────────────┐
│  testBlockScope() Execution Context                       │
│  ├─ Function Environment Record:                          │
│  │    functionVar: "function scope"                       │
│  │    blockVar: "block var"  ← var hoisted here!          │
│  └─ outer: ───────────┐                                   │
└────────────────────────│───────────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────────────┐
│  GLOBAL Lexical Environment                               │
│  ├─ globalVar: "global"                                   │
│  └─ outer: null                                           │
└───────────────────────────────────────────────────────────┘

KEY DIFFERENCES:
  var:   Function-scoped → Added to function's Environment Record
  let:   Block-scoped    → Added to block's Environment Record
  const: Block-scoped    → Added to block's Environment Record

SCOPE CHAIN: Inner Block → If Block → Function → Global → null


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    🎯 DO BLOCKS CREATE LEXICAL ENVIRONMENTS?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ YES! Blocks create their own Lexical Environment at RUNTIME (when they execute)
✅ YES! Block LEs connect to parent LE via 'outer' reference (forming scope chain)
✅ YES! Block LEs are stored in HEAP and can be preserved by closures

⚠️  IMPORTANT CONDITION: Blocks create LE ONLY if they contain let/const declarations!

BUT with important differences from functions:

╔═══════════════════════════════════════╦═══════════════════════════════════════════════════╗
║          FUNCTIONS                    ║                 BLOCKS                            ║
╠═══════════════════════════════════════╬═══════════════════════════════════════════════════╣
║                                       ║                                                   ║
║  [[Environment]] Internal Slot:       ║  [[Environment]] Internal Slot:                   ║
║  ✅ YES - set at COMPILE TIME          ║  ❌ NO - blocks don't have this slot              ║
║     (static blueprint)                ║                                                   ║
║                                       ║                                                   ║
║  Lexical Environment:                 ║  Lexical Environment:                             ║
║  ✅ YES - created at RUNTIME           ║  ✅ YES - created at RUNTIME                      ║
║     (when function executes)          ║     (when block executes)                         ║
║                                       ║     (ONLY if it has let/const)                    ║
║                                       ║                                                   ║
║  'outer' reference determined:        ║  'outer' reference determined:                    ║
║  • At COMPILE TIME via [[Environment]]║  • At RUNTIME - points to current active          ║
║  • Points to WHERE defined            ║    enclosing Lexical Environment                  ║
║  • Enables closures                   ║  • Direct/immediate parent scope                  ║
║                                       ║                                                   ║
║  Stored in heap:                      ║  Stored in heap:                                  ║
║  ✅ YES - can be referenced by         ║  ✅ YES - while in scope, can be in closures      ║
║     closures even after function ends ║                                                   ║
║                                       ║                                                   ║
║  First-class value:                   ║  First-class value:                               ║
║  ✅ YES - can be passed, returned,     ║  ❌ NO - just syntax for grouping code            ║
║     stored in variables               ║                                                   ║
║                                       ║                                                   ║
╚═══════════════════════════════════════╩═══════════════════════════════════════════════════╝


WHY BLOCKS DON'T NEED [[Environment]] SLOT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❶ Blocks are NOT first-class values:
   • You can't pass a block as an argument: myFunc(if(true){...}) ❌
   • You can't return a block: return if(true){...} ❌
   • You can't store a block in a variable: var x = if(true){...} ❌

❷ No ambiguity about parent scope:
   • Blocks execute EXACTLY where they're written
   • Parent scope is ALWAYS the immediately enclosing scope
   • No need to "remember" where block was defined vs where it runs

❸ Functions NEED [[Environment]] because:
   • They CAN be passed around, returned, stored
   • They might execute in a DIFFERENT context than where defined
   • They need to "remember" their definition location (lexical scope)
   • This enables CLOSURES


EXAMPLE: BLOCKS IN CLOSURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

function createBlockClosure() {
  var funcVar = "function variable";
  
  if (true) {
    let blockVar = "I'm in a block!";
    const blockConst = 999;
    
    // This inner function creates a closure over the BLOCK's LE!
    return function() {
      console.log(blockVar);   // Captures block LE
      console.log(blockConst); // Captures block LE
      console.log(funcVar);    // Captures function LE
    };
  }
}

var closureFn = createBlockClosure();
// closureFn();  // Works! Block LE is preserved in heap

/*
MEMORY VISUALIZATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When closureFn() is called (AFTER createBlockClosure finished):

┌───────────────────────────────────────────────────────────┐
│  Inner Function Execution Context                         │
│  Lexical Environment:                                     │
│  └─ outer: ───────────┐                                   │
└────────────────────────│───────────────────────────────────┘
                         │
                         │ (Function's [[Environment]] points here)
                         ▼
┌───────────────────────────────────────────────────────────┐
│  IF BLOCK Lexical Environment (PRESERVED in heap!)        │
│  ├─ blockVar: "I'm in a block!"  ← Still accessible! ✓    │
│  ├─ blockConst: 999                                       │
│  └─ outer: ───────────┐                                   │
└────────────────────────│───────────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────────────┐
│  createBlockClosure's LE (PRESERVED in heap!)             │
│  ├─ funcVar: "function variable"  ← Also accessible! ✓    │
│  └─ outer: → Global                                       │
└───────────────────────────────────────────────────────────┘

KEY INSIGHT: Even though the if block and createBlockClosure finished executing,
their Lexical Environments are PRESERVED because the returned function's 
[[Environment]] references them (directly or indirectly)!


SUMMARY: BLOCKS AND SCOPE CHAIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Blocks DO create separate Lexical Environment objects in heap (at runtime)
   BUT ONLY if they contain let/const declarations! ⚠️

✅ Blocks DO connect via 'outer' reference to enclosing LE (forming scope chain)
✅ Block LEs CAN be preserved by closures (just like function LEs)
❌ Blocks DON'T have [[Environment]] internal slot (don't need it - not first-class)

⚠️  CRITICAL CONDITION FOR LE CREATION:
   ├─ Block with let/const     → ✅ Creates new LE
   ├─ Block with only var      → ❌ NO LE created (var is function-scoped)
   ├─ Empty block              → ❌ NO LE created
   └─ Block with only stmts    → ❌ NO LE created

✅ var declarations inside blocks get hoisted to function scope (ignore block boundaries)

The scope chain works IDENTICALLY for blocks and functions - both use the same
Lexical Environment mechanism, just with different triggers and lifetimes!

Memory efficiency: JavaScript only creates block LEs when necessary (let/const present).
No point creating LE for blocks with only var/statements - they don't need separate scope!
*/


//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!                    FINAL SUMMARY: THE COMPLETE PICTURE
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

/*
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                          TWO PHASES OF SCOPE CHAIN                                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

╔════════════════════════════════════════════╦════════════════════════════════════════════════════╗
║   MEMORY CREATION PHASE (Compile Time)    ║      EXECUTION PHASE (Runtime)                     ║
╠════════════════════════════════════════════╬════════════════════════════════════════════════════╣
║                                            ║                                                    ║
║  [[Environment]] Internal Slot             ║  Lexical Environment                               ║
║  ─────────────────────────────────────     ║  ────────────────────────────────                  ║
║  • Created when function is PARSED         ║  • Created when function EXECUTES                  ║
║  • STATIC - never changes                  ║  • DYNAMIC - created/destroyed at runtime          ║
║  • Determined by WHERE function is written ║  • Uses [[Environment]] to link to parent          ║
║  • Just a reference/pointer                ║  • Contains actual variables and values            ║
║  • Lexically scoped                        ║  • Forms the actual scope chain                    ║
║  • Blueprint for future linkages           ║  • Runtime structure                               ║
║                                            ║                                                    ║
║  Example:                                  ║  Example:                                          ║
║  function outer() {                        ║  When outer() executes:                            ║
║    function inner() {}                     ║  Lexical Env = {                                   ║
║  }                                         ║    Environment Record: { vars... }                 ║
║                                            ║    outer: outer.[[Environment]]                    ║
║  At parse time:                            ║  }                                                 ║
║  inner.[[Environment]] → outer's scope     ║                                                    ║
║                                            ║  When inner() executes:                            ║
║  This is SET and IMMUTABLE!                ║  Lexical Env = {                                   ║
║                                            ║    Environment Record: { vars... }                 ║
║                                            ║    outer: inner.[[Environment]] (uses blueprint!)  ║
║                                            ║  }                                                 ║
║                                            ║                                                    ║
╚════════════════════════════════════════════╩════════════════════════════════════════════════════╝

HOW THEY WORK TOGETHER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. DURING PARSING (Memory Creation):
   └─ JavaScript engine sets [[Environment]] for each function
   └─ This creates a STATIC BLUEPRINT of scope relationships

2. DURING EXECUTION:
   └─ When function is called, new Lexical Environment is created
   └─ Its 'outer' reference is set using the [[Environment]] slot
   └─ This creates the SCOPE CHAIN at runtime

3. VARIABLE LOOKUP:
   └─ Start in current Lexical Environment's Environment Record
   └─ If not found, follow 'outer' reference (which uses [[Environment]])
   └─ Repeat until found or reach null (ReferenceError)

4. CLOSURE:
   └─ Function + [[Environment]] reference
   └─ Even if parent execution context is destroyed
   └─ Lexical Environment is preserved because [[Environment]] references it


MEMORY STRUCTURE COMPARISON:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function outer() {
  var x = 10;
  function inner() {
    console.log(x);
  }
  return inner;
}

COMPILE TIME (Memory Creation):
  ┌──────────────┐
  │    outer     │
  │  (function)  │
  │              │
  │ [[Environment]] ──→ Global Scope
  └──────────────┘
  
  ┌──────────────┐
  │    inner     │
  │  (function)  │
  │              │
  │ [[Environment]] ──→ outer's Scope  ← STATIC LINK SET!
  └──────────────┘


RUNTIME (Execution Phase):
  When outer() executes:
  ┌─────────────────────────────┐
  │  outer's Lexical Env        │
  │  ├─ x: 10                   │
  │  ├─ inner: <function>       │
  │  └─ outer: → Global LE      │
  └─────────────────────────────┘
  
  When inner() executes (even after outer finished):
  ┌─────────────────────────────┐
  │  inner's Lexical Env        │
  │  └─ outer: ───────────┐     │
  └────────────────────────│─────┘
                           │
                           │ (Uses inner.[[Environment]])
                           ▼
  ┌─────────────────────────────┐
  │  outer's Lexical Env        │  ← PRESERVED!
  │  ├─ x: 10 ← Found!          │
  │  ├─ inner: <function>       │
  │  └─ outer: → Global LE      │
  └─────────────────────────────┘


KEY TAKEAWAYS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ [[Environment]] = COMPILE TIME blueprint (static, immutable)
✅ Lexical Environment = RUNTIME structure (dynamic, created/destroyed)
✅ [[Environment]] determines HOW Lexical Environments will be linked
✅ Scope chain = Chain of Lexical Environments linked via [[Environment]]
✅ JavaScript uses LEXICAL (static) scoping, not DYNAMIC scoping
✅ Closures work because [[Environment]] keeps reference to outer scope
✅ Variable lookup traverses the scope chain from inner to outer
✅ let/const are block-scoped, var is function-scoped

SCOPE CHAIN = Series of Lexical Environments connected through [[Environment]] references,
              forming a path from inner scope to outer scope, used for variable resolution!
*/

//? ══════════════════════════════════════════════════════════════════════════════════════════════════
//? INTERVIEW QUESTIONS & ANSWERS
//? ══════════════════════════════════════════════════════════════════════════════════════════════════

/*
Q1: What is scope chain in JavaScript?
A: Scope chain is the mechanism JavaScript uses to resolve variable names. It's a chain of Lexical 
   Environments linked together through [[Environment]] references, searched from inner to outer scope.

Q2: When is the scope chain determined?
A: The BLUEPRINT ([[Environment]]) is set during parsing/compilation (memory creation phase), but the 
   actual chain is formed during execution when Lexical Environments are created.

Q3: What's the difference between [[Environment]] and Lexical Environment?
A: [[Environment]] is a static internal slot set at compile time that acts as a blueprint.
   Lexical Environment is a dynamic runtime structure created during execution that contains actual 
   variables and uses [[Environment]] to link to parent scope.

Q4: How do closures relate to scope chain?
A: Closures preserve the scope chain by keeping a reference to their [[Environment]]. Even when the 
   outer function finishes executing, the inner function maintains access to outer variables through 
   this preserved scope chain.

Q5: Is JavaScript's scoping lexical or dynamic?
A: Lexical (static). Scope is determined by WHERE the function is written in the code, not WHERE 
   it is called from.
*/


//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!            INTERVIEW QUESTION: LEXICAL VS DYNAMIC SCOPING - PRACTICAL DIFFERENCE
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 INTERVIEW QUESTION: "How would this code behave differently with lexical vs dynamic scoping?"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

// Example Code:
var x = 10;

function printX() {
  console.log(x);
}

function outerFunction() {
  var x = 20;
  printX(); // What will this print?
}

function anotherFunction() {
  var x = 30;
  printX(); // What will this print?
}

// Run these:
console.log("=== LEXICAL SCOPING (JavaScript's Actual Behavior) ===");
printX();          // Output: 10
outerFunction();   // Output: 10
anotherFunction(); // Output: 10

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    ✅ WITH LEXICAL SCOPING (JavaScript - Reality)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRINCIPLE: Scope is determined by WHERE the function is DEFINED (written in code)

ANALYSIS:
┌────────────────────────────────────────────────────────────────────────────┐
│  printX() is defined in GLOBAL scope                                       │
│  printX.[[Environment]] → Global Scope (set at parse time)                 │
│                                                                            │
│  When printX() looks for 'x':                                              │
│  1. Look in printX's own scope       → Not found                           │
│  2. Look in printX's parent scope    → Global scope (x = 10) ✓ FOUND!     │
│                                                                            │
│  ⚠️  It doesn't matter WHERE printX() is CALLED from!                      │
│     The scope chain is fixed based on WHERE it was DEFINED!               │
└────────────────────────────────────────────────────────────────────────────┘

RESULTS:
  printX()          → Looks in Global scope → Finds x = 10  → Output: 10
  outerFunction()   → Calls printX()        → Still uses Global x → Output: 10
  anotherFunction() → Calls printX()        → Still uses Global x → Output: 10

MEMORY VISUALIZATION (Lexical Scoping):

  When outerFunction() calls printX():
  
  ┌─────────────────────────────────────┐
  │  printX() Execution Context         │
  │  Looking for 'x'...                 │
  │  └─ outer: ───────────┐             │  (Uses printX.[[Environment]])
  └────────────────────────│─────────────┘
                           │
                           │ ❌ IGNORE outerFunction's scope!
                           │ ✅ Use WHERE printX was DEFINED!
                           ▼
  ┌─────────────────────────────────────┐
  │  GLOBAL Scope                       │
  │  x: 10  ← FOUND HERE! ✓             │
  └─────────────────────────────────────┘
  
  ┌─────────────────────────────────────┐
  │  outerFunction() Scope              │  ← THIS IS IGNORED!
  │  x: 20  (not used)                  │
  └─────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                ❓ WITH DYNAMIC SCOPING (Hypothetical - NOT JavaScript)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRINCIPLE: Scope is determined by WHERE the function is CALLED (call stack at runtime)

ANALYSIS:
┌────────────────────────────────────────────────────────────────────────────┐
│  Scope chain is built based on CALL STACK, not definition location        │
│                                                                            │
│  When printX() looks for 'x':                                              │
│  → Check the scope of the CALLING function (dynamic)                       │
│  → Walk up the CALL STACK, not the lexical parent                          │
└────────────────────────────────────────────────────────────────────────────┘

HYPOTHETICAL RESULTS (if JavaScript used dynamic scoping):
  printX()          → Called from Global    → Uses Global x = 10    → Output: 10
  outerFunction()   → Calls printX()        → Uses outerFunction x = 20 → Output: 20 ⚠️
  anotherFunction() → Calls printX()        → Uses anotherFunction x = 30 → Output: 30 ⚠️

MEMORY VISUALIZATION (Dynamic Scoping - Hypothetical):

  When outerFunction() calls printX():
  
  CALL STACK (determines scope in dynamic scoping):
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃  printX()                        ┃ ← Currently executing
  ┃  Looking for 'x'...              ┃    Looks DOWN the call stack
  ┃  ├─ No local 'x'                 ┃            ↓
  ┃  └─ Check caller's scope ──────┐ ┃            ↓
  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━┫            ↓
  ┃  outerFunction()                 ┃ ← Caller   ↓
  ┃  x: 20  ← FOUND HERE! ✓          ┃ ←──────────┘
  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
  ┃  Global                          ┃
  ┃  x: 10  (not reached)            ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  When anotherFunction() calls printX():
  
  CALL STACK:
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃  printX()                        ┃ ← Currently executing
  ┃  └─ Check caller's scope ──────┐ ┃
  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━┫
  ┃  anotherFunction()               ┃ ← Caller
  ┃  x: 30  ← FOUND HERE! ✓          ┃ ← Different result!
  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
  ┃  Global                          ┃
  ┃  x: 10  (not reached)            ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
*/


//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!                  SIDE-BY-SIDE COMPARISON: LEXICAL VS DYNAMIC SCOPING
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

/*
╔═══════════════════════════════════════════╦═══════════════════════════════════════════════════╗
║     LEXICAL SCOPING (JavaScript)          ║     DYNAMIC SCOPING (Perl, Bash, some Lisps)     ║
╠═══════════════════════════════════════════╬═══════════════════════════════════════════════════╣
║                                           ║                                                   ║
║  Scope determined by:                     ║  Scope determined by:                             ║
║  • WHERE function is WRITTEN              ║  • WHERE function is CALLED                       ║
║  • Code structure (static)                ║  • Call stack (dynamic/runtime)                   ║
║                                           ║                                                   ║
║  When is scope determined?                ║  When is scope determined?                        ║
║  • At COMPILE/PARSE time                  ║  • At RUNTIME                                     ║
║  • Before any execution                   ║  • During execution                               ║
║                                           ║                                                   ║
║  Scope chain follows:                     ║  Scope chain follows:                             ║
║  • [[Environment]] references             ║  • Call stack (execution context stack)           ║
║  • Lexical parent (where defined)         ║  • Calling function's scope                       ║
║                                           ║                                                   ║
║  Predictability:                          ║  Predictability:                                  ║
║  • HIGHLY PREDICTABLE                     ║  • LESS PREDICTABLE                               ║
║  • Same result every time                 ║  • Result depends on who calls it                 ║
║  • Can analyze by reading code            ║  • Must trace execution path                      ║
║                                           ║                                                   ║
║  Closures:                                ║  Closures:                                        ║
║  • WORK naturally                         ║  • Don't work the same way                        ║
║  • Functions remember definition scope    ║  • Functions use caller's scope                   ║
║                                           ║                                                   ║
║  Example Output:                          ║  Example Output:                                  ║
║  printX()          → 10                   ║  printX()          → 10                           ║
║  outerFunction()   → 10 (same!)           ║  outerFunction()   → 20 (different!)              ║
║  anotherFunction() → 10 (same!)           ║  anotherFunction() → 30 (different!)              ║
║                                           ║                                                   ║
║  Advantage:                               ║  Advantage:                                       ║
║  • Easy to reason about                   ║  • Can access caller's variables                  ║
║  • Enables closures                       ║  • More flexible in some cases                    ║
║  • Better for modularity                  ║                                                   ║
║                                           ║  Disadvantage:                                    ║
║  Used by:                                 ║  • Hard to predict behavior                       ║
║  • JavaScript, Python, Java, C++,         ║  • Makes debugging harder                         ║
║    Ruby, most modern languages            ║  • Breaks encapsulation                           ║
║                                           ║                                                   ║
║                                           ║  Used by:                                         ║
║                                           ║  • Perl (local vars), Bash, some Lisp dialects    ║
║                                           ║  • Rarely used in modern languages                ║
║                                           ║                                                   ║
╚═══════════════════════════════════════════╩═══════════════════════════════════════════════════╝
*/


//! ═══════════════════════════════════════════════════════════════════════════════════════════════════
//!                  ANOTHER EXAMPLE: DEMONSTRATING THE DIFFERENCE
//! ═══════════════════════════════════════════════════════════════════════════════════════════════════

var message = "Hello from Global";

function showMessage() {
  console.log(message);
}

function greetInEnglish() {
  var message = "Hello from English";
  showMessage();
}

function greetInSpanish() {
  var message = "Hola from Spanish";
  showMessage();
}

function greetInFrench() {
  var message = "Bonjour from French";
  showMessage();
}

console.log("\n=== SAME FUNCTION, DIFFERENT CALLERS ===");
greetInEnglish();  // JavaScript (Lexical): "Hello from Global"
                   // Dynamic Scoping:       "Hello from English"

greetInSpanish();  // JavaScript (Lexical): "Hello from Global"
                   // Dynamic Scoping:       "Hola from Spanish"

greetInFrench();   // JavaScript (Lexical): "Hello from Global"
                   // Dynamic Scoping:       "Bonjour from French"

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHY LEXICAL SCOPING IS BETTER (and why JavaScript uses it):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ PREDICTABILITY:
   • You can determine what a function does just by READING the code
   • No need to trace all possible call paths
   • Easier to understand and maintain

✅ MODULARITY & ENCAPSULATION:
   • Functions are self-contained
   • Internal implementation doesn't depend on who calls them
   • Better for building reusable modules/libraries

✅ CLOSURES:
   • Functions can "remember" their creation environment
   • Essential for functional programming patterns
   • Enables private variables and data hiding

✅ OPTIMIZATION:
   • Compiler can optimize better (scope known at compile time)
   • Faster variable lookup (chain is predetermined)
   • Better performance

✅ DEBUGGING:
   • Easier to debug (behavior is consistent)
   • Stack traces make more sense
   • No "spooky action at a distance"

❌ DYNAMIC SCOPING PROBLEMS:
   • Same function can behave differently depending on caller
   • Hard to reason about code
   • Breaks encapsulation
   • Makes refactoring dangerous
   • Unit testing becomes harder (behavior depends on context)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERVIEW ANSWER TEMPLATE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When asked: "What's the difference between lexical and dynamic scoping?"

Answer:
"JavaScript uses LEXICAL SCOPING, where a function's scope is determined by WHERE it's 
DEFINED in the code, not where it's CALLED from. This is determined at compile time.

In contrast, DYNAMIC SCOPING (used by languages like Perl) determines scope based on 
WHERE the function is CALLED - it uses the call stack at runtime.

For example, if I have a function that references a variable 'x':
- With lexical scoping: It looks for 'x' in the scope where the function was defined
- With dynamic scoping: It would look for 'x' in the scope of whoever called it

This makes lexical scoping more predictable and is why it's preferred in modern languages.
It also enables closures, which are fundamental to JavaScript."

Key Points to Mention:
• Lexical = compile time, based on code structure
• Dynamic = runtime, based on call stack  
• JavaScript uses lexical (like most modern languages)
• Lexical enables closures and better encapsulation
• More predictable and easier to reason about
*/

