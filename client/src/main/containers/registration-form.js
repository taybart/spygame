import { connect } from 'react-redux';
import { setUsername, setGameId, setAdminStatus } from 'redux/actions';
import RegistrationForm from 'main/components/registration-form';

const mapStateToProps = state => ({
  username: state.username,
  places: state.places,
});
const mapDispatchToProps = dispatch => ({
  setGameId: (id) => {
    dispatch(setGameId(id));
  },
  setUsername: (username) => {
    dispatch(setUsername(username));
  },
  setAdminStatus: (isAdmin) => {
    dispatch(setAdminStatus(isAdmin));
  },
});

const RegistrationFormCon = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
export default RegistrationFormCon;


