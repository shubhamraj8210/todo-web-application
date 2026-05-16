document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskDatetime = document.getElementById('task-datetime');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const dateTimeValue = taskDatetime.value;

        if (taskText === '') {
            alert('Please enter a task description.');
            return;
        }

        const li = document.createElement('li');

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = taskText;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date';
        
        if (dateTimeValue) {
            const dateObj = new Date(dateTimeValue);
            dateSpan.textContent = `Due: ${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        } else {
            dateSpan.textContent = 'No date/time set';
        }

        taskDetails.appendChild(textSpan);
        taskDetails.appendChild(dateSpan);

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        completeBtn.className = 'action-btn complete-btn';
        completeBtn.onclick = () => li.classList.toggle('completed');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'action-btn edit-btn';
        editBtn.onclick = () => editTask(textSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.onclick = () => li.remove();

        taskActions.appendChild(completeBtn);
        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);

        li.appendChild(taskDetails);
        li.appendChild(taskActions);

        taskList.appendChild(li);

        taskInput.value = '';
        taskDatetime.value = '';
    }

    function editTask(textElement) {
        const currentText = textElement.textContent;
        const newText = prompt('Edit your task:', currentText);
        if (newText !== null && newText.trim() !== '') {
            textElement.textContent = newText.trim();
        }
    }
});