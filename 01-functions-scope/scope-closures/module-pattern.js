/**
 * 📦 Production-Ready Module Patterns
 * 
 * This module demonstrates professional JavaScript module patterns
 * for encapsulation, dependency management, and code organization.
 */

'use strict';

/**
 * 🎯 1. CLASSIC MODULE PATTERN
 */

/**
 * Database Module with connection pooling
 */
const DatabaseModule = (function() {
  // Private variables
  const connections = new Map();
  const config = {
    maxConnections: 10,
    connectionTimeout: 30000,
    defaultDatabase: 'main'
  };
  
  // Private connection factory
  function createConnection(dbName) {
    const connectionId = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulated connection object
    const connection = {
      id: connectionId,
      dbName,
      connectedAt: new Date(),
      lastUsed: new Date(),
      isConnected: true,
      
      query(sql, params = []) {
        this.lastUsed = new Date();
        console.log(`[${this.id}] Executing: ${sql}`, params);
        return { rows: [], affectedRows: 0 };
      },
      
      close() {
        this.isConnected = false;
        connections.delete(connectionId);
        console.log(`[${this.id}] Closed connection to ${dbName}`);
      }
    };
    
    connections.set(connectionId, connection);
    console.log(`[${connectionId}] Created connection to ${dbName}`);
    
    return connection;
  }
  
  // Private connection pool management
  function getAvailableConnection(dbName) {
    for (const [id, conn] of connections) {
      if (conn.dbName === dbName && 
          conn.isConnected && 
          (new Date() - conn.lastUsed) < config.connectionTimeout) {
        return conn;
      }
    }
    
    if (connections.size >= config.maxConnections) {
      throw new Error('Maximum connections reached');
    }
    
    return createConnection(dbName);
  }
  
  // Private cleanup
  setInterval(() => {
    const now = new Date();
    let cleaned = 0;
    
    for (const [id, conn] of connections) {
      if (now - conn.lastUsed > config.connectionTimeout) {
        conn.close();
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`Cleaned up ${cleaned} idle connections`);
    }
  }, 60000); // Check every minute
  
  // Public API
  return {
    /**
     * Execute a database query
     * @param {string} sql - SQL query
     * @param {Array} params - Query parameters
     * @param {string} database - Database name
     * @returns {Promise<Object>} Query result
     */
    async query(sql, params = [], database = config.defaultDatabase) {
      const connection = getAvailableConnection(database);
      
      try {
        const result = await connection.query(sql, params);
        return {
          success: true,
          data: result.rows,
          affectedRows: result.affectedRows,
          connectionId: connection.id
        };
      } catch (error) {
        console.error(`Query failed:`, error);
        throw error;
      }
    },
    
    /**
     * Get database statistics
     * @returns {Object} Statistics object
     */
    getStats() {
      const stats = {
        totalConnections: connections.size,
        activeConnections: Array.from(connections.values())
          .filter(c => c.isConnected).length,
        databases: {},
        createdAt: new Date()
      };
      
      // Group by database
      Array.from(connections.values()).forEach(conn => {
        if (!stats.databases[conn.dbName]) {
          stats.databases[conn.dbName] = 0;
        }
        stats.databases[conn.dbName]++;
      });
      
      return stats;
    },
    
    /**
     * Update module configuration
     * @param {Object} newConfig - New configuration
     */
    configure(newConfig) {
      Object.assign(config, newConfig);
      console.log('Database module reconfigured:', config);
      return this;
    },
    
    /**
     * Close all connections
     */
    shutdown() {
      Array.from(connections.values()).forEach(conn => conn.close());
      console.log('Database module shutdown');
      return this;
    }
  };
})();

/**
 * 🏗️ 2. REVEALING MODULE PATTERN
 */

/**
 * Authentication Service with JWT
 */
