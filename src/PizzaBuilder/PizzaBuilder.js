//Recall that not only React, but also { Component } is needed from react
//When we want to declare a stateful component (with class)
import axios from 'axios';
import qs from 'qs';
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

let ingredientsInfoStatic = {
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
      ingredientsInfo: {...ingredientsInfoStatic},
      basePrice: 3.00,
      checkoutPageActivated: false,
      pizzaSaved: false,
      pizzaConfirmationNumber: 0,
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

    let keysArray = Object.keys(this.state.ingredientsInfo);
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
      total += this.state.pizzaComposition[keysIngredients[i]]*this.state.ingredientsInfo[keysIngredients[i]].price;
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
    //Only save the pizza when something actually changed
    //Otherwise: from 0 to 0, it will toggle the Save Button
    else
    {
      this.setState({pizzaSaved: false});
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
    this.setState({pizzaSaved: false});
    this.checkoutPageToggler(false);

  };

  //Modify the checkoutActivated
  checkoutPageToggler = (bool) =>
  {
    this.setState({checkoutPageActivated: bool});
  };

  //Component did mount
  componentDidMount = () =>
  {
    let currentScope = this;

    axios.get('/ingredientPrices.json')
    .then((response) => {
      //Update the prices now
      //For each ingredient, modify its price
      let tempIngredientsInfo = this.state.ingredientsInfo;
      Object.keys(response.data).map(aKey => {
        tempIngredientsInfo[aKey].price = response.data[aKey].price;
      });

      //However, this is a nested object so re-render not executed!
      this.setState({ingredientsInfo: tempIngredientsInfo});

    })
    .catch((error) => {console.log('Error fetching info', error)});
  };

  //Save the pizza -> just value
  savePizzaConfiguration = () =>
  {
    let pizzaConfirmationNumber = 0;
    //If no confirmation number, generate one
    if(this.state.pizzaConfirmationNumber == 0)
    {
      pizzaConfirmationNumber = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.setState({pizzaConfirmationNumber: pizzaConfirmationNumber});
    }
    else
    {
      pizzaConfirmationNumber = this.state.pizzaConfirmationNumber;
    }

    this.setState({pizzaSaved: true});

    //Note: even when saving, use .post('/...name.json')
    axios.post('/savedPizza.json', {pizzaComposition: this.state.pizzaComposition, pizzaConfirmationNumber: pizzaConfirmationNumber})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {console.log('Error saving pizza', error)});


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
                      ingredientsInfo={this.state.ingredientsInfo}
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
                    ingredientsInfo={this.state.ingredientsInfo}
                    pizzaCrustImage={pizzaCrustImage}
                   />
                  <IngredientBlock
                    totalPrice={this.calculateTotalPrice()}
                    ingredientsInfo={this.state.ingredientsInfo}
                    pizzaComposition={this.state.pizzaComposition}
                    clickHandler={this.clickHandler}
                    checkoutEnabled={this.enableCheckoutButton()}
                    savingEnabled={!this.state.pizzaSaved}
                    resetHandler={this.resetPizza}
                    saveHandler={this.savePizzaConfiguration}
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
