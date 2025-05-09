import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { gameEvents } from '../GameConsole';

interface MemoryGameProps {
  onBack: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #ff4081;
  margin-bottom: 10px;
  font-weight: 600;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

const PhotoSlide = styled.div<{ active: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  animation: ${props => (props.active ? fadeIn : 'none')} 0.5s ease-in-out;
`;

const Photo = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: #ff80ab;
  border-radius: 10px;
`;

const Caption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 64, 129, 0.8);
  color: white;
  padding: 10px;
  font-size: 0.9rem;
  text-align: center;
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 10;
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => (props.active ? '#ff4081' : '#ffb6c1')};
  cursor: pointer;
  transition: background-color 0.3s;
`;

// Mock data untuk carousel foto
const photoData = [
  { 
    id: 1, 
    imageUrl: 'https://images.unsplash.com/photo-1501913752344-988a58aa3426?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
    caption: 'This is my first time to see you'
  },
  { 
    id: 2, 
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
    caption: 'Remember our coffee date? ☕'
  },
  { 
    id: 3, 
    imageUrl: 'https://images.unsplash.com/photo-1556566229-5e5c5c5cd2ab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
    caption: 'That beautiful sunset 🌅'
  },
  { 
    id: 4, 
    imageUrl: 'https://images.unsplash.com/photo-1603400521630-9f2de124b33b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
    caption: 'Our favorite dessert place 🍰'
  },
  { 
    id: 5, 
    imageUrl: 'https://images.unsplash.com/photo-1561565312-3cb5d9af8107?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max',
    caption: 'Movie night with you 🎬'
  }
];

const MemoryGame: React.FC<MemoryGameProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === photoData.length - 1 ? 0 : prevIndex + 1));
  }, []);
  
  const goToPrev = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? photoData.length - 1 : prevIndex - 1));
  }, []);
  
  // Untuk slideshow otomatis
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        goToNext();
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, goToNext]);
  
  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Connect to D-pad events
  useEffect(() => {
    const handlePrevSlide = () => {
      goToPrev();
    };

    const handleNextSlide = () => {
      goToNext();
    };

    // Subscribe to events
    gameEvents.on('prev-slide', handlePrevSlide);
    gameEvents.on('next-slide', handleNextSlide);

    // Cleanup
    return () => {
      gameEvents.off('prev-slide', handlePrevSlide);
      gameEvents.off('next-slide', handleNextSlide);
    };
  }, [goToNext, goToPrev]);
  
  return (
    <Container>
      <CarouselContainer>
        {photoData.map((photo, index) => (
          <PhotoSlide key={photo.id} active={index === currentIndex}>
            <Photo imageUrl={photo.imageUrl} />
            <Caption>{photo.caption}</Caption>
          </PhotoSlide>
        ))}
        
        <Indicators>
          {photoData.map((photo, index) => (
            <Indicator 
              key={photo.id} 
              active={index === currentIndex}
              onClick={() => goToIndex(index)}
            />
          ))}
        </Indicators>
      </CarouselContainer>
    </Container>
  );
};

export default MemoryGame;