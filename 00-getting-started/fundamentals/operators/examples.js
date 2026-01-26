// ============================================
// OPERATORS & EXPRESSIONS - COMPREHENSIVE EXAMPLES
// ============================================

console.log("🔧 OPERATORS & EXPRESSIONS EXAMPLES");
console.log("===================================\n");

// ==========================
// 1. ARITHMETIC OPERATORS
// ==========================

console.log("1. ARITHMETIC OPERATORS");
console.log("=======================\n");

// Basic Arithmetic
console.log("🔹 Basic Arithmetic Operations:");
console.log(`Addition: 5 + 3 = ${5 + 3}`);
console.log(`Subtraction: 10 - 4 = ${10 - 4}`);
console.log(`Multiplication: 6 * 7 = ${6 * 7}`);
console.log(`Division: 15 / 3 = ${15 / 3}`);
console.log(`Division with decimal: 10 / 3 = ${10 / 3}`);
console.log(`Remainder: 17 % 5 = ${17 % 5}`);
console.log(`Exponentiation: 2 ** 3 = ${2 ** 3}`);
console.log(`Square root using **: 16 ** 0.5 = ${16 ** 0.5}`);
console.log(`Cube root: 27 ** (1/3) = ${27 ** (1/3)}`);

// Unary Plus and Minus
console.log("\n🔹 Unary Operators:");
console.log(`Unary plus: +"123" = ${+"123"} (type: ${typeof +"123"})`);
console.log(`Unary plus boolean: +true = ${+true}`);
console.log(`Unary plus null: +null = ${+null}`);
console.log(`Unary plus undefined: +undefined = ${+undefined}`);
console.log(`Unary minus: -"456" = ${-"456"}`);
console.log(`Unary minus boolean: -false = ${-false}`);

// Increment/Decrement
console.log("\n🔹 Increment and Decrement:");
let counter = 5;
console.log(`Initial: counter = ${counter}`);
console.log(`Post-increment: counter++ = ${counter++} (now counter = ${counter})`);
console.log(`Pre-increment: ++counter = ${++counter} (now counter = ${counter})`);
console.log(`Post-decrement: counter-- = ${counter--} (now counter = ${counter})`);
console.log(`Pre-decrement: --counter = ${--counter} (now counter = ${counter})`);

// String Concatenation
console.log("\n🔹 String Operations:");
console.log(`String concatenation: "Hello" + " " + "World" = "${"Hello" + " " + "World"}"`);
console.log(`Mixed types: "Price: $" + 99.99 = "${"Price: $" + 99.99}"`);
console.log(`Number + string: 5 + "5" = "${5 + "5"}"`);
console.log(`String + number: "5" + 5 = "${"5" + 5}"`);
console.log(`Multiple concatenation: 1 + 2 + "3" = "${1 + 2 + "3"}" (left to right)`);
console.log(`String + boolean: "Value: " + true = "${"Value: " + true}"`);

// Special Number Cases
console.log("\n🔹 Special Number Cases:");
console.log(`Division by zero: 10 / 0 = ${10 / 0}`);
console.log(`Negative division by zero: -10 / 0 = ${-10 / 0}`);
console.log(`Zero divided by zero: 0 / 0 = ${0 / 0}`);
console.log(`Infinity operations: Infinity + 1 = ${Infinity + 1}`);
console.log(`Infinity - Infinity = ${Infinity - Infinity}`);
console.log(`Infinity * 0 = ${Infinity * 0}`);

// Floating Point Precision
console.log("\n🔹 Floating Point Precision Issues:");
console.log(`0.1 + 0.2 = ${0.1 + 0.2}`);
console.log(`0.1 + 0.2 === 0.3: ${0.1 + 0.2 === 0.3}`);
console.log(`0.3 - 0.1 = ${0.3 - 0.1}`);
console.log(`0.3 - 0.1 === 0.2: ${0.3 - 0.1 === 0.2}`);

// Fix floating point issues
function safeAdd(a, b) {
    const multiplier = Math.pow(10, Math.max(
        a.toString().split('.')[1]?.length || 0,
        b.toString().split('.')[1]?.length || 0
    ));
    return (a * multiplier + b * multiplier) / multiplier;
}
console.log(`Safe add: safeAdd(0.1, 0.2) = ${safeAdd(0.1, 0.2)}`);
console.log(`Safe add equals 0.3: ${safeAdd(0.1, 0.2) === 0.3}`);

// ==========================
// 2. ASSIGNMENT OPERATORS
// ==========================

console.log("\n\n2. ASSIGNMENT OPERATORS");
console.log("=====================\n");

// Basic Assignment
console.log("🔹 Basic Assignment:");
let x = 10;
let y = x;
let z = x + y * 2;
console.log(`x = ${x}, y = ${y}, z = ${z}`);

