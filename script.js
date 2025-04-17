const taskInput = document.getElementById("task-input")
const addButton = document.getElementById("add-button")
const taskList = document.getElementById("task-list")
const noTasksMessage = document.getElementById("no-tasks")
const clearAllButton = document.getElementById("clear-all")
const taskCount = document.getElementById("tasks-count")
const completedCountElement = document.getElementById("completed-count")

let tasks = []

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

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

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

function deleteTask(taskId){
    tasks = tasks.filter(function(task){
        return task.id !== taskId
    })

    saveTasks()
    renderTasks()
}

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

function loadTasks(){
    const savedTasks = localStorage.getItem('tasks')
    if(savedTasks){
        tasks = JSON.parse(savedTasks)
        renderTasks()
    }
}

function updateTaskCounts(){
    let completedTasks = tasks.filter(function(task){
        return task.completed
    }).length
    completedCountElement.innerText = `Completed: ${completedTasks}`
    taskCount.innerText = `Total: ${tasks.length} tasks`
}

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

clearAllButton.addEventListener('click', clearAllTasks)
addButton.addEventListener('click', addTask)
taskInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        addTask()
    }
}) 
loadTasks()
