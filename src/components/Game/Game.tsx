import React, { useReducer, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import gameReducer, { gameInitialState } from '../../reducers/gameReducer';
import Key from './Key';

// For later use
interface Props {
  difficulty?: string;
  mode?: string;
  keyboard?: string;
}

const Container = styled.div``;

const Game: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(gameReducer, gameInitialState());
  const { currentIndex = 0, letters, isComplete = false, score = 0, timeMax = 0 } = state;

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

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    const timer = setTimeout(() => {
      timeMax !== null && dispatch({ type: 'NEXT_LETTER' });
    }, timeMax);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
      clearTimeout(timer);
    };
  }, [handleUserKeyPress, timeMax]);

  const displayChar = (): React.ReactElement => {
    const char = letters[currentIndex];

    return <Key key={`${char}-${currentIndex}`} char={char} timeMax={timeMax} />;
  };
  // console.log('State', state);

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
