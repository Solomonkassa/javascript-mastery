

## 📋 Quiz Information

### **Description**
This quiz assesses your understanding of fundamental JavaScript concepts, including variables, data types, operators, and basic syntax. It's designed to validate foundational knowledge before progressing to more advanced topics.

### **Prerequisites**
- Completion of Module 00 learning materials
- Basic understanding of programming concepts
- Familiarity with JavaScript development environment

### **Technical Requirements**
- Stable internet connection
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Code editor for practical questions (optional)
- No external resources allowed during quiz

### **Assessment Structure**
- **Section A:** Multiple Choice Questions (40 points)
- **Section B:** Code Analysis (30 points)
- **Section C:** Practical Application (30 points)
- **Total:** 100 points

---

## 📊 Section A: Multiple Choice Questions (40 points)

**Instructions:** Choose the ONE best answer for each question. Each question is worth 5 points.

---

### **Question 1: Variable Declaration**

Which of the following correctly demonstrates the difference between `let`, `const`, and `var`?

**A)**
```javascript
var x = 10;           // Function-scoped, can be redeclared
let y = 20;           // Block-scoped, cannot be redeclared
const z = 30;         // Block-scoped, cannot be reassigned
```

**B)**
```javascript
let x = 10;           // Global-scoped, can be redeclared
const y = 20;         // Function-scoped, can be reassigned
var z = 30;           // Block-scoped, cannot be redeclared
```

**C)**
```javascript
const x = 10;         // Block-scoped, can be reassigned
var y = 20;           // Global-scoped, cannot be redeclared
let z = 30;           // Function-scoped, can be redeclared
```

**D)**
```javascript
var x = 10;           // Block-scoped, cannot be redeclared
const y = 20;         // Function-scoped, can be reassigned
let z = 30;           // Global-scoped, can be redeclared
```

**Correct Answer:** **A**  
**Explanation:** `var` is function-scoped and can be redeclared, `let` is block-scoped and cannot be redeclared in the same scope, and `const` is block-scoped and cannot be reassigned after declaration.

**Learning Objective:** Understand variable declaration types and their scoping rules.

---

### **Question 2: Data Type Identification**

What will be logged to the console when executing the following code?

```javascript
const values = [null, undefined, NaN, "", 0, false];
const truthyCount = values.filter(Boolean).length;
console.log(truthyCount);
```

**A)** 0  
**B)** 1  
**C)** 2  
**D)** 6  

**Correct Answer:** **A**  
**Explanation:** All values in the array (`null`, `undefined`, `NaN`, empty string, `0`, `false`) are falsy in JavaScript. The `filter(Boolean)` method removes all falsy values, resulting in an empty array with length 0.

**Learning Objective:** Identify falsy values in JavaScript and understand the Boolean conversion.

---

### **Question 3: Operator Precedence**

What is the result of the following expression?

```javascript
let result = 2 + 3 * 4 ** 2 / 8 - 1;
console.log(result);
```

**A)** 7  
**B)** 9  
**C)** 10  
**D)** 12  

**Correct Answer:** **B**  
**Explanation:** Following operator precedence:  
1. Exponentiation (`**`): `4 ** 2 = 16`  
2. Multiplication/Division (left to right): `3 * 16 / 8 = 6`  
3. Addition/Subtraction (left to right): `2 + 6 - 1 = 7`  
Wait, that gives 7... Let's recalculate:  
`4 ** 2 = 16`  
`3 * 16 = 48`  
`48 / 8 = 6`  
`2 + 6 = 8`  
`8 - 1 = 7`  
Actually, the correct answer should be 7. Let me check the options again...

**Correction:** The correct answer is **A) 7**  
**Detailed Calculation:**  
- Exponentiation: `4 ** 2 = 16`  
- Multiplication: `3 * 16 = 48`  
- Division: `48 / 8 = 6`  
- Addition: `2 + 6 = 8`  
- Subtraction: `8 - 1 = 7`  

**Learning Objective:** Apply operator precedence rules in complex expressions.

---

### **Question 4: Type Coercion**

What will be the output of the following code?

```javascript
console.log(1 + "2" + 3);
console.log(1 + 2 + "3");
console.log("1" + 2 + 3);
```

**A)**
```
123
33
123
```

**B)**
```
15
33
15
```

**C)**
```
123
33
15
```

**D)**
```
15
123
123
```

**Correct Answer:** **A**  
**Explanation:** JavaScript performs left-to-right evaluation with type coercion:  
- `1 + "2" + 3`: `1 + "2" = "12"`, then `"12" + 3 = "123"`  
- `1 + 2 + "3"`: `1 + 2 = 3`, then `3 + "3" = "33"`  
- `"1" + 2 + 3`: `"1" + 2 = "12"`, then `"12" + 3 = "123"`

