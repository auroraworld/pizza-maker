import React  from 'react';
import Modal from './../Special/Modal.js';

const PizzaLoader = (props) => {

  //JSX here
  return(
        <Modal>
          <h6>Load a pizza using a configuration number:</h6>
          <span id="closeWindow" onClick={props.toggleLoadWindow}><i className="fa fa-times-circle-o" aria-hidden="true"></i></span>
          <form className="form-inline">
            <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Configuration Number"/>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <span style={props.messageStyle}>{props.messageText}</span>
        </Modal>
  );
};

export default PizzaLoader;
