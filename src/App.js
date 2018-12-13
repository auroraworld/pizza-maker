//Usual imports

import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import $ from 'jquery';
import axios from 'axios';


//Importing the components
import PizzaBuilder from './PizzaBuilder/PizzaBuilder.js';
import Layout from './Layout/Layout.js';

//Defaults for axios
axios.defaults.baseURL = 'https://burgerapp-a9f69.firebaseio.com';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <PizzaBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