**Learning Objective:** Understand string concatenation and type coercion in JavaScript.

---

### **Question 5: Scope Chain**

Consider the following code. What will be logged to the console?

```javascript
function outer() {
    let x = 10;
    
    function inner() {
        let y = 20;
        console.log(x + y);
    }
    
    inner();
    console.log(y); // Line A
}

outer();
```

**A)** 30, followed by ReferenceError  
**B)** 30, followed by 20  
**C)** 30, followed by undefined  
**D)** ReferenceError at inner function  

**Correct Answer:** **A**  
**Explanation:** The inner function can access variables from the outer scope (closure), so `x + y = 30` is logged. However, variable `y` is scoped to the inner function, so Line A throws a ReferenceError because `y` is not accessible in the outer function.

**Learning Objective:** Understand lexical scoping and closure in JavaScript.

---

### **Question 6: Hoisting Behavior**

Which of the following accurately describes hoisting in JavaScript?

**A)** Variables declared with `var` are hoisted and initialized with `undefined`, while `let` and `const` are hoisted but not initialized (Temporal Dead Zone).  
**B)** All variable declarations are hoisted and initialized with their assigned values.  
**C)** Only function declarations are hoisted; variable declarations are not.  
**D)** Variables declared with `let` and `const` are hoisted and initialized with `undefined`, while `var` is not hoisted.

**Correct Answer:** **A**  
**Explanation:** `var` declarations are hoisted and initialized with `undefined`. `let` and `const` are hoisted but not initialized, creating a Temporal Dead Zone where they cannot be accessed before declaration.

**Learning Objective:** Understand hoisting mechanics for different declaration types.

---

### **Question 7: Object Comparison**

What will be the output of the following code?

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 === obj2);
console.log(obj1 === obj3);
console.log(JSON.stringify(obj1) === JSON.stringify(obj2));
```

**A)**
```
true
true
true
```

**B)**
```
false
true
true
```

**C)**
```
false
false
true
```

**D)**
```
true
false
false
```

**Correct Answer:** **B**  
**Explanation:**  
- `obj1 === obj2`: `false` (different object references)  
- `obj1 === obj3`: `true` (same reference)  
- `JSON.stringify(obj1) === JSON.stringify(obj2)`: `true` (same string representation)

**Learning Objective:** Understand reference vs value comparison for objects.

---

### **Question 8: Template Literals**

What will be the output of the following code using template literals?

```javascript
const name = "Alice";
const score = 95;
const maxScore = 100;

const message = `${name} scored ${(score / maxScore) * 100}% 
and ${score >= 90 ? "passed with distinction" : "needs improvement"}.`;

console.log(message);
```

**A)** "Alice scored 95% and passed with distinction."  
**B)** "Alice scored 95% and needs improvement."  
**C)** "Alice scored 95% \nand passed with distinction."  
**D)** "Alice scored 95% \nand needs improvement."

**Correct Answer:** **A**  
**Explanation:** Template literals preserve line breaks only when they appear in the source code. Here, the line break is escaped with a backslash, so the output appears on one line. The ternary operator evaluates to "passed with distinction" since score >= 90 is true.

**Learning Objective:** Use template literals with expressions and ternary operators.

---

## 📝 Section B: Code Analysis (30 points)

**Instructions:** Analyze the following code snippets and answer the questions. Each question is worth 10 points.

---

### **Question 9: Function Behavior Analysis**

Consider the following function:

```javascript
function mysteryFunction(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        return 'Invalid input';
    }
    
    let result = 0;
    
    for (let i = Math.min(x, y); i <= Math.max(x, y); i++) {
        if (i % 2 === 0) {
            result += i * i;
        } else {
            result -= i;
        }
    }
    
    return result;
}
```

**Tasks:**
1. What does this function do? Describe its purpose. (5 points)
2. What will `mysteryFunction(1, 4)` return? Show your calculation steps. (5 points)

**Sample Answer Space:**
```
1. Purpose: 
   This function calculates the sum of squares of even numbers minus the sum of 
   odd numbers between x and y (inclusive). It validates input types and 
   handles the range regardless of which parameter is larger.

2. Calculation for mysteryFunction(1, 4):
   Range: 1 to 4 inclusive
   - i = 1 (odd): result = 0 - 1 = -1
   - i = 2 (even): result = -1 + (2*2) = -1 + 4 = 3
   - i = 3 (odd): result = 3 - 3 = 0
   - i = 4 (even): result = 0 + (4*4) = 0 + 16 = 16
   Final result: 16
