import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ui/components/Icon';
import clsx from 'clsx';
import styles from './Button.module.css';

export default function Button({
  variant,
  size,
  className,
  display,
  children,
  disabled,
  onClick,
  iconButton,
}) {
  function styleChild(elem, i) {
    if (typeof elem === 'string' || !elem) {
      return <span key={i}>{elem}</span>;
    }

    return (
      <elem.type
        {...elem.props}
        key={i}
        className={elem.type === Icon && clsx(styles.icon, iconButton && styles.iconButton)}
      />
    );
  }

  function styleChildren(elems) {
    if (!(elems instanceof Array)) {
      return styleChild(elems);
    }

    return elems.map((elem, i) => styleChild(elem, i));
  }

  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[display],
        iconButton && styles.iconButton,
        className,
      )}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {styleChildren(children)}
    </button>
  );
}

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  className: '',
  display: 'inline',
  disabled: false,
  iconButton: false,
  onClick: () => {},
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'default',
    'action',
    'success',
    'warning',
    'danger',
    'panel',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  display: PropTypes.oneOf(['inline', 'block']),
  disabled: PropTypes.bool,
  iconButton: PropTypes.bool,
  onClick: PropTypes.func,
};
