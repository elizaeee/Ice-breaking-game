import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from '../hooks/useTranslation';

const Card = styled.div<{ isCurrentPlayer: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.isCurrentPlayer ? '#4ECDC4' : 'transparent'};
  transform: ${props => props.isCurrentPlayer ? 'scale(1.05)' : 'scale(1)'};
`;

const PlayerName = styled.h3`
  color: #2C3E50;
  margin: 0 0 10px 0;
  font-size: 1.2em;
`;

const Score = styled.div`
  color: #4ECDC4;
  font-size: 1.5em;
  font-weight: bold;
`;

interface PlayerCardProps {
  playerName: string;
  score: number;
  playerIndex: number;
  language: 'zh' | 'en';  // Ensure the language prop is passed here
  isCurrentPlayer?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  playerName,
  score,
  playerIndex,
  language,
  isCurrentPlayer = false
}) => {
  const { t } = useTranslation(language);
  const playerLetter = String.fromCharCode(65 + playerIndex);
  const displayPlayerName = t('playerNameWithLetter', { letter: playerLetter });  // Make sure this is linked to translation

  return (
    <Card isCurrentPlayer={isCurrentPlayer}>
      <PlayerName>{language === 'en' 
          ? `Current Player: ${displayPlayerName}`
          : `當前玩家：${displayPlayerName}`
        }</PlayerName>  {/* Ensure translation is applied here */}
      <Score>{score}</Score>
    </Card>
  );
};
