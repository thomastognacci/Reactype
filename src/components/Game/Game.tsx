import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { State, Actions } from '../../reducers/game';
import Key from './Key';

interface Props {
  store: State;
  dispatch: React.Dispatch<Actions>;
}

const Container = styled.div``;

const Game: React.FC<Props> = ({ store, dispatch }) => {
  const { currentIndex, letters, isComplete, timeMax } = store;

  const handleUserKeyPress = useCallback(
    (event) => {
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
      timeMax !== null && dispatch({ type: 'NEXT_LETTER' });
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
