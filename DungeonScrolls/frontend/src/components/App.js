import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Header from "./layout/Header";
import SideMenu from "./layout/SideMenu";
import Sheet from "./layout/Sheet";
import Registration from "./accounts/Registration";
const djangoData = $("#User").data();

class App extends Component {
	state = {
		user: [],
		fichas: []
	};

	componentDidMount() {
		axios
			.get(`http://127.0.0.1:8000/rest/api/get-user/${djangoData.other}/`)
			.then(res => {
				const user = res.data;
				this.setState({ user: user });
				console.log(res.data)
			});
	}

	render() {
		return (
			<Router>
				<div className="App">
					<div>
						{(() => {
							if (this.state.user == undefined) {
								return "Carregando..., por favor aguarde";
							} else {
								return <SideMenu user={this.state.user} />;
							}
						})()}
					</div>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