// Multiple Assignment
console.log("\n🔹 Multiple Assignment:");
let a, b, c;
a = b = c = 42;
console.log(`a = ${a}, b = ${b}, c = ${c}`);

// Compound Assignment
console.log("\n🔹 Compound Assignment Operators:");
let total = 100;
console.log(`Initial total: ${total}`);

total += 20; // total = total + 20
console.log(`After += 20: ${total}`);

total -= 30; // total = total - 30
console.log(`After -= 30: ${total}`);

total *= 2; // total = total * 2
console.log(`After *= 2: ${total}`);

total /= 4; // total = total / 4
console.log(`After /= 4: ${total}`);

total %= 6; // total = total % 6
console.log(`After %= 6: ${total}`);

total **= 3; // total = total ** 3
console.log(`After **= 3: ${total}`);

// String Compound Assignment
console.log("\n🔹 String Compound Assignment:");
let message = "Hello";
message += " World";
message += "!";
console.log(`Message: "${message}"`);

// Destructuring Assignment
console.log("\n🔹 Destructuring Assignment:");

// Array Destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(`Array: [${numbers}]`);
console.log(`First: ${first}, Second: ${second}, Rest: [${rest}]`);

// Swapping variables
let m = 5, n = 10;
console.log(`Before swap: m = ${m}, n = ${n}`);
[m, n] = [n, m];
console.log(`After swap: m = ${m}, n = ${n}`);

// Object Destructuring
const user = {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    address: {
        city: "New York",
        country: "USA"
    }
};

const { name: userName, age, email = "no-email@example.com", address: { city } } = user;
console.log(`User:`, user);
console.log(`Destructured: userName = "${userName}", age = ${age}, city = "${city}"`);
console.log(`Default email if missing: email = "${email}"`);

// Nested Destructuring
const company = {
    name: "TechCorp",
    employees: [
        { id: 1, name: "Alice", role: "Developer" },
        { id: 2, name: "Bob", role: "Designer" }
    ],
    locations: ["NYC", "SF", "London"]
};

const { 
    name: companyName, 
    employees: [{ name: firstEmployee }],
    locations: [primaryLocation]
} = company;

console.log(`Company: ${companyName}`);
console.log(`First employee: ${firstEmployee}`);
console.log(`Primary location: ${primaryLocation}`);

// ==========================
// 3. COMPARISON OPERATORS
// ==========================

console.log("\n\n3. COMPARISON OPERATORS");
console.log("======================\n");

// Strict Equality (===)
console.log("🔹 Strict Equality (===):");
console.log(`5 === 5: ${5 === 5}`);
console.log(`5 === "5": ${5 === "5"}`);
console.log(`true === 1: ${true === 1}`);
console.log(`false === 0: ${false === 0}`);
console.log(`null === undefined: ${null === undefined}`);
console.log(`NaN === NaN: ${NaN === NaN}`);
console.log(`[] === []: ${[] === []}`);
console.log(`{} === {}: ${{} === {}}`);

// Strict Inequality (!==)
console.log("\n🔹 Strict Inequality (!==):");
console.log(`5 !== "5": ${5 !== "5"}`);
console.log(`true !== 1: ${true !== 1}`);
console.log(`null !== undefined: ${null !== undefined}`);

// Loose Equality (==) - with type coercion
console.log("\n🔹 Loose Equality (==) with Type Coercion:");
console.log(`5 == "5": ${5 == "5"}`);
console.log(`true == 1: ${true == 1}`);
console.log(`false == 0: ${false == 0}`);
console.log(`null == undefined: ${null == undefined}`);
console.log(`"" == 0: ${"" == 0}`);
console.log(`"0" == false: ${"0" == false}`);
console.log(`[] == 0: ${[] == 0}`);
console.log(`[] == false: ${[] == false}`);
console.log(`[1,2] == "1,2": ${[1,2] == "1,2"}`);

// Loose Inequality (!=)
console.log("\n🔹 Loose Inequality (!=):");
console.log(`5 != "5": ${5 != "5"}`);
console.log(`true != 2: ${true != 2}`);

// Relational Operators
console.log("\n🔹 Relational Operators:");
console.log(`10 > 5: ${10 > 5}`);
console.log(`10 < 5: ${10 < 5}`);
console.log(`10 >= 10: ${10 >= 10}`);
console.log(`10 <= 9: ${10 <= 9}`);
console.log(`"apple" < "banana": ${"apple" < "banana"}`);
console.log(`"10" > 5: ${"10" > 5}`);
console.log(`"10" > "5": ${"10" > "5"}`); // String comparison!
console.log(`"abc" > "ab": ${"abc" > "ab"}`);

// Special Comparisons
console.log("\n🔹 Special Comparison Cases:");

