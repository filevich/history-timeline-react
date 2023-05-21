import React from 'react';
import './Timeline.css'
import { Interval } from '../Interval/Interval';
// import { Interval as TypeInterval } from '../../interval';
import { Lane } from '../../lane';
import { yearsToPixels } from '../Control/Control';
// import { centuries } from '../../centuries'

interface Props {
  loc: number;
  zoom: number;
  screenWidth: number;
  lanes: Lane[];
  visibility: { [key:string] : boolean };
}

export const Timeline: React.FC<Props> = ({
  loc, 
  zoom,
  screenWidth,
  lanes,
  visibility,
}) => {

  const visible = lanes
    .filter(lane => visibility[lane.title])
    .map(lane => lane.visible(loc, screenWidth, zoom))
    .filter(v => v.length > 0)

  return (
    <>
      {visible.map((intervals, ix) =>  
        <div
          key={ix}
          className="slider"
          style={{
            marginLeft: yearsToPixels(intervals[0].from - loc, zoom) + "px",
            width:"auto",
            overflowX: "hidden"
          }}>
            {intervals.map((c, ix) => 
              <Interval
                key={ix}
                zoom={zoom}
                from={c.from}
                to={c.to}
                title={c.title}/>
            )}
        </div>
      )}
    </>
  )
}