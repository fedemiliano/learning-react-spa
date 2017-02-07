import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Snack from './components/snackbars/Snack'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Theme from './Theme'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false}
  }  

  handleToggle = () => this.setState({open: !this.state.open});

  render() {

    const toolBarStyle = {
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      zIndex: 5,
    }
     
    const {auth} = this.props;

    return (
        <Theme>
          <div>
            <AppBar style={toolBarStyle} 
                    className="appBar" 
                    iconElementLeft={this.state.open ?
                                    <IconButton><CloseIcon/></IconButton>:
                                    <IconButton><MenuIcon/></IconButton>} 
                    onLeftIconButtonTouchTap={this.handleToggle} 
                    title="React SPA" 
            />
            <Snack store={this.props.store}/>
            <Drawer open={this.state.open} containerStyle={{zIndex: 4, marginTop: 50}}>
              <MenuItem onTouchTap={this.handleToggle} primaryText={"Bienvenido @" + auth.username}/>
              <MenuItem onTouchTap={this.handleToggle} primaryText="Contactos" containerElement={<Link to="/contacts" />}/>
              <MenuItem onTouchTap={this.handleToggle} primaryText="Tareas" containerElement={<Link to="/tasks" />}/>
              <MenuItem onTouchTap={this.handleToggle} primaryText="Usuarios" containerElement={<Link to="/users" />}/>
              <MenuItem onTouchTap={this.handleToggle} primaryText="Papelera" containerElement={<Link to="/trash" />}/>
              <MenuItem primaryText="Salir" containerElement={<Link to="/logout" />}/>
            </Drawer>
            <div style={{zIndex: -1}}>{this.props.children}</div>
          </div>
        </Theme>
    );
  }
}

function mapStateToProps(state, props) {
  return {    
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);

