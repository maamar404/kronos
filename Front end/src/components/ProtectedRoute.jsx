import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { LoginModal } from './LoginModal';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control modal visibility
  
  useEffect(() => {
    if (!user) {
      setIsLoginModalOpen(true); // Open the login modal if user is not authenticated
    }
  }, [user]);

  if (!user) {  
    return (
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    );
  }

  return children;
};