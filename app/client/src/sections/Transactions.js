import React from 'react';
import Transaction from '../components/Transaction';

const Transactions = ({ items, onDelete }) => {
  return (
    <div className="section">
      {items.map((item) => {
        return (
          <Transaction
            key={item._id}
            item={item}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  )
}

export default Transactions;
