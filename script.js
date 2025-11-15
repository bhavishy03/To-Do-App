let input = document.querySelector("#input");
let add = document.querySelector("#addbt");
let list = document.querySelector("#list");

// Step 1: Load tasks from storage or start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Step 2: Function to save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Step 3: Function to render tasks
function renderTasks() {
  list.innerHTML = ""; // clear old list

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;

    if (task.checked) li.classList.add("checked");

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      tasks.splice(index, 1); // remove from array
      saveTasks();
      renderTasks();
    });

    li.addEventListener("click", function () {
      task.checked = !task.checked; // toggle true/false
      saveTasks();
      renderTasks();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Step 4: Add new task
add.addEventListener("click", function () {
  let text = input.value.trim();
  if (text !== "") {
    tasks.push({ text: text, checked: false });
    saveTasks();
    renderTasks();
    input.value = "";
  }
});

// Step 5: Initial render on page load
renderTasks();
