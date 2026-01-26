// ============================================
// CONTROL FLOW - PRACTICE EXERCISES
// ============================================

console.log("🎮 CONTROL FLOW EXERCISES");
console.log("=========================\n");

// ==========================
// EXERCISE 1: FIZZBUZZ CHALLENGE
// ==========================

console.log("📝 EXERCISE 1: FIZZBUZZ CHALLENGE");
console.log("=================================\n");

/**
 * Task 1.1: Basic FizzBuzz
 * Print numbers from 1 to 100 with FizzBuzz rules
 */
function exercise1_1() {
    console.log("Task 1.1: Basic FizzBuzz");
    console.log("-".repeat(30));
    
    // TODO: Implement FizzBuzz
    // Rules:
    // - For multiples of 3, print "Fizz"
    // - For multiples of 5, print "Buzz"
    // - For multiples of both 3 and 5, print "FizzBuzz"
    // - Otherwise, print the number
    
    // Your code here:
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

/**
 * Task 1.2: Enhanced FizzBuzz
 * Add custom rules and make it reusable
 */
function exercise1_2() {
    console.log("\n\nTask 1.2: Enhanced FizzBuzz");
    console.log("-".repeat(30));
    
    // TODO: Create a configurable FizzBuzz function
    // Parameters: start, end, rules array
    // Rules format: { divisor: number, word: string }
    
    function fizzBuzzEnhanced(start = 1, end = 100, rules = []) {
        // Default rules if none provided
        if (rules.length === 0) {
            rules = [
                { divisor: 3, word: "Fizz" },
                { divisor: 5, word: "Buzz" }
            ];
        }
        
        const results = [];
        
        for (let i = start; i <= end; i++) {
            let output = "";
            
            // Apply all rules
            for (const rule of rules) {
                if (i % rule.divisor === 0) {
                    output += rule.word;
                }
            }
            
            // If no rules matched, use the number
            if (output === "") {
                output = i.toString();
            }
            
            results.push(output);
            console.log(output);
        }
        
        return results;
    }
    
    // Test with default rules
    console.log("Default FizzBuzz (1-15):");
    fizzBuzzEnhanced(1, 15);
    
    // Test with custom rules
    console.log("\nCustom rules (1-20): 2=Foo, 7=Bar, 14=Baz");
    fizzBuzzEnhanced(1, 20, [
        { divisor: 2, word: "Foo" },
        { divisor: 7, word: "Bar" },
        { divisor: 14, word: "Baz" }
    ]);
    
    // Test edge cases
    console.log("\nEdge case: Empty range");
    fizzBuzzEnhanced(10, 5); // Should handle gracefully
    
    console.log("\nSingle number:");
    fizzBuzzEnhanced(15, 15);
}

/**
 * Task 1.3: FizzBuzz with different loop types
 * Implement using while, do...while, and for...of
 */
function exercise1_3() {
    console.log("\n\nTask 1.3: Different Loop Implementations");
    console.log("-".repeat(30));
    
    // TODO: Implement FizzBuzz using different loop types
    
    // 1. Using while loop
    console.log("1. While Loop:");
    let i = 1;
    while (i <= 20) {
        let output = "";
        if (i % 3 === 0) output += "Fizz";
        if (i % 5 === 0) output += "Buzz";
        console.log(output || i);
        i++;
    }
    
    // 2. Using do...while loop
    console.log("\n2. Do...While Loop:");
    let j = 1;
    do {
        let output = "";
        if (j % 3 === 0) output += "Fizz";
        if (j % 5 === 0) output += "Buzz";
        console.log(output || j);
        j++;
    } while (j <= 20);
    
    // 3. Using for...of with array
    console.log("\n3. For...Of Loop:");
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
    for (const num of numbers) {
        let output = "";
        if (num % 3 === 0) output += "Fizz";
        if (num % 5 === 0) output += "Buzz";
        console.log(output || num);
    }
    
    // 4. Using array methods
    console.log("\n4. Array Methods (map/forEach):");
    numbers.map(num => {
        let output = "";
        if (num % 3 === 0) output += "Fizz";
        if (num % 5 === 0) output += "Buzz";
        return output || num.toString();
    }).forEach(result => console.log(result));
}

// ==========================
// EXERCISE 2: PASSWORD VALIDATOR
// ==========================

console.log("\n\n📝 EXERCISE 2: PASSWORD VALIDATOR");
console.log("================================\n");

/**
 * Task 2.1: Basic Password Validation
 * Validate password against basic rules
 */
function exercise2_1() {
    console.log("Task 2.1: Basic Password Validation");
    console.log("-".repeat(30));
    
    // TODO: Create a password validator function
    // Rules:
    // - At least 8 characters
    // - Contains at least one uppercase letter
    // - Contains at least one lowercase letter
    // - Contains at least one number
    // - Contains at least one special character (!@#$%^&*)
    
    function validatePassword(password) {
        const errors = [];
        
        // Check length
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long");
        }
        
        // Check uppercase
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter");
        }
        
        // Check lowercase
        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter");
        }
        
        // Check number
        if (!/\d/.test(password)) {
            errors.push("Password must contain at least one number");
        }
        
        // Check special character
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push("Password must contain at least one special character (!@#$%^&*)");
        }
        
        // Check for spaces
        if (/\s/.test(password)) {
            errors.push("Password cannot contain spaces");
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            strength: calculateStrength(password, errors)
        };
    }
    
    function calculateStrength(password, errors) {
        if (errors.length > 2) return "Very Weak";
        if (errors.length > 0) return "Weak";
        
        let score = 0;
        
        // Length bonus
        if (password.length >= 12) score += 2;
        else if (password.length >= 8) score += 1;
        
        // Character variety bonus
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);
        
        const varietyCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
        score += varietyCount;
        
        // Determine strength
        if (score >= 5) return "Very Strong";
        if (score >= 4) return "Strong";
        if (score >= 3) return "Medium";
        return "Weak";
    }
    
    // Test cases
    const testPasswords = [
        "weak",           // Too short, no variety
        "weakpass",       // No uppercase, number, special
        "WeakPass",       // No number, special
        "WeakPass1",      // No special
        "WeakPass1!",     // Valid
        "SuperStrongPassword123!", // Very strong
        "password with spaces", // Contains spaces
        "12345678",       // Only numbers
        "ABCDEFGH",       // Only uppercase
        "abcdefgh",       // Only lowercase
        "!@#$%^&*"        // Only special
    ];
    
    console.log("Password Validation Tests:");
    testPasswords.forEach((password, index) => {
        console.log(`\nTest ${index + 1}: "${password}"`);
        const result = validatePassword(password);
        console.log(`  Valid: ${result.isValid}`);
        console.log(`  Strength: ${result.strength}`);
        if (result.errors.length > 0) {
            console.log(`  Errors: ${result.errors.join(", ")}`);
        }
    });
}

/**
 * Task 2.2: Advanced Validation with Custom Rules
 */
