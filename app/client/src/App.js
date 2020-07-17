import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getPeriods } from './services/api';

import Spinner from './components/Spinner';

import Periods from './sections/Periods';

export default function App() {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(moment().format('YYYY-MM'));

  useEffect(() => {
    const initialize = async () => {
      const response = await getPeriods();
      setPeriods(response);
    }

    initialize();
  }, []);

  const handleSelectChange = (value) => {
    setSelectedPeriod(value);
  }

  return (
    <div className="container">
      <div className="row center">
        <h1>Bootcamp Full Stack - Desafio Final</h1>
        {periods.length === 0 && <Spinner />}
        {periods.length > 0 &&
          <Periods
            value={selectedPeriod}
            periods={periods}
            onSelectChange={handleSelectChange}
          />
        }
      </div>
    </div>
  );
}
