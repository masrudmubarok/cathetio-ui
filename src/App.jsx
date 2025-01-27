import React from 'react'
import PageTitle from './components/PageTitle.jsx'
import AppHeader from './components/AppHeader.jsx'
import AppContent from './components/AppContent.jsx'
import style from './styles/modules/app.module.scss'

function App() {

  return (
    <div className="container">
      <PageTitle>Cathet.io</PageTitle>
      <div className={style.app__wrapper}>
        <AppHeader />
        <AppContent />
      </div>
    </div>
  )

}

export default App
