//? JS Runtime environment (JSRE)

//* JSRE  = JS Engine(heart) + WebAPI + CQ + MQ + Event loop

//? JS Engines by browser
//~ Microsoft Edge --> Chakra
//~ FireFox --> SpiderMonkey
//~ Chrome --> V8
//~ Node.js --> V8

//? JS Engine architecture

//* Code -> Parsing -> Compilation -> Execution

// Parsing -> Tokens generated & Syntax parser converts code into AST (Abstract Syntax Tree) ; (astexplorer.net)

// Compilation -> Producing optimized code (bytecode)
//! 1. JIT Compilation -> Interpreter + Compiler working at runtime
//! 2. AOT Compilation

// Execution -> Using Call Stack & Memory Heap

// GC -> Mark & Sweep algo

//? Check V8 architecture
//? and optimizing techniques
// sweep inlining
// copy elision
// inline caching
