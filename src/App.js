import React, { useEffect, useState } from "react";
import axios from "axios";
import * as moment from "moment";

import * as SVGLoaders from "svg-loaders-react";

import "./App.css";
import Station from "./Station";
import {
  STATIONS,
  getLinha,
  getStationByCode,
  getStationById
} from "./helpers/stations";

import dotenv from "dotenv";

function App(props) {
  var id = 0;
  const [code, updateCode] = useState("CG");
  const [fundo, updateFundo] = useState('train');
  const [comboios, updateComboios] = useState([]);
  const [isLoading, updateIsLoading] = useState(true);

  dotenv.config();

  async function getData(code = "CG") {
    updateIsLoading(true);

    // load the upcoming trains for station CG (Campo Grande)
    // Soon, it will load this or the station stored in local storage

    const res = await axios.get(
      `https://api.metrolisboa.pt:8243/estadoServicoML/1.0.0/tempoEspera/Estacao/${code}`,
      {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_API_KEY
        }
      }
    );

    const aComboios = res.data["resposta"].map(entry => {
      const a = entry.hora.substr(0, 4);
      const m = entry.hora.substr(4, 2);
      const d = entry.hora.substr(6, 2);
      const h = entry.hora.substr(8, 2);
      const mn = entry.hora.substr(10, 2);
      const s = entry.hora.substr(12, 2);
      let hora = `${a}-${m}-${d}T${h}:${mn}:${s}`;

      if (
        !entry.tempoChegada1 ||
        entry.tempoChegada1 === "0" ||
        isNaN(entry.tempoChegada1)
      ) {
        entry.tempoChegada1 = "--:--:--";
      } else {
        entry.tempoChegada1 = moment(hora)
          .add(entry.tempoChegada1, "s")
          .format("HH:mm:ss");
      }

      if (
        !entry.tempoChegada2 ||
        entry.tempoChegada2 === "0" ||
        isNaN(entry.tempoChegada2)
      ) {
        entry.tempoChegada2 = "--:--:--";
      } else {
        entry.tempoChegada2 = moment(hora)
          .add(entry.tempoChegada2, "s")
          .format("HH:mm:ss");
      }

      if (
        !entry.tempoChegada3 ||
        entry.tempoChegada3 === "0" ||
        isNaN(entry.tempoChegada3)
      ) {
        entry.tempoChegada3 = "--:--:--";
      } else {
        entry.tempoChegada3 = moment(hora)
          .add(entry.tempoChegada3, "s")
          .format("HH:mm:ss");
      }

      entry.id = id++;
      entry.linha = getLinha(code, entry.destino);
      entry.destino = getStationById(entry.destino);
      entry.fullName = getStationByCode(entry.stop_id);

      updateIsLoading(false);
      return entry;
    });

    updateComboios(aComboios);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleChange = e => {
    const code = e.target.value;
    updateCode(code);
    updateComboios([]);
    getData(code);
    // change background according to the line
  };

  const handleLoad = (fundo) => {
    if (fundo === 'Verde') {
      updateFundo('train-verde');
    } else if (fundo === 'Azul') {
      updateFundo('train-azul');
    } else if (fundo === 'Amarela') {
      updateFundo('train-amarela');
    } else if (fundo === 'Vermelha') {
      updateFundo('train-vermelha');
    }
  }

  return (
    <div className="container">
      <div className='search-container'>
        <select value={code} onChange={handleChange}>
          {STATIONS.map(station => (
            <option value={station.code} key={station.code}>
              {station.name}
            </option>
          ))}
        </select>
      </div>
      <div className='content'>
        {isLoading ? (
          <div className="svg">
            <SVGLoaders.ThreeDots className="loader-blue" />
          </div>
        ) : (
          comboios.map(comboio => (
            <div key={comboio.id} className={'train-' + comboio.linha}>
              {comboio.destino ? <Station trains={comboio} /> : ""}
            </div>
          ))
        )}
      </div>      
    </div>
  );
}

export default App;
