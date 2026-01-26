# 📊 Variables & Data Types

<div align="center">

![Variables](https://img.shields.io/badge/Topic-Variables-blue?style=for-the-badge)
![Data Types](https://img.shields.io/badge/SubTopic-Data_Types-green?style=for-the-badge)
![Estimated Time](https://img.shields.io/badge/Time-2_hours-orange?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Difficulty-⭐☆☆☆☆-yellow?style=for-the-badge)

**Understanding How JavaScript Stores and Manages Data**

</div>

## 📚 Table of Contents
1. [Introduction to Variables](#-introduction-to-variables)
2. [Variable Declaration](#-variable-declaration)
3. [Data Types in JavaScript](#-data-types-in-javascript)
4. [Type Conversion & Coercion](#-type-conversion--coercion)
5. [Best Practices](#-best-practices)
6. [Common Pitfalls](#-common-pitfalls)
7. [Exercises](#-exercises)

## 🎯 Learning Objectives

By the end of this section, you will be able to:
✅ Declare variables using `let`, `const`, and `var`  
✅ Identify and use different JavaScript data types  
✅ Perform type conversions explicitly  
✅ Understand type coercion in operations  
✅ Apply naming conventions and best practices  

## 📝 Introduction to Variables

Variables are containers for storing data values. Think of them as labeled boxes where you can store information to use later in your program.

### Why Use Variables?
- **Reusability**: Store values for repeated use
- **Readability**: Give meaningful names to values
- **Maintainability**: Change values in one place
- **Memory Management**: Efficiently store and retrieve data

## 🔧 Variable Declaration

JavaScript provides three ways to declare variables:

### 1. `let` (Block-scoped, Reassignable)
```javascript
// Declaration and initialization
let userName = "John";
let userAge = 25;

// Reassignment is allowed
userName = "Jane";
userAge = 26;

// Block scope example
{
    let blockScoped = "I'm inside a block";
    console.log(blockScoped); // Works
}
// console.log(blockScoped); // Error: blockScoped is not defined
```

### 2. `const` (Block-scoped, Constant)
```javascript
// Must be initialized at declaration
const PI = 3.14159;
const API_KEY = "abc123def456";

// Cannot be reassigned
// PI = 3.14; // Error: Assignment to constant variable

// But objects/arrays can be modified (mutation allowed)
const user = { name: "John", age: 25 };
user.age = 26; // ✅ Allowed - modifying property
// user = { name: "Jane" }; // ❌ Not allowed - reassigning variable

const colors = ["red", "green", "blue"];
colors.push("yellow"); // ✅ Allowed - modifying array
// colors = ["purple"]; // ❌ Not allowed - reassigning variable
```

### 3. `var` (Function-scoped, Legacy)
```javascript
// Avoid using var in modern JavaScript
var oldVariable = "I'm old school";

// Hoisted to function scope
console.log(hoisted); // undefined (not an error)
var hoisted = "I was hoisted";

// Equivalent to:
var hoisted;
console.log(hoisted); // undefined
hoisted = "I was hoisted";
```

### Comparison Table
| Feature | `let` | `const` | `var` |
|---------|-------|---------|-------|
| **Scope** | Block | Block | Function |
| **Hoisting** | Temporal Dead Zone | Temporal Dead Zone | Hoisted (initialized as undefined) |
| **Reassignment** | ✅ Allowed | ❌ Not allowed | ✅ Allowed |
| **Redeclaration** | ❌ Not allowed | ❌ Not allowed | ✅ Allowed |
| **Modern Usage** | ✅ Preferred for variables | ✅ Preferred for constants | ❌ Avoid |

## 🏷️ Data Types in JavaScript

JavaScript has dynamic typing - variables can hold values of any type without type declaration.

### Primitive Data Types (7 Types)

#### 1. **String** - Text data
```javascript
let singleQuotes = 'Hello World';
let doubleQuotes = "Hello World";
let backticks = `Hello World`; // Template literals
let name = "Alice";
let greeting = `Hello, ${name}!`; // String interpolation

console.log(typeof singleQuotes); // "string"
console.log(greeting); // "Hello, Alice!"
```

#### 2. **Number** - Numeric data (integers & floats)
```javascript
let integer = 42;
let float = 3.14159;
let scientific = 5.2e3; // 5200
let hex = 0xFF; // 255 in hexadecimal
let octal = 0o10; // 8 in octal
let binary = 0b1010; // 10 in binary

// Special numeric values
let infinity = Infinity;
let negativeInfinity = -Infinity;
let notANumber = NaN; // "Not a Number"

console.log(typeof integer); // "number"
console.log(1 / 0); // Infinity
console.log("abc" * 2); // NaN
```

#### 3. **Boolean** - Logical values
```javascript
let isTrue = true;
let isFalse = false;
let isGreater = 5 > 3; // true

// Falsy values (become false when converted to boolean)
false, 0, -0, 0n, "", null, undefined, NaN

// Truthy values (become true when converted to boolean)
true, 1, -1, "hello", [], {}, function() {}

console.log(typeof isTrue); // "boolean"
console.log(Boolean(0)); // false
console.log(Boolean("hello")); // true
```

#### 4. **Undefined** - Uninitialized variable
```javascript
let uninitialized;
let explicitlyUndefined = undefined;

console.log(typeof uninitialized); // "undefined"
console.log(uninitialized === undefined); // true

// Common use case
function findUser(id) {
    // If user not found, return undefined
    return undefined;
}
```

#### 5. **Null** - Intentional absence of value
```javascript
let emptyValue = null;
let user = null; // No user logged in

console.log(typeof emptyValue); // "object" (historical bug)
console.log(emptyValue === null); // true
console.log(null == undefined); // true (abstract equality)
console.log(null === undefined); // false (strict equality)
```

#### 6. **Symbol** (ES6) - Unique identifier
```javascript
const id = Symbol("id");
const user = {
    name: "John",
    [id]: 12345 // Symbol as property key
};

const anotherId = Symbol("id");
console.log(id === anotherId); // false - Symbols are unique

// Global Symbol registry
const globalSymbol = Symbol.for("app.id");
const sameSymbol = Symbol.for("app.id");
console.log(globalSymbol === sameSymbol); // true
```

#### 7. **BigInt** (ES2020) - Large integers
```javascript
const bigNumber = 1234567890123456789012345678901234567890n;
const alsoBig = BigInt("1234567890123456789012345678901234567890");

console.log(typeof bigNumber); // "bigint"
console.log(bigNumber + 1n); // Works
// console.log(bigNumber + 1); // Error: cannot mix BigInt and Number
```

### Reference Data Types

#### 1. **Object** - Collection of key-value pairs
```javascript
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    isStudent: false,
    address: {
        street: "123 Main St",
        city: "New York"
    },
    hobbies: ["reading", "coding", "gaming"],
    greet: function() {
        return `Hello, I'm ${this.firstName}`;
    }
};

console.log(typeof person); // "object"
console.log(person.firstName); // "John" (dot notation)
console.log(person["lastName"]); // "Doe" (bracket notation)
console.log(person.greet()); // "Hello, I'm John"
```

#### 2. **Array** - Ordered list of values
```javascript
const fruits = ["apple", "banana", "orange"];
const mixedArray = [1, "hello", true, { name: "John" }, [1, 2, 3]];

console.log(typeof fruits); // "object"
console.log(Array.isArray(fruits)); // true
console.log(fruits[0]); // "apple"
console.log(fruits.length); // 3
```

#### 3. **Function** - Callable object
```javascript
function sayHello(name) {
    return `Hello, ${name}!`;
}

const greet = function(name) {
    return `Hi, ${name}!`;
};

const arrowGreet = (name) => `Hey, ${name}!`;

console.log(typeof sayHello); // "function"
console.log(sayHello("Alice")); // "Hello, Alice!"
```

## 🔄 Type Conversion & Coercion

### Explicit Type Conversion
```javascript
// String to Number
let str = "123";
let num = Number(str); // 123
let parsedInt = parseInt("123px"); // 123
let parsedFloat = parseFloat("123.45"); // 123.45

// Number to String
let num2 = 456;
let str2 = String(num2); // "456"
let str3 = num2.toString(); // "456"
let str4 = 456 + ""; // "456" (implicit)

// Boolean Conversion
let truthy = Boolean(1); // true
let falsy = Boolean(0); // false
let explicitTrue = !!1; // true (double NOT operator)

// Special conversions
console.log(Number("")); // 0
console.log(Number(" ")); // 0
console.log(Number("123abc")); // NaN
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number(true)); // 1
console.log(Number(false)); // 0
```

### Implicit Type Coercion
```javascript
// String coercion
console.log("5" + 3); // "53" (string concatenation)
console.log(5 + "3"); // "53"
console.log("5" - 3); // 2 (string converted to number)
console.log("5" * "2"); // 10

// Boolean in context
if ("hello") { // "hello" is truthy
    console.log("This will run");
}

// Loose equality (==) does type coercion
console.log(5 == "5"); // true
console.log(0 == false); // true
console.log(null == undefined); // true
console.log("" == 0); // true

// Strict equality (===) does NOT do type coercion
console.log(5 === "5"); // false
console.log(0 === false); // false
console.log(null === undefined); // false
```

## 🏆 Best Practices

### 1. Variable Naming Conventions
```javascript
// ✅ Good naming
const MAX_RETRIES = 3;
let userName = "john_doe";
let isLoggedIn = true;
let itemCount = 0;

// ❌ Bad naming
const a = 3; // Too vague
let temp = "user"; // Meaningless
let flag = true; // What does it flag?
```

### 2. Declaration Guidelines
```javascript
// ✅ Good practices
const API_URL = "https://api.example.com"; // Constants in UPPER_CASE
let isLoading = false; // Variables in camelCase
let userPreferences = {}; // Descriptive names

// Declare at the top of scope
function processData(data) {
    const MAX_ITEMS = 100;
    let processedCount = 0;
    let results = [];
    
    // ... rest of function
}

// ❌ Avoid
var oldStyle = "don't use var";
let a, b, c; // Multiple declarations on one line
```

### 3. Type Safety Tips
```javascript
// Always initialize variables
let counter = 0; // ✅ Good
let total; // ❌ Avoid (undefined)

// Use strict equality (===) by default
if (userAge === 18) { // ✅ Good
    // ...
}

if (userAge == "18") { // ❌ Avoid (loose equality)
    // ...
}

// Check types explicitly
function processInput(input) {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    // Process string
}
```

## 🚨 Common Pitfalls

### 1. Hoisting Confusion
```javascript
// ❌ Problematic
console.log(x); // undefined (not ReferenceError)
var x = 5;

// ✅ Solution
let y;
console.log(y); // undefined
y = 5;

// Or better
const z = 5;
console.log(z); // 5
```

### 2. Reassigning Constants
```javascript
// ❌ Error
const PI = 3.14159;
PI = 3.14; // TypeError: Assignment to constant variable

// ✅ Workaround for objects/arrays
const config = { theme: "dark" };
config.theme = "light"; // ✅ Allowed (mutation)
config = { theme: "light" }; // ❌ Not allowed (reassignment)
```

### 3. Type Coercion Surprises
```javascript
// Surprising results
console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0 (in some contexts)
console.log({} + {}); // "[object Object][object Object]"

console.log(true + true); // 2
console.log(true == 1); // true
console.log(true === 1); // false

// Solution: Be explicit
const total = Number(price) + Number(tax);
const message = String(value1) + String(value2);
```

## 🧪 Exercises

### Exercise 1: Variable Declaration Practice
```javascript
// Complete the following variable declarations
// 1. Declare a constant for the gravitational constant (9.8 m/s²)
// 2. Declare a variable for a user's email (initially empty)
// 3. Declare a boolean variable to track if a user is active
// 4. Declare an array of favorite colors
// 5. Declare an object representing a book

// Your code here:
```

### Exercise 2: Type Conversion Challenge
```javascript
// Convert between types as specified
let strNumber = "123";
let numValue = 456;
let truthyValue = "hello";
let falsyValue = "";

// 1. Convert strNumber to a number
// 2. Convert numValue to a string
// 3. Convert truthyValue to boolean
// 4. Convert falsyValue to boolean
// 5. Check if "5" == 5 and "5" === 5

// Your code here:
```

### Exercise 3: Real-world Scenario
```javascript
// Create variables for an e-commerce shopping cart
// 1. Store the cart total (starts at 0)
// 2. Store if the cart is empty (boolean)
// 3. Store available payment methods (array)
// 4. Store shipping address (object with properties)
// 5. Store discount percentage (constant)

// Your code here:
```

## 📊 Self-Assessment Checklist

- [ ] I can declare variables using `let`, `const`, and `var`
- [ ] I understand the differences between primitive and reference types
- [ ] I can perform explicit type conversions
- [ ] I understand type coercion in JavaScript
- [ ] I follow naming conventions and best practices
- [ ] I can identify common pitfalls and avoid them
- [ ] I completed all exercises successfully

## 🔗 Additional Resources

### 📚 Documentation
- [MDN: Variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables)
- [MDN: Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [JavaScript.info: Variables](https://javascript.info/variables)

### 🎥 Video Tutorials
- [Variables & Data Types Crash Course](https://youtu.be/9aG0N1_4CJ8)
- [JavaScript Type System Explained](https://youtu.be/v2ifWcnQs6M)

### 🎯 Practice Platforms
- [freeCodeCamp: JavaScript Variables](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/)
- [Codecademy: Variables & Data Types](https://www.codecademy.com/learn/introduction-to-javascript)

---

<div align="center">

**✅ Completed this section?**  
**[Continue to Operators & Expressions](../operators/README.md) →**

---

*"Programming is the art of telling another human what one wants the computer to do." - Donald Knuth*

</div>

---

**Section Last Updated:** January 2026  
**Next Review Date:** 3 months  
**Confidence Level:** (Rate yourself: 1-5) ⭐⭐⭐⭐⭐

---

<div align="center">

[![Practice Exercises](https://img.shields.io/badge/📝_Practice_Exercises-blue?style=for-the-badge)](../../exercises/)
[![Take Quiz](https://img.shields.io/badge/🧪_Take_Quiz-green?style=for-the-badge)](../../quizzes/quiz-1.md)

</div>
