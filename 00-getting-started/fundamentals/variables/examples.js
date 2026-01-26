// ============================================
// VARIABLES & DATA TYPES - COMPREHENSIVE EXAMPLES
// ============================================

console.log("🎯 VARIABLES & DATA TYPES EXAMPLES");
console.log("==================================\n");

// ========================
// 1. VARIABLE DECLARATION
// ========================

console.log("1. VARIABLE DECLARATION");
console.log("=======================\n");

// Using let (block-scoped, reassignable)
console.log("🔹 Using 'let':");
{
    let counter = 0;
    console.log(`Initial counter: ${counter}`);
    
    counter = 10; // Reassignment allowed
    console.log(`After reassignment: ${counter}`);
    
    // Block scope demonstration
    let blockVariable = "I'm inside a block";
    console.log(`Inside block: ${blockVariable}`);
}
// console.log(blockVariable); // Would throw ReferenceError

// Using const (block-scoped, constant reference)
console.log("\n🔹 Using 'const':");
const MAX_USERS = 100;
const API_KEY = "sk_test_123456789";
console.log(`Max users: ${MAX_USERS}`);
console.log(`API Key: ${API_KEY}`);

// const with objects and arrays (mutation allowed)
const user = {
    name: "John",
    age: 30
};
user.age = 31; // ✅ Allowed - modifying property
console.log(`Updated user age: ${user.age}`);

const colors = ["red", "green"];
colors.push("blue"); // ✅ Allowed - modifying array
console.log(`Colors array: ${colors}`);

// Using var (function-scoped, legacy - avoid in modern JS)
console.log("\n🔹 Using 'var' (legacy):");
function varExample() {
    if (true) {
        var functionScoped = "I'm function scoped";
        console.log(`Inside if block: ${functionScoped}`);
    }
    console.log(`Outside if block: ${functionScoped}`); // Still accessible
}
varExample();

// ======================
// 2. PRIMITIVE DATA TYPES
// ======================

console.log("\n\n2. PRIMITIVE DATA TYPES");
console.log("======================\n");

// String
console.log("🔹 String Type:");
const firstName = "John";
const lastName = 'Doe';
const greeting = `Hello, ${firstName} ${lastName}!`; // Template literal
const multiLine = `This is
a multi-line
string`;

console.log(`First Name: ${firstName}`);
console.log(`Greeting: ${greeting}`);
console.log(`Type of firstName: ${typeof firstName}`);
console.log(`String length: ${firstName.length}`);
console.log(`Uppercase: ${firstName.toUpperCase()}`);
console.log(`Character at index 1: ${firstName.charAt(1)}`);

// Number
console.log("\n🔹 Number Type:");
const integer = 42;
const decimal = 3.14159;
const scientific = 1.23e4; // 12300
const hex = 0xFF; // 255
const binary = 0b1010; // 10
const octal = 0o10; // 8

console.log(`Integer: ${integer}`);
console.log(`Decimal: ${decimal}`);
console.log(`Scientific: ${scientific}`);
console.log(`Hexadecimal 0xFF: ${hex}`);
console.log(`Binary 0b1010: ${binary}`);
console.log(`Octal 0o10: ${octal}`);

// Special number values
console.log("\n🔹 Special Number Values:");
console.log(`Positive Infinity: ${Infinity}`);
console.log(`Negative Infinity: ${-Infinity}`);
console.log(`Not a Number: ${NaN}`);
console.log(`Type of NaN: ${typeof NaN}`);
console.log(`Is NaN equal to NaN? ${NaN === NaN}`); // false!
console.log(`Check if value is NaN: ${Number.isNaN(NaN)}`);

