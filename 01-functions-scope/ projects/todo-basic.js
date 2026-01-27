/**
 * 📝 Basic Todo Application with Advanced JavaScript Patterns
 * 
 * A production-ready todo application demonstrating:
 * - Module pattern for encapsulation
 * - Higher-order functions
 * - Immutable updates
 * - Event handling
 * - Local storage persistence
 * - Filtering and sorting
 */

'use strict';

/**
 * 🎯 TODO APPLICATION MODULE
 */

const TodoApp = (function() {
  // Private state
  let todos = [];
  let currentFilter = 'all'; // 'all', 'active', 'completed'
  let currentSort = 'created'; // 'created', 'priority', 'dueDate'
  let nextId = 1;
  
  // Private constants
  const STORAGE_KEY = 'todo_app_data';
  const PRIORITIES = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    URGENT: 4
  };
  
  // Private DOM elements cache
  const elements = {};
  
  /**
   * 🎯 DATA VALIDATION
   */
  
  function validateTodo(todo) {
    if (!todo || typeof todo !== 'object') {
      throw new TypeError('Todo must be an object');
    }
    
    const { title, description, priority, dueDate, tags } = todo;
    
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Todo must have a non-empty title');
    }
    
    if (description && typeof description !== 'string') {
      throw new TypeError('Description must be a string');
    }
    
    if (priority && !Object.values(PRIORITIES).includes(priority)) {
      throw new Error(`Priority must be one of: ${Object.values(PRIORITIES).join(', ')}`);
    }
    
    if (dueDate && !(dueDate instanceof Date || !isNaN(new Date(dueDate)))) {
      throw new TypeError('Due date must be a valid date');
    }
    
    if (tags && (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))) {
      throw new TypeError('Tags must be an array of strings');
    }
    
    return true;
  }
  
  /**
   * 💾 STORAGE MANAGEMENT
   */
  
  function saveToStorage() {
    try {
      const data = {
        todos,
        nextId,
        version: '1.0.0',
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save todos:', error);
      return false;
    }
  }
  
  function loadFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return false;
      
      const parsed = JSON.parse(data);
      
      // Validate loaded data
      if (parsed.version !== '1.0.0') {
        console.warn('Data version mismatch, clearing storage');
        clearStorage();
        return false;
      }
      
      // Restore todos with proper Date objects
      todos = parsed.todos.map(todo => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        completedAt: todo.completedAt ? new Date(todo.completedAt) : null
      }));
      
      nextId = parsed.nextId || 1;
      
      return true;
    } catch (error) {
      console.error('Failed to load todos:', error);
      return false;
    }
  }
  
  function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
    todos = [];
    nextId = 1;
    return true;
  }
  
  /**
   * 📝 TODO OPERATIONS
   */
  
  function addTodo(todoData) {
    try {
      validateTodo(todoData);
      
      const now = new Date();
      const todo = {
        id: nextId++,
        title: todoData.title.trim(),
        description: todoData.description ? todoData.description.trim() : '',
        priority: todoData.priority || PRIORITIES.MEDIUM,
        dueDate: todoData.dueDate ? new Date(todoData.dueDate) : null,
        tags: todoData.tags || [],
        completed: false,
        createdAt: now,
        updatedAt: now,
        completedAt: null
      };
      
      todos.push(todo);
      saveToStorage();
      publishEvent('todo:added', todo);
      
      return {
        success: true,
        todo: { ...todo },
        total: todos.length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  function updateTodo(id, updates) {
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index === -1) {
      return {
        success: false,
        error: `Todo with id ${id} not found`
      };
    }
    
    try {
      // Validate updates
      if (updates.title !== undefined && 
          (typeof updates.title !== 'string' || updates.title.trim().length === 0)) {
        throw new Error('Title must be a non-empty string');
      }
      
      if (updates.priority !== undefined && 
          !Object.values(PRIORITIES).includes(updates.priority)) {
        throw new Error(`Invalid priority value`);
      }
      
      if (updates.dueDate !== undefined && updates.dueDate !== null && 
          !(updates.dueDate instanceof Date || !isNaN(new Date(updates.dueDate)))) {
        throw new TypeError('Due date must be a valid date or null');
      }
      
      if (updates.tags !== undefined && 
          (!Array.isArray(updates.tags) || !updates.tags.every(tag => typeof tag === 'string'))) {
        throw new TypeError('Tags must be an array of strings');
      }
      
      const oldTodo = { ...todos[index] };
      const now = new Date();
      
      // Apply updates
      todos[index] = {
        ...todos[index],
        ...updates,
        updatedAt: now,
        // Reset completedAt if marking as incomplete
        completedAt: updates.completed === false ? null : 
                    updates.completed === true ? now : 
                    todos[index].completedAt
      };
      
      // Clean up undefined values
      Object.keys(todos[index]).forEach(key => {
        if (todos[index][key] === undefined) {
          delete todos[index][key];
        }
      });
      
      saveToStorage();
      publishEvent('todo:updated', { old: oldTodo, new: todos[index] });
      
      return {
        success: true,
        todo: { ...todos[index] },
        old: oldTodo
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index === -1) {
      return {
        success: false,
        error: `Todo with id ${id} not found`
      };
    }
    
    const deletedTodo = todos[index];
    todos.splice(index, 1);
    saveToStorage();
    publishEvent('todo:deleted', deletedTodo);
    
    return {
      success: true,
      todo: deletedTodo,
      remaining: todos.length
    };
  }
  
  function toggleTodo(id) {
    const todo = getTodo(id);
    
    if (!todo) {
      return {
        success: false,
        error: `Todo with id ${id} not found`
      };
    }
    
    return updateTodo(id, { completed: !todo.completed });
  }
  
  function getTodo(id) {
    const todo = todos.find(t => t.id === id);
    return todo ? { ...todo } : null;
  }
  
  function getAllTodos() {
    return todos.map(todo => ({ ...todo }));
  }
  
  function clearCompleted() {
    const completedTodos = todos.filter(todo => todo.completed);
    todos = todos.filter(todo => !todo.completed);
    saveToStorage();
    publishEvent('todos:cleared', completedTodos);
    
    return {
      success: true,
      cleared: completedTodos.length,
      remaining: todos.length
    };
  }
  
  function markAllAs(completed) {
    const updatedTodos = [];
    
    todos.forEach(todo => {
      if (todo.completed !== completed) {
        const updated = updateTodo(todo.id, { completed });
        if (updated.success) {
          updatedTodos.push(updated.todo);
        }
      }
    });
    
    return {
      success: true,
      updated: updatedTodos.length,
      todos: updatedTodos
    };
  }
  
  /**
   * 🔍 FILTERING AND SORTING
   */
  
  function getFilteredTodos() {
    let filtered = [...todos];
    
    // Apply filter
    switch (currentFilter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'all':
      default:
        // No filter
        break;
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'priority':
          return b.priority - a.priority;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate - b.dueDate;
        case 'created':
        default:
          return b.createdAt - a.createdAt;
      }
    });
    
    return filtered.map(todo => ({ ...todo }));
  }
  
  function setFilter(filter) {
    const validFilters = ['all', 'active', 'completed'];
    
    if (!validFilters.includes(filter)) {
      throw new Error(`Filter must be one of: ${validFilters.join(', ')}`);
    }
    
    const oldFilter = currentFilter;
    currentFilter = filter;
    publishEvent('filter:changed', { old: oldFilter, new: filter });
    
    return currentFilter;
  }
  
  function setSort(sort) {
    const validSorts = ['created', 'priority', 'dueDate'];
    
    if (!validSorts.includes(sort)) {
      throw new Error(`Sort must be one of: ${validSorts.join(', ')}`);
    }
    
    const oldSort = currentSort;
    currentSort = sort;
    publishEvent('sort:changed', { old: oldSort, new: sort });
    
    return currentSort;
  }
  
  function searchTodos(query) {
    if (!query || typeof query !== 'string') {
      return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    return todos
      .filter(todo => 
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description.toLowerCase().includes(searchTerm) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
      .map(todo => ({ ...todo }));
  }
  
  function getTodosByTag(tag) {
    if (!tag || typeof tag !== 'string') {
      return [];
    }
    
    const tagLower = tag.toLowerCase().trim();
    
    return todos
      .filter(todo => 
        todo.tags.some(t => t.toLowerCase() === tagLower)
      )
      .map(todo => ({ ...todo }));
  }
  
  function getTodosByPriority(priority) {
    if (!Object.values(PRIORITIES).includes(priority)) {
      return [];
    }
    
    return todos
      .filter(todo => todo.priority === priority)
      .map(todo => ({ ...todo }));
  }
  
  /**
   * 📊 STATISTICS AND ANALYTICS
   */
  
  function getStats() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const stats = {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      active: todos.filter(t => !t.completed).length,
      overdue: todos.filter(t => 
        !t.completed && 
        t.dueDate && 
        t.dueDate < today
      ).length,
      dueToday: todos.filter(t => 
        !t.completed && 
        t.dueDate && 
        t.dueDate.toDateString() === today.toDateString()
      ).length,
      highPriority: todos.filter(t => t.priority >= PRIORITIES.HIGH).length,
      byPriority: {},
      byTag: {}
    };
    
    // Count by priority
    Object.values(PRIORITIES).forEach(priority => {
      stats.byPriority[priority] = todos.filter(t => t.priority === priority).length;
    });
    
    // Count by tag
    const tagCounts = new Map();
    todos.forEach(todo => {
      todo.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    
    stats.byTag = Object.fromEntries(tagCounts);
    
    return stats;
  }
  
  function getCompletionRate() {
    if (todos.length === 0) return 0;
    return (todos.filter(t => t.completed).length / todos.length) * 100;
  }
  
  function getProductivity(days = 7) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const recentTodos = todos.filter(t => t.createdAt >= cutoff);
    const completedRecently = recentTodos.filter(t => t.completed);
    
    return {
      period: `${days} days`,
      created: recentTodos.length,
      completed: completedRecently.length,
      rate: recentTodos.length > 0 ? 
        (completedRecently.length / recentTodos.length) * 100 : 0,
      todos: recentTodos.map(t => ({ ...t }))
    };
  }
  
  /**
   * 🎯 EVENT SYSTEM
   */
  
  const eventListeners = new Map();
  
  function publishEvent(event, data) {
    const listeners = eventListeners.get(event) || [];
    
    listeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
    
    // Also publish to wildcard listeners
    const wildcardListeners = eventListeners.get('*') || [];
    wildcardListeners.forEach(listener => {
      try {
        listener({ event, data });
      } catch (error) {
        console.error('Error in wildcard event listener:', error);
      }
    });
  }
  
  function subscribe(event, listener) {
    if (!eventListeners.has(event)) {
      eventListeners.set(event, []);
    }
    
    eventListeners.get(event).push(listener);
    
    // Return unsubscribe function
    return () => {
      const listeners = eventListeners.get(event) || [];
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }
  
  /**
   * 🖥️ UI RENDERING (Basic DOM manipulation)
   */
  
  function renderTodoItem(todo) {
    const item = document.createElement('div');
    item.className = `todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`;
    item.dataset.id = todo.id;
    
    const priorityLabels = {
      1: 'Low',
      2: 'Medium',
      3: 'High',
      4: 'Urgent'
    };
    
    const dueDateText = todo.dueDate ? 
      `Due: ${todo.dueDate.toLocaleDateString()}` : 
      'No due date';
    
    const isOverdue = todo.dueDate && !todo.completed && 
                     new Date(todo.dueDate) < new Date();
    
    item.innerHTML = `
      <div class="todo-checkbox">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} 
               data-action="toggle">
      </div>
      <div class="todo-content">
        <div class="todo-title">${escapeHtml(todo.title)}</div>
        ${todo.description ? `<div class="todo-description">${escapeHtml(todo.description)}</div>` : ''}
        <div class="todo-meta">
          <span class="todo-priority priority-${todo.priority}">
            ${priorityLabels[todo.priority]}
          </span>
          <span class="todo-due-date ${isOverdue ? 'overdue' : ''}">
            ${dueDateText}
          </span>
          ${todo.tags.length > 0 ? `
            <div class="todo-tags">
              ${todo.tags.map(tag => `<span class="todo-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
      <div class="todo-actions">
        <button class="btn-edit" data-action="edit" title="Edit">✏️</button>
        <button class="btn-delete" data-action="delete" title="Delete">🗑️</button>
      </div>
    `;
    
    return item;
  }
  
  function renderTodoList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    elements.container = container;
    
    // Clear container
    container.innerHTML = '';
    
    // Get filtered todos
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'todo-empty';
      emptyMessage.textContent = getEmptyMessage();
      container.appendChild(emptyMessage);
      return;
    }
    
    // Render todos
    filteredTodos.forEach(todo => {
      container.appendChild(renderTodoItem(todo));
    });
    
    // Update stats display
    updateStatsDisplay();
  }
  
  function getEmptyMessage() {
    switch (currentFilter) {
      case 'active':
        return 'No active todos. Add a new one or complete some todos!';
      case 'completed':
        return 'No completed todos yet. Start checking things off!';
      default:
        return 'No todos yet. Add your first todo to get started!';
    }
  }
  
  function updateStatsDisplay() {
    const stats = getStats();
    const statsElement = document.getElementById('todo-stats');
    
    if (statsElement) {
      statsElement.innerHTML = `
        <div class="stat-item">
          <span class="stat-label">Total:</span>
          <span class="stat-value">${stats.total}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Active:</span>
          <span class="stat-value">${stats.active}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Completed:</span>
          <span class="stat-value">${stats.completed}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Overdue:</span>
          <span class="stat-value ${stats.overdue > 0 ? 'overdue' : ''}">${stats.overdue}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Completion:</span>
          <span class="stat-value">${getCompletionRate().toFixed(1)}%</span>
        </div>
      `;
    }
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * 🎮 INITIALIZATION AND SETUP
   */
  
  function init(options = {}) {
    // Load from storage
    loadFromStorage();
    
    // Set up event delegation
    if (options.containerId) {
      setupEventDelegation(options.containerId);
    }
    
    // Publish init event
    publishEvent('app:initialized', {
      todos: getAllTodos(),
      stats: getStats(),
      filter: currentFilter,
      sort: currentSort
    });
    
    return {
      todos: getAllTodos(),
      stats: getStats(),
      filter: currentFilter,
      sort: currentSort
    };
  }
  
  function setupEventDelegation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Store container reference
    elements.container = container;
    
    // Event delegation for todo actions
    container.addEventListener('click', (event) => {
      const target = event.target;
      const todoItem = target.closest('.todo-item');
      
      if (!todoItem) return;
      
      const todoId = parseInt(todoItem.dataset.id);
      const action = target.dataset.action;
      
      switch (action) {
        case 'toggle':
          toggleTodo(todoId);
          renderTodoList(containerId);
          break;
        case 'edit':
          // In a real app, this would open an edit form
          publishEvent('todo:edit', getTodo(todoId));
          break;
        case 'delete':
          if (confirm('Are you sure you want to delete this todo?')) {
            deleteTodo(todoId);
            renderTodoList(containerId);
          }
          break;
      }
    });
    
    // Setup filter buttons
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        setFilter(filter);
        renderTodoList(containerId);
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
    
    // Setup sort buttons
    const sortButtons = document.querySelectorAll('[data-sort]');
    sortButtons.forEach(button => {
      button.addEventListener('click', () => {
        const sort = button.dataset.sort;
        setSort(sort);
        renderTodoList(containerId);
        
        // Update active sort button
        sortButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
    
    // Setup new todo form
    const todoForm = document.getElementById('new-todo-form');
    if (todoForm) {
      todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(todoForm);
        const todoData = {
          title: formData.get('title'),
          description: formData.get('description'),
          priority: parseInt(formData.get('priority')) || PRIORITIES.MEDIUM,
          dueDate: formData.get('dueDate') ? new Date(formData.get('dueDate')) : null,
          tags: formData.get('tags') ? 
            formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag) : 
            []
        };
        
        const result = addTodo(todoData);
        if (result.success) {
          todoForm.reset();
          renderTodoList(containerId);
        } else {
          alert(`Error: ${result.error}`);
        }
      });
    }
    
    // Setup clear completed button
    const clearButton = document.getElementById('clear-completed');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        const result = clearCompleted();
        if (result.success) {
          renderTodoList(containerId);
          alert(`Cleared ${result.cleared} completed todos`);
        }
      });
    }
  }
  
  /**
   * 🚀 PUBLIC API
   */
  
  return {
    // Initialization
    init,
    
    // Todo operations
    add: addTodo,
    update: updateTodo,
    delete: deleteTodo,
    toggle: toggleTodo,
    get: getTodo,
    getAll: getAllTodos,
    getFiltered: getFilteredTodos,
    clearCompleted,
    markAllAs,
    
    // Filtering and sorting
    setFilter,
    setSort,
    search: searchTodos,
    getByTag: getTodosByTag,
    getByPriority: getTodosByPriority,
    
    // Statistics
    getStats,
    getCompletionRate,
    getProductivity,
    
    // UI
    render: renderTodoList,
    updateStats: updateStatsDisplay,
    
    // Events
    subscribe,
    
    // Storage
    save: saveToStorage,
    load: loadFromStorage,
    clearStorage,
    
    // Constants
    PRIORITIES,
    
    // Application state
    getState: () => ({
      todos: getAllTodos(),
      stats: getStats(),
      filter: currentFilter,
      sort: currentSort,
      nextId
    })
  };
})();

