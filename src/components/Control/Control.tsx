import React, { useEffect } from 'react'
import './Control.css'

interface Props {
  loc: number;
  setLoc: React.Dispatch<React.SetStateAction<number>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  screenWidth: number;
}

// let 80 yrs ~ 120 px
// then: years-to-pixels ~ * 1.5
// then: pixels-to-years ~ * 0.67
// 1512 px = 1512 * 0.67 yrs = 1013 yrs
export const yearsToPixels = (yr:number, zoom:number) :number => yr * zoom
export const pixelsToYears = (px:number, zoom:number) :number => px / zoom

export const Control: React.FC<Props> = ({ 
  loc,
  setLoc,
  zoom, 
  setZoom,
  screenWidth,
}) => {

  useEffect(() => {
    const handler = (e:WheelEvent) => {
      if (e.cancelable) e.preventDefault()
      // normalize
      const factor = 50
      // esta eq nos esta diciendo que nos corrimos `d` cantidad de AÑOS
      // es decir que del lado derecho dejamos de ver "d" AÑOS
      // let d = -1 * e.deltaY * factor / 120
      let d = (e.deltaY > 0 ? -1 : 1) * factor
      // basicamente en cada wheel_down hacemos un loc -= 50
      // si tenemos sw:1280px, z:1.5 -> sw:853yrs
      // empezando desde el [-3850yr, −2997yr]
      setLoc(c => c + d)
    }
    document.body.addEventListener('wheel', handler)
    return () => document.body.removeEventListener('wheel', handler)
  }, [])

  const btnStyle = {
    fontSize: "8pt",
    padding: "2pt 5pt",
    margin: "0pt 2pt",
  }

  const fmtZoom = { maximumFractionDigits: 3, minimumFractionDigits: 3 }
      , z = zoom.toLocaleString("en-US", fmtZoom)

  const fmt = { maximumFractionDigits: 0, minimumFractionDigits: 0 }
      , visibleYears = pixelsToYears(screenWidth, zoom)
      , _visibleYears = (visibleYears).toLocaleString("en-US", fmt)
      , fromYr = loc.toLocaleString("en-US", fmt)
      , toYr = (loc+visibleYears).toLocaleString("en-US", fmt)

  return (
    <>
      <div id="control">
        screenWidth: {screenWidth}px<hr/>
        visible yrs: {_visibleYears} ~ [{fromYr}..{toYr}]<hr/>
        1px = {pixelsToYears(1, zoom).toLocaleString("en-US", fmtZoom)} years<hr/>
        loc: {loc}<hr/>
        zoom: {z}
        <button
          style={btnStyle}
          onClick={() => setZoom(c => c*.75)}>-</button>
        <button
          style={btnStyle}
          onClick={() => setZoom(c => c*1.25)}>+</button>
      </div>
    </>
  )
}