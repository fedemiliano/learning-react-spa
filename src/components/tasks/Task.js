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
import * as actionsDialog from '../../actions/dialogs/tasks';
import * as actionsTasks from '../../actions/tasks';
import {DateTimeFormat, getHours} from '../../common'


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class Task extends Component {

  changeTask = () => {
    this.props.open("Modificar Tarea", "UPDATE", this.props.task)
  };


  removeTask = (task) => {
    this.props.removeTask(task)  
  }

  handleCheck = (e, check) => {
    console.log(check)
    if(check)
      this.props.update(this.props.task, true)
    else
      this.props.update(this.props.task)
  }

  render() {
    const {task, removeTask, routing} = this.props
    let secondaryText = ""
    secondaryText += new DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(task.timeLimit) + " (" + getHours(new Date(task.timeLimit)) + ")"
    if(task.associatedTo && routing.locationBeforeTransitions.pathname === '/tasks')
      secondaryText += ', asignado a:' + task.associatedTo.name + ' ' + task.associatedTo.lastName
  
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.changeTask}>Modificar</MenuItem>
        <MenuItem onTouchTap={()=>removeTask(task)}>Eliminar</MenuItem>
      </IconMenu>
    );    
    return(
      <div className="col-xs-12 start-xs">
        <ListItem
          leftCheckbox={<Checkbox checked={task.timeFinished?true:false} onCheck={this.handleCheck}/>}
          primaryText={task.description}
          secondaryText={secondaryText}
          rightIconButton={rightIconMenu}
        />  
        <Divider inset={true} />   
      </div>
    )
  }
};

Task.propTypes = {
  open: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  routing: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionsDialog, actionsTasks), dispatch);
}

function mapStateToProps(state, props) {
  return {    
    routing: state.routing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
