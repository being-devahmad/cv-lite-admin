import React, { useEffect, useState } from 'react';

interface PopupAlertProps {
  message: string;
  success: boolean;
}

const PopupAlert: React.FC<PopupAlertProps> = ({ message, success }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
      success ? 'bg-green-500' : 'bg-red-500'
    } text-white transition-opacity duration-300`}>
      {message}
    </div>
  );
};

export default PopupAlert;

