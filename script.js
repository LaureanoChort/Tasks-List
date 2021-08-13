const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const select = document.querySelector(".filter-todo");

const addTodo = e => {
    e.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    const editTodo = document.createElement("input");
    editTodo.classList.add("hide");
    editTodo.classList.add("edit-input");
    editTodo.maxLength = "20";
    todoDiv.appendChild(editTodo);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-pen"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

const optionsButtons = e => {
    const item = e.target;
    const todo = item.parentElement;
    
    if (item.classList[0] === "delete-btn") {
        todo.classList.add("deleted");
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }

    if (item.classList[0] === "completed-btn") {
        todo.classList.toggle("completed");
    }

    if (item.classList[0] === "edit-btn") {
        let editTodo = todo.childNodes[1];
        let todoLi = todo.firstElementChild;
        let checkBtn = todo.childNodes[2];
        
        editTodo.value = todoLi.innerText;
        editTodo.classList.remove("hide");
        todoLi.classList.add("hide");
        item.firstElementChild.classList.remove("fa-pen");
        item.firstElementChild.classList.add("fa-save");
        checkBtn.classList.add("hide");
        item.addEventListener("click", () => {
            todoLi.textContent = editTodo.value;
            todoLi.classList.remove("hide");               
            editTodo.classList.add("hide");
            item.firstElementChild.classList.add("fa-pen");
            item.firstElementChild.classList.remove("fa-save");
            checkBtn.classList.remove("hide");
        });
    }
}

const filter = e => {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "todas":
                todo.style.display = "flex";
                break;
            case "completadas":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "pendientes":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }       
    });
}

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", optionsButtons);
select.addEventListener("click", filter);
