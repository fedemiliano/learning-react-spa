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
import * as actions from '../../actions/trash';
//import {DateTimeFormat, getHours} from '../../common'

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

class Trash extends Component {

  handleCheck = (e, check) => {
    console.log(check)
    if(check)
      this.props.toCheck(this.props.itemKey, true)
    else
      this.props.toCheck(this.props.itemKey, false)
  }

  render() {
    const {item, itemKey, removeTrashItems, restoreTrashItems} = this.props
    /*
    let secondaryText = ""
    secondaryText += new DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(item.timeLimit) + " (" + getHours(new Date(item.timeLimit)) + ")"
      
    if(item.associatedTo)
      secondaryText += ', asignado a:' + item.associatedTo.name + ' ' + item.associatedTo.lastName
    */
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={()=>restoreTrashItems({[itemKey]: item})}>Restaurar</MenuItem>
        <MenuItem onTouchTap={()=>removeTrashItems({[itemKey]: item})}>Eliminar</MenuItem>
      </IconMenu>
    );    
    return(
      <div className="col-xs-12 start-xs">
      <ListItem
        leftCheckbox={<Checkbox style={style.checkBox} onCheck={this.handleCheck} />}
        innerDivStyle={style.innerDiv}
        primaryText={<div><label>{item.description}</label><Chip labelStyle={style.chipLabel} style={style.chip}>prueba</Chip></div>}
        rightIconButton={rightIconMenu}
        style={style.listItem}
      />  
      <Divider style={style.divider} />            
      </div>
    )
  }
};

Trash.propTypes = {
  routing: PropTypes.object.isRequired,
  removeTrashItems: PropTypes.func.isRequired,
  restoreTrashItems: PropTypes.func.isRequired,
  toCheck: PropTypes.func.isRequired,
  itemKey: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
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