/**
 * 🧪 DEMONSTRATION AND TESTING
 */

function runTodoDemo() {
  console.log('📝 Todo Application Demo\n');
  
  // Initialize the app
  console.log('✅ Initializing Todo App...');
  const initialState = TodoApp.init();
  console.log('Initial state:', initialState);
  
  // Add some sample todos
  console.log('\n=== Adding Sample Todos ===');
  
  const sampleTodos = [
    {
      title: 'Learn JavaScript functions',
      description: 'Study higher-order functions and closures',
      priority: TodoApp.PRIORITIES.HIGH,
      tags: ['javascript', 'learning', 'programming']
    },
    {
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, fruits',
      priority: TodoApp.PRIORITIES.MEDIUM,
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      tags: ['shopping', 'personal']
    },
    {
      title: 'Complete project documentation',
      description: 'Write comprehensive docs for the new feature',
      priority: TodoApp.PRIORITIES.URGENT,
      dueDate: new Date(Date.now() - 86400000), // Yesterday (overdue)
      tags: ['work', 'documentation']
    },
    {
      title: 'Exercise',
      description: '30 minutes of cardio',
      priority: TodoApp.PRIORITIES.MEDIUM,
      tags: ['health', 'fitness']
    },
    {
      title: 'Read a book',
      description: 'Finish reading "Clean Code"',
      priority: TodoApp.PRIORITIES.LOW,
      tags: ['reading', 'learning']
    }
  ];
  
  sampleTodos.forEach((todo, index) => {
    const result = TodoApp.add(todo);
    console.log(`Added todo ${index + 1}:`, result.success ? '✓' : '✗', todo.title);
  });
  
  // Demonstrate operations
  console.log('\n=== Todo Operations ===');
  
  // Get all todos
  console.log('All todos:', TodoApp.getAll().length);
  
  // Get stats
  const stats = TodoApp.getStats();
  console.log('Statistics:', stats);
  
  // Mark first todo as completed
  const firstTodo = TodoApp.getAll()[0];
  if (firstTodo) {
    TodoApp.toggle(firstTodo.id);
    console.log(`Toggled "${firstTodo.title}":`, 
      TodoApp.get(firstTodo.id).completed ? 'completed' : 'active');
  }
  
  // Search todos
  console.log('\n=== Searching ===');
  const searchResults = TodoApp.search('javascript');
  console.log('Search for "javascript":', searchResults.length, 'results');
  
  // Filter by tag
  console.log('\n=== Filtering by Tag ===');
  const workTodos = TodoApp.getByTag('work');
  console.log('Todos with "work" tag:', workTodos.length);
  
  // Filter by priority
  console.log('\n=== Filtering by Priority ===');
  const highPriorityTodos = TodoApp.getByPriority(TodoApp.PRIORITIES.HIGH);
  console.log('High priority todos:', highPriorityTodos.length);
  
  // Set filter to active
  console.log('\n=== Changing Filter ===');
  TodoApp.setFilter('active');
  const activeTodos = TodoApp.getFiltered();
  console.log('Active todos:', activeTodos.length);
  
  // Set sort by priority
  console.log('\n=== Changing Sort ===');
  TodoApp.setSort('priority');
  const sortedTodos = TodoApp.getFiltered();
  console.log('Todos sorted by priority (highest first):');
  sortedTodos.forEach(todo => {
    console.log(`  - ${todo.title} (Priority: ${todo.priority})`);
  });
  
  // Get productivity
  console.log('\n=== Productivity ===');
  const productivity = TodoApp.getProductivity(7);
  console.log('Last 7 days productivity:', productivity);
  
  // Subscribe to events
  console.log('\n=== Event System ===');
  const unsubscribe = TodoApp.subscribe('todo:added', (todo) => {
    console.log(`Event: New todo added - "${todo.title}"`);
  });
  
  // Add another todo to trigger event
  TodoApp.add({
    title: 'Test event system',
    priority: TodoApp.PRIORITIES.LOW
  });
  
  // Unsubscribe
  unsubscribe();
  
  // Final state
  console.log('\n=== Final Application State ===');
  console.log(TodoApp.getState());
  
  return TodoApp;
}

/**
 * 🚀 EXPORT MODULES
 */
module.exports = {
  TodoApp,
  runTodoDemo
};

// Run demo if executed directly
if (require.main === module) {
  runTodoDemo();
  
  // For browser usage, export to window
  if (typeof window !== 'undefined') {
    window.TodoApp = TodoApp;
  }
}
