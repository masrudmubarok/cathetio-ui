import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/GlobalStyles.css'
import App from './App.jsx'
import '@fontsource/poppins'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
