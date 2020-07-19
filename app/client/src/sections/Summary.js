import React from 'react';
import css from './summary.module.css';
import { getReceitas, getDespesas } from '../utils/transactions';
import { formatCurrency } from '../utils/formatter'
import Spinner from '../components/Spinner';

const Summary = ({ items }) => {
  if (items.length === 0) {
    return <Spinner />;
  }

  const lancamentos = items.length;
  const receitas = getReceitas(items);
  const despesas = getDespesas(items);
  const saldo = receitas - despesas;

  const saldoColor = saldo < 0 ? "red-text text-darken-1" : "green-text text-darken-1";

  return (
    <div className="row">
      <div className="col l3 left-align">
        <span className={css.bold}>Lançamentos: </span>
        <span>{lancamentos}</span>
      </div>
      <div className="col l3 left-align">
        <span className={css.bold}>Receitas: </span>
        <span className={`${css.bold} green-text text-darken-1`}>{formatCurrency(receitas)}</span>
      </div>
      <div className="col l3 left-align">
        <span className={css.bold}>Despesas: </span>
        <span className={`${css.bold} red-text text-darken-1`}>{formatCurrency(despesas)}</span>
      </div>
      <div className="col l3 left-align">
        <span className={css.bold}>Saldo: </span>
        <span className={`${css.bold} ${saldoColor}`}>{formatCurrency(saldo)}</span>
      </div>
    </div>
  )
}

export default Summary;
