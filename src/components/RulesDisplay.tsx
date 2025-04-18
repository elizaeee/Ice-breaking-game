import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const RulesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const RuleCard = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
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

const RuleIcon = styled.div`
  font-size: 2em;
  margin-bottom: 15px;
  color: #4ECDC4;
`;

const RuleTitle = styled.h3`
  color:rgb(57, 60, 62);
  margin-bottom: 10px;
  font-size: 1.2em;
  font-weight: bold;
`;

const RuleDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

interface RulesDisplayProps {
  RuleTitles: string[];
  rules: string[];
  language: 'zh' | 'en';
}

export const RulesDisplay: React.FC<RulesDisplayProps> = ({ RuleTitles, rules, language }) => {
  const ruleIcons = ['🎯', '⭐', '⏱️', '🎮'];

  return (
    <RulesContainer>
      {rules.map((rule, index) => (
        <RuleCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <RuleIcon>{ruleIcons[index]}</RuleIcon>
          <RuleTitle>
            {language === 'en' ? `Rule ${index + 1}` : `規則 ${index + 1}`}
          </RuleTitle>
          <RuleDescription>{rule}</RuleDescription>
        </RuleCard>
      ))}
    </RulesContainer>
  );
};