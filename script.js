// Initialize Supabase client
const SUPABASE_URL = 'https://ztubugvjkspfsjollrpf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dWJ1Z3Zqa3NwZnNqb2xscnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NjIxOTEsImV4cCI6MjA3ODAzODE5MX0.5735DKY8AVPMGmnYdKxCeIRUsYRSwn1G_kdPaTYjnPo';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get DOM elements
const authContainer = document.getElementById('authContainer');
const appContainer = document.getElementById('appContainer');
const emailInput = document.getElementById('emailInput');
const authBtn = document.getElementById('authBtn');
const authMessage = document.getElementById('authMessage');
const userEmail = document.getElementById('userEmail');
const signOutBtn = document.getElementById('signOutBtn');
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let todos = [];
let currentFilter = 'all';
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is already logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        handleAuthSuccess(session.user);
    }
    
    // Listen for auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
            handleAuthSuccess(session.user);
        } else if (event === 'SIGNED_OUT') {
            handleSignOut();
        }
    });
});

// Authentication event listeners
authBtn.addEventListener('click', sendMagicLink);
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMagicLink();
    }
});

signOutBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
        alert('Failed to sign out. Please try again.');
    }
});

// Todo app event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Authentication functions
async function sendMagicLink() {
    const email = emailInput.value.trim();
    
    if (!email) {
        showAuthMessage('Please enter your email address.', 'error');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showAuthMessage('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
    }
    
    authBtn.disabled = true;
    authBtn.textContent = 'Sending...';
    
    const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: window.location.origin
        }
    });
    
    authBtn.disabled = false;
    authBtn.textContent = 'Send Magic Link';
    
    if (error) {
        console.error('Error sending magic link:', error);
        showAuthMessage('Failed to send magic link. Please try again.', 'error');
        return;
    }
    
    showAuthMessage('Check your email! We sent you a magic link to sign in.', 'success');
    emailInput.value = '';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAuthMessage(message, type) {
    authMessage.textContent = message;
    authMessage.className = `auth-message ${type}`;
    authMessage.style.display = 'block';
}

function handleAuthSuccess(user) {
    currentUser = user;
    authContainer.style.display = 'none';
    appContainer.style.display = 'block';
    userEmail.textContent = user.email;
    
    // Load todos for this user
    loadTodos();
    renderTodos();
}

function handleSignOut() {
    currentUser = null;
    todos = [];
    authContainer.style.display = 'flex';
    appContainer.style.display = 'none';
    authMessage.style.display = 'none';
    emailInput.value = '';
}

// Todo functions
async function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        todoInput.focus();
        return;
    }
    
    if (!currentUser) {
        alert('Please sign in to add todos.');
        return;
    }
    
    // Insert into Supabase with user_id
    const { data, error } = await supabase
        .from('todos')
        .insert([{ 
            text: text, 
            completed: false,
            user_id: currentUser.id 
        }])
        .select();
    
    if (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add todo. Please try again.');
        return;
    }
    
    todoInput.value = '';
    await loadTodos();
    renderTodos();
    todoInput.focus();
}

async function deleteTodo(id) {
    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
    
    if (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo. Please try again.');
        return;
    }
    
    await loadTodos();
    renderTodos();
}

async function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;
    
    const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id);
    
    if (error) {
        console.error('Error updating todo:', error);
        alert('Failed to update todo. Please try again.');
        return;
    }
    
    await loadTodos();
    renderTodos();
}

async function clearCompleted() {
    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('completed', true)
        .eq('user_id', currentUser.id);
    
    if (error) {
        console.error('Error clearing completed todos:', error);
        alert('Failed to clear completed todos. Please try again.');
        return;
    }
    
    await loadTodos();
    renderTodos();
}

function getFilteredTodos() {
    switch(currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li class="empty-state">No tasks to show</li>';
    } else {
        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </li>
        `).join('');
    }
    
    updateCounter();
}

function updateCounter() {
    const activeTodos = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeTodos} ${activeTodos === 1 ? 'task' : 'tasks'} remaining`;
}

async function loadTodos() {
    if (!currentUser) {
        todos = [];
        return;
    }
    
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: true });
    
    if (error) {
        console.error('Error loading todos:', error);
        todos = [];
        return;
    }
    
    todos = data || [];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
