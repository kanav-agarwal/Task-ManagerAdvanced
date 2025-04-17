# Task Manager Code Explanation
This document provides a detailed explanation of the Task Manager Web Application code. The application is a simple but complete task management system built with HTML, CSS, and JavaScript.

## Table of Contents
1. [HTML Structure](#html-structure)
2. [CSS Styling](#css-styling)
3. [JSS Functionality](#javascript-functionality)
4. [Data Management](#data-management)
5. [Event Handling](#event-handling)

## HTML Structure
The HTML structure defines the user interface of the Task Manager Application:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager with Local Storage</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Task Manager</h1>
        <div class="input-section">
            <input type="text" id="task-input" placeholder="Add a new task...">
            <button id="add-button">Add</button>
        </div>
        <ul id="task-list">

        </ul>

        <div id="no-tasks" class="no-tasks">
            No Tasks yet! Add a task to get started.
        </div>

        <div class="status-bar">
            <span id="tasks-count">Total: 0 tasks</span>
            <span id="completed-count">Completed: 0</span>
        </div>

        <button id="clear-all" class="clear-all">Clear All Tasks</button>

        <script src="script.js"></script>
    </div>
</body>
</html>
```
Key HTML Components:
- A container `div` that wraps the entire application
- A heading that displays the title
- An input section with a text field and an "ADD" button/
- An empty unordered list (`ul`) where tasks will be displayed
- A message that shows when there are no tasks
- A status bar showing task counts
- A "Clear All Tasks" button

## CSS Styling
The CSS Styling defines the visual appearance of the Task Manager

```CSS
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

.container{
    max-width: 600px;
    margin: 0 auto;
}

h1{
    text-align: center;
    padding: 1em;
}

.input-section{
    display: flex;
    margin-bottom: 20px;
}

#task-input{
    flex: 1;
    padding: 10px;

}

#add-button{
    padding: 10px 15px;
    color: white;
    background-color: #4CAF50;
    cursor: pointer;
}

.clear-all{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    cursor: pointer;
    color: white;
    font-size: 16px;
    background-color: #ff9800;
    padding: 5px;
}

.no-tasks{
    text-align: center;
    color: #888;
    padding: 20px 0;
    font-style: italic;
}

.status-bar{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding-top: 15px;
    font-size: 16px;
}

#task-list{
    list-style-type: none;
}

.task-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background-color: #f9f9f9;
    margin-bottom: 8px;
}

.task-text{
    flex: 1;
    margin-left: 10px;
}

.completed{
    text-decoration: line-through;
    color: #888;
}

.delete-btn{
    color: white;
    background-color: #f44336;
    cursor: pointer;
    margin-left: 10px;
    padding: 5px 10px;
}
```
Key CSS features:
1. **Reset styles**: Sets default margins, padding, and box-sizing for all elements
2. **Container Styling**: Creates a centered white card with rounded corners and subtle shadow.
3. **Input Section**: Uses flexbox to position the input field and button with text **DELETE** side by side
4. **Task Items**: Styles each task with background color, spacing, and flexbox layout
5. **Button Styles**: Defines appearance for ADD, DELETE, and CLEAR ALL Buttons.
6. **Status Indicator**: Styles for completed tasks (strikethrough).
7. **Responsive Design**: Uses relative units and max-width to ensure responsive behavior.

## Javascript functionality
The JavaScript code handles all the dynamic behavior of the Task Manager:

 ### DOM Elements
```javascript
// DOM Elements
const taskInput = document.getElementById("task-input")
const addButton = document.getElementById("add-button")
const taskList = document.getElementById("task-list")
const noTasksMessage = document.getElementById("no-tasks")
const clearAllButton = document.getElementById("clear-all")
const taskCount = document.getElementById("tasks-count")
const completedCountElement = document.getElementById("completed-count")

// Task data array
let tasks = []
```

This section selects all the necessary DOM elements that will be manipulated and initializes an empty task array.

## Data Management

```javascript
// Load Tasks from localStorage when page loads
function loadTasks(){
    const savedTasks = localStorage.getItem('tasks')
    if(savedTasks){
        tasks = JSON.parse(savedTasks)
        renderTasks()
    }
}

// Save tasks to localStorage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
```
These functions handle persistent storage:
- `loadTasks()`: Retrieves tasks from localStorage when the page loads.
- `saveTasks()`: Saves the current tasks to localStorage whenever changes are made

### Task Operations
```javascript
// Add new Task
function addTask(){
    const taskText = taskInput.value.trim()
    if(taskText){
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        }
        tasks.push(newTask)
        saveTasks()
        taskInput.value = ''
        renderTasks()
    }
}

