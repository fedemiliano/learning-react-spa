import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
import Theme from '../../Theme'

class HomePage extends Component {
  
  render () {
    return (
      <Theme>      
        <div style={{marginTop: 120}} className={"row center-xs"}>
            <div className={"col-xs-10 col-sm-8 col-md-6 col-lg-4"}>
                <h3 style={{marginBottom: 10, padding: 0, display: 'block'}}>¿Estás?</h3>
                <RaisedButton
                    label="Entra"
                    primary={true}
                    labelStyle={{textTransform: 'none'}}
                    containerElement={<Link to="/login" />}
                />
                <h3 style={{marginBottom: 10, padding: 0, display: 'block'}}>¿No?</h3>
                <RaisedButton
                    label="Registrate"
                    primary={true}
                    labelStyle={{textTransform: 'none'}}
                    style={{marginTop: 5}}
                    containerElement={<Link to="/register" />}
                /> 
            </div>
        </div> 
      </Theme>             
    ) 
  }
}

export default HomePage;