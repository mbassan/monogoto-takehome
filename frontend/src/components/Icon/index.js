import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import customIcons from './customIcons';
import styles from './Icon.module.css';

export default function Icon({
  variant,
  type,
  title,
  onClick,
  className,
}) {
  let cssName = 'fa fa';
  if (customIcons.indexOf(type) >= 0) {
    cssName = 'icon';
  }
  return (
    <span
      className={clsx(styles.ic, `${cssName}-${type}`, styles[variant], className, onClick && styles.clickable)}
      onClick={onClick}
      role="presentation"
      title={title}
    />
  );
}

Icon.defaultProps = {
  variant: '',
  title: '',
  onClick: null,
  className: null,
};

Icon.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'action', 'success', 'warning', 'danger']),
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
