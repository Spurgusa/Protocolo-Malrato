import React from 'react'
import ReactDOM from 'react-dom/client'
import IncidentReportApp from './components/incidente-app.tsx'  // Añadimos .tsx
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IncidentReportApp />
  </React.StrictMode>,
)
