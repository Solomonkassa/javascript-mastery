/**
 * 🎯 Production-Ready Closure Patterns
 * 
 * This module demonstrates advanced closure patterns for
 * data privacy, state management, and performance optimization.
 */

'use strict';

/**
 * 🔒 1. DATA ENCAPSULATION PATTERNS
 */

/**
 * Creates a secure storage with encryption simulation
 */
function createSecureStorage(namespace, initialData = {}) {
  // Private state
  const data = new Map(Object.entries(initialData));
  const accessLog = [];
  const maxLogSize = 1000;
  
  // Private encryption simulation
  function encrypt(value) {
    // In production, use proper encryption
    return btoa(JSON.stringify(value));
  }
  
  function decrypt(encrypted) {
    try {
      return JSON.parse(atob(encrypted));
    } catch {
      return null;
    }
  }
  
  // Private logging
  function logAccess(operation, key, value = null) {
    const entry = {
      timestamp: new Date().toISOString(),
      namespace,
      operation,
      key,
      valueSize: value ? JSON.stringify(value).length : 0,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'node'
    };
    
    accessLog.unshift(entry);
    
    // Limit log size
    if (accessLog.length > maxLogSize) {
      accessLog.pop();
    }
    
    return entry;
  }
  
  // Public API
  return {
    set(key, value) {
      if (typeof key !== 'string' || key.length === 0) {
        throw new TypeError('Key must be a non-empty string');
      }
      
      const encrypted = encrypt(value);
      data.set(key, encrypted);
      logAccess('set', key, value);
      
      return true;
    },
    
    get(key) {
      if (!data.has(key)) {
        return null;
      }
      
      const encrypted = data.get(key);
      const value = decrypt(encrypted);
      logAccess('get', key);
      
      return value;
    },
    
    has(key) {
      return data.has(key);
    },
    
    delete(key) {
      const existed = data.delete(key);
      if (existed) {
        logAccess('delete', key);
      }
      return existed;
    },
    
    clear() {
      data.clear();
      logAccess('clear', '*');
    },
    
    keys() {
      return Array.from(data.keys());
    },
    
    size() {
      return data.size;
    },
    
    // Audit methods
    getAccessLog(limit = 50) {
      return accessLog.slice(0, limit);
    },
    
    getStats() {
      return {
        namespace,
        size: data.size,
        accessCount: accessLog.length,
        lastAccess: accessLog[0] || null
      };
    },
    
    // Export/Import
    exportData() {
      const exported = {};
      for (const [key, value] of data) {
        exported[key] = decrypt(value);
      }
      return exported;
    },
    
    importData(newData) {
      if (typeof newData !== 'object' || newData === null) {
        throw new TypeError('Data must be an object');
      }
      
      Object.entries(newData).forEach(([key, value]) => {
        this.set(key, value);
      });
      
      return this.keys().length;
    }
  };
}

/**
 * 🏭 2. FACTORY PATTERNS WITH CLOSURES
 */

/**
 * Creates a user session manager with auto-expiry
 */
