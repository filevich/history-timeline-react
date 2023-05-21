import { useEffect, useState } from 'react'
import './App.css'
import { Timeline } from './components/Timeline/Timeline'
import { Control, pixelsToYears } from './components/Control/Control'
import { centuries } from './centuries'
// import cellarius from 'data/cellarius.json'

interface Data {
  title: string
  from: number
  to: number
  subIntervals?: any[]
}

function App() {

  // display props
  const defaultLoc  = -3800
      , defaultZoom = 1.5
      , screenWidth = window.innerWidth

  // render props
  const [loc, setLoc] = useState(defaultLoc) // location
  const [zoom, setZoom] = useState(defaultZoom) // zoom

  const [_data, setData] = useState<[Data]>()

  const fetchJson = async (file:string) => {
    const res = await fetch(file)
    if (!res.ok)
      console.error(`An error has occured: ${res.status}`)
    const data = await res.json()
    setData(data)
  }

  window.scrollTo(0,0)

  useEffect(() => {
    // División clásica de Cellarius
    fetchJson('/data/cellarius.json')
  },[])

  return (
    <>
      <Timeline
        loc={loc}
        zoom={zoom}
        lanes={[centuries.filter(c => 
          c.isVisible(loc, pixelsToYears(screenWidth, zoom)))]} />
      <Control
        loc={loc}
        screenWidth={screenWidth}
        setLoc={setLoc}
        zoom={zoom}
        setZoom={setZoom} />
    </>
  )
}

export default App
