export class Interval {
  from:number;
  to:number;
  title:string;
  alt?:string;

  constructor(from:number, to:number, title:string, alt?:string) {
    this.from = from
    this.to = to
    this.title = title
    this.alt = alt
  }
}