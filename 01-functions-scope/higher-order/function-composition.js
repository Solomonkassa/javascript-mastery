/**
 * 🧩 Production-Ready Function Composition Patterns
 * 
 * This module demonstrates professional function composition techniques
 * with error handling, type safety, and performance optimizations.
 */

'use strict';

/**
 * 🎯 CORE COMPOSITION UTILITIES
 */

/**
 * Right-to-left function composition
 * @param {...Function} fns - Functions to compose
 * @returns {Function} Composed function
 */
function compose(...fns) {
  if (fns.length === 0) {
    return arg => arg;
  }
  
  if (fns.length === 1) {
    return fns[0];
  }
  
  // Validate all arguments are functions
  fns.forEach((fn, index) => {
    if (typeof fn !== 'function') {
      throw new TypeError(`Argument ${index} is not a function`);
    }
  });
  
  return function composed(...args) {
    let index = fns.length - 1;
    let result = fns[index].apply(this, args);
    
    while (index--) {
      result = fns[index].call(this, result);
    }
    
    return result;
  };
}

/**
 * Left-to-right function composition (pipe)
 * @param {...Function} fns - Functions to pipe
 * @returns {Function} Piped function
 */
function pipe(...fns) {
  if (fns.length === 0) {
    return arg => arg;
  }
  
  if (fns.length === 1) {
    return fns[0];
  }
  
  // Validate all arguments are functions
  fns.forEach((fn, index) => {
    if (typeof fn !== 'function') {
      throw new TypeError(`Argument ${index} is not a function`);
    }
  });
  
  return function piped(...args) {
    let result = fns[0].apply(this, args);
    
    for (let i = 1; i < fns.length; i++) {
      result = fns[i].call(this, result);
    }
    
    return result;
  };
}

/**
 * Compose functions with error handling
 * @param {...Function} fns - Functions to compose
 * @param {Function} errorHandler - Error handler function
 * @returns {Function} Composed function with error handling
 */
function composeWithErrorHandling(...fns) {
  const functions = fns.slice(0, -1);
  const errorHandler = fns[fns.length - 1];
  
  if (typeof errorHandler !== 'function') {
    throw new TypeError('Last argument must be an error handler function');
  }
  
  return function composed(...args) {
    try {
      return pipe(...functions)(...args);
    } catch (error) {
      return errorHandler(error, ...args);
    }
  };
}

/**
 * 🏗️ ADVANCED COMPOSITION PATTERNS
 */

/**
 * Create a composable function with middleware
 * @param {Function} coreFunction - Core function to wrap
 * @returns {Object} Composable function object
 */
function createComposable(coreFunction) {
  if (typeof coreFunction !== 'function') {
    throw new TypeError('Core function must be a function');
  }
  
  const middlewares = {
    before: [],
    after: [],
    error: []
  };
  
  function execute(...args) {
    try {
      // Execute before middleware
      let processedArgs = [...args];
      for (const middleware of middlewares.before) {
        processedArgs = middleware(...processedArgs);
        if (!Array.isArray(processedArgs)) {
          processedArgs = [processedArgs];
        }
      }
      
      // Execute core function
      let result = coreFunction(...processedArgs);
      
      // Execute after middleware
      for (const middleware of middlewares.after) {
        result = middleware(result);
      }
      
      return result;
    } catch (error) {
      // Execute error middleware
      for (const middleware of middlewares.error) {
        const handled = middleware(error, ...args);
        if (handled !== undefined) {
          return handled;
        }
      }
      throw error;
    }
  }
  
  // Add chainable API
  execute.before = function(...middlewares) {
    middlewares.forEach(mw => {
      if (typeof mw !== 'function') {
        throw new TypeError('Before middleware must be a function');
      }
      this.middlewares.before.push(mw);
    });
    return this;
  };
  
  execute.after = function(...middlewares) {
    middlewares.forEach(mw => {
      if (typeof mw !== 'function') {
        throw new TypeError('After middleware must be a function');
      }
      this.middlewares.after.push(mw);
    });
    return this;
  };
  
  execute.error = function(...middlewares) {
    middlewares.forEach(mw => {
      if (typeof mw !== 'function') {
        throw new TypeError('Error middleware must be a function');
      }
      this.middlewares.error.push(mw);
    });
    return this;
  };
  
  execute.middlewares = middlewares;
  
  return execute;
}

/**
 * Compose asynchronous functions
 * @param {...Function} fns - Async functions to compose
 * @returns {Function} Composed async function
 */
function composeAsync(...fns) {
  if (fns.length === 0) {
    return async arg => arg;
  }
  
  fns.forEach((fn, index) => {
    if (typeof fn !== 'function') {
      throw new TypeError(`Argument ${index} is not a function`);
    }
  });
  
  return async function composedAsync(...args) {
    let index = fns.length - 1;
    let result = await fns[index].apply(this, args);
    
    while (index--) {
      result = await fns[index].call(this, result);
    }
    
    return result;
  };
}

/**
 * Pipe asynchronous functions
 * @param {...Function} fns - Async functions to pipe
 * @returns {Function} Piped async function
 */
