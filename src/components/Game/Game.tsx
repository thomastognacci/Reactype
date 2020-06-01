import React, { useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';

import { GameContext } from '../../context/context';
import Key from './Key';

interface Props {}

const Container = styled.div``;

const Game: React.FC<Props> = () => {
  const { dispatch, store } = useContext(GameContext);
  const { currentIndex, letters, isComplete, timeMax, withTimeMax } = store;

  const handleUserKeyPress = useCallback(
    (event) => {
      if (!dispatch) return;
      const { key, keyCode } = event;
      const disabledKeys = [
        8,  // Backspace
        9,  // Tab
        13, // Return
        16, // Shift
        17, // Ctrl
        18, // Alt
        32, // Spacebar
        91, // Meta / Windows
        93, // Context Menu
      ];

      if (isComplete || disabledKeys.includes(keyCode)) {
        if (isComplete && keyCode === 32) {
          dispatch({ type: 'RESTART' });
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
    [currentIndex, letters, isComplete, dispatch]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    const timer = setTimeout(() => {
      if (dispatch !== null && timeMax !== null && withTimeMax) {
        dispatch({ type: 'NEXT_LETTER' });
      }
    }, timeMax);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
      clearTimeout(timer);
    };
  }, [handleUserKeyPress, dispatch, timeMax, withTimeMax]);

  const displayChar = (): React.ReactElement => {
    const char = letters[currentIndex];

    return <Key key={`${char}-${currentIndex}`} char={char} timeMax={withTimeMax ? timeMax : undefined} />;
  };

  return (
    <Container>{isComplete ? <Key char="PRESS SPACE TO RESTART" /> : displayChar()}</Container>
  );
};

export default Game;
