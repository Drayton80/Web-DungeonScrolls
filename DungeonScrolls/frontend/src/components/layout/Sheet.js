import React, { Component } from "react";
import './Sheet.css';
import axios from "axios";
import Modal from 'react-responsive-modal';


export default class Sheet extends Component {

//Se quiser fazer aparecer um pop-up quando deixar o mouse em cima de um campo só clocar na tag desse campo title="O que vc quer que apareça"

  state = {
    typeCanSee: "",
    usingGetRouters: true,
    sheetClicked: {},
    openSharedModal: false,
    openDeleteModal: false,
    inputNameValue: ""
  }

  updateSheet() {
      console.log(this.state.sheetClicked)
      axios.put(`http://127.0.0.1:8000/rest/api/sheet-dnd35/${this.state.sheetClicked.id}/`, this.state.sheetClicked)
            .then((response) => {  
            axios
              .get(`http://127.0.0.1:8000/rest/api/get-sheet-dnd35/${this.state.sheetClicked.id}/`)
              .then(res => {
                const sheetClicked = res.data;
                this.setState({ sheetClicked: sheetClicked });
                //console.log(sheetClicked)
              })                      
            })
  }

  sharedSheet() {    
    this.closeModal()  
    

    axios
      .get(`http://127.0.0.1:8000/rest/api/user/from-user-name/${this.state.inputNameValue}/`)
      .then((response1) => {
        var aux = this.state.sheetClicked.users_that_edit
              aux.push(response1.data.id)
              console.log(response1.data.id) 
              this.setState(prevState => ({
              sheetClicked: {
                ...prevState.sheetClicked,
                users_that_edit: aux
              }
                }))
                console.log(this.state.sheetClicked.users_that_edit)
                this.updateSheet()        
      })


  }

  deleteSheet() {
    this.closeModal()
  
      axios.delete(`http://127.0.0.1:8000/rest/api/sheet-dnd35/${this.state.sheetClicked.id}/`)
            .then((response) => {              
              const { history } = this.props;
                history.push("/")
                window.location.reload();
            })
  }

  sharedeModal() {
    this.setState({
      openSharedModal: true,
    })
  }

  closeModal() {
    this.setState({
      openSharedModal: false,
      openDeleteModal: false,
    })
  }

  deleteModal() {
    this.setState({
      openDeleteModal: true
    })
  }

  componentDidMount() {
    const { sheetID, typeCanSee } = this.props.match.params
    this.setState({typeCanSee: typeCanSee})
    
    axios
      .get(`http://127.0.0.1:8000/rest/api/get-sheet-dnd35/${sheetID}/`)
      .then(res => {
        const sheetClicked = res.data;
        this.setState({ sheetClicked: sheetClicked });
        console.log(sheetClicked)
      })
  }

  UNSAFE_componentWillReceiveProps(props) {  
    
    const { sheetID, typeCanSee } = props.match.params
    this.setState({typeCanSee: typeCanSee})
    //console.log(this.state.typeCanSee)
      axios
        .get(`http://127.0.0.1:8000/rest/api/get-sheet-dnd35/${sheetID}/`)
        .then(res => {
          const sheetClicked = res.data;
          this.setState({ sheetClicked: sheetClicked });
          //console.log(sheetClicked)
        })
    
  }


  handleOnChange = (e) => {
    
    var { name, value } = e.target;
    //value = parseInt(value)
    if (name == "inputNameShared") {      
      this.setState({ inputNameValue: value })
    }
    else {
      this.setState(prevState => ({
        sheetClicked: {
          ...prevState.sheetClicked,
          [name]: value
        }
      }))
    }

    //console.log(name, value, this.state.sheetClicked.name);
  }

