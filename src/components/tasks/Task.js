import React, {PropTypes, Component} from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsDialog from '../../actions/dialogs/tasks';
import * as actionsTasks from '../../actions/tasks';
// import {DateTimeFormat, getHours} from '../../common'

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
    const {task, removeTask} = this.props
    /*
    let secondaryText = ""
    secondaryText += new DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(task.timeLimit) + " (" + getHours(new Date(task.timeLimit)) + ")"
    if(task.associatedTo && routing.locationBeforeTransitions.pathname === '/tasks')
      secondaryText += ', asignado a:' + task.associatedTo.name + ' ' + task.associatedTo.lastName
    */  
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.changeTask}>Modificar</MenuItem>
        <MenuItem onTouchTap={()=>removeTask(task)}>Eliminar</MenuItem>
      </IconMenu>
    );    
    return(
      <div className="col-xs-12 start-xs">
        <ListItem
          leftCheckbox={<Checkbox style={style.checkBox} checked={task.timeFinished?true:false} onCheck={this.handleCheck}/>}
          innerDivStyle={style.innerDiv}
          primaryText={<div><label>{task.description}</label><Chip labelStyle={style.chipLabel} style={style.chip}>prueba</Chip></div>}
          rightIconButton={rightIconMenu}
          style={style.listItem}
        />  
        <Divider style={style.divider}/>   
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
