import { useEffect, useState } from 'react'
import './App.css'
import { Timeline } from './components/Timeline/Timeline'
// import cellarius from 'data/cellarius.json'

interface Data {
  title: string
  from: number
  to: number
  subIntervals?: [any]
}

// unidad basica:
// 1 año = 2 pixeles 

function App() {
  // render props
  const [loc, _setLoc] = useState(0) // location
  const [zoom, setZoom] = useState(0) // zoom
  
  const [_data, setData] = useState<[Data]>()

  const fetchJson = async (file:string) => {
    const res = await fetch(file)
    if (!res.ok)
      console.error(`An error has occured: ${res.status}`)
    const data = await res.json()
    setData(data)
  }

  useEffect(() => {
    // División clásica de Cellarius
    fetchJson('/data/cellarius.json')
  },[])

  // wheel / zoom
  useEffect(() => {
    const handler = (e:WheelEvent) => {
      // normalize
      let d = -1 * e.deltaY / 120
      setZoom(c => c + d)
    }
    document.body.addEventListener('wheel', handler)
    return () => document.body.removeEventListener('wheel', handler)
  }, [])

  return (
    <>
      {<Timeline />}
      {JSON.stringify({loc, zoom})}
    </>
  )
}

export default App
