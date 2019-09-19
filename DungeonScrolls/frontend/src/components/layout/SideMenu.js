import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";

import "./SideMenu.css";
import Sheet from "./Sheet";

function JQueryFuction() {
  jQuery(function ($) {
    $(".sidebar-dropdown > a").click(function () {
      $(".sidebar-submenu").slideUp(200);      
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });

    $("#close-sidebar").click(function () {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
      $(".page-wrapper").addClass("toggled");
    });
  });
}

function ActiveDesctiveDropdown(dropdown){
  console.log("AAAAAAAAAAA")
  if (
    $(dropdown)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(dropdown)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(dropdown)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(dropdown)
      .parent()
      .addClass("active");
  }
}

export default class SideMenu extends Component {
  
  state = {
    bestiaryList: [],
    chapterList: [],
    sheetListName: []
  }

	componentDidMount() {
    JQueryFuction();    
    }

  UNSAFE_componentWillReceiveProps(props) {
    axios
      .get(`http://localhost:8000/rest/api/get-bestiary-list/${props.user.id}/`)
      .then(res => {
        const bestiaryList = res.data;
        //Linha usada só pra test
        bestiaryList[1].name = "Teste"        
        //Linha usada só pra test
        this.setState({ bestiaryList: bestiaryList });

        for (var i = 0; i < bestiaryList.length; i++) {          
          axios
            .get(`http://localhost:8000/rest/api/get-chapter-list/${bestiaryList[i].id}/`)
            .then(response => {
              const chapterListN = response.data;              
              this.setState({ chapterList: this.state.chapterList.concat(chapterListN) });

              for (var j = 0; j < chapterListN.length; j++) {
                axios
                  .get(`http://localhost:8000/rest/api/get-sheet-list/${chapterListN[j].id}/`)
                  .then(response1 => {
                    const sheetListNameN = response1.data;
                    this.setState({ sheetListName: this.state.sheetListName.concat(sheetListNameN) });
                  });
              }
            });          
        }        
      });

    

       
  }

 
	render() {    
    const listMenu = this.state.bestiaryList.map((bestiary) => (
      <li key={bestiary.id} className="sidebar-dropdown">
        <a href="#">
          <span>{bestiary.name}</span>
        </a>
        <div className="sidebar-submenu">
          <ul>
            <li>
              <a href="#">Dashboard 2</a>
            </li>
          </ul>
        </div>
      </li>
    ));    

		return (
			<div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Responsive sidebar template with sliding effect and dropdown menu based on bootstrap 3" />
        <title>Sidebar template</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
        <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
        <div className="page-wrapper chiller-theme toggled">
          <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
            <i className="fas fa-bars" />
          </a>
          <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
              <div className="sidebar-brand">
                <a href="#">pro sidebar</a>
                <div id="close-sidebar">
                  <i className="fas fa-times" />
                </div>
              </div>
              <div className="sidebar-header">
                <div className="user-pic">
                  <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt="User picture" />
                </div>
                <div className="user-info">
                  <span className="user-name">{this.props.user.username}</span>
                    <span className="user-role">
                        {(() => {
                            if (this.props.user.is_staff) {
                                return "Administrator";
                            } else {
                                return "Usuário";
                            }
                        })()}
                </span>
                  <span className="user-status">
                    <i className="fa fa-circle" />
                    <span>Online</span>
                  </span>
                </div>
              </div>
              {/* sidebar-header  */}          
              <div className="sidebar-menu">
                <ul>
                  <li className="header-menu">
                    <span>General</span>
                  </li>                  
                  {listMenu}                              
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fa fa-tachometer-alt" />
                      <span>Dashboard</span>
                      <span className="badge badge-pill badge-warning">New</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>                          
                          <a href="#">Dashboard 1                            
                          </a>
                        </li>
                        <li>
                          <a href="#">Dashboard 2</a>
                        </li>
                        <li>
                          <a href="#">Dashboard 3</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fa fa-shopping-cart" />
                      <span>E-commerce</span>
                      <span className="badge badge-pill badge-danger">3</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Products
                          </a>
                        </li>
                        <li>
                          <a href="#">Orders</a>
                        </li>
                        <li>
                          <a href="#">Credit cart</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="far fa-gem" />
                      <span>Components</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">General</a>
                        </li>
                        <li>
                          <a href="#">Panels</a>
                        </li>
                        <li>
                          <a href="#">Tables</a>
                        </li>
                        <li>
                          <a href="#">Icons</a>
                        </li>
                        <li>
                          <a href="#">Forms</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fa fa-chart-line" />
                      <span>Charts</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Pie chart</a>
                        </li>
                        <li>
                          <a href="#">Line chart</a>
                        </li>
                        <li>
                          <a href="#">Bar chart</a>
                        </li>
                        <li>
                          <a href="#">Histogram</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fa fa-globe" />
                      <span>Maps</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Google maps</a>
                        </li>
                        <li>
                          <a href="#">Open street map</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="header-menu">
                    <span>Extra</span>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-book" />
                      <span>Documentation</span>
                      <span className="badge badge-pill badge-primary">Beta</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-calendar" />
                      <span>Calendar</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-folder" />
                      <span>Examples</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* sidebar-menu  */}
            </div>
            {/* sidebar-content  */}
            <div className="sidebar-footer">
              <a href="#">
                <i className="fa fa-bell" />
                <span className="badge badge-pill badge-warning notification">3</span>
              </a>
              <a href="#">
                <i className="fa fa-envelope" />
                <span className="badge badge-pill badge-success notification">7</span>
              </a>
              <a href="#">
                <i className="fa fa-cog" />
                <span className="badge-sonar" />
              </a>
              <a href="#">
                <i className="fa fa-power-off" />
              </a>
            </div>
          </nav>
          {/* sidebar-wrapper  */}
          <main className="page-content">
            <div className="container-fluid">
                        <Sheet/>
              <hr />
              <div className="row">
                <div className="form-group col-md-12">
                  
                </div>
                <div className="form-group col-md-12">
                  
                </div>
              </div>
            
              <hr />
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">          
                  <div className="card rounded-0 p-0 shadow-sm">
                    
                    <div className="card-body text-center">
                      
                    </div>
                  </div>          
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">          
                  <div className="card rounded-0 p-0 shadow-sm">

                    <div className="card-body text-center">
                      
                    </div>
                  </div>          
                </div>
              </div>
            </div>
          </main>
          {/* page-content" */}
        </div>
        {/* page-wrapper */}
      </div>
		);
	}
}
