document.addEventListener('DOMContentLoaded', function() {
    const addTodoBtn = document.getElementById('addTodoBtn');
    const modal = document.getElementById('addModal');
    const closeBtn = document.querySelector('.close');
    const addTodoForm = document.getElementById('addTodoForm');
    const sortByPriority = document.getElementById('sortByPriority');
    const sortByEndDate = document.getElementById('sortByEndDate');
    const todoList = document.getElementById('todoList');
    let todos = [];

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    addTodoBtn.addEventListener('click', openModal);

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    addTodoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoName = document.getElementById('todoName').value;
        const todoDescription = document.getElementById('todoDescription').value;
        const todoEndDate = document.getElementById('todoEndDate').value;
        const todoStatus = document.getElementById('todoStatus').value;
        const todoPriority = document.getElementById('todoPriority').value;
        const todo = {
            name: todoName,
            description: todoDescription,
            endDate: todoEndDate,
            status: todoStatus,
            priority: todoPriority
        };
        todos.push(todo);
        renderTodos();
        closeModal();
        addTodoForm.reset();
    });

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${todo.name}</td>
                <td>${todo.description}</td>
                <td>${todo.endDate}</td>
                <td>${todo.status}</td>
                <td>${todo.priority}</td>
                <td>
                    <button class="editBtn" data-index="${index}">Edit</button>
                    <button class="deleteBtn" data-index="${index}">Delete</button>
                    <button class="completeBtn" data-index="${index}">Complete</button>
                </td>
            `;
            todoList.appendChild(tr);
        });
    }
});
