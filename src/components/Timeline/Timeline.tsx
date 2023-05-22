import React from 'react';
import './Timeline.css'
import { Interval } from '../Interval/Interval';
import { Interval as _Interval, parseInterval } from '../../interval';
import { yearsToPixels } from '../Control/Control';

interface Props {
  loc: number;
  zoom: number;
  screenWidth: number;
  lanes: _Interval[];
  visibility: { [key:string] : boolean };
}

export const Timeline: React.FC<Props> = ({
  loc, 
  zoom,
  screenWidth,
  lanes,
  visibility,
}) => {

  let visible :_Interval[][] = [];

  visible = lanes
    .map(parseInterval)
    .filter(lane => visibility[lane.title ? lane.title : ""])
    .map(lane => lane.getVisibleSubintervalsOnly(loc, screenWidth, zoom))
    .filter(v => v.length > 0)

  return (
    <>
      {visible.map((intervals, ix) =>  
        <div
          key={ix}
          className="slider"
          style={{
            marginLeft: yearsToPixels(intervals[0].begining() - loc, zoom) + "px",
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