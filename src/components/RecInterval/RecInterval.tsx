import { Interval } from "../../interval"
import { yearsToPixels } from "../Control/Control"
import "../Interval/Interval.css"

interface RecIntervalProps {
  zoom: number,
  interval: Interval,
  marginLeft?: number,
} 

export const RecInterval :React.FC<RecIntervalProps> = ({
  zoom,
  interval,
  marginLeft,
}) => {
  
  const i = interval
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