function createSessionManager(config = {}) {
  const {
    timeout = 30 * 60 * 1000, // 30 minutes default
    maxSessions = 100,
    cleanupInterval = 60 * 1000 // 1 minute
  } = config;
  
  const sessions = new Map();
  const sessionTokens = new WeakMap();
  
  // Auto cleanup
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    let removed = 0;
    
    for (const [token, session] of sessions) {
      if (now - session.lastActivity > timeout) {
        sessions.delete(token);
        removed++;
      }
    }
    
    if (removed > 0) {
      console.log(`Cleaned up ${removed} expired sessions`);
    }
  }, cleanupInterval);
  
  // Private session validation
  function validateSession(token) {
    const session = sessions.get(token);
    
    if (!session) {
      return { valid: false, reason: 'Session not found' };
    }
    
    const now = Date.now();
    const age = now - session.lastActivity;
    
    if (age > timeout) {
      sessions.delete(token);
      return { valid: false, reason: 'Session expired' };
    }
    
    // Update last activity
    session.lastActivity = now;
    
    return { 
      valid: true, 
      session: { ...session, token },
      remaining: timeout - age 
    };
  }
  
  // Public API
  const manager = {
    create(userData) {
      if (sessions.size >= maxSessions) {
        // Remove oldest session
        const oldestToken = Array.from(sessions.entries())
          .sort(([, a], [, b]) => a.lastActivity - b.lastActivity)[0]?.[0];
        
        if (oldestToken) {
          sessions.delete(oldestToken);
        }
      }
      
      const token = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const session = {
        user: { ...userData },
        createdAt: Date.now(),
        lastActivity: Date.now(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
      };
      
      sessions.set(token, session);
      sessionTokens.set(session, token);
      
      return { token, session: { ...session } };
    },
    
    validate(token) {
      return validateSession(token);
    },
    
    destroy(token) {
      const existed = sessions.delete(token);
      return existed;
    },
    
    destroyAllForUser(userId) {
      let destroyed = 0;
      
      for (const [token, session] of sessions) {
        if (session.user.id === userId) {
          sessions.delete(token);
          destroyed++;
        }
      }
      
      return destroyed;
    },
    
    getActiveSessions() {
      return Array.from(sessions.entries()).map(([token, session]) => ({
        token,
        ...session,
        age: Date.now() - session.lastActivity
      }));
    },
    
    getStats() {
      const now = Date.now();
      const activeSessions = this.getActiveSessions();
      
      return {
        total: sessions.size,
        active: activeSessions.length,
        oldest: Math.max(...activeSessions.map(s => s.age)),
        newest: Math.min(...activeSessions.map(s => s.age)),
        cleanupInterval,
        timeout
      };
    },
    
    // Cleanup
    stopCleanup() {
      clearInterval(cleanupTimer);
    }
  };
  
  return manager;
}

/**
 * 🎛️ 3. MIDDLEWARE PATTERN WITH CLOSURES
 */

/**
 * Creates a middleware pipeline for request processing
 */
function createMiddlewarePipeline(initialContext = {}) {
  const middlewares = [];
  let context = { ...initialContext };
  
  // Private error handler
  function handleError(error, ctx, middleware) {
    console.error(`Middleware error [${middleware.name}]:`, error);
    
    if (ctx.onError) {
      ctx.onError(error, middleware);
    }
    
    throw error;
  }
  
  // Public API
  return {
    use(middleware) {
      if (typeof middleware !== 'function') {
        throw new TypeError('Middleware must be a function');
      }
      
      middlewares.push({
        fn: middleware,
        name: middleware.name || 'anonymous'
      });
      
      return this;
    },
    
    async execute(input) {
      let currentIndex = 0;
      const ctx = { 
        ...context, 
        input,
        output: null,
        startTime: Date.now()
      };
      
      // Next function for middleware chain
      const next = async () => {
        if (currentIndex >= middlewares.length) {
          return;
        }
        
        const middleware = middlewares[currentIndex];
        currentIndex++;
        
        try {
          await middleware.fn(ctx, next);
        } catch (error) {
          handleError(error, ctx, middleware);
        }
      };
      
      await next();
      
      // Calculate execution time
      ctx.executionTime = Date.now() - ctx.startTime;
      
      return ctx;
    },
    
    clear() {
      middlewares.length = 0;
      return this;
    },
    
    setContext(newContext) {
      context = { ...context, ...newContext };
      return this;
    },
    
    getMiddlewareCount() {
      return middlewares.length;
    },
    
    // For debugging
    _debug() {
      return {
        context,
        middlewares: middlewares.map(m => m.name),
        count: middlewares.length
      };
    }
  };
}

/**
 * 🔄 4. STATE MANAGEMENT WITH CLOSURES
 */

/**
 * Creates a reactive state store with subscriptions
 */
