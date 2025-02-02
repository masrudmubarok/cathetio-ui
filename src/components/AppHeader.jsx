import React, { useState } from 'react'
import Button, { SelectButton } from './Button'
import style from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterStatus } from '../slice/todoSlice';

function AppHeader() {
  // State to manage modal visibility (open or closed)
  const [modalOpen, setModalOpen] = useState(false);

  // Get the current filter status from Redux store
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // Function to update the filter status in the Redux store when the dropdown changes
  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  }

  return (
    <div className={style.appHeader}>
      {/* Button to open the "Add Task" modal */}
      <Button variant="primary" onClick={() => setModalOpen(true)}>Add Task</Button>

      {/* Dropdown (select input) to filter tasks based on their status */}
      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>

      {/* Modal component for adding a new task, controlled by modalOpen state */}
      <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;