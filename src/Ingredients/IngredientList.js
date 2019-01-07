//Usual React stuff
import React from 'react';
import { Route, NavLink } from 'react-router-dom';

//Static info for the ingredients
import { ingredientsInfoStatic } from './../Special/IngredientsInfo.js';
import Ingredient from './../Ingredients/Ingredient.js';


const ingredientList = () => {
  console.log('the ingredients object', ingredientsInfoStatic);
  return(
    <main role="main" className="container">
      <h2>Here are the ingredients that the pizza uses:</h2>
      <div className="container ingredientList">
      {
        Object.keys(ingredientsInfoStatic).map((ingredientKey, index) =>  {
            return (
              <div className="ingredientLink"  key={ingredientKey + "-" + index}>
              <NavLink to={"/ingredients/" + ingredientKey} exact activeClassName="activeLink">
                  <div
                   className="card ingredientContainer"
                   style={{backgroundImage: "url("+ ingredientsInfoStatic[ingredientKey].image +")"}}
                   >
                 </div>
              </NavLink>
                 <h4>{ingredientsInfoStatic[ingredientKey].display}</h4>
              </div>
            );
        })
      }
      </div>
      <Route path="/ingredients/:theName" component={Ingredient} />
    </main>
  );
};

export default ingredientList;
