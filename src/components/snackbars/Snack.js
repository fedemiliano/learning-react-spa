import React, {Component, PropTypes} from 'react';
import Snackbar from 'material-ui/Snackbar';
import * as actions from '../../actions/snack';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Snack extends Component {

  render() {
    const { snack, close } = this.props;
    return (
        <Snackbar
          open={snack.open}
          message={snack.message}
          autoHideDuration={3000}
          onRequestClose={close}
        />
    )
  }
}

Snack.propTypes = {
  snack: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired  
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