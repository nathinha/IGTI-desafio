import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import moment from 'moment';

import { expenseCategories, revenueCategories } from '../../utils/categories';
import { FiXSquare } from 'react-icons/fi';

Modal.setAppElement('#root');

const ModalForm = (props) => {
  const { modalIsOpen, execute, transaction } = props;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [newTransaction, setNewTransaction] = useState({});
  const active = useRef('');

  useEffect(() => {
    if (transaction !== null) {
      setCategoriesList(transaction.type === '-' ? expenseCategories : revenueCategories);
      setSelectedCategory(transaction.category);
      setNewTransaction(transaction);
      active.current = 'active';
    }
  }, [transaction]);

  const dismiss = () => {
    execute(false);
  }

  const handleSubmit = () => {
    execute(true, newTransaction);
  }

  const handleExpenseChange = (_) => {
    setCategoriesList(expenseCategories);

    setNewTransaction(prev => ({
      ...prev,
      type: '-'
    }));
  }

  const handleRevenueChange = (_) => {
    setCategoriesList(revenueCategories);

    setNewTransaction(prev => ({
      ...prev,
      type: '+'
    }));
  }

  const handleCategoryChange = (event) => {
    const category = event.target.value;

    setSelectedCategory(category);

    setNewTransaction(prev => ({
      ...prev,
      category
    }));
  }

  const handleDescriptionChange = (event) => {
    const description = event.target.value;

    setNewTransaction(prev => ({
      ...prev,
      description
    }));
  }

  const handleValueChange = (event) => {
    const value = event.target.value;

    setNewTransaction(prev => ({
      ...prev,
      value
    }));
  }

  const handleDateChange = (event) => {
    const date = moment(event.target.value, 'YYYY-MM-DD');

    setNewTransaction(prev => ({
      ...prev,
      day: date.day(),
      month: date.month(),
      year: date.year(),
      yearMonth: date.format('YYYY-MM'),
      yearMonthDay: date.format('YYYY-MM-DD')
    }));
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={modalStyle}
        onRequestClose={dismiss}
      >
        <div className="row">
          <div className="col">
            <div className="row valign-wrapper">
              <div className="col l10 left-align">
                <h5>Atualização de Transação</h5>
              </div>
              <div className="col l2 right-align">
                <button
                  className="waves-effect btn-flat"
                  onClick={dismiss}
                >
                  <FiXSquare size={20} color='red' />
                </button>
              </div>
            </div>

            {/* entry type radio buttons */}
            <div className="row">
              <div className="col">
                <label>
                  <input
                    className="with-gap"
                    name="type"
                    type="radio"
                    id="expense"
                    onChange={handleExpenseChange}
                    defaultChecked={transaction && transaction.type === '-'}
                  />
                  <span>Despesa</span>
                </label>
              </div>
              <div className="col">
                <label>
                  <input
                    className="with-gap"
                    name="type"
                    type="radio"
                    id="revenue"
                    onChange={handleRevenueChange}
                    defaultChecked={transaction && transaction.type === '+'}
                  />
                  <span>Receita</span>
                </label>
              </div>
            </div>

            {/* entry category */}
            <div className="row">
              <div className="input-field">
                <select
                  className="browser-default"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option key="disabled" value="" disabled>Escolha a categoria</option>
                  {categoriesList.map((category) => {
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* entry description */}
            <div className="row">
              <div className="input-field">
                <input
                  className="validate"
                  id="description"
                  type="text"
                  onChange={handleDescriptionChange}
                  defaultValue={transaction && transaction.description}
                />
                <label htmlFor="description">Descrição</label>
              </div>
            </div>

            {/* entry value and date */}
            <div className="row valign-wrapper">
              <div className="col">
                <div className="input-field">
                  <input
                    className="validate"
                    id="description"
                    type="number"
                    onChange={handleValueChange}
                    defaultValue={transaction && transaction.value}
                  />
                  <label htmlFor="description">Valor</label>
                </div>
              </div>
              <div className="col">
                <input
                  className="datepicker"
                  type="date"
                  onChange={handleDateChange}
                  defaultValue={transaction && transaction.yearMonthDay}
                />
              </div>
            </div>

            {/* ok/cancel buttons */}
            <div className="row right-align">
              <div className="col offset-l6 l3">
                <button
                  style={style.button}
                  className="waves-effect btn-flat red"
                  onClick={dismiss}
                >
                  Cancelar
                </button>
              </div>
              <div className="col l3">
                <button
                  style={style.button}
                  className="waves-effect btn-flat green"
                  onClick={handleSubmit}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  },
  content: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const style = {
  button: {
    marginRight: '2px',
    marginLeft: '2px',
    color: "white"
  },
  h6: {
    marginBottom: '50px'
  }
}

export default ModalForm;
