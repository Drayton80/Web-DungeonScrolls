import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './layout/Header';
import Registration from './accounts/Registration';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App" >
                    <Route path="/accounts/registration" component={Registration} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));