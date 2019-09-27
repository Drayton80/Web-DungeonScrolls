import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary navbar-fixed-top" style={{zIndex:"10"}}>
                    <div className="container">

                        <a className="navbar-brand text-white h1 mb-0">Dungeon Scrolls</a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSite">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSite">


                            <ul className="navbar-nav mr-auto">

                                <li className="nav-item">
                                    <a className="nav-link" href="">Mini-Projeto I</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="">Mini-Projeto II</a>
                                </li>

                            </ul>


                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item">
                                    <a className="nav-link" href="https://github.com/Drayton80/Web-CalculoNumerico">GitHub</a>
                                </li>

                            </ul>

                        </div>

                    </div>
                 </nav>
            </div>
        )
    }
}
