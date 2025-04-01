import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length,
    highPriority: tasks.filter(task => task.priority === 'high').length,
    completionRate: tasks.length > 0 
      ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100) 
      : 0
  }

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Fetch Single Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //Add Task
  const addTask = async(task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder}: task))
  }

  //Toggle Task Completion
  const toggleComplete = async(id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, completed: !taskToToggle.completed}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, completed: data.completed}: task))
  }

  const renderSidebar = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const activeTasks = totalTasks - completedTasks;
    const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Overview</h2>
        </div>
        <div className="sidebar-stats">
          <div className="stat-card">
            <div className="stat-number active">{activeTasks}</div>
            <div className="stat-label">Active Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number completed">{completedTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number high-priority">{highPriorityTasks}</div>
            <div className="stat-label">High Priority</div>
          </div>
        </div>
        
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-title">Overall Progress</span>
            <span className="progress-percentage">{completionRate}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <div className="progress-stat">
              <span className="progress-stat-label">Completed</span>
              <span className="progress-stat-value">{completedTasks} tasks</span>
            </div>
            <div className="progress-stat">
              <span className="progress-stat-label">Remaining</span>
              <span className="progress-stat-value">{activeTasks} tasks</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => (
    <div className="main-content">
      <div className="content-header">
        <h2>My Tasks</h2>
        <button 
          className="btn add-task-btn"
          onClick={() => setShowAddTask(!showAddTask)}
        >
          {showAddTask ? 'Close Form' : 'Add New Task'}
        </button>
      </div>
      {showAddTask && <AddTask onAdd={addTask} />}
      <Tasks 
        tasks={tasks} 
        onDelete={deleteTask} 
        onComplete={toggleComplete}
      />
    </div>
  )

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="app-content">
          {renderSidebar()}
          <div className="content-wrapper">
            <Routes>
              <Route path='/' element={renderMainContent()} />
              <Route path='/about' element={<About />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
