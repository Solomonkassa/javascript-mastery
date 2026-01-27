# 🔧 JavaScript Function Types: Production Patterns

## 📋 Overview
Comprehensive guide to JavaScript function types with production-ready patterns, performance considerations, and best practices.

## 🎯 Function Declarations vs Expressions

### Declaration (Hoisted)
```javascript
// ✅ Use for main logic, reusable functions
function calculateTotal(price, tax) {
  return price * (1 + tax);
}
```

### Expression (Not Hoisted)
```javascript
// ✅ Use for conditional assignments, callbacks
const calculateTotal = function(price, tax) {
  return price * (1 + tax);
};
```

## 🏹 Arrow Functions

### When to Use:
```javascript
// ✅ Short callbacks, array methods
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// ✅ Lexical `this` binding
const user = {
  name: 'John',
  tasks: ['task1', 'task2'],
  getTasks: function() {
    return this.tasks.map(task => `${this.name}: ${task}`);
  }
};
```

### When NOT to Use:
```javascript
// ❌ Methods requiring `this` binding
const obj = {
  value: 10,
  // Avoid - no own `this`
  increment: () => this.value++ 
};

// ❌ Constructors
const Person = (name) => {
  this.name = name; // Error: arrow functions can't be constructors
};
```

## 🔒 Immediately Invoked Function Expressions (IIFE)

### Classic IIFE
```javascript
// ✅ Isolate scope, avoid polluting global namespace
(function() {
  const privateVar = 'secret';
  // Logic here
})();
```

### Modern Module Pattern
```javascript
// ✅ Module with public API
const UserModule = (function() {
  let users = [];
  
  const addUser = (user) => {
    users.push(user);
    return users;
  };
  
  const getUsers = () => [...users];
  
  return { addUser, getUsers };
})();

// Usage
UserModule.addUser({ id: 1, name: 'John' });
```

### Async IIFE
```javascript
// ✅ Async initialization
(async function() {
  const data = await fetchData();
  initializeApp(data);
})();
```

## 🎭 Function Methods

### call(), apply(), bind()
```javascript
// Production pattern with error handling
const logger = {
  log: function(level, message, metadata = {}) {
    console[level](`[${new Date().toISOString()}] ${message}`, metadata);
  }
};

// Context borrowing with safety
function safeLog(level, message) {
  if (typeof console[level] !== 'function') {
    level = 'log';
  }
  logger.log.call(logger, level, message, { context: this });
}

// Currying with bind
const logError = logger.log.bind(logger, 'error');
logError('Database connection failed');
```

## 🏗️ Factory Functions

```javascript
// ✅ Factory with validation
function createUser({ id, name, email }) {
  if (!id || !name || !email) {
    throw new Error('Missing required user properties');
  }
  
  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  return {
    id,
    name,
    email,
    getProfile() {
      return `${this.name} <${this.email}>`;
    },
    updateEmail(newEmail) {
      if (isValidEmail(newEmail)) {
        this.email = newEmail;
        return true;
      }
      return false;
    }
  };
}

// Usage
const user = createUser({
  id: 1,
  name: 'Jane Doe',
  email: 'jane@example.com'
});
```

## 🎯 Generator Functions

```javascript
// ✅ Lazy evaluation, memory efficient
function* paginate(items, pageSize = 10) {
  for (let i = 0; i < items.length; i += pageSize) {
    yield items.slice(i, i + pageSize);
  }
}

// Usage with large datasets
const largeDataset = Array.from({ length: 10000 }, (_, i) => i);
const paginator = paginate(largeDataset, 100);

for (const page of paginator) {
  processPage(page); // Processes 100 items at a time
}
```

## 🚀 Performance Patterns

### Memoization
```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveCalculation = memoize(function(n) {
  console.log('Calculating...');
  return n * 2;
});
```

### Debouncing
```javascript
function debounce(func, wait, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}

// Usage
const handleResize = debounce(() => {
  updateLayout();
}, 250);
```

## 📊 Comparison Table

| Feature | Declaration | Expression | Arrow |
|---------|------------|------------|--------|
| Hoisting | ✅ Yes | ❌ No | ❌ No |
| `this` binding | Dynamic | Dynamic | Lexical |
| Arguments object | ✅ Yes | ✅ Yes | ❌ No |
| Constructor | ✅ Yes | ✅ Yes | ❌ No |
| Implicit return | ❌ No | ❌ No | ✅ Yes |

## 🔧 Production Checklist
- [ ] Use function declarations for main logic
- [ ] Use arrow functions for short callbacks
- [ ] Implement proper error handling
- [ ] Add input validation
- [ ] Consider memory usage with closures
- [ ] Add JSDoc comments for TypeScript
- [ ] Write unit tests for edge cases

## 🧪 Testing Strategy
- Test all function types
- Validate `this` context
- Check error handling
- Verify return values
- Test with different inputs

## 🚨 Common Pitfalls
1. **Arrow functions in constructors**
2. **Memory leaks with closures**
3. **Incorrect `this` binding**
4. **Overuse of IIFEs**
5. **Missing error handling**
