import { GAME_DIFFICULTY, GAME_MODE, GAME_KEYBOARD } from '../types/enums';
import { generateArrayOfLetter } from '../components/utils';

export type Actions =
  | {
      type: 'SET_DIFFICULTY';
      value: GAME_DIFFICULTY;
    }
  | {
      type: 'SET_MODE';
      value: GAME_MODE;
    }
  | {
      type: 'SET_KEYBOARD';
      value: GAME_KEYBOARD;
    }
  | {
      type: 'NEXT_LETTER';
    }
  | {
      type: 'RESTART';
    }
  | {
      type: 'MODIFY_SCORE';
      value: 1 | -1;
    };

type letters = string[];

export interface State {
  letters: letters;
  currentIndex: number;
  isComplete: boolean;
  score: number;
  timeMax: number | undefined;
  withTimeMax: boolean;
  history: (1|-1)[] | [];
  difficulty: GAME_DIFFICULTY;
  mode?: GAME_MODE;
  keyboard?: GAME_KEYBOARD;
}

interface InitialState {
  letters: letters;
  currentIndex: number;
  isComplete: boolean;
  score: number;
  history: (1|-1)[] | [];
  withTimeMax: boolean,
}

const initialState = () : InitialState => ({
  letters: generateArrayOfLetter(10),
  currentIndex: 0,
  isComplete: false,
  score: 0,
  history: [],
  withTimeMax: true,
});

export const settingsInitialState = {
  ...initialState(),
  timeMax: 4000,
  difficulty: GAME_DIFFICULTY.EASY,
  mode: GAME_MODE.LETTERS,
  keyboard: GAME_KEYBOARD.AZERTY,
};

const restartGame = () => ({
  ...initialState()
});

const gameReducer = (state: State, action: Actions) => {
  const { currentIndex, letters, score } = state;
  switch (action.type) {
    case 'NEXT_LETTER':
      if ((currentIndex || 0) < letters.length - 1) {
        return {
          ...state,
          currentIndex: (currentIndex || 0) + 1,
        };
      }
      return {
        ...state,
        isComplete: true,
      };
    case 'MODIFY_SCORE':
      const { history, isComplete } = state;
      const newHistory = [...history]
      if (!isComplete && currentIndex <= letters.length - 1) {
        newHistory[currentIndex - 1] = action.value;
      } else {
        newHistory[letters.length - 1] = action.value;
      }
      return {
        ...state,
        score: score + action.value >= 0 ? score + action.value : 0,
        history: newHistory,
      };  
    case 'RESTART':
      return {
        ...state,
        ...restartGame(),
      };
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.value,
        timeMax: 4000 / Math.exp(action.value),
      };
    case 'SET_MODE':
    case 'SET_KEYBOARD':
    default:
      return state;
  }
};

export default gameReducer;
