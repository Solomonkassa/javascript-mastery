/**
 * 🔍 Production-Ready Scope Examples
 * 
 * This module demonstrates professional scope management patterns
 * with real-world applications and performance considerations.
 */

'use strict';

/**
 * 🎯 LEXICAL SCOPE FUNDAMENTALS
 */

// 1. Nested Scope Chain
function createPaymentProcessor(currency = 'USD') {
  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110
  };
  
  function convertAmount(amount, targetCurrency) {
    // Access outer scope variable
    const baseRate = exchangeRates[currency];
    const targetRate = exchangeRates[targetCurrency];
    
    if (!baseRate || !targetRate) {
      throw new Error(`Unsupported currency: ${currency} or ${targetCurrency}`);
    }
    
    return (amount / baseRate) * targetRate;
  }
  
  return {
    processPayment(amount, targetCurrency = currency) {
      const convertedAmount = convertAmount(amount, targetCurrency);
      
      // Block scope with let/const
      {
        const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const timestamp = new Date().toISOString();
        
        console.log(`[${timestamp}] Processing ${currency} ${amount} -> ${targetCurrency} ${convertedAmount.toFixed(2)} (ID: ${transactionId})`);
      }
      
      // transactionId is not accessible here (block scope)
      return convertedAmount;
    },
    
    setCurrency(newCurrency) {
      if (exchangeRates[newCurrency]) {
        currency = newCurrency;
        return true;
      }
      return false;
    },
    
    getCurrentCurrency() {
      return currency;
    }
  };
}

/**
 * 🚀 HOISTING PATTERNS
 */

function demonstrateHoisting() {
  console.log('=== Hoisting Demonstration ===');
  
  // Function declarations are hoisted
  console.log(hoistedFunction()); // Works
  
  // Function expression is not hoisted
  try {
    console.log(notHoisted()); // Error
  } catch (e) {
    console.log('Expected error:', e.message);
  }
  
  // Variable hoisting (var)
  console.log('x before declaration:', typeof x); // undefined
  var x = 10;
  console.log('x after declaration:', x);
  
  // let/const are hoisted but not initialized
  // console.log(y); // Error: Cannot access 'y' before initialization
  let y = 20;
  
  function hoistedFunction() {
    return 'I am hoisted!';
  }
  
  const notHoisted = function() {
    return 'I am NOT hoisted until declaration';
  };
}

/**
 * 🔒 CLOSURE PATTERNS FOR DATA PRIVACY
 */

// 1. Secure Configuration Manager
function createSecureConfig(initialConfig = {}) {
  const config = new Map(Object.entries(initialConfig));
  const validators = new Map();
  const subscribers = new Set();
  
  // Private validation function
  function validateKeyValue(key, value) {
    const validator = validators.get(key);
    if (validator && !validator(value)) {
      throw new Error(`Validation failed for key "${key}" with value "${value}"`);
    }
    return true;
  }
  
  // Private notification function
  function notifySubscribers(key, value) {
    subscribers.forEach(callback => {
      try {
        callback(key, value, config);
      } catch (error) {
        console.error('Subscriber error:', error);
      }
    });
  }
  
  return {
    set(key, value) {
      validateKeyValue(key, value);
      const oldValue = config.get(key);
      config.set(key, value);
      
      if (oldValue !== value) {
        notifySubscribers(key, value);
      }
      
      return this;
    },
    
    get(key, defaultValue = null) {
      return config.has(key) ? config.get(key) : defaultValue;
    },
    
    has(key) {
      return config.has(key);
    },
    
    delete(key) {
      const existed = config.delete(key);
      if (existed) {
        notifySubscribers(key, undefined);
      }
      return existed;
    },
    
    registerValidator(key, validatorFn) {
      if (typeof validatorFn !== 'function') {
        throw new TypeError('Validator must be a function');
      }
      validators.set(key, validatorFn);
      return this;
    },
    
    subscribe(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
      }
      subscribers.add(callback);
      
      // Return unsubscribe function
      return () => subscribers.delete(callback);
    },
    
    // Bulk operations
    batch(operations) {
      const results = [];
      const errors = [];
      
      Object.entries(operations).forEach(([key, value]) => {
        try {
          this.set(key, value);
          results.push({ key, success: true });
        } catch (error) {
          errors.push({ key, error: error.message });
        }
      });
      
      return { results, errors };
    },
    
    // Export configuration (read-only)
    toJSON() {
      return Object.fromEntries(config);
    },
    
    // For debugging only
    _debug() {
      return {
        size: config.size,
        keys: Array.from(config.keys()),
        subscribers: subscribers.size,
        validators: validators.size
      };
    }
  };
}

// 2. Rate Limiter with Closure
function createRateLimiter(limit, interval) {
  const requests = new Map();
  
  // Cleanup old entries periodically
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of requests) {
      const validTimestamps = timestamps.filter(time => now - time < interval);
      if (validTimestamps.length === 0) {
        requests.delete(key);
      } else {
        requests.set(key, validTimestamps);
      }
    }
  }, interval);
  
  // Stop cleanup when limiter is no longer needed
  function stopCleanup() {
    clearInterval(cleanupInterval);
  }
  
  return {
    check(key) {
      const now = Date.now();
      const timestamps = requests.get(key) || [];
      
      // Remove old timestamps
      const recentTimestamps = timestamps.filter(time => now - time < interval);
      
      if (recentTimestamps.length >= limit) {
        return {
          allowed: false,
          remaining: 0,
          reset: recentTimestamps[0] + interval
        };
      }
      
      // Add current request
      recentTimestamps.push(now);
      requests.set(key, recentTimestamps);
      
      return {
        allowed: true,
        remaining: limit - recentTimestamps.length,
        reset: now + interval
      };
    },
    
    getStats(key) {
      const timestamps = requests.get(key);
      if (!timestamps) return { total: 0, recent: 0 };
      
      const now = Date.now();
      const recent = timestamps.filter(time => now - time < interval).length;
      
      return {
        total: timestamps.length,
        recent,
        oldest: timestamps.length > 0 ? now - timestamps[0] : null
      };
    },
    
    clear(key = null) {
      if (key) {
        requests.delete(key);
      } else {
        requests.clear();
      }
    },
    
    stopCleanup
  };
}

/**
 * 🏗️ BLOCK SCOPE PATTERNS
 */

// 1. Temporary Variable Isolation
function processUserData(users) {
  const results = [];
  
  for (let i = 0; i < users.length; i++) {
    // Block scope for each iteration
    const user = users[i];
    
    // Isolate processing logic
    {
      const userId = user.id || `user_${i}`;
      const processedData = {
        ...user,
        normalizedName: user.name.trim().toLowerCase(),
        processedAt: new Date().toISOString()
      };
      
      // Temporary calculations don't leak
      const score = calculateUserScore(processedData);
      
      results.push({
        userId,
        data: processedData,
        score,
        category: score > 80 ? 'high' : score > 50 ? 'medium' : 'low'
      });
    }
  }
  
  return results;
}

// 2. Safe Resource Handling
function withDatabaseConnection(config, operation) {
  // Isolate connection details in block
  let connection;
  
  try {
    // Simulate connection
    connection = {
      connect: () => console.log('Connecting to database...'),
      query: (sql) => ({ rows: [], affectedRows: 0 }),
      close: () => console.log('Closing connection...')
    };
    
    connection.connect();
    
    // Execute operation with isolated scope
    const result = operation(connection);
    
    return {
      success: true,
      data: result,
      connection: null // Don't expose connection
    };
    
  } catch (error) {
    console.error('Database operation failed:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  } finally {
    // Ensure cleanup
    if (connection) {
      connection.close();
    }
  }
}

/**
 * 🔄 SCOPE CHAIN OPTIMIZATION
 */

// 1. Variable Lookup Optimization
function optimizedFunction() {
  // Cache frequently accessed variables
  const cache = new Map();
  const defaultOptions = { maxSize: 100, ttl: 60000 };
  
  // Inner function accessing outer variables
  return function(key, value) {
    // Local variables for faster access
    const localCache = cache;
    const localDefault = defaultOptions;
    
    // Operation using local references
    if (value !== undefined) {
      localCache.set(key, {
        value,
        timestamp: Date.now(),
        ttl: localDefault.ttl
      });
    }
    
    const cached = localCache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.value;
    }
    
    return null;
  };
}

// 2. Avoiding Scope Chain Lookups in Loops
function processLargeDataset(data) {
  const results = [];
  
  // Cache length and methods
  const dataLength = data.length;
  const push = results.push.bind(results);
  const processItem = processSingleItem; // Function reference
  
  for (let i = 0; i < dataLength; i++) {
    // Avoid creating new function each iteration
    const result = processItem(data[i]);
    push(result);
  }
  
  return results;
}

function processSingleItem(item) {
  return { ...item, processed: true };
}

/**
 * 🧪 SCOPE TESTING UTILITIES
 */

function createScopeTestHarness() {
  const tests = [];
  let currentScope = 'global';
  
  const harness = {
    describe(description, testFn) {
      tests.push({
        description,
        scope: currentScope,
        fn: testFn
      });
    },
    
    it(description, assertionFn) {
      tests.push({
        description,
        scope: currentScope,
        fn: assertionFn
      });
    },
    
    run() {
      console.log(`🧪 Running ${tests.length} scope tests...\n`);
      
      let passed = 0;
      let failed = 0;
      
      tests.forEach((test, index) => {
        try {
          test.fn();
          console.log(`✅ [${test.scope}] ${test.description}`);
          passed++;
        } catch (error) {
          console.error(`❌ [${test.scope}] ${test.description}: ${error.message}`);
          failed++;
        }
      });
      
      console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
      return { passed, failed };
    }
  };
  
  // Create scoped test methods
  ['global', 'function', 'block', 'closure'].forEach(scope => {
    harness[scope] = function(description, testFn) {
      const previousScope = currentScope;
      currentScope = scope;
      harness.describe(description, testFn);
      currentScope = previousScope;
    };
  });
  
  return harness;
}

/**
 * 🚀 EXPORT MODULES
 */
module.exports = {
  // Core utilities
  createPaymentProcessor,
  createSecureConfig,
  createRateLimiter,
  
  // Optimization patterns
  optimizedFunction,
  processLargeDataset,
  
  // Testing
  createScopeTestHarness,
  demonstrateHoisting,
  
  // Example usage function
  examples: function() {
    console.log('🔍 Scope Examples Demo:\n');
    
    // Demo payment processor
    const processor = createPaymentProcessor('EUR');
    console.log('Payment Processor:', processor.processPayment(100, 'USD'));
    
    // Demo secure config
    const config = createSecureConfig({ apiUrl: 'https://api.example.com' });
    config.registerValidator('timeout', val => val > 0 && val < 10000);
    config.set('timeout', 5000);
    console.log('Config timeout:', config.get('timeout'));
    
    // Demo rate limiter
    const limiter = createRateLimiter(5, 60000); // 5 requests per minute
    console.log('Rate limit check:', limiter.check('user123'));
    
    return {
      processor,
      config,
      limiter
    };
  }
};

// Run examples if executed directly
if (require.main === module) {
  module.exports.examples();
  console.log('\n');
  demonstrateHoisting();
}
