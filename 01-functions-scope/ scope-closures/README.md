# 🔍 Scope & Closures: Production Patterns

## 📚 Overview
Comprehensive guide to JavaScript scope and closures with production-ready patterns, memory management, and performance optimization.

## 🎯 Scope Fundamentals

### 1. Lexical Scope
```javascript
function outer() {
  const outerVar = 'I am outside';
  
  function inner() {
    const innerVar = 'I am inside';
    console.log(outerVar); // Accessible: 'I am outside'
  }
  
  inner();
  // console.log(innerVar); // ❌ Error: innerVar is not defined
}
```

### 2. Block Scope (ES6+)
```javascript
// let/const are block-scoped
{
  let blockScoped = 'I exist here';
  const constant = 'Me too';
}

// console.log(blockScoped); // ❌ Error
```

## 🔒 Closure Patterns

### 1. Data Encapsulation
```javascript
function createBankAccount(initialBalance = 0) {
  let balance = initialBalance;
  
  return {
    deposit(amount) {
      if (amount <= 0) throw new Error('Amount must be positive');
      balance += amount;
      return balance;
    },
    
    withdraw(amount) {
      if (amount <= 0) throw new Error('Amount must be positive');
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      return balance;
    },
    
    getBalance() {
      return balance;
    }
  };
}

// Usage
const account = createBankAccount(100);
account.deposit(50); // 150
account.withdraw(30); // 120
```

### 2. Factory Functions with Private State
```javascript
function createUser(id, name) {
  const createdAt = new Date();
  let loginCount = 0;
  
  return {
    getId() { return id; },
    getName() { return name; },
    
    login() {
      loginCount++;
      return {
        userId: id,
        loginTime: new Date(),
        totalLogins: loginCount
      };
    },
    
    getStats() {
      return {
        createdAt,
        totalLogins: loginCount,
        isActive: loginCount > 0
      };
    }
  };
}
```

## 🏗️ Module Patterns

### 1. Classic Module Pattern
```javascript
const ApiService = (function() {
  const baseUrl = 'https://api.example.com';
  const apiKey = process.env.API_KEY;
  const cache = new Map();
  
  async function fetchWithCache(endpoint) {
    if (cache.has(endpoint)) {
      return cache.get(endpoint);
    }
    
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    const data = await response.json();
    cache.set(endpoint, data);
    
    return data;
  }
  
  return {
    getUser(id) {
      return fetchWithCache(`/users/${id}`);
    },
    
    getPosts(userId) {
      return fetchWithCache(`/users/${userId}/posts`);
    },
    
    clearCache() {
      cache.clear();
    }
  };
})();
```

### 2. Revealing Module Pattern
```javascript
const NotificationService = (function() {
  const notifications = [];
  const maxHistory = 100;
  
  function addNotification(type, message) {
    const notification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    notifications.unshift(notification);
    
    // Limit history
    if (notifications.length > maxHistory) {
      notifications.pop();
    }
    
    return notification;
  }
  
  function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) notification.read = true;
  }
  
  return {
    success: (msg) => addNotification('success', msg),
    error: (msg) => addNotification('error', msg),
    warning: (msg) => addNotification('warning', msg),
    info: (msg) => addNotification('info', msg),
    
    getUnread() {
      return notifications.filter(n => !n.read);
    },
    
    getAll() {
      return [...notifications];
    },
    
    markAsRead,
    
    clear() {
      notifications.length = 0;
    }
  };
})();
```

## 🚀 Advanced Closure Patterns

### 1. Memoization with WeakMap
```javascript
function memoize(fn) {
  const cache = new WeakMap();
  
  return function(...args) {
    const key = args[0]; // For object arguments
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
}
```

### 2. Debouncing and Throttling
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

function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

## 💡 Memory Management

### 1. Avoiding Memory Leaks
```javascript
// ❌ Problem: Event listeners creating closures
function problematicSetup() {
  const button = document.getElementById('myButton');
  const data = largeObject; // Large data in closure
  
  button.addEventListener('click', () => {
    // Closure keeps reference to data
    console.log(data);
  });
}

// ✅ Solution: Clean up references
function properSetup() {
  const button = document.getElementById('myButton');
  const data = largeObject;
  
  function handleClick() {
    console.log(data);
  }
  
  button.addEventListener('click', handleClick);
  
  // Later, when done
  return function cleanup() {
    button.removeEventListener('click', handleClick);
    // data = null; // If needed
  };
}
```

