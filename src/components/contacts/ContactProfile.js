import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/contacts';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '100%'
  },
  input: {
      margin: 0,
      padding: 0
  }
}

class ContactProfile extends Component {

  constructor(props) {  
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clean = this.clean.bind(this)
    this.handleChange = this.handleChange.bind(this)
    //this.state = {}
  }

  handleSubmit() {
    let textInputs = document.querySelectorAll('#contactProfile input[type=text]');
    let contact = {}
    for(let i = 0; i < textInputs.length; i++) {
      let textInput = textInputs.item(i)
      if(textInput.value.trim() !== "")
        contact[textInput.id] = textInput.value
    }
    this.props.updateContact(Object.assign({}, this.props.contact, contact))
  }

  clean() {
    let textInputs = document.querySelectorAll('#contactProfile input[type=text]');
    for(let i = 0; i < textInputs.length; i++)
      textInputs.item(i).value = ""
  }

  handleChange(event) {
    this.props.contact[event.target.id] = event.target.value
  }

  render() {
    const {contact} = this.props
    return (
      <div className="grid" style={{marginTop:10}}>
        <div className={"row"}>
            <Card style={{padding:0, marginLeft: 10, marginRight: 10}} id="contactProfile">
              <CardHeader
                    title="Perfil de Contacto"
                    textStyle={{padding:0}}
              />  
              <div className={"row"}>
                <div className={"col-lg-3 col-md-6"}>
                    <TextField
                      style={styles.text}
                      floatingLabelText="Nombre"
                      id="name"
                      value={contact.name ? contact.name : ''}
                    />
                    <TextField
                      style={styles.text}
                      floatingLabelText="Apellidos"
                      id="lastName"
                      value={contact.lastName ? contact.lastName : ''}                    
                    />
                    <TextField
                      style={styles.text}
                      floatingLabelText="Cargo"
                      id="job"
                      value={contact.job ? contact.job : ''}   
                      inputStyle={styles.input}                     
                    />  
                  </div>
                  <div className={"col-lg-3 col-md-6"}>                   
                    <TextField
                      style={styles.text}
                      floatingLabelText="Empresa"
                      id="company"
                      value={contact.company ? contact.company : ''}                             
                    />                     
                    <TextField
                      style={styles.text}
                      floatingLabelText="Teléfono"
                      id="tel"
                      value={contact.tel ? contact.tel : ''}                          
                    />                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="Email"
                      id="email"
                      value={contact.email ? contact.email : ''}  
                      inputStyle={styles.input}                               
                    /> 
                  </div>                                                                           
                  <div className={"col-lg-3 col-md-6"}>
                    <TextField
                      style={styles.text}
                      floatingLabelText="Sitio Web"
                      id="web"
                      value={contact.web ? contact.web : ''}                      
                    />                              
                    <TextField
                      style={styles.text}
                      floatingLabelText="Dirección"
                      id="direction"
                      value={contact.direction ? contact.direction : ''}                                        
                    />                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="Provincia"
                      id="province"
                      value={contact.province ? contact.province : ''} 
                      inputStyle={styles.input}                                          
                    />
                  </div>
                  <div className={"col-lg-3 col-md-6"}>                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="Ciudad"
                      id="city"
                      value={contact.city ? contact.city : ''}                                        
                    />                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="Código Postal"
                      id="cp"
                      value={contact.cp ? contact.cp : ''}                                         
                    />                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="País"
                      id="country"
                      value={contact.country ? contact.country : ''}  
                      inputStyle={styles.input}                                        
                    /> 
                </div>                                        
              </div>
            </Card>
        </div>
      </div>
    )
  }
}

ContactProfile.propTypes = {
  readContact: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  return {    
    contact: state.contact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactProfile);