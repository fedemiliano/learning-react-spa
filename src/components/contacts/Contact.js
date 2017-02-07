import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router'
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';


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

class Contact extends Component {


  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {contact, removeContact} = this.props
    let secondaryText = ""
    Object.keys(contact).map((key, index) => {
        if(key !== 'name' && key !=='lastName' && key !== 'createdBy' && key !== 'key')
          secondaryText += contact[key] + ", "
        return secondaryText
      }
    )
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Si"
        primary={true}
        onTouchTap={()=>removeContact(contact)}
      />,
    ];      
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem containerElement={<Link to={"/contacts/edit/" + contact.key}/>}>Modificar</MenuItem>
        <MenuItem onTouchTap={this.handleOpen}>Eliminar</MenuItem>
        <MenuItem containerElement={<Link to={"/contacts/" + contact.key}/>}>Ver perfil</MenuItem>
      </IconMenu>
    );    
    return(
      <div className="col-xs-12 start-xs">
      <ListItem
        leftCheckbox={<Checkbox style={style.checkBox} />}
        innerDivStyle={style.innerDiv}
        primaryText={<div><label>{contact.name + " " + contact.lastName}</label><Chip labelStyle={style.chipLabel} style={style.chip}>prueba</Chip></div>}
        rightIconButton={rightIconMenu}
        style={style.listItem}
      />  
      <Divider style={style.divider} />   
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        ¿Quieres eliminar al usuario {contact.name}?
      </Dialog>          
      </div>
    )
  }

};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  removeContact: PropTypes.func.isRequired
}

export default Contact;