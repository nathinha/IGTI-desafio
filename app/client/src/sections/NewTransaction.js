import React, { useState } from 'react';
import Button from '../components/Button';
import ModalForm from '../components/modal/ModalForm';
import { FiFilePlus } from 'react-icons/fi';

const NewTransaction = ({ onAdd }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // open add transaction modal when add button is clicked
  const onClickAdd = () => {
    setIsAddModalOpen(true);
  }

  // perform add if modal is closed and executeAdd is true
  const onExecuteAdd = (executeAdd, transaction) => {
    setIsAddModalOpen(false);

    if (executeAdd === true) {
      onAdd(transaction);
    }
  }

  return (
    <div className="section">
      <div className="row valign-wrapper">
        <Button
          className="waves-effect btn-flat"
          clickFunction={onClickAdd}
        >
          <FiFilePlus size={18} /> Nova Transação
          </Button>
        <ModalForm execute={onExecuteAdd} modalIsOpen={isAddModalOpen} />
      </div>
    </div>
  )
}

export default NewTransaction;
