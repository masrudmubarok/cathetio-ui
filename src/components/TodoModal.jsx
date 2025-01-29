import React, { useState }  from 'react';
import style from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { addTodo } from '../slice/todoSlice';
import { v4 as uuid } from 'uuid';
import { nextDay } from 'date-fns';
import toast from 'react-hot-toast';

function TodoModal({ modalOpen, setModalOpen }) {
    const [title, setTitle] = useState(''); // State to store the title of the task
    const [description, setDescription] = useState(''); // State to store the description of the task
    const [status, setStatus] = useState('incomplete'); // State to store the status of the task (default is "incomplete")

    const dispatch = useDispatch();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault() // Prevents the default form submission behavior
        if(title && description && status) {
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
            setModalOpen(false); // Closes the modal after successful task addition
        } else {
            toast.error("The title or description shouldn't be empty");
        }
    }

    // Render the modal only if `modalOpen` is true
    return (
        modalOpen && (
            <div className={style.wrapper}>
                <div className={style.container}>
                    {/* Close button to close the modal */}
                    <div 
                        className={style.closeButton} 
                        onClick={() => setModalOpen(false)} // Closes the modal when clicked
                        onKeyDown={() => setModalOpen(false)} // Allows closing via keyboard navigation
                        tabIndex={0} // Makes the button focusable
                        role="button" // Assigns button semantics
                    >
                        <MdOutlineClose /> {/* Close icon */}
                    </div>
                    <form 
                        className={style.form} 
                        onSubmit={(e) => handleSubmit(e)} // Calls `handleSubmit` when the form is submitted
                    >
                        <h1 className={style.formTitle}>Add Task</h1>
                        
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
                                Add Task
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
                </div>
            </div>
        )
    )
}

export default TodoModal;