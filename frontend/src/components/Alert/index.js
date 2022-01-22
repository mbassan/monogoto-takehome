import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ui/components/Icon';
import clsx from 'clsx';
import styles from './Alert.module.css';

const icons = {
  error: 'alert-circle',
  warning: 'alert-circle',
  success: 'submit',
};

export default function Alert({
  variant,
  children,
  className,
  close,
}) {
  return (
    <div className={clsx(styles.alert, styles[variant], className)}>
      <Icon className={styles[`icon-${variant}`]} type={icons[variant]} />
      <div className={styles.alertContent}>
        {children}
      </div>
      <Icon className={styles.closeIcon} type="times" variant="secondary" onClick={close} />
    </div>
  );
}

Alert.defaultProps = {
  variant: 'error',
  className: '',
  close: () => {},
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['error', 'warning', 'success']),
  className: PropTypes.string,
  close: PropTypes.func,
};
