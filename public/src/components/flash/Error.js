import React from 'react';

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss (e) {
      e.preventDefault;
      this.props.handleDismiss(this.props.id, 'error');
    }
    render() {
      return (
        <div className='alert alert-danger'>
          {this.props.message}
          <button className='close'
                         onClick={this.handleDismiss}
                          type='button'>
            <span aria-hidden='true'>&times;</span>
          </button>
       </div>
      );
    }
}

export default Error;

