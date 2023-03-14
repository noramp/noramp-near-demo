import styles from './NoRampButton.module.css';

import React from 'react';

type NoRampButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const NoRampButton = ({ onClick, loading, disabled }: NoRampButtonProps) => {
  const renderIcon = () => {
    if (loading) {
      return <LoadingIcon />;
    }

    return (
      <img
        src="https://app.noramp.io/assets/noramp-logo.png"
        width={30}
        height={30}
      />
    );
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span className={styles.icon}>{renderIcon()}</span>
      <span className="">Pay with NoRamp</span>
    </button>
  );
};

const LoadingIcon = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#fff"
    role="presentation"
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(2.5 2.5)" stroke-width="5">
        <circle stroke-opacity=".5" cx="16" cy="16" r="16"></circle>
        <path d="M32 16c0-9.94-8.06-16-16-16">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 16 16"
            to="360 16 16"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </path>
      </g>
    </g>
  </svg>
);

export default NoRampButton;
