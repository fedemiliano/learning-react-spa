import React, {PropTypes, Component} from 'react';
import Task from './Task';
import {List} from 'material-ui/List';



class TasksList extends Component {


  render() {
 
    const {tasks, removeTask, associatedTo} = this.props
    if(Object.keys(tasks).length > 0)
      return (
          <div style={{marginTop: 100}} className="row">
            <List style={{width:'100%'}}>
            {Object.keys(tasks).map((key, index) => 
                <Task associatedTo={associatedTo} removeTask={removeTask} key={key} task={Object.assign({},tasks[key], {key: key})}/>           
            )}
            </List>
          </div>
      )
    else 
      return(<div></div>) 
  }
}


TasksList.propTypes = {
  tasks: PropTypes.object.isRequired
}

export default TasksList;