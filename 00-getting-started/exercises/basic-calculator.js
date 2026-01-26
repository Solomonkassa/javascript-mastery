
// ============================================
// BASIC CALCULATOR - COMPREHENSIVE EXERCISE
// ============================================

console.log("🧮 BASIC CALCULATOR EXERCISE");
console.log("============================\n");

// ==========================
// EXERCISE OVERVIEW
// ==========================

/**
 * 🎯 LEARNING OBJECTIVES:
 * 1. Practice basic JavaScript syntax
 * 2. Implement arithmetic operations
 * 3. Handle user input and validation
 * 4. Create reusable functions
 * 5. Implement error handling
 * 6. Build a complete interactive program
 */

/**
 * 📋 EXERCISE STRUCTURE:
 * Part 1: Basic Calculator Functions
 * Part 2: Enhanced Calculator with Memory
 * Part 3: Scientific Calculator Functions
 * Part 4: Interactive Calculator Program
 * Part 5: Unit Testing
 */

// ==========================
// PART 1: BASIC CALCULATOR FUNCTIONS
// ==========================

console.log("PART 1: BASIC CALCULATOR FUNCTIONS");
console.log("==================================\n");

/**
 * Task 1.1: Implement Basic Arithmetic Operations
 * Create functions for addition, subtraction, multiplication, and division
 */

// TODO: Implement these basic arithmetic functions

function add(a, b) {
    // Return the sum of a and b
    return a + b;
}

function subtract(a, b) {
    // Return the difference between a and b
    return a - b;
}

function multiply(a, b) {
    // Return the product of a and b
    return a * b;
}

function divide(a, b) {
    // Return the quotient of a divided by b
    // Handle division by zero appropriately
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
}

function modulus(a, b) {
    // Return the remainder of a divided by b
    return a % b;
}

// Test your implementation
console.log("🔹 Testing Basic Arithmetic Functions:");
console.log(`add(10, 5) = ${add(10, 5)} (Expected: 15)`);
console.log(`subtract(10, 5) = ${subtract(10, 5)} (Expected: 5)`);
console.log(`multiply(10, 5) = ${multiply(10, 5)} (Expected: 50)`);
console.log(`divide(10, 5) = ${divide(10, 5)} (Expected: 2)`);
console.log(`modulus(10, 3) = ${modulus(10, 3)} (Expected: 1)`);

// Test error case
try {
    console.log(`divide(10, 0) = ${divide(10, 0)}`);
} catch (error) {
    console.log(`divide(10, 0) = Error: ${error.message}`);
}

/**
 * Task 1.2: Create a Calculator Class
 * Implement a Calculator class that encapsulates arithmetic operations
 */

class BasicCalculator {
    constructor() {
        this.lastResult = 0;
        this.history = [];
    }

    // Basic operations
    add(a, b) {
        const result = a + b;
        this._recordOperation('add', a, b, result);
        return result;
    }

    subtract(a, b) {
        const result = a - b;
        this._recordOperation('subtract', a, b, result);
        return result;
    }

    multiply(a, b) {
        const result = a * b;
        this._recordOperation('multiply', a, b, result);
        return result;
    }

    divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        const result = a / b;
        this._recordOperation('divide', a, b, result);
        return result;
    }

    modulus(a, b) {
        const result = a % b;
        this._recordOperation('modulus', a, b, result);
        return result;
    }

    // Helper method to record operations
    _recordOperation(operation, a, b, result) {
        this.lastResult = result;
        this.history.push({
            operation,
            operands: [a, b],
            result,
            timestamp: new Date().toISOString()
        });
    }

    // Get the last result
    getLastResult() {
        return this.lastResult;
    }

    // Clear history
    clearHistory() {
        this.history = [];
        this.lastResult = 0;
    }

    // Get operation history
    getHistory() {
        return [...this.history]; // Return a copy
    }

    // Display history
    displayHistory() {
        console.log("\n📜 Calculator History:");
        if (this.history.length === 0) {
            console.log("No operations recorded.");
            return;
        }

        this.history.forEach((record, index) => {
            const [a, b] = record.operands;
            console.log(`${index + 1}. ${a} ${record.operation} ${b} = ${record.result} (${record.timestamp})`);
        });
    }
}

