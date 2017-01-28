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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsDialog from '../../actions/dialogs/tasks';
import * as actionsTasks from '../../actions/tasks';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class Task extends Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  changeTask = () => {
    this.props.open("Modificar tarea", "UPDATE", this.props.task)
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {task, removeTask, open} = this.props
    let secondaryText = ""
    Object.keys(task).map((key, index) => {
        if(key !== 'createdBy' && key !== 'key')
          secondaryText += task[key] + ", "
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
        onTouchTap={()=>removeTask(task)}
      />,
    ];      
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.changeTask}>Modificar</MenuItem>
        <MenuItem onTouchTap={this.handleOpen}>Eliminar</MenuItem>
      </IconMenu>
    );    
    return(
      <div className="col-xs-12 start-xs">
      <ListItem
        leftCheckbox={<Checkbox />}
        primaryText={task.description}
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
        ¿Quieres eliminar la tarea: {task.description}?
      </Dialog>          
      </div>
    )
  }
};

Task.propTypes = {
  task: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsDialog, dispatch);
}

export default connect(null, mapDispatchToProps)(Task);
