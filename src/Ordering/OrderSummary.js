import React from 'react';

const ordersummary = (props) => {
  return(
      <div className="wholeblackout">
        <div className="whiteRectangle">
          <h3>Your Order</h3>
          <br/>
          <p>The pizza has the following ingredients:</p>
          <br/>
          <ul>
          {
            Object.keys(props.pizzaComposition).map((aKey, index) => {
              if(props.pizzaComposition[aKey] > 0)
              {
                return(
                  <li key={'CheckoutMenu-'+aKey+'-'+index}>{props.ingredientsInfo[aKey].display}: {props.pizzaComposition[aKey]}</li>
                );
              }

            })
          }
          </ul>
          <br/>
          <h3>Total price: {props.totalPrice}$</h3>

          <p>Continue to checkout?</p>
          <div className="checkoutButtons">
            <button type="button" className="btn btn-dark" onClick={() => {props.checkoutPageToggle(false)}}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={() => {alert("You continue!");}}>Continue</button>
          </div>
        </div>
      </div>
  );
};


export default ordersummary;
