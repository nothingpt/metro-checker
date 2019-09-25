const STATIONS = [
  { id: "60", name: "Aeroporto", code: "AP" },
  { id: "34", name: "Amadora Este", code: "AS" },
  { id: "52", name: "Alameda", code: "AM" },
  { id: "99", name: "Alfornelos", code: "AF" },
  { id: "99", name: "Alto dos Moinhos", code: "AH" },
  { id: "51", name: "Alvalade", code: "AL" },
  { id: "99", name: "Ameixoeira", code: "AX" },
  { id: "99", name: "Anjos", code: "AN" },
  { id: "99", name: "Areeiro", code: "AE" },
  { id: "39", name: "Avenida", code: "AV" },
  { id: "56", name: "Bela Vista", code: "BV" },
  { id: "40", name: "Baixa-Chiado", code: "BC" },
  { id: "99", name: "Cabo Ruivo", code: "CR" },
  { id: "54", name: "Cais do Sodré", code: "CS" },
  { id: "99", name: "Carnide", code: "CA" },
  { id: "45", name: "Campo Grande", code: "CG" },
  { id: "46", name: "Campo Pequeno", code: "CP" },
  { id: "57", name: "Chelas", code: "CH" },
  { id: "99", name: "Cidade Universitária", code: "CU" },
  { id: "36", name: "Colégio Militar", code: "CM" },
  { id: "99", name: "Encarnação", code: "EN" },
  { id: "99", name: "Entre Campos", code: "EC" },
  { id: "99", name: "Intendente", code: "IN" },
  { id: "99", name: "Jardim Zoológico", code: "JZ" },
  { id: "37", name: "Laranjeiras", code: "LA" },
  { id: "44", name: "Lumiar", code: "LU" },
  { id: "99", name: "Marquês de Pombal", code: "MP" },
  { id: "53", name: "Martim Moniz", code: "MM" },
  { id: "59", name: "Moscavide", code: "MO" },
  { id: "43", name: "Odivelas", code: "OD" },
  { id: "99", name: "Olaias", code: "OL" },
  { id: "99", name: "Olivais", code: "OS" },
  { id: "99", name: "Oriente", code: "OR" },
  { id: "99", name: "Parque", code: "PA" },
  { id: "99", name: "Picoas", code: "PI" },
  { id: "35", name: "Pontinha", code: "PO" },
  { id: "99", name: "Praça de Espanha", code: "PE" },
  { id: "99", name: "Quinta das Conchas", code: "QC" },
  { id: "48", name: "Rato", code: "RA" },
  { id: "33", name: "Reboleira", code: "RB" },
  { id: "99", name: "Restauradores", code: "RE" },
  { id: "99", name: "Roma", code: "RM" },
  { id: "99", name: "Rossio", code: "RO" },
  { id: "99", name: "Saldanha", code: "SA" },
  { id: "42", name: "Santa Apolónia", code: "SP" },
  { id: "38", name: "São Sebastião", code: "SS" },
  { id: "99", name: "Senhor Roubado", code: "SR" },
  { id: "50", name: "Telheiras", code: "TE" },
  { id: "41", name: "Terreiro do Paço", code: "TP" }
];

function getStationById(id) {
  return STATIONS.filter( s => s.id === id ).map(s => s.name)[0]
}

function getStationByCode(code) {
  return STATIONS.filter( s => s.code === code ).map(s => s.name)[0]
}

function getLinha(orig, dest) {
  let linha = '';

  switch (orig){
    case 'RB': // reboleira
    case 'AS': // Amadora Este
    case 'AF': // Alfornelos
    case 'PO': // Pontinha
    case 'CA': // Carnide
    case 'CM': // Colegio Militar
    case 'AH': // Alto dos Moinhos
    case 'LA': // Laranjeiras
    case 'JZ': // Jardim Zoologico
    case 'PE': // Praca de Espanha
    case 'PA': // Parque
    case 'AV': // Avenida
    case 'RE': // Restauradores
    case 'TP': // Terreiro do Paco
      linha = 'Azul';
      break;
    case 'OD': // Odivelas
    case 'SR': // Senhor Roubado
    case 'AX': // Ameixoeira
    case 'LU': // Lumiar
    case 'QV': // Quinta das Conchas
    case 'CU': // Cidade Universitaria
    case 'EC': // Entre Campos
    case 'CP': // Campo Pequeno
    case 'PI': // Picoas
    case 'RT': // Rato
      linha = 'Amarela';
      break;
    case 'TL': // Telheiras
    case 'AL': // Alvalade
    case 'RM': // Roma
    case 'AE': // Areeiro
    case 'AN': // Anjos
    case 'IN': // Intendente
    case 'MM': // Martim Moniz
    case 'RO': // Rossio
    case 'CS': // Cais do Sodre
      linha = 'Verde';
      break;
    case 'OL': // Olaias
    case 'BV': // Bela Vista
    case 'CH': // Chelas
    case 'OS': // Olivais
    case 'CR': // Cabo Ruivo
    case 'OR': // Oriente
    case 'MO': // Moscavide
    case 'EN': // Encarnacao
    case 'AP': // Aeroporto
      linha = 'Vermelha';
      break;
    case 'CG': // Campo Grande
      if (dest === '48' || dest === '43') {
        linha = 'Amarela';
      } else if (dest === '54' || dest === '50') {
        linha = 'Verde';
      }
      break;
    case 'SS': // Sao Sebastiao
      if ( dest === '42' || dest === '33') {
        linha = 'Azul';
      } else if ( dest === '60') {
        linha = 'Vermelha';
      }
      break;
    case 'MP': // Marques de Pombal
        if ( dest === '42' || dest === '33') {
          linha = 'Azul';
        } else if ( dest === '43' || dest === '48'  || dest === '45') {
          linha = 'Amarela';
        }
      break;
    case 'BC': // Baixa-Chiado 
      if ( dest === '42' || dest === '33') {
        linha = 'Azul';
      } else if ( dest === '50' || dest === '54') {
        linha = 'Verde';
      }
      break;
    case 'SA': // Saldanha 
      if ( dest === '48' || dest === '43') {
        linha = 'Amarela';
      } else if ( dest === '60' || dest === '38') {
        linha = 'Vermelha';
      }
      break;
    case 'AM': // Alameda
      if ( dest === '50' || dest === '54') {
        linha = 'Verde';
      } else if ( dest === '60' || dest === '38') {
        linha = 'Vermelha';
      }
      break;
    default:
      break;
  }
  return linha;
}

export { STATIONS, getLinha, getStationByCode, getStationById };