```

**Scoring Rubric:**
- Correct purpose description: 5 points
- Correct calculation with steps: 5 points
- Partial credit for partially correct answers

---

### **Question 10: Error Identification & Fix**

The following code has several issues. Identify and fix them:

```javascript
// Buggy Code
function calculateAverage(scores) {
    let total = 0;
    
    for (i = 0; i <= scores.length; i++) {
        total =+ scores[i];
    }
    
    const average = total / scores.length;
    
    return 'The average score is: ' + average;
}

// Test case that should work
const testScores = [85, 90, 78, 92, 88];
console.log(calculateAverage(testScores));
```

**Tasks:**
1. Identify all bugs in the code (list them). (5 points)
2. Provide the corrected version of the function. (5 points)

**Sample Answer Space:**
```
1. Bugs identified:
   a) Missing variable declaration for loop counter (should be `let i`)
   b) Loop condition uses `<=` instead of `<`, causing index out of bounds
   c) Assignment operator `=+` should be `+=` for addition assignment
   d) No validation for empty scores array (division by zero)
   e) Function doesn't handle non-array or invalid array elements

2. Corrected code:
   function calculateAverage(scores) {
       if (!Array.isArray(scores) || scores.length === 0) {
           return 'Invalid or empty scores array';
       }
       
       let total = 0;
       
       for (let i = 0; i < scores.length; i++) {
           if (typeof scores[i] !== 'number' || isNaN(scores[i])) {
               return `Invalid score at index ${i}`;
           }
           total += scores[i];
       }
       
       const average = total / scores.length;
       return `The average score is: ${average.toFixed(2)}`;
   }
```

**Scoring Rubric:**
- Each correctly identified bug: 1 point (up to 5)
- Corrected code with proper fixes: 5 points
- Bonus points for additional improvements

---

### **Question 11: Algorithm Optimization**

Analyze the following function and propose optimizations:

```javascript
function findDuplicates(arr) {
    const duplicates = [];
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j && arr[i] === arr[j]) {
                if (!duplicates.includes(arr[i])) {
                    duplicates.push(arr[i]);
                }
                break;
            }
        }
    }
    
    return duplicates;
}
```

**Tasks:**
1. What is the time complexity of the current implementation? (3 points)
2. Identify inefficiencies in the current code. (4 points)
3. Propose an optimized version with better performance. (3 points)

**Sample Answer Space:**
```
1. Time Complexity: O(n²) - Nested loops over the array

2. Inefficiencies:
   a) Unnecessary inner loop iterations (j starts from 0 instead of i+1)
   b) Checking `i !== j` every iteration
   c) Using `includes()` inside nested loops adds O(n) complexity
   d) Breaking after finding first duplicate may miss multiple duplicates
   e) No early exit conditions

3. Optimized version:
   function findDuplicates(arr) {
       const seen = new Set();
       const duplicates = new Set();
       
       for (const item of arr) {
           if (seen.has(item)) {
               duplicates.add(item);
           } else {
               seen.add(item);
           }
       }
       
       return Array.from(duplicates);
   }
   // Time Complexity: O(n), Space Complexity: O(n)
