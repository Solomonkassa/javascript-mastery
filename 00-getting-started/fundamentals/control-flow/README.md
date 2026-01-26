# 🎮 Control Flow

<div align="center">

![Control Flow](https://img.shields.io/badge/Topic-Control_Flow-blue?style=for-the-badge)
![Conditionals & Loops](https://img.shields.io/badge/SubTopic-Conditionals_&_Loops-green?style=for-the-badge)
![Estimated Time](https://img.shields.io/badge/Time-4_hours-orange?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Difficulty-⭐⭐⭐☆☆-yellow?style=for-the-badge)

**Mastering Program Flow: Conditionals, Loops, and Branching in JavaScript**

</div>

## 📚 Table of Contents
1. [Introduction to Control Flow](#-introduction-to-control-flow)
2. [Conditional Statements](#-conditional-statements)
3. [Switch Statements](#-switch-statements)
4. [Loops](#-loops)
5. [Loop Control Statements](#-loop-control-statements)
6. [Error Handling](#-error-handling)
7. [Pattern Matching](#-pattern-matching)
8. [Best Practices](#-best-practices)
9. [Common Pitfalls](#-common-pitfalls)
10. [Performance Considerations](#-performance-considerations)
11. [Exercises](#-exercises)

## 🎯 Learning Objectives

By the end of this section, you will be able to:
✅ Make decisions with `if/else` statements  
✅ Handle multiple conditions with `switch`  
✅ Repeat actions with different loop types  
✅ Control loop execution with `break` and `continue`  
✅ Handle errors gracefully with `try/catch/finally`  
✅ Write efficient and readable control flow  
✅ Use modern pattern matching techniques  
✅ Optimize loop performance  

## 📝 Introduction to Control Flow

Control flow determines the order in which statements are executed in a program. It's how your program makes decisions and repeats actions.

### Why Control Flow Matters?
- **Decision Making**: Execute different code based on conditions
- **Repetition**: Perform tasks multiple times efficiently
- **Error Handling**: Gracefully handle unexpected situations
- **Program Logic**: Create complex business logic
- **User Interaction**: Respond to user input dynamically

### Control Flow Types
```javascript
// 1. Sequential (default - top to bottom)
const x = 5;
const y = 10;
const sum = x + y;

// 2. Conditional (if/else, switch)
if (x > y) {
    console.log("x is greater");
} else {
    console.log("y is greater or equal");
}

// 3. Iterative (loops)
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// 4. Exception (try/catch)
try {
    riskyOperation();
} catch (error) {
    console.error("Operation failed:", error);
}
```

## 🔀 Conditional Statements

### if Statement
```javascript
// Basic if statement
if (condition) {
    // Code executes if condition is truthy
}

// Example
const temperature = 25;
if (temperature > 30) {
    console.log("It's hot outside!");
}

// With boolean conversion
const user = { name: "John", age: 25 };
if (user.age) { // 25 is truthy
    console.log(`User age: ${user.age}`);
}
```

### if...else Statement
```javascript
// if...else
if (condition) {
    // Executes if condition is truthy
} else {
    // Executes if condition is falsy
}

// Example
const age = 17;
if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("You cannot vote yet.");
}

// Multiple conditions
const score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}
```

### else if Ladder
```javascript
// Multiple else if statements
const hour = new Date().getHours();
let greeting;

if (hour < 12) {
    greeting = "Good morning!";
} else if (hour < 18) {
    greeting = "Good afternoon!";
} else if (hour < 22) {
    greeting = "Good evening!";
} else {
    greeting = "Good night!";
}

console.log(greeting);
```

### Nested Conditionals
```javascript
// Nested if statements
function canDrive(age, hasLicense, isSober) {
    if (age >= 16) {
        if (hasLicense) {
            if (isSober) {
                return "You can drive!";
            } else {
                return "You cannot drive while intoxicated!";
            }
        } else {
            return "You need a driver's license!";
        }
    } else {
        return "You're too young to drive!";
    }
}

// Flattened version (preferred)
function canDriveBetter(age, hasLicense, isSober) {
    if (age < 16) return "You're too young to drive!";
    if (!hasLicense) return "You need a driver's license!";
    if (!isSober) return "You cannot drive while intoxicated!";
    return "You can drive!";
}
```

### Conditional (Ternary) Operator
```javascript
// Syntax: condition ? expressionIfTrue : expressionIfFalse
const isMember = true;
const discount = isMember ? 0.1 : 0; // 10% discount for members

// Multiple conditions
const score = 85;
const grade = score >= 90 ? "A" :
              score >= 80 ? "B" :
              score >= 70 ? "C" :
              score >= 60 ? "D" : "F";

// Returning different types
const user = { isAdmin: true };
const message = user.isAdmin 
    ? { type: "admin", text: "Welcome Admin!" }
    : { type: "user", text: "Welcome User!" };

// Execute functions conditionally
const shouldLog = true;
shouldLog ? console.log("Debug info") : null;
```

## 🔄 Switch Statements

### Basic Switch
```javascript
// Basic switch statement
switch (expression) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    default:
        // Code if no cases match
}

// Example: Day of week
const day = new Date().getDay();
let dayName;

switch (day) {
    case 0:
        dayName = "Sunday";
        break;
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    default:
        dayName = "Invalid day";
}

console.log(`Today is ${dayName}`);
```

### Fall-through Behavior
```javascript
// Multiple cases sharing code (fall-through)
const month = new Date().getMonth();
let season;

switch (month) {
    case 11: // December
    case 0:  // January
    case 1:  // February
        season = "Winter";
        break;
    case 2:  // March
    case 3:  // April
    case 4:  // May
        season = "Spring";
        break;
    case 5:  // June
    case 6:  // July
    case 7:  // August
        season = "Summer";
        break;
    case 8:  // September
    case 9:  // October
    case 10: // November
        season = "Autumn";
        break;
    default:
        season = "Unknown";
}

console.log(`Current season: ${season}`);
```

### Switch with Expressions
```javascript
// Switch can evaluate expressions
const score = 85;
let grade;

switch (true) {
    case score >= 90:
        grade = "A";
        break;
    case score >= 80:
        grade = "B";
        break;
    case score >= 70:
        grade = "C";
        break;
    case score >= 60:
        grade = "D";
        break;
    default:
        grade = "F";
}

console.log(`Score: ${score}, Grade: ${grade}`);
```

### Switch vs if/else Comparison
```javascript
// When to use switch:
// - Comparing single value against multiple constants
// - More readable for many conditions
// - Better performance for many cases (usually)

// When to use if/else:
// - Complex conditions with logical operators
// - Range comparisons
// - Type checking
// - Few conditions
```

## 🔁 Loops

### for Loop
```javascript
// Traditional for loop
for (initialization; condition; increment) {
    // Code to repeat
}

// Example: Count from 1 to 5
for (let i = 1; i <= 5; i++) {
    console.log(`Count: ${i}`);
}

// Countdown
for (let i = 10; i > 0; i--) {
    console.log(`T-minus ${i}...`);
}
console.log("Blast off!");

// Multiple variables
for (let i = 0, j = 10; i < j; i++, j--) {
    console.log(`i=${i}, j=${j}`);
}

// Infinite loop (danger!)
// for (;;) {
//     console.log("This will run forever!");
// }
```

### while Loop
```javascript
// while loop - checks condition before execution
while (condition) {
    // Code executes while condition is truthy
}

// Example: Guessing game
let secretNumber = Math.floor(Math.random() * 10) + 1;
let guess = 0;
let attempts = 0;

while (guess !== secretNumber) {
    guess = Math.floor(Math.random() * 10) + 1;
    attempts++;
    console.log(`Attempt ${attempts}: Guessed ${guess}`);
}

console.log(`Found the number ${secretNumber} in ${attempts} attempts!`);

// Example: User input simulation
let userInput = "";
const expectedPassword = "secret123";

while (userInput !== expectedPassword) {
    // Simulate user input
    userInput = Math.random() > 0.7 ? "secret123" : "wrong";
    console.log(userInput === expectedPassword ? "Access granted!" : "Try again");
}
```

### do...while Loop
```javascript
// do...while - executes at least once
do {
    // Code executes first
} while (condition); // Then checks condition

// Example: Menu system
let choice;
do {
    console.log("\n=== MENU ===");
    console.log("1. View Profile");
    console.log("2. Edit Settings");
    console.log("3. Logout");
    console.log("0. Exit");
    
    // Simulate user choice
    choice = Math.floor(Math.random() * 4);
    console.log(`User selected: ${choice}`);
    
    switch (choice) {
        case 1:
            console.log("Showing profile...");
            break;
        case 2:
            console.log("Opening settings...");
            break;
        case 3:
            console.log("Logging out...");
            break;
        case 0:
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid choice!");
    }
} while (choice !== 0);
```

### for...in Loop
```javascript
// for...in - iterates over object properties
for (variable in object) {
    // Code for each property
}

// Example: Iterate object properties
const person = {
    name: "John",
    age: 30,
    city: "NYC",
    occupation: "Developer"
};

console.log("Person properties:");
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Only enumerable properties
const car = {
    make: "Toyota",
    model: "Camry",
    year: 2020
};

// Adding non-enumerable property
Object.defineProperty(car, "vin", {
    value: "1HGCM82633A123456",
    enumerable: false
});

console.log("\nCar properties (only enumerable):");
for (const prop in car) {
    console.log(`${prop}: ${car[prop]}`);
}

// Check hasOwnProperty for safety
console.log("\nOnly own properties (not inherited):");
for (const prop in car) {
    if (car.hasOwnProperty(prop)) {
        console.log(`${prop}: ${car[prop]}`);
    }
}
```

### for...of Loop (ES6+)
```javascript
// for...of - iterates over iterable values
for (variable of iterable) {
    // Code for each value
}

// Example: Array iteration
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
    console.log(fruit);
}

// String iteration
const message = "Hello";
for (const char of message) {
    console.log(char); // H, e, l, l, o
}

// Set iteration
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
for (const num of uniqueNumbers) {
    console.log(num); // 1, 2, 3
}

// Map iteration
const userMap = new Map([
    ["john", { age: 30 }],
    ["jane", { age: 25 }]
]);

for (const [username, data] of userMap) {
    console.log(`${username}: ${data.age} years old`);
}

// NodeList iteration (DOM elements)
// document.querySelectorAll(".item").forEach(item => { ... })
```

### Array Iteration Methods
```javascript
// Modern array methods (often better than loops)
const numbers = [1, 2, 3, 4, 5];

// forEach - execute function for each element
numbers.forEach((num, index) => {
    console.log(`numbers[${index}] = ${num}`);
});

// map - transform each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - select elements that pass test
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce - accumulate values
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15
```

## ⏹️ Loop Control Statements

### break Statement
```javascript
// break - exit loop immediately
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        console.log("Found 5, breaking!");
        break;
    }
    console.log(i);
}
// Output: 1, 2, 3, 4, "Found 5, breaking!"

// Break in nested loops
outer: for (let i = 1; i <= 3; i++) {
    console.log(`Outer loop: ${i}`);
    for (let j = 1; j <= 3; j++) {
        if (i === 2 && j === 2) {
            console.log("Breaking both loops!");
            break outer;
        }
        console.log(`  Inner loop: ${j}`);
    }
}

// Practical example: Search in array
const users = [
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
    { id: 3, name: "Charlie", active: true }
];

let foundUser = null;
for (const user of users) {
    if (user.name === "Bob") {
        foundUser = user;
        break; // Stop searching
    }
}

console.log(foundUser ? `Found: ${foundUser.name}` : "User not found");
```

### continue Statement
```javascript
// continue - skip to next iteration
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        console.log("Skipping 3");
        continue;
    }
    console.log(i);
}
// Output: 1, 2, "Skipping 3", 4, 5

// Process only valid data
const data = [1, null, 3, undefined, 5, "", 7];

for (const item of data) {
    if (item === null || item === undefined || item === "") {
        continue; // Skip invalid values
    }
    console.log(`Processing: ${item}`);
}

// Skip even numbers
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue; // Skip even numbers
    }
    console.log(`Odd number: ${i}`);
}

// Practical example: Filter and process
const transactions = [
    { amount: 100, type: "deposit", status: "completed" },
    { amount: 50, type: "withdrawal", status: "pending" },
    { amount: 200, type: "deposit", status: "failed" },
    { amount: 75, type: "withdrawal", status: "completed" }
];

let totalCompleted = 0;
for (const transaction of transactions) {
    if (transaction.status !== "completed") {
        continue; // Skip non-completed transactions
    }
    if (transaction.type === "deposit") {
        totalCompleted += transaction.amount;
    } else {
        totalCompleted -= transaction.amount;
    }
}

console.log(`Total completed balance: $${totalCompleted}`);
```

## 🛡️ Error Handling

### try...catch
```javascript
// Basic error handling
try {
    // Code that might throw an error
    riskyOperation();
} catch (error) {
    // Handle the error
    console.error("An error occurred:", error.message);
}

// Example: JSON parsing
const jsonString = '{ "name": "John", "age": 30 }';
try {
    const data = JSON.parse(jsonString);
    console.log("Parsed successfully:", data);
} catch (error) {
    console.error("Invalid JSON:", error.message);
}

// Multiple operations in try block
try {
    const user = getUser();
    const profile = getProfile(user.id);
    const settings = getSettings(user.id);
    console.log("All operations successful");
} catch (error) {
    console.error("Failed to load user data:", error.message);
}
```

### finally Block
```javascript
// finally - always executes
try {
    console.log("Trying operation...");
    // Some operation
    if (Math.random() > 0.5) {
        throw new Error("Random failure!");
    }
    console.log("Operation successful!");
} catch (error) {
    console.error("Operation failed:", error.message);
} finally {
    console.log("This always runs, success or failure");
}

// Practical example: Resource cleanup
let fileHandle = null;
try {
    // Simulate opening a file
    fileHandle = { id: 1, name: "data.txt" };
    console.log(`Opened file: ${fileHandle.name}`);
    
    // Simulate file operation
    if (Math.random() > 0.7) {
        throw new Error("File read error!");
    }
    
    console.log("File processed successfully");
} catch (error) {
    console.error("File operation failed:", error.message);
} finally {
    // Always close the file
    if (fileHandle) {
        console.log(`Closing file: ${fileHandle.name}`);
        fileHandle = null;
    }
}
```

### throw Statement
```javascript
// throw - create custom errors
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError("Both arguments must be numbers");
    }
    return a / b;
}

try {
    console.log(divide(10, 2));  // 5
    console.log(divide(10, 0));  // Throws error
} catch (error) {
    console.error("Calculation error:", error.message);
}

// Custom error classes
class ValidationError extends Error {
    constructor(field, message) {
        super(`Validation failed for ${field}: ${message}`);
        this.name = "ValidationError";
        this.field = field;
        this.timestamp = new Date().toISOString();
    }
}

function validateUser(user) {
    if (!user.name || user.name.trim() === "") {
        throw new ValidationError("name", "Name is required");
    }
    if (!user.email || !user.email.includes("@")) {
        throw new ValidationError("email", "Valid email is required");
    }
    if (user.age < 13) {
        throw new ValidationError("age", "Must be at least 13 years old");
    }
}

try {
    validateUser({ name: "", email: "invalid", age: 10 });
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(`${error.name}: ${error.message}`);
        console.error(`Field: ${error.field}, Time: ${error.timestamp}`);
    } else {
        console.error("Unknown error:", error);
    }
}
```

## 🎭 Pattern Matching (Modern JavaScript)

### Destructuring with Conditionals
```javascript
// Destructuring in conditionals
const response = {
    status: "success",
    data: { user: { name: "John", age: 30 } },
    error: null
};

// Traditional approach
if (response.status === "success" && response.data && response.data.user) {
    const user = response.data.user;
    console.log(`User: ${user.name}, Age: ${user.age}`);
}

// Modern approach with optional chaining and destructuring
if (response.status === "success") {
    const { data: { user } = {} } = response;
    if (user) {
        const { name, age } = user;
        console.log(`User: ${name}, Age: ${age}`);
    }
}

// Even more concise
const { data: { user: { name, age } = {} } = {} } = response;
if (name && age) {
    console.log(`User: ${name}, Age: ${age}`);
}
```

### Early Returns Pattern
```javascript
// Instead of nested if-else, use early returns
function processOrder(order) {
    // Guard clauses (early returns)
    if (!order) {
        return { error: "No order provided" };
    }
    
    if (!order.items || order.items.length === 0) {
        return { error: "Order has no items" };
    }
    
    if (order.total <= 0) {
        return { error: "Invalid order total" };
    }
    
    // Main logic (no nesting)
    const processedOrder = {
        ...order,
        status: "processed",
        processedAt: new Date(),
        orderId: generateOrderId()
    };
    
    return { success: true, order: processedOrder };
}

// Complex validation with early returns
function validateRegistration(user) {
    // Check required fields
    if (!user.username?.trim()) {
        return { valid: false, error: "Username is required" };
    }
    
    if (!user.email?.includes("@")) {
        return { valid: false, error: "Valid email is required" };
    }
    
    if (user.password?.length < 8) {
        return { valid: false, error: "Password must be at least 8 characters" };
    }
    
    // All validations passed
    return { valid: true, user: sanitizeUser(user) };
}
```

### Switch with Functions
```javascript
// Using functions with switch for cleaner code
const actions = {
    login: (user) => {
        console.log(`Logging in ${user.name}`);
        return { status: "logged_in", user };
    },
    
    logout: (user) => {
        console.log(`Logging out ${user.name}`);
        return { status: "logged_out" };
    },
    
    updateProfile: (user, data) => {
        console.log(`Updating profile for ${user.name}`);
        return { status: "updated", user: { ...user, ...data } };
    }
};

function handleAction(action, user, data = null) {
    switch (action) {
        case "login":
            return actions.login(user);
        case "logout":
            return actions.logout(user);
        case "updateProfile":
            return actions.updateProfile(user, data);
        default:
            throw new Error(`Unknown action: ${action}`);
    }
}

// Usage
const user = { id: 1, name: "John" };
const result = handleAction("login", user);
console.log(result);
```

## 🏆 Best Practices

### 1. Avoid Deep Nesting
```javascript
// ❌ Deeply nested (hard to read)
function processData(data) {
    if (data) {
        if (data.isValid) {
            if (data.values) {
                data.values.forEach(value => {
                    if (value > 0) {
                        console.log(value);
                    }
                });
            }
        }
    }
}

// ✅ Flatten with early returns/continues
function processDataBetter(data) {
    if (!data) return;
    if (!data.isValid) return;
    if (!data.values) return;
    
    data.values.forEach(value => {
        if (value <= 0) return; // continue in loops
        console.log(value);
    });
}
```

### 2. Use Descriptive Conditions
```javascript
// ❌ Magic numbers/strings
if (user.age > 18 && user.status === "A") {
    // ...
}

// ✅ Named constants
const MIN_AGE = 18;
const ACTIVE_STATUS = "active";

if (user.age >= MIN_AGE && user.status === ACTIVE_STATUS) {
    // ...
}

// ❌ Negated conditions (harder to understand)
if (!isNotValid) {
    // ...
}

// ✅ Positive conditions
if (isValid) {
    // ...
}
```

### 3. Prefer Array Methods Over Loops
```javascript
// ❌ Traditional loop
const numbers = [1, 2, 3, 4, 5];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
}

// ✅ Array methods (more declarative)
const doubledBetter = numbers.map(n => n * 2);

// ❌ Complex loop with conditions
const activeUsers = [];
for (const user of users) {
    if (user.isActive && user.age >= 18) {
        activeUsers.push(user);
    }
}

// ✅ Filter and map
const activeUsersBetter = users
    .filter(user => user.isActive && user.age >= 18)
    .map(user => ({ 
        name: user.name, 
        email: user.email 
    }));
```

### 4. Handle Errors Gracefully
```javascript
// ❌ Ignoring errors
try {
    riskyOperation();
} catch (error) {
    // Empty catch - silently fails
}

// ✅ Proper error handling
try {
    const result = await riskyOperation();
    return { success: true, data: result };
} catch (error) {
    console.error("Operation failed:", error);
    return { 
        success: false, 
        error: error.message,
        retryable: isRetryableError(error)
    };
} finally {
    cleanupResources();
}
```

### 5. Use Modern Patterns
```javascript
// ❌ Old school switch
let permission;
switch (user.role) {
    case "admin":
        permission = "full";
        break;
    case "editor":
        permission = "edit";
        break;
    default:
        permission = "view";
}

// ✅ Object lookup (cleaner)
const PERMISSIONS = {
    admin: "full",
    editor: "edit",
    viewer: "view"
};

const permission = PERMISSIONS[user.role] || "view";

// ❌ Complex if-else chain
if (type === "success") {
    color = "green";
} else if (type === "warning") {
    color = "yellow";
} else if (type === "error") {
    color = "red";
} else {
    color = "gray";
}

// ✅ Object mapping
const TYPE_COLORS = {
    success: "green",
    warning: "yellow",
    error: "red"
};

const color = TYPE_COLORS[type] || "gray";
```

## 🚨 Common Pitfalls

### 1. Infinite Loops
```javascript
// ❌ Missing increment
let i = 0;
while (i < 5) {
    console.log(i);
    // Forgot i++ - infinite loop!
}

// ✅ Always update loop condition
let j = 0;
while (j < 5) {
    console.log(j);
    j++;
}

// ❌ Bad condition
for (let i = 0; i >= 0; i++) { // Always true!
    console.log(i);
    if (i > 1000) break; // Safety break
}

// ✅ Clear termination condition
for (let i = 0; i < 100; i++) {
    console.log(i);
}
```

### 2. Assignment vs Comparison
```javascript
// ❌ Common typo
if (userStatus = "active") { // Assignment, not comparison!
    // Always executes, sets userStatus to "active"
}

// ✅ Always use ===
if (userStatus === "active") {
    // Correct comparison
}
```

### 3. Missing break in switch
```javascript
// ❌ Missing break causes fall-through
switch (day) {
    case 0:
        console.log("Sunday");
    case 1:
        console.log("Monday");
        // Forgot break - both logs execute!
}

// ✅ Always include break (unless intentional)
switch (day) {
    case 0:
        console.log("Sunday");
        break;
    case 1:
        console.log("Monday");
        break;
}

// ✅ Intentional fall-through (comment it!)
switch (month) {
    case 11: // December
    case 0:  // January
    case 1:  // February
        console.log("Winter");
        break; // Only one break needed
}
```

### 4. Modifying Arrays During Iteration
```javascript
// ❌ Modifying array while iterating
const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        numbers.splice(i, 1); // Changes array length!
        i--; // Need to adjust index
    }
}

// ✅ Work on a copy or iterate backwards
const numbersBetter = [1, 2, 3, 4, 5];
for (let i = numbersBetter.length - 1; i >= 0; i--) {
    if (numbersBetter[i] % 2 === 0) {
        numbersBetter.splice(i, 1);
    }
}

// ✅ Better: filter to create new array
const filteredNumbers = numbers.filter(n => n % 2 !== 0);
```

## ⚡ Performance Considerations

### 1. Loop Optimization
```javascript
// ❌ Recalculating length each iteration
const items = [/* large array */];
for (let i = 0; i < items.length; i++) {
    // items.length is recalculated every iteration
}

// ✅ Cache length
const itemsLength = items.length;
for (let i = 0; i < itemsLength; i++) {
    // Better performance
}

// ❌ Using for...in with arrays
const array = [/* large array */];
for (const index in array) {
    // Slow for arrays, use for...of or for loop
}

// ✅ Use for loop or for...of
for (let i = 0; i < array.length; i++) {
    // Fastest for arrays
}

for (const item of array) {
    // Clean and reasonably fast
}
```

### 2. Condition Ordering
```javascript
// ❌ Expensive check first
if (expensiveOperation() && simpleCheck) {
    // expensiveOperation always runs
}

// ✅ Cheap checks first (short-circuit)
if (simpleCheck && expensiveOperation()) {
    // expensiveOperation only runs if simpleCheck passes
}

// ❌ Common case last
if (rareCondition) {
    // Rare case
} else if (anotherRareCase) {
    // Another rare case
} else {
    // Common case (checked last)
}

// ✅ Common case first
if (commonCase) {
    // Checked first
} else if (rareCondition) {
    // Rare case
} else {
    // Other cases
}
```

### 3. Avoid Nested Loops When Possible
```javascript
// ❌ O(n²) nested loops
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Operations
    }
}

// ✅ Use data structures to avoid nesting
const lookup = {};
array1.forEach(item => {
    lookup[item.id] = item;
});

array2.forEach(item => {
    const match = lookup[item.id];
    if (match) {
        // Process match (O(n) instead of O(n²))
    }
});
```

## 🧪 Exercises

### Exercise 1: FizzBuzz
```javascript
// Write a program that prints numbers from 1 to 100:
// - For multiples of 3, print "Fizz"
// - For multiples of 5, print "Buzz"
// - For multiples of both 3 and 5, print "FizzBuzz"
// - Otherwise, print the number
```

### Exercise 2: Password Validator
```javascript
// Create a function that validates passwords:
// - At least 8 characters
// - Contains at least one uppercase letter
// - Contains at least one lowercase letter
// - Contains at least one number
// - Contains at least one special character (!@#$%^&*)
// Return validation result with specific error messages
```

### Exercise 3: Shopping Cart Calculator
```javascript
// Calculate shopping cart total with:
// - Apply discounts based on total amount
// - Add tax based on location
// - Apply coupon codes
// - Handle free shipping conditions
// - Validate inventory before checkout
```

### Exercise 4: Data Processor
```javascript
// Process an array of data with:
// - Filter invalid entries
// - Transform data format
// - Group by categories
// - Calculate statistics
// - Handle errors gracefully
// - Use appropriate loops and conditionals
```

## 📊 Self-Assessment Checklist

- [ ] I can write if/else statements with multiple conditions
- [ ] I understand switch statements and when to use them
- [ ] I can use all types of loops (for, while, do...while, for...of, for...in)
- [ ] I know when to use break and continue
- [ ] I can handle errors with try/catch/finally
- [ ] I write clean, readable control flow
- [ ] I avoid common pitfalls like infinite loops
- [ ] I optimize loops for performance
- [ ] I use modern patterns like early returns
- [ ] I can solve complex problems with proper control flow

## 🔗 Additional Resources

### 📚 Documentation
- [MDN: Control Flow and Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN: Loops and Iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [JavaScript.info: Conditional Branching](https://javascript.info/ifelse)

### 🎥 Video Tutorials
- [JavaScript Control Flow Masterclass](https://youtu.be/sBVbO2K3k2c)
- [Loops and Iteration Deep Dive](https://youtu.be/7QhX-7Uc3ro)

### 🎯 Practice Platforms
- [freeCodeCamp: JavaScript Algorithms](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
- [Codewars: Control Flow Katas](https://www.codewars.com/kata/search/javascript?q=control+flow)

---

<div align="center">

**✅ Completed this section?**  
**[Move to Module Exercises](../../exercises/) →**

---

*"First, solve the problem. Then, write the code." - John Johnson*

</div>

---

**Section Last Updated:** January 2026  
**Next Review Date:** 3 months  
**Confidence Level:** (Rate yourself: 1-5) ⭐⭐⭐⭐⭐

---

<div align="center">

[![Practice Examples](https://img.shields.io/badge/📝_Practice_Examples-blue?style=for-the-badge)](examples.js)
[![Try Exercises](https://img.shields.io/badge/🧪_Try_Exercises-green?style=for-the-badge)](exercises.js)

</div>