### 2. WeakRef Pattern
```javascript
function createCachedApi() {
  const cache = new Map();
  const cleanup = new FinalizationRegistry(key => {
    cache.delete(key);
  });
  
  return {
    get(key, factory) {
      if (cache.has(key)) {
        const ref = cache.get(key);
        const value = ref.deref();
        if (value !== undefined) return value;
      }
      
      const value = factory();
      const ref = new WeakRef(value);
      cache.set(key, ref);
      cleanup.register(value, key);
      
      return value;
    },
    
    clear() {
      cache.clear();
    }
  };
}
```

## 🏭 Factory Patterns

### 1. Configurable Factory
```javascript
function createLogger(config = {}) {
  const {
    level = 'info',
    format = 'json',
    timestamp = true
  } = config;
  
  const levels = ['error', 'warn', 'info', 'debug'];
  const currentLevelIndex = levels.indexOf(level);
  
  function shouldLog(logLevel) {
    const logLevelIndex = levels.indexOf(logLevel);
    return logLevelIndex <= currentLevelIndex;
  }
  
  function formatMessage(level, message, meta) {
    const base = timestamp 
      ? `[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}`
      : `${level.toUpperCase()}: ${message}`;
    
    if (format === 'json') {
      return JSON.stringify({
        timestamp: new Date().toISOString(),
        level,
        message,
        ...meta
      });
    }
    
    return base + (meta ? ' ' + JSON.stringify(meta) : '');
  }
  
  return {
    log(level, message, meta = {}) {
      if (!shouldLog(level)) return;
      
      const formatted = formatMessage(level, message, meta);
      console.log(formatted);
    },
    
    error: (msg, meta) => this.log('error', msg, meta),
    warn: (msg, meta) => this.log('warn', msg, meta),
    info: (msg, meta) => this.log('info', msg, meta),
    debug: (msg, meta) => this.log('debug', msg, meta),
    
    setLevel(newLevel) {
      if (levels.includes(newLevel)) {
        level = newLevel;
        currentLevelIndex = levels.indexOf(newLevel);
      }
    }
  };
}
```

## 🧪 Testing Closures

```javascript
// Test pattern for closures
function testClosurePattern() {
  const testResults = [];
  
  function test(description, testFn) {
    try {
      testFn();
      testResults.push({ description, passed: true });
    } catch (error) {
      testResults.push({ 
        description, 
        passed: false, 
        error: error.message 
      });
    }
  }
  
  // Test suite
  test('Closure maintains private state', () => {
    const counter = (function() {
      let count = 0;
      return {
        increment: () => ++count,
        getCount: () => count
      };
    })();
    
    counter.increment();
    counter.increment();
    if (counter.getCount() !== 2) {
      throw new Error('Counter should be 2');
    }
  });
  
  return testResults;
}
```

## 📊 Performance Considerations

### 1. Closure Creation Cost
```javascript
// ❌ Creates new closure each iteration
function slowProcess(items) {
  return items.map(item => {
    return expensiveCalculation(item);
  });
}

// ✅ Creates closure once
function fastProcess(items) {
  const calculate = item => expensiveCalculation(item);
  return items.map(calculate);
}
```

### 2. Memory Profiling
```javascript
function profileClosureMemory() {
  const snapshots = [];
  
  function takeSnapshot(label) {
    if (typeof window !== 'undefined' && window.performance) {
      const memory = window.performance.memory;
      snapshots.push({
        label,
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize
      });
    }
  }
  
  return {
    snapshots,
    takeSnapshot,
    compare() {
      return snapshots.map((snapshot, index) => {
        if (index === 0) return { label: snapshot.label, change: 0 };
        
        const prev = snapshots[index - 1];
        const change = snapshot.usedJSHeapSize - prev.usedJSHeapSize;
        return { label: snapshot.label, change };
      });
    }
  };
}
```

## 🚀 Best Practices Checklist

- [ ] Use `let/const` for block scoping
- [ ] Minimize closure scope for memory efficiency
- [ ] Clean up event listeners and timeouts
- [ ] Use WeakMap/WeakSet for caches with object keys
- [ ] Implement proper error handling in closures
- [ ] Document closure dependencies
- [ ] Test memory usage with large data sets
- [ ] Use factory functions for complex object creation
- [ ] Implement cleanup methods for resource management
- [ ] Consider using modules instead of complex closures

## 🎯 Real-World Applications

1. **State Management**: Redux-like stores
2. **API Services**: Cached, authenticated requests
3. **UI Components**: Isolated component state
4. **Middleware**: Function composition with context
5. **Caching Systems**: Memory-efficient caches
6. **Event Systems**: Pub/sub with cleanup
7. **Validation**: Composable validation rules
8. **Configuration**: Scoped configuration management
