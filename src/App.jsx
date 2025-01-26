import React from 'react'
import PageTitle from './components/PageTitle.jsx'
import Header from './components/AppHeader.jsx'
import style from './styles/modules/app.module.scss'

function App() {

  return (
    <div className="container">
      <PageTitle>Cathet.io</PageTitle>
      <div className={style.app__wrapper}>
        <Header />
      </div>
    </div>
  )

}

export default App
