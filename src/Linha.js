import React from 'react';

const Linha = (props) => {
  return (
    <div className='estado__container'>
      <div className={'cor_' + props.nome} />
      <div className='estado'>{props.estado}</div>
    </div>
  )
}

export default Linha;
