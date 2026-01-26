/**
 * Temperature Converter Professional Edition
 * A comprehensive temperature conversion utility with CLI and API interfaces
 * Supports Celsius, Fahrenheit, Kelvin, Rankine, Delisle, Newton, Réaumur, and Rømer scales
 */

class TemperatureConverter {
    constructor() {
        this.version = '2.0.0';
        this.author = 'Professional Systems';
        this.scales = {
            celsius: { symbol: '°C', name: 'Celsius' },
            fahrenheit: { symbol: '°F', name: 'Fahrenheit' },
            kelvin: { symbol: 'K', name: 'Kelvin' },
            rankine: { symbol: '°R', name: 'Rankine' },
            delisle: { symbol: '°De', name: 'Delisle' },
            newton: { symbol: '°N', name: 'Newton' },
            reaumur: { symbol: '°Ré', name: 'Réaumur' },
            romer: { symbol: '°Rø', name: 'Rømer' }
        };

        this.referencePoints = {
            absoluteZero: { celsius: -273.15, description: 'Absolute zero' },
            waterFreezes: { celsius: 0, description: 'Water freezing point' },
            waterBoils: { celsius: 100, description: 'Water boiling point' },
            humanBody: { celsius: 37, description: 'Human body temperature' },
            roomTemp: { celsius: 20, description: 'Room temperature' }
        };

        this.precision = 2;
        this.history = [];
        this.maxHistoryEntries = 100;
    }

    /**
     * Convert temperature between different scales
     * @param {number} value - Temperature value
     * @param {string} fromScale - Source temperature scale
     * @param {string} toScale - Target temperature scale
     * @returns {Object} Conversion result with metadata
     */
    convert(value, fromScale, toScale) {
        const startTime = performance.now();
        
        // Validate inputs
        const validation = this.validateInput(value, fromScale, toScale);
        if (!validation.valid) {
            return {
                success: false,
                error: validation.error,
                timestamp: new Date().toISOString()
            };
        }

        // Handle same scale conversion
        if (fromScale.toLowerCase() === toScale.toLowerCase()) {
            return {
                success: true,
                originalValue: value,
                convertedValue: value,
                fromScale: fromScale,
                toScale: toScale,
                scaleSymbol: this.scales[fromScale.toLowerCase()]?.symbol || '',
                precision: this.precision,
                timestamp: new Date().toISOString(),
                processingTime: 0
            };
        }

        // Convert to Celsius first as intermediate scale
        const celsiusValue = this.toCelsius(value, fromScale);
        
        // Convert from Celsius to target scale
        const convertedValue = this.fromCelsius(celsiusValue, toScale);
        
        // Round to specified precision
        const roundedValue = this.roundToPrecision(convertedValue, this.precision);
        
        const processingTime = performance.now() - startTime;
        
        // Create conversion record
        const conversionRecord = {
            success: true,
            originalValue: value,
            convertedValue: roundedValue,
            fromScale: fromScale,
            toScale: toScale,
            scaleSymbol: this.scales[toScale.toLowerCase()]?.symbol || '',
            celsiusEquivalent: this.roundToPrecision(celsiusValue, this.precision),
            precision: this.precision,
            timestamp: new Date().toISOString(),
            processingTime: processingTime.toFixed(4)
        };

        // Add to history
        this.addToHistory(conversionRecord);

        return conversionRecord;
    }

    /**
     * Convert any scale to Celsius
     * @private
     */
    toCelsius(value, scale) {
        const scaleLower = scale.toLowerCase();
        
        switch(scaleLower) {
            case 'celsius': return value;
            case 'fahrenheit': return (value - 32) * 5/9;
            case 'kelvin': return value - 273.15;
            case 'rankine': return (value - 491.67) * 5/9;
            case 'delisle': return 100 - value * 2/3;
            case 'newton': return value * 100/33;
            case 'reaumur': return value * 5/4;
            case 'romer': return (value - 7.5) * 40/21;
            default: return value;
        }
    }

