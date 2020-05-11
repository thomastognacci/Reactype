import React, { useContext } from 'react';
import { GameContext } from '../../context/context';
import { GAME_DIFFICULTY } from '../../types/enums';
import styled from 'styled-components';

interface Props {}

const DifficultyPicker = styled.div`
  position: absolute;
  top: 2rem;
`;

const Menu: React.FC<Props> = () => {
  const { dispatch, store } = useContext(GameContext);
  if (!dispatch || !store) return null;
  const { difficulty } = store;
  return (
    <DifficultyPicker>
      <form action="">
        <label htmlFor="easy">easy</label>
        <input
          type="radio"
          name="difficulty"
          id="easy"
          value={GAME_DIFFICULTY.EASY}
          onChange={() => dispatch({ type: 'SET_DIFFICULTY', value: GAME_DIFFICULTY.EASY })}
          checked={difficulty === GAME_DIFFICULTY.EASY}
        />
        <label htmlFor="medium">medium</label>
        <input
          type="radio"
          name="difficulty"
          id="medium"
          value={GAME_DIFFICULTY.MEDIUM}
          onChange={() => dispatch({ type: 'SET_DIFFICULTY', value: GAME_DIFFICULTY.MEDIUM })}
          checked={difficulty === GAME_DIFFICULTY.MEDIUM}
        />
        <label htmlFor="hard">hard</label>
        <input
          type="radio"
          name="difficulty"
          id="hard"
          value={GAME_DIFFICULTY.HARD}
          onChange={() => dispatch({ type: 'SET_DIFFICULTY', value: GAME_DIFFICULTY.HARD })}
          checked={difficulty === GAME_DIFFICULTY.HARD}
        />
      </form>
    </DifficultyPicker>
  );
};

export default Menu;
