import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/App.css';
import App from './App.jsx';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import {store} from './app/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>                {/* Enables React's strict mode to highlight potential issues */}
    <Provider store={store}>  {/* Provides the Redux store to the entire app */}
      <App />                 {/* Renders the main App component */}
    </Provider>
  </StrictMode>,  
);

