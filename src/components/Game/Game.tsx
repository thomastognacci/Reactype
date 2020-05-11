import React, { useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';

import { GameContext } from '../../context/context';
import Key from './Key';

interface Props {}

const Container = styled.div``;

const Game: React.FC<Props> = () => {
  const { dispatch, store } = useContext(GameContext);
  const { currentIndex, letters, isComplete, timeMax } = store;

  const handleUserKeyPress = useCallback(
    (event) => {
      if (!dispatch) return;
      const { key, keyCode } = event;
      if (isComplete) {
        if (keyCode === 32) {
          dispatch({ type: 'RESTART' });
        }
        return;
      }
      if (key.toLowerCase() === letters[currentIndex].toLowerCase()) {
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
      if (dispatch !== null && timeMax !== null) {
        dispatch({ type: 'NEXT_LETTER' });
      }
    }, timeMax);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
      clearTimeout(timer);
    };
  }, [handleUserKeyPress, timeMax, dispatch]);

  const displayChar = (): React.ReactElement => {
    const char = letters[currentIndex];

    return <Key key={`${char}-${currentIndex}`} char={char} timeMax={timeMax} />;
  };

  return (
    <Container>{isComplete ? <Key char="PRESS SPACE TO RESTART" /> : displayChar()}</Container>
  );
};

export default Game;
