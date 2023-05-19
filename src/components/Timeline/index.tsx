import React from 'react';
import './index.css'
import { Interval } from '../Interval';
import { centuries } from '../../centuries'

interface Props {
  // bar: number;
  // text: string;
  // onTextChange: (text: string) => void;
}

export const Timeline: React.FC<Props> = ({ 
  // bar 
}) => {
  return (
    <>
      <div className="slider">
        {centuries.map((c, ix) => 
          <Interval key={ix} from={c.from} to={c.to} title={c.title}/>
        )}
      </div>
    </>
  )
}