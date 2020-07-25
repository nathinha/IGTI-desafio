import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getPeriods, getTransactions, deleteTransaction, updateTransaction, addTransaction } from './services/api';

import Periods from './sections/Periods';
import NewTransaction from './sections/NewTransaction';
import SearchBox from './sections/SearchBox';
import Summary from './sections/Summary';
import Transactions from './sections/Transactions';


export default function App() {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(moment().format('YYYY-MM'));
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionFilter, setTransactionFilter] = useState('');

  useEffect(() => {
    const initialize = async () => {
      const t = await getPeriods();
      setPeriods(t);
    }

    initialize();
  }, []);

  useEffect(() => {
    const gatherData = async () => {
      const t = await getTransactions(selectedPeriod);
      const transactions = t.map(transaction => {
        return {
          ...transaction,
          filterDesc: transaction.description.toLowerCase()
        }
      })
      setTransactions(
        transactions.sort((a, b) => a.day - b.day)
      );
    }

    gatherData();
  }, [selectedPeriod]);

  useEffect(() => {
    setFilteredTransactions(Object.assign([], transactions));
  }, [transactions]);

  const handleFilterChange = (newFilter) => {
    setTransactionFilter(newFilter);

    const filterLC = newFilter.toLowerCase();
    const filteredTransactions = transactions.filter(transaction => {
      return transaction.filterDesc.includes(filterLC);
    });

    setFilteredTransactions(
      filteredTransactions.filter(transaction => transaction.description.toLowerCase().indexOf(filterLC) !== -1)
    );
  }

  const handleSelectChange = (value) => {
    setSelectedPeriod(value);
  }

  const handleAddTransaction = async (newTransaction) => {
    const t = await addTransaction(newTransaction);
    const temp = [...transactions, t];
    temp.sort((a, b) => a.day - b.day);
    setTransactions(temp);
  }

  const handleUpdateTransaction = async (id, newTransaction) => {
    await updateTransaction(id, newTransaction);
    setTransactions(
      transactions.map(transaction =>
        transaction._id === newTransaction._id
          ? { ...newTransaction }
          : transaction
      ));
  }

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id);
    setTransactions(
      transactions.filter(transaction => transaction._id !== id)
    );
  }

  return (
    <div className="container">
      <div className="row center">
        <h1>Bootcamp Full Stack - Desafio Final</h1>
        <h3>Controle Financeiro Pessoal</h3>
        <div className="row valign-wrapper">
          <div className="col l3">
            <Periods
              value={selectedPeriod}
              periods={periods}
              onSelectChange={handleSelectChange}
            />
          </div>
          <div className="col">
            <NewTransaction
              onAdd={handleAddTransaction}
            />
          </div>
          <div className="col l7">
            <SearchBox
              filter={transactionFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="divider"></div>

        <Summary items={transactions} />

        <div className="divider"></div>

        <Transactions
          items={filteredTransactions}
          onUpdate={handleUpdateTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}
