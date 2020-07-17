import React from 'react';

const Spinner = () => {
  return (
    <div className="row center-align">
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <div>
        <span>Aguarde...</span>
      </div>
    </div>
  )
}

export default Spinner;