import React from 'react';

import Button from '../components/Button';
import Select from '../components/Select';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Periods = (props) => {
  const { value, periods, onSelectChange } = props;

  const handleClickBack = () => {
    const select = document.querySelector('.periods');
    if (select.selectedIndex > 0) {
      select.selectedIndex -= 1;

      let event = new Event('change');
      select.dispatchEvent(event);
    }
  }

  const handleClickForw = () => {
    const select = document.querySelector('.periods');
    if (select.selectedIndex < select.length - 1) {
      select.selectedIndex += 1;

      let event = new Event('change');
      select.dispatchEvent(event);
    }
  }

  return (
    <div className="section">
      <h3>Controle Financeiro Pessoal</h3>
      <div className="row valign-wrapper">
        <div className="col">
          <Button
            clickFunction={handleClickBack}
          >
            <FiArrowLeft />
          </Button>
        </div>
        <div className="col">
          <Select
            value={value}
            periods={periods}
            onSelectChange={onSelectChange}
          />
        </div>
        <div className="col">
          <Button
            clickFunction={handleClickForw}
          >
            <FiArrowRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Periods;
