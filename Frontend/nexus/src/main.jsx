import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Router from './Router/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)