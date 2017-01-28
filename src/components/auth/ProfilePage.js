import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class ProfilePage extends Component {

  render () {

    return (
     <div>Profile!</div>
    )
  }
}

const mapStateToProps = (state) => state.auth;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);