function exercise2_2() {
    console.log("\n\nTask 2.2: Advanced Password Validation");
    console.log("-".repeat(30));
    
    // TODO: Create a configurable password validator
    // Support custom rules and error messages
    
    class PasswordValidator {
        constructor(rules = []) {
            this.rules = rules.length > 0 ? rules : this.getDefaultRules();
        }
        
        getDefaultRules() {
            return [
                {
                    name: "length",
                    test: (password) => password.length >= 8,
                    message: "Password must be at least 8 characters long"
                },
                {
                    name: "uppercase",
                    test: (password) => /[A-Z]/.test(password),
                    message: "Password must contain at least one uppercase letter"
                },
                {
                    name: "lowercase",
                    test: (password) => /[a-z]/.test(password),
                    message: "Password must contain at least one lowercase letter"
                },
                {
                    name: "number",
                    test: (password) => /\d/.test(password),
                    message: "Password must contain at least one number"
                },
                {
                    name: "special",
                    test: (password) => /[!@#$%^&*]/.test(password),
                    message: "Password must contain at least one special character (!@#$%^&*)"
                },
                {
                    name: "noSpaces",
                    test: (password) => !/\s/.test(password),
                    message: "Password cannot contain spaces"
                },
                {
                    name: "noCommon",
                    test: (password) => !this.isCommonPassword(password),
                    message: "Password is too common"
                }
            ];
        }
        
        isCommonPassword(password) {
            const commonPasswords = [
                "password", "123456", "12345678", "123456789",
                "admin", "qwerty", "letmein", "welcome"
            ];
            return commonPasswords.includes(password.toLowerCase());
        }
        
        validate(password) {
            const errors = [];
            const passedRules = [];
            
            for (const rule of this.rules) {
                try {
                    if (rule.test(password)) {
                        passedRules.push(rule.name);
                    } else {
                        errors.push(rule.message);
                    }
                } catch (error) {
                    errors.push(`Rule '${rule.name}' failed: ${error.message}`);
                }
            }
            
            return {
                isValid: errors.length === 0,
                errors,
                passedRules,
                score: this.calculateScore(password, passedRules)
            };
        }
        
        calculateScore(password, passedRules) {
            let score = 0;
            
            // Length contributes up to 3 points
            if (password.length >= 16) score += 3;
            else if (password.length >= 12) score += 2;
            else if (password.length >= 8) score += 1;
            
            // Each passed rule contributes 1 point (except length which is already counted)
            const rulePoints = passedRules.filter(name => name !== "length").length;
            score += rulePoints;
            
            // Bonus for character variety
            const hasUpper = /[A-Z]/.test(password);
            const hasLower = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecial = /[^A-Za-z0-9]/.test(password);
            
            const variety = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
            if (variety === 4) score += 2;
            else if (variety === 3) score += 1;
            
            return Math.min(score, 10); // Cap at 10
        }
        
        addRule(name, test, message) {
            this.rules.push({ name, test, message });
            return this;
        }
        
        removeRule(name) {
            this.rules = this.rules.filter(rule => rule.name !== name);
            return this;
        }
    }
    
    // Test the validator
    console.log("Testing PasswordValidator:");
    
    const validator = new PasswordValidator();
    
    const testCases = [
        { password: "StrongPass123!", expected: true },
        { password: "weak", expected: false },
        { password: "password", expected: false }, // Common password
        { password: "Admin123!", expected: true },
        { password: "NoSpecial123", expected: false }
    ];
    
    testCases.forEach(({ password, expected }, index) => {
        console.log(`\nTest ${index + 1}: "${password}"`);
        const result = validator.validate(password);
        console.log(`  Expected valid: ${expected}, Actual: ${result.isValid}`);
        console.log(`  Score: ${result.score}/10`);
        
        if (result.isValid !== expected) {
            console.log(`  ⚠️  Mismatch! Errors: ${result.errors.join(", ")}`);
        }
    });
    
    // Test with custom rules
    console.log("\n\nCustom Rules Test:");
    const customValidator = new PasswordValidator()
        .addRule("noConsecutive", 
            (pwd) => !/(.)\1/.test(pwd), 
            "Password cannot have consecutive repeated characters"
        )
        .addRule("companyName",
            (pwd) => !pwd.toLowerCase().includes("company"),
            "Password cannot contain company name"
        );
    
    const customResult = customValidator.validate("Company123!");
    console.log("Custom validator result:", customResult);
}

/**
 * Task 2.3: Password Strength Meter
 */
function exercise2_3() {
    console.log("\n\nTask 2.3: Password Strength Meter");
    console.log("-".repeat(30));
    
    // TODO: Create a visual password strength meter
    // Update in real-time as user types
    
    function createStrengthMeter() {
        const strengthLevels = [
            { name: "Very Weak", color: "#ff0000", minScore: 0 },
            { name: "Weak", color: "#ff6b00", minScore: 2 },
            { name: "Fair", color: "#ffd000", minScore: 4 },
            { name: "Good", color: "#9dff00", minScore: 6 },
            { name: "Strong", color: "#00ff00", minScore: 8 }
        ];
        
        return {
            calculate(password) {
                let score = 0;
                
                // Length score
                if (password.length >= 16) score += 4;
                else if (password.length >= 12) score += 3;
                else if (password.length >= 8) score += 2;
                else if (password.length >= 4) score += 1;
                
                // Character type scores
                if (/[a-z]/.test(password)) score += 1;
                if (/[A-Z]/.test(password)) score += 1;
                if (/\d/.test(password)) score += 1;
                if (/[^A-Za-z0-9]/.test(password)) score += 2;
                
                // Bonus for mixed case
                if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
                
                // Bonus for letters and numbers
                if (/[A-Za-z]/.test(password) && /\d/.test(password)) score += 1;
                
                // Penalty for common patterns
                const commonPatterns = [
                    /^[0-9]+$/,           // All numbers
                    /^[a-z]+$/,           // All lowercase
                    /^[A-Z]+$/,           // All uppercase
                    /^(.)\1+$/            // All same character
                ];
                
                for (const pattern of commonPatterns) {
                    if (pattern.test(password)) {
                        score = Math.max(0, score - 2);
                        break;
                    }
                }
                
                // Penalty for sequential characters
                if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password)) {
                    score = Math.max(0, score - 1);
                }
                
                // Penalty for keyboard patterns
                const keyboardPatterns = [
                    "qwerty", "asdfgh", "zxcvbn",
                    "123456", "654321"
                ];
                
                for (const pattern of keyboardPatterns) {
                    if (password.toLowerCase().includes(pattern)) {
                        score = Math.max(0, score - 2);
                        break;
                    }
                }
                
                // Cap the score
                score = Math.min(score, 10);
                
                // Determine level
                let level = strengthLevels[0];
                for (let i = strengthLevels.length - 1; i >= 0; i--) {
                    if (score >= strengthLevels[i].minScore) {
                        level = strengthLevels[i];
                        break;
                    }
                }
                
                return {
                    score,
                    level: level.name,
                    color: level.color,
                    percentage: (score / 10) * 100,
                    suggestions: this.getSuggestions(password, score)
                };
            },
            
            getSuggestions(password, score) {
                const suggestions = [];
                
                if (password.length < 8) {
                    suggestions.push("Make your password longer (at least 8 characters)");
                }
                
                if (!/[A-Z]/.test(password)) {
                    suggestions.push("Add an uppercase letter");
                }
                
                if (!/[a-z]/.test(password)) {
                    suggestions.push("Add a lowercase letter");
                }
                
                if (!/\d/.test(password)) {
                    suggestions.push("Add a number");
                }
                
                if (!/[^A-Za-z0-9]/.test(password)) {
                    suggestions.push("Add a special character");
                }
                
                if (score < 6 && suggestions.length === 0) {
                    suggestions.push("Avoid common words and patterns");
                }
                
                return suggestions;
            },
            
            displayStrength(password) {
                const result = this.calculate(password);
                
                console.log(`Password: "${password}"`);
                console.log(`Strength: ${result.level} (${result.score}/10)`);
                console.log(`Progress: ${result.percentage.toFixed(1)}%`);
                console.log(`Color: ${result.color}`);
                
                // Visual representation
                const bars = 10;
                const filledBars = Math.round((result.score / 10) * bars);
                const visual = "█".repeat(filledBars) + "░".repeat(bars - filledBars);
                console.log(`Meter: [${visual}]`);
                
                if (result.suggestions.length > 0) {
                    console.log("Suggestions:");
                    result.suggestions.forEach((suggestion, i) => {
                        console.log(`  ${i + 1}. ${suggestion}`);
                    });
                }
                
                console.log(); // Empty line
            }
        };
    }
    
    // Test the strength meter
    console.log("Password Strength Meter Tests:\n");
    
    const meter = createStrengthMeter();
    
    const passwordsToTest = [
        "a",              // Very weak
        "password",       // Weak (common)
        "Password",       // Fair
        "Password123",    // Good
        "P@ssw0rd123!",   // Strong
        "MySuperStrongP@ssw0rd2024!", // Very strong
        "123456",         // Very weak (common pattern)
        "qwerty",         // Very weak (keyboard pattern)
        "Aa1!",           // Fair (short but has all types)
        "AAAAAAAA",       // Weak (all same character)
    ];
    
    passwordsToTest.forEach(password => {
        meter.displayStrength(password);
    });
    
    // Interactive demo (simulated)
    console.log("Interactive Demo (simulated typing):");
    const demoPassword = "MyP@ssw0rd";
    for (let i = 1; i <= demoPassword.length; i++) {
        const partialPassword = demoPassword.slice(0, i);
        const result = meter.calculate(partialPassword);
        console.log(`"${partialPassword}" -> ${result.level}`);
    }
}

