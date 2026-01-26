// ============================================
// VARIABLES & DATA TYPES - PRACTICE EXERCISES
// ============================================

console.log("🎯 VARIABLES & DATA TYPES EXERCISES");
console.log("===================================\n");

// ========================
// EXERCISE 1: DECLARATION
// ========================

console.log("📝 EXERCISE 1: VARIABLE DECLARATION");
console.log("===================================\n");

/**
 * Task 1.1: Declare Constants
 * Create constants for application configuration
 */
function exercise1_1() {
    console.log("Task 1.1: Declare Constants");
    console.log("-".repeat(30));
    
    // TODO: Declare the following constants:
    // 1. MAX_FILE_SIZE: Maximum file size in MB (value: 10)
    // 2. DEFAULT_TIMEOUT: Default API timeout in milliseconds (value: 30000)
    // 3. SUPPORTED_LANGUAGES: Array of supported languages: ["en", "es", "fr"]
    // 4. COMPANY_NAME: Your company name as a string
    
    // Your code here:
    const MAX_FILE_SIZE = 10;
    const DEFAULT_TIMEOUT = 30000;
    const SUPPORTED_LANGUAGES = ["en", "es", "fr"];
    const COMPANY_NAME = "TechCorp Inc.";
    
    // Test your implementation
    console.log(`MAX_FILE_SIZE: ${MAX_FILE_SIZE} MB`);
    console.log(`DEFAULT_TIMEOUT: ${DEFAULT_TIMEOUT} ms`);
    console.log(`SUPPORTED_LANGUAGES: ${SUPPORTED_LANGUAGES.join(", ")}`);
    console.log(`COMPANY_NAME: ${COMPANY_NAME}`);
    
    // Check types
    console.log(`\nType checks:`);
    console.log(`MAX_FILE_SIZE is number: ${typeof MAX_FILE_SIZE === 'number'}`);
    console.log(`COMPANY_NAME is string: ${typeof COMPANY_NAME === 'string'}`);
    console.log(`SUPPORTED_LANGUAGES is array: ${Array.isArray(SUPPORTED_LANGUAGES)}`);
}

/**
 * Task 1.2: Declare Variables
 * Create variables for user session management
 */
function exercise1_2() {
    console.log("\n\nTask 1.2: Declare Variables");
    console.log("-".repeat(30));
    
    // TODO: Declare the following variables:
    // 1. currentUser: Initially null (will hold user object)
    // 2. loginAttempts: Number of failed login attempts (starts at 0)
    // 3. isSessionActive: Boolean indicating if session is active (starts false)
    // 4. lastActivity: Timestamp of last activity (initialize with current time)
    
    // Your code here:
    let currentUser = null;
    let loginAttempts = 0;
    let isSessionActive = false;
    let lastActivity = Date.now();
    
    // Test your implementation
    console.log(`currentUser: ${currentUser}`);
    console.log(`loginAttempts: ${loginAttempts}`);
    console.log(`isSessionActive: ${isSessionActive}`);
    console.log(`lastActivity: ${lastActivity}`);
    
    // Simulate user login
    console.log("\nSimulating user login...");
    currentUser = {
        id: "U12345",
        username: "john_doe",
        email: "john@example.com"
    };
    loginAttempts = 0;
    isSessionActive = true;
    lastActivity = Date.now();
    
    console.log(`After login:`);
    console.log(`currentUser:`, currentUser);
    console.log(`loginAttempts: ${loginAttempts}`);
    console.log(`isSessionActive: ${isSessionActive}`);
    console.log(`Type of currentUser: ${typeof currentUser}`);
}

/**
 * Task 1.3: Variable Scope Practice
 * Understand block scope with let and const
 */
function exercise1_3() {
    console.log("\n\nTask 1.3: Variable Scope");
    console.log("-".repeat(30));
    
    // TODO: Fix the scope issues in this code
    
    // Problematic code - fix the scope issues
    function problematicScope() {
        if (true) {
            var functionScoped = "I'm function scoped";
            let blockScoped = "I'm block scoped";
            const constantInBlock = "I'm a constant in block";
        }
        
        console.log(`functionScoped: ${functionScoped}`); // Should work
        // console.log(`blockScoped: ${blockScoped}`); // Should NOT work - fix by moving declaration
        // console.log(`constantInBlock: ${constantInBlock}`); // Should NOT work - fix by moving declaration
    }
    
    // Fixed code - your implementation
    function fixedScope() {
        let blockScoped; // Move declaration outside block
        const constantInBlock = "I'm a constant"; // Move outside block or handle differently
        
        if (true) {
            var functionScoped = "I'm function scoped";
            blockScoped = "I'm block scoped (now accessible)";
            // constantInBlock cannot be reassigned, so we need different approach
        }
        
        console.log(`functionScoped: ${functionScoped}`);
        console.log(`blockScoped: ${blockScoped}`);
        console.log(`constantInBlock: ${constantInBlock}`);
        
        // Alternative: Use different variable names
        const constantOutsideBlock = "I'm accessible everywhere in function";
        console.log(`constantOutsideBlock: ${constantOutsideBlock}`);
    }
    
    console.log("Running fixed scope example:");
    fixedScope();
}

