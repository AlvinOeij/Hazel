import React, { useState } from 'react';
import styled from 'styled-components';

interface LoveNotesProps {
  onBack: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2196f3;
  margin-bottom: 15px;
  font-weight: 600;
`;

const NoteContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
`;

const NoteIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2196f3;
`;

const NoteText = styled.p`
  font-size: 1.1rem;
  color: #333;
  text-align: center;
  line-height: 1.5;
  font-style: italic;
`;

const NoteAuthor = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-top: 10px;
  align-self: flex-end;
  font-weight: 500;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const HeartBackground = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.1;
  z-index: 0;
  color: #e91e63;
  font-size: 2rem;
  
  &:nth-child(1) {
    top: 10px;
    left: 10px;
  }
  
  &:nth-child(2) {
    bottom: 10px;
    right: 10px;
  }
  
  &:nth-child(3) {
    bottom: 30px;
    left: 30px;
    transform: rotate(20deg);
  }
  
  &:nth-child(4) {
    top: 30px;
    right: 20px;
    transform: rotate(-15deg);
  }
`;

// Love notes data
const loveNotes = [
  {
    icon: "💖",
    text: "Every moment spent with you feels like a beautiful dream that I never want to wake up from.",
    author: "With all my love"
  },
  {
    icon: "💌",
    text: "If I had to choose between breathing and loving you, I would use my last breath to say 'I love you.'",
    author: "Forever yours"
  },
  {
    icon: "✨",
    text: "You're not just my favorite person, you're my favorite everything.",
    author: "Yours truly"
  },
  {
    icon: "🌙",
    text: "I knew I loved you when 'home' went from being a place to being a person.",
    author: "Always thinking of you"
  },
  {
    icon: "🌈",
    text: "In a world full of people, my eyes will always search for you.",
    author: "Loving you always"
  },
  {
    icon: "🌹",
    text: "Your love is the light that guides me through my darkest days.",
    author: "Eternally grateful"
  },
  {
    icon: "💕",
    text: "Every day I fall in love with you more and more. It's not just because you're flawless; it's because you love my flaws.",
    author: "Your admirer"
  },
  {
    icon: "🦋",
    text: "I never believed in soulmates until I met you. Now I can't imagine life any other way.",
    author: "Completely yours"
  }
];

const LoveNotes: React.FC<LoveNotesProps> = ({ onBack }) => {
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
  
  const handlePreviousNote = () => {
    setCurrentNoteIndex((prev) => 
      prev === 0 ? loveNotes.length - 1 : prev - 1
    );
  };
  
  const handleNextNote = () => {
    setCurrentNoteIndex((prev) => 
      prev === loveNotes.length - 1 ? 0 : prev + 1
    );
  };
  
  const currentNote = loveNotes[currentNoteIndex];
  
  return (
    <Container>
      <Title>Love Notes</Title>
      
      <NoteContainer>
        <HeartBackground>❤️</HeartBackground>
        <HeartBackground>❤️</HeartBackground>
        <HeartBackground>❤️</HeartBackground>
        <HeartBackground>❤️</HeartBackground>
        
        <NoteIcon>{currentNote.icon}</NoteIcon>
        <NoteText>"{currentNote.text}"</NoteText>
        <NoteAuthor>— {currentNote.author}</NoteAuthor>
      </NoteContainer>
      
      <ButtonRow>
        <Button onClick={handlePreviousNote}>Previous</Button>
        <Button onClick={onBack}>Back to Menu</Button>
        <Button onClick={handleNextNote}>Next</Button>
      </ButtonRow>
    </Container>
  );
};

export default LoveNotes; 