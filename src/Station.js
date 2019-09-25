import React from "react";

const Station = props => {
  return (
    <div className="station" {...props}>
      <div className="upcoming-trains-title">{props.trains.destino}</div>
      <div className="upcoming-trains">
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
