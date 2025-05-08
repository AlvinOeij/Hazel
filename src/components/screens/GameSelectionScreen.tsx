import React from 'react';
import styled from 'styled-components';

interface GameSelectionScreenProps {
  onSelectGame: (game: 'memory-game' | 'love-quiz' | 'love-notes') => void;
}

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

const Title = styled.h2`
  font-size: 1.8rem;
  color: #ff4081;
  margin-bottom: 30px;
  font-weight: 600;
`;

const GameButton = styled.button<{ bgColor: string }>`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  font-family: 'Poppins', sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const GameSelectionScreen: React.FC<GameSelectionScreenProps> = ({ onSelectGame }) => {
  return (
    <Container>
      <Title>Choose a Game</Title>
      
      <GameButton 
        bgColor="#ff4081"
        onClick={() => onSelectGame('memory-game')}
      >
        Memories of Us
      </GameButton>
      
      <GameButton 
        bgColor="#9c27b0"
        onClick={() => onSelectGame('love-quiz')}
      >
        Love Quiz
      </GameButton>
      
      <GameButton 
        bgColor="#2196f3"
        onClick={() => onSelectGame('love-notes')}
      >
        Love Notes
      </GameButton>
    </Container>
  );
};

export default GameSelectionScreen; 