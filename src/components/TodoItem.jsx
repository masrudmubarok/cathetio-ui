import React from 'react';
import style from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { format } from 'date-fns';
import { MdDelete, MdEdit } from 'react-icons/md';

function TodoItem({ todo }) {
    const handleDelete = () => {
        console.log('Deleting')
    };

    const handleEdit = () => {
        console.log('Editing')
    };

  return (
    <div className={style.item}>
        <div className={style.todoDetails}>
            [ ]
            <div className={style.texts}>
                <p className={getClasses([
                    style.todoText, 
                    todo.status == 'complete' && style['todoText--completed'],
                    ])}
                >
                    {todo.title}
                </p>
                <p className={style.time}>
                    {format(new Date(todo.time), 'p, MM/dd/yyyy')}
                </p>
            </div>
        </div>
        <div className={style.todoActions}>
            <div 
                className={style.icon} 
                onClick={handleDelete} 
                onKeyDown={handleDelete} 
                role="button" 
                tabIndex={0}
            >
                <MdDelete />
            </div>
            <div 
                className={style.icon} 
                onClick={handleEdit} 
                onKeyDown={handleEdit} 
                role="button" 
                tabIndex={0}
            >
                <MdEdit />
            </div>
        </div>
    </div>
  )
}

export default TodoItem