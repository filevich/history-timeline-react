import React from 'react';
import './Interval.css'

interface Props {
  from: number;
  to: number;
  title: string;
}

export const Interval: React.FC<Props> = ({ 
  from,
  to, 
  title,
}) => {
  return (
    <div className="item" title={`${from}..${to}`}>
      {title}
    </div>
  )
}