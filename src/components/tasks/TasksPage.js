import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as actionsDialog from '../../actions/dialogs/tasks';
import * as actionsTasks from '../../actions/tasks';
import {grey100, darkBlack} from 'material-ui/styles/colors';
import TaskDialog from '../dialogs/Task'
import TasksList from './TasksList'


class TasksPage extends Component {


  constructor(props) {
    super(props);
    if(!this.props.contactKey)
      this.props.fetchAllTasks();
  }  

  newTask() {
      this.props.open("Crear Tarea", "CREATE", null, this.props.associatedTo)
  }

  render() {
    const { tasks, associatedTo, contactTasks } = this.props;

    const containerStyle = {
      position: 'fixed',
      top: associatedTo ? 0 : 50,
      backgroundColor: grey100,
      height: 50,
      width: '100%',
      zIndex: 3
    }

    const buttonStyle = {
      position: 'relative',
      float: 'right',
      marginTop: 7,
      marginRight: 5
    }

    return (
      <div>
          <div style={containerStyle}>    
            <RaisedButton onTouchTap={() => this.newTask("Crear tarea")} style={buttonStyle} color={darkBlack} label="Crear tarea" primary={true}/>
            <TaskDialog associatedTo={associatedTo} />
          </div>
          <TasksList associatedTo={associatedTo} tasks={associatedTo ? contactTasks : tasks} />
      </div>
    )    
  }
}


TasksPage.propTypes = {
  fetchAllTasks: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionsDialog, actionsTasks), dispatch);
}

function mapStateToProps(state, props) {
  return {    
    tasks: state.tasks,
    contactTasks: state.contactTasks
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