    /**
     * Convert from Celsius to any scale
     * @private
     */
    fromCelsius(value, scale) {
        const scaleLower = scale.toLowerCase();
        
        switch(scaleLower) {
            case 'celsius': return value;
            case 'fahrenheit': return (value * 9/5) + 32;
            case 'kelvin': return value + 273.15;
            case 'rankine': return (value + 273.15) * 9/5;
            case 'delisle': return (100 - value) * 3/2;
            case 'newton': return value * 33/100;
            case 'reaumur': return value * 4/5;
            case 'romer': return (value * 21/40) + 7.5;
            default: return value;
        }
    }

    /**
     * Validate input parameters
     * @private
     */
    validateInput(value, fromScale, toScale) {
        if (typeof value !== 'number' || isNaN(value)) {
            return { valid: false, error: 'Invalid temperature value. Must be a number.' };
        }

        if (typeof fromScale !== 'string' || typeof toScale !== 'string') {
            return { valid: false, error: 'Scale names must be strings.' };
        }

        const validScales = Object.keys(this.scales);
        const fromScaleLower = fromScale.toLowerCase();
        const toScaleLower = toScale.toLowerCase();

        if (!validScales.includes(fromScaleLower)) {
            return { 
                valid: false, 
                error: `Invalid source scale: ${fromScale}. Valid scales: ${validScales.join(', ')}` 
            };
        }

        if (!validScales.includes(toScaleLower)) {
            return { 
                valid: false, 
                error: `Invalid target scale: ${toScale}. Valid scales: ${validScales.join(', ')}` 
            };
        }

        // Check for absolute zero violation
        const celsiusValue = this.toCelsius(value, fromScaleLower);
        if (celsiusValue < this.referencePoints.absoluteZero.celsius) {
            return { 
                valid: false, 
                error: `Temperature below absolute zero (${this.referencePoints.absoluteZero.celsius}°C)` 
            };
        }

        return { valid: true };
    }

    /**
     * Round number to specified precision
     * @private
     */
    roundToPrecision(value, precision) {
        const factor = Math.pow(10, precision);
        return Math.round(value * factor) / factor;
    }

    /**
     * Add conversion to history
     * @private
     */
    addToHistory(record) {
        this.history.unshift(record);
        if (this.history.length > this.maxHistoryEntries) {
            this.history = this.history.slice(0, this.maxHistoryEntries);
        }
    }

    /**
     * Convert to all available scales
     * @param {number} value - Temperature value
     * @param {string} fromScale - Source temperature scale
     * @returns {Object} All conversions
     */
    convertToAll(value, fromScale) {
        const conversions = {};
        const scales = Object.keys(this.scales);
        
        for (const scale of scales) {
            if (scale !== fromScale.toLowerCase()) {
                const result = this.convert(value, fromScale, scale);
                if (result.success) {
                    conversions[scale] = {
                        value: result.convertedValue,
                        symbol: this.scales[scale].symbol,
                        name: this.scales[scale].name
                    };
                }
            }
        }

        return {
            originalValue: value,
            originalScale: fromScale,
            conversions: conversions,
            timestamp: new Date().toISOString(),
            totalConversions: Object.keys(conversions).length
        };
    }

