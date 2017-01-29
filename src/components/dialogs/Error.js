import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../../actions/dialogs/error';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Error extends Component {
  
  render() {
    const {dialogError, closeError} = this.props

    const actions = [
    <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={closeError}
                        
    />
    ]; 

    return (
        <Dialog modal={true}
          repositionOnUpdate={false}
          actions={actions}
          title={dialogError.title}
          autoDetectWindowHeight={false}
          open={dialogError.open}
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
        {dialogError.message}                   
        </Dialog>        
    )      
  }
}

Error.propTypes = {
  dialogError: PropTypes.object.isRequired,
  closeError: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    dialogError: state.dialogError  
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