// ========================
// EXERCISE 2: DATA TYPES
// ========================

console.log("\n\n📝 EXERCISE 2: DATA TYPES");
console.log("========================\n");

/**
 * Task 2.1: Identify Data Types
 * Determine the type of various values
 */
function exercise2_1() {
    console.log("Task 2.1: Identify Data Types");
    console.log("-".repeat(30));
    
    // TODO: For each value, write its type using typeof operator
    const values = [
        42,
        "Hello World",
        true,
        null,
        undefined,
        [1, 2, 3],
        { name: "John" },
        function() {},
        Symbol("id"),
        123n,
        NaN,
        Infinity
    ];
    
    console.log("Value -> Type");
    console.log("-".repeat(20));
    
    // Your code here: Loop through values and log their types
    values.forEach((value, index) => {
        let type = typeof value;
        
        // Special handling for null and arrays
        if (value === null) {
            type = "null (but typeof returns 'object')";
        } else if (Array.isArray(value)) {
            type = "array (but typeof returns 'object')";
        } else if (Number.isNaN(value)) {
            type = "NaN (but typeof returns 'number')";
        }
        
        console.log(`${index + 1}. ${JSON.stringify(value)} -> ${type}`);
    });
    
    // Additional type checks
    console.log("\nAdditional type checks:");
    console.log(`typeof []: ${typeof []}`);
    console.log(`Array.isArray([]): ${Array.isArray([])}`);
    console.log(`typeof null: ${typeof null}`);
    console.log(`null === null: ${null === null}`);
    console.log(`typeof NaN: ${typeof NaN}`);
    console.log(`Number.isNaN(NaN): ${Number.isNaN(NaN)}`);
}

/**
 * Task 2.2: Create Complex Data Structures
 * Build nested objects and arrays
 */
function exercise2_2() {
    console.log("\n\nTask 2.2: Complex Data Structures");
    console.log("-".repeat(30));
    
    // TODO: Create a product catalog object with the following structure:
    /*
    catalog: {
        category: "Electronics",
        products: [
            {
                id: "P001",
                name: "Wireless Mouse",
                price: 29.99,
                inStock: true,
                specifications: {
                    brand: "TechBrand",
                    color: "Black",
                    wireless: true
                }
            },
            {
                id: "P002",
                name: "USB-C Cable",
                price: 19.99,
                inStock: false,
                specifications: {
                    brand: "CablePro",
                    length: "2m",
                    type: "USB-C to USB-C"
                }
            }
        ],
        totalProducts: 2,
        hasDiscount: false
    }
    */
    
    // Your code here:
    const catalog = {
        category: "Electronics",
        products: [
            {
                id: "P001",
                name: "Wireless Mouse",
                price: 29.99,
                inStock: true,
                specifications: {
                    brand: "TechBrand",
                    color: "Black",
                    wireless: true
                }
            },
            {
                id: "P002",
                name: "USB-C Cable",
                price: 19.99,
                inStock: false,
                specifications: {
                    brand: "CablePro",
                    length: "2m",
                    type: "USB-C to USB-C"
                }
            }
        ],
        totalProducts: 2,
        hasDiscount: false
    };
    
    // Test your implementation
    console.log("Product Catalog:");
    console.log(`Category: ${catalog.category}`);
    console.log(`Total Products: ${catalog.totalProducts}`);
    console.log(`Has Discount: ${catalog.hasDiscount}`);
    
    console.log("\nProducts:");
    catalog.products.forEach((product, index) => {
        console.log(`\nProduct ${index + 1}:`);
        console.log(`  ID: ${product.id}`);
        console.log(`  Name: ${product.name}`);
        console.log(`  Price: $${product.price}`);
        console.log(`  In Stock: ${product.inStock}`);
        console.log(`  Brand: ${product.specifications.brand}`);
    });
    
    // Access nested properties
    console.log("\nAccessing nested properties:");
    console.log(`First product color: ${catalog.products[0].specifications.color}`);
    console.log(`Second product type: ${catalog.products[1].specifications.type}`);
    
    // Type checks
    console.log("\nType checks:");
    console.log(`catalog is object: ${typeof catalog === 'object' && !Array.isArray(catalog)}`);
    console.log(`products is array: ${Array.isArray(catalog.products)}`);
    console.log(`price is number: ${typeof catalog.products[0].price === 'number'}`);
    console.log(`inStock is boolean: ${typeof catalog.products[0].inStock === 'boolean'}`);
}

/**
 * Task 2.3: Working with Special Values
 * Handle undefined, null, NaN, and Infinity
 */
