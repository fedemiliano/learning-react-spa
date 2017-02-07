import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/users';
import UsersList from './UsersList';
import * as actionsAuth from '../../actions/auth';

class UsersPage extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse, 
                    text: !this.state.collapse ? 'Cerrar' : 'Agregar Usuario' })
  }

  componentDidMount() {
      this.props.fetchAllUsers([]);
  }

  render() {
   const { users } = this.props;
    return (
      <UsersList users={users} />
    )
  }
}

UsersPage.propTypes = {
  users: PropTypes.object.isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
}

function mapStateToProps(state, props) {
  return {    
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionsAuth, actions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);