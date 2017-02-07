import React, { Component } from 'react'
import fedeBaseTheme from 'material-ui/styles/baseThemes/fedeBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

export default class Theme extends Component {

    render() {
        let theme = process.env.NODE_ENV === "development" ? fedeBaseTheme : lightBaseTheme;
        return(            
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                {this.props.children}
            </MuiThemeProvider>)
    }
}