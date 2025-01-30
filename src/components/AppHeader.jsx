import React, { useState } from 'react'
import Button, { SelectButton } from './Button'
import style from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={style.appHeader}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>Add Task</Button>
        <SelectButton id="status">
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </SelectButton>
        <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default AppHeader