    /**
     * Get temperature interpretation
     * @param {number} value - Temperature value
     * @param {string} scale - Temperature scale
     * @returns {Object} Interpretation object
     */
    interpretTemperature(value, scale) {
        const celsiusValue = this.toCelsius(value, scale);
        
        let interpretation = '';
        let description = '';
        let category = '';
        
        if (celsiusValue < -50) {
            interpretation = 'Extreme Cold';
            description = 'Antarctic winter conditions. Potentially dangerous exposure risk.';
            category = 'dangerous';
        } else if (celsiusValue >= -50 && celsiusValue < -20) {
            interpretation = 'Severe Cold';
            description = 'Arctic conditions. Requires extreme cold weather gear.';
            category = 'severe';
        } else if (celsiusValue >= -20 && celsiusValue < 0) {
            interpretation = 'Freezing';
            description = 'Below freezing. Ice forms, winter conditions.';
            category = 'cold';
        } else if (celsiusValue >= 0 && celsiusValue < 10) {
            interpretation = 'Very Cold';
            description = 'Chilly. Warm clothing recommended.';
            category = 'cool';
        } else if (celsiusValue >= 10 && celsiusValue < 20) {
            interpretation = 'Cool';
            description = 'Moderate temperature. Comfortable with light jacket.';
            category = 'moderate';
        } else if (celsiusValue >= 20 && celsiusValue < 26) {
            interpretation = 'Comfortable';
            description = 'Room temperature. Ideal for most indoor activities.';
            category = 'comfortable';
        } else if (celsiusValue >= 26 && celsiusValue < 32) {
            interpretation = 'Warm';
            description = 'Pleasantly warm. Summer day conditions.';
            category = 'warm';
        } else if (celsiusValue >= 32 && celsiusValue < 38) {
            interpretation = 'Hot';
            description = 'Heat advisory possible. Stay hydrated.';
            category = 'hot';
        } else if (celsiusValue >= 38 && celsiusValue < 45) {
            interpretation = 'Very Hot';
            description = 'Heat wave conditions. Limit outdoor activities.';
            category = 'severe';
        } else {
            interpretation = 'Extreme Heat';
            description = 'Dangerously hot. Heat stroke risk.';
            category = 'dangerous';
        }

        return {
            celsiusValue: this.roundToPrecision(celsiusValue, this.precision),
            interpretation: interpretation,
            description: description,
            category: category,
            relativeToReferences: this.compareToReferences(celsiusValue)
        };
    }

    /**
     * Compare temperature to reference points
     * @private
     */
    compareToReferences(celsiusValue) {
        const comparisons = [];
        
        for (const [key, ref] of Object.entries(this.referencePoints)) {
            const difference = celsiusValue - ref.celsius;
            comparisons.push({
                reference: ref.description,
                difference: this.roundToPrecision(difference, this.precision),
                unit: '°C'
            });
        }
        
        return comparisons;
    }

    /**
     * Set precision for conversions
     * @param {number} precision - Number of decimal places
     */
    setPrecision(precision) {
        if (precision >= 0 && precision <= 10) {
            this.precision = precision;
            return true;
        }
        return false;
    }

    /**
     * Get conversion history
     * @param {number} limit - Maximum number of entries to return
     * @returns {Array} Conversion history
     */
    getHistory(limit = 10) {
        return this.history.slice(0, limit);
    }

    /**
     * Clear conversion history
     */
    clearHistory() {
        this.history = [];
        return { cleared: true, timestamp: new Date().toISOString() };
    }

    /**
     * Get system information
     * @returns {Object} System information
     */
    getSystemInfo() {
        return {
            version: this.version,
            author: this.author,
            supportedScales: Object.keys(this.scales).length,
            precision: this.precision,
            historyEntries: this.history.length,
            maxHistoryEntries: this.maxHistoryEntries,
            referencePoints: Object.keys(this.referencePoints).length
        };
    }

    /**
     * Get detailed scale information
     * @param {string} scale - Scale name
     * @returns {Object} Scale information
     */
    getScaleInfo(scale) {
        const scaleLower = scale.toLowerCase();
        const scaleData = this.scales[scaleLower];
        
        if (!scaleData) {
            return null;
        }

        const info = {
            name: scaleData.name,
            symbol: scaleData.symbol,
            description: this.getScaleDescription(scaleLower),
            freezingPoint: this.roundToPrecision(this.fromCelsius(0, scaleLower), this.precision),
            boilingPoint: this.roundToPrecision(this.fromCelsius(100, scaleLower), this.precision),
            absoluteZero: this.roundToPrecision(this.fromCelsius(-273.15, scaleLower), this.precision)
        };

        return info;
    }