// NaN comparisons
console.log(`\nNaN comparisons:`);
console.log(`NaN === NaN: ${NaN === NaN}`);
console.log(`NaN == NaN: ${NaN == NaN}`);
console.log(`Number.isNaN(NaN): ${Number.isNaN(NaN)}`);
console.log(`isNaN(NaN): ${isNaN(NaN)}`);
console.log(`isNaN("hello"): ${isNaN("hello")}`);
console.log(`Number.isNaN("hello"): ${Number.isNaN("hello")}`);

// null and undefined comparisons
console.log(`\nnull and undefined:`);
console.log(`null == undefined: ${null == undefined}`);
console.log(`null === undefined: ${null === undefined}`);
console.log(`null == 0: ${null == 0}`);
console.log(`null > 0: ${null > 0}`);
console.log(`null >= 0: ${null >= 0}`);
console.log(`undefined == 0: ${undefined == 0}`);

// Object comparisons
console.log(`\nObject comparisons:`);
const obj1 = { x: 1 };
const obj2 = { x: 1 };
const obj3 = obj1;
console.log(`obj1 === obj2: ${obj1 === obj2}`);
console.log(`obj1 === obj3: ${obj1 === obj3}`);
console.log(`obj1 == obj2: ${obj1 == obj2}`);
console.log(`obj1.x === obj2.x: ${obj1.x === obj2.x}`);

// Array comparisons
console.log(`\nArray comparisons:`);
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = arr1;
console.log(`arr1 === arr2: ${arr1 === arr2}`);
console.log(`arr1 === arr3: ${arr1 === arr3}`);
console.log(`arr1 == "1,2,3": ${arr1 == "1,2,3"}`);
console.log(`arr1.toString() === "1,2,3": ${arr1.toString() === "1,2,3"}`);

// ==========================
// 4. LOGICAL OPERATORS
// ==========================

console.log("\n\n4. LOGICAL OPERATORS");
console.log("===================\n");

// Basic Logical Operations
console.log("🔹 Basic Logical Operations:");
console.log(`true && true: ${true && true}`);
console.log(`true && false: ${true && false}`);
console.log(`false && true: ${false && true}`);
console.log(`false && false: ${false && false}`);
console.log(`true || true: ${true || true}`);
console.log(`true || false: ${true || false}`);
console.log(`false || true: ${false || true}`);
console.log(`false || false: ${false || false}`);
console.log(`!true: ${!true}`);
console.log(`!false: ${!false}`);

// Truthy/Falsy in Logical Context
console.log("\n🔹 Truthy/Falsy Values in Logical Operations:");
console.log(`5 && 10: ${5 && 10} (both truthy, returns last)`);
console.log(`0 && 10: ${0 && 10} (first falsy, returns it)`);
console.log(`"hello" && null: ${"hello" && null} (first truthy, second falsy)`);
console.log(`5 || 10: ${5 || 10} (first truthy, returns it)`);
console.log(`0 || 10: ${0 || 10} (first falsy, second truthy)`);
console.log(`null || undefined: ${null || undefined} (both falsy, returns last)`);
console.log(`!!"hello": ${!!"hello"} (convert to boolean)`);
console.log(`!!0: ${!!0}`);
console.log(`!!"": ${!!""}`);

// Short-Circuit Evaluation
console.log("\n🔹 Short-Circuit Evaluation:");

function expensiveOperation(name) {
    console.log(`  [Called] expensiveOperation("${name}")`);
    return true;
}

console.log(`\nAND short-circuit (false && expensiveOperation):`);
console.log(`Result: ${false && expensiveOperation("test1")}`);

console.log(`\nOR short-circuit (true || expensiveOperation):`);
console.log(`Result: ${true || expensiveOperation("test2")}`);

console.log(`\nNo short-circuit (true && expensiveOperation):`);
console.log(`Result: ${true && expensiveOperation("test3")}`);

console.log(`\nNo short-circuit (false || expensiveOperation):`);
console.log(`Result: ${false || expensiveOperation("test4")}`);

// Practical Short-Circuit Patterns
console.log("\n🔹 Practical Short-Circuit Patterns:");

// Default values
const config = null;
const defaultConfig = { theme: "dark", fontSize: 14 };
const activeConfig = config || defaultConfig;
console.log(`Default config:`, activeConfig);

// Safe property access
const userProfile = { name: "Alice" };
const username = userProfile && userProfile.name;
console.log(`Safe username access: ${username}`);

// Conditional execution
const isDebugMode = true;
isDebugMode && console.log("Debug mode is enabled");

// Nullish Coalescing Operator (??)
console.log("\n🔹 Nullish Coalescing Operator (??):");
console.log(`null ?? "default": ${null ?? "default"}`);
console.log(`undefined ?? "fallback": ${undefined ?? "fallback"}`);
console.log(`0 ?? "default": ${0 ?? "default"}`);
console.log(`"" ?? "hello": ${"" ?? "hello"}`);
console.log(`false ?? true: ${false ?? true}`);
console.log(`NaN ?? "default": ${NaN ?? "default"}`);

