import React from 'react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-700 hover:text-red-900 font-bold text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
