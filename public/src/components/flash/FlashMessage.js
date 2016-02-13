import React from 'react';
//import Success from './Success';
//import Info from './Info';
import Error from './Error';
import Success from './Success';
import { connect } from 'react-redux';
import {dismissFlash} from '../../actions';

const mapStateToProps = (state) => {
  return {
    info: state.flash.info,
    success: state.flash.success,
    errors: state.flash.errors
  };
}

const mapDispatchToProps = (dispatch) => ({dispatch});

class FlashMessage extends React.Component {
    constructor(props) {
        super(props);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss (id, type) {
      this.props.dispatch(dismissFlash({
        type: type,
        id: id
      }));
    }
    render() {
      // let info = this.props.info
      // ? <Info message = {this.props.info} />
      // : null

      let success = this.props.success
      ? <Success message={this.props.success} handleDismiss={this.handleDismiss} />
      : null

      let errors = this.props.errors.length
      ? this.props.errors.map((elem, index) => {
        return <Error handleDismiss={this.handleDismiss}
                                key={index} 
                                id={elem.id} 
                                message={elem.error} />
      })
      : null;

        return (
          <div>
            {success}
            {errors}
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
