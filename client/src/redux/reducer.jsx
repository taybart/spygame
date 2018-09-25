/**
 * Base reducers
 */
const defaultState = {
  gameStatus: false,
  username: '',
  gameId: '',
  isAdmin: false,
};

const base = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_GAME_ID':
      return {
        ...state,
        gameId: action.gameId,
      };
    case 'SET_GAME_STATUS':
      return {
        ...state,
        gameStatus: action.gameStatus,
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username,
      };
    case 'SET_ADMIN_STATUS':
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    case 'SET_PLACES':
      return {
        ...state,
        places: action.places,
      };
    default:
      return state;
  }
};

export default base;
