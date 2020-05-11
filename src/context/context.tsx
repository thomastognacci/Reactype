import React from 'react';
import { settingsInitialState, State, Actions } from './reducer';

interface GameContextInterface {
  store: State;
  dispatch: React.Dispatch<Actions> | null;
}

export const GameContext = React.createContext<GameContextInterface>({
  store: settingsInitialState,
  dispatch: null,
});

export const GameContextProvider = GameContext.Provider;
