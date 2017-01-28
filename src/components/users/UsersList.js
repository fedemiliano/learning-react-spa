import React, {PropTypes, Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const tableData = [
  {
    name: 'John',
    role: 'admin'
  },
  {
    name: 'Randal',
    role: 'normal'  
  },
  {
    name: 'Stephanie',
    role: 'normal' 
  },
  {
    name: 'Steve',
    role: 'normal' 
  },
  {
    name: 'Joyce',
    role: 'normal' 
  },
  {
    name: 'Samuel',
    role: 'normal' 
  },
  {
    name: 'Adam',
    role: 'normal' 
  },
];

const styleButton = {
  marginLeft: '5px',
  float: 'right'
};

class UsersList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
    };
  }

  render() {
    return (
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Super Header">
                  <RaisedButton label="Crear" primary={true} style={styleButton}/>
                  <RaisedButton label="Modificar" primary={true} style={styleButton}/>
                  <RaisedButton label="Eliminar" primary={true} style={styleButton}/>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="Id">Id</TableHeaderColumn>
                <TableHeaderColumn tooltip="Nombre">Nombre</TableHeaderColumn>
                <TableHeaderColumn tooltip="Rol">Rol</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {tableData.map( (row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.role}</TableRowColumn>
                </TableRow>
                ))}
            </TableBody>
          </Table>
    )
  }
}

UsersList.propTypes = {
  users: PropTypes.object.isRequired,
  changeUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired
}

export default UsersList;