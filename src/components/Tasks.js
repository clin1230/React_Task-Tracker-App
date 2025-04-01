import { useState } from 'react'
import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, onComplete }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [groupBy, setGroupBy] = useState('none')

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && task.completed) ||
                         (filter === 'active' && !task.completed)
    return matchesSearch && matchesFilter
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch(sortBy) {
      case 'date':
        return new Date(a.day) - new Date(b.day)
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'category':
        return a.category.localeCompare(b.category)
      default:
        return 0
    }
  })

  const groupedTasks = groupBy === 'none' ? sortedTasks : 
    sortedTasks.reduce((groups, task) => {
      const key = groupBy === 'category' ? task.category :
                 groupBy === 'priority' ? task.priority :
                 task.completed ? 'Completed' : 'Active'
      if (!groups[key]) groups[key] = []
      groups[key].push(task)
      return groups
    }, {})

  const renderTaskList = (tasks) => (
    tasks.map((task) => (
      <Task 
        key={task.id} 
        task={task} 
        onDelete={onDelete} 
        onToggle={onToggle}
        onComplete={onComplete}
      />
    ))
  )

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="task-controls">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="sort-group-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="category">Sort by Category</option>
          </select>

          <select 
            value={groupBy} 
            onChange={(e) => setGroupBy(e.target.value)}
            className="group-select"
          >
            <option value="none">No Grouping</option>
            <option value="category">Group by Category</option>
            <option value="priority">Group by Priority</option>
            <option value="status">Group by Status</option>
          </select>
        </div>
      </div>

      {groupBy === 'none' ? (
        renderTaskList(sortedTasks)
      ) : (
        Object.entries(groupedTasks).map(([group, tasks]) => (
          <div key={group} className="task-group">
            <h3 className="group-header">{group}</h3>
            {renderTaskList(tasks)}
          </div>
        ))
      )}

      {filteredTasks.length === 0 && (
        <div className="no-tasks">
          {searchTerm ? 'No tasks match your search' : 'No tasks to show'}
        </div>
      )}
    </>
  )
}

export default Tasks