// Comparison with OR (||)
console.log(`\nComparison with ||:`);
console.log(`0 || 10: ${0 || 10} (0 is falsy)`);
console.log(`0 ?? 10: ${0 ?? 10} (0 is not null/undefined)`);
console.log(`"" || "hello": ${"" || "hello"}`);
console.log(`"" ?? "hello": ${"" ?? "hello"}`);

// Optional Chaining (?.)
console.log("\n🔹 Optional Chaining (?.):");
const order = {
    id: 123,
    customer: {
        name: "John",
        address: {
            city: "NYC",
            zipCode: "10001"
        }
    },
    items: [
        { id: 1, name: "Product A", price: 29.99 },
        { id: 2, name: "Product B", price: 49.99 }
    ]
};

console.log(`Customer city: ${order.customer?.address?.city}`);
console.log(`Non-existent property: ${order.payment?.method}`);
console.log(`Array access: ${order.items?.[0]?.name}`);
console.log(`Method call: ${order.calculateTotal?.()}`);
console.log(`Combined with ??: ${order.payment?.method ?? "Credit Card"}`);

// Complex Optional Chaining
const companyData = {
    departments: [
        {
            name: "Engineering",
            manager: {
                name: "Alice",
                contact: {
                    email: "alice@company.com",
                    phone: "555-0101"
                }
            }
        }
    ]
};

const managerPhone = companyData.departments?.[0]?.manager?.contact?.phone;
console.log(`Manager phone: ${managerPhone ?? "Not available"}`);

// ==========================
// 5. BITWISE OPERATORS
// ==========================

console.log("\n\n5. BITWISE OPERATORS");
console.log("===================\n");

// Basic Bitwise Operations
console.log("🔹 Basic Bitwise Operations:");
console.log(`5 & 3: ${5 & 3} (0101 & 0011 = 0001)`);
console.log(`5 | 3: ${5 | 3} (0101 | 0011 = 0111)`);
console.log(`5 ^ 3: ${5 ^ 3} (0101 ^ 0011 = 0110)`);
console.log(`~5: ${~5} (~0101 = 1010 in two's complement = -6)`);
console.log(`5 << 1: ${5 << 1} (0101 << 1 = 1010)`);
console.log(`5 << 2: ${5 << 2} (0101 << 2 = 10100)`);
console.log(`10 >> 1: ${10 >> 1} (1010 >> 1 = 0101)`);
console.log(`-10 >> 1: ${-10 >> 1} (preserves sign)`);
console.log(`10 >>> 1: ${10 >>> 1}`);
console.log(`-10 >>> 1: ${-10 >>> 1} (zero-fill right shift)`);

// Practical Bitwise Applications
console.log("\n🔹 Practical Bitwise Applications:");

// 1. Check if number is even/odd
function isEven(n) {
    return (n & 1) === 0;
}
console.log(`Is 5 even? ${isEven(5)}`);
console.log(`Is 8 even? ${isEven(8)}`);

// 2. Swap numbers without temp variable
let num1 = 5, num2 = 10;
console.log(`Before swap: num1 = ${num1}, num2 = ${num2}`);
num1 = num1 ^ num2;
num2 = num1 ^ num2;
num1 = num1 ^ num2;
console.log(`After XOR swap: num1 = ${num1}, num2 = ${num2}`);

// 3. Check if power of two
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
console.log(`Is 16 power of two? ${isPowerOfTwo(16)}`);
console.log(`Is 15 power of two? ${isPowerOfTwo(15)}`);
console.log(`Is 0 power of two? ${isPowerOfTwo(0)}`);

// 4. Get absolute value (for 32-bit integers)
function abs(n) {
    const mask = n >> 31;
    return (n + mask) ^ mask;
}
console.log(`Absolute value of -15: ${abs(-15)}`);
console.log(`Absolute value of 15: ${abs(15)}`);

// 5. Permission system
console.log("\n🔹 Permission System Example:");

const PERMISSIONS = {
    READ:   1 << 0,  // 0001 = 1
    WRITE:  1 << 1,  // 0010 = 2
    DELETE: 1 << 2,  // 0100 = 4
    ADMIN:  1 << 3   // 1000 = 8
};

// User permissions
let userPermissions = PERMISSIONS.READ | PERMISSIONS.WRITE; // 0011 = 3
console.log(`User permissions: ${userPermissions} (binary: ${userPermissions.toString(2).padStart(4, '0')})`);

