import React, { useReducer, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';

import { useInterval } from '../utils';
import gameReducer, { gameInitialState } from '../../reducers/gameReducer';
import Key from './Key';

// For later use
interface Props {
  difficulty?: string;
  mode?: string;
  keyboard?: string;
}

const Container = styled.div`
  /* height: 100%; */
`;

const Game: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(gameReducer, gameInitialState());
  const { currentIndex = 0, letters, isComplete = false, score = 0, timeMax = 0 } = state;
  const [timeLeft, setTimeLeft] = useState(timeMax);

  const handleUserKeyPress = useCallback(
    (event) => {
      const { key } = event;
      if (isComplete) return;

      if (key.toLowerCase() === letters[currentIndex].toLowerCase()) {
        dispatch({ type: 'NEXT_LETTER' });
        dispatch({ type: 'MODIFY_SCORE', value: 1 });
      } else {
        dispatch({ type: 'NEXT_LETTER' });
        dispatch({ type: 'MODIFY_SCORE', value: -1 });
      }
    },
    [currentIndex, letters, isComplete]
  );

  const start = Date.now();

  useInterval(() => {
    if (!timeLeft) return;
    if (timeLeft < 0) {
      dispatch({ type: 'NEXT_LETTER' });
    }
    const timeSpent = Date.now() - start;
    setTimeLeft(timeLeft - timeSpent);
  }, 100);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    setTimeLeft(timeMax);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress, timeMax]);

  const displayChar = (): React.ReactElement => {
    return (
      <Key
        char={letters[currentIndex]}
        progress={timeMax && timeLeft ? timeMax - (timeMax - timeLeft) : undefined}
      />
    );
  };
  // console.log('State', state);
  // console.log('Time', timeLeft);
  // console.log('timerId', timerId);

  return (
    <Container>
      {isComplete ? (
        <div>
          ggwp, score: {score}/{letters.length}
          <br />
          <button onClick={() => dispatch({ type: 'RESTART' })}>Restart</button>
        </div>
      ) : (
        displayChar()
      )}
    </Container>
  );
};

export default Game;
