import React from 'react';
import styled from 'styled-components';
import GameConsole from './components/GameConsole';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <GameConsole />
    </AppContainer>
  );
};

export default App; 