import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router'
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
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
        leftCheckbox={<Checkbox />}
        primaryText={contact.name + " " + contact.lastName}
        secondaryText={secondaryText}
        rightIconButton={rightIconMenu}
      />  
      <Divider inset={true} />   
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        ¿Quieres eliminar al usuairo {contact.name}?
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