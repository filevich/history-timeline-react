import React from 'react';
import './Timeline.css'
import { Interval } from '../Interval/Interval';
import { Interval as TypeInterval } from '../../interval';
import { yearsToPixels } from '../Control/Control';
// import { centuries } from '../../centuries'

interface Props {
  loc: number;
  zoom: number;
  lanes: TypeInterval[][];
}

export const Timeline: React.FC<Props> = ({
  loc, 
  zoom,
  lanes,
}) => {

  return (
    <>
      {lanes.map((lane, ix) => 
        <div
          key={ix}
          className="slider"
          style={{marginLeft: yearsToPixels(lane[0].from - loc, zoom) + "px", width:"150%"}}>
            {lane.map((c, ix) => 
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