function pipeAsync(...fns) {
  if (fns.length === 0) {
    return async arg => arg;
  }
  
  fns.forEach((fn, index) => {
    if (typeof fn !== 'function') {
      throw new TypeError(`Argument ${index} is not a function`);
    }
  });
  
  return async function pipedAsync(...args) {
    let result = await fns[0].apply(this, args);
    
    for (let i = 1; i < fns.length; i++) {
      result = await fns[i].call(this, result);
    }
    
    return result;
  };
}

/**
 * 🔄 FUNCTION TRANSFORMERS
 */

/**
 * Create a memoized version of a function
 * @param {Function} fn - Function to memoize
 * @param {Function} [resolver] - Cache key resolver
 * @returns {Function} Memoized function
 */
function memoize(fn, resolver) {
  if (typeof fn !== 'function') {
    throw new TypeError('Function to memoize must be a function');
  }
  
  const cache = new Map();
  
  const memoized = function(...args) {
    const key = resolver ? resolver.apply(this, args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
  
  // Add cache management
  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  
  return memoized;
}

/**
 * Create a debounced version of a function
 * @param {Function} fn - Function to debounce
 * @param {number} wait - Debounce wait time
 * @param {boolean} [immediate=false] - Execute immediately
 * @returns {Function} Debounced function
 */
function debounce(fn, wait, immediate = false) {
  if (typeof fn !== 'function') {
    throw new TypeError('Function to debounce must be a function');
  }
  
  let timeout;
  
  return function debounced(...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) fn.apply(context, args);
  };
}

/**
 * Create a throttled version of a function
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Throttle limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(fn, limit) {
  if (typeof fn !== 'function') {
    throw new TypeError('Function to throttle must be a function');
  }
  
  let inThrottle;
  let lastResult;
  
  return function throttled(...args) {
    const context = this;
    
    if (!inThrottle) {
      inThrottle = true;
      lastResult = fn.apply(context, args);
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
    
    return lastResult;
  };
}

/**
 * 🎯 CURRYING AND PARTIAL APPLICATION
 */

/**
 * Curry a function
 * @param {Function} fn - Function to curry
 * @returns {Function} Curried function
 */
function curry(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Function to curry must be a function');
  }
  
  const arity = fn.length;
  
  function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    } else {
      return (...moreArgs) => 
        curried.apply(this, args.concat(moreArgs));
    }
  }
  
  return curried;
}

/**
 * Partially apply arguments to a function
 * @param {Function} fn - Function to partially apply
 * @param {...*} args - Arguments to apply
 * @returns {Function} Partially applied function
 */
function partial(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError('Function to partially apply must be a function');
  }
  
  return function partiallyApplied(...moreArgs) {
    return fn.apply(this, args.concat(moreArgs));
  };
}

/**
 * Partially apply arguments from the right
 * @param {Function} fn - Function to partially apply
 * @param {...*} args - Arguments to apply
 * @returns {Function} Partially applied function
 */
function partialRight(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError('Function to partially apply must be a function');
  }
  
  return function partiallyApplied(...moreArgs) {
    return fn.apply(this, moreArgs.concat(args));
  };
}

/**
 * 🏭 PRODUCTION USE CASES
 */

/**
 * Create a data processing pipeline
 * @param {Array} processors - Array of processing functions
 * @returns {Function} Data processing pipeline
 */
function createDataPipeline(processors) {
  if (!Array.isArray(processors)) {
    throw new TypeError('Processors must be an array');
  }
  
  processors.forEach((processor, index) => {
    if (typeof processor !== 'function') {
      throw new TypeError(`Processor ${index} must be a function`);
    }
  });
  
  // Create pipeline with error handling and logging
  return composeWithErrorHandling(
    ...processors,
    (error, data) => {
      console.error('Data pipeline error:', error);
      return {
        error: error.message,
        data,
        timestamp: new Date().toISOString()
      };
    }
  );
}

/**
 * Create a validation pipeline
 * @param {Array} validators - Array of validator functions
 * @returns {Function} Validation pipeline
 */
function createValidationPipeline(validators) {
  if (!Array.isArray(validators)) {
    throw new TypeError('Validators must be an array');
  }
  
  validators.forEach((validator, index) => {
    if (typeof validator !== 'function') {
      throw new TypeError(`Validator ${index} must be a function`);
    }
  });
  
  return function validate(data) {
    const errors = [];
    
    for (const validator of validators) {
      const result = validator(data);
      if (result !== true) {
        errors.push(result);
      }
    }
    
    return errors.length === 0 ? { valid: true, data } : { valid: false, errors };
  };
}

/**
 * Create an API request handler
 * @param {Object} config - Handler configuration
 * @returns {Function} API request handler
 */
function createApiHandler(config = {}) {
  const {
    validate: validateFn,
    authenticate,
    authorize,
    process,
    format,
    errorHandler
  } = config;
  
  const handler = composeWithErrorHandling(
    // Validation
    validateFn ? (data) => {
      const validation = validateFn(data);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }
      return data;
    } : (x) => x,
    
    // Authentication
    authenticate ? async (data) => {
      const auth = await authenticate(data);
      if (!auth.authenticated) {
        throw new Error('Authentication failed');
      }
      return { ...data, user: auth.user };
    } : (x) => x,
    
    // Authorization
    authorize ? (data) => {
      const authz = authorize(data);
      if (!authz.authorized) {
        throw new Error('Authorization failed');
      }
      return data;
    } : (x) => x,
    
    // Processing
    process || ((x) => x),
    
    // Formatting
    format || ((x) => x)
  );
  
  // Wrap with async handler
  return async function apiHandler(request) {
    try {
      const result = await handler(request);
      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      if (errorHandler) {
        return errorHandler(error, request);
      }
      
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  };
}

/**
 * 🚀 PERFORMANCE OPTIMIZED COMPOSITION
 */

/**
 * Compose functions with performance tracking
 * @param {...Function} fns - Functions to compose
 * @returns {Function} Composed function with performance tracking
 */
function composeWithPerformance(...fns) {
  const composed = compose(...fns);
  
  return function tracked(...args) {
    const start = performance.now();
    const result = composed.apply(this, args);
    const end = performance.now();
    
    // Log performance (in production, send to monitoring service)
    console.log(`Function composition took ${end - start}ms`);
    
    return result;
  };
}

/**
 * Batch process items with composition
 * @param {Function} processor - Item processor function
 * @param {number} batchSize - Batch size
 * @returns {Function} Batch processing function
 */
function createBatchProcessor(processor, batchSize = 100) {
  if (typeof processor !== 'function') {
    throw new TypeError('Processor must be a function');
  }
  
  return async function batchProcess(items) {
    if (!Array.isArray(items)) {
      throw new TypeError('Items must be an array');
    }
    
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(item => processor(item))
      );
      results.push(...batchResults);
      
      // Yield to event loop
      if (typeof setImmediate === 'function') {
        await new Promise(resolve => setImmediate(resolve));
      }
    }
    
    return results;
  };
}

/**
 * 🧪 TESTING UTILITIES
 */

function runCompositionTests() {
  console.log('🧪 Running Function Composition Tests...\n');
  
  const tests = [];
  let passed = 0;
  let failed = 0;
  
  function test(name, fn) {
    try {
      fn();
      console.log(`✅ ${name}`);
      passed++;
    } catch (error) {
      console.error(`❌ ${name}:`, error.message);
      failed++;
    }
  }
  
  // Test basic composition
  test('Basic compose', () => {
    const add = x => x + 1;
    const multiply = x => x * 2;
    const composed = compose(multiply, add);
    
    if (composed(5) !== 12) { // (5 + 1) * 2
      throw new Error('Compose failed');
    }
  });
  
  test('Basic pipe', () => {
    const add = x => x + 1;
    const multiply = x => x * 2;
    const piped = pipe(add, multiply);
    
    if (piped(5) !== 12) { // (5 + 1) * 2
      throw new Error('Pipe failed');
    }
  });
  
  // Test currying
  test('Currying', () => {
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);
    
    if (curriedAdd(1)(2)(3) !== 6) {
      throw new Error('Currying failed');
    }
  });
  
  // Test memoization
  test('Memoization', () => {
    let callCount = 0;
    const expensive = x => {
      callCount++;
      return x * 2;
    };
    
    const memoized = memoize(expensive);
    memoized(5);
    memoized(5);
    
    if (callCount !== 1) {
      throw new Error('Memoization failed');
    }
  });
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

/**
 * 🚀 EXPORT MODULES
 */
module.exports = {
  // Core composition
  compose,
  pipe,
  composeWithErrorHandling,
  
  // Advanced composition
  createComposable,
  composeAsync,
  pipeAsync,
  
  // Function transformers
  memoize,
  debounce,
  throttle,
  
  // Currying and partial application
  curry,
  partial,
  partialRight,
  
  // Production use cases
  createDataPipeline,
  createValidationPipeline,
  createApiHandler,
  
  // Performance optimized
  composeWithPerformance,
  createBatchProcessor,
  
  // Testing
  runCompositionTests
};

// Run tests if executed directly
if (require.main === module) {
  module.exports.runCompositionTests();
  
  console.log('\n🚀 Production Examples:\n');
  
  // Example: Data processing pipeline
  const cleanData = data => ({ ...data, cleaned: true });
  const validateData = data => {
    if (!data.id) throw new Error('Missing ID');
    return data;
  };
  const enrichData = data => ({ ...data, enriched: true });
  
  const pipeline = module.exports.createDataPipeline([
    cleanData,
    validateData,
    enrichData
  ]);
  
  console.log('Pipeline result:', pipeline({ id: 1, name: 'Test' }));
  
  // Example: API Handler
  const apiHandler = module.exports.createApiHandler({
    validate: (data) => data.id ? { valid: true } : { valid: false, errors: ['No ID'] },
    process: (data) => ({ ...data, processed: true }),
    format: (data) => ({ result: data })
  });
  
  apiHandler({ id: 1 }).then(console.log);
}
