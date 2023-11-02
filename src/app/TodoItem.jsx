import {BiTrash} from 'react-icons/bi'

const TodoItem = ({id, value, onClick, completed, onDelete}) => {

  
    return (
        <div id={id} onClick={onClick} className={`flex w-full justify-between py-3 font-semibold rounded-full px-5 bg-[#ececec] items-center`}>
        <p className={`${completed && "line-through text-gray-400"}`}>{value}</p>
        <BiTrash onClick={onDelete} className='text-2xl hover:text-red-500'/>
    </div>
    )
}

export default TodoItem