    /**
     * Get scale description
     * @private
     */
    getScaleDescription(scale) {
        const descriptions = {
            celsius: 'Developed by Anders Celsius in 1742. Based on water freezing (0°C) and boiling (100°C) points.',
            fahrenheit: 'Proposed by Daniel Gabriel Fahrenheit in 1724. Originally based on brine freezing point.',
            kelvin: 'Absolute thermodynamic scale. Named after William Thomson, 1st Baron Kelvin. Zero is absolute zero.',
            rankine: 'Absolute temperature scale using Fahrenheit degrees. Named after William John Macquorn Rankine.',
            delisle: 'Invented by Joseph-Nicolas Delisle. Scale decreases as temperature increases.',
            newton: 'Created by Isaac Newton. One of the earliest temperature scales.',
            reaumur: 'Developed by René Antoine Ferchault de Réaumur. Based on alcohol expansion.',
            romer: 'Created by Ole Rømer. One of the first calibrated thermometers.'
        };

        return descriptions[scale] || 'No description available.';
    }

    /**
     * Batch convert multiple temperatures
     * @param {Array} conversions - Array of conversion objects
     * @returns {Array} Results array
     */
    batchConvert(conversions) {
        if (!Array.isArray(conversions)) {
            return {
                success: false,
                error: 'Input must be an array of conversion objects'
            };
        }

        const results = [];
        const startTime = performance.now();

        for (const conversion of conversions) {
            if (!conversion.value || !conversion.from || !conversion.to) {
                results.push({
                    success: false,
                    error: 'Missing required fields: value, from, or to',
                    input: conversion
                });
                continue;
            }

            try {
                const result = this.convert(
                    parseFloat(conversion.value),
                    conversion.from,
                    conversion.to
                );
                results.push(result);
            } catch (error) {
                results.push({
                    success: false,
                    error: error.message,
                    input: conversion
                });
            }
        }

        const totalTime = performance.now() - startTime;

        return {
            totalConversions: conversions.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
            processingTime: totalTime.toFixed(4),
            results: results,
            timestamp: new Date().toISOString()
        };
    }
}

// CLI Interface
class TemperatureConverterCLI {
    constructor() {
        this.converter = new TemperatureConverter();
        this.colors = {
            reset: '\x1b[0m',
            bright: '\x1b[1m',
            dim: '\x1b[2m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m'
        };
    }

    /**
     * Display header
     * @private
     */
    displayHeader() {
        console.clear();
        console.log(`${this.colors.cyan}${'='.repeat(70)}${this.colors.reset}`);
        console.log(`${this.colors.bright}${this.colors.magenta}🌡️  PROFESSIONAL TEMPERATURE CONVERTER ${this.colors.reset}`);
        console.log(`${this.colors.dim}Version ${this.converter.version} | ${this.converter.author}${this.colors.reset}`);
        console.log(`${this.colors.cyan}${'='.repeat(70)}${this.colors.reset}\n`);
    }

    /**
     * Display main menu
     */
    displayMenu() {
        console.log(`${this.colors.bright}${this.colors.white}MAIN MENU:${this.colors.reset}`);
        console.log(`${this.colors.green}1${this.colors.reset}. Single Conversion`);
        console.log(`${this.colors.green}2${this.colors.reset}. Convert to All Scales`);
        console.log(`${this.colors.green}3${this.colors.reset}. Temperature Interpretation`);
        console.log(`${this.colors.green}4${this.colors.reset}. Scale Information`);
        console.log(`${this.colors.green}5${this.colors.reset}. Reference Points`);
        console.log(`${this.colors.green}6${this.colors.reset}. Batch Conversion`);
        console.log(`${this.colors.green}7${this.colors.reset}. Conversion History`);
        console.log(`${this.colors.green}8${this.colors.reset}. System Information`);
        console.log(`${this.colors.green}9${this.colors.reset}. Settings`);
        console.log(`${this.colors.green}0${this.colors.reset}. Exit`);
        console.log();
    }

