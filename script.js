document.addEventListener('DOMContentLoaded', function() {
    const addTodoBtn = document.getElementById('addTodoBtn');
    const modal = document.getElementById('addModal');
    const closeBtn = document.querySelector('.close');
    const addTodoForm = document.getElementById('addTodoForm');
    const modalControls = document.getElementById('modalControls');
    const sortByPriority = document.getElementById('sortByPriority');
    const sortByEndDate = document.getElementById('sortByEndDate');
    const todoList = document.getElementById('todoList');
    let todos = [];
    renderTodos();

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

    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('editBtn')) {
            const index = event.target.getAttribute('data-index');
            const todoToEdit = todos[index];
            populateEditModal(todoToEdit, index);
            openModal();
        } else if (event.target.classList.contains('deleteBtn')) {
            const index = event.target.getAttribute('data-index');
            todos.splice(index, 1);
            renderTodos();
        } else if (event.target.classList.contains('completeBtn')) {
            const index = event.target.getAttribute('data-index');
            todos[index].status = 'Done';
            renderTodos();
        }
    });

    function populateEditModal(todo, index) {
        document.getElementById('todoName').value = todo.name;
        document.getElementById('todoDescription').value = todo.description;
        document.getElementById('todoEndDate').value = todo.endDate;
        document.getElementById('todoStatus').value = todo.status;
        document.getElementById('todoPriority').value = todo.priority;

        const submitBtn = document.querySelector('.submitEditBtn');
        if (submitBtn) {
            submitBtn.remove();
        }
        
        const saveChangesBtn = document.createElement('button');
        saveChangesBtn.textContent = 'Save Changes';
        saveChangesBtn.classList.add('submitEditBtn');
        modalControls.appendChild(saveChangesBtn);

        saveChangesBtn.addEventListener('click', function() {
            todos[index].name = document.getElementById('todoName').value;
            todos[index].description = document.getElementById('todoDescription').value;
            todos[index].endDate = document.getElementById('todoEndDate').value;
            todos[index].status = document.getElementById('todoStatus').value;
            todos[index].priority = document.getElementById('todoPriority').value;
            renderTodos();
            closeModal();
            addTodoForm.reset();
            saveChangesBtn.remove();
        });
    }

    sortByPriority.addEventListener('click', function() {
        todos.sort((a, b) => {
            const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        renderTodos();
    });

    sortByEndDate.addEventListener('click', function() {
        todos.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
        renderTodos();
    });
});
