import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

function App(): React.JSX.Element {
  let navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const inputFile = useRef(null)
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      setIsDisabled(false)
    }
  }
  const onButtonClick = (): void => {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }

  const handleAnalyzeClick = (): void => {
    const reader = new FileReader()
    reader.readAsText(selectedFile!)
    console.log(reader)

    reader.onload = (e) => {
      try {
        localStorage.setItem('telemetryData', e.target?.result?.toString())
        navigate('/dashboard')
      } catch (err) {
        console.error('Cannot parse JSON file', err)
      }
    }
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center space-x-2 ">
      <input
        className="hidden"
        accept=".json"
        ref={inputFile}
        onChange={handleFileChange}
        type="file"
      />
      <div
        className="px-4 py-2 text-black font-bold bg-white cursor-pointer rounded-2xl border-2 border-gray-400 transition hover:bg-gray-400"
        onClick={onButtonClick}
      >
        {selectedFile ? selectedFile?.name : 'Upload'}
      </div>

      <button
        disabled={isDisabled}
        onClick={handleAnalyzeClick}
        className="px-4 py-2 text-white font-bold bg-blue-300 cursor-pointer rounded-2xl hover:bg-blue-600 transition duration-200"
      >
        Analyze
      </button>
    </div>
  )
}

export default App
