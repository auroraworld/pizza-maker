//Recall that not only React, but also { Component } is needed from react
//When we want to declare a stateful component (with class)
import React, { Component } from 'react';

//The images
import coldCutsImage from './../images/coldCuts.jpg';
import fetaCheeseImage from './../images/fetaCheese.jpg';
import mozzarellaImage from './../images/mozarella.jpg';
import pepperoniImage from './../images/pepperoni.jpg';
import pizzaCrustImage from './../images/pizzaCrust.jpg';
import spicesImage from './../images/spices.jpg';
import swissCheeseImage from './../images/swissCheese.jpg';
import vegetablesImage from './../images/vegetables.jpg';

//Import needed components
import IngredientBlock from './IngredientBlock/IngredientBlock.js';
import ShowScreen from './ShowScreen/ShowScreen.js';
import OrderSummary from './../Ordering/OrderSummary.js';

const ingredientsInfo = {
  coldCuts: {
    price: 5,
    image: coldCutsImage,
    display: "Cold cuts",
  },
  pepperoni: {
    price: 3.5,
    image: pepperoniImage,
    display: "Pepperoni",
  },
  fetaCheese: {
    price: 2.5,
    image: fetaCheeseImage,
    display: "Feta",
  },
  mozzarella: {
    price: 1.5,
    image: mozzarellaImage,
    display: "Mozzarella",
  },
  swissCheese: {
    price: 3,
    image: swissCheeseImage,
    display: "Swiss cheese",
  },
  spices: {
    price: 0.5,
    image: spicesImage,
    display: "Spices",
  },
  vegetables: {
    price: 1.25,
    image: vegetablesImage,
    display: "Vegetables",
  },
};


class PizzaBuilder extends Component {

  //We're going to need to call the constructor so we can construct our state
  //Based on the info above.
  constructor(props)
  {
    super(props);
    this.state = {
      pizzaComposition: {

      },
      basePrice: 3.00,
      checkoutPageActivated: false,
    };
    this.fillPizzaComposition();

  };


  //Fill the pizza composition now
  //Note: when in constructor, we need to directly modify the state!
  fillPizzaComposition = () =>
  {
    this.state.pizzaComposition = this.generateEmptyPizza();
  };

  //Generates an empty pizza
  generateEmptyPizza = () =>
  {
    let tempPizzaObject = {};

    let keysArray = Object.keys(ingredientsInfo);
    for(let i=0; i<keysArray.length; i++)
    {
      tempPizzaObject[keysArray[i]] = 0;
    }

    return tempPizzaObject;
  };



  //Calculate total price
  calculateTotalPrice = () =>
  {
    let total = this.state.basePrice;
    let keysIngredients = Object.keys(this.state.pizzaComposition);
    for(let i=0; i<keysIngredients.length; i++)
    {
      total += this.state.pizzaComposition[keysIngredients[i]]*ingredientsInfo[keysIngredients[i]].price;
    }

    return parseFloat(Math.round(total * 100) / 100).toFixed(2);
  };

  //Click handler method in PizzaBuilder which contains IngredientBlock
  //which in turn contians
  clickHandler = (type, value) =>
  {
    let incrementation = value ? 1 : -1;

    //Make a new copy (not only a reference but for real)
    let newComposition = {...this.state.pizzaComposition};

    newComposition[type] = newComposition[type] + incrementation;

    if(newComposition[type] < 0){
      newComposition[type] = 0;
    }

    this.setState({pizzaComposition: newComposition});
    this.checkoutPageToggler(false);
  };

  //Enable or disable button based on a condition
  //Now: only crust
  enableCheckoutButton = () =>
  {
    return this.calculateTotalPrice() !== parseFloat(Math.round(this.state.basePrice * 100) / 100).toFixed(2);
  };

  //Reset the pizza
  resetPizza = () =>
  {
    this.setState({pizzaComposition: this.generateEmptyPizza()});
    this.checkoutPageToggler(false);
  };

  //Modify the checkoutActivated
  checkoutPageToggler = (bool) =>
  {
    this.setState({checkoutPageActivated: bool});
  };


  //The render method returns JSX that we print

  //!Note: to cycle through an object with map (for printing in render),
  //Use the Object.keys(theObj) tactic!
  render(){
    let orderWindow = null;

    if(this.enableCheckoutButton() && this.state.checkoutPageActivated)
    {
      orderWindow = <OrderSummary
                      checkoutPageToggle={this.checkoutPageToggler}
                      ingredientsInfo={ingredientsInfo}
                      pizzaComposition={this.state.pizzaComposition}
                      totalPrice={this.calculateTotalPrice()}
                      />;
    }


    return(
      <main role="main" className="container">
        <br/><br/>
        <div className="container">

              {orderWindow}

              <div className="py-5 text-center">
                <h2>Pizza Builder</h2>
                <p className="lead">Here you can build your pizza using the builder with the ingredients provided.</p>
              </div>

              <div className="row">
                  <ShowScreen
                    pizzaComposition={this.state.pizzaComposition}
                    ingredientsInfo={ingredientsInfo}
                    pizzaCrustImage={pizzaCrustImage}
                   />
                  <IngredientBlock
                    totalPrice={this.calculateTotalPrice()}
                    ingredientsInfo={ingredientsInfo}
                    pizzaComposition={this.state.pizzaComposition}
                    clickHandler={this.clickHandler}
                    checkoutEnabled={this.enableCheckoutButton()}
                    resetHandler={this.resetPizza}
                    checkoutHandler={this.checkoutPageToggler}
                    />
              </div>

      </div>
      </main>
    );
  };

}

//We still need to export it
export default PizzaBuilder;
