import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Task from './components/Task'

function App() {
  const [task, settask] = useState("Add a Task")
  const [todos, setTodos] = useState([])
  const [tasksContainer, setTasksContainer] = useState([])
  function handelChange(e) {
    settask(e.target.value)
  }
  function addTask() {
    let newTask = {
      id: Date.now(),
      task: task
    }
    setTodos((previousTodos) => {
      const updatedTodos = [...previousTodos, newTask]
      localStorage.setItem("Tasks", JSON.stringify(updatedTodos))
      return updatedTodos
    })
  }

  function loadTodos() {
    localStorage.setItem("Tasks", JSON.stringify(todos))
    setTasksContainer(todos)
  }


  function deleteTask(id) {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(t => t.id !== id)
      localStorage.setItem("Tasks", JSON.stringify(updatedTodos))
      return updatedTodos
    })
  }


  //initial setup to set an empty array if there is no array and load already stored tasks into todos & taskContainer state
  useEffect(() => {
    if (!localStorage.getItem("Tasks")) {
      localStorage.setItem("Tasks", JSON.stringify(todos))
    }
    const storedTasks = JSON.parse(localStorage.getItem("Tasks"))
    setTodos(storedTasks)
    setTasksContainer(storedTasks)
  }, [])

  //update taskContainer when new task is added
  useEffect(() => {
    setTasksContainer(todos)
  }, [todos])

  return (
    <div className='h-[100vmin] bg-linear-to-r from-gray-600 to-gray-900'>
      <Navbar />
      <div className="todoContainer w-full h-[96%] drop-shadow-xl drop-shadow-amber-50 flex grow justify-center items-center">
        <div className="container bg-linear-to-r from-slate-900 to-slate-800 h-160  w-[50%] flex flex-col justify-evenly gap-2 p-2">
          <div className="inputArea h-[30%] flex flex-col justify-evenly items-center">
            <input className='p-2 border-none bg-zinc-200 text-gray-900 w-[90%] h-15' type="text" name="task" value={task} onChange={handelChange} />
            <input className='border-none rounded-sm w-40 h-10 bg-gray-600 text-white' type="button" value="Add" onClick={addTask} />
          </div>
          <div className="todos overflow-y-scroll p-5 h-[70%]">
            {
              tasksContainer.map(t => (
                <Task
                  key={t.id}
                  id={t.id}
                  task={t.task}
                  onDelete={deleteTask}
                />
              ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default App