// ==========================
// EXERCISE 3: SHOPPING CART CALCULATOR
// ==========================

console.log("\n\n📝 EXERCISE 3: SHOPPING CART CALCULATOR");
console.log("======================================\n");

/**
 * Task 3.1: Basic Cart Calculator
 */
function exercise3_1() {
    console.log("Task 3.1: Basic Cart Calculator");
    console.log("-".repeat(30));
    
    // TODO: Create a shopping cart calculator
    // Calculate subtotal, discounts, tax, and total
    
    class ShoppingCart {
        constructor() {
            this.items = [];
            this.coupon = null;
            this.shippingAddress = null;
        }
        
        addItem(product, quantity = 1) {
            if (quantity <= 0) {
                throw new Error("Quantity must be positive");
            }
            
            const existingItem = this.items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({
                    ...product,
                    quantity,
                    total: product.price * quantity
                });
            }
            
            this.updateItemTotals();
            return this;
        }
        
        removeItem(productId, quantity = null) {
            const itemIndex = this.items.findIndex(item => item.id === productId);
            
            if (itemIndex === -1) {
                throw new Error(`Product ${productId} not found in cart`);
            }
            
            const item = this.items[itemIndex];
            
            if (quantity === null || quantity >= item.quantity) {
                // Remove entire item
                this.items.splice(itemIndex, 1);
            } else {
                // Reduce quantity
                item.quantity -= quantity;
                if (item.quantity <= 0) {
                    this.items.splice(itemIndex, 1);
                } else {
                    item.total = item.price * item.quantity;
                }
            }
            
            this.updateItemTotals();
            return this;
        }
        
        updateItemTotals() {
            this.items.forEach(item => {
                item.total = item.price * item.quantity;
            });
        }
        
        applyCoupon(code) {
            // Simulate coupon validation
            const validCoupons = {
                "SAVE10": { type: "percentage", value: 0.1, minPurchase: 0 },
                "SAVE20": { type: "percentage", value: 0.2, minPurchase: 50 },
                "FREESHIP": { type: "shipping", value: 0, minPurchase: 0 },
                "5OFF": { type: "fixed", value: 5, minPurchase: 25 }
            };
            
            this.coupon = validCoupons[code] || null;
            
            if (!this.coupon) {
                throw new Error(`Invalid coupon code: ${code}`);
            }
            
            return this;
        }
        
        calculate() {
            // Calculate subtotal
            const subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
            
            // Apply coupon discount
            let discount = 0;
            let shippingDiscount = 0;
            
            if (this.coupon) {
                if (subtotal >= this.coupon.minPurchase) {
                    switch (this.coupon.type) {
                        case "percentage":
                            discount = subtotal * this.coupon.value;
                            break;
                        case "fixed":
                            discount = Math.min(this.coupon.value, subtotal);
                            break;
                        case "shipping":
                            shippingDiscount = this.calculateShipping();
                            break;
                    }
                }
            }
            
            // Calculate shipping
            let shipping = this.calculateShipping();
            shipping = Math.max(0, shipping - shippingDiscount);
            
            // Calculate tax (simplified)
            const taxRate = this.getTaxRate();
            const taxableAmount = subtotal - discount;
            const tax = taxableAmount * taxRate;
            
            // Calculate total
            const total = subtotal - discount + shipping + tax;
            
            return {
                items: this.items,
                subtotal: this.formatCurrency(subtotal),
                discount: this.formatCurrency(discount),
                shipping: this.formatCurrency(shipping),
                tax: this.formatCurrency(tax),
                total: this.formatCurrency(total),
                itemCount: this.items.reduce((count, item) => count + item.quantity, 0),
                couponApplied: this.coupon ? this.coupon.type : null
            };
        }
        
        calculateShipping() {
            if (this.items.length === 0) return 0;
            
            const subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
            
            // Free shipping for orders over $100
            if (subtotal >= 100) return 0;
            
            // Calculate based on weight and distance (simplified)
            const totalWeight = this.items.reduce((weight, item) => {
                return weight + (item.weight || 0.5) * item.quantity;
            }, 0);
            
            let shipping = 0;
            
            if (totalWeight <= 1) {
                shipping = 5.99;
            } else if (totalWeight <= 5) {
                shipping = 9.99;
            } else if (totalWeight <= 10) {
                shipping = 14.99;
            } else {
                shipping = 19.99;
            }
            
            // Express shipping option (simulated)
            if (this.shippingAddress?.express) {
                shipping *= 1.5;
            }
            
            return shipping;
        }
        
        getTaxRate() {
            // Simplified tax rates by state
            const taxRates = {
                "CA": 0.0825,  // California
                "NY": 0.08875, // New York
                "TX": 0.0625,  // Texas
                "FL": 0.06,    // Florida
                "WA": 0.065,   // Washington
                "default": 0.07
            };
            
            const state = this.shippingAddress?.state || "default";
            return taxRates[state] || taxRates.default;
        }
        
        formatCurrency(amount) {
            return parseFloat(amount.toFixed(2));
        }
        
        setShippingAddress(address) {
            this.shippingAddress = address;
            return this;
        }
        
        clear() {
            this.items = [];
            this.coupon = null;
            return this;
        }
        
        displayCart() {
            const calculation = this.calculate();
            
            console.log("🛒 SHOPPING CART");
            console.log("=".repeat(40));
            
            if (this.items.length === 0) {
                console.log("Cart is empty");
                return;
            }
            
            // Display items
            console.log("Items:");
            this.items.forEach((item, index) => {
                console.log(`  ${index + 1}. ${item.name}`);
                console.log(`     Quantity: ${item.quantity} × $${item.price} = $${item.total}`);
            });
            
            console.log("\nSummary:");
            console.log(`  Items: ${calculation.itemCount}`);
            console.log(`  Subtotal: $${calculation.subtotal}`);
            
            if (calculation.discount > 0) {
                console.log(`  Discount: -$${calculation.discount}`);
            }
            
            console.log(`  Shipping: $${calculation.shipping}`);
            console.log(`  Tax: $${calculation.tax}`);
            console.log(`  Total: $${calculation.total}`);
            
            if (this.coupon) {
                console.log(`\n  Coupon: ${this.coupon.type} discount applied`);
            }
        }
    }
    
    // Test the shopping cart
    console.log("Testing Shopping Cart:\n");
    
    const cart = new ShoppingCart();
    
    // Define some products
    const products = {
        laptop: { id: 1, name: "Laptop", price: 999.99, weight: 3 },
        mouse: { id: 2, name: "Wireless Mouse", price: 29.99, weight: 0.2 },
        keyboard: { id: 3, name: "Mechanical Keyboard", price: 89.99, weight: 1.5 },
        headphones: { id: 4, name: "Noise Cancelling Headphones", price: 199.99, weight: 0.8 }
    };
    
    // Scenario 1: Basic cart
    console.log("Scenario 1: Basic Cart");
    console.log("-".repeat(30));
    cart.addItem(products.laptop, 1)
        .addItem(products.mouse, 2)
        .setShippingAddress({ state: "CA", express: false });
    cart.displayCart();
    
    // Scenario 2: With coupon
    console.log("\n\nScenario 2: With Coupon");
    console.log("-".repeat(30));
    cart.clear()
        .addItem(products.laptop, 1)
        .addItem(products.headphones, 1)
        .applyCoupon("SAVE10")
        .setShippingAddress({ state: "NY", express: true });
    cart.displayCart();
    
    // Scenario 3: Free shipping
    console.log("\n\nScenario 3: Free Shipping (order > $100)");
    console.log("-".repeat(30));
    cart.clear()
        .addItem(products.laptop, 1)
        .setShippingAddress({ state: "TX", express: false });
    cart.displayCart();
    
    // Scenario 4: Empty cart
    console.log("\n\nScenario 4: Empty Cart");
    console.log("-".repeat(30));
    cart.clear().displayCart();
    
    // Scenario 5: Error handling
    console.log("\n\nScenario 5: Error Handling");
    console.log("-".repeat(30));
    try {
        cart.addItem(products.mouse, -1);
    } catch (error) {
        console.log(`Error caught: ${error.message}`);
    }
    
    try {
        cart.applyCoupon("INVALID");
    } catch (error) {
        console.log(`Error caught: ${error.message}`);
    }
}

