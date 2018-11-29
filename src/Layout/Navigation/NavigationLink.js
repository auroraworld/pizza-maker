import React from 'react';

const NavigationLink = (props) => {
  let classList = "nav-item";

  if(props.isActive){
    classList+=" active";
  }

  return(
    <li className={classList}>
      <a className="nav-link" href={props.url}>{props.name}</a>
    </li>
  );
};

export default NavigationLink;
