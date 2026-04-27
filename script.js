const todoForm = document.getElementById("todoForm"); //This connects to the input box
const todoInput = document.getElementById("todoInput"); //This connects to the text in the input box
const todoList = document.getElementById("todoList"); // This connects to the list log
const totalTasks = document.getElementById("totalTasks"); //This connects to the total task
const completedTasks = document.getElementById("completedTasks"); //This connects to the number of completed task

let todos = [];
//This is for when you submit a item into the list
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = todoInput.value.trim();

  if (text) {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    todos.push(todo);
    renderTodo(todo);
    updateStats();
    todoInput.value = "";
  }
});

function renderTodo(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  const span = document.createElement("span");
  span.textContent = todo.text;
  if (todo.completed) span.classList.add("completed");
  //Delete button icon
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";

  li.append(checkbox, span, deleteBtn);
  todoList.appendChild(li);
  //When you click on the small bow on the left of a list item, it will be crossed out and seen as completed.
  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    span.classList.toggle("completed");
    updateStats();
  });
  // This button deletes a list item
  deleteBtn.addEventListener("click", function () {
    todos = todos.filter((t) => t.id !== todo.id);
    li.remove();
    updateStats();
  });
}

function updateStats() {
  const completed = todos.filter((todo) => todo.completed).length;
  totalTasks.textContent = `Total: ${todos.length}`;
  completedTasks.textContent = `Completed: ${completed}`;
}
