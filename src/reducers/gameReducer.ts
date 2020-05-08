type Actions =
  | {
      type: 'NEXT_INDEX';
    }
  | {
      type: 'RESTART';
    };

type letters = string[];

type State = {
  index: number;
  letters: letters;
};

const gameReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'NEXT_INDEX':
      return {
        ...state,
        index: state.index + 1,
      };
    default:
      return state;
  }
};

export default gameReducer;
