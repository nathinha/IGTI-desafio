import React from 'react';
import Transaction from '../components/Transaction';

const Transactions = ({ items }) => {
  return (
    <div className="section">
      {items.map((item) => {
        return (
          <Transaction key={item._id} item={item} />
        );
      })}
    </div>
  )
}

export default Transactions;