// Delete a task
function deleteTask(taskId){
    tasks = tasks.filter(function(task){
        return task.id !== taskId
    })

    saveTasks()
    renderTasks()
}

// Toggle Task Completion
function toggleTaskCompletion(taskId){
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === taskId){
            tasks[i].completed = !tasks[i].completed
            break;
        }
    }

    saveTasks()
    renderTasks()
}

// Clear all tasks
function clearAllTasks(){
    if(tasks.length > 0){
        const confirmed = confirm("Are you sure you want to delete all tasks?")
        if(confirmed){
            tasks=[]
            saveTasks()
            renderTasks()
        }
    }
}
```
These functions implement the core task operations:
- `addTask()`: Creates a new task object, adds it to the arrayand updates the UI
- `deleteTask()`: Removes a specific task by ID using array filtering
- `toggleTaskComplettion(taskID)`: Toggles the completed status of a task. 
- `clearAllTasks()`: Removes all tasks after confirmation

### UI Rendering
```javascript
// Update Task Counts
function updateTaskCounts(){
    let completedTasks = tasks.filter(function(task){
        return task.completed
    }).length
    completedCountElement.innerText = `Completed: ${completedTasks}`
    taskCount.innerText = `Total: ${tasks.length} tasks`
}

// Render Tasks
function renderTasks(){
    taskList.innerHTML = ''
    if(tasks.length != 0){
        noTasksMessage.style.display = 'none'
        tasks.forEach(function(task){
            const li = document.createElement('li')
            li.className = 'task-item'

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.checked = task.completed
            checkbox.addEventListener('change', function(){
                toggleTaskCompletion(task.id)
            })

            const span = document.createElement('span')
            span.className = task.completed ? 'task-text completed' : 'task-text'
            span.textContent = task.text

            const deleteButton = document.createElement('button')
            deleteButton.className = 'delete-btn'
            deleteButton.textContent = 'Delete'
            deleteButton.addEventListener('click', function(){
                deleteTask(task.id)
            })

            li.appendChild(checkbox)
            li.appendChild(span)
            li.appendChild(deleteButton)
            taskList.appendChild(li)
        })
    }

    updateTaskCounts()
}
```
These functins handle UI updates:
- `updateTaskCounts()`: Calculates and displays the total and completed task counts
- `renderTasks()`: Recreated the entire task list in the DOM based on the current data.


## Event Handling
```javascript
// Event Listeners
clearAllButton.addEventListener('click', clearAllTasks)
addButton.addEventListener('click', addTask)
taskInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        addTask()
    }
}) 
loadTasks()
```

The final section sets up event listeners:
- Click Handler for the ADD button
- Keypress handler for the Enter key in the input field
- Click handler for the Clear All Button
- Initiall call `loadTasks()` to load tasks when the page loads

### Data Management
The application uses a simple but effective data structure:
1. **Task Object Structure**: 
    ```javascript
    {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    }
    ```
2. **Storage Method**:
    - The Application uses `localStorage` for persistent storage
    - Tasks are stored as a JSON string and parsed back to an array when needed.
    - This allows tasks to persist even when the browser is closed and reopened

## Event Flow
The typical flow of operation is:
1. User adds a task -> `addTasks()` -> `saveTasks()` -> `renderTasks()`
2. User toggles completion -> `toggleTaskCompletion()` -> `saveTasks()` -> `renderTasks()`
3. User deletes a task -> `deleteTask()` -> `saveTasks()` -> `renderTasks()`
4. User clears all tasks -> `clearAllTasks()` -> `saveTasks()` -> `renderTasks()`

This pattern ensures that:
1. The data model (tasks array) is updated first
2. Changes are persisted to localStorage
3. The UI is updated to reflect the current state.