function exercise2_3() {
    console.log("\n\nTask 2.3: Special Values");
    console.log("-".repeat(30));
    
    // TODO: Fix the function to handle special values correctly
    
    function calculateStats(numbers) {
        // This function should calculate statistics but handle special cases
        let sum = 0;
        let validCount = 0;
        let hasNaN = false;
        let hasInfinity = false;
        
        for (let num of numbers) {
            // TODO: Check for NaN
            if (Number.isNaN(num)) {
                hasNaN = true;
                continue; // Skip NaN values
            }
            
            // TODO: Check for Infinity
            if (!Number.isFinite(num)) {
                hasInfinity = true;
                continue; // Skip Infinity values
            }
            
            // TODO: Check for null/undefined (they become 0 when converted to number)
            if (num === null || num === undefined) {
                // Option 1: Skip null/undefined
                continue;
                // Option 2: Treat as 0
                // num = 0;
            }
            
            sum += num;
            validCount++;
        }
        
        const average = validCount > 0 ? sum / validCount : 0;
        
        return {
            sum,
            average,
            validCount,
            hasNaN,
            hasInfinity,
            allValues: numbers
        };
    }
    
    // Test cases
    const testCases = [
        [1, 2, 3, 4, 5], // Normal case
        [10, null, 20, undefined, 30], // With null/undefined
        [1, 2, NaN, 4, 5], // With NaN
        [100, 200, Infinity, -Infinity, 300], // With Infinity
        [null, undefined, NaN, Infinity], // All special values
        [] // Empty array
    ];
    
    console.log("Testing calculateStats function:");
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: [${testCase.join(", ")}]`);
        const result = calculateStats(testCase);
        console.log(`  Sum: ${result.sum}`);
        console.log(`  Average: ${result.average}`);
        console.log(`  Valid Count: ${result.validCount}`);
        console.log(`  Has NaN: ${result.hasNaN}`);
        console.log(`  Has Infinity: ${result.hasInfinity}`);
    });
    
    // Additional special value checks
    console.log("\nSpecial value comparisons:");
    console.log(`NaN === NaN: ${NaN === NaN}`);
    console.log(`Number.isNaN(NaN): ${Number.isNaN(NaN)}`);
    console.log(`isFinite(Infinity): ${Number.isFinite(Infinity)}`);
    console.log(`isFinite(-Infinity): ${Number.isFinite(-Infinity)}`);
    console.log(`isFinite(NaN): ${Number.isFinite(NaN)}`);
    console.log(`null == undefined: ${null == undefined}`);
    console.log(`null === undefined: ${null === undefined}`);
}

// ========================
// EXERCISE 3: TYPE CONVERSION
// ========================

console.log("\n\n📝 EXERCISE 3: TYPE CONVERSION");
console.log("=============================\n");

/**
 * Task 3.1: Explicit Type Conversion
 * Convert between types intentionally
 */
function exercise3_1() {
    console.log("Task 3.1: Explicit Type Conversion");
    console.log("-".repeat(30));
    
    // TODO: Create conversion functions
    
    // 1. Convert to Number
    function toNumber(value) {
        // Handle various input types
        if (value === null) return 0;
        if (value === undefined) return NaN;
        if (typeof value === 'boolean') return value ? 1 : 0;
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (trimmed === '') return 0;
            const num = Number(trimmed);
            return Number.isNaN(num) ? NaN : num;
        }
        if (typeof value === 'object') return NaN;
        return Number(value);
    }
    
    // 2. Convert to String
    function toString(value) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
    }
    
    // 3. Convert to Boolean
    function toBoolean(value) {
        // Falsy values: false, 0, -0, 0n, "", null, undefined, NaN
        if (!value) return false;
        if (value === 0) return false;
        if (value === '') return false;
        if (Number.isNaN(value)) return false;
        return true;
    }
    
    // Test cases
    const testValues = [
        42,
        "123",
        "  456  ",
        "hello",
        "",
        " ",
        true,
        false,
        null,
        undefined,
        [1, 2, 3],
        { name: "John" },
        NaN,
        Infinity
    ];
    
    console.log("Explicit Type Conversions:");
    console.log("-".repeat(80));
    console.log("Value".padEnd(20) + "toNumber".padEnd(15) + "toString".padEnd(25) + "toBoolean");
    console.log("-".repeat(80));
    
    testValues.forEach(value => {
        const num = toNumber(value);
        const str = toString(value);
        const bool = toBoolean(value);
        
        console.log(
            JSON.stringify(value).padEnd(20) +
            JSON.stringify(num).padEnd(15) +
            str.padEnd(25) +
            bool
        );
    });
    
    // Compare with built-in methods
    console.log("\n\nComparison with built-in methods:");
    console.log("-".repeat(80));
    console.log("Value".padEnd(20) + "Number()".padEnd(15) + "String()".padEnd(25) + "Boolean()");
    console.log("-".repeat(80));
    
    testValues.forEach(value => {
        console.log(
            JSON.stringify(value).padEnd(20) +
            JSON.stringify(Number(value)).padEnd(15) +
            String(value).padEnd(25) +
            Boolean(value)
        );
    });
}

/**
 * Task 3.2: Implicit Type Coercion
 * Understand automatic type conversion
 */
function exercise3_2() {
    console.log("\n\nTask 3.2: Implicit Type Coercion");
    console.log("-".repeat(30));
    
    // TODO: Predict the results of implicit conversions
    
    const operations = [
        // Arithmetic operations
        () => "5" + 3,
        () => 5 + "3",
        () => "5" - 3,
        () => "5" * "2",
        () => "10" / "2",
        () => "10" % "3",
        
        // Boolean context
        () => !"hello",
        () => !"",
        () => !0,
        () => !1,
        
        // Comparison with type coercion (==)
        () => 5 == "5",
        () => 0 == false,
        () => null == undefined,
        () => "" == 0,
        () == "0" == false,
        
        // Unary plus (implicit conversion to number)
        () => +"123",
        () => +"hello",
        () => +true,
        () => +false,
        () => +null,
        () => +undefined,
        
        // Complex expressions
        () => [] + [],
        () => [] + {},
        () => {} + [],
        () => true + true,
        () => "foo" + + "bar",
        () => !!"false" == !!"true",
        () => 0.1 + 0.2 == 0.3
    ];
    
    console.log("Implicit Type Coercion Results:");
    console.log("-".repeat(80));
    console.log("Expression".padEnd(30) + "Result".padEnd(20) + "Type");
    console.log("-".repeat(80));
    
    operations.forEach((operation, index) => {
        const expression = operation.toString()
            .replace('() => ', '')
            .replace(/\(\)/g, '');
        
        try {
            const result = operation();
            console.log(
                expression.padEnd(30) +
                JSON.stringify(result).padEnd(20) +
                typeof result
            );
        } catch (error) {
            console.log(
                expression.padEnd(30) +
                `Error: ${error.message}`.padEnd(20) +
                "error"
            );
        }
    });
    
    // Best practices
    console.log("\n\nBest Practices for Avoiding Coercion Issues:");
    console.log("-".repeat(80));
    
    const bestPractices = [
        "✅ Always use === instead of == (strict equality)",
        "✅ Convert types explicitly before operations",
        "✅ Use Number(), String(), Boolean() for clear conversions",
        "✅ Check types with typeof before operations",
        "✅ Be careful with + operator (it does string concatenation)",
        "✅ Use parseInt/parseFloat for string to number conversion",
        "✅ Use template literals for string interpolation"
    ];
    
    bestPractices.forEach((practice, index) => {
        console.log(`${index + 1}. ${practice}`);
    });
}

/**
 * Task 3.3: Real-world Conversion Scenarios
 * Handle type conversion in practical situations
 */
function exercise3_3() {
    console.log("\n\nTask 3.3: Real-world Conversion Scenarios");
    console.log("-".repeat(30));
    
    // TODO: Fix the user input processing function
    
    function processUserInput(input) {
        // This function should handle various types of user input
        
        // 1. Convert to number if it looks like a number
        const asNumber = Number(input);
        const isNumeric = !Number.isNaN(asNumber) && typeof input !== 'boolean';
        
        // 2. Convert to string (always possible)
        const asString = String(input);
        
        // 3. Convert to boolean
        const asBoolean = Boolean(input);
        
        // 4. Check if it's empty or whitespace
        const isEmpty = typeof input === 'string' && input.trim() === '';
        
        // 5. Check type
        const type = typeof input;
        
        return {
            original: input,
            type,
            asNumber: isNumeric ? asNumber : null,
            asString,
            asBoolean,
            isEmpty,
            isValidNumber: isNumeric,
            recommendations: []
        };
    }
    
    // Test with real-world scenarios
    const scenarios = [
        // E-commerce: product quantity
        { input: "5", context: "Product quantity" },
        
        // User registration: age
        { input: "25", context: "User age" },
        
        // Form: empty field
        { input: "", context: "Empty form field" },
        
        // Form: whitespace
        { input: "   ", context: "Whitespace input" },
        
        // Settings: toggle value
        { input: true, context: "Toggle setting" },
        
        // API: null response
        { input: null, context: "API null response" },
        
        // Calculation: invalid number
        { input: "abc123", context: "Invalid calculation input" },
        
        // Price input
        { input: "29.99", context: "Product price" },
        
        // Checkbox: unchecked
        { input: false, context: "Checkbox unchecked" },
        
        // Array input (edge case)
        { input: [1, 2, 3], context: "Array input" }
    ];
    
    console.log("Real-world Input Processing:");
    console.log("-".repeat(100));
    
    scenarios.forEach(({ input, context }) => {
        const result = processUserInput(input);
        
        console.log(`\nContext: ${context}`);
        console.log(`  Input: ${JSON.stringify(input)} (type: ${result.type})`);
        console.log(`  As Number: ${result.asNumber !== null ? result.asNumber : 'Not a valid number'}`);
        console.log(`  As String: "${result.asString}"`);
        console.log(`  As Boolean: ${result.asBoolean}`);
        console.log(`  Is Empty: ${result.isEmpty}`);
        console.log(`  Is Valid Number: ${result.isValidNumber}`);
        
        // Generate recommendations
        if (result.isEmpty) {
            console.log(`  ⚠️  Recommendation: This appears to be empty input`);
        }
        
        if (result.type === 'string' && result.isValidNumber) {
            console.log(`  ✅ Recommendation: Can be safely used as number: ${result.asNumber}`);
        }
        
        if (result.type === 'string' && !result.isValidNumber && !result.isEmpty) {
            console.log(`  ⚠️  Recommendation: Text input, not numeric`);
        }
    });
    
    // Additional practical example: Form validation
    console.log("\n\nForm Validation Example:");
    console.log("-".repeat(50));
    
    function validateFormData(formData) {
        const errors = [];
        const processed = {};
        
        // Validate and convert each field
        for (const [field, value] of Object.entries(formData)) {
            const trimmed = typeof value === 'string' ? value.trim() : value;
            
            switch (field) {
                case 'age':
                    const age = Number(trimmed);
                    if (Number.isNaN(age) || age < 0 || age > 150) {
                        errors.push(`Invalid age: ${value}`);
                    } else {
                        processed[field] = age;
                    }
                    break;
                    
                case 'email':
                    if (!trimmed || trimmed === '') {
                        errors.push('Email is required');
                    } else if (!trimmed.includes('@')) {
                        errors.push('Invalid email format');
                    } else {
                        processed[field] = trimmed.toLowerCase();
                    }
                    break;
                    
                case 'subscribe':
                    // Convert various truthy values to boolean
                    processed[field] = Boolean(trimmed) && trimmed !== 'false' && trimmed !== '0';
                    break;
                    
                case 'quantity':
                    const quantity = Number(trimmed);
                    if (!Number.isInteger(quantity) || quantity < 1) {
                        errors.push(`Invalid quantity: ${value}`);
                    } else {
                        processed[field] = quantity;
                    }
                    break;
                    
                default:
                    processed[field] = trimmed;
            }
        }
        
        return { processed, errors, isValid: errors.length === 0 };
    }
    
    const sampleForm = {
        age: "25",
        email: "  USER@EXAMPLE.COM  ",
        subscribe: "true",
        quantity: "3",
        comments: "  Great service!  "
    };
    
    const validation = validateFormData(sampleForm);
    console.log("Original form data:", sampleForm);
    console.log("Processed data:", validation.processed);
    console.log("Errors:", validation.errors.length > 0 ? validation.errors : "None");
    console.log("Is valid:", validation.isValid);
}

// ========================
// EXERCISE 4: BEST PRACTICES
// ========================

console.log("\n\n📝 EXERCISE 4: BEST PRACTICES");
console.log("============================\n");

/**
 * Task 4.1: Naming Convention Implementation
 * Apply proper naming conventions
 */
function exercise4_1() {
    console.log("Task 4.1: Naming Conventions");
    console.log("-".repeat(30));
    
    // TODO: Refactor this poorly named code with proper naming conventions
    
    // ❌ Poorly named code
    function badExample() {
        const x = 10; // What does x represent?
        let y = 0; // What does y represent?
        let z = []; // What does z contain?
        let f = true; // What does f flag?
        
        // Some operation
        y = x * 2;
        z.push(y);
        f = !f;
        
        return { x, y, z, f };
    }
    
    // ✅ Refactored with good naming
    function goodExample() {
        // Constants for configuration
        const BASE_PRICE = 10;
        const TAX_RATE = 0.08;
        
        // Variables with descriptive names
        let quantity = 0;
        let cartItems = [];
        let isDiscountApplied = false;
        
        // Clear business logic
        quantity = 2;
        const subtotal = BASE_PRICE * quantity;
        const taxAmount = subtotal * TAX_RATE;
        const total = subtotal + taxAmount;
        
        cartItems.push({
            name: "Product A",
            price: BASE_PRICE,
            quantity: quantity,
            subtotal: subtotal
        });
        
        // Apply discount if eligible
        if (quantity >= 5) {
            isDiscountApplied = true;
        }
        
        return {
            basePrice: BASE_PRICE,
            quantity: quantity,
            subtotal: subtotal,
            taxAmount: taxAmount,
            total: total,
            cartItems: cartItems,
            isDiscountApplied: isDiscountApplied
        };
    }
    
    console.log("Bad example (poor naming):");
    console.log(badExample());
    
    console.log("\nGood example (clear naming):");
    const result = goodExample();
    console.log(`Base Price: $${result.basePrice}`);
    console.log(`Quantity: ${result.quantity}`);
    console.log(`Subtotal: $${result.subtotal.toFixed(2)}`);
    console.log(`Tax: $${result.taxAmount.toFixed(2)}`);
    console.log(`Total: $${result.total.toFixed(2)}`);
    console.log(`Cart Items: ${result.cartItems.length} item(s)`);
    console.log(`Discount Applied: ${result.isDiscountApplied}`);
    
    // Naming convention guidelines
    console.log("\n\nNaming Convention Guidelines:");
    console.log("-".repeat(80));
    
    const guidelines = [
        {
            type: "Constants",
            pattern: "UPPER_SNAKE_CASE",
            examples: ["MAX_RETRIES", "API_TIMEOUT", "DEFAULT_CURRENCY"],
            when: "Values that don't change"
        },
        {
            type: "Variables",
            pattern: "camelCase",
            examples: ["userName", "itemCount", "isLoading"],
            when: "Values that can change"
        },
        {
            type: "Booleans",
            pattern: "is/has/can/should + Adjective",
            examples: ["isActive", "hasPermission", "canEdit", "shouldUpdate"],
            when: "Boolean variables"
        },
        {
            type: "Functions",
            pattern: "verb + Noun / get/set/is",
            examples: ["calculateTotal", "getUserInfo", "isValid", "setConfiguration"],
            when: "Functions and methods"
        },
        {
            type: "Classes",
            pattern: "PascalCase",
            examples: ["UserAccount", "ShoppingCart", "PaymentProcessor"],
            when: "Class definitions"
        },
        {
            type: "Private",
            pattern: "_leadingUnderscore",
            examples: ["_internalCounter", "_calculateInternal"],
            when: "Private properties/methods (convention)"
        }
    ];
    
    guidelines.forEach(guideline => {
        console.log(`\n${guideline.type}:`);
        console.log(`  Pattern: ${guideline.pattern}`);
        console.log(`  Examples: ${guideline.examples.join(", ")}`);
        console.log(`  When to use: ${guideline.when}`);
    });
}

/**
 * Task 4.2: Variable Declaration Patterns
 * Apply best practices for variable declaration
 */
function exercise4_2() {
    console.log("\n\nTask 4.2: Declaration Patterns");
    console.log("-".repeat(30));
    
    // TODO: Refactor this function with better declaration patterns
    
    // ❌ Poorly structured function
    function messyFunction(data) {
        let result = {};
        
        // Random declarations throughout
        if (data) {
            let temp = process(data);
            result.value = temp;
            
            // Another declaration deep in nested block
            let counter = 0;
            
            for (let item of data.items) {
                // Yet another declaration
                let processed = transform(item);
                
                if (processed) {
                    counter++;
                    // Mixed up logic
                    result.count = counter;
                }
            }
        } else {
            // Duplicate logic
            result.value = "default";
            result.count = 0;
        }
        
        // Late declaration
        let finalResult = format(result);
        return finalResult;
    }
    
    // ✅ Refactored with clean structure
    function cleanFunction(data) {
        // 1. Declare all variables at the top
        const DEFAULT_VALUE = "default";
        let result = {};
        let counter = 0;
        let finalResult;
        
        // 2. Early return for invalid data
        if (!data || !data.items || data.items.length === 0) {
            result.value = DEFAULT_VALUE;
            result.count = 0;
            finalResult = format(result);
            return finalResult;
        }
        
        // 3. Process valid data
        result.value = process(data);
        
        // 4. Transform items
        for (let item of data.items) {
            const processed = transform(item);
            
            if (processed) {
                counter++;
            }
        }
        
        result.count = counter;
        
        // 5. Format and return
        finalResult = format(result);
        return finalResult;
    }
    
    // Helper functions (simplified)
    function process(data) {
        return `Processed: ${JSON.stringify(data).slice(0, 20)}...`;
    }
    
    function transform(item) {
        return item && typeof item === 'object';
    }
    
    function format(result) {
        return `Value: ${result.value}, Count: ${result.count}`;
    }
    
    // Test with sample data
    console.log("Testing clean function structure:");
    
    const testData1 = null;
    const testData2 = {
        items: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" }
        ]
    };
    
    console.log("\nTest 1 - Null data:");
    console.log(`Result: ${cleanFunction(testData1)}`);
    
    console.log("\nTest 2 - Valid data:");
    console.log(`Result: ${cleanFunction(testData2)}`);
    
    // Declaration best practices
    console.log("\n\nDeclaration Best Practices:");
    console.log("-".repeat(80));
    
    const practices = [
        "✅ Declare variables at the top of their scope",
        "✅ Use const by default, let only when reassignment is needed",
        "✅ Avoid var in modern JavaScript",
        "✅ Group related declarations together",
        "✅ Initialize variables when declaring them",
        "✅ Use descriptive names that indicate purpose",
        "✅ Declare one variable per line (except in for loops)",
        "✅ Use UPPER_CASE for constants that are truly constant",
        "✅ Avoid global variables when possible",
        "✅ Use block scope ({}) to limit variable visibility"
    ];
    
    practices.forEach((practice, index) => {
        console.log(`${index + 1}. ${practice}`);
    });
    
    // Example: Proper declaration in different contexts
    console.log("\n\nExamples of Proper Declaration:");
    
    // Example 1: Function with clean declarations
    function calculateOrderTotal(order) {
        // Constants
        const TAX_RATE = 0.08;
        const SHIPPING_FEE = 5.99;
        
        // Variables
        let subtotal = 0;
        let taxAmount = 0;
        let total = 0;
        let discountApplied = false;
        
        // Calculations
        subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        if (order.couponCode === "SAVE10") {
            subtotal *= 0.9;
            discountApplied = true;
        }
        
        taxAmount = subtotal * TAX_RATE;
        total = subtotal + taxAmount + SHIPPING_FEE;
        
        // Return result
        return {
            subtotal: parseFloat(subtotal.toFixed(2)),
            taxAmount: parseFloat(taxAmount.toFixed(2)),
            shipping: SHIPPING_FEE,
            total: parseFloat(total.toFixed(2)),
            discountApplied
        };
    }
    
    // Example 2: Loop with proper scope
    function processItems(items) {
        const results = [];
        const MAX_RETRIES = 3;
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let processedSuccessfully = false;
            let retryCount = 0;
            
            while (!processedSuccessfully && retryCount < MAX_RETRIES) {
                try {
                    const result = processItem(item);
                    results.push(result);
                    processedSuccessfully = true;
                } catch (error) {
                    retryCount++;
                    console.log(`Retry ${retryCount} for item ${item.id}`);
                }
            }
            
            if (!processedSuccessfully) {
                console.log(`Failed to process item ${item.id} after ${MAX_RETRIES} retries`);
            }
        }
        
        return results;
    }
    
    function processItem(item) {
        return `Processed: ${item.id}`;
    }
    
    console.log("\nExample 1 - Order calculation:");
    const order = {
        items: [
            { price: 19.99, quantity: 2 },
            { price: 9.99, quantity: 1 }
        ],
        couponCode: "SAVE10"
    };
    console.log(calculateOrderTotal(order));
    
    console.log("\nExample 2 - Item processing:");
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    console.log(processItems(items));
}

/**
 * Task 4.3: Type Safety Implementation
 * Add type checking to improve code reliability
 */
function exercise4_3() {
    console.log("\n\nTask 4.3: Type Safety");
    console.log("-".repeat(30));
    
    // TODO: Add type checking to this unsafe function
    
    // ❌ Unsafe function (no type checking)
    function unsafeCalculator(a, b, operation) {
        switch (operation) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                return a / b;
            default:
                return 0;
        }
    }
    
    // ✅ Safe function with type checking
    function safeCalculator(a, b, operation) {
        // Type validation
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('Both operands must be numbers');
        }
        
        if (Number.isNaN(a) || Number.isNaN(b)) {
            throw new Error('Operands cannot be NaN');
        }
        
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            throw new Error('Operands must be finite numbers');
        }
        
        // Operation validation
        const validOperations = ['add', 'subtract', 'multiply', 'divide'];
        if (!validOperations.includes(operation)) {
            throw new Error(`Invalid operation. Must be one of: ${validOperations.join(', ')}`);
        }
        
        // Division by zero check
        if (operation === 'divide' && b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        
        // Perform calculation
        let result;
        switch (operation) {
            case 'add':
                result = a + b;
                break;
            case 'subtract':
                result = a - b;
                break;
            case 'multiply':
                result = a * b;
                break;
            case 'divide':
                result = a / b;
                break;
        }
        
        // Result validation
        if (!Number.isFinite(result)) {
            throw new Error('Calculation resulted in non-finite value');
        }
        
        return result;
    }
    
    // Test cases
    console.log("Testing calculator functions:");
    console.log("-".repeat(80));
    
    const testCases = [
        { a: 10, b: 5, operation: 'add', expected: 15 },
        { a: 10, b: 5, operation: 'subtract', expected: 5 },
        { a: 10, b: 5, operation: 'multiply', expected: 50 },
        { a: 10, b: 5, operation: 'divide', expected: 2 },
        { a: 10, b: 0, operation: 'divide', shouldThrow: true },
        { a: "10", b: 5, operation: 'add', shouldThrow: true },
        { a: 10, b: NaN, operation: 'add', shouldThrow: true },
        { a: Infinity, b: 5, operation: 'add', shouldThrow: true },
        { a: 10, b: 5, operation: 'power', shouldThrow: true }
    ];
    
    testCases.forEach((test, index) => {
        console.log(`\nTest ${index + 1}: ${test.a} ${test.operation} ${test.b}`);
        
        // Test unsafe function
        try {
            const unsafeResult = unsafeCalculator(test.a, test.b, test.operation);
            console.log(`  Unsafe result: ${unsafeResult}`);
            
            if (test.expected !== undefined && unsafeResult !== test.expected) {
                console.log(`  ⚠️  Unexpected result! Expected: ${test.expected}`);
            }
        } catch (error) {
            console.log(`  Unsafe error: ${error.message}`);
        }
        
        // Test safe function
        try {
            const safeResult = safeCalculator(test.a, test.b, test.operation);
            console.log(`  Safe result: ${safeResult}`);
            
            if (test.shouldThrow) {
                console.log(`  ⚠️  Should have thrown but didn't!`);
            }
        } catch (error) {
            console.log(`  Safe error: ${error.message}`);
            
            if (!test.shouldThrow) {
                console.log(`  ⚠️  Unexpected error!`);
            }
        }
    });
    
    // Type safety patterns
    console.log("\n\nType Safety Patterns:");
    console.log("-".repeat(80));
    
    const typeSafetyPatterns = [
        {
            pattern: "Type Guards",
            description: "Check types before operations",
            example: "if (typeof value === 'string') { /* handle string */ }"
        },
        {
            pattern: "Validation Functions",
            description: "Create reusable validation functions",
            example: "function isNumber(value) { return typeof value === 'number' && !Number.isNaN(value); }"
        },
        {
            pattern: "Default Values",
            description: "Provide safe defaults for missing values",
            example: "const name = inputName || 'Anonymous';"
        },
        {
            pattern: "Strict Equality",
            description: "Use === instead of == to avoid type coercion",
            example: "if (value === 5) { /* strict comparison */ }"
        },
        {
            pattern: "Explicit Conversion",
            description: "Convert types explicitly rather than relying on coercion",
            example: "const num = Number(stringValue);"
        },
        {
            pattern: "Error Handling",
            description: "Throw meaningful errors for invalid types",
            example: "throw new TypeError('Expected string, got ' + typeof value);"
        },
        {
            pattern: "Type Annotations (TypeScript)",
            description: "Use TypeScript for compile-time type checking",
            example: "function add(a: number, b: number): number { return a + b; }"
        }
    ];
    
    typeSafetyPatterns.forEach((pattern, index) => {
        console.log(`\n${index + 1}. ${pattern.pattern}:`);
        console.log(`   ${pattern.description}`);
        console.log(`   Example: ${pattern.example}`);
    });
    
    // Practical example: User input validation
    console.log("\n\nPractical Example: User Registration Validation");
    console.log("-".repeat(80));
    
    function validateUserRegistration(userData) {
        const errors = [];
        const validatedData = {};
        
        // Validate username
        if (!userData.username || typeof userData.username !== 'string') {
            errors.push('Username is required and must be a string');
        } else if (userData.username.trim().length < 3) {
            errors.push('Username must be at least 3 characters');
        } else {
            validatedData.username = userData.username.trim();
        }
        
        // Validate email
        if (!userData.email || typeof userData.email !== 'string') {
            errors.push('Email is required and must be a string');
        } else {
            const email = userData.email.trim().toLowerCase();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                errors.push('Invalid email format');
            } else {
                validatedData.email = email;
            }
        }
        
        // Validate age
        if (userData.age !== undefined) {
            const age = Number(userData.age);
            
            if (Number.isNaN(age)) {
                errors.push('Age must be a number');
            } else if (!Number.isInteger(age)) {
                errors.push('Age must be an integer');
            } else if (age < 13) {
                errors.push('Must be at least 13 years old');
            } else if (age > 120) {
                errors.push('Please enter a valid age');
            } else {
                validatedData.age = age;
            }
        }
        
        // Validate terms agreement
        if (userData.agreeToTerms === undefined) {
            errors.push('Must agree to terms and conditions');
        } else {
            // Convert various truthy values to boolean
            const agreed = Boolean(userData.agreeToTerms) && 
                          userData.agreeToTerms !== 'false' && 
                          userData.agreeToTerms !== '0';
            
            if (!agreed) {
                errors.push('Must agree to terms and conditions');
            } else {
                validatedData.agreeToTerms = true;
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            data: validatedData
        };
    }
    
    // Test validation
    const testUsers = [
        {
            username: "john_doe",
            email: "john@example.com",
            age: "25",
            agreeToTerms: true
        },
        {
            username: "  alice  ",
            email: "alice@example",
            age: "12",
            agreeToTerms: "false"
        },
        {
            username: "ab",
            email: 12345,
            age: "invalid",
            agreeToTerms: null
        },
        {
            username: "",
            email: "",
            age: "150",
            agreeToTerms: "true"
        }
    ];
    
    testUsers.forEach((user, index) => {
        console.log(`\nTest User ${index + 1}:`);
        console.log(`  Input:`, user);
        
        const validation = validateUserRegistration(user);
        console.log(`  Valid: ${validation.isValid}`);
        
        if (validation.errors.length > 0) {
            console.log(`  Errors: ${validation.errors.join(', ')}`);
        }
        
        if (validation.isValid) {
            console.log(`  Validated Data:`, validation.data);
        }
    });
}

