import { useState } from 'react'
import CropDiseaseDetector from './pages/page'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CropDiseaseDetector></CropDiseaseDetector>
    </>
  )
}

export default App
