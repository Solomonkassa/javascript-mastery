/**
 * 🏹 Production-Ready Arrow Functions
 * 
 * This module demonstrates professional arrow function patterns
 * with proper `this` handling, short syntax, and performance considerations.
 */

'use strict';

/**
 * 🎯 Arrow Function Characteristics
 * - No own `this` (lexical `this`)
 * - No `arguments` object
 * - Can't be used as constructors
 * - Implicit return for single expressions
 * - Shorter syntax for callbacks
 */

/**
 * ✅ WHEN TO USE ARROW FUNCTIONS
 */

// 1. Array Methods
const numbers = [1, 2, 3, 4, 5];

// Map with arrow function
const squared = numbers.map(n => n * n);

// Filter with arrow function
const evens = numbers.filter(n => n % 2 === 0);

// Reduce with arrow function
const sum = numbers.reduce((total, n) => total + n, 0);

// 2. Promise Chains
function fetchUserData(userId) {
  return Promise.resolve({ id: userId, name: 'John' });
}

fetchUserData(1)
  .then(user => user.name)
  .then(name => console.log(`User: ${name}`))
  .catch(error => console.error('Error:', error));

// 3. Event Handlers with Lexical `this`
class ButtonComponent {
  constructor() {
    this.clicks = 0;
    // Arrow function preserves `this`
    this.handleClick = () => {
      this.clicks++;
      console.log(`Clicked ${this.clicks} times`);
    };
  }
}

// 4. Short Callback Functions
const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false }
];

const activeUsers = users.filter(user => user.active);
const userNames = users.map(user => user.name);

/**
 * ❌ WHEN NOT TO USE ARROW FUNCTIONS
 */

// 1. Object Methods (when `this` is needed)
const calculator = {
  value: 0,
  
  // ❌ Wrong - arrow function doesn't have own `this`
  // add: (amount) => {
  //   this.value += amount; // `this` refers to outer context
  // },
  
  // ✅ Correct - regular function
  add: function(amount) {
    this.value += amount;
    return this;
  }
};

// 2. Constructor Functions
// ❌ Can't use arrow functions as constructors
// const Person = (name) => {
//   this.name = name; // Error
// };

// ✅ Use function declaration
function Person(name) {
  this.name = name;
}

// 3. Methods using `arguments` object
function legacyFunction() {
  // ❌ Arrow function doesn't have arguments
  // const getArgs = () => arguments;
  
  // ✅ Use regular function
  const getArgs = function() {
    return arguments;
  };
  
  return getArgs();
}

/**
 * 🔧 PRODUCTION PATTERNS
 */

// 1. Composable Functions
const compose = (...fns) => 
  (initialValue) => 
    fns.reduceRight((acc, fn) => fn(acc), initialValue);

const addTax = price => price * 1.1;
const applyDiscount = price => price * 0.9;
const formatCurrency = price => `$${price.toFixed(2)}`;

const calculatePrice = compose(
  formatCurrency,
  applyDiscount,
  addTax
);

// 2. Safe Property Access
const safeGet = (obj, path, defaultValue = null) => 
  path.split('.')
    .reduce((acc, key) => 
      (acc && acc[key] !== undefined) ? acc[key] : undefined, obj) 
    || defaultValue;

// 3. Debounced Event Handler
function createDebouncedHandler(delay) {
  let timeoutId;
  
  return (event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log('Processing:', event.target.value);
    }, delay);
  };
}

/**
 * 🏗️ ADVANCED PATTERNS
 */

// 1. Currying with Arrow Functions
const curry = (fn) => {
  const arity = fn.length;
  
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    } else {
      return (...moreArgs) => 
        curried.apply(this, args.concat(moreArgs));
    }
  };
};

// Usage
const multiply = curry((a, b, c) => a * b * c);
const double = multiply(2);
const triple = double(3);
console.log(triple(4)); // 24

// 2. Memoization with Arrow Functions
const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// 3. Partial Application
const partial = (fn, ...presetArgs) => 
  (...laterArgs) => 
    fn(...presetArgs, ...laterArgs);

const greet = (greeting, name) => `${greeting}, ${name}!`;
const sayHello = partial(greet, 'Hello');
console.log(sayHello('Alice')); // "Hello, Alice!"

/**
 * 🎭 REAL-WORLD EXAMPLES
 */

// API Service with Arrow Functions
const apiService = {
  baseURL: 'https://api.example.com',
  
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  },
  
  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to post to ${endpoint}:`, error);
      throw error;
    }
  }
};

// React-like Component (conceptual)
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    
    // Arrow functions for event handlers
    this.handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
    
    this.handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await this.props.onSubmit(this.state);
      } catch (error) {
        console.error('Submission failed:', error);
      }
    };
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  
  render() {
    // Render logic
  }
}

/**
 * 🧪 PERFORMANCE CONSIDERATIONS
 */

// Arrow functions are generally optimized by modern JS engines
// However, avoid creating arrow functions in hot loops

function processItems(items) {
  // ❌ Creates new function on each iteration
  // return items.map(item => expensiveOperation(item));
  
  // ✅ Define once, reuse
  const process = item => expensiveOperation(item);
  return items.map(process);
}

/**
 * 🚀 EXPORTS
 */
module.exports = {
  // Utility functions
  safeGet,
  memoize,
  curry,
  partial,
  compose,
  
  // Example data processors
  calculatePrice,
  processItems,
  
  // API service (conceptual)
  apiService
};

// Example usage
if (require.main === module) {
  console.log('🏹 Arrow Functions Examples:\n');
  
  // Test safeGet
  const obj = { user: { profile: { name: 'Alice' } } };
  console.log('Safe Get:', safeGet(obj, 'user.profile.name', 'Unknown'));
  
  // Test compose
  console.log('Composed Price:', calculatePrice(100));
  
  // Test currying
  console.log('Curried Multiply:', multiply(2)(3)(4));
}
