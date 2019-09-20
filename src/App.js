import React, { useEffect, useState } from "react";
import axios from "axios";
import * as moment from "moment";

import * as SVGLoaders from "svg-loaders-react";

import "./App.css";
import Station from "./Station";

import dotenv from 'dotenv';

function App() {
  const [isLoading, updateIsLoading] = useState(true);
  const [caisSodre, updateCaisSodre] = useState({});
  const [telheiras, updateTelheiras] = useState({});
  const [rato, updateRato] = useState({});
  const [odivelas, updateOdivelas] = useState({});
  const [stApolonia, updateStApolonia] = useState({});
  const [reboleira, updateReboleira] = useState({});

  dotenv.config();

  useEffect(() => {
    async function getData() {
      updateIsLoading(true);
      const res = await axios.get(
        "https://api.metrolisboa.pt:8243/estadoServicoML/1.0.0/tempoEspera/Estacao/CG",
        {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_KEY
          }
        }
      );

      res.data.resposta.forEach(entry => {
        const a = entry.hora.substr(0, 4);
        const m = entry.hora.substr(4, 2);
        const d = entry.hora.substr(6, 2);
        const h = entry.hora.substr(8, 2);
        const mn = entry.hora.substr(10, 2);
        const s = entry.hora.substr(12, 2);
        let hora = `${a}-${m}-${d}T${h}:${mn}:${s}`;
        let tempo1, tempo2, tempo3;

        if ( !entry.tempoChegada1 || entry.tempoChegada1 == '0' || isNaN(entry.tempoChegada1)) {
          tempo1 = '--:--:--';
        } else {
          tempo1 = moment(hora)
          .add(entry.tempoChegada1, "s")
          .format("HH:mm:ss");
        }

        if ( !entry.tempoChegada2 || entry.tempoChegada2 == '0' || isNaN(entry.tempoChegada2)) {
          tempo2 = '--:--:--';
        } else {
          tempo2 = moment(hora)
          .add(entry.tempoChegada2, "s")
          .format("HH:mm:ss");
        }

        if ( !entry.tempoChegada3 || entry.tempoChegada3 == '0' || isNaN(entry.tempoChegada3)) {
          tempo3 = '--:--:--';
        } else {
          tempo3 = moment(hora)
          .add(entry.tempoChegada3, "s")
          .format("HH:mm:ss");
        }

        switch (entry.destino) {
          case "54": // Cais do Sodre
            updateCaisSodre({
              tempoChegada1: tempo1,
              tempoChegada2: tempo2,
              tempoChegada3: tempo3
            });
            break;
          case "50": // Telheiras
            updateTelheiras({
              tempoChegada1: tempo1,
              tempoChegada2: tempo2,
              tempoChegada3: tempo3
            });
            break;
          case "48": // Rato
            updateRato({
              tempoChegada1: tempo1,
              tempoChegada2: tempo2,
              tempoChegada3: tempo3
            });
            break;
          case "43": // Odivelas
            updateOdivelas({
              tempoChegada1: tempo1,
              tempoChegada2: tempo2,
              tempoChegada3: tempo3
            });
            break;
          default:
            break;
        }
      });

      const res2 = await axios.get(
        "https://api.metrolisboa.pt:8243/estadoServicoML/1.0.0/tempoEspera/Estacao/AV",
        {
          headers: {
            Authorization: "Bearer 8c9f863b-f8af-3592-ae31-c3e3e4d8eff1"
          }
        }
      );

      res2.data.resposta.forEach(entry => {
        const a = entry.hora.substr(0, 4);
        const m = entry.hora.substr(4, 2);
        const d = entry.hora.substr(6, 2);
        const h = entry.hora.substr(8, 2);
        const mn = entry.hora.substr(10, 2);
        const s = entry.hora.substr(12, 2);
        var hora = `${a}-${m}-${d}T${h}:${mn}:${s}`;
        let tempo1, tempo2, tempo3;

        if ( !entry.tempoChegada1 || entry.tempoChegada1 == '0' || isNaN(entry.tempoChegada1)) {
          tempo1 = '--:--:--';
        } else {
          tempo1 = moment(hora)
          .add(entry.tempoChegada1, "s")
          .format("HH:mm:ss");
        }
        if ( !entry.tempoChegada2 || entry.tempoChegada2 == '0' || isNaN(entry.tempoChegada2)) {
          tempo2 = '--:--:--';
        } else {
          tempo2 = moment(hora)
          .add(entry.tempoChegada2, "s")
          .format("HH:mm:ss");
        }
        if ( !entry.tempoChegada3 || entry.tempoChegada3 == '0' || isNaN(entry.tempoChegada3)) {
          tempo3 = '--:--:--';
        } else {
          tempo3 = moment(hora)
          .add(entry.tempoChegada3, "s")
          .format("HH:mm:ss");
        }

        switch (entry.destino) {
          case "42": // Santa Apolonia
            updateStApolonia({
              tempoChegada1: tempo1,
              tempoChegada2: tempo2,
              tempoChegada3: tempo3
            });
            break;
          case "33": // Reboleira
            updateReboleira({
              tempoChegada1: tempo1,
              tempoChegada2: tempo2,
              tempoChegada3: tempo3
            });
            break;
          default:
            break; 
        }
      });
      updateIsLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="global-container">
      <div className="container">
        <div className="line-container linha-azul">
          <div className="line-blue">
            <h5>Linha Azul</h5>
          </div>
          {isLoading ? (
            <div className="svg">
              <SVGLoaders.ThreeDots className='loader-blue' />
            </div>
          ) : (
            <Station stationname="Santa Apolónia" trains={stApolonia} />
          )}
          {isLoading ? (
            <div className="svg">
              <SVGLoaders.ThreeDots className='loader-blue' />
            </div>
          ) : (
            <Station
              stationname="Reboleira"
              trains={reboleira}
              style={{ alignSelf: "center" }}
            />
          )}
        </div>
        <div className="line-container linha-amarela">
          <div className="line-yellow">
            <h5>Linha Amarela</h5>
          </div>
          {isLoading ? (
            <div className="svg">
              <SVGLoaders.ThreeDots className='loader-yellow' />
            </div>
          ) : (
            <Station stationname="Rato" trains={rato} />
          )}
          {isLoading ? (
            <div className="svg">
              <SVGLoaders.ThreeDots className='loader-yellow' />
            </div>
          ) : (
            <Station
              stationname="Odivelas"
              trains={odivelas}
              style={{ alignSelf: "center" }}
            />
          )}
        </div>
        <div className="line-container linha-verde">
          <div className="line-green">
            <h5>Linha Verde</h5>
          </div>
          {isLoading ? (
            <div className="svg">
              <SVGLoaders.ThreeDots className='loader-green' />
            </div>
          ) : (
            <Station stationname="Cais do Sodré" trains={caisSodre} />
          )}
          {isLoading ? (
            <div className="svg">
              <SVGLoaders.ThreeDots className='loader-green' />
            </div>
          ) : (
            <Station
              stationname="Telheiras"
              trains={telheiras}
              style={{ alignSelf: "center" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
