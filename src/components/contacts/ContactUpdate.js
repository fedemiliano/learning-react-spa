import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/contacts';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {grey100} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';

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
}

class ContactUpdate extends Component {

  constructor(props) {  
    super(props);
    this.props.readContact(this.props.params.contactKey)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clean = this.clean.bind(this)
    this.handleChange = this.handleChange.bind(this)
    //this.state = {}
  }

  handleSubmit() {
    let textInputs = document.querySelectorAll('#contactUpdate input[type=text]');
    let contact = {}
    for(let i = 0; i < textInputs.length; i++) {
      let textInput = textInputs.item(i)
      if(textInput.value.trim() !== "")
        contact[textInput.id] = textInput.value
    }
    this.props.updateContact(Object.assign({}, this.props.contact, contact))
  }

  clean() {
    let textInputs = document.querySelectorAll('#contactUpdate input[type=text]');
    for(let i = 0; i < textInputs.length; i++)
      textInputs.item(i).value = ""
  }

  handleChange(event) {
    this.props.contact[event.target.id] = event.target.value
    this.props.change(Object.assign({}, this.props.contact, this.props.contact))
  }

  render() {
    const {back, contact} = this.props
    return (
      <div className="grid" style={{marginTop:110}}>
        <div className={"row"}>
            <div style={containerStyle}>    
              <RaisedButton onClick={back} label="Volver" primary={true} style={buttonLeft}/>
              <RaisedButton onClick={()=>this.handleSubmit()} label="Guardar" primary={true} style={buttonRight}/>
              <RaisedButton onClick={()=>this.clean()} label="Limpiar" primary={true} style={buttonRight}/>
            </div>      
            <Card style={{padding:0, marginLeft: 10, marginRight: 10}} id="contactUpdate">
              <CardHeader
                    title="Modificar Contacto"
                    subtitle="Modifica los datos del contacto."
                    textStyle={{padding:0}}
              />  
              <div className={"row"}>
                <div className={"col-lg-3 col-md-6"}>
                    <TextField
                      style={styles.text}
                      floatingLabelText="Nombre"
                      id="name"
                      onChange={this.handleChange}
                      value={contact.name ? contact.name : ''}
                    />
                    <TextField
                      style={styles.text}
                      floatingLabelText="Apellidos"
                      id="lastName"
                      onChange={this.handleChange}
                      value={contact.lastName ? contact.lastName : ''}                    
                    />
                    <TextField
                      style={styles.text}
                      floatingLabelText="Cargo"
                      id="job"
                      onChange={this.handleChange}
                      value={contact.job ? contact.job : ''}                        
                    />  
                  </div>
                  <div className={"col-lg-3 col-md-6"}>                   
                    <TextField
                      style={styles.text}
                      floatingLabelText="Empresa"
                      id="company"
                      onChange={this.handleChange}
                      value={contact.company ? contact.company : ''}                             
                    />                     
                    <TextField
                      style={styles.text}
                      floatingLabelText="Teléfono"
                      id="tel"
                      onChange={this.handleChange}
                      value={contact.tel ? contact.tel : ''}                             
                    />                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="Email"
                      id="email"
                      onChange={this.handleChange}
                      value={contact.email ? contact.email : ''}                             
                    /> 
                  </div>                                                                           
                  <div className={"col-lg-3 col-md-6"}>
                    <TextField
                      style={styles.text}
                      floatingLabelText="Sitio Web"
                      id="web"
                      onChange={this.handleChange}
                      value={contact.web ? contact.web : ''}                      
                    />                              
                    <TextField
                      style={styles.text}
                      floatingLabelText="Dirección"
                      id="direction"
                      onChange={this.handleChange}
                      value={contact.direction ? contact.direction : ''}                                        
                    />                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="Provincia"
                      id="province"
                      onChange={this.handleChange}
                      value={contact.province ? contact.province : ''}                                       
                    />
                  </div>
                  <div className={"col-lg-3 col-md-6"}>                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="Ciudad"
                      id="city"
                      onChange={this.handleChange}
                      value={contact.city ? contact.city : ''}                                        
                    />                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="Código Postal"
                      id="cp"
                      onChange={this.handleChange}
                      value={contact.cp ? contact.cp : ''}                                         
                    />                    
                    <TextField
                      style={styles.text}
                      floatingLabelText="País"
                      id="country"
                      onChange={this.handleChange}
                      value={contact.country ? contact.country : ''}                                      
                    /> 
                </div>                                        
              </div>
            </Card>
        </div>
      </div>
    )
  }
}

ContactUpdate.propTypes = {
  readContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,  
  back: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {    
    contact: state.contact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUpdate);