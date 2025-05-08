import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const HeartIcon = styled.div`
  color: #ff80ab;
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const Message = styled.div`
  font-size: 1.3rem;
  color: #ff80ab;
  margin-top: 20px;
`;

const Heart = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#ff80ab"
    />
  </svg>
);

const BootingScreen: React.FC = () => {
  return (
    <Container>
      <HeartIcon>
        <Heart />
      </HeartIcon>
      <Message>Booting up...</Message>
    </Container>
  );
};

export default BootingScreen; 