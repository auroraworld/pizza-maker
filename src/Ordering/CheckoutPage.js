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
          label: 'Name:',
        },
        email:{
          elementType:'input',
          elementConfig:{
            type: 'email',
            placeholder: 'Your email',
          },
          value: '',
          label: 'Email: ',
        },
        deliveryOption:{
          elementType: 'select',
          elementConfig:{
            options: [
              {value:'delivered', displayValue: 'Delivery'},
              {value:'pickedup', displayValue: 'Local pickup'}
            ],
          },
          value: '',
          label: 'Choose delivery method: ',
        },
        additionalNotes:{
          elementType:'textarea',
          value:'',
          label:'Additional notes: ',
        },
        regularClient:{
          elementType:'radio',
          elementConfig:{
            options:[
              {value:'yes', displayValue: 'Yes', selected: true},
              {value:'no', displayValue: 'No'},
            ],
            name:'regular',
          },
          label: 'Are you a regular client?',
          value: '',
        },
        hasCoupon:{
          elementType:'checkbox',
          elementConfig:{
            type: "checkbox",
            checked: false,
          },
          value:false,
          label:'Do you have a coupon code?',
          specificHandler: this.checkedCoupon,
        },
        couponCode:{
          elementType: 'input',
          elementConfig:{
            type: 'text',
            placeholder: 'Coupon code',
            disabled: true,
          },
          value: '',
          label:'Coupon: ',
        }
      },
      loading: false,
    };
  }

  //Generally, this can be used for all input types
  generalInputModifier = (event, identifier) =>
  {
    //Original value of order form - get it now
    //and clone it (not just reference copying)
    //Don't directly modify it -> recall that we should use setState instead
    const originalOrderForm = {...this.state.orderForm};

    //Create a copy of that part of the object that we need.
    const newModification = {...originalOrderForm[identifier]};

    //Assign the value - why we're here
    newModification.value = event.target.value;

    //And now to set the only thing that we changed.
    originalOrderForm[identifier] = newModification;

    //Finally, set the state
    this.setState({orderForm: originalOrderForm});
  }

  //Checked box for coupon
  //So we toggle
  checkedCoupon = () => {

    //The whole variable since we're using a nested object!
    const modifiedState = {...this.state.orderForm};

    //The one we need
    const newValuesCheckbox = {...modifiedState['hasCoupon']};

    //and the coupon code
    const newValuesCoupon = {...modifiedState['couponCode']};

    //Not, modification time
    newValuesCoupon.elementConfig.disabled = newValuesCheckbox.elementConfig.checked;
    newValuesCheckbox.elementConfig.checked = !newValuesCheckbox.elementConfig.checked;
    newValuesCoupon.value = '';

    modifiedState['hasCoupon'] = newValuesCheckbox;
    modifiedState['couponCode'] = newValuesCoupon;

    this.setState({orderForm: modifiedState});
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


    //Note: prepare the event handler -> it takesthe event and the id of the element
    let form = (
      <form className="checkoutForm">
        {
          formArray.map(element => {
            return(
              <div className="form-group">
                <Input
                  type={element.details.elementType}
                  {...element.details}
                  changed={(event) => {this.generalInputModifier(event, element.id)}}
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
