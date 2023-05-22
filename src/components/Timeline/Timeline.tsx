import React from 'react'
import './Timeline.css'
import { Interval, parseInterval } from '../../interval'
import { pixelsToYears, yearsToPixels } from '../Control/Control'
import { Timeframe } from '../Timeframe/Timeframe'
import { RecInterval } from '../RecInterval/RecInterval'

interface Props {
  loc: number;
  zoom: number;
  screenWidth: number;
  lanes: Interval[];
  visibility: { [key:string] : boolean };
}

export const Timeline: React.FC<Props> = ({
  loc, 
  zoom,
  screenWidth,
  lanes,
  visibility,
}) => {
  const w = pixelsToYears(screenWidth, zoom)

  return (
    <>
      <div style={{
        background: "hsl(39, 30%, 85%)",
        width: "100%",
      }}>
        {lanes
          .map(parseInterval)
          .filter(lane => visibility[lane.id ? lane.id : ""])
          .filter(l => l.isVisible(loc, w))
          .map(i => i.chop(loc, w))
          .map((lane, k) => 
            <RecInterval
              key={k}
              zoom={zoom}
              marginLeft={yearsToPixels(lane.begining() - loc, zoom)}
              interval={lane} /> )}
      </div>

      <Timeframe />

      <div style={{
        background: "#e3decb",
        flexGrow: "1",
      }}>
        {/* {lanes[0] && <RecInterval
          zoom={zoom}
          interval={lanes[0]} />} */}
      </div>
      
    </>
  )
}