    /**
     * Get user input
     * @private
     */
    async getInput(promptText) {
        // In a real implementation, this would use readline or similar
        // For browser environment, we'll use simulated input
        return new Promise(resolve => {
            const value = window.prompt(promptText);
            resolve(value);
        });
    }

    /**
     * Display result in formatted table
     * @private
     */
    displayResult(result) {
        console.log(`\n${this.colors.bright}${this.colors.green}✓ CONVERSION RESULT${this.colors.reset}`);
        console.log(`${this.colors.cyan}${'-'.repeat(50)}${this.colors.reset}`);
        
        if (result.success) {
            console.log(`${this.colors.bright}Original:${this.colors.reset} ${result.originalValue} ${this.converter.scales[result.fromScale.toLowerCase()]?.symbol || result.fromScale}`);
            console.log(`${this.colors.bright}Converted:${this.colors.reset} ${result.convertedValue} ${result.scaleSymbol}`);
            console.log(`${this.colors.bright}Celsius Equivalent:${this.colors.reset} ${result.celsiusEquivalent} °C`);
            console.log(`${this.colors.dim}Precision: ${result.precision} | Processed in ${result.processingTime}ms${this.colors.reset}`);
        } else {
            console.log(`${this.colors.red}❌ Error: ${result.error}${this.colors.reset}`);
        }
        
        console.log(`${this.colors.cyan}${'-'.repeat(50)}${this.colors.reset}\n`);
    }

    /**
     * Run single conversion
     */
    async runSingleConversion() {
        console.log(`\n${this.colors.bright}${this.colors.blue}SINGLE TEMPERATURE CONVERSION${this.colors.reset}`);
        console.log(`${this.colors.dim}Available scales: ${Object.keys(this.converter.scales).join(', ')}${this.colors.reset}\n`);

        const value = parseFloat(await this.getInput('Enter temperature value: '));
        const fromScale = await this.getInput('Enter source scale: ');
        const toScale = await this.getInput('Enter target scale: ');

        const result = this.converter.convert(value, fromScale, toScale);
        this.displayResult(result);

        await this.getInput(`${this.colors.dim}Press Enter to continue...${this.colors.reset}`);
    }

    /**
     * Run convert to all scales
     */
    async runConvertToAll() {
        console.log(`\n${this.colors.bright}${this.colors.blue}CONVERT TO ALL SCALES${this.colors.reset}`);
        
        const value = parseFloat(await this.getInput('Enter temperature value: '));
        const fromScale = await this.getInput('Enter source scale: ');

        const result = this.converter.convertToAll(value, fromScale);
        
        console.log(`\n${this.colors.bright}Original:${this.colors.reset} ${value} ${this.converter.scales[fromScale.toLowerCase()]?.symbol || fromScale}`);
        console.log(`${this.colors.cyan}${'-'.repeat(60)}${this.colors.reset}`);
        
        for (const [scale, data] of Object.entries(result.conversions)) {
            console.log(`${this.colors.green}✓${this.colors.reset} ${data.name.padEnd(12)}: ${data.value.toString().padStart(10)} ${data.symbol}`);
        }
        
        console.log(`${this.colors.cyan}${'-'.repeat(60)}${this.colors.reset}`);
        console.log(`${this.colors.dim}Total conversions: ${result.totalConversions}${this.colors.reset}\n`);

        await this.getInput(`${this.colors.dim}Press Enter to continue...${this.colors.reset}`);
    }

