
/**
 * 📦 Production-Ready Function Declarations
 * 
 * This module demonstrates professional function declaration patterns
 * with error handling, validation, and performance considerations.
 */

'use strict';

/**
 * 🎯 Utility Functions
 */

/**
 * Validates if input is a positive number
 * @param {number} value - Value to validate
 * @returns {boolean} - True if valid positive number
 */
function isValidNumber(value) {
  return typeof value === 'number' && 
         !isNaN(value) && 
         isFinite(value) && 
         value >= 0;
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email);
}

/**
 * 🏗️ Main Business Logic Functions
 */

/**
 * Calculates total price with tax and discount
 * @param {number} basePrice - Base price before tax
 * @param {number} taxRate - Tax rate (0-1)
 * @param {number} discount - Discount percentage (0-100)
 * @returns {number} - Final price
 * @throws {Error} - Invalid input
 */
function calculateTotalPrice(basePrice, taxRate = 0.1, discount = 0) {
  // Input validation
  if (!isValidNumber(basePrice)) {
    throw new TypeError('Base price must be a valid positive number');
  }
  
  if (!isValidNumber(taxRate) || taxRate < 0 || taxRate > 1) {
    throw new RangeError('Tax rate must be between 0 and 1');
  }
  
  if (!isValidNumber(discount) || discount < 0 || discount > 100) {
    throw new RangeError('Discount must be between 0 and 100');
  }
  
  // Calculation with precision
  const discountAmount = basePrice * (discount / 100);
  const priceAfterDiscount = basePrice - discountAmount;
  const taxAmount = priceAfterDiscount * taxRate;
  const total = priceAfterDiscount + taxAmount;
  
  // Round to 2 decimal places for currency
  return Math.round(total * 100) / 100;
}

/**
 * Formats user profile information
 * @param {Object} user - User object
 * @param {string} user.name - User's full name
 * @param {string} user.email - User's email
 * @param {number} [user.age] - User's age (optional)
 * @returns {string} - Formatted profile string
 */
function formatUserProfile(user) {
  if (!user || typeof user !== 'object') {
    throw new TypeError('User must be an object');
  }
  
  if (!user.name || !user.email) {
    throw new Error('User object must contain name and email');
  }
  
  if (!isValidEmail(user.email)) {
    throw new Error('Invalid email format');
  }
  
  const { name, email, age } = user;
  const ageInfo = age && isValidNumber(age) ? `, Age: ${age}` : '';
  
  return `${name} <${email}>${ageInfo}`;
}

/**
 * 🎭 Function Composition
 */

/**
 * Creates a user greeting function with customization
 * @param {string} greetingType - Type of greeting ('formal', 'casual', 'friendly')
 * @returns {Function} - Greeting function
 */
function createGreeter(greetingType = 'formal') {
  const greetings = {
    formal: (name) => `Dear ${name},`,
    casual: (name) => `Hello ${name},`,
    friendly: (name) => `Hey ${name}!`,
  };
  
  return function(name) {
    if (!name || typeof name !== 'string') {
      throw new TypeError('Name must be a non-empty string');
    }
    
    const greeting = greetings[greetingType] || greetings.formal;
    return greeting(name.trim());
  };
}

/**
 * 🔒 Private Function Pattern (using closure)
 */

const userManager = (function() {
  // Private state
  let users = [];
  let nextId = 1;
  
  // Private validation
  function validateUser(user) {
    if (!user || typeof user !== 'object') {
      throw new TypeError('User must be an object');
    }
    
    const { name, email } = user;
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('User must have a valid name');
    }
    
    if (!email || !isValidEmail(email)) {
      throw new Error('User must have a valid email');
    }
    
    return true;
  }
  
  // Public API
  return {
    /**
     * Add a new user
     * @param {Object} userData - User information
     * @returns {Object} - Created user with ID
     */
    addUser(userData) {
      validateUser(userData);
      
      const user = {
        id: nextId++,
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      users.push(user);
      return { ...user };
    },
    
    /**
     * Get all users
     * @returns {Array} - Copy of users array
     */
    getUsers() {
      return users.map(user => ({ ...user }));
    },
    
    /**
     * Find user by ID
     * @param {number} id - User ID
     * @returns {Object|null} - User or null
     */
    getUserById(id) {
      const user = users.find(u => u.id === id);
      return user ? { ...user } : null;
    },
    
    /**
     * Update user
     * @param {number} id - User ID
     * @param {Object} updates - Fields to update
     * @returns {Object|null} - Updated user or null
     */
    updateUser(id, updates) {
      const index = users.findIndex(u => u.id === id);
      
      if (index === -1) return null;
      
      // Validate updates if email is being changed
      if (updates.email && !isValidEmail(updates.email)) {
        throw new Error('Invalid email format');
      }
      
      users[index] = {
        ...users[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      return { ...users[index] };
    },
    
    /**
     * Get user count
     * @returns {number} - Number of users
     */
    getUserCount() {
      return users.length;
    }
  };
})();

/**
 * 🧪 Test Suite (would be in separate test file in production)
 */

function runTests() {
  console.log('🧪 Running Function Declarations Tests...\n');
  
  try {
    // Test calculateTotalPrice
    console.log('✅ Test 1: calculateTotalPrice');
    const total = calculateTotalPrice(100, 0.1, 20);
    console.log(`   Result: $${total} (Expected: $88.00)`);
    
    // Test formatUserProfile
    console.log('\n✅ Test 2: formatUserProfile');
    const profile = formatUserProfile({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });
    console.log(`   Result: ${profile}`);
    
    // Test createGreeter
    console.log('\n✅ Test 3: createGreeter');
    const casualGreeter = createGreeter('casual');
    console.log(`   Result: ${casalGreeter('John')}`);
    
    // Test userManager
    console.log('\n✅ Test 4: userManager');
    userManager.addUser({
      name: 'Alice Smith',
      email: 'alice@example.com'
    });
    console.log(`   User count: ${userManager.getUserCount()}`);
    
  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
  }
}

/**
 * 🚀 Export Public API
 */
module.exports = {
  calculateTotalPrice,
  formatUserProfile,
  createGreeter,
  userManager,
  isValidNumber,
  isValidEmail,
  
  // Only for testing
  _test: process.env.NODE_ENV === 'test' ? runTests : undefined
};

// Run tests if executed directly
if (require.main === module) {
  runTests();
}
