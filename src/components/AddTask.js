import {useState} from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const [category, setCategory] = useState('personal')
    const [priority, setPriority] = useState('medium')
    const [completed, setCompleted] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text){
            alert('Please add a task')
            return
        }

        onAdd({text, day, reminder, category, priority, completed})

        setText('')
        setDay('')
        setReminder(false)
        setCategory('personal')
        setPriority('medium')
        setCompleted(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input 
                    type='text' 
                    placeholder='Add Task' 
                    value={text} 
                    onChange={(e)=>setText(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Date & Time</label>
                <input 
                    type='datetime-local' 
                    value={day} 
                    onChange={(e)=>setDay(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Category</label>
                <select 
                    value={category} 
                    onChange={(e)=>setCategory(e.target.value)}
                >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                </select>
            </div>
            <div className='form-control'>
                <label>Priority</label>
                <select 
                    value={priority} 
                    onChange={(e)=>setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input 
                    type='checkbox' 
                    checked={reminder} 
                    onChange={(e)=>setReminder(e.currentTarget.checked)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Mark as Completed</label>
                <input 
                    type='checkbox' 
                    checked={completed} 
                    onChange={(e)=>setCompleted(e.currentTarget.checked)}
                />
            </div>

            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask