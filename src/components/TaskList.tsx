import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import { generateRandomId } from '../lib/utils'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle.trim() === '') return

    const newTodoId = generateRandomId()
    const newTask: Task = {
      id: newTodoId,
      title: newTaskTitle,
      isComplete: false
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    const toggleTaskIndex = tasks.findIndex(task => task.id === id)
    if (toggleTaskIndex === -1) return

    const task = tasks[toggleTaskIndex]
    const toggledTask: Task = {
      ...task,
      isComplete: !task.isComplete
    }

    setTasks([
      ...tasks.slice(0, toggleTaskIndex),
      toggledTask,
      ...tasks.slice(toggleTaskIndex + 1)
    ])
  }

  function handleRemoveTask(id: number) {
    const removeTaskIndex = tasks.findIndex(task => task.id === id)
    if (removeTaskIndex === -1) return

    const removeTask = tasks[removeTaskIndex]

    setTasks(tasks.filter(task => task.id !== removeTask.id))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}