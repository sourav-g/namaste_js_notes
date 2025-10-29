//? ================================================================================================
//? UNDEFINED vs NULL vs NOT DEFINED in JavaScript
//? ================================================================================================

/*
 * UNDEFINED:
 * - A special value and also a primitive type in JavaScript
 * - Automatically assigned by JavaScript engine when a variable is declared but not initialized
 * - It DOES take up memory space (placeholder value)
 * - Means: "I exist, but I don't have a value yet"
 * - typeof undefined returns "undefined"
 */

console.log("=== UNDEFINED ===");

var a;
console.log(a); // undefined - declared but not initialized

function test() {
  var x;
  return x;
}
console.log(test()); // undefined

// Function with no return statement returns undefined
function noReturn() {
  var temp = 10;
}
console.log(noReturn()); // undefined

// Accessing non-existent object property
var obj = { name: "John" };
console.log(obj.age); // undefined - property doesn't exist

// Array with empty slot
var arr = [1, , 3];
console.log(arr[1]); // undefined

console.log(typeof undefined); // "undefined"

//! BAD PRACTICE: Never manually assign undefined to a variable
var badPractice = undefined; // Don't do this! Let JS engine handle undefined

/*
 * NULL:
 * - A special value representing "intentional absence" of any object value
 * - NULL is also a primitive type
 * - Must be explicitly assigned by programmer (JavaScript never sets null automatically)
 * - It DOES take up memory space
 * - Means: "I exist, but I intentionally have NO value"
 * - Used to explicitly say "this should be empty/nothing"
 * - typeof null returns "object" (this is a known bug in JavaScript since inception)
 */

console.log("\n=== NULL ===");

var user = null; // Explicitly set to null
console.log(user); // null

// Common use case: Initially set to null, later assign value
var currentUser = null; // No user logged in
console.log(currentUser); // null

// Later when user logs in
currentUser = { name: "Alice", id: 101 };
console.log(currentUser); // { name: 'Alice', id: 101 }

// Reset to null when user logs out
currentUser = null;
console.log(currentUser); // null

console.log(typeof null); // "object" (This is a historical bug in JS!)

/*
 * NOT DEFINED:
 * - This is an ERROR state, not a value or type
 * - Means the variable was never declared in any scope
 * - Does NOT take up memory (variable doesn't exist at all)
 * - Throws ReferenceError when accessed
 * - Means: "I don't exist in this program"
 */

console.log("\n=== NOT DEFINED ===");

// console.log(xyz); // ReferenceError: xyz is not defined
// The variable 'xyz' was never declared anywhere, so it doesn't exist

try {
  console.log(nonExistentVariable);
} catch (error) {
  console.log("Error:", error.message); // Error: nonExistentVariable is not defined
}

//? ================================================================================================
//? KEY DIFFERENCES SUMMARY
//? ================================================================================================

/*
┌──────────────────┬────────────────────┬────────────────────┬──────────────────────┐
│                  │     UNDEFINED      │        NULL        │     NOT DEFINED      │
├──────────────────┼────────────────────┼────────────────────┼──────────────────────┤
│ Type             │ Primitive type     │ Primitive type     │ Not a type (ERROR)   │
├──────────────────┼────────────────────┼────────────────────┼──────────────────────┤
│ Assigned By      │ JavaScript Engine  │ Programmer         │ N/A (doesn't exist)  │
│                  │ (automatically)    │ (explicitly)       │                      │
├──────────────────┼────────────────────┼────────────────────┼──────────────────────┤
│ Memory           │ YES (placeholder)  │ YES                │ NO                   │
├──────────────────┼────────────────────┼────────────────────┼──────────────────────┤
│ Meaning          │ "Exists but no     │ "Intentionally     │ "Doesn't exist at    │
│                  │  value assigned"   │  empty/no value"   │  all"                │
├──────────────────┼────────────────────┼────────────────────┼──────────────────────┤
│ typeof           │ "undefined"        │ "object" (bug!)    │ N/A (throws error)   │
├──────────────────┼────────────────────┼────────────────────┼──────────────────────┤
│ When it occurs   │ - Var declared but │ - Explicitly set   │ - Variable never     │
│                  │   not initialized  │   by developer     │   declared           │
│                  │ - Missing function │ - To reset/clear   │ - Out of scope       │
│                  │   parameters       │   variables        │                      │
│                  │ - No return value  │ - Initial state    │                      │
│                  │ - Non-existent     │                    │                      │
│                  │   object property  │                    │                      │
└──────────────────┴────────────────────┴────────────────────┴──────────────────────┘
*/