// Test the Calculator class
console.log("\n🔹 Testing BasicCalculator Class:");
const calc = new BasicCalculator();

console.log(`calc.add(10, 5) = ${calc.add(10, 5)}`);
console.log(`calc.subtract(10, 5) = ${calc.subtract(10, 5)}`);
console.log(`calc.multiply(10, 5) = ${calc.multiply(10, 5)}`);
console.log(`calc.divide(10, 5) = ${calc.divide(10, 5)}`);
console.log(`calc.modulus(10, 3) = ${calc.modulus(10, 3)}`);

console.log(`Last result: ${calc.getLastResult()}`);
calc.displayHistory();

// ==========================
// PART 2: ENHANCED CALCULATOR WITH MEMORY
// ==========================

console.log("\n\nPART 2: ENHANCED CALCULATOR WITH MEMORY");
console.log("======================================\n");

/**
 * Task 2.1: Implement Memory Functions
 * Add memory store, recall, clear, and memory addition/subtraction
 */

class EnhancedCalculator extends BasicCalculator {
    constructor() {
        super();
        this.memory = 0;
        this.memoryHistory = [];
    }

    // Memory operations
    memoryStore(value) {
        this.memory = value;
        this._recordMemoryOperation('store', value);
        return this.memory;
    }

    memoryRecall() {
        this._recordMemoryOperation('recall', this.memory);
        return this.memory;
    }

    memoryClear() {
        const oldValue = this.memory;
        this.memory = 0;
        this._recordMemoryOperation('clear', oldValue);
        return this.memory;
    }

    memoryAdd(value) {
        const oldValue = this.memory;
        this.memory += value;
        this._recordMemoryOperation('add', value, oldValue, this.memory);
        return this.memory;
    }

    memorySubtract(value) {
        const oldValue = this.memory;
        this.memory -= value;
        this._recordMemoryOperation('subtract', value, oldValue, this.memory);
        return this.memory;
    }

    // Helper method for memory operations
    _recordMemoryOperation(operation, value, oldValue = null, newValue = null) {
        this.memoryHistory.push({
            operation,
            value,
            oldValue,
            newValue: newValue !== null ? newValue : this.memory,
            timestamp: new Date().toISOString()
        });
    }

    // Get memory value
    getMemory() {
        return this.memory;
    }

    // Display memory history
    displayMemoryHistory() {
        console.log("\n💾 Memory History:");
        if (this.memoryHistory.length === 0) {
            console.log("No memory operations recorded.");
            return;
        }

        this.memoryHistory.forEach((record, index) => {
            let message = `${index + 1}. ${record.operation.toUpperCase()}`;
            
            switch (record.operation) {
                case 'store':
                    message += `: ${record.value} -> Memory`;
                    break;
                case 'recall':
                    message += `: Memory = ${record.value}`;
                    break;
                case 'clear':
                    message += `: ${record.oldValue} -> 0`;
                    break;
                case 'add':
                    message += `: ${record.oldValue} + ${record.value} = ${record.newValue}`;
                    break;
                case 'subtract':
                    message += `: ${record.oldValue} - ${record.value} = ${record.newValue}`;
                    break;
            }
            
            console.log(message);
        });
    }

    // Chainable operations using last result
    chainAdd(b) {
        const result = this.add(this.lastResult, b);
        return result;
    }

    chainSubtract(b) {
        const result = this.subtract(this.lastResult, b);
        return result;
    }

    chainMultiply(b) {
        const result = this.multiply(this.lastResult, b);
        return result;
    }

    chainDivide(b) {
        const result = this.divide(this.lastResult, b);
        return result;
    }
}

