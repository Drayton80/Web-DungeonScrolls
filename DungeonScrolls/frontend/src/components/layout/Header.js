import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ zIndex: "10" }}>
                    <div className="container-fluid p-0">

                        <a className="navbar-title h1 mb-0 ml-2" style={{ fontFamily: "MedievalSharp", color: "rgb(189, 187, 187)", fontSize: "25px" }} href="/home/">Dungeon Scrolls</a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSite">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSite">

                            <ul className="navbar-nav mr-auto">
                            </ul>


                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown mr-2">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.props.user.username}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-dungeonscrolls" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item dropdown-item-text-dungeonscrolls"
                                            href="/settings/settings-page/">Settings</a>                                        
                                        <div className="dropdown-divider dropdown-item-divider-dungeonscrolls"></div>
                                        <a className="dropdown-item dropdown-item-text-dungeonscrolls" href="/accounts/logout/">Signout</a>
                                    </div>
                                </li>

                                {/*
                                {% if user.is_active and user.is_authenticated %}
                                <li class="nav-item dropdown mr-2">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{ user.get_username }}
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-dungeonscrolls" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item dropdown-item-text-dungeonscrolls"
                                            href="{% url 'reactEnter' %}">Settings</a>
                                        <a class="dropdown-item dropdown-item-text-dungeonscrolls" href="#">Profile</a>
                                        <div class="dropdown-divider dropdown-item-divider-dungeonscrolls"></div>
                                        <a class="dropdown-item dropdown-item-text-dungeonscrolls" href="{% url 'auth_logout' %}">Signout</a>
                                    </div>
                                </li>

                                {% else %}
                                <li class="nav-item">
                                    <a class="nav-link" href="{% url 'auth_login' %}">Login</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link" href="{% url 'registration_register' %}">Register</a>
                                </li>

                                {% endif %}
                                */}
                            </ul>

                        </div>

                    </div>
                </nav>
            </div>
        )
    }
}