// Check permissions
console.log(`Can read? ${(userPermissions & PERMISSIONS.READ) !== 0}`);
console.log(`Can delete? ${(userPermissions & PERMISSIONS.DELETE) !== 0}`);
console.log(`Is admin? ${(userPermissions & PERMISSIONS.ADMIN) !== 0}`);

// Add permission
userPermissions |= PERMISSIONS.DELETE;
console.log(`After adding DELETE: ${userPermissions.toString(2).padStart(4, '0')}`);

// Remove permission
userPermissions &= ~PERMISSIONS.WRITE;
console.log(`After removing WRITE: ${userPermissions.toString(2).padStart(4, '0')}`);

// Toggle permission
userPermissions ^= PERMISSIONS.ADMIN;
console.log(`After toggling ADMIN: ${userPermissions.toString(2).padStart(4, '0')}`);
userPermissions ^= PERMISSIONS.ADMIN;
console.log(`After toggling ADMIN again: ${userPermissions.toString(2).padStart(4, '0')}`);

// ==========================
// 6. SPECIAL OPERATORS
// ==========================

console.log("\n\n6. SPECIAL OPERATORS");
console.log("===================\n");

// Ternary Operator
console.log("🔹 Ternary (Conditional) Operator:");
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
console.log(`Age ${age}: ${status}`);

// Nested ternary
const score = 85;
const grade = score >= 90 ? "A" :
              score >= 80 ? "B" :
              score >= 70 ? "C" :
              score >= 60 ? "D" : "F";
console.log(`Score ${score}: Grade ${grade}`);

// Returning different types
const isAdmin = true;
const welcomeMessage = isAdmin 
    ? { type: "admin", message: "Welcome Administrator!" }
    : { type: "user", message: "Welcome User!" };
console.log(`Welcome message:`, welcomeMessage);

// typeof Operator
console.log("\n🔹 typeof Operator:");
console.log(`typeof 42: ${typeof 42}`);
console.log(`typeof "hello": ${typeof "hello"}`);
console.log(`typeof true: ${typeof true}`);
console.log(`typeof undefined: ${typeof undefined}`);
console.log(`typeof null: ${typeof null} (historical bug!)`);
console.log(`typeof {}: ${typeof {}}`);
console.log(`typeof []: ${typeof []}`);
console.log(`typeof function(){}: ${typeof function(){}}`);
console.log(`typeof Symbol(): ${typeof Symbol()}`);
console.log(`typeof 123n: ${typeof 123n}`);

// Better type checking
function getType(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (value instanceof Date) return "date";
    if (value instanceof RegExp) return "regexp";
    if (Number.isNaN(value)) return "NaN";
    return typeof value;
}

console.log("\n🔹 Better type checking:");
console.log(`getType(null): ${getType(null)}`);
console.log(`getType([1,2,3]): ${getType([1,2,3])}`);
console.log(`getType(new Date()): ${getType(new Date())}`);
console.log(`getType(/regex/): ${getType(/regex/)}`);
console.log(`getType(NaN): ${getType(NaN)}`);

// instanceof Operator
console.log("\n🔹 instanceof Operator:");

class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

const dog = new Dog();
const cat = new Cat();
const animal = new Animal();

console.log(`dog instanceof Dog: ${dog instanceof Dog}`);
console.log(`dog instanceof Animal: ${dog instanceof Animal}`);
console.log(`cat instanceof Dog: ${cat instanceof Dog}`);
console.log(`animal instanceof Dog: ${animal instanceof Dog}`);

// Built-in types
console.log(`\nBuilt-in types:`);
console.log(`[] instanceof Array: ${[] instanceof Array}`);
console.log(`[] instanceof Object: ${[] instanceof Object}`);
console.log(`{} instanceof Object: ${{} instanceof Object}`);
console.log(`/regex/ instanceof RegExp: ${/regex/ instanceof RegExp}`);
console.log(`new Date() instanceof Date: ${new Date() instanceof Date}`);

// delete Operator
console.log("\n🔹 delete Operator:");
const car = {
    make: "Toyota",
    model: "Camry",
    year: 2020,
    features: ["AC", "GPS", "Leather"]
};

console.log("Before delete:", car);
console.log(`"model" in car: ${"model" in car}`);

delete car.model;
console.log("\nAfter delete car.model:");
console.log("Car object:", car);
console.log(`"model" in car: ${"model" in car}`);
console.log(`car.model: ${car.model}`);

// Cannot delete variables
let myVar = 10;
console.log(`\nmyVar before: ${myVar}`);
// delete myVar; // Would throw in strict mode
console.log(`Cannot delete variables`);

// delete on arrays
const fruits = ["apple", "banana", "cherry"];
console.log(`\nArray before delete: [${fruits}]`);
console.log(`Length: ${fruits.length}`);