// Test the EnhancedCalculator
console.log("🔹 Testing EnhancedCalculator:");
const enhancedCalc = new EnhancedCalculator();

// Test memory operations
console.log(`Memory store 100: ${enhancedCalc.memoryStore(100)}`);
console.log(`Memory add 25: ${enhancedCalc.memoryAdd(25)}`);
console.log(`Memory subtract 10: ${enhancedCalc.memorySubtract(10)}`);
console.log(`Memory recall: ${enhancedCalc.memoryRecall()}`);
console.log(`Current memory: ${enhancedCalc.getMemory()}`);

// Test chaining operations
console.log("\n🔹 Testing Chain Operations:");
enhancedCalc.add(10, 5);
console.log(`Last result: ${enhancedCalc.getLastResult()}`);
console.log(`Chain add 3: ${enhancedCalc.chainAdd(3)}`);
console.log(`Chain multiply 2: ${enhancedCalc.chainMultiply(2)}`);
console.log(`Chain subtract 5: ${enhancedCalc.chainSubtract(5)}`);
console.log(`Final result: ${enhancedCalc.getLastResult()}`);

enhancedCalc.displayHistory();
enhancedCalc.displayMemoryHistory();

// ==========================
// PART 3: SCIENTIFIC CALCULATOR FUNCTIONS
// ==========================

console.log("\n\nPART 3: SCIENTIFIC CALCULATOR FUNCTIONS");
console.log("=======================================\n");

/**
 * Task 3.1: Implement Scientific Functions
 * Add power, square root, factorial, trigonometry, and other scientific functions
 */

class ScientificCalculator extends EnhancedCalculator {
    constructor() {
        super();
        this.settings = {
            angleMode: 'degrees', // 'degrees' or 'radians'
            precision: 10
        };
    }

    // Power functions
    power(base, exponent) {
        const result = base ** exponent;
        this._recordOperation('power', base, exponent, result);
        return result;
    }

    squareRoot(number) {
        if (number < 0) {
            throw new Error("Cannot calculate square root of negative number");
        }
        const result = Math.sqrt(number);
        this._recordOperation('sqrt', number, null, result);
        return result;
    }

    cubeRoot(number) {
        const result = Math.cbrt(number);
        this._recordOperation('cbrt', number, null, result);
        return result;
    }

    // Factorial
    factorial(n) {
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        if (!Number.isInteger(n)) {
            throw new Error("Factorial is only defined for integers");
        }
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        
        this._recordOperation('factorial', n, null, result);
        return result;
    }

    // Trigonometric functions with angle mode support
    sin(angle) {
        const radians = this._toRadians(angle);
        const result = Math.sin(radians);
        this._recordOperation('sin', angle, null, result);
        return this._round(result);
    }

    cos(angle) {
        const radians = this._toRadians(angle);
        const result = Math.cos(radians);
        this._recordOperation('cos', angle, null, result);
        return this._round(result);
    }

    tan(angle) {
        const radians = this._toRadians(angle);
        const result = Math.tan(radians);
        this._recordOperation('tan', angle, null, result);
        return this._round(result);
    }

    // Inverse trigonometric functions
    asin(value) {
        if (value < -1 || value > 1) {
            throw new Error("asin argument must be between -1 and 1");
        }
        const radians = Math.asin(value);
        const result = this._fromRadians(radians);
        this._recordOperation('asin', value, null, result);
        return this._round(result);
    }

    acos(value) {
        if (value < -1 || value > 1) {
            throw new Error("acos argument must be between -1 and 1");
        }
        const radians = Math.acos(value);
        const result = this._fromRadians(radians);
        this._recordOperation('acos', value, null, result);
        return this._round(result);
    }

    atan(value) {
        const radians = Math.atan(value);
        const result = this._fromRadians(radians);
        this._recordOperation('atan', value, null, result);
        return this._round(result);
    }

