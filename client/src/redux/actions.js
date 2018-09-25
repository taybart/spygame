function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const setGameStatus = makeActionCreator('SET_GAME_STATUS', 'gameStatus');
export const setGameId = makeActionCreator('SET_GAME_ID', 'gameId');
export const setUsername = makeActionCreator('SET_USERNAME', 'username');
export const setAdminStatus = makeActionCreator('SET_ADMIN_STATUS', 'isAdmin');
export const setPlaces = makeActionCreator('SET_PLACES', 'places');

