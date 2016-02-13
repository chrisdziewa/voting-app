import React, { Component } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import FlashMessage from './flash/FlashMessage';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <FlashMessage />
        <div className="main-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}