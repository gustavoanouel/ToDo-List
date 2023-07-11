// Contador para generar IDs únicos
let taskIdCounter = 0;

// Tareas por defecto (como objetos)
const defaultTasks = [
  { text: "Pasear al perro", completed: false },
  { text: "Limpiar la cocina", completed: false },
  { text: "Comprar el arroz", completed: false },
];

// Contenedor de tareas
const listContainer = document.getElementById("list");

// Input de texto y botón de agregar
const inputText = document.getElementById("inputText");
const addBtn = document.getElementById("addBtn");

// Elemento para mostrar el contador de tareas
const statsElement = document.getElementById("stats");

// Tareas totales y realizadas
let totalTasks = 0;
let completedTasks = 0;
let tasks = [];

// Función para generar un ID único
function generateTaskId() {
  return taskIdCounter++;
}

// Función para agregar una tarea al arreglo de tareas
function addTask(taskText) {
  // Generar un ID único para la tarea
  const taskId = generateTaskId();

  // Crear un objeto tarea con el texto, el ID y el estado completado
  const task = {
    id: taskId,
    text: taskText,
    completed: false,
  };

  // Agregar la tarea al arreglo de tareas
  tasks.push(task);

  // Actualizar el contador de tareas
  totalTasks++;
  updateStats();

  // Renderizar el DOM
  render();
}

// Función para eliminar una tarea del arreglo de tareas
function deleteTask(taskId) {
  // Encontrar la tarea correspondiente en el arreglo
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  // Si se encontró la tarea, se elimina del arreglo
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);

    // Actualizar el contador de tareas
    totalTasks--;
    if (tasks[taskIndex] && tasks[taskIndex].completed) {
      completedTasks--;
    }
    updateStats();

    // Renderizar el DOM
    render();
  }

  // Si no hay más tareas, vaciar el contenedor de tareas
  if (tasks.length === 0) {
    listContainer.innerHTML = "";
  }
}

// Función para marcar una tarea como completada
function toggleTaskComplete(taskId) {
  // Encontrar la tarea correspondiente en el arreglo
  const task = tasks.find((task) => task.id === taskId);

  // Si se encontró la tarea, se cambia el estado de completado
  if (task) {
    task.completed = !task.completed;

    // Actualizar el contador de tareas completadas
    completedTasks = tasks.filter((task) => task.completed).length;
    updateStats();

    // Renderizar el DOM
    render();
  }
}

// Función para generar el HTML de una tarea
function generateTaskHTML(task) {
  const checkedAttribute = task.completed ? "checked" : "";
  return `
    <div class="task-container" id="${task.id}">
      <label>
        <input type="checkbox" ${checkedAttribute} onchange="toggleTaskComplete(${task.id})" />
        <span class="task-id">ID: ${task.id}  |   </span> ${task.text}
      </label>
      <button class="delete-btn" type="button" onclick="deleteTask(${task.id})">
        <i class="fa-regular fa-trash-can "></i>
      </button>
    </div>
  `;
}

// Función para renderizar el DOM
function render() {
  // Generar el HTML de las tareas
  const tasksHTML = tasks.map((task) => generateTaskHTML(task)).join("");

  // Actualizar el contenido del contenedor de tareas
  listContainer.innerHTML = tasksHTML;
}

// Función para actualizar el contador de tareas
function updateStats() {
  statsElement.innerHTML = `Tareas totales: ${totalTasks} | Tareas realizadas: ${completedTasks}`;
}

// Agregar las tareas por defecto al cargar la página
defaultTasks.forEach((task) => {
  addTask(task.text);
});

// Agregar una tarea cuando se hace clic en el botón de agregar
addBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const taskText = inputText.value.trim();
  if (taskText === "") {
    alert("Ingrese una tarea correctamente");
    inputText.value = "";
  } else {
    addTask(taskText);
    inputText.value = "";
  }
});

// Renderizar el DOM inicial
render();
