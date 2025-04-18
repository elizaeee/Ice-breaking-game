import React, { useState } from 'react';
import styled from '@emotion/styled';
import { RulesDisplay } from './RulesDisplay';

export const GameSetup: React.FC<GameSetupProps> = ({ onStart, language, onLanguageChange }) => {
  const [playerCount, setPlayerCount] = useState(3);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const rules = {
    en: [
      'Each player takes turns spinning the wheel',
      'Get 10 points for answering questions',
      'Lose 5 points for skipping questions',
      'Use 15 points to make another player answer'
    ],
    zh: [
      '每位玩家輪流轉動輪盤',
      '回答問題可獲得10分',
      '跳過問題扣除5分',
      '使用15分可以指定其他玩家回答'
    ]
  };

  return (
    <Container>
      <Title>{language === 'en' ? 'Game Setup' : '遊戲設置'}</Title>
      <LanguageToggle onClick={onLanguageChange}>
        {language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
      </LanguageToggle>
      
      <SectionTitle>{language === 'en' ? 'Game Rules' : '遊戲規則'}</SectionTitle>
        RuleTitles={language === 'en'? RuleTitles.en : RuleTitles.zh} 
        rules={language === 'en'? rules.en: rules.zh} 
        language={language} 
      />
      
      <SectionTitle>{language === 'en' ? 'Number of Players' : '玩家數量'}</SectionTitle>
      // ... rest of the code ...
    </Container>
  );
}; 