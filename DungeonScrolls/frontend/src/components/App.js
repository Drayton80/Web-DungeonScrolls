import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import {
    MenuList, MenuItem, Toolbar
  } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import axios from "axios";

import Header from './layout/Header';
import Registration from './accounts/Registration';
const djangoData = $('#User').data();


const styles = theme => ({      
    toolbar: theme.mixins.toolbar        
  })

class App extends Component {
    

    state = {
        user: [],
        fichas: [],
      }
    
    componentDidMount(){
        axios.get(`http://localhost:8000/rest/api/getUser/${djangoData.other}/`).then(res => {
            const user = res.data;
            this.setState({ user: user });
          });
      }








    render() {
        const { classes } = this.props
        return (
            <Router>
                <div className="App" >
                    <h1>{djangoData.other}</h1>
                </div>
                <div >
                    <MenuList>
                        <MenuItem component={Link} to="/" >
                            Home
                        </MenuItem>
                        <MenuItem component={Link} to="/fichas" >
                            Fichas
                        </MenuItem>
                        <MenuList>
                             <li>{this.state.user.username}</li>       
                        </MenuList>
                    </MenuList>
                </div>
            </Router>
        
        
        );
    }
}

export default withStyles(styles)(App)

ReactDOM.render(<App />, document.getElementById('app'));