    /**
     * Run temperature interpretation
     */
    async runInterpretation() {
        console.log(`\n${this.colors.bright}${this.colors.blue}TEMPERATURE INTERPRETATION${this.colors.reset}`);
        
        const value = parseFloat(await this.getInput('Enter temperature value: '));
        const scale = await this.getInput('Enter scale: ');

        const interpretation = this.converter.interpretTemperature(value, scale);
        
        console.log(`\n${this.colors.bright}Temperature Analysis:${this.colors.reset}`);
        console.log(`${this.colors.cyan}${'-'.repeat(50)}${this.colors.reset}`);
        console.log(`${this.colors.bright}Value:${this.colors.reset} ${value} ${this.converter.scales[scale.toLowerCase()]?.symbol || scale}`);
        console.log(`${this.colors.bright}Celsius:${this.colors.reset} ${interpretation.celsiusValue} °C`);
        console.log(`${this.colors.bright}Interpretation:${this.colors.reset} ${interpretation.interpretation}`);
        console.log(`${this.colors.bright}Description:${this.colors.reset} ${interpretation.description}`);
        console.log(`${this.colors.bright}Category:${this.colors.reset} ${interpretation.category}`);
        
        console.log(`\n${this.colors.bright}Comparison to Reference Points:${this.colors.reset}`);
        for (const comp of interpretation.relativeToReferences) {
            const sign = comp.difference >= 0 ? '+' : '';
            console.log(`${this.colors.dim}  ${comp.reference}: ${sign}${comp.difference} ${comp.unit}${this.colors.reset}`);
        }
        
        console.log(`${this.colors.cyan}${'-'.repeat(50)}${this.colors.reset}\n`);

        await this.getInput(`${this.colors.dim}Press Enter to continue...${this.colors.reset}`);
    }

    /**
     * Run CLI interface
     */
    async run() {
        this.displayHeader();
        
        let running = true;
        
        while (running) {
            this.displayMenu();
            const choice = await this.getInput(`${this.colors.yellow}Select option (0-9): ${this.colors.reset}`);

            switch(choice) {
                case '1':
                    await this.runSingleConversion();
                    break;
                case '2':
                    await this.runConvertToAll();
                    break;
                case '3':
                    await this.runInterpretation();
                    break;
                case '4':
                    await this.displayScaleInfo();
                    break;
                case '5':
                    this.displayReferencePoints();
                    break;
                case '6':
                    await this.runBatchConversion();
                    break;
                case '7':
                    this.displayHistory();
                    break;
                case '8':
                    this.displaySystemInfo();
                    break;
                case '9':
                    await this.runSettings();
                    break;
                case '0':
                    console.log(`\n${this.colors.green}Thank you for using Professional Temperature Converter! 👋${this.colors.reset}\n`);
                    running = false;
                    break;
                default:
                    console.log(`\n${this.colors.red}Invalid option. Please try again.${this.colors.reset}\n`);
            }

            if (running) {
                this.displayHeader();
            }
        }
    }

    /**
     * Display scale information
     */
    async displayScaleInfo() {
        console.log(`\n${this.colors.bright}${this.colors.blue}SCALE INFORMATION${this.colors.reset}`);
        
        const scale = await this.getInput('Enter scale name (or press Enter for all): ');
        
        if (scale) {
            const info = this.converter.getScaleInfo(scale);
            if (info) {
                console.log(`\n${this.colors.bright}${info.name} (${info.symbol})${this.colors.reset}`);
                console.log(`${this.colors.cyan}${'-'.repeat(50)}${this.colors.reset}`);
                console.log(`${this.colors.dim}${info.description}${this.colors.reset}`);
                console.log(`${this.colors.bright}Freezing Point:${this.colors.reset} ${info.freezingPoint} ${info.symbol}`);
                console.log(`${this.colors.bright}Boiling Point:${this.colors.reset} ${info.boilingPoint} ${info.symbol}`);
                console.log(`${this.colors.bright}Absolute Zero:${this.colors.reset} ${info.absoluteZero} ${info.symbol}`);
                console.log(`${this.colors.cyan}${'-'.repeat(50)}${this.colors.reset}`);
            } else {
                console.log(`\n${this.colors.red}Scale not found: ${scale}${this.colors.reset}`);
            }
        } else {
            console.log(`\n${this.colors.bright}ALL TEMPERATURE SCALES${this.colors.reset}`);
            console.log(`${this.colors.cyan}${'-'.repeat(60)}${this.colors.reset}`);
            
            for (const [key, data] of Object.entries(this.converter.scales)) {
                const info = this.converter.getScaleInfo(key);
                console.log(`${this.colors.bright}${data.name} (${data.symbol})${this.colors.reset}`);
                console.log(`${this.colors.dim}  ${info.description.split('.')[0]}.${this.colors.reset}`);
            }
            
            console.log(`${this.colors.cyan}${'-'.repeat(60)}${this.colors.reset}`);
        }

        await this.getInput(`${this.colors.dim}Press Enter to continue...${this.colors.reset}`);
    }

