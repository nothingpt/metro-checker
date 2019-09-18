import React from "react";

const Station = props => {
  return (
    <div className="station" {...props}>
      <div className="station-name">{props.stationname}</div>
      <div className="upcoming-trains">
        <ul>
          <li>{props.trains.tempoChegada1}</li>
          <li>{props.trains.tempoChegada2}</li>
          <li>{props.trains.tempoChegada3}</li>
        </ul>
      </div>
    </div>
  );
};

export default Station;
