import { generateArrayOfLetter } from '../components/utils';

type Actions =
  | {
      type: 'NEXT_LETTER';
    }
  | {
      type: 'RESTART';
    }
  | {
      type: 'MODIFY_SCORE';
      value: number;
    };

type letters = string[];

interface State {
  letters: letters;
  currentIndex: number;
  isComplete: boolean;
  score: number;
  timeMax: number | null;
}

export const gameInitialState = () => ({
  letters: generateArrayOfLetter(5),
  currentIndex: 0,
  isComplete: false,
  score: 0,
  timeMax: 5000,
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
      return {
        ...state,
        score: score + action.value >= 0 ? score + action.value : 0,
      };
    case 'RESTART':
      return gameInitialState();
    default:
      return state;
  }
};

export default gameReducer;
