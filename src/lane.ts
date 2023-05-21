import { pixelsToYears } from "./components/Control/Control";
import {Interval} from "./interval"

export class Lane {
  title:string;
  intervals:Interval[];

  constructor(title:string, intervals?:Interval[]) {
    this.title = title
    this.intervals = intervals ? intervals : []
  }

  startYear() :number {
    return this.intervals.length ? this.intervals[0].from : 0
  }

  visible(loc:number, screenWidth:number, zoom:number) :Interval[] {
    const w = pixelsToYears(screenWidth, zoom)
    return this.intervals.filter(c => c.isVisible(loc, w))
  }
}