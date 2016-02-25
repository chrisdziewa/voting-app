import React, { Component } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import FlashMessage from './flash/FlashMessage';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <FlashMessage />
        <div className="main-content">
          {
            this.props.isLoading ?
              <div className="loader"></div>
              : this.props.children
          }
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