/**
 * Task 3.2: Advanced Cart Features
 */
function exercise3_2() {
    console.log("\n\nTask 3.2: Advanced Cart Features");
    console.log("-".repeat(30));
    
    // TODO: Add advanced features to shopping cart
    
    class AdvancedShoppingCart {
        constructor() {
            this.items = [];
            this.coupons = [];
            this.shippingAddress = null;
            this.paymentMethod = null;
            this.inventory = new Map(); // Simulated inventory
            this.initializeInventory();
        }
        
        initializeInventory() {
            // Simulated inventory
            this.inventory.set(1, { stock: 10, reserved: 0 });
            this.inventory.set(2, { stock: 50, reserved: 0 });
            this.inventory.set(3, { stock: 20, reserved: 0 });
            this.inventory.set(4, { stock: 15, reserved: 0 });
        }
        
        checkInventory(productId, quantity) {
            const item = this.inventory.get(productId);
            if (!item) return false;
            return item.stock - item.reserved >= quantity;
        }
        
        reserveInventory(productId, quantity) {
            const item = this.inventory.get(productId);
            if (!item || item.stock - item.reserved < quantity) {
                throw new Error(`Insufficient inventory for product ${productId}`);
            }
            item.reserved += quantity;
            return true;
        }
        
        releaseInventory(productId, quantity) {
            const item = this.inventory.get(productId);
            if (item) {
                item.reserved = Math.max(0, item.reserved - quantity);
            }
        }
        
        addItem(product, quantity = 1) {
            // Validate quantity
            if (quantity <= 0) {
                throw new Error("Quantity must be positive");
            }
            
            // Check inventory
            if (!this.checkInventory(product.id, quantity)) {
                throw new Error(`Product ${product.name} is out of stock`);
            }
            
            // Reserve inventory
            this.reserveInventory(product.id, quantity);
            
            // Add to cart
            const existingItem = this.items.find(item => item.id === product.id);
            
            if (existingItem) {
                // Release old reservation
                this.releaseInventory(product.id, existingItem.quantity);
                // Reserve new total
                this.reserveInventory(product.id, existingItem.quantity + quantity);
                
                existingItem.quantity += quantity;
                existingItem.total = existingItem.price * existingItem.quantity;
            } else {
                this.items.push({
                    ...product,
                    quantity,
                    total: product.price * quantity
                });
            }
            
            return this;
        }
        
        removeItem(productId, quantity = null) {
            const itemIndex = this.items.findIndex(item => item.id === productId);
            
            if (itemIndex === -1) {
                throw new Error(`Product ${productId} not found in cart`);
            }
            
            const item = this.items[itemIndex];
            const removeQuantity = quantity === null ? item.quantity : Math.min(quantity, item.quantity);
            
            // Release inventory
            this.releaseInventory(productId, removeQuantity);
            
            if (quantity === null || removeQuantity >= item.quantity) {
                // Remove entire item
                this.items.splice(itemIndex, 1);
            } else {
                // Reduce quantity
                item.quantity -= removeQuantity;
                item.total = item.price * item.quantity;
            }
            
            return this;
        }
        
        applyCoupon(coupon) {
            // Validate coupon
            if (!this.validateCoupon(coupon)) {
                throw new Error("Invalid or expired coupon");
            }
            
            // Check if coupon can be combined
            if (!coupon.combinable && this.coupons.length > 0) {
                throw new Error("This coupon cannot be combined with others");
            }
            
            // Check if coupon already applied
            if (this.coupons.some(c => c.code === coupon.code)) {
                throw new Error("Coupon already applied");
            }
            
            this.coupons.push(coupon);
            return this;
        }
        
        validateCoupon(coupon) {
            // Check expiration
            if (coupon.expires && new Date(coupon.expires) < new Date()) {
                return false;
            }
            
            // Check minimum purchase
            const subtotal = this.getSubtotal();
            if (coupon.minPurchase && subtotal < coupon.minPurchase) {
                return false;
            }
            
            // Check product restrictions
            if (coupon.restrictedProducts && coupon.restrictedProducts.length > 0) {
                const hasRestrictedProduct = this.items.some(item => 
                    coupon.restrictedProducts.includes(item.id)
                );
                if (hasRestrictedProduct) {
                    return false;
                }
            }
            
            return true;
        }
        
        getSubtotal() {
            return this.items.reduce((sum, item) => sum + item.total, 0);
        }
        
        calculateDiscounts() {
            let totalDiscount = 0;
            const appliedCoupons = [];
            
            // Apply coupons in priority order
            const sortedCoupons = [...this.coupons].sort((a, b) => b.priority - a.priority);
            
            let remainingAmount = this.getSubtotal();
            
            for (const coupon of sortedCoupons) {
                let discount = 0;
                
                switch (coupon.type) {
                    case "percentage":
                        discount = remainingAmount * coupon.value;
                        break;
                    case "fixed":
                        discount = Math.min(coupon.value, remainingAmount);
                        break;
                    case "bogo": // Buy One Get One
                        discount = this.calculateBOGODiscount(coupon);
                        break;
                    case "category": // Category discount
                        discount = this.calculateCategoryDiscount(coupon);
                        break;
                }
                
                // Apply discount cap if exists
                if (coupon.maxDiscount) {
                    discount = Math.min(discount, coupon.maxDiscount);
                }
                
                totalDiscount += discount;
                remainingAmount = Math.max(0, remainingAmount - discount);
                
                appliedCoupons.push({
                    code: coupon.code,
                    discount: this.formatCurrency(discount)
                });
            }
            
            return {
                totalDiscount: this.formatCurrency(totalDiscount),
                appliedCoupons
            };
        }
        
        calculateBOGODiscount(coupon) {
            const eligibleItems = this.items.filter(item => 
                coupon.applicableProducts.includes(item.id)
            );
            
            let discount = 0;
            
            for (const item of eligibleItems) {
                const freeItems = Math.floor(item.quantity / 2);
                discount += freeItems * item.price;
            }
            
            return discount;
        }
        
        calculateCategoryDiscount(coupon) {
            const eligibleItems = this.items.filter(item => 
                item.category === coupon.category
            );
            
            const categoryTotal = eligibleItems.reduce((sum, item) => sum + item.total, 0);
            return categoryTotal * coupon.value;
        }
        
        calculateTax() {
            const subtotal = this.getSubtotal();
            const { totalDiscount } = this.calculateDiscounts();
            const taxableAmount = subtotal - totalDiscount;
            
            // Get tax rate based on address and item categories
            let taxRate = this.getTaxRate();
            
            // Some items might be tax-exempt (e.g., groceries in some states)
            const taxableItems = this.items.filter(item => !item.taxExempt);
            const taxableTotal = taxableItems.reduce((sum, item) => sum + item.total, 0);
            
            return this.formatCurrency(taxableTotal * taxRate);
        }
        
        getTaxRate() {
            // Complex tax calculation based on address and item types
            const baseRate = this.shippingAddress?.state === "CA' ? 0.0825 : 0.07;
            
            // Additional tax for certain categories
            let additionalTax = 0;
            this.items.forEach(item => {
                if (item.category === "electronics") {
                    additionalTax += item.total * 0.01; // 1% additional for electronics
                }
            });
            
            return baseRate;
        }
        
        calculateShipping() {
            if (this.items.length === 0) return 0;
            
            // Free shipping for certain conditions
            if (this.coupons.some(c => c.type === "free_shipping")) {
                return 0;
            }
            
            // Calculate based on multiple factors
            const subtotal = this.getSubtotal();
            const totalWeight = this.items.reduce((w, item) => w + (item.weight || 0.5) * item.quantity, 0);
            const destination = this.shippingAddress?.country || "US";
            const shippingMethod = this.shippingAddress?.shippingMethod || "standard";
            
            let shipping = 0;
            
            // Base rate by weight
            if (totalWeight <= 1) shipping = 5.99;
            else if (totalWeight <= 5) shipping = 9.99;
            else if (totalWeight <= 10) shipping = 14.99;
            else shipping = 19.99 + (totalWeight - 10) * 2; // $2 per additional kg
            
            // International shipping
            if (destination !== "US") {
                shipping *= 2;
            }
            
            // Shipping method multiplier
            const multipliers = {
                standard: 1,
                express: 1.5,
                overnight: 2
            };
            
            shipping *= multipliers[shippingMethod] || 1;
            
            // Free shipping for orders over $100 (US only)
            if (subtotal >= 100 && destination === "US") {
                shipping = Math.max(0, shipping - 10); // $10 off
            }
            
            return this.formatCurrency(shipping);
        }
        
        checkout(paymentDetails) {
            try {
                console.log("Starting checkout process...");
                
                // 1. Validate cart
                if (this.items.length === 0) {
                    throw new Error("Cart is empty");
                }
                
                // 2. Validate inventory (final check)
                for (const item of this.items) {
                    if (!this.checkInventory(item.id, item.quantity)) {
                        throw new Error(`Insufficient inventory for ${item.name}`);
                    }
                }
                
                // 3. Calculate totals
                const subtotal = this.getSubtotal();
                const discounts = this.calculateDiscounts();
                const tax = this.calculateTax();
                const shipping = this.calculateShipping();
                const total = subtotal - discounts.totalDiscount + tax + shipping;
                
                // 4. Process payment (simulated)
                const paymentResult = this.processPayment(paymentDetails, total);
                
                if (!paymentResult.success) {
                    throw new Error(`Payment failed: ${paymentResult.error}`);
                }
                
                // 5. Update inventory (convert reserved to sold)
                for (const item of this.items) {
                    const inventoryItem = this.inventory.get(item.id);
                    if (inventoryItem) {
                        inventoryItem.stock -= item.quantity;
                        inventoryItem.reserved -= item.quantity;
                    }
                }
                
                // 6. Create order
                const order = {
                    id: `ORD-${Date.now()}`,
                    items: this.items.map(item => ({
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    subtotal: this.formatCurrency(subtotal),
                    discount: discounts.totalDiscount,
                    tax,
                    shipping,
                    total: this.formatCurrency(total),
                    coupons: discounts.appliedCoupons,
                    shippingAddress: this.shippingAddress,
                    payment: paymentResult,
                    status: "completed",
                    createdAt: new Date().toISOString()
                };
                
                // 7. Clear cart
                this.clear();
                
                console.log("Checkout completed successfully!");
                return order;
                
            } catch (error) {
                console.error("Checkout failed:", error.message);
                
                // Release all reserved inventory on failure
                this.items.forEach(item => {
                    this.releaseInventory(item.id, item.quantity);
                });
                
                throw error;
            }
        }
        
        processPayment(paymentDetails, amount) {
            // Simulated payment processing
            console.log(`Processing payment of $${amount}...`);
            
            // Simulate random failures
            if (Math.random() > 0.9) {
                return {
                    success: false,
                    error: "Payment gateway timeout",
                    retryable: true
                };
            }
            
            if (Math.random() > 0.95) {
                return {
                    success: false,
                    error: "Insufficient funds",
                    retryable: false
                };
            }
            
            return {
                success: true,
                transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                amount: this.formatCurrency(amount),
                method: paymentDetails.type,
                timestamp: new Date().toISOString()
            };
        }
        
        formatCurrency(amount) {
            return parseFloat(amount.toFixed(2));
        }
        
        clear() {
            // Release all reserved inventory
            this.items.forEach(item => {
                this.releaseInventory(item.id, item.quantity);
            });
            
            this.items = [];
            this.coupons = [];
            return this;
        }
        
        displayCart() {
            console.log("\n🛒 ADVANCED SHOPPING CART");
            console.log("=".repeat(50));
            
            if (this.items.length === 0) {
                console.log("Cart is empty");
                return;
            }
            
            // Display items with inventory info
            console.log("Items:");
            this.items.forEach((item, index) => {
                const inventory = this.inventory.get(item.id);
                const available = inventory ? inventory.stock - inventory.reserved : 0;
                
                console.log(`  ${index + 1}. ${item.name}`);
                console.log(`     Quantity: ${item.quantity} × $${item.price} = $${item.total}`);
                console.log(`     Available in stock: ${available}`);
            });
            
            // Calculate and display summary
            const subtotal = this.getSubtotal();
            const discounts = this.calculateDiscounts();
            const tax = this.calculateTax();
            const shipping = this.calculateShipping();
            const total = subtotal - discounts.totalDiscount + tax + shipping;
            
            console.log("\nSummary:");
            console.log(`  Subtotal: $${this.formatCurrency(subtotal)}`);
            
            if (discounts.totalDiscount > 0) {
                console.log(`  Discounts: -$${discounts.totalDiscount}`);
                discounts.appliedCoupons.forEach(coupon => {
                    console.log(`    • ${coupon.code}: -$${coupon.discount}`);
                });
            }
            
            console.log(`  Tax: $${tax}`);
            console.log(`  Shipping: $${shipping}`);
            console.log(`  Total: $${this.formatCurrency(total)}`);
            
            // Display coupons
            if (this.coupons.length > 0) {
                console.log("\nApplied Coupons:");
                this.coupons.forEach(coupon => {
                    console.log(`  • ${coupon.code} (${coupon.type})`);
                });
            }
        }
    }
    
    // Test the advanced shopping cart
    console.log("Testing Advanced Shopping Cart:\n");
    
    const cart = new AdvancedShoppingCart();
    
    // Define products with categories
    const products = [
        { id: 1, name: "MacBook Pro", price: 1299, category: "electronics", weight: 2 },
        { id: 2, name: "Wireless Mouse", price: 49, category: "electronics", weight: 0.2 },
        { id: 3, name: "Organic Coffee", price: 15, category: "groceries", weight: 0.5, taxExempt: true },
        { id: 4, name: "Desk Lamp", price: 35, category: "home", weight: 1 }
    ];
    
    // Define coupons
    const coupons = [
        {
            code: "WELCOME10",
            type: "percentage",
            value: 0.1,
            minPurchase: 0,
            combinable: false,
            priority: 1
        },
        {
            code: "FREESHIP",
            type: "free_shipping",
            minPurchase: 50,
            combinable: true,
            priority: 2
        },
        {
            code: "BOGO50",
            type: "bogo",
            applicableProducts: [2], // Mouse
            value: 0.5,
            combinable: true,
            priority: 3
        }
    ];
    
    // Scenario: Complex purchase
    console.log("Scenario: Complex Purchase with Multiple Coupons");
    console.log("-".repeat(50));
    
    try {
        cart.addItem(products[0], 1)  // MacBook
            .addItem(products[1], 3)  // 3 Mice (BOGO applies)
            .addItem(products[2], 2)  // Coffee (tax exempt)
            .applyCoupon(coupons[0])  // 10% off
            .applyCoupon(coupons[1])  // Free shipping
            .applyCoupon(coupons[2])  // BOGO on mice
            .setShippingAddress({
                country: "US",
                state: "CA",
                shippingMethod: "express"
            });
        
        cart.displayCart();
        
        // Simulate checkout
        console.log("\n" + "=".repeat(50));
        console.log("PROCEEDING TO CHECKOUT");
        console.log("=".repeat(50));
        
        const order = cart.checkout({
            type: "credit_card",
            number: "4111111111111111",
            expiry: "12/25",
            cvv: "123"
        });
        
        console.log("\nOrder created:", order);
        
    } catch (error) {
        console.error("Error:", error.message);
    }
    
    // Display final inventory
    console.log("\nFinal Inventory Status:");
    for (const [id, item] of cart.inventory) {
        console.log(`  Product ${id}: ${item.stock} in stock, ${item.reserved} reserved`);
    }
}

// ==========================
// EXERCISE 4: DATA PROCESSOR
// ==========================

console.log("\n\n📝 EXERCISE 4: DATA PROCESSOR");
console.log("===========================\n");

/**
 * Task 4.1: Basic Data Processing
 */
function exercise4_1() {
    console.log("Task 4.1: Basic Data Processing");
    console.log("-".repeat(30));
    
    // TODO: Process an array of data with various operations
    
    class DataProcessor {
        constructor(data) {
            this.originalData = [...data];
            this.processedData = [...data];
            this.errors = [];
            this.stats = {};
        }
        
        // Filter methods
        filterValid() {
            this.processedData = this.processedData.filter(item => 
                item !== null && 
                item !== undefined && 
                !Number.isNaN(item.value)
            );
            return this;
        }
        
        filterByRange(min, max) {
            this.processedData = this.processedData.filter(item => 
                item.value >= min && item.value <= max
            );
            return this;
        }
        
        filterByCategory(category) {
            this.processedData = this.processedData.filter(item => 
                item.category === category
            );
            return this;
        }
        
        // Transform methods
        normalize() {
            if (this.processedData.length === 0) return this;
            
            const values = this.processedData.map(item => item.value);
            const min = Math.min(...values);
            const max = Math.max(...values);
            
            if (min === max) {
                // All values are the same
                this.processedData.forEach(item => {
                    item.normalized = 0.5;
                });
            } else {
                this.processedData.forEach(item => {
                    item.normalized = (item.value - min) / (max - min);
                });
            }
            
            return this;
        }
        
        categorize() {
            this.processedData.forEach(item => {
                if (!item.category) {
                    if (item.value < 33) item.category = "low";
                    else if (item.value < 66) item.category = "medium";
                    else item.category = "high";
                }
            });
            return this;
        }
        
        // Aggregation methods
        calculateStats() {
            if (this.processedData.length === 0) {
                this.stats = { count: 0 };
                return this;
            }
            
            const values = this.processedData.map(item => item.value);
            
            this.stats = {
                count: values.length,
                sum: values.reduce((a, b) => a + b, 0),
                mean: values.reduce((a, b) => a + b, 0) / values.length,
                min: Math.min(...values),
                max: Math.max(...values),
                median: this.calculateMedian(values),
                stdDev: this.calculateStdDev(values)
            };
            
            // Category distribution
            this.stats.categories = {};
            this.processedData.forEach(item => {
                const cat = item.category || "uncategorized";
                this.stats.categories[cat] = (this.stats.categories[cat] || 0) + 1;
            });
            
            return this;
        }
        
        calculateMedian(values) {
            const sorted = [...values].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            
            if (sorted.length % 2 === 0) {
                return (sorted[mid - 1] + sorted[mid]) / 2;
            }
            return sorted[mid];
        }
        
        calculateStdDev(values) {
            const mean = values.reduce((a, b) => a + b, 0) / values.length;
            const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
            const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
            return Math.sqrt(variance);
        }
        
        // Grouping
        groupByCategory() {
            const groups = {};
            
            this.processedData.forEach(item => {
                const category = item.category || "uncategorized";
                if (!groups[category]) {
                    groups[category] = [];
                }
                groups[category].push(item);
            });
            
            return groups;
        }
        
        // Error handling
        validate() {
            this.errors = [];
            
            this.originalData.forEach((item, index) => {
                if (item === null || item === undefined) {
                    this.errors.push(`Item ${index}: is null or undefined`);
                } else if (typeof item.value !== 'number' || Number.isNaN(item.value)) {
                    this.errors.push(`Item ${index}: has invalid value (${item.value})`);
                } else if (item.value < 0) {
                    this.errors.push(`Item ${index}: has negative value (${item.value})`);
                }
            });
            
            return this.errors.length === 0;
        }
        
        // Output
        getResults() {
            return {
                originalCount: this.originalData.length,
                processedCount: this.processedData.length,
                filteredCount: this.originalData.length - this.processedData.length,
                data: this.processedData,
                stats: this.stats,
                errors: this.errors,
                isValid: this.errors.length === 0
            };
        }
        
        displayResults() {
            const results = this.getResults();
            
            console.log("📊 DATA PROCESSING RESULTS");
            console.log("=".repeat(40));
            console.log(`Original items: ${results.originalCount}`);
            console.log(`Processed items: ${results.processedCount}`);
            console.log(`Filtered out: ${results.filteredCount}`);
            
            if (results.errors.length > 0) {
                console.log(`\nErrors found: ${results.errors.length}`);
                results.errors.forEach(error => console.log(`  ⚠️  ${error}`));
            }
            
            if (Object.keys(results.stats).length > 0) {
                console.log("\nStatistics:");
                Object.entries(results.stats).forEach(([key, value]) => {
                    if (typeof value === 'number') {
                        console.log(`  ${key}: ${value.toFixed(2)}`);
                    } else if (key === 'categories') {
                        console.log(`  ${key}:`);
                        Object.entries(value).forEach(([cat, count]) => {
                            console.log(`    ${cat}: ${count} items`);
                        });
                    }
                });
            }
            
            console.log("\nSample data (first 5 items):");
            results.data.slice(0, 5).forEach((item, index) => {
                console.log(`  ${index + 1}. Value: ${item.value}, Category: ${item.category || 'N/A'}, Normalized: ${item.normalized?.toFixed(2) || 'N/A'}`);
            });
            
            if (results.data.length > 5) {
                console.log(`  ... and ${results.data.length - 5} more items`);
            }
        }
    }
    
    // Generate test data
    function generateTestData(count) {
        const data = [];
        const categories = ["A", "B", "C", null];
        
        for (let i = 0; i < count; i++) {
            // Intentionally create some invalid data
            if (Math.random() < 0.1) {
                data.push(null); // Invalid entry
            } else {
                data.push({
                    id: i,
                    value: Math.random() < 0.05 ? NaN : Math.random() * 100, // Some NaN values
                    category: categories[Math.floor(Math.random() * categories.length)],
                    timestamp: new Date(Date.now() - Math.random() * 1000000000)
                });
            }
        }
        
        return data;
    }
    
    // Test the data processor
    console.log("Testing Data Processor:\n");
    
    const testData = generateTestData(50);
    console.log(`Generated ${testData.length} test items`);
    
    const processor = new DataProcessor(testData);
    
    // Process the data
    console.log("\nProcessing pipeline:");
    processor.validate()
        .filterValid()
        .filterByRange(0, 100)
        .categorize()
        .normalize()
        .calculateStats();
    
    // Display results
    processor.displayResults();
    
    // Show grouped data
    const groups = processor.groupByCategory();
    console.log("\nGrouped by category:");
    Object.entries(groups).forEach(([category, items]) => {
        console.log(`  ${category}: ${items.length} items`);
    });
    
    // Test edge cases
    console.log("\n\nEdge Case Tests:");
    console.log("-".repeat(30));
    
    // Empty data
    console.log("\n1. Empty data:");
    const emptyProcessor = new DataProcessor([]);
    emptyProcessor.calculateStats().displayResults();
    
    // All invalid data
    console.log("\n2. All invalid data:");
    const invalidData = [null, undefined, { value: NaN }, { value: -10 }];
    const invalidProcessor = new DataProcessor(invalidData);
    invalidProcessor.validate().filterValid().calculateStats().displayResults();
    
    // Single value
    console.log("\n3. Single value:");
    const singleProcessor = new DataProcessor([{ value: 42 }]);
    singleProcessor.calculateStats().displayResults();
}

/**
 * Task 4.2: Advanced Data Processing Pipeline
 */
function exercise4_2() {
    console.log("\n\nTask 4.2: Advanced Data Processing Pipeline");
    console.log("-".repeat(30));
    
    // TODO: Create a flexible data processing pipeline
    
    class DataPipeline {
        constructor() {
            this.steps = [];
            this.data = null;
            this.context = {};
            this.errors = [];
            this.metrics = {
                startTime: null,
                endTime: null,
                stepTimes: {},
                memoryUsage: []
            };
        }
        
        load(data) {
            this.data = Array.isArray(data) ? [...data] : [data];
            this.context.source = "loaded";
            return this;
        }
        
        addStep(name, processor, config = {}) {
            this.steps.push({
                name,
                processor,
                config,
                enabled: true
            });
            return this;
        }
        
        removeStep(name) {
            this.steps = this.steps.filter(step => step.name !== name);
            return this;
        }
        
        async execute() {
            console.log(`🚀 Executing pipeline with ${this.steps.length} steps...`);
            
            this.metrics.startTime = Date.now();
            this.errors = [];
            
            try {
                let currentData = this.data;
                
                for (let i = 0; i < this.steps.length; i++) {
                    const step = this.steps[i];
                    
                    if (!step.enabled) {
                        console.log(`  ⏭️  Skipping disabled step: ${step.name}`);
                        continue;
                    }
                    
                    const stepStartTime = Date.now();
                    console.log(`  🔄 Step ${i + 1}/${this.steps.length}: ${step.name}`);
                    
                    try {
                        // Execute step
                        const result = await step.processor(currentData, this.context, step.config);
                        
                        // Update data
                        currentData = result.data || currentData;
                        
                        // Update context
                        if (result.context) {
                            Object.assign(this.context, result.context);
                        }
                        
                        // Collect errors from step
                        if (result.errors) {
                            this.errors.push(...result.errors.map(e => `[${step.name}] ${e}`));
                        }
                        
                        // Record metrics
                        const stepTime = Date.now() - stepStartTime;
                        this.metrics.stepTimes[step.name] = stepTime;
                        
                        // Track memory (simulated)
                        this.metrics.memoryUsage.push({
                            step: step.name,
                            dataSize: JSON.stringify(currentData).length,
                            timestamp: Date.now()
                        });
                        
                        console.log(`     ✅ Completed in ${stepTime}ms`);
                        console.log(`     📊 Data size: ${currentData.length} items`);
                        
                    } catch (error) {
                        console.error(`     ❌ Step failed: ${error.message}`);
                        
                        if (step.config.continueOnError) {
                            this.errors.push(`[${step.name}] ${error.message}`);
                            continue;
                        } else {
                            throw error;
                        }
                    }
                }
                
                this.metrics.endTime = Date.now();
                this.metrics.totalTime = this.metrics.endTime - this.metrics.startTime;
                
                console.log(`\n✅ Pipeline completed in ${this.metrics.totalTime}ms`);
                
                return {
                    success: true,
                    data: currentData,
                    context: this.context,
                    errors: this.errors,
                    metrics: this.metrics
                };
                
            } catch (error) {
                this.metrics.endTime = Date.now();
                
                return {
                    success: false,
                    error: error.message,
                    data: null,
                    context: this.context,
                    errors: this.errors,
                    metrics: this.metrics
                };
            }
        }
        
        // Built-in processors
        static processors = {
            // Validation
            validate: async (data, context, config) => {
                const errors = [];
                const validData = [];
                
                data.forEach((item, index) => {
                    try {
                        // Required fields check
                        if (config.requiredFields) {
                            config.requiredFields.forEach(field => {
                                if (item[field] === undefined || item[field] === null) {
                                    throw new Error(`Missing required field: ${field}`);
                                }
                            });
                        }
                        
                        // Type validation
                        if (config.fieldTypes) {
                            Object.entries(config.fieldTypes).forEach(([field, type]) => {
                                if (item[field] !== undefined && typeof item[field] !== type) {
                                    throw new Error(`Field ${field} should be ${type}, got ${typeof item[field]}`);
                                }
                            });
                        }
                        
                        // Range validation
                        if (config.ranges) {
                            Object.entries(config.ranges).forEach(([field, range]) => {
                                const value = item[field];
                                if (value !== undefined && (value < range.min || value > range.max)) {
                                    throw new Error(`Field ${field} out of range (${range.min}-${range.max})`);
                                }
                            });
                        }
                        
                        validData.push(item);
                        
                    } catch (error) {
                        errors.push(`Item ${index}: ${error.message}`);
                    }
                });
                
                return {
                    data: validData,
                    context: { validationErrors: errors.length },
                    errors
                };
            },
            
            // Filtering
            filter: async (data, context, config) => {
                let filteredData = [...data];
                
                if (config.condition) {
                    filteredData = filteredData.filter(config.condition);
                }
                
                if (config.exclude) {
                    filteredData = filteredData.filter(item => !config.exclude(item));
                }
                
                if (config.include) {
                    filteredData = filteredData.filter(config.include);
                }
                
                return {
                    data: filteredData,
                    context: { filteredCount: data.length - filteredData.length }
                };
            },
            
            // Transformation
            transform: async (data, context, config) => {
                const transformedData = data.map((item, index) => {
                    const transformed = { ...item };
                    
                    if (config.mappings) {
                        Object.entries(config.mappings).forEach(([field, mapping]) => {
                            if (typeof mapping === 'function') {
                                transformed[field] = mapping(item, index, context);
                            } else {
                                transformed[field] = mapping;
                            }
                        });
                    }
                    
                    if (config.computed) {
                        Object.entries(config.computed).forEach(([field, compute]) => {
                            transformed[field] = compute(item, index, context);
                        });
                    }
                    
                    return transformed;
                });
                
                return { data: transformedData };
            },
            
            // Aggregation
            aggregate: async (data, context, config) => {
                const aggregates = {};
                
                if (config.groupBy) {
                    const groups = {};
                    
                    data.forEach(item => {
                        const key = config.groupBy(item);
                        if (!groups[key]) groups[key] = [];
                        groups[key].push(item);
                    });
                    
                    Object.entries(groups).forEach(([key, groupItems]) => {
                        aggregates[key] = this.processors._aggregateGroup(groupItems, config);
                    });
                } else {
                    aggregates.all = this.processors._aggregateGroup(data, config);
                }
                
                return {
                    data: [aggregates], // Wrap in array to maintain pipeline format
                    context: { aggregates }
                };
            },
            
            // Helper for aggregation
            _aggregateGroup: (items, config) => {
                const result = {};
                
                if (config.operations) {
                    Object.entries(config.operations).forEach(([field, operation]) => {
                        const values = items.map(item => item[field]).filter(v => v !== undefined);
                        
                        switch (operation) {
                            case 'sum':
                                result[`${field}_sum`] = values.reduce((a, b) => a + b, 0);
                                break;
                            case 'avg':
                                result[`${field}_avg`] = values.length > 0 
                                    ? values.reduce((a, b) => a + b, 0) / values.length 
                                    : 0;
                                break;
                            case 'min':
                                result[`${field}_min`] = values.length > 0 ? Math.min(...values) : null;
                                break;
                            case 'max':
                                result[`${field}_max`] = values.length > 0 ? Math.max(...values) : null;
                                break;
                            case 'count':
                                result[`${field}_count`] = values.length;
                                break;
                        }
                    });
                }
                
                return {
                    count: items.length,
                    ...result
                };
            },
            
            // Sorting
            sort: async (data, context, config) => {
                const sorted = [...data].sort((a, b) => {
                    for (const { field, order = 'asc' } of config.fields) {
                        const aVal = a[field];
                        const bVal = b[field];
                        
                        if (aVal < bVal) return order === 'asc' ? -1 : 1;
                        if (aVal > bVal) return order === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
                
                return { data: sorted };
            },
            
            // Pagination
            paginate: async (data, context, config) => {
                const page = config.page || 1;
                const pageSize = config.pageSize || 10;
                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                
                const paginatedData = data.slice(start, end);
                
                return {
                    data: paginatedData,
                    context: {
                        pagination: {
                            page,
                            pageSize,
                            total: data.length,
                            totalPages: Math.ceil(data.length / pageSize),
                            hasNext: end < data.length,
                            hasPrev: start > 0
                        }
                    }
                };
            },
            
            // Export
            export: async (data, context, config) => {
                let exportData = data;
                
                if (config.format === 'json') {
                    return {
                        data: exportData,
                        context: { 
                            export: {
                                format: 'json',
                                size: JSON.stringify(exportData).length
                            }
                        }
                    };
                }
                
                if (config.format === 'csv') {
                    // Simplified CSV conversion
                    if (data.length > 0) {
                        const headers = Object.keys(data[0]);
                        const csv = [
                            headers.join(','),
                            ...data.map(item => headers.map(h => JSON.stringify(item[h])).join(','))
                        ].join('\n');
                        
                        return {
                            data: [{ csv }],
                            context: { 
                                export: {
                                    format: 'csv',
                                    size: csv.length
                                }
                            }
                        };
                    }
                }
                
                return { data: exportData };
            }
        };
    }
    
    // Test the advanced pipeline
    console.log("Testing Advanced Data Pipeline:\n");
    
    // Generate sample data
    const sampleData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
        price: Math.random() * 100 + 10,
        quantity: Math.floor(Math.random() * 50) + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        inStock: Math.random() > 0.2
    }));
    
    console.log(`Generated ${sampleData.length} sample items`);
    
    // Create and configure pipeline
    const pipeline = new DataPipeline();
    
    pipeline.load(sampleData)
        .addStep("validate", DataPipeline.processors.validate, {
            requiredFields: ['id', 'name', 'category', 'price'],
            fieldTypes: { price: 'number', quantity: 'number' },
            ranges: { price: { min: 0, max: 1000 } },
            continueOnError: true
        })
        .addStep("filter", DataPipeline.processors.filter, {
            condition: item => item.inStock && item.price > 20
        })
        .addStep("transform", DataPipeline.processors.transform, {
            computed: {
                totalValue: (item) => item.price * item.quantity,
                priceCategory: (item) => item.price < 50 ? 'low' : item.price < 100 ? 'medium' : 'high'
            }
        })
        .addStep("aggregate", DataPipeline.processors.aggregate, {
            groupBy: item => item.category,
            operations: {
                price: ['sum', 'avg', 'min', 'max'],
                quantity: ['sum', 'avg'],
                totalValue: ['sum']
            }
        })
        .addStep("sort", DataPipeline.processors.sort, {
            fields: [
                { field: 'category', order: 'asc' }
            ]
        })
        .addStep("paginate", DataPipeline.processors.paginate, {
            page: 1,
            pageSize: 5
        })
        .addStep("export", DataPipeline.processors.export, {
            format: 'json'
        });
    
    // Execute pipeline
    pipeline.execute()
        .then(result => {
            console.log("\n" + "=".repeat(50));
            console.log("PIPELINE EXECUTION RESULTS");
            console.log("=".repeat(50));
            
            console.log(`Success: ${result.success}`);
            console.log(`Total time: ${result.metrics.totalTime}ms`);
            
            if (result.errors.length > 0) {
                console.log(`\nErrors (${result.errors.length}):`);
                result.errors.forEach(error => console.log(`  ⚠️  ${error}`));
            }
            
            console.log("\nStep performance:");
            Object.entries(result.metrics.stepTimes).forEach(([step, time]) => {
                console.log(`  ${step}: ${time}ms`);
            });
            
            console.log("\nContext data:");
            Object.entries(result.context).forEach(([key, value]) => {
                console.log(`  ${key}:`, value);
            });
            
            console.log("\nFinal data (first 3 items):");
            if (result.data && result.data.length > 0) {
                result.data.slice(0, 3).forEach((item, index) => {
                    console.log(`  ${index + 1}.`, item);
                });
                if (result.data.length > 3) {
                    console.log(`  ... and ${result.data.length - 3} more items`);
                }
            }
            
            // Display aggregated results
            if (result.context.aggregates) {
                console.log("\nAggregated Results by Category:");
                Object.entries(result.context.aggregates).forEach(([category, stats]) => {
                    console.log(`\n  Category ${category}:`);
                    console.log(`    Count: ${stats.count}`);
                    console.log(`    Price - Sum: ${stats.price_sum?.toFixed(2)}, Avg: ${stats.price_avg?.toFixed(2)}`);
                    console.log(`    Quantity - Sum: ${stats.quantity_sum}, Avg: ${stats.quantity_avg?.toFixed(1)}`);
                    console.log(`    Total Value: ${stats.totalValue_sum?.toFixed(2)}`);
                });
            }
            
        })
        .catch(error => {
            console.error("Pipeline execution failed:", error);
        });
}

// ==========================
// RUN ALL EXERCISES
// ==========================

console.log("🎮 RUNNING ALL CONTROL FLOW EXERCISES");
console.log("====================================\n");

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

// Run Exercise 4
exercise4_1();
exercise4_2();

console.log("\n" + "=".repeat(60));
console.log("✅ ALL CONTROL FLOW EXERCISES COMPLETED!");
console.log("=".repeat(60));

console.log("\n📊 Summary of what you've practiced:");
console.log("-".repeat(50));
console.log("✓ Conditional statements (if/else, switch)");
console.log("✓ All loop types (for, while, do...while, for...of, for...in)");
console.log("✓ Loop control (break, continue)");
console.log("✓ Error handling (try/catch/finally)");
console.log("✓ Modern patterns and best practices");
console.log("✓ Performance optimization techniques");
console.log("✓ Real-world applications and problem-solving");

console.log("\n🚀 Next Steps:");
console.log("-".repeat(50));
console.log("1. Review any exercises you found challenging");
console.log("2. Try creating your own control flow challenges");
console.log("3. Move on to the next module: Functions & Scope");
console.log("4. Build small projects to apply these concepts");

console.log("\n🎯 Remember: Mastering control flow is essential for writing efficient, readable, and maintainable code!");

// Note: The async/await in exercise4_2 will complete after this log,
// but that's okay for demonstration purposes.
