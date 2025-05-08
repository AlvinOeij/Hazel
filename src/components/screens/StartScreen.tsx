import React from 'react';
import styled from 'styled-components';

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

const Message = styled.div`
  font-size: 1.3rem;
  color: #aaa;
  margin-top: 20px;
`;

const StartScreen: React.FC = () => {
  return (
    <Container>
      <Message>Press the power button to start</Message>
    </Container>
  );
};

export default StartScreen; 