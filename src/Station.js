import React from "react";

const Station = props => {
  const cssClasses = `upcoming-trains upcoming-trains__${props.trains.linha}`;
  return (
    <div className="station" {...props}>
      <div className={"upcoming-trains-title__" + props.trains.linha}>{props.trains.destino}</div>
      <div className={cssClasses}>
        <ul>
          <li key={props.trains.tempoChegada1}>{props.trains.tempoChegada1}</li>
          <li key={props.trains.tempoChegada2}>{props.trains.tempoChegada2}</li>
          <li key={props.trains.tempoChegada3}>{props.trains.tempoChegada3}</li>
        </ul>
      </div>
    </div>
  );
};

export default Station;
