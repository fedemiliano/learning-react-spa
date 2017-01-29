import React, {PropTypes, Component} from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/trash';
import {DateTimeFormat, getHours} from '../../common'


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class Trash extends Component {

  state = {
    open: false,
    type: null,
    title: null,
    message: null
  };

  handleOpen = (type, title, message) => {
    this.setState({open: true, type: type, title: title, message: message});
  };

  restore = () => {
    this.props.open("Modificar Tarea", "UPDATE", this.props.trash)
  };

  handleClose = () => {
    this.setState({open: false, type: null, title: null, message: null});
  };

  handleCheck = (e, check) => {
    console.log(check)
    if(check)
      this.props.toCheck(this.props.trash, true)
    else
      this.props.toCheck(this.props.trash, false)
  }

  render() {
    const {trash, removeTrashItem, restoreTrashItem, routing} = this.props
    let secondaryText = ""
    secondaryText += new DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(trash.timeLimit) + " (" + getHours(new Date(trash.timeLimit)) + ")"
    if(trash.associatedTo && routing.locationBeforeTransitions.pathname === '/trashs')
      secondaryText += ', asignado a:' + trash.associatedTo.name + ' ' + trash.associatedTo.lastName
  
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={()=>restoreTrashItem(trash)}>Restaurar</MenuItem>
        <MenuItem onTouchTap={()=>removeTrashItem(trash)}>Eliminar</MenuItem>
      </IconMenu>
    );    
    return(
      <div className="col-xs-12 start-xs">
      <ListItem
        leftCheckbox={<Checkbox onCheck={this.handleCheck} />}
        primaryText={trash.description}
        secondaryText={secondaryText}
        rightIconButton={rightIconMenu}
      />  
      <Divider inset={true} />            
      </div>
    )
  }
};

Trash.propTypes = {
  routing: PropTypes.object.isRequired,
  removeTrashItem: PropTypes.func.isRequired,
  restoreTrashItem: PropTypes.func.isRequired,
  toCheck: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, props) {
  return {    
    routing: state.routing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
