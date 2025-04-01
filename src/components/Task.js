import { FaTimes } from 'react-icons/fa'
import { BsCheckLg } from 'react-icons/bs'

const Task = ({ task, onDelete, onComplete }) => {
  // Format date to 24hr format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className={`task ${task.reminder ? 'reminder' : ''} ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-title">
          <h3>{task.text}</h3>
          <div className="task-date">{formatDate(task.day)}</div>
        </div>
        <div className="task-actions">
          <button 
            onClick={() => onComplete(task.id)} 
            className={`complete-btn ${task.completed ? 'completed' : ''}`}
            title={task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          >
            <BsCheckLg />
          </button>
          <button 
            onClick={() => onDelete(task.id)} 
            className="delete-btn" 
            title="Delete Task"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <p>{task.description}</p>
      <div className="task-meta">
        {task.category && <span className="task-category">{task.category}</span>}
        {task.priority && (
          <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        )}
      </div>
    </div>
  )
}

export default Task