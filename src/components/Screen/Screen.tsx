import React, { useReducer } from 'react';
import styled from 'styled-components';

import gameReducer, { settingsInitialState } from '../../reducers/game';
import Game from '../Game/Game';
import Menu from '../Menu/Menu';

const ScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Screen: React.FC = () => {
  const [store, dispatch] = useReducer(gameReducer, settingsInitialState());

  return (
    <ScreenContainer>
      <Menu store={store} dispatch={dispatch} />
      <Game key={store.difficulty} store={store} dispatch={dispatch} />
      {/* <HUD /> */}
    </ScreenContainer>
  );
};

export default Screen;