```

**Scoring Rubric:**
- Correct time complexity: 3 points
- Each valid inefficiency identified: 1 point (up to 4)
- Proper optimized solution: 3 points

---

## 💻 Section C: Practical Application (30 points)

**Instructions:** Write JavaScript code to solve the following problems. Each problem is worth 15 points.

---

### **Problem 12: Employee Data Processor**

Create a function `processEmployeeData` that:
1. Takes an array of employee objects
2. Returns an object with the following structure:
   - `averageSalary`: Average of all salaries
   - `departments`: Object with department names as keys and count of employees
   - `highestPaid`: Name of employee with highest salary
   - `salaryRange`: Object with `min`, `max`, `range` (max - min)

**Employee Object Structure:**
```javascript
{
    id: number,
    name: string,
    department: string,
    salary: number,
    experience: number  // in years
}
```

**Example Input:**
```javascript
const employees = [
    { id: 1, name: "Alice", department: "Engineering", salary: 80000, experience: 5 },
    { id: 2, name: "Bob", department: "Marketing", salary: 65000, experience: 3 },
    { id: 3, name: "Charlie", department: "Engineering", salary: 90000, experience: 7 },
    { id: 4, name: "Diana", department: "HR", salary: 55000, experience: 2 }
];
```

**Expected Output:**
```javascript
{
    averageSalary: 72500,
    departments: { Engineering: 2, Marketing: 1, HR: 1 },
    highestPaid: "Charlie",
    salaryRange: { min: 55000, max: 90000, range: 35000 }
}
```

**Your Implementation:**

```javascript
// Write your solution here
function processEmployeeData(employees) {
    if (!Array.isArray(employees) || employees.length === 0) {
        return {
            averageSalary: 0,
            departments: {},
            highestPaid: '',
            salaryRange: { min: 0, max: 0, range: 0 }
        };
    }
    
    let totalSalary = 0;
    let highestSalary = -Infinity;
    let highestPaidName = '';
    let minSalary = Infinity;
    let maxSalary = -Infinity;
    const departments = {};
    
    for (const employee of employees) {
        // Validate employee object
        if (!employee || typeof employee !== 'object') continue;
        
        const { name, department, salary } = employee;
        
        // Update salary calculations
        if (typeof salary === 'number' && !isNaN(salary)) {
            totalSalary += salary;
            
            if (salary > highestSalary) {
                highestSalary = salary;
                highestPaidName = name || '';
            }
            
            minSalary = Math.min(minSalary, salary);
            maxSalary = Math.max(maxSalary, salary);
        }
        
        // Count departments
        if (department && typeof department === 'string') {
            departments[department] = (departments[department] || 0) + 1;
        }
    }
    
    const averageSalary = employees.length > 0 ? totalSalary / employees.length : 0;
    
    return {
        averageSalary: Math.round(averageSalary * 100) / 100,
        departments,
        highestPaid: highestPaidName,
        salaryRange: {
            min: minSalary === Infinity ? 0 : minSalary,
            max: maxSalary === -Infinity ? 0 : maxSalary,
            range: (maxSalary === -Infinity || minSalary === Infinity) 
                   ? 0 
                   : maxSalary - minSalary
        }
    };
}
```

**Scoring Criteria:**
- Correct average calculation: 3 points
- Proper department counting: 3 points
- Highest paid identification: 3 points
- Salary range calculation: 3 points
- Error handling and edge cases: 3 points

---

### **Problem 13: Password Validator**

Create a function `validatePassword` that checks if a password meets the following criteria:
1. At least 8 characters long
2. Contains at least one uppercase letter
3. Contains at least one lowercase letter
4. Contains at least one digit
5. Contains at least one special character from `!@#$%^&*`
6. Does not contain common passwords (provided in a list)
7. Does not contain sequences of 3 or more repeating characters (e.g., "aaa", "111")

The function should return an object with:
- `isValid`: boolean indicating if password meets all criteria
- `issues`: array of strings describing validation failures
- `strengthScore`: number from 0-100 based on password strength

**Example Usage:**
```javascript
const commonPasswords = ['password', '123456', 'qwerty'];
console.log(validatePassword('Weak1!', commonPasswords));
// Output: { isValid: false, issues: ['Too short', 'No uppercase'], strengthScore: 30 }

console.log(validatePassword('StrongP@ssw0rd', commonPasswords));
// Output: { isValid: true, issues: [], strengthScore: 95 }
```

**Your Implementation:**

```javascript
// Write your solution here
function validatePassword(password, commonPasswords = []) {
    const issues = [];
    let strengthScore = 0;
    
    // Check if password is provided
    if (typeof password !== 'string') {
        return {
            isValid: false,
            issues: ['Password must be a string'],
            strengthScore: 0
        };
    }
    
    // 1. Length check
    if (password.length < 8) {
        issues.push('Password must be at least 8 characters long');
    } else if (password.length >= 12) {
        strengthScore += 20;
    } else {
        strengthScore += 10;
    }
    
    // 2. Uppercase check
    if (!/[A-Z]/.test(password)) {
        issues.push('Password must contain at least one uppercase letter');
    } else {
        strengthScore += 15;
    }
    
    // 3. Lowercase check
    if (!/[a-z]/.test(password)) {
        issues.push('Password must contain at least one lowercase letter');
    } else {
        strengthScore += 15;
    }
    
    // 4. Digit check
    if (!/\d/.test(password)) {
        issues.push('Password must contain at least one digit');
    } else {
        strengthScore += 15;
    }
    
    // 5. Special character check
    if (!/[!@#$%^&*]/.test(password)) {
        issues.push('Password must contain at least one special character (!@#$%^&*)');
    } else {
        strengthScore += 15;
    }
    
    // 6. Common password check
    const lowerPassword = password.toLowerCase();
    if (commonPasswords.some(common => lowerPassword.includes(common.toLowerCase()))) {
        issues.push('Password contains common words or patterns');
        strengthScore -= 10;
    }
    
    // 7. Repeating characters check
    if (/(.)\1\1/.test(password)) {
        issues.push('Password contains repeating characters (3 or more of the same)');
        strengthScore -= 10;
    }
    
    // Additional strength factors
    if (password.length >= 16) {
        strengthScore += 10;
    }
    
    if (/[!@#$%^&*].*[!@#$%^&*]/.test(password)) {
        strengthScore += 5; // Multiple special characters
    }
    
    if (/\d.*\d/.test(password)) {
        strengthScore += 5; // Multiple digits
    }
    
    // Calculate entropy (rough estimate)
    const charTypes = [
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /\d/.test(password),
        /[!@#$%^&*]/.test(password)
    ].filter(Boolean).length;
    
    const entropyBonus = (charTypes - 1) * 5;
    strengthScore += entropyBonus;
    
    // Cap score between 0-100
    strengthScore = Math.max(0, Math.min(100, strengthScore));
    
    return {
        isValid: issues.length === 0,
        issues,
        strengthScore: Math.round(strengthScore)
    };
}
```

