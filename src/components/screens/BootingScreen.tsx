import React, { useEffect, useState } from 'react';
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
  overflow: hidden;
  position: relative;
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

const explode = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const float = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) rotate(var(--r));
    opacity: 0;
  }
`;

const HeartIcon = styled.div`
  color: #ff80ab;
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${pulse} 1.5s infinite ease-in-out;
  position: relative;
  z-index: 2;
`;

const ExplosionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const ExplosionEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${explode} 2s ease-out forwards;
  background: radial-gradient(circle, rgba(255,128,171,0.3) 0%, rgba(255,128,171,0) 70%);
  border-radius: 50%;
`;

const FloatingHeart = styled.div<{ delay: number; x: number; y: number; rotate: number }>`
  position: absolute;
  color: #ff80ab;
  font-size: ${props => Math.random() * 1 + 0.5}rem;
  --tx: ${props => props.x}px;
  --ty: ${props => props.y}px;
  --r: ${props => props.rotate}deg;
  animation: ${float} 2s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  opacity: 0;
`;

const Message = styled.div`
  font-size: 1.3rem;
  color: #ff80ab;
  margin-top: 20px;
  position: relative;
  z-index: 2;
`;

const Heart = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#ff80ab"
    />
  </svg>
);

const SmallHeart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#ff80ab"
    />
  </svg>
);

const BootingScreen: React.FC = () => {
  const [showExplosion, setShowExplosion] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; delay: number; x: number; y: number; rotate: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExplosion(true);
      const newHearts = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        delay: Math.random() * 0.5,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        rotate: Math.random() * 360
      }));
      setHearts(newHearts);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <HeartIcon>
        <Heart />
      </HeartIcon>
      <Message>Connecting Our Heart</Message>
      
      {showExplosion && (
        <ExplosionContainer>
          <ExplosionEffect />
          {hearts.map(heart => (
            <FloatingHeart 
              key={heart.id} 
              delay={heart.delay} 
              x={heart.x} 
              y={heart.y} 
              rotate={heart.rotate}
            >
              <SmallHeart />
            </FloatingHeart>
          ))}
        </ExplosionContainer>
      )}
    </Container>
  );
};

export default BootingScreen; 