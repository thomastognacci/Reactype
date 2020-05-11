import React, { useReducer, useMemo } from 'react';
import styled from 'styled-components';

import gameReducer, { settingsInitialState } from '../../context/reducer';
import { GameContextProvider } from '../../context/context';
import Game from '../Game/Game';
import Menu from '../Menu/Menu';

const ScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Screen: React.FC = () => {
  const [store, dispatch] = useReducer(gameReducer, settingsInitialState);

  // Avoid the children to re-render everytime <Screen> re-renders
  const contextValue = useMemo(() => {
    return { store, dispatch };
  }, [store, dispatch]);

  return (
    <GameContextProvider value={contextValue}>
      <ScreenContainer>
        <Menu />
        <Game key={store.difficulty} />
        {/* <HUD /> */}
      </ScreenContainer>
    </GameContextProvider>
  );
};

export default Screen;
