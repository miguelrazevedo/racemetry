import './assets/main.css'

import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
)
