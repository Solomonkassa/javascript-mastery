# 🔧 Operators & Expressions

<div align="center">

![Operators](https://img.shields.io/badge/Topic-Operators-blue?style=for-the-badge)
![Expressions](https://img.shields.io/badge/SubTopic-Expressions-green?style=for-the-badge)
![Estimated Time](https://img.shields.io/badge/Time-3_hours-orange?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Difficulty-⭐⭐☆☆☆-yellow?style=for-the-badge)

**Mastering Calculations, Comparisons, and Logical Operations in JavaScript**

</div>

## 📚 Table of Contents
1. [Introduction to Operators](#-introduction-to-operators)
2. [Arithmetic Operators](#-arithmetic-operators)
3. [Assignment Operators](#-assignment-operators)
4. [Comparison Operators](#-comparison-operators)
5. [Logical Operators](#-logical-operators)
6. [Bitwise Operators](#-bitwise-operators)
7. [Special Operators](#-special-operators)
8. [Operator Precedence](#-operator-precedence)
9. [Best Practices](#-best-practices)
10. [Common Pitfalls](#-common-pitfalls)
11. [Exercises](#-exercises)

## 🎯 Learning Objectives

By the end of this section, you will be able to:
✅ Perform calculations using arithmetic operators  
✅ Assign and modify values with assignment operators  
✅ Compare values using comparison operators  
✅ Combine conditions with logical operators  
✅ Understand bitwise operations  
✅ Use special operators like ternary and typeof  
✅ Apply operator precedence correctly  
✅ Write efficient and readable expressions  

## 📝 Introduction to Operators

Operators are symbols that perform operations on values (operands). They are the building blocks of expressions in JavaScript.

### What is an Expression?
An expression is any valid unit of code that resolves to a value. Every expression is composed of:
- **Operands**: The values/variables being operated on
- **Operators**: The symbols performing the operation

```javascript
// Simple expression
5 + 3  // Operands: 5, 3 | Operator: +

// Complex expression
(a * b) + (c / d) > 100 && isValid
```

### Operator Categories
JavaScript operators can be categorized by:
1. **Number of Operands**:
   - Unary (1 operand): `-x`, `!isTrue`
   - Binary (2 operands): `a + b`, `x > y`
   - Ternary (3 operands): `condition ? trueValue : falseValue`

2. **Function**:
   - Arithmetic: `+`, `-`, `*`, `/`
   - Comparison: `==`, `===`, `>`, `<`
   - Logical: `&&`, `||`, `!`
   - Assignment: `=`, `+=`, `-=`
   - Bitwise: `&`, `|`, `^`
   - Special: `typeof`, `instanceof`, `?.`

## ➕ Arithmetic Operators

Perform mathematical operations on numbers (or convert operands to numbers).

### Basic Arithmetic Operators

```javascript
// Addition (+)
console.log(5 + 3);      // 8
console.log("Hello" + " " + "World"); // "Hello World" (string concatenation)

// Subtraction (-)
console.log(10 - 4);     // 6
console.log(-5);         // -5 (unary negation)

// Multiplication (*)
console.log(6 * 7);      // 42
console.log("Hello" * 3); // NaN (can't multiply string)

// Division (/)
console.log(10 / 2);     // 5
console.log(10 / 3);     // 3.3333333333333335
console.log(10 / 0);     // Infinity

// Remainder/Modulus (%)
console.log(10 % 3);     // 1
console.log(15 % 4);     // 3
console.log(8 % 2);      // 0 (even number check)

// Exponentiation (**)
console.log(2 ** 3);     // 8 (2 to the power of 3)
console.log(10 ** 2);    // 100
console.log(4 ** 0.5);   // 2 (square root)
```

### Increment/Decrement Operators
```javascript
let count = 5;

// Post-increment: returns value, then increments
console.log(count++);    // 5
console.log(count);      // 6

// Pre-increment: increments, then returns value
let total = 10;
console.log(++total);    // 11
console.log(total);      // 11

// Post-decrement: returns value, then decrements
let items = 8;
console.log(items--);    // 8
console.log(items);      // 7

// Pre-decrement: decrements, then returns value
let stock = 15;
console.log(--stock);    // 14
console.log(stock);      // 14
```

### Unary Plus and Minus
```javascript
// Unary plus (+) - converts to number
console.log(+true);      // 1
console.log(+false);     // 0
console.log(+null);      // 0
console.log(+undefined); // NaN
console.log(+"123");     // 123
console.log(+"12.34");   // 12.34

// Unary minus (-) - converts to number and negates
console.log(-true);      // -1
console.log(-"456");     // -456
```

## 🏷️ Assignment Operators

Assign values to variables and modify them.

### Basic Assignment (=)
```javascript
let x = 10;     // Assign 10 to x
let y = x;      // Assign value of x to y
let z = x + y;  // Assign result of expression to z

// Multiple assignment
let a, b, c;
a = b = c = 5;  // All get value 5
console.log(a, b, c); // 5 5 5
```

### Compound Assignment Operators
```javascript
let value = 10;

// Addition assignment
value += 5;     // value = value + 5
console.log(value); // 15

// Subtraction assignment
value -= 3;     // value = value - 3
console.log(value); // 12

// Multiplication assignment
value *= 2;     // value = value * 2
console.log(value); // 24

// Division assignment
value /= 4;     // value = value / 4
console.log(value); // 6

// Remainder assignment
value %= 4;     // value = value % 4
console.log(value); // 2

// Exponentiation assignment
value **= 3;    // value = value ** 3
console.log(value); // 8

// Works with strings for +=
let greeting = "Hello";
greeting += " World!";
console.log(greeting); // "Hello World!"
```

### Destructuring Assignment (ES6+)
```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Object destructuring
const person = { name: "John", age: 30, city: "NYC" };
const { name, age } = person;
console.log(name); // "John"
console.log(age);  // 30

// With default values
const { country = "USA" } = person;
console.log(country); // "USA"

// Renaming variables
const { name: userName, age: userAge } = person;
console.log(userName); // "John"
console.log(userAge);  // 30
```

## ⚖️ Comparison Operators

Compare values and return a boolean (true/false).

### Equality Operators
```javascript
// Strict equality (===) - NO type coercion
console.log(5 === 5);        // true
console.log(5 === "5");      // false (different types)
console.log(0 === false);    // false
console.log(null === undefined); // false
console.log(NaN === NaN);    // false (special case)

// Strict inequality (!==) - NO type coercion
console.log(5 !== "5");      // true
console.log(5 !== 5);        // false

// Loose equality (==) - WITH type coercion
console.log(5 == "5");       // true (string converted to number)
console.log(0 == false);     // true (boolean converted to number)
console.log(null == undefined); // true (special rule)
console.log("" == 0);        // true (empty string converted to 0)

// Loose inequality (!=) - WITH type coercion
console.log(5 != "5");       // false
console.log(5 != 6);         // true
```

### Relational Operators
```javascript
// Greater than (>)
console.log(10 > 5);     // true
console.log("b" > "a");  // true (lexicographic comparison)
console.log("10" > 5);   // true (string converted to number)

// Less than (<)
console.log(3 < 7);      // true
console.log("apple" < "banana"); // true

// Greater than or equal (>=)
console.log(10 >= 10);   // true
console.log(5 >= 10);    // false

// Less than or equal (<=)
console.log(5 <= 5);     // true
console.log(10 <= 5);    // false
```

### Special Comparison Cases
```javascript
// Comparing with NaN
console.log(NaN === NaN);        // false (always!)
console.log(NaN == NaN);         // false
console.log(Number.isNaN(NaN));  // true (correct way to check)

// Comparing null and undefined
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(null == 0);          // false (special rule)
console.log(undefined == 0);     // false

// Comparing objects (reference comparison)
const obj1 = { x: 1 };
const obj2 = { x: 1 };
const obj3 = obj1;

console.log(obj1 === obj2);  // false (different references)
console.log(obj1 === obj3);  // true (same reference)
console.log(obj1 == obj2);   // false

// Comparing arrays
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
console.log(arr1 === arr2);  // false
console.log(arr1 == "1,2,3"); // true (array converted to string)
```

## 🎭 Logical Operators

Combine or invert boolean values.

### Basic Logical Operators
```javascript
// Logical AND (&&) - returns first falsy or last truthy
console.log(true && true);      // true
console.log(true && false);     // false
console.log(false && true);     // false
console.log(5 && 10);           // 10 (both truthy, returns last)
console.log(0 && 10);           // 0 (first falsy)
console.log("Hello" && null);   // null (first truthy, second falsy)

// Logical OR (||) - returns first truthy or last falsy
console.log(true || false);     // true
console.log(false || true);     // true
console.log(false || false);    // false
console.log(5 || 10);           // 5 (first truthy)
console.log(0 || 10);           // 10 (first falsy, second truthy)
console.log(null || undefined); // undefined (both falsy)

// Logical NOT (!) - inverts boolean value
console.log(!true);             // false
console.log(!false);            // true
console.log(!0);                // true (0 is falsy)
console.log(!5);                // false (5 is truthy)
console.log(!!"hello");         // true (double NOT converts to boolean)
```

### Short-Circuit Evaluation
```javascript
// AND short-circuits at first falsy value
function expensiveOperation() {
    console.log("This won't run!");
    return true;
}
console.log(false && expensiveOperation()); // false (function never called)

// OR short-circuits at first truthy value
const config = null;
const defaultConfig = { theme: "dark" };
const activeConfig = config || defaultConfig;
console.log(activeConfig); // { theme: "dark" }

// Practical examples
const user = null;
const username = user && user.name; // null (safely handles null user)
console.log(username);

const isLoggedIn = true;
const redirectUrl = isLoggedIn && "/dashboard";
console.log(redirectUrl); // "/dashboard"
```

### Nullish Coalescing Operator (??) - ES2020
```javascript
// Returns right operand only when left is null or undefined
console.log(null ?? "default");     // "default"
console.log(undefined ?? "fallback"); // "fallback"
console.log(0 ?? "default");        // 0 (NOT null/undefined)
console.log("" ?? "default");       // "" (NOT null/undefined)
console.log(false ?? true);         // false (NOT null/undefined)

// Difference from ||
console.log(0 || 10);    // 10 (0 is falsy)
console.log(0 ?? 10);    // 0 (0 is not null/undefined)

console.log("" || "hello"); // "hello" (empty string is falsy)
console.log("" ?? "hello"); // "" (empty string is not null/undefined)

// Practical use case
const settings = {
    theme: null,
    fontSize: 0,
    animations: false
};

const theme = settings.theme ?? "dark";       // "dark"
const fontSize = settings.fontSize ?? 16;     // 0 (preserved)
const animations = settings.animations ?? true; // false (preserved)
```

### Optional Chaining (?. ) - ES2020
```javascript
const user = {
    profile: {
        name: "John",
        address: {
            city: "NYC",
            zipCode: "10001"
        }
    }
};

// Safe property access
console.log(user.profile?.name);           // "John"
console.log(user.profile?.contact?.email); // undefined (no error)
console.log(user.settings?.theme);         // undefined

// Safe method calls
const admin = {
    getPermissions: () => ["read", "write"]
};
console.log(admin.getPermissions?.());     // ["read", "write"]
console.log(user.getPermissions?.());      // undefined (no error)

// Safe array access
const arr = null;
console.log(arr?.[0]);                     // undefined
console.log(arr?.length);                  // undefined

// Combined with nullish coalescing
const theme = user.settings?.theme ?? "dark";
console.log(theme); // "dark"
```

## 🔢 Bitwise Operators

Operate on binary representations of numbers.

### Basic Bitwise Operators
```javascript
// Bitwise AND (&)
console.log(5 & 3);    // 1 (0101 & 0011 = 0001)
console.log(15 & 9);   // 9 (1111 & 1001 = 1001)

// Bitwise OR (|)
console.log(5 | 3);    // 7 (0101 | 0011 = 0111)
console.log(15 | 9);   // 15 (1111 | 1001 = 1111)

// Bitwise XOR (^) - exclusive OR
console.log(5 ^ 3);    // 6 (0101 ^ 0011 = 0110)
console.log(15 ^ 9);   // 6 (1111 ^ 1001 = 0110)

// Bitwise NOT (~) - inverts bits
console.log(~5);       // -6 (~0101 = 1010 in two's complement)
console.log(~0);       // -1

// Left shift (<<)
console.log(5 << 1);   // 10 (0101 << 1 = 1010)
console.log(5 << 2);   // 20 (0101 << 2 = 10100)

// Right shift (>>) - preserves sign
console.log(10 >> 1);  // 5 (1010 >> 1 = 0101)
console.log(-10 >> 1); // -5

// Zero-fill right shift (>>>) - fills with zeros
console.log(10 >>> 1);  // 5
console.log(-10 >>> 1); // 2147483643 (large positive number)
```

### Practical Bitwise Applications
```javascript
// 1. Checking if number is odd/even
function isOdd(n) {
    return (n & 1) === 1;
}
console.log(isOdd(5));  // true
console.log(isOdd(8));  // false

// 2. Swapping numbers without temp variable
let a = 5, b = 10;
a = a ^ b;
b = a ^ b;
a = a ^ b;
console.log(a, b); // 10 5

// 3. Checking if power of two
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(18)); // false

// 4. Creating permission flags
const PERMISSIONS = {
    READ:   1 << 0,  // 0001
    WRITE:  1 << 1,  // 0010
    DELETE: 1 << 2,  // 0100
    ADMIN:  1 << 3   // 1000
};

let userPermissions = PERMISSIONS.READ | PERMISSIONS.WRITE; // 0011

// Check permission
const canRead = (userPermissions & PERMISSIONS.READ) !== 0;
const canDelete = (userPermissions & PERMISSIONS.DELETE) !== 0;

console.log(canRead);   // true
console.log(canDelete); // false

// Add permission
userPermissions |= PERMISSIONS.DELETE;

// Remove permission
userPermissions &= ~PERMISSIONS.WRITE;
```

## 🎪 Special Operators

### Ternary (Conditional) Operator
```javascript
// Syntax: condition ? expressionIfTrue : expressionIfFalse
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// Nested ternary (use sparingly)
const score = 85;
const grade = score >= 90 ? "A" :
              score >= 80 ? "B" :
              score >= 70 ? "C" :
              score >= 60 ? "D" : "F";
console.log(grade); // "B"

// Returning different types
const user = { name: "John", isAdmin: true };
const message = user.isAdmin 
    ? `Welcome admin ${user.name}` 
    : `Welcome user ${user.name}`;
console.log(message);
```

### typeof Operator
```javascript
console.log(typeof 42);           // "number"
console.log(typeof "hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (historical bug)
console.log(typeof {});           // "object"
console.log(typeof []);           // "object"
console.log(typeof function(){}); // "function"
console.log(typeof Symbol());     // "symbol"
console.log(typeof 123n);         // "bigint"

// Type checking function
function getType(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (Number.isNaN(value)) return "NaN";
    return typeof value;
}

console.log(getType(null));      // "null"
console.log(getType([1, 2, 3])); // "array"
console.log(getType(NaN));       // "NaN"
```

### instanceof Operator
```javascript
// Checks if object is instance of constructor
class User {}
class Admin extends User {}

const user = new User();
const admin = new Admin();

console.log(user instanceof User);     // true
console.log(admin instanceof Admin);   // true
console.log(admin instanceof User);    // true (inheritance)
console.log(user instanceof Admin);    // false

// Works with built-in types
console.log([] instanceof Array);      // true
console.log({} instanceof Object);     // true
console.log(/regex/ instanceof RegExp); // true

// Limitations with primitives
console.log("hello" instanceof String); // false
console.log(new String("hello") instanceof String); // true
```

### delete Operator
```javascript
// Removes property from object
const person = {
    name: "John",
    age: 30,
    city: "NYC"
};

console.log(person.age); // 30
delete person.age;
console.log(person.age); // undefined
console.log("age" in person); // false

// Cannot delete variables or functions
let x = 10;
// delete x; // SyntaxError in strict mode

// Works on array elements (creates sparse array)
const arr = [1, 2, 3, 4, 5];
delete arr[2];
console.log(arr);        // [1, 2, empty, 4, 5]
console.log(arr.length); // 5 (length unchanged)
console.log(arr[2]);     // undefined
```

### void Operator
```javascript
// Evaluates expression and returns undefined
console.log(void 0);           // undefined
console.log(void (5 + 3));     // undefined
console.log(void "hello");     // undefined

// Common use: Immediately invoked function expressions
void function() {
    console.log("IIFE executed");
}();

// Prevent navigation in anchor tags (legacy)
// <a href="javascript:void(0)">Click me</a>
```

## 📊 Operator Precedence

Determines the order operations are performed.

### Precedence Table (Highest to Lowest)
```javascript
// Grouping              ()
// Member Access        . []
// Function Call        ()
// new (with args)      new
// Postfix              ++ --
// Prefix               ++ -- + - ! ~ typeof void delete
// Exponentiation       **
// Multiplicative       * / %
// Additive             + -
// Bitwise Shift        << >> >>>
// Relational           < <= > >= in instanceof
// Equality             == != === !==
// Bitwise AND          &
// Bitwise XOR          ^
// Bitwise OR           |
// Logical AND          &&
// Logical OR           ||
// Conditional          ?:
// Assignment           = += -= etc.
// Comma                ,
```

### Examples of Precedence
```javascript
// Multiplication before addition
console.log(2 + 3 * 4);      // 14 (not 20)
console.log((2 + 3) * 4);    // 20 (parentheses change order)

// Comparison before logical operators
console.log(5 > 3 && 2 < 4); // true (evaluates as (5 > 3) && (2 < 4))

// Assignment has very low precedence
let a, b;
a = b = 5 + 3;  // Evaluates as: a = (b = (5 + 3))
console.log(a, b); // 8 8

// Complex expression with proper grouping
const result = 2 + 3 * 4 > 10 && 5 - 2 === 3;
// Equivalent to: ((2 + (3 * 4)) > 10) && ((5 - 2) === 3)
console.log(result); // true
```

### Associativity
When operators have the same precedence, associativity determines direction:
- **Left-to-right**: `a + b + c` = `(a + b) + c`
- **Right-to-left**: `a = b = c` = `a = (b = c)`

```javascript
// Exponentiation is right-associative
console.log(2 ** 3 ** 2);    // 512 (not 64) = 2 ** (3 ** 2)

// Ternary operator is right-associative
const x = 1, y = 2, z = 3;
const result = x > y ? x : y > z ? y : z;
// Equivalent to: x > y ? x : (y > z ? y : z)
console.log(result); // 3
```

## 🏆 Best Practices

### 1. Use Strict Equality
```javascript
// ✅ Good
if (value === 5) { /* ... */ }
if (status !== "active") { /* ... */ }

// ❌ Avoid
if (value == 5) { /* ... */ }
if (status != "active") { /* ... */ }
```

### 2. Parentheses for Clarity
```javascript
// ✅ Clear intent
const total = (price * quantity) + tax;
const isValid = (age >= 18) && (hasLicense === true);

// ❌ Ambiguous
const total = price * quantity + tax; // What's the order?
```

### 3. Avoid Side Effects in Expressions
```javascript
// ❌ Confusing
let count = 0;
const result = count++ + ++count; // Hard to understand

// ✅ Clear
let count = 0;
count++;
const incremented = count + 1;
const result = (count - 1) + incremented;
```

### 4. Use Modern Operators
```javascript
// ✅ Modern and safe
const username = user?.profile?.name ?? "Anonymous";
const config = settings || defaultSettings; // Use ?? if 0/false should be preserved

// ❌ Old style
const username = user && user.profile && user.profile.name || "Anonymous";
```

### 5. Break Complex Expressions
```javascript
// ❌ Hard to read
const result = a > b ? (c < d ? e : f) : (g > h ? i : j);

// ✅ Clear
let intermediate;
if (a > b) {
    intermediate = c < d ? e : f;
} else {
    intermediate = g > h ? i : j;
}
const result = intermediate;
```

## 🚨 Common Pitfalls

### 1. Floating Point Precision
```javascript
console.log(0.1 + 0.2); // 0.30000000000000004 (not 0.3!)
console.log(0.1 + 0.2 === 0.3); // false!

// Solution: Use tolerance or decimal libraries
function areEqual(a, b, tolerance = 0.000001) {
    return Math.abs(a - b) < tolerance;
}
console.log(areEqual(0.1 + 0.2, 0.3)); // true
```

### 2. Type Coercion Surprises
```javascript
console.log([] + []); // "" (empty string)
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0 (in console)
console.log(true + true); // 2
console.log("5" - "2"); // 3
console.log("5" + "2"); // "52"
```

### 3. Assignment vs Comparison
```javascript
let x = 5;
if (x = 10) { // ❌ Assignment, not comparison!
    console.log("x is 10"); // Always executes
}

// Solution: Use ===
if (x === 10) { // ✅ Correct comparison
    console.log("x is 10");
}
```

### 4. Short-Circuit Evaluation
```javascript
// ❌ Function with side effects in logical expression
function logAndReturn(value) {
    console.log(value);
    return value;
}

// If first condition is true, second never runs
if (true || logAndReturn("test")) {
    console.log("Short-circuited!");
}

// ✅ Be aware of side effects
const shouldLog = false;
if (shouldLog) {
    logAndReturn("test");
}
```

## 🧪 Exercises

### Exercise 1: Arithmetic Operations
```javascript
// Calculate the following:
// 1. Area of a circle (πr²) with radius 5
// 2. Compound interest: A = P(1 + r/n)^(nt)
//    P=1000, r=0.05, n=12, t=10
// 3. BMI calculation: weight(kg) / height(m)²
//    weight=70, height=1.75
```

### Exercise 2: Comparison Challenges
```javascript
// Predict the results:
console.log(0 == false);
console.log("" == false);
console.log(null == undefined);
console.log([] == false);
console.log([1,2] == "1,2");
console.log(NaN === NaN);
```

### Exercise 3: Logical Puzzles
```javascript
// Simplify these expressions:
// 1. !(a && b) === ?
// 2. !(a || b) === ?
// 3. a && (b || c) === ?
// 4. (a && b) || (a && c) === ?
```

### Exercise 4: Real-world Scenarios
```javascript
// 1. Create a discount calculator:
//    - 10% off for orders > $100
//    - 20% off for VIP customers
//    - Cannot combine discounts
// 2. Validate user input:
//    - Username: 3-20 chars, alphanumeric
//    - Email: valid format
//    - Age: 13-120
// 3. Calculate shipping cost:
//    - Free for orders > $50
//    - $5 for standard (3-5 days)
//    - $10 for express (1-2 days)
```

## 📊 Self-Assessment Checklist

- [ ] I can perform all arithmetic operations
- [ ] I understand the difference between =, ==, and ===
- [ ] I can use logical operators effectively
- [ ] I understand short-circuit evaluation
- [ ] I can use modern operators (??, ?., **)
- [ ] I understand operator precedence
- [ ] I can avoid common pitfalls
- [ ] I can write clear and efficient expressions

## 🔗 Additional Resources

### 📚 Documentation
- [MDN: Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [MDN: Operator Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- [JavaScript.info: Operators](https://javascript.info/operators)

### 🎥 Video Tutorials
- [JavaScript Operators Explained](https://youtu.be/I8LelbhsCqo)
- [Operator Precedence Deep Dive](https://youtu.be/HgCxM-7dV_E)

### 🎯 Practice Platforms
- [freeCodeCamp: JavaScript Operators](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/)
- [Exercism: JavaScript Operators Track](https://exercism.org/tracks/javascript/concepts/operators)

---

<div align="center">

**✅ Completed this section?**  
**[Continue to Control Flow](../control-flow/README.md) →**

---

*"Good code is its own best documentation. As you're about to add a comment, ask yourself, 'How can I improve the code so that this comment isn't needed?'" - Steve McConnell*

</div>

---

**Section Last Updated:** January 2026  
**Next Review Date:** 3 months  
**Confidence Level:** (Rate yourself: 1-5) ⭐⭐⭐⭐⭐

---

<div align="center">

[![Practice Exercises](https://img.shields.io/badge/📝_Practice_Examples-blue?style=for-the-badge)](examples.js)
[![Take Quiz](https://img.shields.io/badge/🧪_Module_Quiz-green?style=for-the-badge)](../../quizzes/quiz-1.md)

</div>
