document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('task-input');
    var taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        var taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onclick = function () {
            taskText.classList.toggle('complete', checkbox.checked);
            saveTasks();
        };

        var taskText = document.createElement('span');
        taskText.textContent = taskInput.value;

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            var newText = prompt('Edit task:', taskText.textContent);
            if (newText !== null) {
                taskText.textContent = newText;
                saveTasks();
            }
        };

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            taskList.removeChild(taskItem);
            saveTasks();
        };

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

        taskInput.value = '';

        saveTasks();
    }
}

function deleteCompleted() {
    var taskList = document.getElementById('task-list');
    var completedTasks = document.querySelectorAll('.complete');

    completedTasks.forEach(function (completedTask) {
        taskList.removeChild(completedTask.parentNode);
    });

    saveTasks();
}

function filterTasks(filter) {
    var taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(function (taskItem) {
        var isCompleted = taskItem.querySelector('input[type="checkbox"]').checked;

        switch (filter) {
            case 'active':
                taskItem.classList.toggle('hidden', isCompleted);
                break;
            case 'completed':
                taskItem.classList.toggle('hidden', !isCompleted);
                break;
            default:
                taskItem.classList.remove('hidden');
                break;
        }
    });

    var filterButtons = document.querySelectorAll('#filter-buttons button');
    filterButtons.forEach(function (button) {
        button.classList.remove('active');
    });

    document.querySelector(`#filter-buttons button[data-filter="${filter}"]`).classList.add('active');
}

function saveTasks() {
    var taskList = document.getElementById('task-list').innerHTML;
    localStorage.setItem('tasks', taskList);
}

function loadTasks() {
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        document.getElementById('task-list').innerHTML = savedTasks;
    }
}