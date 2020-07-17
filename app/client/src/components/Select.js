import React, { useEffect } from 'react';
import M from 'materialize-css';

const Select = (props) => {
  const { value, periods, onSelectChange } = props;

  useEffect(() => {
    M.AutoInit();
  }, []);

  const handleChange = (event) => {
    onSelectChange(event.target.value);
  }

  return (
    <div className="input-field">
      <select value={value} onChange={handleChange}>
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
