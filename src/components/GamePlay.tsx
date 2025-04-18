import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from '../hooks/useTranslation';

interface GamePlayProps {
  players: string[];
  currentPlayer: number;
  onAnswer: (answer: boolean) => void;
  onBack: () => void;
  language: 'zh' | 'en';
  onLanguageChange: () => void;
}

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #2D3436;
  margin-bottom: 20px;
  text-align: center;
`;

const CurrentPlayer = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
  text-align: center;
  color: #2D3436;
`;

const Question = styled.div`
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #2D3436;
`;

const AnswerButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
`;

const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: #6C757D;
  color: white;
  border: none;
  cursor: pointer;
`;

const LanguageToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #6C757D;
  color: white;
  border: none;
  cursor: pointer;
`;

export const GamePlay: React.FC<GamePlayProps> = ({ 
  players, 
  currentPlayer, 
  onAnswer, 
  onBack, 
  language, 
  onLanguageChange 
}) => {
  const { t } = useTranslation(language);

  // 根據語言設置顯示玩家名稱
  const displayPlayerName = language === 'en' 
    ? `Player ${String.fromCharCode(65 + currentPlayer)}`
    : `玩家${String.fromCharCode(65 + currentPlayer)}`;

  return (
    <Container>
      <Title>{language === 'en' ? 'Game Play' : '遊戲進行'}</Title>
      <BackButton onClick={onBack}>
        {language === 'en' ? 'Back' : '返回'}
      </BackButton>
      <LanguageToggle onClick={onLanguageChange}>
        {language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
      </LanguageToggle>

      <CurrentPlayer>
        {language === 'en' 
          ? `Current Player: ${displayPlayerName}`
          : `當前玩家：${displayPlayerName}`
        }
      </CurrentPlayer>

      <Question>
        {language === 'en' ? 'Your Question:' : '你的問題：'}
      </Question>

      <AnswerButton onClick={() => onAnswer(true)}>
        {language === 'en' ? 'Yes' : '是'}
      </AnswerButton>
      <AnswerButton onClick={() => onAnswer(false)}>
        {language === 'en' ? 'No' : '否'}
      </AnswerButton>
    </Container>
  );
}; 