function createReactiveStore(initialState = {}) {
  let state = { ...initialState };
  const subscribers = new Set();
  const actionLog = [];
  const maxLogSize = 100;
  
  // Private state update with validation
  function updateState(updater, action = 'UPDATE') {
    const previousState = { ...state };
    const newState = typeof updater === 'function' 
      ? updater(previousState) 
      : { ...previousState, ...updater };
    
    // State validation hook
    if (this.validate && typeof this.validate === 'function') {
      const isValid = this.validate(newState, previousState, action);
      if (!isValid) {
        throw new Error(`State update validation failed for action: ${action}`);
      }
    }
    
    state = newState;
    
    // Log action
    actionLog.unshift({
      action,
      timestamp: new Date().toISOString(),
      previousState,
      newState,
      diff: getObjectDiff(previousState, newState)
    });
    
    // Limit log size
    if (actionLog.length > maxLogSize) {
      actionLog.pop();
    }
    
    // Notify subscribers
    notifySubscribers(newState, previousState, action);
    
    return newState;
  }
  
  // Private diff calculation
  function getObjectDiff(oldObj, newObj) {
    const diff = {};
    
    // Check for changes and additions
    for (const key in newObj) {
      if (oldObj[key] !== newObj[key]) {
        diff[key] = { old: oldObj[key], new: newObj[key] };
      }
    }
    
    // Check for deletions
    for (const key in oldObj) {
      if (!(key in newObj)) {
        diff[key] = { old: oldObj[key], new: undefined };
      }
    }
    
    return diff;
  }
  
  // Private subscriber notification
  function notifySubscribers(newState, oldState, action) {
    subscribers.forEach(subscriber => {
      try {
        subscriber(newState, oldState, action);
      } catch (error) {
        console.error('Subscriber error:', error);
      }
    });
  }
  
  // Public API
  const store = {
    getState() {
      return { ...state };
    },
    
    dispatch(action, payload) {
      return updateState.call(this, payload || action, action.type || action);
    },
    
    subscribe(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Subscriber must be a function');
      }
      
      subscribers.add(callback);
      
      // Return unsubscribe function
      return () => subscribers.delete(callback);
    },
    
    select(selector) {
      if (typeof selector !== 'function') {
        throw new TypeError('Selector must be a function');
      }
      
      return selector(state);
    },
    
    // History and debugging
    getActionLog(limit = 20) {
      return actionLog.slice(0, limit);
    },
    
    getSubscriberCount() {
      return subscribers.size;
    },
    
    // Middleware support
    middleware: null,
    validate: null,
    
    // Reset store
    reset(newState = {}) {
      state = { ...newState };
      actionLog.length = 0;
      subscribers.clear();
      return this.getState();
    }
  };
  
  return store;
}

/**
 * 🚀 5. PERFORMANCE OPTIMIZED CLOSURES
 */

/**
 * Creates a memoized function with cache management
 */
function createMemoizedFunction(fn, options = {}) {
  const {
    maxSize = 100,
    ttl = 0, // 0 = no expiry
    serializer = JSON.stringify,
    cacheErrors = false
  } = options;
  
  const cache = new Map();
  const lruKeys = [];
  const stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    errors: 0
  };
  
  // Private cache management
  function manageCacheSize() {
    while (cache.size > maxSize && lruKeys.length > 0) {
      const oldestKey = lruKeys.shift();
      cache.delete(oldestKey);
      stats.evictions++;
    }
  }
  
  function updateLRU(key) {
    const index = lruKeys.indexOf(key);
    if (index > -1) {
      lruKeys.splice(index, 1);
    }
    lruKeys.push(key);
  }
  
  function isExpired(entry) {
    return ttl > 0 && (Date.now() - entry.timestamp) > ttl;
  }
  
  // Public memoized function
  const memoized = function(...args) {
    const key = serializer(args);
    
    // Check cache
    if (cache.has(key)) {
      const entry = cache.get(key);
      
      if (!isExpired(entry)) {
        stats.hits++;
        updateLRU(key);
        return entry.value;
      }
      
      // Remove expired entry
      cache.delete(key);
      const lruIndex = lruKeys.indexOf(key);
      if (lruIndex > -1) {
        lruKeys.splice(lruIndex, 1);
      }
    }
    
    // Cache miss - compute value
    stats.misses++;
    
    try {
      const value = fn.apply(this, args);
      const entry = {
        value,
        timestamp: Date.now(),
        args: args.slice() // Store copy of arguments for debugging
      };
      
      cache.set(key, entry);
      lruKeys.push(key);
      manageCacheSize();
      
      return value;
    } catch (error) {
      stats.errors++;
      
      if (cacheErrors) {
        const entry = {
          value: error,
          timestamp: Date.now(),
          isError: true,
          args: args.slice()
        };
        
        cache.set(key, entry);
        lruKeys.push(key);
        manageCacheSize();
      }
      
      throw error;
    }
  };
  
  // Add cache management methods
  memoized.clearCache = function() {
    cache.clear();
    lruKeys.length = 0;
    return this;
  };
  
  memoized.getCacheSize = function() {
    return cache.size;
  };
  
  memoized.getStats = function() {
    return { ...stats };
  };
  
  memoized.getCacheKeys = function() {
    return [...lruKeys];
  };
  
  memoized.removeKey = function(...args) {
    const key = serializer(args);
    const existed = cache.delete(key);
    
    if (existed) {
      const index = lruKeys.indexOf(key);
      if (index > -1) {
        lruKeys.splice(index, 1);
      }
    }
    
    return existed;
  };
  
  return memoized;
}

