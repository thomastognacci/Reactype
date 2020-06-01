import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  solved?: 1 | -1;
  small?: boolean;
  char?: string;
  timeMax?: number | undefined;
  onClick?: () => void;
}

const shrink = keyframes`
  from {
    transform: scaleY(1);
  }

  to {
    transform: scaleY(0);
  }
`;

const Container = styled.div<Props>`
  position: relative;
  display: flex;
  font-size: 3em;
  border-radius: 4px;
  min-width: ${({small}) => small ? '1em' : '2em'};
  min-height: ${({small}) => small ? '1em' : '2em'};
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  background-color: white;
  color: ${({ theme }) => theme.colors.purple};
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22),
    -5px -5px 0 rgba(0, 0, 0, 0.22) inset;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  ${({solved}) => solved !== undefined && css`
      background-color: ${solved === 1 ? '#6cff72' : '#ff6e6e'};
  `}

  &:before {
    content: '';
    position: absolute;
    display: ${({ timeMax }) => (timeMax ? 'block' : 'none')};
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #00000040;
    transform-origin: bottom;
    transition: transform 0.25s;
  }

  ${({ timeMax }) =>
    timeMax
      ? css`
          &:before {
            animation: ${shrink} ${timeMax / 1000}s linear running;
          }
        `
      : null}
`;

const KeyBoardKey = styled.div`
  position: relative;
  z-index: 1;
`;

const Key: React.FC<Props> = ({ solved, small, char, timeMax, onClick }) => {
  return (
    <Container solved={solved} small={small} timeMax={timeMax} onClick={onClick}>
      {char && (<KeyBoardKey>{char}</KeyBoardKey>)}
    </Container>
  );
};

export default Key;
