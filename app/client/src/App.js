import React, { useEffect, useState } from 'react';
import api from './services/api.js';

import Button from './components/Button';
import Select from './components/Select';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function App() {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');

  useEffect(() => {
    const getPeriods = async () => {
      try {
        const response = await api.get('/periods');
        setPeriods(response.data);
      } catch (error) {
        // the user who fights
      }
    }

    getPeriods();
  }, []);

  const handleSelectChange = (value) => {
    setSelectedPeriod(value);
  }

  return (
    <div className="container">
      <div className="row center">
        <h1>Bootcamp Full Stack - Desafio Final</h1>
        <div className="section">
          <h3>Controle Financeiro Pessoal</h3>
          <div className="row valign-wrapper">
            <div className="col">
              <Button><FiArrowLeft /></Button>
            </div>
            <div className="col">
              <Select
                value={selectedPeriod}
                periods={periods}
                onSelectChange={handleSelectChange}
              />
            </div>
            <div className="col">
              <Button><FiArrowRight /></Button>
            </div>
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="section">
          
        </div>
      </div>
    </div>
  );
}
