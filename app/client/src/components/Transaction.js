import React, { useState } from 'react';

import { formatCurrency } from '../utils/formatter';
import ModalDelete from './modal/ModalDelete';

import css from './transaction.module.css';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const Transaction = (props) => {
  const { item, onDelete } = props;
  const { _id, day, category, description, value, type } = item;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const typeColor = type === '-' ? "red lighten-3" : "green lighten-3";

  // open delete modal when delete button is clicked
  const onClickDelete = () => {
    setIsDeleteModalOpen(true);
  }

  // perform delete if modal is closed and executeDelete is true
  const onExecuteDelete = (executeDelete) => {
    setIsDeleteModalOpen(false);

    if (executeDelete === true) {
      onDelete(_id);
    }
  }

  return (
    <div className={`${css.transaction} row valign-wrapper ${typeColor}`}>
      <div className={`${css.day} col l1`}>
        <span>{day.toString().padStart(2, '0')}</span>
      </div>
      <div className="col l7">
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
      <div className={`${css.icons} col l2`}>
        <button
          className="waves-effect btn-flat"
          onClick={onClickDelete}
        >
          <FiTrash2 size={18} />
        </button>
        <ModalDelete execute={onExecuteDelete} modalIsOpen={isDeleteModalOpen} />
      </div>
    </div >
  );
}

export default Transaction;
