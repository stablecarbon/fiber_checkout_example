import React from 'react';
import PropTypes from 'prop-types';
import './_button.scss';

function Button(props) {
  const {
    color,
    className,
    children,
    disabled,
    onClick,
    small,
    verifyButton,
    outlined,
    fixed,
    type,
  } = props;

  const onButtonClick = () => {
    onClick();
  };


  return (
    /* eslint-disable */
    <button
      type={type}
      className={`common__button ${color} ${fixed ? 'button--fixed' : ''} ${className} ${outlined ? 'outlined' : 'filled'} ${verifyButton && 'relative-100'}`}
      onClick={onButtonClick}
      disabled={disabled}
      style={{width: small ? '200px' : '', position: small ? 'static' : '', height: small ? '30px' : '', marginTop: small ? '10px' : '' }}
    >
      {children}
    </button>
    /* eslint-enable */
  );
}

Button.defaultProps = {
  color: 'primary',
  disabled: false,
  className: '',
  outlined: false,
  small: false,
  verifyButton: false,
  fixed: false,
  type: 'button',
  onClick: () => {},
};

Button.propTypes = {
  fixed: PropTypes.bool,
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  verifyButton: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  outlined: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
