import { NavLink } from 'react-router'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div>
      Home Page
      <NavLink to="/dashboard" className="hover:text-blue-800">
        Dashboard
      </NavLink>
    </div>
  )
}

export default App
