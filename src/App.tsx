import { useEffect, useState } from 'react'
import './App.css'
import { Timeline } from './components/Timeline/Timeline'
import { Control } from './components/Control/Control'
import "./components/Panel/panel.css"
import { Panel } from './components/Panel/Panel'
import { Interval } from './interval'
import { Header } from './components/Header/Header'

function App() {

  // display props
  const defaultLoc  = -3800
      , defaultZoom = 1.5
      , screenWidth = window.innerWidth

  // render props
  const [loc, setLoc] = useState(defaultLoc) // location
  const [zoom, setZoom] = useState(defaultZoom) // zoom

  const [data, setData] = useState<Interval[]>([])

  const fetchJson = async (file:string) => {
    const res = await fetch(file)
    if (!res.ok)
      console.error(`An error has occured: ${res.status}`)
    const data = await res.json()
    return data
    // setData(c => [...c, data])
  }

  window.scrollTo(0,0)

  const [visibility, setVisibility] = useState<{ [key:string]:boolean } >({})

  useEffect(() => {
    setData([])

    const files = [
      // División clásica de Cellarius
      '/data/es/cellarius.json',
      // centuries
      '/data/es/centuries.json',
    ]

    files.forEach(file => {
      fetchJson(file)
        .then(interval => {
          setData(c => [...c, interval])
          setVisibility(c => ({ ...c, [interval.title]: true }))
        })
    })
  }, [setData, setVisibility])

  return (
    <>
      <Header />
      <Timeline
        loc={loc}
        zoom={zoom}
        visibility={visibility}
        screenWidth={screenWidth}
        lanes={data} />
      <Control
        loc={loc}
        screenWidth={screenWidth}
        setLoc={setLoc}
        zoom={zoom}
        setZoom={setZoom} />
      <Panel
        visibility={visibility}
        setVisibility={setVisibility} />
    </>
  )
}

export default App
