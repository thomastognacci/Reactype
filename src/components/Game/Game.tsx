import React, { useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';

import { GameContext } from '../../context/context';
import Key from './Key';

interface Props {}

const Container = styled.div``;

const MenuText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: -2em;
  text-align: center;
`;

const Game: React.FC<Props> = () => {
  const { dispatch, store } = useContext(GameContext);
  const { currentIndex, letters, isComplete, timeMax, withTimeMax, menuIsOpen } = store;

  const handleUserKeyPress = useCallback(
    (event) => {
      if (!dispatch) return;
      const { key, keyCode } = event;
      const disabledKeys = [
        8, // Backspace
        9, // Tab
        13, // Return
        16, // Shift
        17, // Ctrl
        18, // Alt
        27, // Escape
        32, // Spacebar
        91, // Meta / Windows
        93, // Context Menu
      ];
      if (menuIsOpen || currentIndex === -1 || isComplete || disabledKeys.includes(keyCode)) {
        if (keyCode === 32) {
          if (currentIndex === -1) {
            dispatch({ type: 'START' });
          } else if (isComplete) {
            dispatch({ type: 'RESTART' });
          }
        }
        if (keyCode === 27) {
          dispatch({ type: 'TOGGLE_MENU' });
        }
        return;
      } else if (key.toLowerCase() === letters[currentIndex].toLowerCase()) {
        dispatch({ type: 'NEXT_LETTER' });
        dispatch({ type: 'MODIFY_SCORE', value: 1 });
      } else {
        dispatch({ type: 'NEXT_LETTER' });
        dispatch({ type: 'MODIFY_SCORE', value: -1 });
      }
    },
    [currentIndex, letters, isComplete, menuIsOpen, dispatch]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    const timer = setTimeout(() => {
      if (currentIndex > -1 && dispatch !== null && timeMax !== null && withTimeMax) {
        dispatch({ type: 'NEXT_LETTER' });
      }
    }, timeMax);

    if (menuIsOpen) {
      clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
      clearTimeout(timer);
    };
  }, [handleUserKeyPress, dispatch, timeMax, withTimeMax, currentIndex, menuIsOpen]);

  const displayChar = (): React.ReactElement => {
    const char = letters[currentIndex];

    return (
      <Key
        key={`${char}-${currentIndex}`}
        char={char}
        timeMax={withTimeMax ? timeMax : undefined}
        menuIsOpen={menuIsOpen}
      />
    );
  };

  return (
    <Container>
      {isComplete || currentIndex === -1 ? (
        <>
          <Key char={`PRESS SPACE TO ${currentIndex === -1 ? 'START' : 'RESTART'}`} />
          <MenuText>
            press <Key char="Esc" small /> to toggle the menu at any time
          </MenuText>
        </>
      ) : (
        displayChar()
      )}
    </Container>
  );
};

export default Game;
