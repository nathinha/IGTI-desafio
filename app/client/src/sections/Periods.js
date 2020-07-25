import React from 'react';

import Button from '../components/Button';
import Select from '../components/Select';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Periods = (props) => {
  const { value, periods, onSelectChange } = props;

  const select = document.querySelector('.periods');

  const dispatchOnChange = () => {
    let event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    select.dispatchEvent(event);
  }

  const handleClickBack = () => {
    if (select.selectedIndex > 0) {
      select.selectedIndex -= 1;
      dispatchOnChange();
    }
  }

  const handleClickForw = () => {
    const select = document.querySelector('.periods');
    if (select.selectedIndex < select.length - 1) {
      select.selectedIndex += 1;
      dispatchOnChange();
    }
  }

  return (
    <div className="section">
      <div className="row valign-wrapper">
        <div className="col l3">
          <Button
            clickFunction={handleClickBack}
          >
            <FiArrowLeft />
          </Button>
        </div>
        <div className="col l6">
          <Select
            value={value}
            periods={periods}
            onSelectChange={onSelectChange}
          />
        </div>
        <div className="col l3">
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
