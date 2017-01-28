import { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/auth';

class LogoutPage extends Component {

  componentWillMount() {
    this.props.logOut();
    this.props.router.replace('/')
  }

  render() {
    return null
  }
}


const mapStateToProps = (state) => state.auth;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogoutPage));