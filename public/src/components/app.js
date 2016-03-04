import React, { Component } from 'react';
import Navbar from '../containers/Navbar';
import Footer from './layout/Footer';
import FlashMessage from './flash/FlashMessage';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="main-content">
          <FlashMessage />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading
  }
}

export default connect(mapStateToProps, null)(App);