delete fruits[1];
console.log(`Array after delete fruits[1]: [${fruits}]`);
console.log(`Length: ${fruits.length} (unchanged!)`);
console.log(`fruits[1]: ${fruits[1]} (undefined)`);

// void Operator
console.log("\n🔹 void Operator:");
console.log(`void 0: ${void 0}`);
console.log(`void (5 + 3): ${void (5 + 3)}`);
console.log(`void "hello": ${void "hello"}`);

// Common use: IIFE
console.log("\nIIFE with void:");
void function() {
    const secret = "This is private";
    console.log(`  Inside IIFE: ${secret}`);
}();
// console.log(secret); // Would be ReferenceError

// Prevent navigation (historical)
console.log(`\nHistorical use: <a href="javascript:void(0)">Click</a>`);

// ==========================
// 7. OPERATOR PRECEDENCE
// ==========================

console.log("\n\n7. OPERATOR PRECEDENCE");
console.log("=====================\n");

console.log("🔹 Basic Precedence Examples:");
console.log(`2 + 3 * 4 = ${2 + 3 * 4} (not ${(2 + 3) * 4})`);
console.log(`(2 + 3) * 4 = ${(2 + 3) * 4}`);
console.log(`10 / 2 * 5 = ${10 / 2 * 5} (left to right)`);
console.log(`10 / (2 * 5) = ${10 / (2 * 5)}`);

console.log("\n🔹 Comparison vs Logical:");
console.log(`5 > 3 && 2 < 4 = ${5 > 3 && 2 < 4}`);
console.log(`Equivalent to: (5 > 3) && (2 < 4)`);

console.log("\n🔹 Assignment Precedence:");
let p, q;
p = q = 5 + 3 * 2;
console.log(`p = q = 5 + 3 * 2`);
console.log(`Evaluates as: p = (q = (5 + (3 * 2)))`);
console.log(`Result: p = ${p}, q = ${q}`);

console.log("\n🔹 Exponentiation (right-associative):");
console.log(`2 ** 3 ** 2 = ${2 ** 3 ** 2}`);
console.log(`Evaluates as: 2 ** (3 ** 2) = 2 ** 9 = 512`);
console.log(`Not: (2 ** 3) ** 2 = 8 ** 2 = 64`);

console.log("\n🔹 Ternary Operator Precedence:");
const t = 1, u = 2, v = 3;
const result = t > u ? t : u > v ? u : v;
console.log(`t > u ? t : u > v ? u : v`);
console.log(`Evaluates as: t > u ? t : (u > v ? u : v)`);
console.log(`Result: ${result}`);

console.log("\n🔹 Complex Expression:");
const complex = 5 + 3 * 2 > 10 && 8 / 4 === 2 || !false;
console.log(`5 + 3 * 2 > 10 && 8 / 4 === 2 || !false`);
console.log(`Step 1: 3 * 2 = 6`);
console.log(`Step 2: 5 + 6 = 11`);
console.log(`Step 3: 11 > 10 = true`);
console.log(`Step 4: 8 / 4 = 2`);
console.log(`Step 5: 2 === 2 = true`);
console.log(`Step 6: true && true = true`);
console.log(`Step 7: !false = true`);
console.log(`Step 8: true || true = true`);
console.log(`Result: ${complex}`);

// Using parentheses for clarity
console.log("\n🔹 Using Parentheses for Clarity:");
const clearExpression = ((5 + (3 * 2)) > 10) && ((8 / 4) === 2) || (!false);
console.log(`Clear version: ((5 + (3 * 2)) > 10) && ((8 / 4) === 2) || (!false)`);
console.log(`Result: ${clearExpression}`);

// ==========================
// 8. PRACTICAL APPLICATIONS
// ==========================

console.log("\n\n8. PRACTICAL APPLICATIONS");
console.log("========================\n");

// 1. E-commerce Calculator
console.log("🔹 E-commerce Price Calculator:");
function calculateTotal(price, quantity, taxRate = 0.08, discount = 0) {
    const subtotal = price * quantity;
    const discountAmount = subtotal * discount;
    const taxedAmount = (subtotal - discountAmount) * taxRate;
    const total = subtotal - discountAmount + taxedAmount;
    
    return {
        subtotal: +subtotal.toFixed(2),
        discount: +discountAmount.toFixed(2),
        tax: +taxedAmount.toFixed(2),
        total: +total.toFixed(2)
    };
}

const orderTotal = calculateTotal(29.99, 3, 0.08, 0.1);
console.log("Order Calculation:", orderTotal);