    /**
     * Display reference points
     */
    displayReferencePoints() {
        console.log(`\n${this.colors.bright}${this.colors.blue}REFERENCE TEMPERATURE POINTS${this.colors.reset}`);
        console.log(`${this.colors.cyan}${'-'.repeat(70)}${this.colors.reset}`);
        console.log(`${this.colors.bright}Description${' '.repeat(25)}Celsius${' '.repeat(8)}Fahrenheit${' '.repeat(6)}Kelvin${this.colors.reset}`);
        console.log(`${this.colors.cyan}${'-'.repeat(70)}${this.colors.reset}`);

        for (const [key, ref] of Object.entries(this.converter.referencePoints)) {
            const fahrenheit = this.converter.fromCelsius(ref.celsius, 'fahrenheit');
            const kelvin = this.converter.fromCelsius(ref.celsius, 'kelvin');
            
            console.log(`${ref.description.padEnd(35)}${ref.celsius.toFixed(2).toString().padStart(8)} °C${fahrenheit.toFixed(2).toString().padStart(12)} °F${kelvin.toFixed(2).toString().padStart(12)} K`);
        }

        console.log(`${this.colors.cyan}${'-'.repeat(70)}${this.colors.reset}\n`);
    }

    /**
     * Run batch conversion
     */
    async runBatchConversion() {
        console.log(`\n${this.colors.bright}${this.colors.blue}BATCH CONVERSION${this.colors.reset}`);
        console.log(`${this.colors.dim}Enter conversions in format: value,fromScale,toScale${this.colors.reset}`);
        console.log(`${this.colors.dim}Example: 100,celsius,fahrenheit${this.colors.reset}`);
        console.log(`${this.colors.dim}Enter 'done' when finished${this.colors.reset}\n`);

        const conversions = [];
        let input = '';

        while (true) {
            input = await this.getInput(`Conversion ${conversions.length + 1}: `);
            
            if (input.toLowerCase() === 'done') {
                break;
            }

            const parts = input.split(',');
            if (parts.length === 3) {
                conversions.push({
                    value: parseFloat(parts[0]),
                    from: parts[1].trim(),
                    to: parts[2].trim()
                });
            } else {
                console.log(`${this.colors.red}Invalid format. Use: value,from,to${this.colors.reset}`);
            }
        }

        if (conversions.length > 0) {
            const result = this.converter.batchConvert(conversions);
            
            console.log(`\n${this.colors.bright}BATCH CONVERSION RESULTS${this.colors.reset}`);
            console.log(`${this.colors.cyan}${'-'.repeat(60)}${this.colors.reset}`);
            console.log(`${this.colors.bright}Total:${this.colors.reset} ${result.totalConversions}`);
            console.log(`${this.colors.green}Successful:${this.colors.reset} ${result.successful}`);
            console.log(`${this.colors.red}Failed:${this.colors.reset} ${result.failed}`);
            console.log(`${this.colors.dim}Processing time: ${result.processingTime}ms${this.colors.reset}`);
            console.log(`${this.colors.cyan}${'-'.repeat(60)}${this.colors.reset}`);

            for (const res of result.results) {
                if (res.success) {
                    console.log(`${this.colors.green}✓${this.colors.reset} ${res.originalValue} ${res.fromScale} → ${res.convertedValue} ${res.scaleSymbol}`);
                } else {
                    console.log(`${this.colors.red}✗${this.colors.reset} Error: ${res.error}`);
                }
            }
        }

        await this.getInput(`\n${this.colors.dim}Press Enter to continue...${this.colors.reset}`);
    }

