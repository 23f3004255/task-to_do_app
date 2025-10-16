function getTodos() {
  const tds = localStorage.getItem('todos');
  return tds ? JSON.parse(tds) : [];
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  const todos = getTodos();
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' todo-completed' : '');
    
    const label = document.createElement('span');
    label.className = 'todo-label';
    label.textContent = todo.text;
    label.onclick = () => {
      todos[idx].completed = !todos[idx].completed;
      saveTodos(todos);
      renderTodos();
    };
    li.appendChild(label);
    
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '✕';
    delBtn.title = 'Delete';
    delBtn.onclick = () => {
      todos.splice(idx, 1);
      saveTodos(todos);
      renderTodos();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

document.getElementById('todo-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text.length === 0) return;
  const todos = getTodos();
  todos.push({ text, completed: false });
  saveTodos(todos);
  input.value = '';
  renderTodos();
});

document.addEventListener('DOMContentLoaded', renderTodos);