const AuthService = (function() {
  // Private constants
  const TOKEN_SECRET = process.env.JWT_SECRET || 'development-secret-change-in-production';
  const TOKEN_EXPIRY = '24h';
  const REFRESH_TOKEN_EXPIRY = '7d';
  
  // Private storage
  const refreshTokens = new Map();
  const loginAttempts = new Map();
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  
  // Private JWT utilities (simplified - use library like jsonwebtoken in production)
  function generateToken(payload, expiresIn = TOKEN_EXPIRY) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const data = btoa(JSON.stringify({ 
      ...payload, 
      exp: Date.now() + parseExpiry(expiresIn) 
    }));
    const signature = btoa(header + data + TOKEN_SECRET);
    
    return `${header}.${data}.${signature}`;
  }
  
  function verifyToken(token) {
    try {
      const [header, data, signature] = token.split('.');
      const expectedSignature = btoa(header + data + TOKEN_SECRET);
      
      if (signature !== expectedSignature) {
        throw new Error('Invalid signature');
      }
      
      const payload = JSON.parse(atob(data));
      
      if (payload.exp && payload.exp < Date.now()) {
        throw new Error('Token expired');
      }
      
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
  
  function parseExpiry(expiry) {
    const match = expiry.match(/^(\d+)([hmd])$/);
    if (!match) return 24 * 60 * 60 * 1000; // Default 24 hours
    
    const [, amount, unit] = match;
    const multipliers = { h: 60 * 60 * 1000, m: 60 * 1000, d: 24 * 60 * 60 * 1000 };
    
    return parseInt(amount) * (multipliers[unit] || 1);
  }
  
  // Private rate limiting
  function checkLoginAttempts(username) {
    const attempts = loginAttempts.get(username) || [];
    const now = Date.now();
    
    // Remove old attempts
    const recentAttempts = attempts.filter(time => now - time < LOCKOUT_DURATION);
    
    if (recentAttempts.length >= MAX_LOGIN_ATTEMPTS) {
      return { allowed: false, remaining: 0, reset: recentAttempts[0] + LOCKOUT_DURATION };
    }
    
    return { 
      allowed: true, 
      remaining: MAX_LOGIN_ATTEMPTS - recentAttempts.length,
      reset: null 
    };
  }
  
  function recordLoginAttempt(username, success) {
    const attempts = loginAttempts.get(username) || [];
    
    if (success) {
      loginAttempts.delete(username);
    } else {
      attempts.push(Date.now());
      loginAttempts.set(username, attempts);
    }
  }
  
  // Private user validation (simulated)
  async function validateUserCredentials(username, password) {
    // In production, hash password and check against database
    const mockUsers = {
      'admin': 'admin123',
      'user': 'password123'
    };
    
    return mockUsers[username] === password;
  }
  
  // Public API - revealing only necessary methods
  return {
    /**
     * Authenticate user and generate tokens
     * @param {string} username - Username
     * @param {string} password - Password
     * @returns {Promise<Object>} Authentication result
     */
    async login(username, password) {
      // Check rate limiting
      const rateLimit = checkLoginAttempts(username);
      if (!rateLimit.allowed) {
        return {
          success: false,
          error: 'Too many login attempts',
          reset: rateLimit.reset
        };
      }
      
      // Validate credentials
      const isValid = await validateUserCredentials(username, password);
      
      if (!isValid) {
        recordLoginAttempt(username, false);
        return {
          success: false,
          error: 'Invalid credentials',
          remaining: rateLimit.remaining - 1
        };
      }
      
      // Generate tokens
      const accessToken = generateToken({ 
        username, 
        role: username === 'admin' ? 'admin' : 'user' 
      });
      
      const refreshToken = generateToken({ 
        username, 
        type: 'refresh' 
      }, REFRESH_TOKEN_EXPIRY);
      
      // Store refresh token
      refreshTokens.set(refreshToken, {
        username,
        createdAt: new Date(),
        lastUsed: new Date()
      });
      
      recordLoginAttempt(username, true);
      
      return {
        success: true,
        accessToken,
        refreshToken,
        expiresIn: TOKEN_EXPIRY,
        user: { username, role: username === 'admin' ? 'admin' : 'user' }
      };
    },
    
    /**
     * Verify access token
     * @param {string} token - JWT token
     * @returns {Object} Verification result
     */
    verifyAccessToken(token) {
      return verifyToken(token);
    },
    
    /**
     * Refresh access token using refresh token
     * @param {string} refreshToken - Refresh token
     * @returns {Object} New tokens
     */
    refreshToken(refreshToken) {
      const stored = refreshTokens.get(refreshToken);
      
      if (!stored) {
        return { success: false, error: 'Invalid refresh token' };
      }
      
      stored.lastUsed = new Date();
      
      const newAccessToken = generateToken({ 
        username: stored.username, 
        role: stored.username === 'admin' ? 'admin' : 'user' 
      });
      
      return {
        success: true,
        accessToken: newAccessToken,
        expiresIn: TOKEN_EXPIRY
      };
    },
    
    /**
     * Logout - invalidate refresh token
     * @param {string} refreshToken - Refresh token to invalidate
     */
    logout(refreshToken) {
      return refreshTokens.delete(refreshToken);
    },
    
    /**
     * Get authentication statistics
     * @returns {Object} Stats object
     */
    getStats() {
      return {
        activeRefreshTokens: refreshTokens.size,
        lockedAccounts: Array.from(loginAttempts.entries())
          .filter(([_, attempts]) => 
            attempts.length >= MAX_LOGIN_ATTEMPTS &&
            (Date.now() - attempts[0]) < LOCKOUT_DURATION
          ).length,
        totalLoginAttempts: Array.from(loginAttempts.values())
          .reduce((sum, attempts) => sum + attempts.length, 0)
      };
    }
  };
})();

/**
 * 🧩 3. MODULE COMPOSITION PATTERN
 */

/**
 * Main Application Module combining other modules
 */
const Application = (function() {
  // Import dependencies
  const db = DatabaseModule;
  const auth = AuthService;
  
  // Private state
  let isInitialized = false;
  const modules = new Map();
  const eventListeners = new Map();
  
  // Private module registration
  function registerModule(name, module) {
    if (modules.has(name)) {
      throw new Error(`Module ${name} already registered`);
    }
    
    modules.set(name, module);
    emitEvent('moduleRegistered', { name, module });
    
    return module;
  }
  
  // Private event system
  function emitEvent(event, data) {
    const listeners = eventListeners.get(event) || [];
    listeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.error(`Event listener error for ${event}:`, error);
      }
    });
  }
  
  // Private initialization
  async function initializeModules() {
    const initializationOrder = ['config', 'database', 'auth', 'api'];
    
    for (const moduleName of initializationOrder) {
      const module = modules.get(moduleName);
      if (module && module.initialize) {
        try {
          await module.initialize();
          console.log(`✅ Module ${moduleName} initialized`);
        } catch (error) {
          console.error(`❌ Failed to initialize ${moduleName}:`, error);
          throw error;
        }
      }
    }
  }
  
  // Public API
  return {
    /**
     * Initialize the application
     * @param {Object} config - Application configuration
     */
    async initialize(config = {}) {
      if (isInitialized) {
        throw new Error('Application already initialized');
      }
      
      console.log('🚀 Initializing Application...');
      
      // Register core modules
      registerModule('config', {
        initialize: () => {
          this.config = config;
          return Promise.resolve();
        }
      });
      
      registerModule('database', db.configure(config.database));
      registerModule('auth', auth);
      
      try {
        await initializeModules();
        isInitialized = true;
        emitEvent('initialized', { timestamp: new Date(), config });
        console.log('✅ Application initialized successfully');
      } catch (error) {
        console.error('❌ Application initialization failed:', error);
        throw error;
      }
      
      return this;
    },
    
    /**
     * Register a custom module
     * @param {string} name - Module name
     * @param {Object} module - Module object
     */
    registerModule,
    
    /**
     * Get a module by name
     * @param {string} name - Module name
     * @returns {Object} Module instance
     */
    getModule(name) {
      const module = modules.get(name);
      if (!module) {
        throw new Error(`Module ${name} not found`);
      }
      return module;
    },
    
    /**
     * Execute a database query
     * @param {string} sql - SQL query
     * @param {Array} params - Query parameters
     * @returns {Promise<Object>} Query result
     */
    async query(sql, params = []) {
      if (!isInitialized) {
        throw new Error('Application not initialized');
      }
      
      return await db.query(sql, params);
    },
    
    /**
     * Authenticate user
     * @param {string} username - Username
     * @param {string} password - Password
     * @returns {Promise<Object>} Authentication result
     */
    async authenticate(username, password) {
      if (!isInitialized) {
        throw new Error('Application not initialized');
      }
      
      return await auth.login(username, password);
    },
    
    /**
     * Add event listener
     * @param {string} event - Event name
     * @param {Function} listener - Event listener
     * @returns {Function} Unsubscribe function
     */
    on(event, listener) {
      if (!eventListeners.has(event)) {
        eventListeners.set(event, []);
      }
      
      eventListeners.get(event).push(listener);
      
      return () => {
        const listeners = eventListeners.get(event) || [];
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    },
    
    /**
     * Get application status
     * @returns {Object} Status object
     */
    getStatus() {
      return {
        isInitialized,
        moduleCount: modules.size,
        databaseStats: db.getStats(),
        authStats: auth.getStats(),
        uptime: isInitialized ? Date.now() - this.startTime : 0
      };
    },
    
    /**
     * Shutdown application
     */
    async shutdown() {
      console.log('🛑 Shutting down application...');
      
      // Shutdown modules in reverse order
      const shutdownOrder = Array.from(modules.keys()).reverse();
      
      for (const moduleName of shutdownOrder) {
        const module = modules.get(moduleName);
        if (module && module.shutdown) {
          try {
            await module.shutdown();
            console.log(`✅ Module ${moduleName} shutdown`);
          } catch (error) {
            console.error(`❌ Error shutting down ${moduleName}:`, error);
          }
        }
      }
      
      isInitialized = false;
      emitEvent('shutdown', { timestamp: new Date() });
      console.log('✅ Application shutdown complete');
    },
    
    // For debugging
    _debug() {
      return {
        modules: Array.from(modules.keys()),
        events: Array.from(eventListeners.keys()),
        isInitialized,
        eventListeners: Array.from(eventListeners.entries())
          .reduce((obj, [key, listeners]) => {
            obj[key] = listeners.length;
            return obj;
          }, {})
      };
    }
  };
})();