    // Logarithmic functions
    log10(number) {
        if (number <= 0) {
            throw new Error("Logarithm is not defined for non-positive numbers");
        }
        const result = Math.log10(number);
        this._recordOperation('log10', number, null, result);
        return this._round(result);
    }

    ln(number) {
        if (number <= 0) {
            throw new Error("Natural logarithm is not defined for non-positive numbers");
        }
        const result = Math.log(number);
        this._recordOperation('ln', number, null, result);
        return this._round(result);
    }

    log(base, number) {
        if (base <= 0 || base === 1) {
            throw new Error("Logarithm base must be positive and not equal to 1");
        }
        if (number <= 0) {
            throw new Error("Logarithm argument must be positive");
        }
        const result = Math.log(number) / Math.log(base);
        this._recordOperation(`log${base}`, number, null, result);
        return this._round(result);
    }

    // Constants
    getPi() {
        return Math.PI;
    }

    getE() {
        return Math.E;
    }

    // Helper methods
    _toRadians(angle) {
        return this.settings.angleMode === 'degrees' 
            ? angle * (Math.PI / 180)
            : angle;
    }

    _fromRadians(radians) {
        return this.settings.angleMode === 'degrees'
            ? radians * (180 / Math.PI)
            : radians;
    }

    _round(value) {
        const factor = 10 ** this.settings.precision;
        return Math.round(value * factor) / factor;
    }

    // Settings
    setAngleMode(mode) {
        if (mode !== 'degrees' && mode !== 'radians') {
            throw new Error("Angle mode must be 'degrees' or 'radians'");
        }
        this.settings.angleMode = mode;
        return this;
    }

    setPrecision(precision) {
        if (precision < 0 || precision > 15) {
            throw new Error("Precision must be between 0 and 15");
        }
        this.settings.precision = precision;
        return this;
    }

    getSettings() {
        return { ...this.settings };
    }
}

// Test Scientific Calculator
console.log("🔹 Testing ScientificCalculator:");

const sciCalc = new ScientificCalculator();

// Test power and roots
console.log(`2^3 = ${sciCalc.power(2, 3)}`);
console.log(`sqrt(16) = ${sciCalc.squareRoot(16)}`);
console.log(`cbrt(27) = ${sciCalc.cubeRoot(27)}`);

// Test factorial
console.log(`5! = ${sciCalc.factorial(5)}`);

// Test trigonometry (in degrees mode by default)
console.log("\n🔹 Trigonometry (degrees mode):");
console.log(`sin(30°) = ${sciCalc.sin(30)}`);
console.log(`cos(60°) = ${sciCalc.cos(60)}`);
console.log(`tan(45°) = ${sciCalc.tan(45)}`);

// Switch to radians and test
sciCalc.setAngleMode('radians');
console.log("\n🔹 Trigonometry (radians mode):");
console.log(`sin(π/6) = ${sciCalc.sin(Math.PI / 6)}`);
console.log(`cos(π/3) = ${sciCalc.cos(Math.PI / 3)}`);

// Switch back to degrees for inverse trig
sciCalc.setAngleMode('degrees');
console.log("\n🔹 Inverse Trigonometry:");
console.log(`asin(0.5) = ${sciCalc.asin(0.5)}°`);
console.log(`acos(0.5) = ${sciCalc.acos(0.5)}°`);
console.log(`atan(1) = ${sciCalc.atan(1)}°`);

// Test logarithms
console.log("\n🔹 Logarithms:");
console.log(`log10(100) = ${sciCalc.log10(100)}`);
console.log(`ln(e) = ${sciCalc.ln(Math.E)}`);
console.log(`log2(8) = ${sciCalc.log(2, 8)}`);

// Test constants
console.log("\n🔹 Constants:");
console.log(`π = ${sciCalc.getPi()}`);
console.log(`e = ${sciCalc.getE()}`);

// Test precision settings
sciCalc.setPrecision(4);
console.log(`\nWith precision 4: sin(30°) = ${sciCalc.sin(30)}`);

sciCalc.displayHistory();

