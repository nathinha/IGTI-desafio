import React from 'react';

import css from './transaction.module.css';
import { formatCurrency } from '../utils/formatter'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const Transaction = ({ item }) => {
  const { day, category, description, value, type } = item;

  const typeColor = type === '-' ? "red lighten-3" : "green lighten-3";

  return (
    <div className={`${css.transaction} row valign-wrapper ${typeColor}`}>
      <div className={`${css.day} col l1`}>
        <span>{day.toString().padStart(2, '0')}</span>
      </div>
      <div className="col l8">
        <div className={`${css.category} valign-wrapper`}>
          <span>{category}</span>
        </div>
        <div className="valign-wrapper">
          <span>{description}</span>
        </div>
      </div>
      <div className={`${css.value} col right-align l2`}>
        <div>{formatCurrency(value)}</div>
      </div>
      <div className={`${css.icons} col l1`}>
        <FiEdit2 />
        <FiTrash2 />
      </div>
    </div >
  );
}

export default Transaction;
