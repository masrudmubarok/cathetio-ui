import React from 'react';
import { Toaster } from 'react-hot-toast';
import PageTitle from './components/PageTitle.jsx';
import AppHeader from './components/AppHeader.jsx';
import AppContent from './components/AppContent.jsx';
import style from './styles/modules/app.module.scss';

function App() {
  return (
    <>
      <div className="container"> 
        <PageTitle>Cathet.io</PageTitle>
        
        {/* Wrapper app */}
        <div className={style.app__wrapper}>
          <AppHeader />  
          <AppContent />
        </div>

      </div>

      {/* Notification component from react-hot-toast */}
      <Toaster
        position='top-right'  
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;

