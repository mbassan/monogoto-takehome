import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Card.module.css';

export default function Card({
  children,
  className,
}) {
  return (
    <div className={clsx(styles.card, className)}>
      {children}
    </div>
  );
}

Card.defaultProps = {
  className: null,
};

Card.propTypes = {
  className: PropTypes.string,
};
