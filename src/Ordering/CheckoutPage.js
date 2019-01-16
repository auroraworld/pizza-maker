import React, { Component } from 'react';
import Input from './../Special/Input.js';

class CheckoutPage extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      orderForm: {
        name:{
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder:'Your name',
          },
          value: '',
          label: 'Your name',
        },
        // email:{},
        // regularClient:{},
        // hasCoupon:{},
        // couponCode:{},
        // deliveryOption:{},
        // additionalNotes:{},
      },
      loading: false,
    };
  }

  //The render method
  render(){
    //Let's create an array, out of which we'll map the form
    const formArray = [];

    //For each key/value in orderForm object in the state
    //Id will be key since guaranteed uniqueness
    Object.keys(this.state.orderForm).forEach(key => {
      formArray.push({
        id: key,
        details: this.state.orderForm[key]
      });
    });


    let form = (
      <form className="checkoutForm">
        {
          formArray.map(element => {
            return(
              <div className="form-group">
                <label>{element.details.label}</label>
                <Input
                  type={element.details.elementType}
                  {...element}
                />
              </div>
            );
          })
        }
      </form>
    );
    console.log(formArray);
    return (
      <div className="formContainer">
        <h2>Checkout info:</h2>
        {form}
      </div>

      );
  }


}

export default CheckoutPage;