// ========================
// RUN ALL EXERCISES
// ========================

console.log("🎯 RUNNING ALL VARIABLES & DATA TYPES EXERCISES");
console.log("===============================================\n");

// Run Exercise 1
exercise1_1();
exercise1_2();
exercise1_3();

// Run Exercise 2
exercise2_1();
exercise2_2();
exercise2_3();

// Run Exercise 3
exercise3_1();
exercise3_2();
exercise3_3();

// Run Exercise 4
exercise4_1();
exercise4_2();
exercise4_3();

console.log("\n" + "=".repeat(60));
console.log("✅ ALL EXERCISES COMPLETED SUCCESSFULLY!");
console.log("=".repeat(60));

console.log("\n📊 Summary of what you've practiced:");
console.log("-".repeat(50));
console.log("✓ Variable declaration with let, const, var");
console.log("✓ All 7 primitive data types and 3 reference types");
console.log("✓ Type conversion (explicit and implicit)");
console.log("✓ Best practices for naming and declaration");
console.log("✓ Type safety and validation patterns");
console.log("✓ Real-world scenarios and applications");

console.log("\n🚀 Next Steps:");
console.log("-".repeat(50));
console.log("1. Review any exercises you found challenging");
console.log("2. Try creating your own examples with different data types");
console.log("3. Move on to Operators & Expressions");
console.log("4. Take the quiz to test your understanding");

console.log("\n🎯 Remember: Practice is key to mastering variables and data types!");