// 2. User Validation
console.log("\n🔹 User Input Validation:");
function validateUserInput(username, email, age) {
    const errors = [];
    
    // Username: 3-20 chars, alphanumeric
    if (!username || username.length < 3 || username.length > 20) {
        errors.push("Username must be 3-20 characters");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("Username can only contain letters, numbers, and underscores");
    }
    
    // Email: basic validation
    if (!email || !email.includes("@") || !email.includes(".")) {
        errors.push("Invalid email address");
    }
    
    // Age: 13-120
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
        errors.push("Age must be between 13 and 120");
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        userData: errors.length === 0 ? {
            username: username.trim(),
            email: email.toLowerCase().trim(),
            age: ageNum
        } : null
    };
}

const validation = validateUserInput("john_doe123", "john@example.com", "25");
console.log("Validation Result:", validation);

// 3. Shipping Cost Calculator
console.log("\n🔹 Shipping Cost Calculator:");
function calculateShipping(orderTotal, shippingType, isVIP = false) {
    let baseCost = 0;
    
    // Free shipping for orders over $50 or VIP customers
    if (orderTotal > 50 || isVIP) {
        baseCost = 0;
    } else {
        // Different shipping types
        switch (shippingType) {
            case "standard":
                baseCost = 5;
                break;
            case "express":
                baseCost = 10;
                break;
            case "overnight":
                baseCost = 25;
                break;
            default:
                baseCost = 5;
        }
    }
    
    // Add tax to shipping
    const tax = baseCost * 0.08;
    const total = baseCost + tax;
    
    return {
        type: shippingType,
        baseCost: +baseCost.toFixed(2),
        tax: +tax.toFixed(2),
        total: +total.toFixed(2),
        isFree: baseCost === 0
    };
}

const shipping = calculateShipping(45, "express", false);
console.log("Shipping Calculation:", shipping);

// 4. Permission System
console.log("\n🔹 Advanced Permission System:");
class PermissionSystem {
    static PERMISSIONS = {
        VIEW:   1 << 0,
        CREATE: 1 << 1,
        EDIT:   1 << 2,
        DELETE: 1 << 3,
        ADMIN:  1 << 4
    };
    
    static ROLES = {
        GUEST: PermissionSystem.PERMISSIONS.VIEW,
        USER: PermissionSystem.PERMISSIONS.VIEW | 
              PermissionSystem.PERMISSIONS.CREATE | 
              PermissionSystem.PERMISSIONS.EDIT,
        MODERATOR: PermissionSystem.PERMISSIONS.VIEW |
                   PermissionSystem.PERMISSIONS.CREATE |
                   PermissionSystem.PERMISSIONS.EDIT |
                   PermissionSystem.PERMISSIONS.DELETE,
        ADMIN: 0b11111 // All permissions
    };
    
    constructor(userRole) {
        this.permissions = userRole;
    }
    
    hasPermission(permission) {
        return (this.permissions & permission) !== 0;
    }
    
    addPermission(permission) {
        this.permissions |= permission;
        return this;
    }
    
    removePermission(permission) {
        this.permissions &= ~permission;
        return this;
    }
    
    togglePermission(permission) {
        this.permissions ^= permission;
        return this;
    }
    
    listPermissions() {
        return Object.entries(PermissionSystem.PERMISSIONS)
            .filter(([_, perm]) => this.hasPermission(perm))
            .map(([name]) => name);
    }
}

const userPermissions = new PermissionSystem(PermissionSystem.ROLES.USER);
console.log("User permissions:", userPermissions.listPermissions());
console.log("Can delete?", userPermissions.hasPermission(PermissionSystem.PERMISSIONS.DELETE));

userPermissions.addPermission(PermissionSystem.PERMISSIONS.DELETE);
console.log("After adding DELETE:", userPermissions.listPermissions());

// 5. Data Transformation Pipeline
console.log("\n🔹 Data Transformation Pipeline:");
function createDataPipeline(data) {
    return {
        data,
        
        filter(predicate) {
            this.data = this.data.filter(predicate);
            return this;
        },
        
        map(transform) {
            this.data = this.data.map(transform);
            return this;
        },
        
        sort(comparator) {
            this.data.sort(comparator);
            return this;
        },
        
        reduce(reducer, initialValue) {
            return this.data.reduce(reducer, initialValue);
        },
        
        get() {
            return this.data;
        }
    };
}

const numbersData = [5, 2, 8, 1, 9, 3, 7, 4, 6, 10];

const result = createDataPipeline(numbersData)
    .filter(n => n % 2 === 0)           // Keep even numbers
    .map(n => n * 2)                    // Double them
    .sort((a, b) => b - a)              // Sort descending
    .get();

console.log("Pipeline result:", result);

// ==========================
// 9. COMMON PITFALLS & SOLUTIONS
// ==========================

console.log("\n\n9. COMMON PITFALLS & SOLUTIONS");
console.log("===============================\n");