//? ================================================================================================
//? COMPARISONS
//? ================================================================================================

console.log("\n=== COMPARISONS ===");

var undefinedVar;
var nullVar = null;

// Using ==  (loose equality - performs type coercion)
console.log(undefinedVar == nullVar); // true (they are considered equal with ==)
console.log(undefinedVar == undefined); // true
console.log(nullVar == null); // true

// Using === (strict equality - no type coercion)
console.log(undefinedVar === nullVar); // false (different types)
console.log(undefinedVar === undefined); // true
console.log(nullVar === null); // true

// Falsy values
console.log(!undefinedVar); // true (undefined is falsy)
console.log(!nullVar); // true (null is falsy)

// Best practice: Always use === for comparisons
if (undefinedVar === undefined) {
  console.log("undefinedVar is strictly undefined");
}

if (nullVar === null) {
  console.log("nullVar is strictly null");
}

//? ================================================================================================
//? BEST PRACTICES
//? ================================================================================================

/*
 * ✅ DO:
 * - Use null when you want to intentionally clear/reset a variable
 * - Use null for "intentional absence of value"
 * - Let JavaScript assign undefined automatically
 * - Check for null using strict equality (===)
 * 
 * ❌ DON'T:
 * - Never manually assign undefined to variables
 * - Don't rely on typeof null (it incorrectly returns "object")
 * - Don't use == for null/undefined checks (use ===)
 * 
 * 💡 WHEN TO USE NULL:
 * - Initializing variables that will hold objects later
 * - Resetting/clearing existing references
 * - Returning "no result" from functions intentionally
 * - API responses indicating "no data"
 * 
 * 💡 WHEN YOU'LL SEE UNDEFINED:
 * - Uninitialized variables
 * - Missing function arguments
 * - Functions without return statements
 * - Accessing non-existent object properties
 * 
 * 💡 HOW TO AVOID "NOT DEFINED" ERRORS:
 * - Always declare variables before using them
 * - Use 'use strict' mode to catch undeclared variables
 * - Check if variable exists using typeof
 */

// Safe check for potentially undeclared variable
if (typeof possiblyUndeclared !== "undefined") {
  console.log(possiblyUndeclared);
} else {
  console.log("Variable is not declared or is undefined");
}

//? ================================================================================================
//? REAL-WORLD EXAMPLES
//? ================================================================================================

console.log("\n=== REAL-WORLD EXAMPLES ===");

// Example 1: User Authentication
let loggedInUser = null; // Initially no user (intentional)
console.log("Initial user:", loggedInUser); // null

function login(username) {
  loggedInUser = { username: username, loginTime: new Date() };
}

function logout() {
  loggedInUser = null; // Intentionally clear user
}

login("john_doe");
console.log("After login:", loggedInUser);

logout();
console.log("After logout:", loggedInUser); // null

// Example 2: API Response handling
function getUserById(id) {
  const users = { 1: { name: "Alice" }, 2: { name: "Bob" } };
  return users[id]; // Returns user object or undefined if not found
}

console.log(getUserById(1)); // { name: 'Alice' }
console.log(getUserById(99)); // undefined (not found)

// Example 3: Optional Configuration
function createConfig(options) {
  return {
    theme: options?.theme || "light", // undefined if options not provided
    lang: options?.lang || "en",
  };
}

console.log(createConfig()); // Will handle undefined gracefully
console.log(createConfig({ theme: "dark" }));
