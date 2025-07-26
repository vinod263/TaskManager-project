import React from 'react'
import TaskCard from './TaskCard'

const Completed = ({task}) => {
  return (
     <div className='flex flex-col gap-4'>
      {task && task.map((item,i) => (
        <TaskCard key={i} data={item} />

      ))}
    </div>
  )
}

export default Completed;