import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Theme from '../../Theme'

class RegisterPage extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const name = document.getElementById('name');    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    this.props.register(email.value, password.value, name.value)    
  }

  
  render () {
    const style = {
      width: '60%',
      marginTop: '20px',
      marginBottom: '20px'
    };

    return (
      <Theme>       
        <div style={{marginTop: 120}} className={"row center-xs"}>
            <div className={"col-xs-10 col-sm-8 col-md-6 col-lg-4"}>
                <div className={"box"}>
                  <Paper>
                    <TextField
                      floatingLabelText="Nombre"
                      id="name"
                    /><br/>
                    <TextField
                      floatingLabelText="Correo electrónico"
                      id="email"
                    /><br/>
                    <TextField
                      floatingLabelText="Contraseña"
                      id="password"
                      type="password"
                    /><br/> 
                    <RaisedButton onClick={this.handleSubmit} label="Crear" primary={true} style={style}/>                  
                  </Paper> 
                </div>
            </div>
        </div> 
      </Theme>
             
    ) 
  }
}

const mapStateToProps = (state) => state.auth;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);