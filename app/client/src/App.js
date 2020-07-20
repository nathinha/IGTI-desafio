import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getPeriods, getTransactions } from './services/api';

import Periods from './sections/Periods';
import Summary from './sections/Summary';
import Transactions from './sections/Transactions';


export default function App() {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(moment().format('YYYY-MM'));
  const [transactions, setTransactions] = useState([]);

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
      setTransactions(t);
    }

    gatherData();
  }, [selectedPeriod]);

  const handleSelectChange = (value) => {
    setSelectedPeriod(value);
  }

  return (
    <div className="container">
      <div className="row center">
        <h1>Bootcamp Full Stack - Desafio Final</h1>
        <Periods
          value={selectedPeriod}
          periods={periods}
          onSelectChange={handleSelectChange}
        />
        <div className="divider"></div>
        <Summary items={transactions} />
        <div className="divider"></div>
        <Transactions items={transactions} />
      </div>
    </div>
  );
}