// ==========================
// PART 4: INTERACTIVE CALCULATOR PROGRAM
// ==========================

console.log("\n\nPART 4: INTERACTIVE CALCULATOR PROGRAM");
console.log("======================================\n");

/**
 * Task 4.1: Create an Interactive Calculator
 * Build a command-line interface for the calculator
 */

class InteractiveCalculator {
    constructor() {
        this.calculator = new ScientificCalculator();
        this.isRunning = false;
        this.commands = this._initializeCommands();
    }

    _initializeCommands() {
        return {
            // Basic operations
            'add': { 
                desc: 'Add two numbers: add <a> <b>',
                handler: (args) => this._handleBinaryOp('add', args)
            },
            'sub': { 
                desc: 'Subtract two numbers: sub <a> <b>',
                handler: (args) => this._handleBinaryOp('subtract', args)
            },
            'mul': { 
                desc: 'Multiply two numbers: mul <a> <b>',
                handler: (args) => this._handleBinaryOp('multiply', args)
            },
            'div': { 
                desc: 'Divide two numbers: div <a> <b>',
                handler: (args) => this._handleBinaryOp('divide', args)
            },
            'mod': { 
                desc: 'Modulus of two numbers: mod <a> <b>',
                handler: (args) => this._handleBinaryOp('modulus', args)
            },

            // Scientific operations
            'pow': { 
                desc: 'Power: pow <base> <exponent>',
                handler: (args) => this._handleBinaryOp('power', args)
            },
            'sqrt': { 
                desc: 'Square root: sqrt <number>',
                handler: (args) => this._handleUnaryOp('squareRoot', args)
            },
            'fact': { 
                desc: 'Factorial: fact <n>',
                handler: (args) => this._handleUnaryOp('factorial', args)
            },
            'sin': { 
                desc: 'Sine: sin <angle>',
                handler: (args) => this._handleUnaryOp('sin', args)
            },
            'cos': { 
                desc: 'Cosine: cos <angle>',
                handler: (args) => this._handleUnaryOp('cos', args)
            },
            'tan': { 
                desc: 'Tangent: tan <angle>',
                handler: (args) => this._handleUnaryOp('tan', args)
            },

            // Memory operations
            'ms': { 
                desc: 'Memory store: ms <value>',
                handler: (args) => this._handleMemoryOp('memoryStore', args)
            },
            'mr': { 
                desc: 'Memory recall: mr',
                handler: () => console.log(`Memory: ${this.calculator.memoryRecall()}`)
            },
            'mc': { 
                desc: 'Memory clear: mc',
                handler: () => console.log(`Memory cleared. Was: ${this.calculator.memoryClear()}`)
            },
            'm+': { 
                desc: 'Memory add: m+ <value>',
                handler: (args) => this._handleMemoryOp('memoryAdd', args)
            },
            'm-': { 
                desc: 'Memory subtract: m- <value>',
                handler: (args) => this._handleMemoryOp('memorySubtract', args)
            },

            // Chain operations (use last result)
            'c+': { 
                desc: 'Chain add: c+ <value>',
                handler: (args) => this._handleChainOp('chainAdd', args)
            },
            'c-': { 
                desc: 'Chain subtract: c- <value>',
                handler: (args) => this._handleChainOp('chainSubtract', args)
            },
            'c*': { 
                desc: 'Chain multiply: c* <value>',
                handler: (args) => this._handleChainOp('chainMultiply', args)
            },
            'c/': { 
                desc: 'Chain divide: c/ <value>',
                handler: (args) => this._handleChainOp('chainDivide', args)
            },

            // Display commands
            'last': { 
                desc: 'Show last result',
                handler: () => console.log(`Last result: ${this.calculator.getLastResult()}`)
            },
            'hist': { 
                desc: 'Show operation history',
                handler: () => this.calculator.displayHistory()
            },
            'mhist': { 
                desc: 'Show memory history',
                handler: () => this.calculator.displayMemoryHistory()
            },
            'settings': { 
                desc: 'Show calculator settings',
                handler: () => console.log('Settings:', this.calculator.getSettings())
            },

            // Settings commands
            'mode': { 
                desc: 'Set angle mode: mode <degrees|radians>',
                handler: (args) => {
                    if (args.length !== 1) throw new Error('Usage: mode <degrees|radians>');
                    this.calculator.setAngleMode(args[0]);
                    console.log(`Angle mode set to: ${args[0]}`);
                }
            },
            'prec': { 
                desc: 'Set precision: prec <0-15>',
                handler: (args) => {
                    if (args.length !== 1) throw new Error('Usage: prec <0-15>');
                    const prec = parseInt(args[0]);
                    this.calculator.setPrecision(prec);
                    console.log(`Precision set to: ${prec}`);
                }
            },

            // Utility commands
            'clear': { 
                desc: 'Clear calculator history',
                handler: () => {
                    this.calculator.clearHistory();
                    console.log('History cleared.');
                }
            },
            'help': { 
                desc: 'Show available commands',
                handler: () => this._showHelp()
            },
            'exit': { 
                desc: 'Exit the calculator',
                handler: () => {
                    this.isRunning = false;
                    console.log('Goodbye! 👋');
                }
            }
        };
    }

