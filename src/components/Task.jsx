import React from 'react'
import { useState} from 'react'


const Task = (props) => {
  const [isChecked, setIsChecked] = useState(false)
  function handelCheckboxChange(){
    setIsChecked(!isChecked)
  }
  return (
    <div className='flex mt-2 justify-around items-center bg-linear-to-r from-slate-300 to-slate-500 gap-1 w-full h-10 p-2'>
      <input className='w-[2%]' type="checkbox" checked={isChecked} onChange={handelCheckboxChange} />
      {
        !isChecked ? <p className='w-[85%] '>{props.task}</p> : <p className='w-[85%] line-through'>{props.task}</p>
      }
      <i className='w-[10%] fa-solid fa-trash-can' onClick={()=> props.onDelete(props.id)}></i>
    </div>
  )
}

export default Task