/**
 * 🧪 TESTING UTILITIES
 */

function runClosurePatternTests() {
  console.log('🧪 Running Closure Pattern Tests...\n');
  
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
  
  // Test secure storage
  test('Secure Storage', () => {
    const storage = createSecureStorage('test');
    storage.set('key1', 'value1');
    
    if (storage.get('key1') !== 'value1') {
      throw new Error('Storage should return stored value');
    }
    
    if (!storage.has('key1')) {
      throw new Error('Storage should have key');
    }
  });
  
  // Test session manager
  test('Session Manager', () => {
    const manager = createSessionManager({ timeout: 1000 });
    const session = manager.create({ id: 1, name: 'Test' });
    
    if (!manager.validate(session.token).valid) {
      throw new Error('Session should be valid');
    }
  });
  
  // Test reactive store
  test('Reactive Store', () => {
    const store = createReactiveStore({ count: 0 });
    let notified = false;
    
    store.subscribe(() => { notified = true; });
    store.dispatch({ type: 'INCREMENT' }, { count: 1 });
    
    if (!notified) {
      throw new Error('Subscribers should be notified');
    }
    
    if (store.getState().count !== 1) {
      throw new Error('State should be updated');
    }
  });
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

/**
 * 🚀 EXPORT MODULES
 */
module.exports = {
  // Core patterns
  createSecureStorage,
  createSessionManager,
  createMiddlewarePipeline,
  createReactiveStore,
  createMemoizedFunction,
  
  // Testing
  runClosurePatternTests,
  
  // Utility function for combining patterns
  createApplication: function(config = {}) {
    const app = {
      config: createSecureStorage('app_config', config),
      sessions: createSessionManager(config.session),
      store: createReactiveStore(config.initialState),
      middleware: createMiddlewarePipeline(),
      
      // Combined methods
      async handleRequest(request) {
        const context = {
          request,
          session: null,
          user: null
        };
        
        // Add session to context if token exists
        if (request.token) {
          const session = this.sessions.validate(request.token);
          if (session.valid) {
            context.session = session.session;
            context.user = session.session.user;
          }
        }
        
        // Execute middleware pipeline
        const result = await this.middleware
          .setContext(context)
          .execute(request);
          
        return result;
      },
      
      // Application lifecycle
      initialize() {
        console.log('Application initialized');
        return this;
      },
      
      shutdown() {
        this.sessions.stopCleanup();
        console.log('Application shutdown');
        return this;
      }
    };
    
    return app;
  }
};

// Run tests if executed directly
if (require.main === module) {
  module.exports.runClosurePatternTests();
  
  // Demo application
  console.log('\n🚀 Demo Application:\n');
  const app = module.exports.createApplication({
    session: { timeout: 300000 },
    initialState: { users: [], requests: 0 }
  });
  
  app.initialize();
  console.log('App initialized with:', {
    configSize: app.config.size(),
    middlewareCount: app.middleware.getMiddlewareCount()
  });
}
