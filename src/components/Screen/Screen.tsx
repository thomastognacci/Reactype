import React, { useReducer, useMemo } from 'react';
import styled from 'styled-components';

import gameReducer, { settingsInitialState } from '../../context/reducer';
import { GameContextProvider } from '../../context/context';
import Game from '../Game/Game';
import Menu from '../Menu/Menu';
import HUD from '../HUD/HUD';

const ScreenContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const GameContainer = styled.div<{ menuIsOpen: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 0.35s;
  transform: ${({ menuIsOpen }) => (menuIsOpen ? 'scale(0.8)' : 'scale(1)')};
`;

const Screen: React.FC = () => {
  const [store, dispatch] = useReducer(gameReducer, settingsInitialState);

  // Avoid the children to re-render everytime <Screen> re-renders
  const contextValue = useMemo(() => {
    return { store, dispatch };
  }, [store, dispatch]);

  const { menuIsOpen } = store;

  return (
    <GameContextProvider value={contextValue}>
      <ScreenContainer>
        <Menu menuIsOpen={menuIsOpen} />
        <GameContainer menuIsOpen={menuIsOpen}>
          <Game />
          <HUD />
        </GameContainer>
      </ScreenContainer>
    </GameContextProvider>
  );
};

export default Screen;
