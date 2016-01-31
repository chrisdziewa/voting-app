import React, { Component } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}