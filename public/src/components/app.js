import React, { Component } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="main-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}