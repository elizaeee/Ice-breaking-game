import React from 'react';
import { Game } from './components/Game';
import { LanguageSwitch } from './components/LanguageSwitch';
import styled from '@emotion/styled';
import { useLanguage } from './hooks/useLanguage';
import { useTranslation } from './hooks/useTranslation';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
`;

function App() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <AppContainer>
      <LanguageSwitch />
      <Game />
    </AppContainer>
  );
}

export default App; 