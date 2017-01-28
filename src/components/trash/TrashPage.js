import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
//import { Link } from 'react-router'
import * as actionsTrash from '../../actions/trash';
import * as actionsDialogError from '../../actions/dialogs/error';
import TrashList from './TrashList';
import {grey100, darkBlack} from 'material-ui/styles/colors';
import DialogError from '../dialogs/Error'


class TrashPage extends Component {

  componentDidMount() {
      this.props.fetchAllTrash();
  }

  render() {
    const { trash, removeTrash } = this.props;

    const containerStyle = {
      position: 'fixed',
      top: 50,
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
            <RaisedButton onTouchTap={removeTrash} style={buttonStyle} color={darkBlack} label="Vaciar" primary={true} />
            <DialogError />
        </div>
        <TrashList trash={trash} />
      </div>
    )
  }
}

TrashPage.propTypes = {
  trash: PropTypes.object.isRequired,
  fetchAllTrash: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  removeTrash: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {    
    trash: state.trash
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionsTrash, actionsDialogError), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashPage);