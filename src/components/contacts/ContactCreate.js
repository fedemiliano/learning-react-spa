import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/contacts';
import * as actionsAuth from '../../actions/auth';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader} from 'material-ui/Card';
import {grey100} from 'material-ui/styles/colors';


const containerStyle = {
  position: 'fixed',
  top: 50,
  backgroundColor: grey100,
  height: 50,
  width: '100%',
  zIndex: 3
}

const buttonRight = {
  position: 'relative',
  float: 'right',
  marginTop: 7,
  marginRight: 5
}

const buttonLeft = {
  position: 'relative',
  float: 'left',
  marginTop: 7,
  marginLeft: 5
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '100%'
  }
};

class ContactCreate extends Component {

  constructor(props) {  
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clean = this.clean.bind(this)
  }

  handleSubmit() {
    let textInputs = document.querySelectorAll('#contactCreate input[type=text]');
    let contact = {}
    for(let i = 0; i < textInputs.length; i++) {
      let textInput = textInputs.item(i)
      if(textInput.value.trim() !== "")
        contact[textInput.id] = textInput.value
    }
    this.props.addContact(contact)
  }

  clean() {
    let textInputs = document.querySelectorAll('#contactCreate input[type=text]');
    for(let i = 0; i < textInputs.length; i++)
      textInputs.item(i).value = ""
  }

  render() {
  
    const {back} = this.props
    return (
      <div className="grid"  style={{marginTop:110}}>
        <div className={"row"}>
            <div style={containerStyle}>    
              <RaisedButton onClick={back} label="Volver" primary={true} style={buttonLeft}/>
              <RaisedButton onClick={()=>this.handleSubmit()} label="Guardar" primary={true} style={buttonRight}/>
              <RaisedButton onClick={()=>this.clean()} label="Limpiar" primary={true} style={buttonRight}/>
            </div>  
            <Card style={{padding:0, marginLeft: 10, marginRight: 10}} id="contactCreate">
              <CardHeader
                    title="Crear Contacto"
                    subtitle="Completa los datos del contacto."
                    textStyle={{padding:0}}
              />            
              <div className={"row"}>
                <div className={"col-lg-3 col-md-6"}>
                  <TextField
                    floatingLabelText="Nombre"
                    id="name"
                    style={styles.text}
                  />
                  <TextField
                    floatingLabelText="Apellidos"
                    id="lastName"
                    style={styles.text}
                  />
                  <TextField
                    floatingLabelText="Cargo"
                    id="job"
                    style={styles.text}
                  /> 
               </div>
               <div className={"col-lg-3 col-md-6"}>
                  <TextField
                    floatingLabelText="Empresa"
                    id="company"
                    style={styles.text}
                  /> 
                  <TextField
                    floatingLabelText="Teléfono"
                    id="tel"
                    style={styles.text}
                  />
                  <TextField
                    floatingLabelText="Email"
                    id="email"
                    style={styles.text}
                  /> 
                </div> 
                <div className={"col-lg-3 col-md-6"}>
                  <TextField
                    floatingLabelText="Sitio Web"
                    id="web"
                    style={styles.text}
                  />      
                  <TextField
                    floatingLabelText="Dirección"
                    id="direction"
                    style={styles.text}
                  />
                  <TextField
                    floatingLabelText="Provincia"
                    id="province"
                    style={styles.text}
                  />
                </div>
                <div className={"col-lg-3 col-md-6"}>
                  <TextField
                    floatingLabelText="Ciudad"
                    id="city"
                    style={styles.text}
                  />
                  <TextField
                    floatingLabelText="Código Postal"
                    id="cp"
                    style={styles.text}
                  />
                  <TextField
                    floatingLabelText="País"
                    id="country"
                    style={styles.text}
                  /> 
                </div>
              </div>
          </Card>
        </div>
      </div>
    )
  }
}

ContactCreate.propTypes = {
  addContact: PropTypes.func.isRequired, 
  back: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionsAuth, actions), dispatch);
}

export default connect(null, mapDispatchToProps)(ContactCreate);