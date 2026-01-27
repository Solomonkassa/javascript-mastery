/**
 * 🧮 Advanced Calculator with Function Composition
 * 
 * Production-ready calculator demonstrating advanced JavaScript patterns:
 * - Function composition and currying
 * - Immutable operations
 * - Error handling and validation
 * - History tracking and undo/redo
 * - Unit conversion
 * - Plugin system
 */

'use strict';

/**
 * 🎯 CORE CALCULATOR ENGINE
 */

/**
 * Create an advanced calculator with plugin support
 * @param {Object} options - Calculator options
 * @returns {Object} Calculator instance
 */
function createAdvancedCalculator(options = {}) {
  const config = {
    precision: 12,
    angleUnit: 'degrees', // 'degrees', 'radians'
    memorySlots: 10,
    historySize: 100,
    ...options
  };
  
  // Private state
  let currentValue = 0;
  let memory = new Array(config.memorySlots).fill(0);
  let history = [];
  let redoStack = [];
  let expression = '';
  
  // Constants
  const CONSTANTS = {
    PI: Math.PI,
    E: Math.E,
    PHI: 1.618033988749895,
    SQRT2: Math.SQRT2,
    INFINITY: Infinity
  };
  
  /**
   * 🎯 VALIDATION UTILITIES
   */
  
  function validateNumber(value, operation = '') {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError(`${operation}: Invalid number`);
    }
    return value;
  }
  
  function validateIndex(index, operation = '') {
    if (index < 0 || index >= config.memorySlots) {
      throw new RangeError(`${operation}: Memory index out of bounds`);
    }
    return index;
  }
  
  /**
   * 🔢 BASIC OPERATIONS (Pure Functions)
   */
  
  const Operations = {
    add: (a, b) => validateNumber(a) + validateNumber(b),
    subtract: (a, b) => validateNumber(a) - validateNumber(b),
    multiply: (a, b) => validateNumber(a) * validateNumber(b),
    divide: (a, b) => {
      validateNumber(b);
      if (b === 0) throw new Error('Division by zero');
      return validateNumber(a) / b;
    },
    power: (base, exponent) => Math.pow(validateNumber(base), validateNumber(exponent)),
    root: (value, degree) => {
      validateNumber(degree);
      if (degree === 0) throw new Error('Root degree cannot be zero');
      return Math.pow(validateNumber(value), 1 / degree);
    },
    percentage: (value, percent) => validateNumber(value) * (validateNumber(percent) / 100),
    modulo: (a, b) => {
      validateNumber(b);
      if (b === 0) throw new Error('Modulo by zero');
      return validateNumber(a) % b;
    }
  };
  
  /**
   * 📐 SCIENTIFIC OPERATIONS
   */
  
  const Scientific = {
    // Trigonometric functions with angle unit conversion
    sin: (angle) => {
      const rad = config.angleUnit === 'degrees' ? 
        validateNumber(angle) * (Math.PI / 180) : 
        validateNumber(angle);
      return Math.sin(rad);
    },
    cos: (angle) => {
      const rad = config.angleUnit === 'degrees' ? 
        validateNumber(angle) * (Math.PI / 180) : 
        validateNumber(angle);
      return Math.cos(rad);
    },
    tan: (angle) => {
      const rad = config.angleUnit === 'degrees' ? 
        validateNumber(angle) * (Math.PI / 180) : 
        validateNumber(angle);
      const result = Math.tan(rad);
      if (!isFinite(result)) throw new Error('Tangent undefined for angle');
      return result;
    },
    
    // Inverse trigonometric
    asin: (value) => {
      validateNumber(value);
      if (value < -1 || value > 1) throw new Error('Arcsin argument out of range');
      const result = Math.asin(value);
      return config.angleUnit === 'degrees' ? result * (180 / Math.PI) : result;
    },
    acos: (value) => {
      validateNumber(value);
      if (value < -1 || value > 1) throw new Error('Arccos argument out of range');
      const result = Math.acos(value);
      return config.angleUnit === 'degrees' ? result * (180 / Math.PI) : result;
    },
    atan: (value) => {
      const result = Math.atan(validateNumber(value));
      return config.angleUnit === 'degrees' ? result * (180 / Math.PI) : result;
    },
    
    // Logarithmic functions
    log: (value, base = 10) => {
      validateNumber(value);
      validateNumber(base);
      if (value <= 0) throw new Error('Logarithm argument must be positive');
      if (base <= 0 || base === 1) throw new Error('Logarithm base must be positive and not 1');
      return Math.log(value) / Math.log(base);
    },
    ln: (value) => {
      validateNumber(value);
      if (value <= 0) throw new Error('Natural log argument must be positive');
      return Math.log(value);
    },
    
    // Other scientific functions
    sqrt: (value) => {
      validateNumber(value);
      if (value < 0) throw new Error('Square root of negative number');
      return Math.sqrt(value);
    },
    factorial: (n) => {
      validateNumber(n);
      if (n < 0 || !Number.isInteger(n)) {
        throw new Error('Factorial requires non-negative integer');
      }
      if (n === 0 || n === 1) return 1;
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    },
    absolute: (value) => Math.abs(validateNumber(value)),
    floor: (value) => Math.floor(validateNumber(value)),
    ceil: (value) => Math.ceil(validateNumber(value)),
    round: (value, decimals = 0) => {
      const factor = Math.pow(10, decimals);
      return Math.round(validateNumber(value) * factor) / factor;
    }
  };
  
  /**
   * 📊 STATISTICAL OPERATIONS
   */
  
  const Statistics = {
    mean: (values) => {
      if (!Array.isArray(values) || values.length === 0) {
        throw new Error('Mean requires non-empty array');
      }
      return values.reduce((sum, val) => sum + validateNumber(val), 0) / values.length;
    },
    median: (values) => {
      if (!Array.isArray(values) || values.length === 0) {
        throw new Error('Median requires non-empty array');
      }
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 === 0 ? 
        (sorted[mid - 1] + sorted[mid]) / 2 : 
        sorted[mid];
    },
    mode: (values) => {
      if (!Array.isArray(values) || values.length === 0) {
        throw new Error('Mode requires non-empty array');
      }
      const frequency = new Map();
      values.forEach(val => {
        frequency.set(val, (frequency.get(val) || 0) + 1);
      });
      
      let maxFreq = 0;
      let modes = [];
      
      frequency.forEach((freq, val) => {
        if (freq > maxFreq) {
          maxFreq = freq;
          modes = [val];
        } else if (freq === maxFreq) {
          modes.push(val);
        }
      });
      
      return modes.length === values.length ? null : modes;
    },
    standardDeviation: (values, isSample = false) => {
      if (!Array.isArray(values) || values.length < 2) {
        throw new Error('Standard deviation requires at least 2 values');
      }
      const mean = Statistics.mean(values);
      const variance = values.reduce((sum, val) => {
        const diff = val - mean;
        return sum + diff * diff;
      }, 0) / (values.length - (isSample ? 1 : 0));
      
      return Math.sqrt(variance);
    },
    min: (values) => {
      if (!Array.isArray(values) || values.length === 0) {
        throw new Error('Min requires non-empty array');
      }
      return Math.min(...values.map(validateNumber));
    },
    max: (values) => {
      if (!Array.isArray(values) || values.length === 0) {
        throw new Error('Max requires non-empty array');
      }
      return Math.max(...values.map(validateNumber));
    },
    sum: (values) => {
      if (!Array.isArray(values)) {
        throw new Error('Sum requires array');
      }
      return values.reduce((sum, val) => sum + validateNumber(val), 0);
    },
    product: (values) => {
      if (!Array.isArray(values)) {
        throw new Error('Product requires array');
      }
      return values.reduce((prod, val) => prod * validateNumber(val), 1);
    }
  };
  
  /**
   * 🔄 HISTORY MANAGEMENT
   */
  
  function recordHistory(operation, args, result, previousValue) {
    const entry = {
      timestamp: new Date().toISOString(),
      operation,
      args: [...args],
      previousValue,
      result,
      expression: buildExpression(operation, args)
    };
    
    history.unshift(entry);
    redoStack.length = 0; // Clear redo stack on new operation
    
    // Limit history size
    if (history.length > config.historySize) {
      history.pop();
    }
    
    return entry;
  }
  
  function buildExpression(operation, args) {
    const argStr = args.map(arg => 
      Array.isArray(arg) ? `[${arg.join(', ')}]` : arg
    ).join(', ');
    
    return `${operation}(${argStr})`;
  }
  
  /**
   * 🎯 CALCULATOR OPERATIONS WITH HISTORY
   */
  
  function executeOperation(operation, ...args) {
    const previousValue = currentValue;
    let result;
    
    try {
      // Execute the operation
      if (operation in Operations) {
        result = Operations[operation](currentValue, ...args);
      } else if (operation in Scientific) {
        result = Scientific[operation](currentValue, ...args);
      } else if (operation in Statistics && Array.isArray(args[0])) {
        result = Statistics[operation](args[0], ...args.slice(1));
      } else if (operation === 'constant') {
        result = CONSTANTS[args[0]] || 0;
      } else {
        throw new Error(`Unknown operation: ${operation}`);
      }
      
      // Record history
      const historyEntry = recordHistory(operation, args, result, previousValue);
      
      // Update current value
      currentValue = formatNumber(result);
      
      // Update expression
      expression = historyEntry.expression;
      
      return {
        success: true,
        value: currentValue,
        previousValue,
        history: historyEntry
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        value: currentValue,
        previousValue
      };
    }
  }
  
  /**
   * 🛠️ UTILITY FUNCTIONS
   */
  
  function formatNumber(value) {
    if (!isFinite(value)) return value;
    
    // Handle very small numbers
    if (Math.abs(value) < 1e-10 && value !== 0) {
      return parseFloat(value.toExponential(config.precision));
    }
    
    // Format with precision
    const formatted = parseFloat(value.toPrecision(config.precision));
    
    // Remove unnecessary trailing zeros
    const str = formatted.toString();
    if (str.includes('.')) {
      return parseFloat(str.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, ''));
    }
    
    return formatted;
  }
  
  function clear() {
    const previousValue = currentValue;
    currentValue = 0;
    expression = '';
    redoStack.length = 0;
    
    recordHistory('clear', [], 0, previousValue);
    
    return currentValue;
  }
  
  function undo() {
    if (history.length === 0) return currentValue;
    
    const lastOperation = history.shift();
    redoStack.unshift(lastOperation);
    currentValue = lastOperation.previousValue;
    
    if (history.length > 0) {
      expression = history[0].expression;
    } else {
      expression = '';
    }
    
    return currentValue;
  }
  
  function redo() {
    if (redoStack.length === 0) return currentValue;
    
    const nextOperation = redoStack.shift();
    history.unshift(nextOperation);
    currentValue = nextOperation.result;
    expression = nextOperation.expression;
    
    return currentValue;
  }
  
  /**
   * 💾 MEMORY OPERATIONS
   */
  
  function memoryStore(index = 0) {
    validateIndex(index, 'memoryStore');
    memory[index] = currentValue;
    return currentValue;
  }
  
  function memoryRecall(index = 0) {
    validateIndex(index, 'memoryRecall');
    return memory[index];
  }
  
  function memoryAdd(index = 0) {
    validateIndex(index, 'memoryAdd');
    memory[index] += currentValue;
    return memory[index];
  }
  
  function memorySubtract(index = 0) {
    validateIndex(index, 'memorySubtract');
    memory[index] -= currentValue;
    return memory[index];
  }
  
  function memoryClear(index = null) {
    if (index === null) {
      memory.fill(0);
    } else {
      validateIndex(index, 'memoryClear');
      memory[index] = 0;
    }
    return memory.slice();
  }
  
  /**
   * 🧩 PLUGIN SYSTEM
   */
  
  const plugins = new Map();
  
  function registerPlugin(name, plugin) {
    if (typeof plugin !== 'object' || plugin === null) {
      throw new TypeError('Plugin must be an object');
    }
    
    if (typeof plugin.install !== 'function') {
      throw new TypeError('Plugin must have an install method');
    }
    
    plugins.set(name, plugin);
    plugin.install(calculator);
    
    return true;
  }
  
  function getPlugin(name) {
    return plugins.get(name);
  }
  
  /**
   * 📊 PUBLIC CALCULATOR API
   */
  
  const calculator = {
    // Core operations
    add: (value) => executeOperation('add', value),
    subtract: (value) => executeOperation('subtract', value),
    multiply: (value) => executeOperation('multiply', value),
    divide: (value) => executeOperation('divide', value),
    power: (exponent) => executeOperation('power', exponent),
    root: (degree) => executeOperation('root', degree),
    percentage: (percent) => executeOperation('percentage', percent),
    modulo: (value) => executeOperation('modulo', value),
    
    // Scientific operations
    sin: () => executeOperation('sin'),
    cos: () => executeOperation('cos'),
    tan: () => executeOperation('tan'),
    asin: () => executeOperation('asin', currentValue),
    acos: () => executeOperation('acos', currentValue),
    atan: () => executeOperation('atan', currentValue),
    log: (base) => executeOperation('log', base),
    ln: () => executeOperation('ln'),
    sqrt: () => executeOperation('sqrt'),
    factorial: () => executeOperation('factorial'),
    absolute: () => executeOperation('absolute'),
    floor: () => executeOperation('floor'),
    ceil: () => executeOperation('ceil'),
    round: (decimals) => executeOperation('round', decimals),
    
    // Statistical operations
    mean: (values) => executeOperation('mean', values),
    median: (values) => executeOperation('median', values),
    mode: (values) => executeOperation('mode', values),
    standardDeviation: (values, isSample) => 
      executeOperation('standardDeviation', values, isSample),
    min: (values) => executeOperation('min', values),
    max: (values) => executeOperation('max', values),
    sum: (values) => executeOperation('sum', values),
    product: (values) => executeOperation('product', values),
    
    // Constants
    pi: () => executeOperation('constant', 'PI'),
    e: () => executeOperation('constant', 'E'),
    phi: () => executeOperation('constant', 'PHI'),
    sqrt2: () => executeOperation('constant', 'SQRT2'),
    infinity: () => executeOperation('constant', 'INFINITY'),
    
    // Memory operations
    memory: {
      store: memoryStore,
      recall: memoryRecall,
      add: memoryAdd,
      subtract: memorySubtract,
      clear: memoryClear,
      getAll: () => memory.slice()
    },
    
    // History operations
    history: {
      get: () => history.slice(),
      clear: () => { history.length = 0; return true; },
      getLast: () => history[0] || null,
      getCount: () => history.length
    },
    
    // Undo/Redo
    undo,
    redo,
    
    // Utility
    clear,
    getValue: () => currentValue,
    setValue: (value) => {
      const previousValue = currentValue;
      currentValue = formatNumber(validateNumber(value, 'setValue'));
      recordHistory('setValue', [value], currentValue, previousValue);
      return currentValue;
    },
    
    // Configuration
    config: {
      get: () => ({ ...config }),
      set: (newConfig) => {
        Object.assign(config, newConfig);
        return { ...config };
      },
      getPrecision: () => config.precision,
      setPrecision: (precision) => {
        config.precision = Math.max(1, Math.min(20, precision));
        return config.precision;
      },
      getAngleUnit: () => config.angleUnit,
      setAngleUnit: (unit) => {
        if (!['degrees', 'radians'].includes(unit)) {
          throw new Error('Angle unit must be "degrees" or "radians"');
        }
        config.angleUnit = unit;
        return config.angleUnit;
      }
    },
    
    // Expression
    getExpression: () => expression,
    evaluateExpression: (expr) => {
      // Simple expression evaluator (in production, use a proper parser)
      try {
        // Remove safe eval - in production use math.js or similar
        const result = Function(`"use strict"; return (${expr})`)();
        return executeOperation('setValue', result);
      } catch (error) {
        return {
          success: false,
          error: `Expression evaluation failed: ${error.message}`,
          value: currentValue
        };
      }
    },
    
    // Plugin system
    registerPlugin,
    getPlugin,
    getPlugins: () => Array.from(plugins.keys()),
    
    // Status
    getStatus: () => ({
      value: currentValue,
      expression,
      config: { ...config },
      historyCount: history.length,
      redoCount: redoStack.length,
      memoryUsed: memory.filter(v => v !== 0).length,
      pluginCount: plugins.size
    })
  };
  
  return calculator;
}

