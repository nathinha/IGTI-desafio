import React from 'react';
import moment from 'moment';
import M from 'materialize-css';

const Select = (props) => {
  const { value, periods, onSelectChange } = props;

  let select = document.querySelector('.periods');

  periods.forEach(period => {
    let option = document.createElement('option');
    option.text = moment(period._id).format('MMM/YYYY');
    option.value = period._id;
    select.appendChild(option);
  });

  M.FormSelect.init(select);

  const handleChange = (event) => {
    onSelectChange(event.target.value);
  }

  return (
    <div className="input-field">
      <select className="periods" value={value} onChange={handleChange}>
      </select>
    </div>
  )
}

export default Select;
