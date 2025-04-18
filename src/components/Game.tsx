import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Wheel } from './Wheel';
import { RulesDisplay } from './RulesDisplay';
import { questions, Question } from '../data/questions';
import { useTranslation } from '../hooks/useTranslation';

type Language = 'zh' | 'en';

interface Player {
  id: number;
  name: string;
  score: number;
}

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 40px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #2C3E50;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const PlayerSetup = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 40px;
`;

const PlayerCountInput = styled.input`
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #4ECDC4;
  border-radius: 8px;
  width: 100px;
  margin: 0 15px;
  text-align: center;
`;

const StartButton = styled.button`
  padding: 12px 30px;
  font-size: 1.2em;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4ECDC4, #45B7AF);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.2);
  }

  &:disabled {
    background: #ccc;
    transform: none;
    box-shadow: none;
  }
`;

const PlayerList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 40px 0;
`;

const PlayerCard = styled.div<{ isSelected?: boolean }>`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;

  ${props => props.isSelected && `
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0,0,0,0.15);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #4ECDC4, #45B7AF);
    }
  `}
`;

const PlayerName = styled.h3`
  color: #2C3E50;
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const PlayerScore = styled.p`
  color: #666;
  font-size: 1.1em;
  margin-bottom: 15px;
`;

const QuestionCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin: 40px auto;
  max-width: 600px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #4ECDC4, #45B7AF);
  }
`;

const QuestionType = styled.p`
  color: #4ECDC4;
  font-weight: bold;
  margin-bottom: 15px;
`;

const QuestionContent = styled.p`
  color: #2C3E50;
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ActionButton = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4ECDC4, #45B7AF);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.2);
  }

  &:disabled {
    background: #ccc;
    transform: none;
    box-shadow: none;
  }
`;

const WheelContainer = styled.div`
  position: relative;
  margin: 40px auto;
  width: 400px;
  height: 400px;
  z-index: 1;
`;

const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4ECDC4, #45B7AF);
  color: white;
  cursor: pointer;
  font-size: 1em;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 100;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.2);
  }
`;

const LanguageToggle = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 100;
`;

const LanguageButton = styled(ActionButton)<{ active: boolean }>`
  padding: 8px 16px;
  font-size: 0.9em;
  background: ${props => props.active ? 'linear-gradient(135deg, #4ECDC4, #45B7AF)' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#2C3E50'};
  box-shadow: ${props => props.active ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'};
`;

export const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>('zh');
  const { t, getList } = useTranslation(language);

  const startGame = () => {
    const newPlayers = Array.from({ length: playerCount }).map((_, index) => ({
      id: index,
      name: `${t('playerPrefix')} ${String.fromCharCode(65 + index)}`,
      score: 0
    }));
    setPlayers(newPlayers);
    setGameStarted(true);
  };

  const handleSpinComplete = (playerIndex: number) => {
    setSelectedPlayer(playerIndex);
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
  };

  const handleAnswer = (answered: boolean) => {
    if (selectedPlayer === null) return;
    
    const newPlayers = [...players];
    if (answered) {
      newPlayers[selectedPlayer].score += 10;
    } else {
      newPlayers[selectedPlayer].score -= 5;
    }
    setPlayers(newPlayers);
    setCurrentQuestion(null);
    setSelectedPlayer(null);
  };

  const handleDelegate = (targetPlayerId: number) => {
    if (selectedPlayer === null || players[selectedPlayer].score < 15) return;
    
    const newPlayers = [...players];
    newPlayers[selectedPlayer].score -= 15;
    setPlayers(newPlayers);
    setSelectedPlayer(targetPlayerId);
  };

  const handleBackToHome = () => {
    setGameStarted(false);
    setPlayers([]);
    setCurrentQuestion(null);
    setSelectedPlayer(null);
  };

  if (!gameStarted) {
    return (
      <GameContainer>
        <LanguageToggle>
          <LanguageButton 
            active={language === 'zh'} 
            onClick={() => setLanguage('zh')}
          >
            中文
          </LanguageButton>
          <LanguageButton 
            active={language === 'en'} 
            onClick={() => setLanguage('en')}
          >
            English
          </LanguageButton>
        </LanguageToggle>
        <Header>
          <Title>{t('gameTitle')}</Title>
        </Header>
        <PlayerSetup>
          <h2>{t('setPlayerCount')}</h2>
          <div style={{ margin: '20px 0' }}>
            <PlayerCountInput
              type="number"
              min="2"
              max="8"
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
            />
            <StartButton onClick={startGame}>{t('startGame')}</StartButton>
          </div>
        </PlayerSetup>
        <RulesDisplay 
        RuleTitles={getList('RuleTitles')} 
        rules={getList('rulesList')} 
        language={language} 
        />
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <LanguageToggle>
        <LanguageButton 
          active={language === 'zh'} 
          onClick={() => setLanguage('zh')}
        >
          中文
        </LanguageButton>
        <LanguageButton 
          active={language === 'en'} 
          onClick={() => setLanguage('en')}
        >
          English
        </LanguageButton>
      </LanguageToggle>
      <BackButton onClick={handleBackToHome}>
        ← {t('backToHome')}
      </BackButton>
      <Header>
        <Title>{t('gameTitle')}</Title>
      </Header>
      
      <WheelContainer>
        <Wheel 
          players={players.length} 
          onSpinComplete={handleSpinComplete}
          language={language}
        />
      </WheelContainer>
      
      <PlayerList>
        {players.map((player, index) => (
          <PlayerCard key={player.id} isSelected={index === selectedPlayer}>
            <PlayerName>{t('playerPrefix')} {String.fromCharCode(65 + index)}</PlayerName>
            <PlayerScore>{t('score')}: {player.score}</PlayerScore>
            {selectedPlayer !== null && selectedPlayer !== index && players[selectedPlayer].score >= 15 && (
              <ActionButton onClick={() => handleDelegate(index)}>
                {t('delegateAction')}
              </ActionButton>
            )}
          </PlayerCard>
        ))}
      </PlayerList>

      {currentQuestion && (
        <QuestionCard>
          <QuestionType>{currentQuestion.type[language]}</QuestionType>
          <QuestionContent>{currentQuestion.content[language]}</QuestionContent>
          <ButtonGroup>
            <ActionButton onClick={() => handleAnswer(true)}>
              {t('answer')} ({t('pointsGained')})
            </ActionButton>
            <ActionButton onClick={() => handleAnswer(false)}>
              {t('skip')} ({t('pointsLost')})
            </ActionButton>
          </ButtonGroup>
        </QuestionCard>
      )}
    </GameContainer>
  );
};