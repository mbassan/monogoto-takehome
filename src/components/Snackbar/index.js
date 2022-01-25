import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Snackbar.module.css';

export default function Snackbar({
  children,
  show,
  className,
}) {
  return (
    <div className={clsx(styles.snackbar, className, show && styles.visible)}>
      {children}
    </div>
  );
}

Snackbar.defaultProps = {
  show: false,
  className: '',
};

Snackbar.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
};
