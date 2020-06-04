import React, { useContext } from 'react';
import { GameContext } from '../../context/context';
import { GAME_DIFFICULTY } from '../../types/enums';
import styled from 'styled-components';

interface Props {
  menuIsOpen: boolean;
}

const FormContainer = styled.div`
  position: absolute;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
  background: #3f51b5;
`;

const MenuContainer = styled.div<Props>`
  position: absolute;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2a1136ab;
  transform: ${({ menuIsOpen }) => (menuIsOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.35s;

  ${FormContainer} {
    transform: ${({ menuIsOpen }) => (menuIsOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.4s 0.2s;
  }
`;

const DifficultyPicker = styled.div``;

const Menu: React.FC<Props> = ({ menuIsOpen }) => {
  const { dispatch, store } = useContext(GameContext);
  if (!dispatch || !store) return null;
  const { difficulty } = store;
  return (
    <MenuContainer menuIsOpen={menuIsOpen}>
      <FormContainer>
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
      </FormContainer>
    </MenuContainer>
  );
};

export default Menu;
