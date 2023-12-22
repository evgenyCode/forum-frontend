import React from 'react';



type ButtonType = {
  onClick: () => void;
  isLoading?: boolean;
  text: string;
  className?: string;
};

const Button: React.FC<ButtonType> = ({ onClick, isLoading = false, text, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {isLoading ? <>Įkeliama...</> : <>{text}</>}
    </button>
  );
};

export default Button;
