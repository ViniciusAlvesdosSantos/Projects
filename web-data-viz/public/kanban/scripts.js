const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadlineInput = document.getElementById('deadline');
const $columnInput = document.getElementById('column');
const $idInput = document.getElementById("idInput");

const $creationModeTitle = document.getElementById('creationModeTitle');
const $editingModeTitle = document.getElementById('editingModeTitle');

const $creationModeBtn = document.getElementById('creationModeBtn');
const $editingModeBtn = document.getElementById('editingModeBtn');

var tasks = localStorage.getItem("tasks");

var taskList = tasks ? JSON.parse(tasks) : [];

generateCards();

function openModal(data_column) {
  $modal.style.display = "flex";

  $columnInput.value = data_column;

  $creationModeTitle.style.display = "block";
  $creationModeBtn.style.display = "block";

  $editingModeTitle.style.display = "none";
  $editingModeBtn.style.display = "none";
}

function openModalToEdit(id) {
  $modal.style.display = "flex";

  $creationModeTitle.style.display = "none";
  $creationModeBtn.style.display = "none";

  $editingModeTitle.style.display = "block";
  $editingModeBtn.style.display = "block";

  const index = taskList.findIndex(function(task) {
    return task.id == id;
  });

  const task = taskList[index];

  $idInput.value = task.id;
  $descriptionInput.value = task.description;
  $priorityInput.value = task.priority;
  $deadlineInput.value = task.deadline;
  $columnInput.value = task.column;
}

function closeModal() {
  $modal.style.display = "none";

  $idInput.value = "";
  $descriptionInput.value = "";
  $priorityInput.value = "";
  $deadlineInput.value = "";
  $columnInput.value = "";
}

function resetColumns() {
  document.querySelector('[data-column="1"] .body .cards_list').innerHTML = '';
  document.querySelector('[data-column="2"] .body .cards_list').innerHTML = '';
  document.querySelector('[data-column="3"] .body .cards_list').innerHTML = '';
  document.querySelector('[data-column="4"] .body .cards_list').innerHTML = '';
}

function generateCards() {

  resetColumns();

  taskList.forEach(function(task) {
    const formattedDate = moment(task.deadline).format('DD/MM/YYYY');

    const columnBody = document.querySelector(`[data-column="${task.column}"] .body .cards_list`);

    const card = `
      <div
        id="${task.id}"
        class="card"
        ondblclick="openModalToEdit(${task.id})"
        draggable="true"
        ondragstart="dragstart_handler(event)"
      >
        <div class="info">
          <b>Descrição:</b>
          <span>${task.description}</span>
        </div>

        <div class="info">
          <b>Prioridade:</b>
          <span>${task.priority}</span>
        </div>

        <div class="info">
          <b>Prazo:</b>
          <span>${formattedDate}</span>
        </div>
      </div>
    `;

    columnBody.innerHTML += card;
  });
}

function createTask() {
  const newTask = {
    id: Math.floor(Math.random() * 9999999),
    description: $descriptionInput.value,
    priority: $priorityInput.value,
    deadline: $deadlineInput.value,
    column: $columnInput.value,
  }

  taskList.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(taskList));

  closeModal();
  generateCards();
}

function updateTask() {
  const task = {
    id: $idInput.value,
    description: $descriptionInput.value,
    priority: $priorityInput.value,
    deadline: $deadlineInput.value,
    column: $columnInput.value,
  }

  const index = taskList.findIndex(function(task) {
    return task.id == $idInput.value;
  });

  taskList[index] = task;

  localStorage.setItem("tasks", JSON.stringify(taskList));

  closeModal();
  generateCards();
}

function changeColumn(task_id, column_id) {
  if (task_id && column_id) {
    taskList = taskList.map((task) => {
      if (task_id != task.id) return task;
  
      return {
        ...task,
        column: column_id,
      };
    });
  }

  localStorage.setItem("tasks", JSON.stringify(taskList));

  generateCards();
}

function dragstart_handler(ev) {
  console.log(ev);

  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("my_custom_data", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const task_id = ev.dataTransfer.getData("my_custom_data");
  const column_id = ev.target.dataset.column;
  
  changeColumn(task_id, column_id);
}
