import React, { useState } from 'react';

import { formatCurrency } from '../utils/formatter';
import ModalDelete from './modal/ModalDelete';
import ModalForm from './modal/ModalForm';

import css from './transaction.module.css';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const Transaction = (props) => {
  const { item, onUpdate, onDelete } = props;
  const { _id, day, category, description, value, type } = item;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

  // open update modal when update button is clicked
  const onClickUpdate = () => {
    setIsUpdateModalOpen(true);
  }

  // perform update if modal is closed and executeUpdate is true
  const onExecuteUpdate = (executeUpdate, transaction) => {
    setIsUpdateModalOpen(false);

    if (executeUpdate === true) {
      onUpdate(_id, transaction);
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
          onClick={onClickUpdate}
        >
          <FiEdit2 size={18} />
        </button>
        <button
          className="waves-effect btn-flat"
          onClick={onClickDelete}
        >
          <FiTrash2 size={18} />
        </button>
        <ModalDelete execute={onExecuteDelete} modalIsOpen={isDeleteModalOpen} />
        <ModalForm execute={onExecuteUpdate} modalIsOpen={isUpdateModalOpen} transaction={item} />
      </div>
    </div >
  );
}

export default Transaction;
