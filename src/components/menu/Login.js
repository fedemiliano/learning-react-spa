import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'

export default class Login extends React.Component {

  render() {
    return (
      <div>
        <FlatButton
          label="Login"
          labelStyle={{textTransform: 'none'}}
          containerElement={<Link to="/login" />}
        />
        <FlatButton
          label="Register"
          labelStyle={{textTransform: 'none'}}
          style={{marginTop: 5}}
          containerElement={<Link to="/register" />}
        />        
      </div>
    );
  }
}