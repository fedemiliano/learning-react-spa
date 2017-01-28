import React, {PropTypes, Component} from 'react';

import './Contacts.css'


class ContactInput extends Component {
  constructor(props) {
    super(props);
    this.onAddContactClick = this.onAddContactClick.bind(this);
  }

  onAddContactClick() {
    const nameElement = document.getElementById('name');
    const priceElement = document.getElementById('price');

    this.props.addContact({
      name: nameElement.value,
      price: priceElement.value
    });

    nameElement.value = "";
    priceElement.value = "";

    nameElement.focus();
  }

  componentDidMount() {
    document.getElementById('name').focus();
  }

  render() {
    /*
    return (
      <Row className="addContact">
        <Col xs="12" sm="4"><Input id="name" type="text" placeholder="Contacto" /></Col>
        <Col xs="12" sm="4"><Input id="price" type="text" placeholder="Precio" /></Col>
        <Col sm="4" xs="12"><Button onClick={this.onAddContactClick} color="primary" style={{width: '100%'}}>Agregar Contacto</Button></Col>     
      </Row>
    );*/
  }
}

ContactInput.propTypes = {
  addContact: PropTypes.func.isRequired
};

export default ContactInput;