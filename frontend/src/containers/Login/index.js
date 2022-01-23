import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Alert from 'components/Alert';
import styles from './LoginForm.module.css';

export default function LoginForm({
  onSubmit,
  errorMessage,
  showErrorMessage,
  setShowErrorMessage,
}) {
  const [symbol, setSymbol] = React.useState('');

  return (
    <>
      <div className={styles.loginFormWrapper}>
        <div className={styles.loginFormContainer}>
          <h1 className={styles.subtext}>Mongoto Takehome Exam</h1>
          <div className={styles.subtext}>
            Please enter a cryptocurrency pair/symbol with positive change over
            last 24h
          </div>
          {errorMessage && showErrorMessage && (
            <Alert
              close={() => setShowErrorMessage(false)}
              className={styles.error}
            >
              {errorMessage}
            </Alert>
          )}
          <div className={styles.inputs}>
            <TextInput
              placeholder="Ex.: BTCUSDT"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              size="large"
              display="block"
            />
            <span className={styles.toReset}>
              <Link to="/reset-password">Reset password</Link>
            </span>
            <Button
              size="large"
              display="block"
              onClick={() => onSubmit({ symbol })}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.bigFinger} />
    </>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
