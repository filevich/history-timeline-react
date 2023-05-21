import { Interval } from "./interval"

// from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-21.php
const toRoman = (num:number) => {
  let digits = String(num).split('')
  const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
      '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
      '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  let romanNum = ''
  let i = 3

  while (i--) {
    let p = digits.pop()
    if (!p) break;
    romanNum = (key[parseInt(p) + (i * 10)] || '') + romanNum
  }

  return Array(+digits.join('') + 1).join('M') + romanNum
}

export const century = (num:number) => {
  let postfix = (num <= -1) ? 'BC' : 'AD'
  return `s. ${toRoman(num)} ${postfix}`
}

let cs:Interval[] = [] 

for (let c = -38; c <= -2; c++) {
  cs.push(
    new Interval(
      c * 100,
      (c * 100) + 100,
      `${c * 100}`
      // century(c),
    )
  )
}

cs.push(
  new Interval(
    -100,
    0, // <- actually should be -1. but 100 - 0 = 100 years century vs 100 - (-1) = 99 years century :(
    // `${-100}`
    century(-1),
  )
)

cs.push(
  new Interval(
    0, // <- actually should be -1. but 100 - 0 = 100 years century vs 100 - (-1) = 99 years century :(
    100,
    // `${0}`
    century(1),
  )
)

for (let c = 2; c <= 21; c++) {
  cs.push(
    new Interval(
      c * 100 - 100,
      c * 100,
      // `${c * 100 - 100}`
      century(c),
    )
  )
}

export const centuries = cs

// positive
// export const centuries = [...Array(21 - 2 + 1).keys()]
//   .map(c => c+2)
//   .map(c => century(c))

// console.log(centuries.slice(2,4))
// for (let c = 2; c <= 21; c++) {
//   centuries.events.push(
//     new Interval({
  //       from: c * 100 - 100,
  //       to: c * 100
  //       title: century(c),
//     })
//   )
// }