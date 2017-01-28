import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import Snack from './components/snackbars/Snack'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Theme from './Theme'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {openLeft: false, openRight: false}
  }  

  handleToggleLeft = () => this.setState({openLeft: !this.state.openLeft});

  handleToggleRight = () => this.setState({openRight: !this.state.openRight});

  render() {

    const toolBarStyle = {
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      zIndex: 5,
    }
     
    const {username} = this.props;

    return (

        <Theme>
          <div>
            <AppBar style={toolBarStyle} 
                    className="appBar" 
                    iconElementLeft={this.state.openLeft ?
                                    <IconButton><CloseIcon/></IconButton>:
                                    <IconButton><MenuIcon/></IconButton>} 
                    onLeftIconButtonTouchTap={this.handleToggleLeft} 
                    title="React SPA" 
                    iconElementRight={this.state.openRight ?
                                    <IconButton><CloseIcon/></IconButton>:
                                    <IconButton><ChatIcon/></IconButton>}
                    onRightIconButtonTouchTap={this.handleToggleRight} 
            />
            <Snack />
            <Drawer open={this.state.openLeft} containerStyle={{zIndex: 4, marginTop: 50}}>
              <MenuItem onTouchTap={this.handleToggleLeft} primaryText={"Bienvenido @"+username}/>
              <MenuItem onTouchTap={this.handleToggleLeft} primaryText="Totales"/>
              <MenuItem onTouchTap={this.handleToggleLeft} primaryText="Contactos" containerElement={<Link to="/contacts" />}/>
              <MenuItem onTouchTap={this.handleToggleLeft} primaryText="Tareas" containerElement={<Link to="/tasks" />}/>
              <MenuItem onTouchTap={this.handleToggleLeft} primaryText="Negociaciones"/>
              <MenuItem onTouchTap={this.handleToggleLeft} primaryText="Casos"/>
              <MenuItem onTouchTap={this.handleToggleLeft} primaryText="Usuarios" containerElement={<Link to="/users" />}/>
              <MenuItem onTouchTap={this.handleToggleLeft} primaryText="Papelera" containerElement={<Link to="/trash" />}/>
              <MenuItem primaryText="Salir" containerElement={<Link to="/logout" />}/>
            </Drawer>
            <Drawer open={this.state.openRight} openSecondary={true} containerStyle={{zIndex: 4, marginTop: 50}}>
            </Drawer>
            <div style={{zIndex: -1}}>{this.props.children}</div>
          </div>
        </Theme>
    );
  }
}

const mapStateToProps = (state) => state.auth;

export default connect(mapStateToProps, null)(App);

