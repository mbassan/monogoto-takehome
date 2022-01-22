import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Loader.module.css';

const sizes = {
  small: '',
  medium: 'la2x',
  large: 'la3x',
};

export default function Loader({
  isLoading,
  size,
  position,
}) {
  return (
    <div
      className={clsx(
        styles.loader,
        !isLoading && styles.hide,
        styles.loaderBall,
        styles.dark,
        styles[sizes[size]],
        styles[position],
      )}
    >
      <div />
      <div />
      <div />
    </div>
  );
}

Loader.defaultProps = {
  isLoading: false,
  size: 'medium',
  position: 'fixed',
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  position: PropTypes.oneOf(['fixed', 'block', 'inline']),
};
