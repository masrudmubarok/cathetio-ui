import React, { useState, useEffect } from 'react';
import style from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { format } from 'date-fns';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slice/todoSlice';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';
import { motion } from 'framer-motion';

const child = {
    hidden: { y: 20, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
    }
};

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    useEffect(() => {
        if (todo.status === 'complete') { 
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [todo.status]);

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(
            updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete'})
        );
    };

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
    };

    const handleEdit = () => {
        setUpdateModalOpen(true);
    };

    return (
        <>
            <motion.div className={style.item} variants={child}>
                <div className={style.todoDetails}>
                    <CheckButton checked={checked} handleCheck={handleCheck} />
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
            </motion.div>
            <TodoModal 
                type='update'
                todo={todo}
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
            />
        </>
    )
}

export default TodoItem