import { connect } from 'react-redux';
import { setGameStatus, setPlaces } from 'redux/actions';
import App from 'main/view';

const mapStateToProps = state => ({
  username: state.username,
  gameStatus: state.gameStatus,
  gameId: state.gameId,
  isAdmin: state.isAdmin,
  places: state.places,
});
const mapDispatchToProps = dispatch => ({
  setGameStatus: (gameStatus) => {
    dispatch(setGameStatus(gameStatus));
  },
  setPlaces: (places) => {
    dispatch(setPlaces(places));
  },
});

const AppCon = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppCon;

