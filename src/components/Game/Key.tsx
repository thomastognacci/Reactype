import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  solved?: 1 | -1;
  small?: boolean;
  char?: string;
  timeMax?: number | undefined;
  onClick?: () => void;
  menuIsOpen?: boolean;
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
  display: ${({ small }) => (small ? 'inline-block' : 'flex')};
  font-size: ${({ small }) => (small ? '1.5em' : '3em')};
  margin: ${({ small }) => (small ? '0 .5em' : '0')};
  border-radius: 4px;
  min-width: 2em;
  min-height: 2em;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  background-color: white;
  color: ${({ theme }) => theme.colors.purple};
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22),
    -5px -5px 0 rgba(0, 0, 0, 0.22) inset;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  transition: opacity 0.25s, transform 0.4s;
  transition-timing-function: cubic-bezier(0.25, 0.6, 0, 5);

  ${({ solved }) =>
    solved !== undefined &&
    css`
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

  ${({ timeMax, menuIsOpen }) =>
    timeMax
      ? css`
          &:before {
            animation: ${shrink} ${timeMax / 1000}s linear running;
            animation-play-state: ${menuIsOpen ? 'paused' : 'running'};
          }
        `
      : null}

  &.hud-keys-appear {
    opacity: 0;
    transform: scale(0.9);
  }

  &.hud-keys-appear-done {
    opacity: 1;
    transform: scale(1);
  }
`;

const KeyBoardKey = styled.div`
  position: relative;
  z-index: 1;
`;

const Key: React.FC<Props> = ({ solved, small, char, timeMax, onClick, menuIsOpen }) => {
  return (
    <Container
      solved={solved}
      small={small}
      timeMax={timeMax}
      onClick={onClick}
      menuIsOpen={menuIsOpen}
    >
      {char && <KeyBoardKey>{char}</KeyBoardKey>}
    </Container>
  );
};

export default Key;
