import React, { useEffect } from 'react';
import M from 'materialize-css';

const Select = (props) => {
  const { value, periods, onSelectChange } = props;

  const handleChange = (event) => {
    console.log(event);
    onSelectChange(event.target.value);
  }

  useEffect(() => {
    M.AutoInit();

    const select = document.querySelector('.periods');
    select.addEventListener('input', handleChange)
  });

  return (
    <div className="input-field">
      <select className="periods" value={value} onChange={handleChange}>
        {periods.map((period) => {
          return (
            <option key={period._id} value={period._id}>
              {period._id}
            </option>
          );
        })}
      </select>
    </div>
  )
}

export default Select;