/**
 * 🧩 EXAMPLE PLUGINS
 */

/**
 * Unit Conversion Plugin
 */
const UnitConversionPlugin = {
  name: 'UnitConversion',
  version: '1.0.0',
  
  install(calculator) {
    const conversions = {
      // Length
      metersToFeet: (meters) => meters * 3.28084,
      feetToMeters: (feet) => feet / 3.28084,
      kilometersToMiles: (km) => km * 0.621371,
      milesToKilometers: (miles) => miles / 0.621371,
      
      // Weight
      kilogramsToPounds: (kg) => kg * 2.20462,
      poundsToKilograms: (lbs) => lbs / 2.20462,
      
      // Temperature
      celsiusToFahrenheit: (c) => (c * 9/5) + 32,
      fahrenheitToCelsius: (f) => (f - 32) * 5/9,
      celsiusToKelvin: (c) => c + 273.15,
      kelvinToCelsius: (k) => k - 273.15,
      
      // Area
      squareMetersToSquareFeet: (m2) => m2 * 10.7639,
      squareFeetToSquareMeters: (ft2) => ft2 / 10.7639,
      
      // Volume
      litersToGallons: (liters) => liters * 0.264172,
      gallonsToLiters: (gallons) => gallons / 0.264172
    };
    
    calculator.convert = function(conversion, value = this.getValue()) {
      if (!(conversion in conversions)) {
        throw new Error(`Unknown conversion: ${conversion}`);
      }
      
      const result = conversions[conversion](value);
      return this.setValue(result);
    };
    
    calculator.getConversions = () => Object.keys(conversions);
  }
};