// Pitfall 1: Floating Point Precision
console.log("🔹 Pitfall 1: Floating Point Precision");
console.log(`0.1 + 0.2 = ${0.1 + 0.2}`);
console.log(`Solution: Use fixed precision or tolerance:`);
console.log(`(0.1 + 0.2).toFixed(2) = ${(0.1 + 0.2).toFixed(2)}`);
console.log(`Math.abs(0.1 + 0.2 - 0.3) < 0.000001 = ${Math.abs(0.1 + 0.2 - 0.3) < 0.000001}`);

// Pitfall 2: Type Coercion Surprises
console.log("\n🔹 Pitfall 2: Type Coercion Surprises");
console.log(`[] + [] = "${[] + []}"`);
console.log(`[] + {} = "${[] + {}"`);
console.log(`{} + [] = ${{} + []}`);
console.log(`Solution: Be explicit with types:`);
console.log(`String([]) + String([]) = "${String([]) + String([])}"`);
console.log(`Number([]) + Number([]) = ${Number([]) + Number([])}`);

// Pitfall 3: Assignment vs Comparison
console.log("\n🔹 Pitfall 3: Assignment (=) vs Comparison (==/===)");
let value = 5;
console.log(`if (value = 10) { ... } // Sets value to 10, always true!`);
console.log(`Solution: Always use === for comparison:`);
console.log(`if (value === 10) { ... } // Correct comparison`);

// Pitfall 4: Short-Circuit Side Effects
console.log("\n🔹 Pitfall 4: Short-Circuit Side Effects");
console.log(`function log() { console.log("Called"); return true; }`);
console.log(`true || log() // log() never called (short-circuit)`);
console.log(`false && log() // log() never called (short-circuit)`);
console.log(`Solution: Don't rely on side effects in logical expressions`);

// Pitfall 5: Operator Precedence Confusion
console.log("\n🔹 Pitfall 5: Operator Precedence Confusion");
console.log(`2 + 3 * 4 ** 2 / 8 - 1 = ${2 + 3 * 4 ** 2 / 8 - 1}`);
console.log(`Many developers get this wrong!`);
console.log(`Solution: Use parentheses for clarity:`);
console.log(`2 + ((3 * (4 ** 2)) / 8) - 1 = ${2 + ((3 * (4 ** 2)) / 8) - 1}`);

// Pitfall 6: NaN Comparisons
console.log("\n🔹 Pitfall 6: NaN Comparisons");
console.log(`NaN === NaN: ${NaN === NaN} (false!)`);
console.log(`NaN == NaN: ${NaN == NaN} (false!)`);
console.log(`Solution: Use Number.isNaN() or isNaN():`);
console.log(`Number.isNaN(NaN): ${Number.isNaN(NaN)}`);
console.log(`isNaN(NaN): ${isNaN(NaN)}`);

// Pitfall 7: Bitwise with Large Numbers
console.log("\n🔹 Pitfall 7: Bitwise with Large Numbers");
console.log(`Bitwise operators work with 32-bit integers`);
console.log(`(2 ** 31) << 1 = ${(2 ** 31) << 1} (overflow!)`);
console.log(`Solution: Use BigInt for large numbers:`);
console.log(`(2n ** 31n) << 1n = ${(2n ** 31n) << 1n}`);

// ==========================
// 10. BEST PRACTICES SUMMARY
// ==========================

console.log("\n\n10. BEST PRACTICES SUMMARY");
console.log("==========================\n");

const bestPractices = [
    "✅ Always use === and !== instead of == and !=",
    "✅ Use parentheses to make precedence clear",
    "✅ Use const by default, let only when reassignment is needed",
    "✅ Use modern operators: ?? for null/undefined, ?. for optional chaining",
    "✅ Break complex expressions into multiple lines",
    "✅ Avoid side effects in expressions",
    "✅ Use descriptive variable names",
    "✅ Handle floating point precision issues",
    "✅ Use Number.isNaN() instead of isNaN() for strict checking",
    "✅ Use bitwise operators only when necessary and document why",
    "✅ Prefer template literals over string concatenation",
    "✅ Use destructuring for cleaner code",
    "✅ Understand short-circuit evaluation implications",
    "✅ Validate input types before operations",
    "✅ Use the appropriate operator for the job"
];

console.log("JavaScript Operators Best Practices:");
bestPractices.forEach((practice, index) => {
    console.log(`${index + 1}. ${practice}`);
});

console.log("\n" + "=".repeat(60));
console.log("🎯 KEY TAKEAWAYS:");
console.log("=".repeat(60));
console.log("1. Operators are the building blocks of expressions");
console.log("2. Understanding precedence prevents bugs");
console.log("3. Type coercion can be surprising - be explicit");
console.log("4. Modern operators (??, ?.) make code safer");
console.log("5. Always prioritize readability over cleverness");

console.log("\n" + "=".repeat(60));
console.log("END OF OPERATORS & EXPRESSIONS EXAMPLES");
console.log("=".repeat(60));
