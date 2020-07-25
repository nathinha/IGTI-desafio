import React from 'react';
import Modal from 'react-modal';
import { FiXSquare } from 'react-icons/fi';

Modal.setAppElement('#root');

const ModalDelete = (props) => {
  const { modalIsOpen, execute } = props;

  const handleClose = () => {
    execute(false);
  }

  const handleSubmit = () => {
    execute(true);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={modalStyle}
        onRequestClose={handleClose}
        contentLabel="Remover Transação?"
      >
        <div className="row">
          <div className="col">
            <div className="row valign-wrapper">
              <div className="col l10 left-align">
                <h5 className="red-text">Remover Transação</h5>
              </div>
              <div className="col l2 right-align">
                <button
                  className="waves-effect btn-flat"
                  onClick={handleClose}
                >
                  <FiXSquare size={20} color='red' />
                </button>
              </div>
            </div>
            <div className="row">
              <h6 style={style.h6} >Esta transação será removida. Deseja continuar?</h6>
            </div>
            <div className="row right-align">
              <div className="col offset-l6 l3">
                <button
                  style={style.button}
                  className="waves-effect btn-flat red"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
              </div>
              <div className="col l3">
                <button
                  style={style.button}
                  className="waves-effect btn-flat green"
                  onClick={handleSubmit}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  },
  content: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const style = {
  button: {
    marginRight: '2px',
    marginLeft: '2px',
    color: "white"
  },
  h6: {
    marginBottom: '50px'
  }
}

export default ModalDelete;
