import React, {PropTypes, Component} from 'react';
import Trash from './Trash';
import {List} from 'material-ui/List';

class TrashList extends Component {

  render() {
 
    const {trash} = this.props
    if(Object.keys(trash).length > 0)
      return (
          <div style={{marginTop: 100}} className="row">
            <List style={{width:'100%'}}>
            {Object.keys(trash).map((key, index) => 
                <Trash key={key} trash={Object.assign({},trash[key], {trashKey: key})}/>           
            )}
            </List>
          </div>
      )
    else 
      return(<div></div>) 
  }
}


TrashList.propTypes = {
  trash: PropTypes.object.isRequired
}

export default TrashList;