    // Handler methods
    _handleBinaryOp(operation, args) {
        if (args.length !== 2) {
            throw new Error(`Usage: ${operation} <a> <b>`);
        }
        const a = parseFloat(args[0]);
        const b = parseFloat(args[1]);
        const result = this.calculator[operation](a, b);
        console.log(`${a} ${operation} ${b} = ${result}`);
    }

    _handleUnaryOp(operation, args) {
        if (args.length !== 1) {
            throw new Error(`Usage: ${operation} <value>`);
        }
        const value = parseFloat(args[0]);
        const result = this.calculator[operation](value);
        console.log(`${operation}(${value}) = ${result}`);
    }

    _handleMemoryOp(operation, args) {
        if (args.length !== 1) {
            throw new Error(`Usage: ${operation} <value>`);
        }
        const value = parseFloat(args[0]);
        const result = this.calculator[operation](value);
        console.log(`Memory ${operation}: ${result}`);
    }

    _handleChainOp(operation, args) {
        if (args.length !== 1) {
            throw new Error(`Usage: ${operation} <value>`);
        }
        const value = parseFloat(args[0]);
        const lastResult = this.calculator.getLastResult();
        const result = this.calculator[operation](value);
        console.log(`${lastResult} ${operation.replace('chain', '')} ${value} = ${result}`);
    }

    _showHelp() {
        console.log("\n📖 AVAILABLE COMMANDS:");
        console.log("=".repeat(40));
        
        const categories = {
            'Basic Operations': ['add', 'sub', 'mul', 'div', 'mod'],
            'Scientific Operations': ['pow', 'sqrt', 'fact', 'sin', 'cos', 'tan'],
            'Memory Operations': ['ms', 'mr', 'mc', 'm+', 'm-'],
            'Chain Operations': ['c+', 'c-', 'c*', 'c/'],
            'Display': ['last', 'hist', 'mhist', 'settings'],
            'Settings': ['mode', 'prec'],
            'Utility': ['clear', 'help', 'exit']
        };

        Object.entries(categories).forEach(([category, commands]) => {
            console.log(`\n${category}:`);
            commands.forEach(cmd => {
                console.log(`  ${cmd.padEnd(8)} - ${this.commands[cmd].desc}`);
            });
        });

        console.log("\n💡 Tips:");
        console.log("  • Use 'last' to see the last result");
        console.log("  • Chain operations work on the last result");
        console.log("  • All numbers are parsed as floats");
        console.log("  • Type 'exit' to quit");
    }

    _parseInput(input) {
        const parts = input.trim().split(/\s+/);
        if (parts.length === 0) return { command: '', args: [] };
        
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        return { command, args };
    }

