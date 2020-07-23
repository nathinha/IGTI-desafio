import React from 'react';
import Transaction from '../components/Transaction';

const Transactions = ({ items, onUpdate, onDelete }) => {
  return (
    <div className="section">
      {items.map((item) => {
        return (
          <Transaction
            key={item._id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  )
}

export default Transactions;
