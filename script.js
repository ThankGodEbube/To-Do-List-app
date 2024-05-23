'use strict'

const addBtn = document.getElementById('add-btn')
const newTaskInput = document.querySelector('#wrapper input')
const tasksContainer = document.querySelector('#tasks')
const error = document.getElementById('error')
const countValue = document.querySelector('.count-value')

let taskCount = 0

// const displayCount = (taskCount) => {
//   countValue.innerText = taskCount
// }

// localStorage.removeItem('tasks')

// Function to store tasks in local storage
const storeTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Function to retrieve tasks from local storage
const getStoredTasks = () => {
  const storedTasks = localStorage.getItem('tasks')
  return storedTasks ? JSON.parse(storedTasks) : []
}

// Function to render tasks
const renderTasks = (tasks) => {
  tasksContainer.innerHTML = ''
  tasks.forEach((task) => {
    const taskElement = `
      <div class='task'>
        <input type='checkbox' class='task-check'>
        <span class='taskname'>${task.name}</span>
        <button class='edit'>
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class='delete'>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>`

    tasksContainer.insertAdjacentHTML('beforeend', taskElement)
  })
  addEventListenersToTasks()
}

// Add event listeners to tasks (delete, edit, check)
const addEventListenersToTasks = () => {
  const deleteButtons = document.querySelectorAll('.delete')

  deleteButtons.forEach((button, index) => {
    button.onclick = () => {
      const tasks = getStoredTasks()
      tasks.splice(index, 1)
      storeTasks(tasks)
      renderTasks(tasks)
      taskCount -= 1
      // displayCount(taskCount)
    }
  })

  const editButtons = document.querySelectorAll('.edit')
  editButtons.forEach((editBtn, index) => {
    editBtn.onclick = (e) => {
      const tasks = getStoredTasks()
      let targetElement = e.target
      if (!(e.target.className == 'edit')) {
        targetElement = e.target.parentElement
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText
      tasks.splice(index, 1)
      storeTasks(tasks)
      renderTasks(tasks)
      taskCount -= 1
      // displayCount(taskCount)
    }
  })

  const tasksCheck = document.querySelectorAll('.task-check')
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle('completed')
      if (checkBox.checked) {
        taskCount -= 1
      } else {
        taskCount += 1
      }
      // displayCount(taskCount)
    }
  })
}

// Function to add a new task
const addTask = () => {
  const taskName = newTaskInput.value.trim()
  error.style.display = 'none'
  if (!taskName) {
    setTimeout(() => {
      error.style.display = 'block'
    }, 200)
    return
  }

  const task = { name: taskName }

  const tasks = getStoredTasks()
  tasks.push(task)
  storeTasks(tasks)

  renderTasks(tasks)

  taskCount += 1
  // displayCount(taskCount)
  newTaskInput.value = ''
}

addBtn.addEventListener('click', addTask)

window.onload = () => {
  const storedTasks = getStoredTasks()
  taskCount = storedTasks.length
  renderTasks(storedTasks)
  // displayCount(taskCount)
  newTaskInput.value = ''
}

// const addTask = () => {
//   const taskName = newTaskInput.value.trim()
//   error.style.display = 'none'
//   if (!taskName) {
//     setTimeout(() => {
//       error.style.display = 'block'
//     }, 200)
//     return
//   }

//   const task = ` <div class= 'task'>
//    <input type='checkbox' class='task-check'>
//    <span class='taskname'>${taskName}</span>
//    <button class= 'edit'>
//   <i class="fa-solid fa-pen-to-square"></i>
//    </button>
//    <button class='delete'>
//   <i class="fa-solid fa-trash"></i>
//    </button>
//    </div>`
//   tasksContainer.insertAdjacentHTML('beforeend', task)

//   const deleteButtons = document.querySelectorAll('.delete')

//   deleteButtons.forEach((button) => {
//     button.onclick = () => {
//       button.parentNode.remove()
//       taskCount -= 1
//       displayCount(taskCount)
//     }
//   })

//   const editButtons = document.querySelectorAll('.edit')

//   editButtons.forEach((editBtn) => {
//     editBtn.onclick = (e) => {
//       let targetElement = e.target
//       if (!(e.target.className == 'edit')) {
//         targetElement = e.target.parentElement
//       }
//       newTaskInput.value = targetElement.previousElementSibling?.innerText
//       targetElement.parentNode.remove()
//       taskCount -= 1
//       displayCount(taskCount)
//     }
//   })
//   const tasksCheck = document.querySelectorAll('.task-check')
//   tasksCheck.forEach((checkBox) => {
//     checkBox.onchange = () => {
//       checkBox.nextElementSibling.classList.toggle('completed')
//       if (checkBox.checked) {
//         taskCount -= 1
//       } else {
//         taskCount += 1
//       }
//       displayCount(taskCount)
//     }
//   })
//   taskCount += 1
//   displayCount(taskCount)
//   newTaskInput.value = ''
// }

// addBtn.addEventListener('click', addTask)

// window.onload = () => {
//   taskCount = 0
//   displayCount(taskCount)
//   newTaskInput.value = ''
// }
