import React from 'react';
import styles from './ErrorModal.module.css';
import Card from '../UI/Card';
import ButtonComponent from '../UI/Button';
// portal 기능을 사용하기 위한 import
import ReactDOM from 'react-dom';

const BackDrop = ({ onConfirm }) => {
  return <div className={styles.backdrop} onClick={onConfirm} />;
};

const ModalOverlay = ({ title, message, onConfirm }) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>
      <div className={styles.content}>
        <p>{message}</p>
      </div>
      <footer className={styles.actions}>
        <ButtonComponent onclick={onConfirm}>Okay</ButtonComponent>
      </footer>
    </Card>
  );
};

const ErrorModal = ({ title, message, onConfirm }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onConfirm={onConfirm} />,
        document.getElementById('backdrop-root'),
      )}

      {ReactDOM.createPortal(
        <ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
        document.getElementById('overlay-root'),
      )}
    </>
  );
};

export default ErrorModal;