**Scoring Criteria:**
- All 7 validation criteria implemented: 7 points (1 each)
- Proper return object structure: 3 points
- Strength score calculation: 3 points
- Error handling: 2 points

---

## 📈 Scoring & Evaluation

### **Scoring Summary**
- **Section A:** 8 questions × 5 points = 40 points
- **Section B:** 3 questions × 10 points = 30 points
- **Section C:** 2 problems × 15 points = 30 points
- **Total:** 100 points

### **Passing Criteria**
- **Excellent:** 90-100 points (Mastery)
- **Good:** 70-89 points (Proficient)
- **Needs Improvement:** 50-69 points (Developing)
- **Retake Recommended:** Below 50 points (Beginning)

### **Performance Analysis Categories**
1. **Conceptual Understanding** (Variables, Data Types, Operators)
2. **Problem Solving** (Algorithm Design, Optimization)
3. **Code Quality** (Readability, Error Handling, Best Practices)
4. **Practical Application** (Real-world Problem Solving)

---

## 🔍 Answer Key & Explanations

*(Note: For educational purposes, detailed explanations are provided in a separate instructor guide. Students receive only their scores and areas for improvement.)*

### **Common Mistakes to Avoid:**
1. **Type coercion confusion:** Remember `==` vs `===` and implicit conversions
2. **Scope misunderstandings:** Variables are function-scoped with `var`, block-scoped with `let/const`
3. **Reference vs value:** Objects and arrays are compared by reference, not content
4. **Hoisting pitfalls:** Always declare variables before use
5. **Array methods:** Understand `map`, `filter`, `reduce` vs traditional loops

### **Recommended Study Areas Based on Performance:**

| Score Range | Focus Areas |
|-------------|-------------|
| < 50% | Variable declaration, basic syntax, data types |
| 50-70% | Functions, scope, array methods, error handling |
| 70-90% | Advanced operators, object manipulation, optimization |
| > 90% | Design patterns, performance optimization, edge cases |

---

## 🎯 Next Steps After Quiz

### **If You Scored 70+ Points:**
1. Proceed to Module 01: Functions & Scope
2. Review specific weak areas identified in feedback
3. Complete the optional advanced challenges
4. Join the study group for peer discussion

### **If You Scored Below 70 Points:**
1. Review Module 00 materials thoroughly
2. Complete the recommended practice exercises
3. Attend the fundamentals workshop
4. Schedule a 1:1 session with an instructor
5. Retake quiz after additional study

### **Additional Resources:**
- 📚 MDN JavaScript Guide
- 🎥 JavaScript Fundamentals Video Series
- 💻 Interactive Code Practice Platform
- 👥 Peer Study Group Sessions
- 🧑‍🏫 Office Hours Schedule

---

## 📝 Submission Instructions

1. Complete all sections of the quiz
2. Double-check your answers before submission
3. Ensure code is properly formatted and commented
4. Submit before the time limit expires
5. Save a copy of your answers for review

### **Academic Integrity Statement:**
> "I affirm that I have completed this quiz independently without unauthorized assistance. I understand that violations of academic integrity may result in course failure."

**Check box:** □ I agree to the academic integrity policy above

---

## 📧 Support & Contact

**Quiz Coordinator:** JavaScript Education Team  
**Email:** quizzes@jsmastery.dev  
**Office Hours:** Monday-Friday, 9AM-5PM EST  
**Response Time:** 24-48 hours for quiz feedback

**Need Accommodations?** Contact support at least 48 hours before quiz deadline.

