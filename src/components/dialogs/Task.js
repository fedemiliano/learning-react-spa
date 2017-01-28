import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as actionsDialog from '../../actions/dialogs/tasks';
import * as actionsTask from '../../actions/tasks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {DateTimeFormat, getHours} from '../../common'

class Task extends Component {

  constructor(props) {  
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleChangeTime = this.handleChangeTime.bind(this)
  }  

  saveTask() {
    console.log("saveTask()")
    const {task, dialogTask} = this.props
    let date = task.date
    let time = task.time
    let dateTime = new Date(date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()+' '+getHours(time))
    let data = {timeLimit: dateTime.getTime(), description: task.description}
    if(dialogTask.associatedTo)
      data = Object.assign({}, data, {associatedTo: dialogTask.associatedTo})
    this.props.create(data)
  }

  updateTask() {
    console.log("updateTask()")
    const {task} = this.props
    let date = task.date
    let time = task.time
    let dateTime = new Date(date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()+' '+getHours(time))
    let data = Object.assign({}, task, {timeLimit: dateTime.getTime(), description: task.description})
    this.props.update(data)
  }

  handleChange(event) {
    this.props.task[event.target.id] = event.target.value
    this.props.change(Object.assign({}, this.props.task, this.props.task))
  }

  handleChangeDate(event, date) {
    this.props.task['date'] = date
    this.props.change(Object.assign({}, this.props.task, this.props.task))
  }

  handleChangeTime(event, time) {
    this.props.task['time'] = time
    this.props.change(Object.assign({}, this.props.task, this.props.task))
  }


  render() {
    const {dialogTask, close, task} = this.props

    const actions = [
    <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={close}
    />,
    <FlatButton
        label="Guardar"
        primary={true}
        onTouchTap={() => dialogTask.operation === "UPDATE" ? this.updateTask() : this.saveTask() }
                        
    />
    ]; 

    return (
        <Dialog modal={true}
          repositionOnUpdate={false}
          actions={actions}
          title={dialogTask.title}
          autoDetectWindowHeight={false}
          open={dialogTask.open}
          autoScrollBodyContent={false}
          contentStyle={{
            width: '100%',
            maxWidth: '450px',
            maxHeight: '100% !important'
          }}
          bodyStyle={{
            maxHeight: '100% !important'
          }}
          style={{
            paddingTop:'0 !important',
            marginTop:'-100px !important',
            bottom: '0 !important',
            overflow: 'scroll !important',
            height: 'auto !important'
          }}
        > 
          <TextField
            floatingLabelText="Descripción"
            style={{width: '100%', marginTop:0, paddingTop:0}}
            id="description"
            multiLine={true}
            rows={1}
            rowsMax={2}
            value={task.description ? task.description : ''}
            onChange={this.handleChange}
          /><br/>
          <DatePicker
            hintText="Fecha"
            locale={"es-ES"}
            DateTimeFormat={DateTimeFormat}
            value={task.date ? task.date : null}
            textFieldStyle={{width: '55%', float:'left'}}
            onChange={this.handleChangeDate}
            id="date"
            formatDate={new DateTimeFormat('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format}            
          />
          <TimePicker
            textFieldStyle={{width: '35%', float:'right'}}
            format="24hr"
            hintText="Hora"
            id="time"
            value={task.time ? task.time : null}
            onChange={this.handleChangeTime}
          />                     
        </Dialog>        
    )      
  }
}

Task.propTypes = {
  dialogTask: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    dialogTask: state.dialogTask,
    task: state.task
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(actionsDialog, actionsTask), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
