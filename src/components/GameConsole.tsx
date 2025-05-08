import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import StartScreen from './screens/StartScreen';
import BootingScreen from './screens/BootingScreen';
import GameSelectionScreen from './screens/GameSelectionScreen';
import MemoryGame from './games/MemoryGame';
import LoveQuiz from './games/LoveQuiz';
import LoveNotes from './games/LoveNotes';

// Game state types
type GameState = 'startup' | 'booting' | 'game-selection' | 'memory-game' | 'love-quiz' | 'love-notes';

// Animasi untuk title
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.1);
  }
  30% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.1);
  }
  60% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components for the game console
const ConsoleContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 600px;
  background-color: #ff80ab;
  border-radius: 40px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ConsoleHeader = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 20px;
  background: linear-gradient(
    90deg, 
    #ff80ab 0%, 
    #ff4081 25%, 
    #f06292 50%,
    #ff4081 75%,
    #ff80ab 100%
  );
  background-size: 200% auto;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
  animation: ${shimmer} 5s linear infinite;
  position: relative;
  flex: 1;
  margin: 0 15px;
`;

const HeartIcon = styled.span`
  display: inline-block;
  margin-left: 8px;
  color: #fff;
  animation: ${heartbeat} 2s infinite;
`;

const TopControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

const ConsoleScreen = styled.div`
  flex: 1;
  background-color: #f8f8ff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ConsoleLights = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Light = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const PowerButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f8f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ff80ab;
  font-size: 24px;
  border: 2px solid #ffb6c1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 0 15px rgba(255, 128, 171, 0.5);
  }
`;

const SoundButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f8f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ff80ab;
  font-size: 18px;
  border: 2px solid #ffb6c1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 0 15px rgba(255, 128, 171, 0.5);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DPad = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const DPadButton = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #f8f8ff;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:active {
    transform: translateY(2px);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const UpButton = styled(DPadButton)`
  top: 0;
  left: 40px;
`;

const DownButton = styled(DPadButton)`
  bottom: 0;
  left: 40px;
`;

const LeftButton = styled(DPadButton)`
  left: 0;
  top: 40px;
`;

const RightButton = styled(DPadButton)`
  right: 0;
  top: 40px;
`;

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const ActionButton = styled.button<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:active {
    transform: translateY(2px);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

// Event Emitter untuk komunikasi antar komponen
type EventType = 'prev-slide' | 'next-slide' | 'up-navigation' | 'down-navigation';

class GameEventEmitter {
  private listeners: { [key in EventType]?: Array<() => void> } = {};

  on(event: EventType, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]?.push(callback);
  }

  emit(event: EventType) {
    this.listeners[event]?.forEach(callback => callback());
  }

  off(event: EventType, callback: () => void) {
    if (this.listeners[event]) {
      const index = this.listeners[event]?.indexOf(callback) ?? -1;
      if (index > -1) {
        this.listeners[event]?.splice(index, 1);
      }
    }
  }
}

export const gameEvents = new GameEventEmitter();

// Main component
const GameConsole: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('startup');
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [previousState, setPreviousState] = useState<GameState>('startup');

  // Effect to handle the startup sequence
  useEffect(() => {
    if (isPoweredOn && gameState === 'startup') {
      const timer = setTimeout(() => {
        setGameState('booting');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    if (isPoweredOn && gameState === 'booting') {
      const timer = setTimeout(() => {
        setGameState('game-selection');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isPoweredOn, gameState]);

  // Effect untuk menyimpan state sebelumnya
  useEffect(() => {
    if (gameState !== previousState) {
      setPreviousState(gameState);
    }
  }, [gameState, previousState]);

  // Handler for power button
  const handlePowerButton = () => {
    if (!isPoweredOn) {
      setIsPoweredOn(true);
      setGameState('startup');
    } else {
      setIsPoweredOn(false);
      setGameState('startup');
    }
  };

  // Handler for sound button
  const handleSoundButton = () => {
    setIsSoundOn(!isSoundOn);
  };

  // Handler for selecting games
  const handleSelectGame = (game: 'memory-game' | 'love-quiz' | 'love-notes') => {
    setPreviousState(gameState);
    setGameState(game);
  };

  // Handler for returning to game selection
  const handleBackToMenu = () => {
    setPreviousState(gameState);
    setGameState('game-selection');
  };

  // Handler untuk tombol B (kembali)
  const handleBackButton = () => {
    if (!isPoweredOn) return;
    
    // Jika sedang di game, kembali ke menu pilihan game
    if (gameState === 'memory-game' || gameState === 'love-quiz' || gameState === 'love-notes') {
      setGameState('game-selection');
    } 
  };

  // Handler untuk tombol navigasi
  const handleLeftButton = () => {
    if (gameState === 'memory-game') {
      gameEvents.emit('prev-slide');
    }
  };

  const handleRightButton = () => {
    if (gameState === 'memory-game') {
      gameEvents.emit('next-slide');
    }
  };

  const handleUpButton = () => {
    if (gameState === 'game-selection' || gameState === 'memory-game') {
      gameEvents.emit('up-navigation');
    }
  };

  const handleDownButton = () => {
    if (gameState === 'game-selection' || gameState === 'memory-game') {
      gameEvents.emit('down-navigation');
    }
  };

  // Render screen based on current game state
  const renderScreen = () => {
    if (!isPoweredOn) {
      return <StartScreen />;
    }

    switch (gameState) {
      case 'startup':
        return <StartScreen />;
      case 'booting':
        return <BootingScreen />;
      case 'game-selection':
        return <GameSelectionScreen onSelectGame={handleSelectGame} />;
      case 'memory-game':
        return <MemoryGame onBack={handleBackToMenu} />;
      case 'love-quiz':
        return <LoveQuiz onBack={handleBackToMenu} />;
      case 'love-notes':
        return <LoveNotes onBack={handleBackToMenu} />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <>
      <TopControlsRow>
        <PowerButton onClick={handlePowerButton}>
          ⏻
        </PowerButton>
        <ConsoleHeader>
          For My Favorite Person <HeartIcon>❤️</HeartIcon>
        </ConsoleHeader>
        <SoundButton onClick={handleSoundButton}>
          {isSoundOn ? '🔊' : '🔇'}
        </SoundButton>
      </TopControlsRow>
      <ConsoleContainer>
        <ConsoleLights>
          <Light color="#FF5252" />
          <Light color="#FFEB3B" />
          <Light color="#4CAF50" />
        </ConsoleLights>
        
        <ConsoleScreen>
          {renderScreen()}
        </ConsoleScreen>
        
        <ButtonsContainer>
          <DPad>
            <UpButton onClick={handleUpButton}>▲</UpButton>
            <LeftButton onClick={handleLeftButton}>◀</LeftButton>
            <RightButton onClick={handleRightButton}>▶</RightButton>
            <DownButton onClick={handleDownButton}>▼</DownButton>
            <CenterCircle />
          </DPad>
          
          <ActionButtons>
            <ActionButton color="#42a5f5" onClick={() => {}}>X</ActionButton>
            <ActionButton color="#66bb6a" onClick={() => {}}>Y</ActionButton>
            <ActionButton color="#ffca28" onClick={() => {}}>A</ActionButton>
            <ActionButton color="#ef5350" onClick={handleBackButton}>B</ActionButton>
          </ActionButtons>
        </ButtonsContainer>
      </ConsoleContainer>
    </>
  );
};

export default GameConsole; 