    /**
     * Display conversion history
     */
    displayHistory() {
        const history = this.converter.getHistory(10);
        
        console.log(`\n${this.colors.bright}${this.colors.blue}CONVERSION HISTORY (Last 10 entries)${this.colors.reset}`);
        console.log(`${this.colors.cyan}${'-'.repeat(70)}${this.colors.reset}`);
        
        if (history.length === 0) {
            console.log(`${this.colors.dim}No conversion history available.${this.colors.reset}`);
        } else {
            for (const entry of history) {
                const time = new Date(entry.timestamp).toLocaleTimeString();
                console.log(`${time} - ${entry.originalValue} ${entry.fromScale} → ${entry.convertedValue} ${entry.scaleSymbol} (${entry.processingTime}ms)`);
            }
        }
        
        console.log(`${this.colors.cyan}${'-'.repeat(70)}${this.colors.reset}\n`);
    }

    /**
     * Display system information
     */
    displaySystemInfo() {
        const info = this.converter.getSystemInfo();
        
        console.log(`\n${this.colors.bright}${this.colors.blue}SYSTEM INFORMATION${this.colors.reset}`);
        console.log(`${this.colors.cyan}${'-'.repeat(40)}${this.colors.reset}`);
        console.log(`${this.colors.bright}Version:${this.colors.reset} ${info.version}`);
        console.log(`${this.colors.bright}Author:${this.colors.reset} ${info.author}`);
        console.log(`${this.colors.bright}Supported Scales:${this.colors.reset} ${info.supportedScales}`);
        console.log(`${this.colors.bright}Precision:${this.colors.reset} ${info.precision} decimal places`);
        console.log(`${this.colors.bright}History Entries:${this.colors.reset} ${info.historyEntries}/${info.maxHistoryEntries}`);
        console.log(`${this.colors.bright}Reference Points:${this.colors.reset} ${info.referencePoints}`);
        console.log(`${this.colors.cyan}${'-'.repeat(40)}${this.colors.reset}\n`);
    }

    /**
     * Run settings menu
     */
    async runSettings() {
        console.log(`\n${this.colors.bright}${this.colors.blue}SETTINGS${this.colors.reset}`);
        
        const precision = await this.getInput(`Precision (0-10, current: ${this.converter.precision}): `);
        if (precision) {
            const newPrecision = parseInt(precision);
            if (this.converter.setPrecision(newPrecision)) {
                console.log(`${this.colors.green}✓ Precision set to ${newPrecision}${this.colors.reset}`);
            } else {
                console.log(`${this.colors.red}✗ Invalid precision value${this.colors.reset}`);
            }
        }

        const clearHistory = await this.getInput('Clear history? (yes/no): ');
        if (clearHistory && clearHistory.toLowerCase() === 'yes') {
            this.converter.clearHistory();
            console.log(`${this.colors.green}✓ History cleared${this.colors.reset}`);
        }

        await this.getInput(`${this.colors.dim}Press Enter to continue...${this.colors.reset}`);
    }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        TemperatureConverter,
        TemperatureConverterCLI
    };
} else if (typeof window !== 'undefined') {
    // Browser environment
    window.TemperatureConverter = TemperatureConverter;
    window.TemperatureConverterCLI = TemperatureConverterCLI;
    
    console.log(`
    🌡️ Professional Temperature Converter v2.0.0
    ===========================================
    
    Available in global scope:
    1. window.TemperatureConverter - Core conversion class
    2. window.TemperatureConverterCLI - Command line interface
    
    Example usage:
    
    const converter = new TemperatureConverter();
    const result = converter.convert(100, 'celsius', 'fahrenheit');
    console.log(result);
    
    To run CLI: new TemperatureConverterCLI().run();
    `);
}

// Auto-initialize if in browser with no module system
if (typeof window !== 'undefined' && !window.TemperatureConverterLoaded) {
    window.TemperatureConverterLoaded = true;
    console.log('📦 Professional Temperature Converter loaded successfully!');
}
