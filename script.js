const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

// Recuperar tarefas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Criar lista
function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.className = "left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("done");

    left.appendChild(checkbox);
    left.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Excluir";
    delBtn.className = "delete";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(left);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Salvar
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adicionar tarefa
form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    saveTasks();
    renderTasks();
    input.value = "";
  }
});

// Iniciar
renderTasks();