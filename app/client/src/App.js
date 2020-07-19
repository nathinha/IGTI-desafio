import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { getPeriods, getTransactions } from './services/api';

import Periods from './sections/Periods';
import Summary from './sections/Summary';
import Transactions from './sections/Transactions';

export default function App() {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(moment().format('YYYY-MM'));
  const transactions = useRef([]);

  useEffect(() => {
    const initialize = async () => {
      let p = await getPeriods();
      setPeriods(p);
    }

    const gatherData = async () => {
      transactions.current = await getTransactions(selectedPeriod);
    }

    if (periods.length === 0) {
      initialize();
    }
    gatherData();

  }, [periods, selectedPeriod]);

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
        <Summary items={transactions.current} />
        <div className="divider"></div>
        <Transactions items={transactions.current} />
      </div>
    </div>
  );
}