    _executeCommand(command, args) {
        if (!this.commands[command]) {
            throw new Error(`Unknown command: ${command}. Type 'help' for available commands.`);
        }

        try {
            this.commands[command].handler(args);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }

    start() {
        console.log("🧮 INTERACTIVE CALCULATOR");
        console.log("=========================");
        console.log("Type 'help' for available commands");
        console.log("Type 'exit' to quit\n");

        this.isRunning = true;

        // Simulate interactive input
        const simulateInput = (input, delay = 500) => {
            setTimeout(() => {
                console.log(`\n> ${input}`);
                this._processInput(input);
            }, delay);
        };

        // Demo sequence
        console.log("Starting demo sequence...\n");

        simulateInput("add 10 5");
        simulateInput("mul 3 4", 1000);
        simulateInput("c+ 2", 1500);
        simulateInput("ms 100", 2000);
        simulateInput("m+ 25", 2500);
        simulateInput("mr", 3000);
        simulateInput("pow 2 8", 3500);
        simulateInput("sqrt 144", 4000);
        simulateInput("sin 30", 4500);
        simulateInput("last", 5000);
        simulateInput("hist", 5500);
        simulateInput("help", 6000);
        simulateInput("exit", 6500);
    }

    _processInput(input) {
        const { command, args } = this._parseInput(input);
        
        if (command === '') {
            return; // Empty input
        }

        if (command === 'exit') {
            this.isRunning = false;
        }

        this._executeCommand(command, args);
    }

    // Method for manual testing (not used in demo)
    runManual() {
        console.log("🧮 INTERACTIVE CALCULATOR");
        console.log("=========================");
        console.log("Type 'help' for available commands");
        console.log("Type 'exit' to quit\n");

        this.isRunning = true;
        
        // In a real environment, you would use readline or similar
        // For this exercise, we'll simulate it
        console.log("Note: In a real environment, this would accept user input.");
        console.log("For now, try calling methods directly or check the demo above.");
    }
}

// Run the interactive calculator demo
console.log("🔹 Running Interactive Calculator Demo:");
console.log("=".repeat(40));

const interactiveCalc = new InteractiveCalculator();
interactiveCalc.start();

// ==========================
// PART 5: UNIT TESTING
// ==========================

console.log("\n\nPART 5: UNIT TESTING");
console.log("===================\n");

/**
 * Task 5.1: Write Unit Tests for Calculator Functions
 * Test edge cases, error conditions, and normal operations
 */

class CalculatorTestSuite {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    addTest(name, testFunction) {
        this.tests.push({ name, test: testFunction });
    }

    run() {
        console.log("🧪 RUNNING CALCULATOR TESTS");
        console.log("=".repeat(40));

        this.tests.forEach(({ name, test }) => {
            try {
                test();
                console.log(`✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${name}: ${error.message}`);
                this.failed++;
            }
        });

        this._printSummary();
    }

