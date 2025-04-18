import React from 'react';
import styled from '@emotion/styled';
import { useLanguage } from '../hooks/useLanguage';

const SwitchButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }
`;

export const LanguageSwitch = () => {
    const { toggleLanguage } = useLanguage();
  
    
  };
  