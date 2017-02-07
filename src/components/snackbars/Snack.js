import React, {Component, PropTypes} from 'react';
import Snackbar from 'material-ui/Snackbar';
import * as actions from '../../actions/snack';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Snack extends Component {

  render() {
    const { snack, close, undo } = this.props
    console.log("snack.data")
    const keys = Object.keys(snack.data)
    return (
      keys.length === 0 ?         
        <Snackbar
          open={snack.open}
          message={snack.message}
          autoHideDuration={3000}
          onRequestClose={close}
        />:
        <Snackbar
          open={snack.open}
          message={snack.message}
          autoHideDuration={3000}
          onRequestClose={close}
          action="DESHACER"
          onActionTouchTap={undo}
        />      
    )
  }
}

Snack.propTypes = {
  snack: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    snack: state.snack
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Snack);