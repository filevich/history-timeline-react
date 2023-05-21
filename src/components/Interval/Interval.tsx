import React from 'react';
import './Interval.css'
import { yearsToPixels } from '../Control/Control';

interface Props {
  zoom: number;
  from: number;
  to: number;
  title: string;
}

export const Interval: React.FC<Props> = ({ 
  zoom,
  from,
  to, 
  title,
}) => {
  const w = Math.round(yearsToPixels(to - from, zoom)) // <- usar eq
  // const w = 200
  return (
    <div
      className="item"
      style={{width: `${w}px`}}
      title={`${from}..${to}`}>
      {title}
    </div>
  )
}