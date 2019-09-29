import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";

import "./SideMenu.css";
import Sheet from "./Sheet";
import Header from "./Header";
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-responsive-modal';


function JQueryFuction() {
  jQuery(function ($) {
    $(".sidebar-dropdown > a").off('click');
    $(".sidebar-dropdown > a").click(function () {
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(this)
          .next(".sidebar-submenu")
          .slideUp(200);
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });

    $("#close-sidebar").off('click');
    $("#show-sidebar").off('click');
    $("#close-sidebar").click(function () {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
      $(".page-wrapper").addClass("toggled");
    });
  });
}

export default class SideMenu extends Component {

  

  state = {
    userOnline: {},
    usingGetRouters: true,
    bestiaryList: [],
    chapterList: [],
    sheetListName: [],
    sharedSheetListName: [],
    sheetClicked: [],
    openCreateModal: false,
    openDeleteModal: false,
    modalDeleteObj: [],
    modalCreateInObj: [],
    modalObjType: "",
    inputNameValue: "",
    
  }

  updateMenu(props, fazChapter=true) {
     
    axios
      .get(`http://127.0.0.1:8000/rest/api/get-bestiary-list/${props.user.id}/`)
      .then(res => {
        const bestiaryList = res.data;        
        this.setState({ bestiaryList: bestiaryList });
        
        for (var i = 0; i < bestiaryList.length; i++) {
          axios
            .get(`http://127.0.0.1:8000/rest/api/get-chapter-list/${bestiaryList[i].id}/`)
            .then(response => {
              const chapterListN = response.data; 
              this.setState({ chapterList: _.unionBy(this.state.chapterList, chapterListN, "id")});
                             

              for (var j = 0; j < chapterListN.length; j++) {
                axios
                  .get(`http://127.0.0.1:8000/rest/api/get-sheet-list/${chapterListN[j].id}/`)
                  .then(response1 => {
                    const sheetListNameN = response1.data;
                    this.setState({ sheetListName: _.unionBy(this.state.sheetListName, sheetListNameN, "id")});
                  })

              }
                
            });
          
        }
      })

      axios
        .get(`http://127.0.0.1:8000/rest/api/sheet-list/from-users-that-edit/${props.user.id}/`)
        .then(response1 => {          
          const sharedSheetListNameN = response1.data;          
          this.setState({ sharedSheetListName: _.unionBy(this.state.sharedSheetListName, sharedSheetListNameN, "id")});
        })

  }


  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ inputNameValue: value })
  }

 
  createAllObjs() {
    this.closeModal()    
    if (this.state.modalObjType == "bestiary") {
          axios.post('http://127.0.0.1:8000/rest/api/bestiary/', {
              name: this.state.inputNameValue,
              owner: this.state.userOnline.id
            })
            .then((response) => {
              this.updateMenu(this.props) 
            })
    }

    if (this.state.modalObjType == "chapter") {
       axios.post('http://127.0.0.1:8000/rest/api/chapter/', {
              name: this.state.inputNameValue,
              bestiary: this.state.modalCreateInObj.id
            })
            .then((response) => {
              this.setState({ chapterList: this.state.chapterList.concat(response) })
              this.updateMenu(this.props)     
            })
     }
    if (this.state.modalObjType == "sheet") {
       axios.post('http://127.0.0.1:8000/rest/api/sheet-dnd35/create/', {
              name: this.state.inputNameValue,
              status: "PU",
              sheet_type: "CRB",
              chapter: this.state.modalCreateInObj.id     
    
            })
            .then((response) => {
              this.setState({ sheetListName: this.state.sheetListName.concat(response) })
              this.updateMenu(this.props) 
            })
     }
  }

  deleteBesChaObjs() {
    this.closeModal()
    console.log(this.state.modalDeleteObj.name, this.state.modalObjType)
    if (this.state.modalObjType == "bestiary") { 
       axios.delete(`http://127.0.0.1:8000/rest/api/bestiary/${this.state.modalDeleteObj.id}/`)
            .then((response) => {
              this.updateMenu(this.props) 
            })
     }
    if (this.state.modalObjType == "chapter") {
        axios.delete(`http://127.0.0.1:8000/rest/api/chapter/${this.state.modalDeleteObj.id}/`)
            .then((response) => {
              
              this.state.chapterList.splice(this.state.chapterList.indexOf(this.state.modalDeleteObj), 1)
              this.updateMenu(this.props) 
            })
    }
  }

  createModal(obj, type) {

    this.setState({
      openCreateModal: true,
      modalObjType: type,
      modalCreateInObj: obj
    })
  }

  closeModal() {
    this.setState({
      openCreateModal: false,
      openDeleteModal: false,
    })
  }

  deleteModal(obj, type) {
    this.setState({
      openDeleteModal: true,
      modalObjType: type,
      modalDeleteObj: obj
    })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (this.state.usingGetRouters) {
      this.setState({userOnline: props.user})
      this.setState({ usingGetRouters: false })
      this.updateMenu(props)
    }
  }


  render() {
    
    JQueryFuction();
    const routingSheet = (
      <Router>
        <div>
          <Switch>
            <Route exact path="/sheet/:sheetID" component={Sheet}>
            </Route>
          </Switch>
        </div>
      </Router>
    )
    const bestiaryListMenu = this.state.bestiaryList.map((bestiary, index) => (
      <li key={index} className="sidebar-dropdown">
        <a  >
          <div className="d-flex" style={{ background: '#31353D' }}>

            <span>{bestiary.name}</span>

            <div className="d-flex ml-auto" style={{ background: '#31353D' }}>
              <button type="button" className="btn btn-sm mb-n2 mr-2 bestiary-delete-icon">
                <FontAwesomeIcon className="mb-3 ml-n1" icon={faTrashAlt} size="xs"
                  onClick={(() => this.deleteModal(bestiary, "bestiary"))} />
              </button>

              <button type="button" className="btn btn-sm mb-n2 mr-2 bestiary-add-icon">
                <FontAwesomeIcon className="mb-3 ml-n1" icon={faPlus} size="xs"
                  onClick={(() => this.createModal(bestiary, "chapter"))} />
              </button>
            </div>

          </div>         
        </a>
        <div className="sidebar-submenu">
          {this.state.chapterList.filter(function (obj) {
            return obj.bestiary == bestiary.id
          }).map((chapter, index) => (
            <ul key={index}>
              <li key={index} className="sidebar-dropdown">
                <a >
                  <span>{chapter.name}</span>
                  <button type="button" className="btn btn-primary btn-sm ml-5" style={{ height: '20px', width: '20px' }}
                    onClick={(() => this.createModal(chapter,"sheet"))}>
                    <FontAwesomeIcon className="ml-n1 mb-3" icon={faPlus} style={{ fontSize: "12px" }} size="xs" />
                  </button>
                  <button type="button" className="btn btn-danger btn-sm ml-1" style={{ height: '20px', width: '20px' }}
                    onClick={(() => this.deleteModal(chapter, "chapter"))}>
                    <FontAwesomeIcon className="ml-n1 mb-3" icon={faTrashAlt} style={{ fontSize: "12px" }} size="xs" />
                  </button>

                </a>
                <div className="sidebar-submenu">
                  {this.state.sheetListName.filter(function (obj2) {
                    return obj2.chapter == chapter.id
                  }).map((sheet, index) => (
                    <ul key={index}>
                      <li key={index} >
                        <Router>
                          <Link to={`/sheet/${sheet.id}`}  >
                            <span >{sheet.name}</span>
                          </Link>
                        </Router>
                      </li>
                    </ul>
                  ))}
                </div>
              </li>
            </ul>

          ))}
        </div>
      </li>
    ));

    const sharedSheetListMenu = this.state.sharedSheetListName.map((sheet, index) => (
                    <ul key={index}>
                      <li key={index} >
                        <Router>
                          <Link to={`/sheet/${sheet.id}`}  >
                            <span >{sheet.name}</span>
                          </Link>
                        </Router>
                      </li>
                    </ul>
                  ))

    const modalDelete = (

      <Modal open={this.state.openDeleteModal} center onClose={(() => this.closeModal())} >
        <h2>{(() => {
          var itemType = this.state.modalObjType
          if (itemType == "bestiary") {
            return "Deletando Bestiario";
          }
          if (itemType == "chapter") {
            return "Deletando Capitulo";
          } else {
            return "Deletando Ficha";
          }
        })()}
        </h2>
        <p>Tem certeza que quer deletar {(() => {
          var itemType = this.state.modalObjType
          if (itemType == "bestiary") {
            return "o Bestiario " + this.state.modalDeleteObj.name;
          }
          if (itemType == "chapter") {
            return "o Capitulo" + this.state.modalDeleteObj.name;
          } else {
            return "a Ficha" + this.state.modalDeleteObj.name;
          }
        })()}?
          </p>
        <button type="button" className="btn btn-primary ml-5" onClick={(() => this.deleteBesChaObjs())}>Deletar</button>
        <button type="button" className="btn btn-danger ml-5" onClick={(() => this.closeModal())}>Cancelar</button>

      </Modal>
    );


    const modalCreate = (

      <Modal open={this.state.openCreateModal} center onClose={(() => this.closeModal())} >
        <h2>{(() => {
          var itemType = this.state.modalObjType
          if (itemType == "bestiary") {
            return "Criando Bestiario";
          }
          if (itemType == "chapter") {
            return "Criando Capitulo";
          } else {
            return "Criando Ficha";
          }
        })()}
        </h2>
        <p>Digite o nome {(() => {
          var itemType = this.state.modalObjType
          if (itemType == "bestiary") {
            return "do Bestiario";
          }
          if (itemType == "chapter") {
            return "do Capitulo";
          } else {
            return "da Ficha";
          }
        })()} que deseja criar:
          </p>
        <input type="text" style={{ height: '40px', width: '150px' }} onChange={this.handleOnChange} />
        <button type="button" className="btn btn-primary ml-4 mb-1" style={{ width: '120px' }} onClick={(() => this.createAllObjs())} >Criar</button>
      </Modal>
    );

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
        <div >
          <Header />
        </div>
        <div className="page-wrapper chiller-theme toggled" style={{ paddingTop: "60px" }}>

          <a id="show-sidebar" className="btn btn-sm btn-dark"  >
            <i className="fas fa-bars" />
          </a>
          <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content mt-5">
              <div className="sidebar-brand">
                <a  >Bestiario</a>
                <div id="close-sidebar">
                  <i className="fas fa-angle-left" />
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

                    <div className="d-flex">
                      <span>General</span>

                      <button type="button" className="btn btn-sm mb-n2 ml-auto bestiary-add-icon" style={{ "margin-right": "38px", "margin-top": "21px" }}>
                        <FontAwesomeIcon className="mb-3 ml-n1" icon={faPlus} size="xs"
                          onClick={(() => this.createModal("bestiary"))} />
                      </button>

                      {/* <button type="button" className="btn btn-primary btn-sm align-self-center mb-n2 ml-auto mr-3" style={{ height: '20px', width: '20px' }}>
                        <FontAwesomeIcon className="ml-n1 mb-3" icon={faPlus} style={{ fontSize: "12px" }} size="xs"
                          onClick={(() => this.createModal("bestiary"))} />
                      </button>*/}

                    </div>

                  </li>
                  {bestiaryListMenu}
                </ul>
                <ul>
                   <li className="header-menu">
                       <span>Shared Sheets</span>                        
                   </li>
                   {sharedSheetListMenu}
                </ul>
              </div>
              {/* sidebar-menu  */}
            </div>
            {/* sidebar-content  */}
          </nav>
          {/* sidebar-wrapper  */}
          <main className="page-content">

            {routingSheet}
            <div className="container-fluid">
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
        {modalCreate}
        {modalDelete}
        {/* page-wrapper */}
      </div>
    );
  }
}