  render() {
    const modalDelete = (

      <Modal open={this.state.openDeleteModal} center onClose={(() => this.closeModal())} >
        <h2>Deleting Sheet</h2>
        <p>Are you sure you want to delete the Sheet {this.state.sheetClicked.name}?
          </p>
        
        <button type="button" class="btn btn-primary ml-5" onClick={(() => this.deleteSheet())} >Delete</button>        
        <button type="button" class="btn btn-danger ml-5" onClick={(() => this.closeModal())}>Cancel</button>
      </Modal>
    );


    const modalShared = (
      <Modal open={this.state.openSharedModal} center onClose={(() => this.closeModal())} >
        <h2>Share Sheet with another User</h2>
        <p>Your changes will be saved when you share</p>
        <p>Enter Username:</p>
        <input type="text" name="inputNameShared" style={{ height: '40px', width: '150px' }} onChange={this.handleOnChange} />
        <button type="button" class="btn btn-secondary ml-4 mb-1" style={{ width: '120px' }} onClick={(() => this.sharedSheet())}>Share</button>
        <button type="button" class="btn btn-danger ml-5" onClick={(() => this.closeModal())}>Cancel</button>
      </Modal>
    );
    return (
      <div>
        {/* D&D 3.5 Character Sheet */}
        {/* by Armando S. S. Neto */}
        <div className="sheet-switch-pc">
          {/* start PC section */}
          {/* Header / Character Description */}
          <div class='container'>
            <input type="checkbox" className="sheet-pc-charrpinfo-show sheet-arrow" name="attr_charrpinfo-show" defaultValue={1} defaultChecked /><span style={{ textAlign: 'left' }} data-i18n="header">Header</span>
            <div className="sheet-pc-charrpinfo">
              <div class='row'>
                <div style={{ float: 'left' }}>
                  <table>
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          <table>
                            <tbody><tr>
                              <td><div style={{ float: 'left' }}>
                                <input type="text" name="information_name" 
                                  style={{ width: '125px', textAlign: 'right' }} defaultValue={this.state.sheetClicked.information_name}
                                  onChange={this.handleOnChange} />
                                <br /><span data-i18n="character-name">Character Name</span></div></td>
                                
                               <td><div style={{ float: 'left' }}>
                                <input type="text" name="name" 
                                  style={{ width: '125px', textAlign: 'right' }} defaultValue={this.state.sheetClicked.name}
                                  onChange={this.handleOnChange} />
                                <br /><span data-i18n="character-name">Sheet Name</span></div></td>

                              <td><div style={{ float: 'left' }}>
                                <input type="text" name="information_experience"  onChange={this.handleOnChange}
                                  style={{ width: '100px', textAlign: 'right' }} defaultValue={this.state.sheetClicked.information_experience}
                                />/<input type="text" name="attr_expgoal"  style={{ width: '100px' }} value={this.state.sheetClicked.information_level * 1000} />
                                <br /><span data-i18n="experience-points">Experience Points</span></div></td>

                            </tr>
                            </tbody></table>
                        </td>
                        <td colSpan={2}><div style={{ float: 'left' }}><img src="http://i.imgur.com/A746uyc.png?1" style={{ float: 'left', width: '200px' }} /> &nbsp; 3.5</div></td>
                      </tr>

                      <tr>
                        <td><div style={{ float: 'left' }}>
                          <input type="text" name="information_race"  style={{ width: '130px' }}
                            defaultValue={this.state.sheetClicked.information_race} onChange={this.handleOnChange} />
                          <br /><span data-i18n="race">Race</span></div></td>
                        <td><input type="text" name="information_size"  style={{ width: '130px' }}
                          defaultValue={this.state.sheetClicked.information_size} onChange={this.handleOnChange} />
                          <br /><span data-i18n="size">Size</span></td>
                        <td><div style={{ float: 'left' }}>
                          <input type="text" name="information_gender"  style={{ width: '70px' }}
                            defaultValue={this.state.sheetClicked.information_gender} onChange={this.handleOnChange} />
                          <br /><span data-i18n="gender">Gender</span></div></td>
                        <td><div style={{ float: 'left' }}>
                          <input type="text" name="information_alignment"  style={{ width: '120px' }}
                            defaultValue={this.state.sheetClicked.information_alignment} onChange={this.handleOnChange} />
                          <br /><span data-i18n="alignment">Alignment</span></div></td>

                      </tr>
                      <tr>
                        <td><div style={{ float: 'left' }}>
                          <input type="text" name="stringClass" style={{ width: '140px' }}
                            defaultValue={this.state.sheetClicked.stringClass} onChange={this.handleOnChange} />
                          <br /><span data-i18n="class">Class</span></div></td>
                        <td><div style={{ float: 'left' }}>
                          <input type="text" name="information_level" style={{ width: '80px' }}
                            defaultValue={this.state.sheetClicked.information_level} onChange={this.handleOnChange} />
                          <br /><span data-i18n="level">Level</span></div></td>
                        <td><div style={{ float: 'left' }}>
                          <input type="text" name="information_age" style={{ width: '70px' }}
                            defaultValue={this.state.sheetClicked.information_age} onChange={this.handleOnChange} />
                          <br /><span data-i18n="age">Age</span></div></td>
                        <td colSpan={2}><div style={{ float: 'left' }}>
                          <input type="text" name="information_deity" style={{ width: '150px' }}
                            defaultValue={this.state.sheetClicked.information_deity} onChange={this.handleOnChange} />
                          <br /><span data-i18n="deity">Deity</span></div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr />
              </div>
              <br />
            </div>
          </div>
          <button type="button" disabled="true" style={{ background: 'transparent', border: 'none', color: 'transparent', width: '30px', cursor: 'none' }} ></button>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab1" defaultValue={1} defaultChecked="checked" />
          <span className="sheet-tab sheet-tab1" data-i18n="stats" style={{ width: '80px' }} >Stats</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab4" defaultValue={4} />
          <span className="sheet-tab sheet-tab4" data-i18n="equipment" style={{ width: '180px' }} >Attacks and Equipment</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab2" defaultValue={2} />
          <span className="sheet-tab sheet-tab2" data-i18n="weapons" style={{ width: '160px' }} >Skills and Spells</span>

          <button type="button" disabled="true" style={{ background: 'transparent', border: 'none', color: 'transparent', width: '220px', cursor: 'none' }} ></button>
          <button type="button" className="btn btn-outline-primary" style={{ float: 'rigth' }}
            onClick={(() => this.updateSheet())}>Save Changes</button>
          <button type="button" disabled="true" style={{ background: 'transparent', border: 'none', color: 'transparent', width: '20px', cursor: 'none' }} ></button>
          <button type="button" class="btn btn-outline-secondary"
            onClick={(() => this.sharedeModal())}>Share Sheet</button>
         
            {(() => {
                      if (this.state.typeCanSee === "my-sheet") {
                        return ( <button type="button" disabled="true" style={{ background: 'transparent', border: 'none', color: 'transparent', width: '20px', cursor: 'none' }}></button>)
                      } else {
                        return ;
                      }
                    })()}
            
            
            
            {(() => {
                      if (this.state.typeCanSee === "my-sheet") {
                        return (<button type="button" className="btn btn-outline-danger" onClick={(() => this.deleteModal())}>Delete Sheet</button>)
                      } else {
                        return ;
                      }
                    })()}
          
          {modalShared}
          {modalDelete}

          <br />&nbsp;
          <div className="sheet-tab-content sheet-tab1 sheet-tab99">
            {/*Stats*/}
            <input type="checkbox" className="sheet-pc-statblock-show sheet-arrow"  name="attr_statblock-show" defaultValue={1} defaultChecked /><span style={{ textAlign: 'left' }} data-i18n="abilities">Abilities</span>
            <div className="sheet-pc-statblock">
              {/* Stat block */}
              <br />
              <table cellPadding={1} cellSpacing={0}>
                <tbody><tr>
                  <td style={{ textAlign: 'left' }}>
                    <table cellPadding={0} cellSpacing={0}>
                      <tbody><tr><td style={{ textAlign: 'left' }}>
                        <span className="sheet-table-name" style={{ width: '315px' }} data-i18n="ability-scores">Ability Scores</span>
                        <input type="checkbox" className="sheet-pc-abilitymacros-show sheet-arrow"  name="attr_abilitymacros-show" defaultValue={1} />
                        <div className="sheet-table-row">
                          <span className="sheet-table-header" data-i18n="ability">Ability</span>
                          <span className="sheet-table-header" data-i18n="modifier">Mod</span>
                          <span className="sheet-table-header" data-i18n="base">Base</span>
                        </div>
                        <div className="sheet-table-row">
                          <span className="sheet-table-row-name" style={{ width: '60px' }} data-i18n="strength-i">STR</span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_strength_modifier"
                            defaultValue={this.state.sheetClicked.ability_strength_modifier}  readOnly="readonly" onChange={this.handleOnChange} /></span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_strength_base"
                            defaultValue={this.state.sheetClicked.ability_strength_base}  onChange={this.handleOnChange} /></span>
                        </div>
                        <div className="sheet-table-row">
                          <span className="sheet-table-row-name" style={{ width: '60px' }} data-i18n="dexterity-i">DEX</span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_dexterity_modifier" 
                            defaultValue={this.state.sheetClicked.ability_dexterity_modifier} readOnly="readonly" onChange={this.handleOnChange} /></span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_dexterity_base" 
                            defaultValue={this.state.sheetClicked.ability_dexterity_base} onChange={this.handleOnChange} /></span>
                        </div>
                        <div className="sheet-table-row">
                          <span className="sheet-table-row-name" style={{ width: '60px' }} data-i18n="constitution-i">CON</span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_constitution_modifier" 
                            defaultValue={this.state.sheetClicked.ability_constitution_modifier} readOnly="readonly" onChange={this.handleOnChange} /></span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_constitution_base" 
                            defaultValue={this.state.sheetClicked.ability_constitution_base} onChange={this.handleOnChange} /></span>
                        </div>
                        <div className="sheet-table-row">
                          <span className="sheet-table-row-name" style={{ width: '60px' }} data-i18n="intelligence-i">INT</span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_intelligence_modifier" 
                            defaultValue={this.state.sheetClicked.ability_intelligence_modifier} readOnly="readonly" onChange={this.handleOnChange} /></span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_intelligence_base" 
                            defaultValue={this.state.sheetClicked.ability_intelligence_base} onChange={this.handleOnChange} /></span>
                        </div>
                        <div className="sheet-table-row">
                          <span className="sheet-table-row-name" style={{ width: '60px' }} data-i18n="wisdom-i">WIS</span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_wisdom_modifier" 
                            defaultValue={this.state.sheetClicked.ability_wisdom_modifier} readOnly="readonly" onChange={this.handleOnChange} /></span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_wisdom_base"
                            defaultValue={this.state.sheetClicked.ability_wisdom_base} onChange={this.handleOnChange} /></span>
                        </div>
                        <div className="sheet-table-row">
                          <span className="sheet-table-row-name" style={{ width: '60px' }} data-i18n="charisma-i">CHA</span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_charisma_modifier" 
                            defaultValue={this.state.sheetClicked.ability_charisma_modifier} readOnly="readonly" onChange={this.handleOnChange} /></span>
                          <span className="sheet-table-data-center"><input type="text" style={{ width: '45px' }} name="ability_charisma_base" 
                            defaultValue={this.state.sheetClicked.ability_charisma_base} onChange={this.handleOnChange} /></span>
                        </div>
                      </td></tr>
                      </tbody></table>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <table>
                      <tbody><tr>
                        <td rowSpan={3} style={{ width: '50px' }}> &nbsp; &nbsp; &nbsp; &nbsp; </td>
                        <td>
                          <table>
                            <tbody><tr>
                              <td className="sheet-statlabel-big" style={{ width: '70px' }}><span data-i18n="hit-points-i">HP</span><br /><div style={{ fontSize: '0.65em' }} data-i18n="hit-points">Hit Points</div></td>
                              <td><input className="sheet-inputbox" type="text" name="battle_hp_current" defaultValue={this.state.sheetClicked.battle_hp_current} onChange={this.handleOnChange}  style={{ height: '24px', width: '117px', textAlign: 'center' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="current-hit-points">Current HP</div></td>
                              <td><input className="sheet-inputbox" type="text" name="battle_hp_total" defaultValue={this.state.sheetClicked.battle_hp_total} onChange={this.handleOnChange} style={{ height: '24px', width: '117px', textAlign: 'center' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="max">Max</div></td>
                              <td><input className="sheet-inputbox" type="text" name="battle_hp_nonlethal" defaultValue={this.state.sheetClicked.battle_hp_nonlethal} onChange={this.handleOnChange}  style={{ height: '24px', width: '140px', textAlign: 'center' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="nonlethal-damage">Nonlethal Damage</div></td>
                            </tr>
                              <tr>
                                <td className="sheet-statlabel-big" style={{ width: '70px' }} data-i18n="initiative-u">INITIATIVE</td>
                                <td colSpan={2}>
                                  <table>
                                    <tbody><tr>
                                      <td><input className="sheet-inputbox" type="text" name="battle_initiative_total" style={{ height: '24px', width: '30px' }}  defaultValue={this.state.sheetClicked.battle_initiative_total} disabled="true" /> =<br /><div style={{ fontSize: '0.5em' }} data-i18n="total">Total</div></td>
                                      <td><input className="sheet-inputbox" type="text" name="ability_dexterity_modifier"  defaultValue={this.state.sheetClicked.ability_dexterity_modifier} disabled="true" style={{ height: '24px', width: '30px' }} /> +<br /><div style={{ fontSize: '0.5em' }} data-i18n="dexterity-modifier">Dex Mod</div></td>
                                      <td><input className="sheet-inputbox" type="text" name="battle_initiative_others"  defaultValue={this.state.sheetClicked.battle_initiative_others} style={{ height: '24px', width: '30px' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="miscellaneous-modifier-a">Misc Mod</div></td>
                                    </tr>
                                    </tbody></table>
                                </td>
                                <td>
                                  <table>
                                    <tbody><tr>
                                      <td className="sheet-statlabel-big" style={{ width: '50px' }} data-i18n="speed-u">SPEED</td>
                                      <td><input className="sheet-inputbox" type="text" name="battle_speed" defaultValue={this.state.sheetClicked.battle_speed} onChange={this.handleOnChange}  style={{ height: '24px', width: '85px' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="speed">Speed</div></td>
                                    </tr>
                                    </tbody></table>
                                </td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                        <tr>
                          <td colSpan={2}>
                            <table>
                              <tbody><tr>
                                <td style={{ width: '38px' }} className="sheet-statlabel"><span data-i18n="armor-class-i">AC</span><br /><div style={{ fontSize: '0.65em' }} data-i18n="armor-class">Armor Class</div></td>
                                <td><input className="sheet-inputbox" type="text" name="battle_ca_total" 
                                  defaultValue={this.state.sheetClicked.battle_ca_total} onChange={this.handleOnChange} disabled="true" style={{ height: '24px', width: '35px' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="total">Total</div></td>
                                <td>=10<br /><br /></td>
                                <td>+<input className="sheet-inputbox" type="text" name="ability_dexterity_modifier" 
                                  defaultValue={this.state.sheetClicked.ability_dexterity_modifier} onChange={this.handleOnChange} disabled="true" style={{ height: '24px', width: '28px' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="ability-modifier-a">Ability Mod</div></td>
                                <td>+<input className="sheet-inputbox" type="text" name="battle_ca_equipment_armor" 
                                  defaultValue={this.state.sheetClicked.battle_ca_equipment_armor} onChange={this.handleOnChange} disabled="true" style={{ height: '24px', width: '28px' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="armor-bonus-a">Armor Bns</div></td>
                                <td>+<input className="sheet-inputbox" type="text" name="information_size_modifier_ca_and_attack" 
                                  defaultValue={this.state.sheetClicked.information_size_modifier_ca_and_attack} onChange={this.handleOnChange} disabled="true" style={{ height: '24px', width: '28px' }} /><br /><div style={{ fontSize: '0.5em' }} data-i18n="size-modifier-a">Size Mod</div></td>
                                <td>+<input className="sheet-inputbox" type="text" name="battle_ca_natural_armor" 
                                  defaultValue={this.state.sheetClicked.battle_ca_natural_armor} onChange={this.handleOnChange} style={{ height: '24px', width: '28px' }} disabled="true" /><br /><div style={{ fontSize: '0.5em' }} data-i18n="natural-armor-a">Nat. Armor</div></td>
                                <td>+<input className="sheet-inputbox" type="text" name="battle_ca_deflection_modifier" 
                                  defaultValue={this.state.sheetClicked.battle_ca_deflection_modifier} onChange={this.handleOnChange} style={{ height: '24px', width: '28px' }} disabled="true" /><br /><div style={{ fontSize: '0.5em' }} data-i18n="deflection">Deflection</div></td>
                                <td>+<input className="sheet-inputbox" type="text" name="battle_ca_other_modifier" 
                                  defaultValue={this.state.sheetClicked.battle_ca_other_modifier} onChange={this.handleOnChange} style={{ height: '24px', width: '28px' }} disabled="true" /><br /><div style={{ fontSize: '0.5em' }} data-i18n="miscellaneous-modifier-a">Misc Mod</div></td>
                                <td> &nbsp; &nbsp; &nbsp; </td>
                              </tr>
                              </tbody></table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <table>
                              <tbody><tr>
                                <td style={{ width: '35px', height: '24px' }} className="sheet-statlabel"><span data-i18n="touch-u">TOUCH</span><br /><div style={{ fontSize: '0.65em' }} data-i18n="armor-class">Armor Class</div></td>
                                <td valign="top"><input className="sheet-inputbox" type="text" style={{ width: '35px' }} name="battle_ca_touch"  defaultValue={this.state.sheetClicked.battle_ca_touch} onChange={this.handleOnChange} disabled="true" /> &nbsp; </td>
                                <td style={{ width: '70px' }} className="sheet-statlabel"><span data-i18n="flat-footed-u">FLAT-FOOTED</span><br /><div style={{ fontSize: '0.65em' }} data-i18n="armor-class">Armor Class</div></td>
                                <td valign="top"><input className="sheet-inputbox" type="text" style={{ width: '35px' }} name="battle_ca_flat_footed"  defaultValue={this.state.sheetClicked.battle_ca_flat_footed} onChange={this.handleOnChange} disabled="true" /> &nbsp; </td>
                                <td valign="top"><input className="sheet-inputbox" type="text" name="battle_damage_reduction"  style={{ width: '120px' }} defaultValue={this.state.sheetClicked.battle_damage_reduction} onChange={this.handleOnChange} /><br /><div style={{ fontSize: '0.65em' }} data-i18n="damage-reduction">Damage Reduction</div></td>
                              </tr>
                              </tbody></table>
                            <br />
                          </td>
                        </tr>
                      </tbody></table>
                  </td>
                </tr>
                </tbody></table>
            </div>
            <br />
            <input type="checkbox" className="sheet-pc-saveblock-show sheet-arrow"  name="attr_saveblock-show" defaultValue={1} defaultChecked /><span style={{ textAlign: 'left' }} data-i18n="saves-combat-notes">Saves, Combat, Notes</span>
            <div className="sheet-pc-saveblock">
              <table>
                <tbody><tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <div className="sheet-table-data-center" style={{ verticalAlign: 'top' }}>
                      <table>
                        <tbody><tr>
                          <td className="sheet-table-data-left">
                            {/*Saving Throws */}
                            <table cellPadding={0} cellSpacing={0}>
                              <tbody><tr><td style={{ textAlign: 'left' }}>
                                <div className="sheet-table-row">
                                  <span className="sheet-table-header2" data-i18n="saving-throws-s">Saving<br />Throws</span>
                                  <span className="sheet-table-header2" data-i18n="total">Total</span>
                                  <span className="sheet-table-header2" data-i18n="base-save-s">Base<br />Save</span>
                                  <span className="sheet-table-header2" data-i18n="ability-modifier-s">Ability<br />Modifier</span>
                                  <span className="sheet-table-header2" data-i18n="miscellaneous-modifier-s">Misc<br />Modifier</span>
                                  <span className="sheet-table-header2" data-i18n="temporary-modifier-s">Temp<br />Modifier</span>
                                </div>
                                <div className="sheet-table-row">
                                  <span className="sheet-table-row-name" style={{ width: '60px' }}><span data-i18n="fortitude">Fortitude</span><br /><div style={{ fontSize: '0.65em' }}>(<span data-i18n="constitution">Constitution</span>)</div></span>
                                  <span className="sheet-table-data-center"><input type="text" style={{ width: '35px' }} name="saving_throws_fortitude_total"  defaultValue={this.state.sheetClicked.saving_throws_fortitude_total} onChange={this.handleOnChange} disabled="true" /></span>
                                  <span className="sheet-table-data-center">=<input type="text" style={{ width: '35px' }} name="saving_throws_fortitude_base"  defaultValue={this.state.sheetClicked.saving_throws_fortitude_base} onChange={this.handleOnChange} /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="ability_constitution_modifier" defaultValue={this.state.sheetClicked.ability_constitution_modifier} onChange={this.handleOnChange} disabled="true" /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="saving_throws_fortitude_others"  defaultValue={this.state.sheetClicked.saving_throws_fortitude_others} onChange={this.handleOnChange} /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="saving_throws_fortitude_temporary"  defaultValue={this.state.sheetClicked.saving_throws_fortitude_temporary} onChange={this.handleOnChange} /></span>
                                </div>
                                <div className="sheet-table-row" style={{ fontSize: '1em' }}>
                                  <span className="sheet-table-row-name" style={{ width: '60px' }}><span data-i18n="reflex">Reflex</span><br /><div style={{ fontSize: '0.65em' }}>(<span data-i18n="dexterity">Dexterity</span>)</div></span>
                                  <span className="sheet-table-data-center"><input type="text" style={{ width: '35px' }} name="saving_throws_reflex_tota"  defaultValue={this.state.sheetClicked.saving_throws_reflex_tota} onChange={this.handleOnChange} disabled="true" /></span>
                                  <span className="sheet-table-data-center">=<input type="text" style={{ width: '35px' }} name="saving_throws_reflex_base"  defaultValue={this.state.sheetClicked.saving_throws_reflex_base} onChange={this.handleOnChange} /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="ability_dexterity_modifier"  defaultValue={this.state.sheetClicked.ability_dexterity_modifier} onChange={this.handleOnChange} disabled="true" /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="saving_throws_reflex_other"  defaultValue={this.state.sheetClicked.saving_throws_reflex_other} onChange={this.handleOnChange} /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="saving_throws_reflex_temporary"  defaultValue={this.state.sheetClicked.saving_throws_reflex_temporary} onChange={this.handleOnChange} /></span>
                                </div>
                                <div className="sheet-table-row">
                                  <span className="sheet-table-row-name" style={{ width: '60px' }}><span data-i18n="will">Will</span><br /><div style={{ fontSize: '0.65em' }}>(<span data-i18n="wisdom">Wisdom</span>)</div></span>
                                  <span className="sheet-table-data-center"><input type="text" style={{ width: '35px' }} name="saving_throws_will_total"  defaultValue={this.state.sheetClicked.saving_throws_will_total} onChange={this.handleOnChange} disabled="true" /></span>
                                  <span className="sheet-table-data-center">=<input type="text" style={{ width: '35px' }} name="saving_throws_will_base"  defaultValue={this.state.sheetClicked.saving_throws_will_base} onChange={this.handleOnChange} /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="ability_wisdom_modifier"  defaultValue={this.state.sheetClicked.ability_wisdom_modifier} onChange={this.handleOnChange} disabled="true" /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="saving_throws_will_others"  defaultValue={this.state.sheetClicked.saving_throws_will_others} onChange={this.handleOnChange} /></span>
                                  <span className="sheet-table-data-center">+<input type="text" style={{ width: '35px' }} name="saving_throws_will_temporary"  defaultValue={this.state.sheetClicked.saving_throws_will_temporary} onChange={this.handleOnChange} /></span>
                                </div>
                              </td></tr>
                              </tbody></table>
                            <br />
                            <table>
                              <tbody><tr>
                                <td className="sheet-statlabel-big" style={{ width: '80px' }}><div data-i18n="spell-resistance">Spell Resist</div></td>
                                <td style={{ textAlign: 'left' }}><input className="sheet-inputbox" type="text" name="battle_spell_resistance" defaultValue={this.state.sheetClicked.battle_spell_resistance} onChange={this.handleOnChange}  style={{ height: '24px', width: '50px' }} /></td>
                                <td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                                <td className="sheet-statlabel-big" style={{ width: '110px' }}><div data-i18n="arcane-spell-failure">Arcane Spell Failure</div></td>
                                <td><input className="sheet-inputbox" type="text" name="attr_arcanespellfailure" defaultValue={this.state.sheetClicked.magic_arcane_spell_failure} onChange={this.magic_arcane_spell_failure}  style={{ height: '24px', width: '50px' }} /></td>
                              </tr>
                              </tbody></table>
                            <br />
                            <table>
                              <tbody><tr>
                                <td className="sheet-statlabel-big" style={{ width: '80px' }}><span data-i18n="base-attack">Base Attack</span></td>
                                <td>&nbsp;<input className="sheet-inputbox" type="text" name="battle_base_attack_bonus"  style={{ height: '24px', width: '50px' }} defaultValue={this.state.sheetClicked.battle_base_attack_bonus} onChange={this.handleOnChange} /></td>
                              </tr>
                              </tbody></table>
                            {/*Grapple, Melee Attack, and Ranged Attack*/}
                            <table cellPadding={0} cellSpacing={0}>
                              <tbody><tr><td style={{ textAlign: 'left' }}>
                                <input type="checkbox" className="sheet-pc-baseattackmacros-show sheet-arrow"  name="attr_baseattackmacros-show" defaultValue={1} />{/*span style="text-align: left;"></span*/}
                                <div className="sheet-table-row">
                                  <td className="sheet-statlabel-big" style={{ width: '80px' }}><span data-i18n="base-attack">Grapple</span></td>
                                  <span className="sheet-table-data-center"><input className="sheet-inputbox" type="text" style={{ width: '45px' }} name="battle_grapple_total"  defaultValue={this.state.sheetClicked.battle_grapple_total} onChange={this.handleOnChange} disabled="true" /></span>
                                </div>
                                <div className="sheet-pc-baseattackmacros">
                                  <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{ width: '175px', height: '20px' }} name="attr_grapplenote"  placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                  <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{ width: '175px', height: '20px' }} name="attr_grapplemacro"  defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name} }} {{attack1=Grapple check: [[ 1d20 + [[ @{grapple} ]] ]] }} {{notes=@{grapplenote} }}"} /></span>
                                </div>
                                <br />
                              </td></tr>
                              </tbody></table>
                            <br />
                          </td>
                        </tr>
                        </tbody></table>
                    </div>
                  </td>
                  <td className="sheet-table-data-left">
                    <div className="sheet-table-data-center" style={{ verticalAlign: 'top' }}>
                      <div style={{ float: 'left' }}>
                        <div style={{ display: 'table', width: '39%', float: 'left' }}>
                          <div className="sheet-table-row">
                            <span className="sheet-table-data-center"><span data-i18n="languages">Languages</span><br /><textarea rows={2} cols={55} style={{ width: '380px' }} name="languages" 
                              defaultValue={this.state.sheetClicked.information_languages} onChange={this.handleOnChange} /></span>
                          </div>
                          <div className="sheet-table-row">
                            <span className="sheet-table-data-center"><span data-i18n="racial-abilities">Appearance</span><br /><textarea rows={4} cols={55} style={{ width: '380px' }} name="annotations_appearance" 
                              defaultValue={this.state.sheetClicked.annotations_appearance} onChange={this.handleOnChange} /></span>
                          </div>
                          <div className="sheet-table-row">
                            <span className="sheet-table-data-center"><span data-i18n="class-abilities">Background</span><br /><textarea rows={4} cols={55} style={{ width: '380px' }} name="annotations_background"
                              defaultValue={this.state.sheetClicked.annotations_background} onChange={this.handleOnChange} /></span>
                          </div>
                          <div className="sheet-table-row">
                            <span className="sheet-table-data-center"><span data-i18n="other">Other</span><br /><textarea rows={4} cols={55} style={{ width: '380px' }} name="annotations_others" 
                              defaultValue={this.state.sheetClicked.annotations_others} onChange={this.handleOnChange} /></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody></table>
              <hr />
            </div>
          </div>
          <div className="sheet-tab-content sheet-tab2 sheet-tab99">
            {/*Skills e Spells*/}
            <input type="checkbox" className="sheet-pc-skills-show sheet-arrow"  name="attr_skills-show" defaultValue={1} defaultChecked /><span style={{ textAlign: 'left' }} data-i18n="skills">Skills</span>
            <div className="sheet-pc-skills">
              <table cellPadding={0} cellSpacing={0}>
                <tbody><tr>
                  <div className="sheet-table-row">
                    <span className="sheet-table-data-center"><span data-i18n="feats">Skills Description</span><br />
                      <textarea rows={4} cols={55} style={{ width: '790px' }} name="bigStringSkills" 
                        defaultValue={this.state.sheetClicked.bigStringSkills} onChange={this.handleOnChange} /></span>
                  </div>
                  <br />
                  <div className="sheet-table-row">
                    <span className="sheet-table-data-center"><span data-i18n="other">Feats</span><br />
                      <textarea rows={4} cols={55} style={{ width: '790px' }} name="talents_feats" 
                        defaultValue={this.state.sheetClicked.talents_feats} onChange={this.handleOnChange} /></span>
                  </div>
                </tr>
                </tbody></table>
            </div>
            <br />
            <br />
            <input type="checkbox" className="sheet-pc-weapons-show sheet-arrow"  name="attr_weapons-show" defaultValue={1} defaultChecked /><span style={{ textAlign: 'left' }} data-i18n="weapons">Spells</span>
            <div className="sheet-pc-weapons">

              <table cellPadding={0} cellSpacing={0}>
                <tbody><tr>

                  <div className="sheet-table-row">
                    <br />
                    <div className="sheet-table-row">
                      <span className="sheet-table-data-center"><span data-i18n="feats">Spells Save</span><br />
                        <textarea rows={1} cols={55} style={{ width: '100px' }} name="magic_spell_save" 
                          defaultValue={this.state.sheetClicked.magic_spell_save} onChange={this.handleOnChange} /></span>
                    </div>
                  </div>
                  <br />
                  <div className="sheet-table-row">
                    <span className="sheet-table-data-center"><span data-i18n="feats">Spells</span><br />
                      <textarea rows={4} cols={55} style={{ width: '790px' }} name="magic_slots"
                        defaultValue={this.state.sheetClicked.magic_slots} onChange={this.handleOnChange} /></span>
                  </div>
                  <br />
                  <div className="sheet-table-row">
                    <span className="sheet-table-data-center"><span data-i18n="other">Spells Description</span><br />
                      <textarea rows={4} cols={55} style={{ width: '790px' }} name="magic_spells" 
                        defaultValue={this.state.sheetClicked.magic_spells} onChange={this.handleOnChange} /></span>
                  </div>
                </tr>
                </tbody></table>


            </div>
          </div>
          <div className="sheet-tab-content sheet-tab4 sheet-tab99">
            {/*Ataques e Equipamentos*/}
            <input type="checkbox" className="sheet-pc-encumbrance-show sheet-arrow" name="attr_encumbrance-show" defaultValue={1} defaultChecked /><span style={{ textAlign: 'left' }} data-i18n="encumbrance/load">Attacks</span>
            <div className="sheet-pc-encumbrance">
              
              <table cellPadding={10} cellSpacing={0}>
                <tbody><tr>
                  <br />
                  <span className="sheet-table-data-center" ><span data-i18n="other">Attacks Description</span><br />
                  <textarea rows={4} cols={55} style={{ float: 'left', width: '790px' }} name="bigStringAttacks"
                    defaultValue={this.state.sheetClicked.bigStringAttacks} onChange={this.handleOnChange} /></span>
                  <br />
                </tr></tbody>
              </table>
            </div>
            <br />
            <input type="checkbox" className="sheet-pc-equipment-show sheet-arrow" name="attr_equipment-show" defaultValue={1} defaultChecked /><span style={{ textAlign: 'left' }} data-i18n="equipment">Equipments</span>
            <div className="sheet-pc-equipment">


              <table cellPadding={0} cellSpacing={0}>
                <br />
                <tbody><tr>
                  <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="light-load"> Current Load Weight </td>
                  <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="medium-load"> Light Load Weight </td>
                  <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="heavy-load"> Medium Load Weight </td>
                  <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="lift-over-head-a"> Heavy Load Weight </td>
                  <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="lift-off-ground"> Max Load Weight </td>

                </tr>
                  <tr>

                    <td><input className="sheet-inputbox" type="text" name="inventory_weight_current" style={{ height: '24px', width: '140px', textAlign: 'right' }}
                      defaultValue={this.state.sheetClicked.inventory_weight_current} onChange={this.handleOnChange} /></td>
                    <td><input className="sheet-inputbox" type="text" name="inventory_weight_light" style={{ height: '24px', width: '140px', textAlign: 'right' }}
                      defaultValue={this.state.sheetClicked.inventory_weight_light} onChange={this.handleOnChange} /></td>
                    <td><input className="sheet-inputbox" type="text" name="inventory_weight_medium" style={{ height: '24px', width: '140px', textAlign: 'right' }}
                      defaultValue={this.state.sheetClicked.inventory_weight_medium} onChange={this.handleOnChange} /></td>
                    <td><input className="sheet-inputbox" type="text" name="inventory_weight_heavy" style={{ height: '24px', width: '140px', textAlign: 'right' }}
                      defaultValue={this.state.sheetClicked.inventory_weight_heavy} onChange={this.handleOnChange} /></td>
                    <td><input className="sheet-inputbox" type="text" name="inventory_weight_maximum" style={{ height: '24px', width: '140px', textAlign: 'right' }}
                      defaultValue={this.state.sheetClicked.inventory_weight_maximum} onChange={this.handleOnChange} /></td>
                  </tr>
                </tbody></table>


              <table cellPadding={10} cellSpacing={0}>
                <tbody><tr>
                    
              <div className="sheet-table-row">
                <span className="sheet-table-data-center"><span data-i18n="money">Money</span><br />
                  <textarea type="text" name="inventory_money" style={{ float: 'left', width: '400px' }}
                    defaultValue={this.state.sheetClicked.inventory_money} onChange={this.handleOnChange} /></span>
                    <br />
              </div>
                </tr>
                </tbody></table>
              
              <br />
              <table>
                <tbody><tr>
                  <span className="sheet-table-data-center" ><span data-i18n="other">Armor</span><br />
                  <textarea rows={2} cols={55} style={{ float: 'left', width: '790px' }} name="bigStringInventoryArmor"
                    defaultValue={this.state.sheetClicked.bigStringInventoryArmor} onChange={this.handleOnChange} /></span>
                  <br />
                   </tr>
                </tbody></table>
                  <table>
                <tbody><tr>
                  <span className="sheet-table-data-center" ><span data-i18n="other">Shield</span><br />
                  <textarea rows={2} cols={55} style={{ float: 'left', width: '790px' }} name="bigStringInventoryShield"
                    defaultValue={this.state.sheetClicked.bigStringInventoryShield} onChange={this.handleOnChange} /></span>
                </tr>
                </tbody></table>
              <br />
              <table>
                <tbody><tr>
                  <span className="sheet-table-data-center" ><span data-i18n="other">Other possessions</span><br />
                  <textarea rows={4} cols={55} style={{ float: 'left', width: '790px' }} name="bigStringInventoryOthers"
                    defaultValue={this.state.sheetClicked.bigStringInventoryOthers} onChange={this.handleOnChange} /></span>
                </tr>
                </tbody></table>
              <br />

              <hr />
            </div>
          </div>
          {/* end PC section */}
        </div>
      </div>
    );
  }
}
