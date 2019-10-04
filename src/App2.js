import React, { useEffect, useState } from "react";
import * as moment from "moment";

import * as SVGLoaders from "svg-loaders-react";

import "./App2.css";
import "./reset.css";

import Station from "./Station";
import Linha from "./Linha";

import {
  STATIONS,
  getLinha,
  getStationByCode,
  getStationById
} from "./helpers/stations";

import dotenv from "dotenv";

function App2(props) {
  var id = 0;
  const [amarela, updateAmarela] = useState("");
  const [azul, updateAzul] = useState("");
  const [verde, updateVerde] = useState("");
  const [vermelha, updateVermelha] = useState("");
  const [code, updateCode] = useState(localStorage.getItem("code") || "CG");
  const [comboios, updateComboios] = useState([]);
  const [isLoading, updateIsLoading] = useState(true);

  dotenv.config();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getEstadoLinhas();
  }, []);

  useEffect(() => {
    localStorage.setItem("code", code);
    getData();
  }, code);

  const handleChange = e => {
    const codEstacao = e.target.value;
    updateCode(codEstacao);
    updateComboios([]);
  };

  const handleClick = () => {
    getEstadoLinhas();
    getData(code);
  };

  async function getEstadoLinhas() {
    const res = await fetch(
      `https://api.metrolisboa.pt:8243/estadoServicoML/1.0.0/estadoLinha/todos`,
      {
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_API_KEY
        })
      }
    ).then(r => r.json());

    updateAmarela(res.resposta.amarela);
    updateAzul(res.resposta.azul);
    updateVerde(res.resposta.verde);
    updateVermelha(res.resposta.vermelha);
  }

  async function getData() {
    let codeEstacao = localStorage.getItem("code") || "CG";
    updateIsLoading(true);

    const res = await fetch(
      `https://api.metrolisboa.pt:8243/estadoServicoML/1.0.0/tempoEspera/Estacao/${codeEstacao}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_API_KEY
        })
      }
    ).then(r => r.json());

    const aComboios = res["resposta"].map(entry => {
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

  return (
    <div className="container">
      <div className="header">
        <div>
          <Linha nome={"amarela"} estado={amarela} />
        </div>
        <div>
          <Linha nome={"azul"} estado={azul} />
        </div>
        <div>
          <Linha nome={"verde"} estado={verde} />
        </div>
        <div>
          <Linha nome={"vermelha"} estado={vermelha} />
        </div>
      </div>
      <div className="content" onClick={handleClick}>
        <div className="select__estacao">
          <select value={code} onChange={handleChange}>
            {STATIONS.map(station => (
              <option value={station.code} key={station.code}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
        <div className="upcoming_trains__container">
          {isLoading ? (
            <div className="svg">
              <SVGLoaders.ThreeDots className="loader-blue" />
            </div>
          ) : (
            comboios.map(comboio => (
              <div key={comboio.id} className={"train-" + comboio.linha}>
                {comboio.destino && <Station trains={comboio} />}
              </div>
            ))
          )}
        </div>
        <div className="footer">
          <div>para actualizar carregar nos horários</div>
        </div>
      </div>
    </div>
  );
}

export default App2;
