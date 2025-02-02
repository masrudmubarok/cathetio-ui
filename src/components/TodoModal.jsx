import React, { useState, useEffect }  from 'react';
import style from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { addTodo, updateTodo } from '../slice/todoSlice';
import { v4 as uuid } from 'uuid';
import { nextDay } from 'date-fns';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

const dropIn = {
    hidden: {
        opacity: 0,
        transform: 'scale(0.9)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500, 
        },
    },
    exit: {
        transform: 'scale(0.9',
        opacity: 0,
    },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
    const [title, setTitle] = useState(''); // State to store the title of the task
    const [description, setDescription] = useState(''); // State to store the description of the task
    const [status, setStatus] = useState('incomplete'); // State to store the status of the task (default is "incomplete")

    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setStatus(todo.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus('incomplete');
        }
    }, [type, todo, modalOpen]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault() // Prevents the default form submission behavior
        if (title === '') {
            toast.error('Please enter a title');
            return;
        }
        if (description === '') {
            toast.error('Please enter a description');
            return;
        }
        if (title && description && status) {
            if (type === 'add') {
                dispatch(
                    addTodo({
                        id: uuid(),
                        title,
                        description,
                        status,
                        time: new Date().toLocaleString(),
                    })
                );
                toast.success('Task added successfully');
            }
            if (type === 'update') {
                if (todo.title !== title || todo.description !== description || todo.status !== status) {
                    dispatch(
                        updateTodo({
                            ...todo,
                            title,
                            description,
                            status,
                        })
                    );
                    toast.success('Task updated successfully');
                } else {
                    toast.error('No changes made');
                    return;
                }
            }
            setModalOpen(false); // Closes the modal after successful task addition
        }
    }

    // Render the modal only if `modalOpen` is true
    return (
        <AnimatePresence>
        {modalOpen && (
            <motion.div 
                className={style.wrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div 
                    className={style.container} 
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Close button to close the modal */}
                    <motion.div 
                        className={style.closeButton} 
                        onClick={() => setModalOpen(false)} // Closes the modal when clicked
                        onKeyDown={() => setModalOpen(false)} // Allows closing via keyboard navigation
                        tabIndex={0} // Makes the button focusable
                        role="button" // Assigns button semantics
                        initial={{ top: 40, opacity: 0 }}
                        animate={{ top: -10, opacity: 1 }}
                        exit={{ top: 40, opacity: 0 }}
                    >
                        <MdOutlineClose /> {/* Close icon */}
                    </motion.div>
                    <form 
                        className={style.form} 
                        onSubmit={(e) => handleSubmit(e)} // Calls `handleSubmit` when the form is submitted
                    >
                        <h1 className={style.formTitle}>
                            {type === 'update' ? 'Update' : 'Add'} Task
                        </h1>
                        
                        {/* Label and input field for task title */}
                        <label htmlFor="title">
                            Title
                            <input 
                                type="text" 
                                id="title" 
                                value={title} // Binds the input to the `title` state
                                onChange={(e) => setTitle(e.target.value)} // Updates `title` state when input changes
                            />
                        </label>
                        
                        {/* Label and textarea for task description */}
                        <label htmlFor="description">
                            Description
                            <textarea 
                                id="description" 
                                placeholder="Enter task description" 
                                value={description} // Binds the textarea to the `description` state
                                onChange={(e) => setDescription(e.target.value)} // Updates `description` state when input changes
                            />
                        </label>
                        
                        {/* Label and select dropdown for task status */}
                        <label htmlFor="status">
                            Status
                            <select 
                                name="status" 
                                id="status" 
                                value={status} // Binds the dropdown to the `status` state
                                onChange={(e) => setStatus(e.target.value)} // Updates `status` state when selection changes
                            >
                                <option value="incomplete">Incomplete</option>
                                <option value="complete">Complete</option>
                            </select>
                        </label>
                        
                        <div className={style.buttonContainer}>
                            {/* Submit button to add the task */}
                            <Button 
                                type="submit" 
                                variant="primary"
                            >
                                {type === 'update' ? 'Update' : 'Add'} Task
                            </Button>
                            {/* Cancel button to close the modal */}
                            <Button 
                                type="button" 
                                variant="secondary"
                                onClick={() => setModalOpen(false)} // Closes the modal when clicked
                                onKeyDown={() => setModalOpen(false)} // Allows closing via keyboard navigation
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    );
}

export default TodoModal;