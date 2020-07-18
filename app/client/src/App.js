import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { getPeriods, getTransactions } from './services/api';

import Spinner from './components/Spinner';

import Periods from './sections/Periods';
import Transactions from './sections/Transactions';

export default function App() {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(moment().format('YYYY-MM'));
  const transactions = useRef([]);

  useEffect(() => {
    const initialize = async () => {
      const response = await getPeriods();
      setPeriods(response);
    }

    const gatherData = async () => {
      if (periods.length > 0) {
        transactions.current = await getTransactions(selectedPeriod);
      }
    }

    initialize();
    gatherData();

  }, [periods.length, selectedPeriod]);

  const handleSelectChange = (value) => {
    setSelectedPeriod(value);
  }

  return (
    <div className="container">
      <div className="row center">
        <h1>Bootcamp Full Stack - Desafio Final</h1>
        {periods.length === 0 && <Spinner />}
        {periods.length > 0 &&
          <>
            <Periods
              value={selectedPeriod}
              periods={periods}
              onSelectChange={handleSelectChange}
            />
            {transactions.current.length === 0 && <Spinner />}
            {transactions.current.length > 0 &&
              <>
                <div className="divider"></div>

                <h5>Summary Placeholder</h5>

                <div className="divider"></div>

                <Transactions items={transactions.current} />
              </>
            }
          </>
        }
      </div>
    </div>
  );
}
