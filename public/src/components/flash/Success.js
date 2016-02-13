import React from 'react';

class Success extends React.Component {
    constructor(props) {
        super(props);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss (e) {
      e.preventDefault;
      this.props.handleDismiss(null, 'success');
    }
    render() {
      return (
        <div className='alert alert-success'>
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

export default Success;