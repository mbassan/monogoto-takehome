import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'ui/components/Icon';
import clsx from 'clsx';
import styles from './TextInput.module.css';

export default function TextInput({
	value,
  variant,
  size,
  display,
  className,
  placeholder,
  dataType,
  regex,
  hasError,
  disabled,
  readonly,
  onChange,
  onFocus,
  onBlur,
}) {
  return (
    <div className={styles.textInputWrapper}>
      {variant === 'search' && <Icon type="search-alt" variant="primary" className={styles.searchIcon} />}
      {variant === 'search' && <div className={styles.searchBg} />}
      {variant !== 'multiline'
        ? (
          <input
            type={variant === 'password' ? 'password' : 'text'}
            value={value}
            className={clsx(
              styles[variant],
              styles[size],
              styles[display],
              hasError && styles.error,
              className,
            )}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )
        : (
          <textarea
            value={value}
            className={clsx(
              styles[variant],
              styles[size],
              styles[display],
              hasError && styles.error,
              className,
            )}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
    </div>
  );
}

TextInput.defaultProps = {
  variant: 'normal',
  size: 'medium',
  display: 'block',
  dataType: 'text',
  hasError: false,
  disabled: false,
  readonly: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

TextInput.propTypes = {
  variant: PropTypes.oneOf(['normal', 'password', 'search', 'multiline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  display: PropTypes.oneOf(['inline', 'block']),
  dataType: PropTypes.oneOf(['text', 'integer', 'float', 'url', 'ip-address', 'phone']),
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  multiLine: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