// Number methods
console.log("\n🔹 Number Methods:");
const price = 19.99;
console.log(`Fixed to 2 decimals: ${price.toFixed(2)}`);
console.log(`Precision to 3 digits: ${price.toPrecision(3)}`);
console.log(`Exponential notation: ${price.toExponential(1)}`);
console.log(`Locale string: ${price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);

// Boolean
console.log("\n🔹 Boolean Type:");
const isActive = true;
const hasPermission = false;
const isGreater = 10 > 5;

console.log(`Is active: ${isActive}`);
console.log(`Has permission: ${hasPermission}`);
console.log(`Is 10 > 5: ${isGreater}`);
console.log(`Type of isActive: ${typeof isActive}`);

// Truthy and Falsy values
console.log("\n🔹 Truthy and Falsy Values:");
const falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];
const truthyValues = [true, 1, -1, "hello", [], {}, function() {}, 42, "0"];

console.log("Falsy values (convert to false):");
falsyValues.forEach(val => {
    console.log(`  Boolean(${JSON.stringify(val)}) = ${Boolean(val)}`);
});

console.log("\nTruthy values (convert to true):");
truthyValues.forEach(val => {
    console.log(`  Boolean(${JSON.stringify(val)}) = ${Boolean(val)}`);
});

// Undefined and Null
console.log("\n🔹 Undefined and Null:");
let undefinedVar;
const nullVar = null;
const empty = undefined;

console.log(`Undefined variable: ${undefinedVar}`);
console.log(`Null variable: ${nullVar}`);
console.log(`Type of undefined: ${typeof undefinedVar}`);
console.log(`Type of null: ${typeof nullVar}`); // Historical bug: returns "object"
console.log(`undefined == null: ${undefined == null}`);
console.log(`undefined === null: ${undefined === null}`);

// Symbol (ES6)
console.log("\n🔹 Symbol Type (ES6+):");
const id = Symbol("id");
const uniqueKey = Symbol("unique");
const userWithSymbol = {
    name: "Alice",
    [id]: 12345,
    [uniqueKey]: "secret"
};

console.log(`Symbol description: ${id.description}`);
console.log(`User with symbol property:`, userWithSymbol);
console.log(`Access symbol property: ${userWithSymbol[id]}`);

// Global symbols
const globalSym1 = Symbol.for("app.version");
const globalSym2 = Symbol.for("app.version");
console.log(`Global symbols equal: ${globalSym1 === globalSym2}`);

// BigInt (ES2020)
console.log("\n🔹 BigInt Type (ES2020+):");
const bigNumber = 1234567890123456789012345678901234567890n;
const anotherBig = BigInt("999999999999999999999999");

console.log(`Big integer: ${bigNumber}`);
console.log(`Another big int: ${anotherBig}`);
console.log(`Type: ${typeof bigNumber}`);

// Operations with BigInt
console.log(`Addition: ${bigNumber + 1n}`);
console.log(`Multiplication: ${bigNumber * 2n}`);
console.log(`Division: ${bigNumber / 2n}`);

// ===========================
// 3. REFERENCE DATA TYPES
// ===========================

console.log("\n\n3. REFERENCE DATA TYPES");
console.log("======================\n");

// Object
console.log("🔹 Object Type:");
const employee = {
    // Properties
    firstName: "John",
    lastName: "Doe",
    age: 30,
    department: "Engineering",
    
    // Nested object
    address: {
        street: "123 Main St",
        city: "San Francisco",
        zipCode: "94107"
    },
    
    // Array property
    skills: ["JavaScript", "React", "Node.js"],
    
    // Method
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    
    // Computed property name
    ["emp" + "Id"]: "E12345"
};

console.log(`Employee object:`, employee);
console.log(`Dot notation: ${employee.firstName}`);
console.log(`Bracket notation: ${employee["lastName"]}`);
console.log(`Nested property: ${employee.address.city}`);
console.log(`Array property: ${employee.skills.join(", ")}`);
console.log(`Method call: ${employee.getFullName()}`);
console.log(`Computed property: ${employee.empId}`);

// Adding and deleting properties
employee.email = "john.doe@company.com";
employee.promote = function() {
    return `${this.getFullName()} has been promoted!`;
};
console.log(`Added email: ${employee.email}`);
console.log(`New method: ${employee.promote()}`);

delete employee.department;
console.log(`After deleting department:`, employee);

// Array
console.log("\n🔹 Array Type:");
const fruits = ["apple", "banana", "orange"];
const mixedArray = [
    1,
    "hello",
    true,
    { name: "John" },
    [1, 2, 3],
    function() { return "I'm a function in an array"; }
];

console.log(`Fruits array: ${fruits}`);
console.log(`Mixed array:`, mixedArray);
console.log(`Array length: ${fruits.length}`);
console.log(`First fruit: ${fruits[0]}`);
console.log(`Last fruit: ${fruits[fruits.length - 1]}`);

// Array methods
fruits.push("grape");
console.log(`After push: ${fruits}`);
fruits.pop();
console.log(`After pop: ${fruits}`);
fruits.unshift("strawberry");
console.log(`After unshift: ${fruits}`);

// Function
console.log("\n🔹 Function Type:");
// Function declaration
function add(a, b) {
    return a + b;
}

// Function expression
const multiply = function(a, b) {
    return a * b;
};

// Arrow function (ES6)
const divide = (a, b) => a / b;

console.log(`Function declaration: ${add(5, 3)}`);
console.log(`Function expression: ${multiply(5, 3)}`);
console.log(`Arrow function: ${divide(10, 2)}`);
console.log(`Type of function: ${typeof add}`);

// Function as object
function greet(name) {
    return `Hello, ${name}!`;
}

greet.customProperty = "I'm a property on a function";
console.log(`Function with property: ${greet.customProperty}`);

// ========================
// 4. TYPE CONVERSION
// ========================

console.log("\n\n4. TYPE CONVERSION & COERCION");
console.log("=============================\n");

// Explicit Conversion
console.log("🔹 Explicit Type Conversion:");

// String to Number
const strNum = "123.45";
console.log(`String to Number: ${Number(strNum)}`);
console.log(`Parse Int: ${parseInt(strNum)}`);
console.log(`Parse Float: ${parseFloat(strNum)}`);
console.log(`Unary plus: ${+strNum}`);

// Number to String
const num = 456;
console.log(`\nNumber to String: ${String(num)}`);
console.log(`ToString: ${num.toString()}`);
console.log(`Template literal: ${`${num}`}`);
console.log(`Concatenation: ${num + ""}`);

// Boolean Conversion
console.log("\nBoolean Conversion:");
console.log(`Boolean(1): ${Boolean(1)}`);
console.log(`Boolean(0): ${Boolean(0)}`);
console.log(`Boolean("hello"): ${Boolean("hello")}`);
console.log(`Boolean(""): ${Boolean("")}`);
console.log(`Double NOT: ${!!"hello"}`);

// Special conversions
console.log("\nSpecial Conversions:");
console.log(`Number(""): ${Number("")}`); // 0
console.log(`Number(" "): ${Number(" ")}`); // 0
console.log(`Number("123abc"): ${Number("123abc")}`); // NaN
console.log(`Number(null): ${Number(null)}`); // 0
console.log(`Number(undefined): ${Number(undefined)}`); // NaN
console.log(`Number(true): ${Number(true)}`); // 1
console.log(`Number(false): ${Number(false)}`); // 0
console.log(`Number([1]): ${Number([1])}`); // 1
console.log(`Number([1,2]): ${Number([1,2])}`); // NaN

// Implicit Coercion
console.log("\n🔹 Implicit Type Coercion:");
console.log(`String + Number: ${"5" + 3}`); // "53"
console.log(`Number + String: ${5 + "3"}`); // "53"
console.log(`String - Number: ${"5" - 3}`); // 2
console.log(`String * String: ${"5" * "2"}`); // 10
console.log(`Boolean + Number: ${true + 1}`); // 2
console.log(`Boolean + Boolean: ${true + false}`); // 1

// Loose vs Strict Equality
console.log("\n🔹 Equality Comparisons:");
console.log(`5 == "5": ${5 == "5"}`); // true (coercion)
console.log(`5 === "5": ${5 === "5"}`); // false (strict)
console.log(`0 == false: ${0 == false}`); // true
console.log(`0 === false: ${0 === false}`); // false
console.log(`null == undefined: ${null == undefined}`); // true
console.log(`null === undefined: ${null === undefined}`); // false
console.log(`"" == 0: ${"" == 0}`); // true
console.log(`"" === 0: ${"" === 0}`); // false

// ========================
// 5. BEST PRACTICES
// ========================

console.log("\n\n5. BEST PRACTICES & PATTERNS");
console.log("============================\n");

// Naming Conventions
console.log("🔹 Good Naming Practices:");

// Constants (UPPER_SNAKE_CASE)
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;
const API_BASE_URL = "https://api.example.com";

// Variables (camelCase)
let userName = "john_doe";
let isLoggedIn = false;
let itemCount = 0;
let userPreferences = {
    theme: "dark",
    language: "en"
};

// Boolean variables start with is/has/can/should
let isValid = true;
let hasPermission = false;
let canEdit = true;
let shouldUpdate = false;

console.log(`Constants: ${MAX_RETRY_COUNT}, ${API_BASE_URL}`);
console.log(`Variables: ${userName}, ${isLoggedIn}, ${itemCount}`);

// Variable Declaration Patterns
console.log("\n🔹 Declaration Patterns:");

// Group related variables
let x = 0, y = 0, z = 0; // ❌ Avoid (hard to debug)

// ✅ Prefer separate declarations
let positionX = 0;
let positionY = 0;
let positionZ = 0;

// Declare at the top of scope
function processOrder(order) {
    // Declare all variables first
    const TAX_RATE = 0.08;
    let subtotal = 0;
    let taxAmount = 0;
    let total = 0;
    let discountApplied = false;
    
    // Then use them
    subtotal = calculateSubtotal(order.items);
    
    if (order.couponCode) {
        discountApplied = applyDiscount(order, TAX_RATE);
    }
    
    taxAmount = subtotal * TAX_RATE;
    total = subtotal + taxAmount;
    
    return { subtotal, taxAmount, total, discountApplied };
}

// Type Checking Patterns
console.log("\n🔹 Type Safety Patterns:");

function safeAdd(a, b) {
    // Check types explicitly
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Both arguments must be numbers');
    }
    
    // Check for NaN
    if (Number.isNaN(a) || Number.isNaN(b)) {
        throw new Error('Arguments cannot be NaN');
    }
    
    // Check for infinity
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        throw new Error('Arguments must be finite numbers');
    }
    
    return a + b;
}

try {
    console.log(`Safe add: ${safeAdd(5, 3)}`);
    console.log(`Safe add with string: ${safeAdd(5, "3")}`); // Throws error
} catch (error) {
    console.log(`Error: ${error.message}`);
}

// Default Values Pattern
console.log("\n🔹 Default Values:");

function createUser(options = {}) {
    const defaults = {
        name: "Anonymous",
        age: 18,
        isActive: true,
        preferences: {}
    };
    
    // Merge defaults with provided options
    return { ...defaults, ...options };
}

const user1 = createUser();
const user2 = createUser({ name: "Alice", age: 25 });
console.log(`Default user:`, user1);
console.log(`Custom user:`, user2);

// ========================
// 6. COMMON PITFALLS
// ========================

console.log("\n\n6. COMMON PITFALLS TO AVOID");
console.log("===========================\n");

// Pitfall 1: Variable Hoisting
console.log("🔹 Pitfall 1: Hoisting Confusion");

// ❌ Problematic
console.log(`Before declaration (var): ${hoistedVar}`); // undefined
var hoistedVar = "I'm hoisted";

// ✅ Solution
let properVar;
console.log(`Before declaration (let): ${properVar}`); // undefined
properVar = "Properly declared";

// Pitfall 2: Global Variables
console.log("\n🔹 Pitfall 2: Accidental Globals");

function createCounter() {
    // ❌ Accidental global (without var/let/const)
    count = 0;
    
    // ✅ Proper local variable
    let localCount = 0;
    
    return function() {
        count++;
        localCount++;
        console.log(`Global: ${count}, Local: ${localCount}`);
    };
}

const counter = createCounter();
counter(); // Global: 1, Local: 1
counter(); // Global: 2, Local: 1 (local resets each call)

// Pitfall 3: Type Coercion Surprises
console.log("\n🔹 Pitfall 3: Type Coercion Surprises");

const surprisingResults = [
    [] + [],          // ""
    [] + {},          // "[object Object]"
    {} + [],          // 0 (in console)
    true + true,      // 2
    "foo" + + "bar",  // "fooNaN"
    0.1 + 0.2,        // 0.30000000000000004
    null > 0,         // false
    null == 0,        // false
    null >= 0,        // true
];

console.log("Surprising coercion results:");
surprisingResults.forEach((result, i) => {
    console.log(`  ${i + 1}. ${result}`);
});

// Pitfall 4: Mutable const
console.log("\n🔹 Pitfall 4: Const Doesn't Mean Immutable");

const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

config.timeout = 10000; // ✅ Allowed (mutation)
// config = {}; // ❌ Not allowed (reassignment)

console.log(`Config after mutation:`, config);

// ========================
// 7. REAL-WORLD EXAMPLES
// ========================

console.log("\n\n7. REAL-WORLD APPLICATIONS");
console.log("==========================\n");

// E-commerce Example
console.log("🔹 E-commerce Product System:");

const product = {
    id: "P12345",
    name: "Wireless Headphones",
    price: 99.99,
    currency: "USD",
    inStock: true,
    features: ["Noise Cancelling", "Bluetooth 5.0", "20h Battery"],
    specifications: {
        weight: "250g",
        color: "Black",
        warranty: "2 years"
    },
    
    formatPrice() {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.currency
        }).format(this.price);
    },
    
    checkAvailability(quantity = 1) {
        return this.inStock ? `${quantity} available` : "Out of stock";
    }
};

console.log(`Product: ${product.name}`);
console.log(`Formatted Price: ${product.formatPrice()}`);
console.log(`Availability: ${product.checkAvailability(5)}`);
console.log(`Features: ${product.features.join(", ")}`);

// User Authentication Example
console.log("\n🔹 User Authentication System:");

function createUserSession() {
    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
    let sessionStart = Date.now();
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 3;
    
    return {
        user: null,
        
        login(username, password) {
            if (loginAttempts >= MAX_ATTEMPTS) {
                throw new Error("Too many login attempts. Account locked.");
            }
            
            // Simulate authentication
            const isValid = username === "admin" && password === "password123";
            
            if (isValid) {
                this.user = {
                    username,
                    role: "admin",
                    loginTime: new Date().toISOString()
                };
                sessionStart = Date.now();
                loginAttempts = 0;
                return true;
            } else {
                loginAttempts++;
                return false;
            }
        },
        
        logout() {
            this.user = null;
            sessionStart = 0;
        },
        
        isSessionValid() {
            if (!this.user) return false;
            
            const currentTime = Date.now();
            const sessionAge = currentTime - sessionStart;
            
            return sessionAge < SESSION_TIMEOUT;
        },
        
        getSessionInfo() {
            return {
                user: this.user,
                attemptsRemaining: MAX_ATTEMPTS - loginAttempts,
                sessionAge: Date.now() - sessionStart
            };
        }
    };
}

const session = createUserSession();
console.log(`Login attempt 1: ${session.login("admin", "wrong")}`);
console.log(`Login attempt 2: ${session.login("admin", "password123")}`);
console.log(`Session valid: ${session.isSessionValid()}`);
console.log(`Session info:`, session.getSessionInfo());

// ============================================
// SUMMARY & KEY TAKEAWAYS
// ============================================

console.log("\n\n📊 SUMMARY & KEY TAKEAWAYS");
console.log("==========================\n");

const keyTakeaways = [
    "✅ Use `const` by default, `let` when reassignment is needed",
    "✅ Avoid `var` in modern JavaScript",
    "✅ JavaScript has 7 primitive types and 3 reference types",
    "✅ Understand truthy/falsy values for conditional logic",
    "✅ Use strict equality (===) unless you need type coercion",
    "✅ Follow naming conventions: CONSTANTS, camelCase variables",
    "✅ Always declare variables before use",
    "✅ Be aware of type coercion in operations",
    "✅ Check types explicitly when needed",
    "✅ Use descriptive variable names for better readability"
];

console.log("Key Takeaways:");
keyTakeaways.forEach((takeaway, index) => {
    console.log(`${index + 1}. ${takeaway}`);
});

console.log("\n🎯 Practice Exercises:");
console.log("1. Create variables for a weather application");
console.log("2. Implement type conversion functions");
console.log("3. Build a simple shopping cart system");

console.log("\n🚀 Next Steps:");
console.log("1. Review operators and expressions");
console.log("2. Practice with the provided exercises");
console.log("3. Test your knowledge with the quiz");

console.log("\n" + "=".repeat(50));
console.log("END OF VARIABLES & DATA TYPES EXAMPLES");
console.log("=".repeat(50));
