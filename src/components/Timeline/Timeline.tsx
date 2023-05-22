import React from 'react';
import './Timeline.css'
import { Interval } from '../Interval/Interval';
import { Interval as _Interval, parseInterval } from '../../interval';
import { yearsToPixels } from '../Control/Control';

import "../Interval/Interval.css"

interface RecIntervalProps {
  zoom: number,
  interval: _Interval,
  marginLeft?: number,
} 

const RecInterval :React.FC<RecIntervalProps> = ({
  zoom,
  interval,
  marginLeft,
}) => {
  
  const i = parseInterval(interval)
      , intervalStyle = {
          width: i.title ? yearsToPixels(i.span(), zoom) : "min-content",
          marginLeft: marginLeft ? `${marginLeft}px` : "0px",
        }

  return <>
    <div className='interval' style={intervalStyle}>
      <div
        className='title'
        title={(i.alt || i.title || "")
          + (i.from && i.to ? ` [${i.from}..${i.to}]` : "")}>
        {interval.title}
      </div>
      {
        interval.subintervals && 
          <div className='row'>
            {interval.subintervals.map((si, k) =>
              <RecInterval
                key={k}
                zoom={zoom}
                interval={si}
                marginLeft={k && si.from && interval.subintervals && interval.subintervals[k-1].to 
                  ? yearsToPixels(si.from - interval.subintervals[k-1].to!, zoom)
                  : 0 } />)}
          </div>
      }
    </div>
  </>
}

interface Props {
  loc: number;
  zoom: number;
  screenWidth: number;
  lanes: _Interval[];
  visibility: { [key:string] : boolean };
}

const Timeframe = () => 
  <div style={{
    // background: "white",
    // width: "100%",
    // height: "50px",
    // width: "min-content",
    background: "white",
    height: "34px",
    paddingTop: "6px",
    // borderStyle: "solid",
    // borderColor: "#907d5b",
    // borderWidth: "1px 0px",
    borderBottom: "1px solid #907d5b",
  }}>

  </div>

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
    .filter(lane => visibility[lane.id ? lane.id : ""])
    .map(lane => lane.getVisibleSubintervalsOnly(loc, screenWidth, zoom))
    .filter(v => v.length > 0)

  return (
    <>
      <div style={{
        background: "hsl(39, 30%, 85%)",
        width: "100%",
      }}>

        {lanes.map((lane, k) => 
          <RecInterval
            key={k}
            zoom={zoom}
            marginLeft={yearsToPixels(parseInterval(lane).begining() - loc, zoom)}
            interval={lane} /> )}
        
      {/*         
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
      */}
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