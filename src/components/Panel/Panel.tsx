import React from "react"
import "./panel.css"

interface Props {
  visibility :{[k: string]: boolean}
  setVisibility: React.Dispatch<React.SetStateAction<{[k: string]: boolean;}>>
}

export const Panel :React.FC<Props> = ({
  visibility,
  setVisibility,
}) => {
  return (
    <div id="toggler" className="panel">
      <div className="title">Visible intervals</div>
      {Object.keys(visibility).map((k, ix) => 
        <div key={ix}>
          <input
            type="checkbox"
            style={{marginRight: "5pt"}}
            checked={visibility[k]}
            onChange={() => setVisibility(c => ({...c, [k]: !c[k]}))}/>
            {k}
        </div>
      )}
    </div>
  )
}