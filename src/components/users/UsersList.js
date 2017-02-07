import React, {PropTypes, Component} from 'react';
import User from './User';
import {List} from 'material-ui/List';



class UsersList extends Component {


  render() {
 
    const {users} = this.props
    if(Object.keys(users).length > 0)
      return (
          <div style={{marginTop: 50}} className="row">
            <List style={{width:'100%'}}>
            {Object.keys(users).map((key, index) => 
                <User key={key} user={Object.assign({},users[key], {key: key})}/>           
            )}
            </List>
          </div>
      )
    else 
      return(<div></div>) 
  }
}


UsersList.propTypes = {
  users: PropTypes.object.isRequired
}

export default UsersList;