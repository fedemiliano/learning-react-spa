import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionsContacts from '../../actions/contacts';
import * as actionsTasks from '../../actions/tasks';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ContactProfile from './ContactProfile'
import TasksPage from '../tasks/TasksPage'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {

  },
}

class TabTemplate extends React.Component {
    render() {
        if (!this.props.selected) {
            return null;
        }
        return this.props.children;
    }
}

class ContactPage extends Component {

  constructor(props) {
    super(props);
    this.props.readContact(this.props.params.contactKey)
    this.state = {
      slideIndex: 0,
    };
  }

  get styles() {
      return {
          root: {
              flex: '1 1 100%',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              marginTop: 50
          },
          container: {
/*              flex: '1 1 100%;',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
*/
          }
      };
  }  

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
    console.log(value)
    if(value === 1) {
      console.log("CHANGING!!!")
      this.props.fetchAllTasks();
    }
      
  };

  render() {

    const {contact} = this.props
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          style={this.styles.root}
          contentContainerStyle={this.styles.container}
          tabTemplate={TabTemplate}    
        >
          <Tab label="Perfil" value={0} />
          <Tab label="Tareas" value={1} />
          <Tab label="Negociaciones" value={2} />
          <Tab label="Casos" value={3} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style={styles.slide}>
            <ContactProfile contactKey={this.props.params.contactKey} />            
          </div>
          <div style={styles.slide}>
            <TasksPage associatedTo={contact} contactKey={this.props.params.contactKey} />
          </div>
          <div style={styles.slide}>
            Negociaciones
          </div>
          <div style={styles.slide}>
            Casos
          </div>   
        </SwipeableViews>
      </div>
    )
  }
}

ContactPage.propTypes = {
  readContact: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  fetchAllTasks: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {    
    contact: state.contact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionsContacts, actionsTasks), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);