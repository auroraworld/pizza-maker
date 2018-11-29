import React from 'react';

import NavigationLink from './NavigationLink.js';

//For a functional component only, we will give it an anonymous function
//Here ES6 -  arrow function, with props. It returns the JSX

//Note: to pass a boolean prop, use {true}
const navBar = (props) => {
  return(
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="#">Pizza Builder</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <NavigationLink name="The Builder" url="#" isActive={true}/>
          <NavigationLink name="Authentication" url="#" isActive={false} />
          <NavigationLink name="Info" url="#" />
        </ul>
      </div>
    </nav>
  );
};

export default navBar;