    _printSummary() {
        console.log("\n" + "=".repeat(40));
        console.log("TEST SUMMARY:");
        console.log(`Total tests: ${this.tests.length}`);
        console.log(`Passed: ${this.passed}`);
        console.log(`Failed: ${this.failed}`);
        console.log(`Success rate: ${((this.passed / this.tests.length) * 100).toFixed(1)}%`);
    }
}

// Create test suite
const testSuite = new CalculatorTestSuite();

// Basic arithmetic tests
testSuite.addTest("Addition positive numbers", () => {
    const calc = new BasicCalculator();
    const result = calc.add(5, 3);
    if (result !== 8) throw new Error(`Expected 8, got ${result}`);
});

testSuite.addTest("Addition negative numbers", () => {
    const calc = new BasicCalculator();
    const result = calc.add(-5, -3);
    if (result !== -8) throw new Error(`Expected -8, got ${result}`);
});

testSuite.addTest("Subtraction", () => {
    const calc = new BasicCalculator();
    const result = calc.subtract(10, 4);
    if (result !== 6) throw new Error(`Expected 6, got ${result}`);
});

testSuite.addTest("Multiplication", () => {
    const calc = new BasicCalculator();
    const result = calc.multiply(7, 6);
    if (result !== 42) throw new Error(`Expected 42, got ${result}`);
});

testSuite.addTest("Division", () => {
    const calc = new BasicCalculator();
    const result = calc.divide(20, 5);
    if (result !== 4) throw new Error(`Expected 4, got ${result}`);
});

testSuite.addTest("Division by zero throws error", () => {
    const calc = new BasicCalculator();
    try {
        calc.divide(10, 0);
        throw new Error("Should have thrown an error");
    } catch (error) {
        if (!error.message.includes("Division by zero")) {
            throw new Error(`Wrong error message: ${error.message}`);
        }
    }
});

testSuite.addTest("Modulus", () => {
    const calc = new BasicCalculator();
    const result = calc.modulus(10, 3);
    if (result !== 1) throw new Error(`Expected 1, got ${result}`);
});

// Enhanced calculator tests
testSuite.addTest("Memory store and recall", () => {
    const calc = new EnhancedCalculator();
    calc.memoryStore(42);
    const recalled = calc.memoryRecall();
    if (recalled !== 42) throw new Error(`Expected 42 in memory, got ${recalled}`);
});

testSuite.addTest("Memory addition", () => {
    const calc = new EnhancedCalculator();
    calc.memoryStore(10);
    calc.memoryAdd(5);
    if (calc.getMemory() !== 15) throw new Error(`Expected 15 in memory, got ${calc.getMemory()}`);
});

testSuite.addTest("Chain operations", () => {
    const calc = new EnhancedCalculator();
    calc.add(10, 5); // 15
    calc.chainMultiply(2); // 30
    calc.chainSubtract(10); // 20
    if (calc.getLastResult() !== 20) throw new Error(`Expected 20, got ${calc.getLastResult()}`);
});

// Scientific calculator tests
testSuite.addTest("Power function", () => {
    const calc = new ScientificCalculator();
    const result = calc.power(2, 3);
    if (result !== 8) throw new Error(`Expected 8, got ${result}`);
});

testSuite.addTest("Square root", () => {
    const calc = new ScientificCalculator();
    const result = calc.squareRoot(16);
    if (result !== 4) throw new Error(`Expected 4, got ${result}`);
});

testSuite.addTest("Square root of negative throws error", () => {
    const calc = new ScientificCalculator();
    try {
        calc.squareRoot(-1);
        throw new Error("Should have thrown an error");
    } catch (error) {
        if (!error.message.includes("negative")) {
            throw new Error(`Wrong error message: ${error.message}`);
        }
    }
});

testSuite.addTest("Factorial", () => {
    const calc = new ScientificCalculator();
    const result = calc.factorial(5);
    if (result !== 120) throw new Error(`Expected 120, got ${result}`);
});

testSuite.addTest("Sine in degrees", () => {
    const calc = new ScientificCalculator();
    calc.setAngleMode('degrees');
    const result = calc.sin(30);
    const expected = 0.5;
    if (Math.abs(result - expected) > 0.0001) {
        throw new Error(`Expected ${expected}, got ${result}`);
    }
});

testSuite.addTest("Logarithm base 10", () => {
    const calc = new ScientificCalculator();
    const result = calc.log10(100);
    if (result !== 2) throw new Error(`Expected 2, got ${result}`);
});

testSuite.addTest("Logarithm of non-positive throws error", () => {
    const calc = new ScientificCalculator();
    try {
        calc.log10(-5);
        throw new Error("Should have thrown an error");
    } catch (error) {
        if (!error.message.includes("non-positive")) {
            throw new Error(`Wrong error message: ${error.message}`);
        }
    }
});

// Settings tests
testSuite.addTest("Angle mode switching", () => {
    const calc = new ScientificCalculator();
    calc.setAngleMode('radians');