/**
 * Financial Calculator Plugin
 */
const FinancialPlugin = {
  name: 'Financial',
  version: '1.0.0',
  
  install(calculator) {
    calculator.financial = {
      // Compound interest: A = P(1 + r/n)^(nt)
      compoundInterest: function(principal, rate, time, compoundsPerYear = 1) {
        const rateDecimal = rate / 100;
        const amount = principal * Math.pow(1 + rateDecimal/compoundsPerYear, compoundsPerYear * time);
        return calculator.setValue(amount);
      },
      
      // Future value: FV = PV(1 + r)^n
      futureValue: function(presentValue, rate, periods) {
        const rateDecimal = rate / 100;
        const future = presentValue * Math.pow(1 + rateDecimal, periods);
        return calculator.setValue(future);
      },
      
      // Present value: PV = FV/(1 + r)^n
      presentValue: function(futureValue, rate, periods) {
        const rateDecimal = rate / 100;
        const present = futureValue / Math.pow(1 + rateDecimal, periods);
        return calculator.setValue(present);
      },
      
      // Loan payment: PMT = P[r(1+r)^n]/[(1+r)^n-1]
      loanPayment: function(principal, annualRate, years) {
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;
        const payment = principal * 
          (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
          (Math.pow(1 + monthlyRate, months) - 1);
        return calculator.setValue(payment);
      },
      
      // Return on Investment: ROI = (gain - cost) / cost * 100
      roi: function(investment, gain) {
        const roiPercent = ((gain - investment) / investment) * 100;
        return calculator.setValue(roiPercent);
      }
    };
  }
};

/**
 * 🧪 TESTING AND DEMONSTRATION
 */

function runCalculatorDemo() {
  console.log('🧮 Advanced Calculator Demo\n');
  
  // Create calculator instance
  const calc = createAdvancedCalculator({
    precision: 10,
    angleUnit: 'degrees',
    memorySlots: 5,
    historySize: 50
  });
  
  // Register plugins
  calc.registerPlugin('unitConversion', UnitConversionPlugin);
  calc.registerPlugin('financial', FinancialPlugin);
  
  console.log('✅ Calculator initialized');
  console.log('📊 Status:', calc.getStatus());
  console.log('');
  
  // Demo basic operations
  console.log('=== Basic Operations ===');
  calc.setValue(100);
  console.log('Set value:', calc.getValue());
  
  calc.add(50);
  console.log('Add 50:', calc.getValue());
  
  calc.multiply(2);
  console.log('Multiply by 2:', calc.getValue());
  
  calc.divide(3);
  console.log('Divide by 3:', calc.getValue());
  
  // Demo scientific operations
  console.log('\n=== Scientific Operations ===');
  calc.setValue(45);
  console.log('sin(45°):', calc.sin().value);
  
  calc.setValue(2);
  console.log('log₁₀(2):', calc.log(10).value);
  
  calc.setValue(5);
  console.log('5! =', calc.factorial().value);
  
  // Demo statistics
  console.log('\n=== Statistics ===');
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log('Data:', data);
  console.log('Mean:', calc.mean(data).value);
  console.log('Median:', calc.median(data).value);
  console.log('Standard Deviation:', calc.standardDeviation(data).value);
  
  // Demo unit conversion plugin
  console.log('\n=== Unit Conversion ===');
  calc.setValue(100);
  calc.convert('kilometersToMiles');
  console.log('100 km =', calc.getValue(), 'miles');
  
  calc.setValue(32);
  calc.convert('fahrenheitToCelsius');
  console.log('32°F =', calc.getValue(), '°C');
  
  // Demo financial plugin
  console.log('\n=== Financial Calculations ===');
  console.log('Loan payment ($200,000, 5%, 30 years):', 
    calc.financial.loanPayment(200000, 5, 30).value.toFixed(2));
  
  // Demo history
  console.log('\n=== History ===');
  const lastOp = calc.history.getLast();
  if (lastOp) {
    console.log('Last operation:', lastOp.operation);
    console.log('Expression:', lastOp.expression);
    console.log('Result:', lastOp.result);
  }
  
  console.log('Total operations:', calc.history.getCount());
  
  // Demo undo/redo
  console.log('\n=== Undo/Redo ===');
  const beforeUndo = calc.getValue();
  calc.undo();
  console.log('After undo:', calc.getValue());
  
  calc.redo();
  console.log('After redo:', calc.getValue());
  
  // Final status
  console.log('\n=== Final Status ===');
  console.log(calc.getStatus());
}

/**
 * 🚀 EXPORT MODULES
 */
module.exports = {
  createAdvancedCalculator,
  UnitConversionPlugin,
  FinancialPlugin,
  runCalculatorDemo
};

// Run demo if executed directly
if (require.main === module) {
  runCalculatorDemo();
}
