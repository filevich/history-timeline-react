import { pixelsToYears } from "./components/Control/Control";

export class Interval {
  id?:string;
  title?:string;
  from?:number;
  to?:number;
  alt?:string;
  subintervals?: Interval[];

  constructor(from?:number, to?:number, title?:string, alt?:string) {
    this.from = from
    this.to = to
    this.title = title
    this.alt = alt
  }

  span = () :number => (this.ending() - this.begining())

  begining = () :number => {
    if (this.from !== undefined)
      return this.from
    else if (this.subintervals !== undefined)
      return this.subintervals[0].begining()
    else
      throw new Error("Interval with neither `from` or `subintervals` attr.")
  }

  ending = () :number => {
    if (this.to !== undefined)
      return this.to
    else if (this.subintervals !== undefined)
      return this.subintervals.slice(-1)[0].ending()
    else
      throw new Error("Interval with neither `to` or `subintervals` attr.")
  }

  isVisible = (loc:number, yearsWindows:number) :boolean => {
    return (loc <= this.begining() && this.begining() <= loc+yearsWindows) ||
      (this.begining() <= loc && loc <= this.ending())
  }

  getVisibleSubintervalsOnly(loc:number, screenWidth:number, zoom:number) :Interval[] {
    if (!this.subintervals) return [];
    const w = pixelsToYears(screenWidth, zoom)
    return this.subintervals.filter(c => c.isVisible(loc, w))
  }

  // removes non-visible subintervals
  chop = (loc:number, yearsWindows: number) :Interval => {
    let i = cpy(this)
    i.subintervals = this.subintervals
      ? this.subintervals
        .filter(si => si.isVisible(loc, yearsWindows))
        .map(si => si.chop(loc, yearsWindows))
      : []
    return i
  }
}

const cpy = (obj:any) :Interval => {
  let res = new Interval()
  res.id = obj.id || undefined
  res.title = obj.title || undefined
  res.from = obj.from || (typeof obj.from==='number' ? obj.from : undefined)
  res.to = obj.to || (typeof obj.to==='number' ? obj.to : undefined)
  res.alt = obj.alt || undefined
  return res
}

export const parseInterval = (obj:any) :Interval => {
  let res = cpy(obj)
  res.subintervals = obj.subintervals
    ? obj.subintervals.map(parseInterval)
    : []
  return res
}
