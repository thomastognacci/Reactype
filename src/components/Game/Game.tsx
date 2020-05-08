import React, { useReducer } from 'react';
import gameReducer from '../../reducers/gameReducer';

// For later use
interface Props {
  difficulty?: string;
  mode?: string;
  keyboard?: string;
}

const arrayOfLetters = ['H', 'E', 'L', 'L', 'O'];

console.log(gameReducer);

const initialState = {
  index: 0,
  letters: arrayOfLetters,
};

const Game: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const displayChar = (): string => {
    const { index, letters } = state;
    return letters[index];
  };

  console.log('State', state);

  return (
    <div>
      {displayChar()}
      <br />
      <button onClick={() => dispatch({ type: 'NEXT_INDEX' })}>cliclick</button>
    </div>
  );
};

export default Game;
