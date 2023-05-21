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

  isVisible = (loc:number, yearsWindows:number) :boolean => {
    // return true || loc > 0 && yearsWindows < 2
    return (loc <= this.from && this.from <= loc+yearsWindows) ||
      (this.from <= loc && loc <= this.to)
  }
}

// 1280 --> supongamos 1px = 1 año
// loc:-4000 + yearsWindow:1280 = −2720

// [-4000 .. -3146.6666666666665]
// -3400