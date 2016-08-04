import { connect } from 'react-redux';
import App from './App';

function mapStateToProps(state) {
  const { auth } = state;
  return {
    user: auth ? auth.user : null,
  };
}

export default connect(mapStateToProps)(App);
