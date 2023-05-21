import { useEffect, useState } from 'react'
import './App.css'
import { Timeline } from './components/Timeline/Timeline'
import { Control } from './components/Control/Control'
import { centuries } from './centuries'
import "./components/Panel/panel.css"
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

  const [_data, setData] = useState<Data[]>([])

  const fetchJson = async (file:string) => {
    const res = await fetch(file)
    if (!res.ok)
      console.error(`An error has occured: ${res.status}`)
    const data = await res.json()
    setData(c => [...c, ...data])
  }

  window.scrollTo(0,0)

  useEffect(() => {
    // División clásica de Cellarius
    fetchJson('/data/cellarius.json')
  },[])

  const [visibility, setVisibility] = useState<{ [key:string]:boolean } >({
    "Centuries!": true,
    cellarius: true
  })

  return (
    <>
      <Timeline
        loc={loc}
        zoom={zoom}
        visibility={visibility}
        screenWidth={screenWidth}
        lanes={[centuries]} />
      <Control
        loc={loc}
        screenWidth={screenWidth}
        setLoc={setLoc}
        zoom={zoom}
        setZoom={setZoom} />
      <div id="panel">
        {Object.keys(visibility).map((k, ix) => 
          <div key={ix}>
            <input
              type="checkbox"
              checked={visibility[k]}
              onChange={() => setVisibility(c => ({...c, [k]: !c[k]}))}/>
              {k}
          </div>
        )}
        
      </div>
    </>
  )
}

export default App
