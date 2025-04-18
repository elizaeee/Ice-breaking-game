import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const WheelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const WheelWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

const flashAnimation = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5);
  }
  100% {
    filter: brightness(1);
  }
`;

const highlightAnimation = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.8) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
  }
  100% {
    filter: brightness(1);
  }
`;

interface WheelCanvasProps {
  isSpinning: boolean;
}

const WheelCanvas = styled(motion.div)<WheelCanvasProps>`
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${props => props.isSpinning ? flashAnimation : 'none'} 0.5s ease-in-out infinite;
`;

const HighlightedPath = styled.path<{ isSelected: boolean }>`
  animation: ${props => props.isSelected ? highlightAnimation : 'none'} 1.5s ease-in-out infinite;
`;

const PlayerBlocks = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const PlayerBlock = styled.div<{ color: string; isSelected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: ${props => props.isSelected ? '0 0 10px rgba(0,0,0,0.3)' : 'none'};
  transform: ${props => props.isSelected ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.3s ease;
`;

const SpinButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #4ECDC4, #45B7AF);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const colors = [
  '#FF6B6B', // 鮮紅色
  '#4ECDC4', // 青綠色
  '#FFD93D', // 明黃色
  '#6C5CE7', // 紫色
  '#00B894', // 翠綠色
  '#FF8B94', // 粉紅色
  '#0984E3', // 天藍色
  '#FDCB6E', // 金黃色
  '#E17055', // 珊瑚紅
  '#00CEC9', // 青色
  '#6C5CE7', // 深紫色
  '#FF7675', // 玫瑰紅
  '#74B9FF', // 淺藍色
  '#55EFC4', // 薄荷綠
  '#FFA502', // 橙色
  '#FF4757'  // 鮮紅色
];

interface WheelProps {
  players: number;
  onSpinComplete: (playerIndex: number) => void;
  language: 'zh' | 'en';
}

export const Wheel: React.FC<WheelProps> = ({ players, onSpinComplete, language }) => {
  const controls = useAnimation();
  const isSpinning = useRef(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const { t } = useTranslation(language);

  const spin = async () => {
    if (isSpinning.current) return;
    isSpinning.current = true;
    setSelectedIndex(null);

    const spins = 5 + Math.random() * 5;
    const segmentAngle = 360 / players;
    const finalRotation = spins * 360 + Math.random() * 360;
    
    const normalizedRotation = finalRotation % 360;
    const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
    const finalIndex = (players - selectedIndex - 1) % players;

    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 4,
        ease: [0.2, 0.8, 0.2, 1]
      }
    });

    setSelectedIndex(finalIndex);
    isSpinning.current = false;
    onSpinComplete(finalIndex);
  };

  const getSlicePath = (index: number) => {
    const angle = (2 * Math.PI) / players;
    const startAngle = -Math.PI/2 + (players - 1 - index) * angle;
    const endAngle = -Math.PI/2 + (players - index) * angle;
    
    const startX = 50 + 50 * Math.cos(startAngle);
    const startY = 50 + 50 * Math.sin(startAngle);
    const endX = 50 + 50 * Math.cos(endAngle);
    const endY = 50 + 50 * Math.sin(endAngle);
    
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    
    return `M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  return (
    <WheelContainer>
      <WheelWrapper>
        <WheelCanvas
          animate={controls}
          initial={{ rotate: 0 }}
          isSpinning={isSpinning.current}
        >
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            {Array.from({ length: players }).map((_, index) => (
              <HighlightedPath
                key={index}
                d={getSlicePath(index)}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="1"
                isSelected={selectedIndex === index}
              />
            ))}
            <circle cx="50" cy="50" r="5" fill="white" />
          </svg>
        </WheelCanvas>
      </WheelWrapper>

      <PlayerBlocks>
        {Array.from({ length: players }).map((_, index) => (
          <PlayerBlock
            key={index}
            color={colors[index % colors.length]}
            isSelected={selectedIndex === index}
          >
            {String.fromCharCode(65 + index)}
          </PlayerBlock>
        ))}
      </PlayerBlocks>

      <SpinButton 
        onClick={spin} 
        disabled={isSpinning.current}
      >
        {isSpinning.current ? t('spinning') : t('spinWheel')}
      </SpinButton>
    </WheelContainer>
  );
};