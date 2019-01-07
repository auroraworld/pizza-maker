import React from 'react';

const ingredient = (props) => {

  return(
    <h2>This is an ingredient called: {props.match.params.theName}</h2>
  );
};


export default ingredient;
