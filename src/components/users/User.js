import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

/*
import * as actionsDialog from '../../actions/dialogs/users';
import * as actionsUsers from '../../actions/users';
*/
//import {DateTimeFormat, getHours} from '../../common'

const style = {
  expandMore: {
    padding: 0, 
    height: 38
  },
  checkBox: {
    top: 6
  },
  innerDiv: {
    paddingTop: 10, 
    paddingBottom: 10, 
    paddingLeft: 50, 
    marginRight:-8
  },
  chip: {
    borderRaious: 8, 
    display: 'inline', 
    float:'right'
  },
  chipLabel: {
    padding: 8, 
    lineHeight: 0
  },
  listItem: {
    marginLeft: -10
  },
  divider: {
    marginLeft: 40
  }
}


const iconButtonElement = (
  <IconButton
    style={style.expandMore}
    touch={true}
  >
    <NavigationExpandMoreIcon color={grey400} />
  </IconButton>
);

class User extends Component {

  changeUser = () => {
    this.props.open("Modificar Tarea", "UPDATE", this.props.user)
  };


  removeUser = (user) => {
    this.props.removeUser(user)  
  }

  handleCheck = (e, check) => {
    console.log(check)
    if(check)
      this.props.update(this.props.user, true)
    else
      this.props.update(this.props.user)
  }

  render() {
    const {user, removeUser} = this.props
    /*
    let secondaryText = ""
    secondaryText += new DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(user.timeLimit) + " (" + getHours(new Date(user.timeLimit)) + ")"
    if(user.associatedTo && routing.locationBeforeTransitions.pathname === '/users')
      secondaryText += ', asignado a:' + user.associatedTo.name + ' ' + user.associatedTo.lastName
    */
    const rightIconMenu = (
      <IconMenu  iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.changeUser}>Modificar</MenuItem>
        <MenuItem onTouchTap={()=>removeUser(user)}>Eliminar</MenuItem>
      </IconMenu>
    );    
    return(
      <div className="col-xs-12 start-xs">
        <ListItem
          leftCheckbox={<Checkbox style={style.checkBox} onCheck={this.handleCheck}/>}
          innerDivStyle={style.innerDiv}
          primaryText={<div><label>{user.username}</label><Chip labelStyle={style.chipLabel} style={style.chip}>prueba</Chip></div>}
          rightIconButton={rightIconMenu}
          style={style.listItem}
        />  
        <Divider style={style.divider}/>   
      </div>
    )
  }
};

export default User;