/**
 * 🧪 MODULE TESTING
 */

function testModules() {
  console.log('🧪 Testing Module Patterns...\n');
  
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
  
  // Test Database Module
  test('Database Module - Configuration', () => {
    DatabaseModule.configure({ maxConnections: 5 });
    const stats = DatabaseModule.getStats();
    if (stats.totalConnections !== 0) {
      throw new Error('Should have no connections initially');
    }
  });
  
  // Test Auth Service
  test('Auth Service - Token Verification', () => {
    const result = AuthService.verifyAccessToken('invalid.token.here');
    if (result.valid) {
      throw new Error('Invalid token should not be valid');
    }
  });
  
  // Test Application Module
  test('Application Module - Initialization', async () => {
    await Application.initialize({
      database: { maxConnections: 3 }
    });
    
    const status = Application.getStatus();
    if (!status.isInitialized) {
      throw new Error('Application should be initialized');
    }
    
    await Application.shutdown();
  });
  
  console.log(`\n📊 Module Test Results: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

/**
 * 🚀 EXPORT MODULES
 */
module.exports = {
  // Individual modules
  DatabaseModule,
  AuthService,
  Application,
  
  // Factory function for creating custom modules
  createModule: function(name, factory) {
    return (function() {
      const module = factory();
      
      // Add module metadata
      module._metadata = {
        name,
        version: '1.0.0',
        createdAt: new Date()
      };
      
      // Ensure standard interface
      if (!module.initialize) {
        module.initialize = async () => {
          console.log(`Module ${name} initialized`);
          return module;
        };
      }
      
      if (!module.shutdown) {
        module.shutdown = async () => {
          console.log(`Module ${name} shutdown`);
          return module;
        };
      }
      
      return module;
    })();
  },
  
  // Module composition utility
  composeModules: function(...modules) {
    const combined = {};
    
    modules.forEach(module => {
      Object.keys(module).forEach(key => {
        if (key.startsWith('_')) return; // Skip private methods
        
        if (combined[key]) {
          console.warn(`Warning: Method ${key} already exists, skipping`);
          return;
        }
        
        combined[key] = module[key];
      });
    });
    
    return combined;
  },
  
  // Testing
  testModules
};

// Run tests if executed directly
if (require.main === module) {
  module.exports.testModules();
  
  console.log('\n🚀 Module Pattern Demo:\n');
  
  // Create a custom module
  const LoggerModule = module.exports.createModule('Logger', () => {
    const logs = [];
    
    return {
      log(level, message) {
        const entry = {
          timestamp: new Date(),
          level,
          message
        };
        logs.push(entry);
        console[level](`[${level.toUpperCase()}] ${message}`);
      },
      
      getLogs() {
        return [...logs];
      }
    };
  });
  
  console.log('Custom Logger Module created:', LoggerModule._metadata);
}
