import React, { Component } from "react";
import './Sheet.css';
import axios from "axios";

export default class Sheet extends Component {

   state = {   
    sheetClicked: []
  }

  componentDidMount() {
    const { sheetID } =  this.props.match.params    
    axios
      .get(`http://localhost:8000/rest/api/get-sheet-dnd35/${sheetID}/`)
      .then(res => {
        const sheetClicked = res.data;       
        this.setState({ sheetClicked: sheetClicked });
        console.log(sheetClicked)      
      })
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { sheetID } = props.match.params
    axios
      .get(`http://localhost:8000/rest/api/get-sheet-dnd35/${sheetID}/`)
      .then(res => {
        const sheetClicked = res.data;
        this.setState({ sheetClicked: sheetClicked });
        console.log(sheetClicked)
      })
  }

   handleOnChange = (e) => {
     const { name, value} = e.target;
     this.setState({
       sheetClicked: {
        [name]: value
       }
     })
     
     console.log(name, value, this.state.sheetClicked.name);
   }

	render() {
		return (
	<div>
        {/* D&D 3.5 Character Sheet */}
        {/* by Diana P. */}
        {/* based on Pathfinder sheets from Barry R., Sam, Brian, and Justin N. */}
        {/* with lots of help from Toby*/}
        {/* Version 2.7.8 1/7/19 (Fix roll buttons)*/}        
        <div className="sheet-switch-pc">
          {/* start PC section */}
          {/* Header / Character Description */}
          <div class='container'>
            <input type="checkbox" className="sheet-pc-charrpinfo-show sheet-arrow" name="attr_charrpinfo-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="header">Header</span>
          <div className="sheet-pc-charrpinfo">
          <div class='row'>
            <div style={{float: 'left'}}>
              <table>
                <tbody>                  
                  <tr>
                    <td colSpan={6}>
                      <table>
                        <tbody><tr>                          
                            <td><div style={{float: 'left'}}>
                              <input type="text" name="information_name" title="character_name" 
                              style={{width: '125px', textAlign: 'right'}} defaultValue={this.state.sheetClicked.information_name} 
                              onChange={this.handleOnChange}/>                              
                              <br /><span data-i18n="character-name">Character Name</span></div></td>                  
                          
                            <td><div style={{float: 'left'}}>
                              <input type="text" name="information_experience" title="expcurrent" onChange={this.handleOnChange}
                               style={{width: '145px', textAlign: 'right'}} defaultValue={this.state.sheetClicked.information_experience} 
                              />/<input type="text" name="attr_expgoal" title="expgoal" style={{width: '150px'}} value={this.state.sheetClicked.information_level * 1000} />
                              <br /><span data-i18n="experience-points">Experience Points</span></div></td>
                            
                          </tr>
                        </tbody></table>
                    </td>
                    <td colSpan={2}><div style={{float: 'left'}}><img src="http://i.imgur.com/A746uyc.png?1" style={{float: 'left', width: '200px'}} /> &nbsp; 3.5</div></td>
                  </tr>
                  <tr>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_race" title="race" style={{width: '130px'}} 
                      defaultValue={this.state.sheetClicked.information_race} onChange={this.handleOnChange}/> 
                      <br /><span data-i18n="race">Race</span></div></td>                    
                    <td><input type="text" name="information_size" title="race" style={{width: '130px'}} 
                    defaultValue={this.state.sheetClicked.information_size} onChange={this.handleOnChange}/> 
                      <br /><span data-i18n="size">Size</span></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_gender" title="gender" style={{width: '70px'}} 
                      defaultValue={this.state.sheetClicked.information_gender} onChange={this.handleOnChange}/>
                       <br /><span data-i18n="gender">Gender</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_alignment" title="alignment" style={{width: '120px'}} 
                      defaultValue={this.state.sheetClicked.information_alignment} onChange={this.handleOnChange}/>
                      <br /><span data-i18n="alignment">Alignment</span></div></td>
                    
                  </tr>
                  <tr>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="stringClass"  style={{width: '140px'}} 
                      defaultValue={this.state.sheetClicked.stringClass} onChange={this.handleOnChange} />
                       <br /><span data-i18n="class">Class</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_level"  style={{width: '80px'}} 
                      defaultValue={this.state.sheetClicked.information_level} onChange={this.handleOnChange}/>
                       <br /><span data-i18n="level">Level</span></div></td>                   
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_age"  style={{width: '70px'}} 
                      defaultValue={this.state.sheetClicked.information_age} onChange={this.handleOnChange}/>
                       <br /><span data-i18n="age">Age</span></div></td>
                       <td colSpan={2}><div style={{float: 'left'}}>
                      <input type="text" name="information_deity"  style={{width: '150px'}} 
                        defaultValue={this.state.sheetClicked.information_deity} onChange={this.handleOnChange}/>
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
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab1" defaultValue={1} title="Stats" defaultChecked="checked" />
          <span className="sheet-tab sheet-tab1" data-i18n="stats">Stats</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab4" defaultValue={4} title="Equipment" />
          <span className="sheet-tab sheet-tab4" data-i18n="equipment">Ataques e Equipamentos</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab2" defaultValue={2} title="Weapons" />
          <span className="sheet-tab sheet-tab2" data-i18n="weapons">Skills e Spells</span>         
          <br />&nbsp;
          <div className="sheet-tab-content sheet-tab1 sheet-tab99">
            {/*Stats*/}
            <input type="checkbox" className="sheet-pc-statblock-show sheet-arrow" title="statblock-show" name="attr_statblock-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="abilities">Abilities</span>
            <div className="sheet-pc-statblock">
              {/* Stat block */}
              <br />
              <table cellPadding={1} cellSpacing={0}>
                <tbody><tr>
                    <td style={{textAlign: 'left'}}>
                      <table cellPadding={0} cellSpacing={0}>
                        <tbody><tr><td style={{textAlign: 'left'}}>
                              <span className="sheet-table-name" style={{width: '315px'}} data-i18n="ability-scores">Ability Scores</span>
                              <input type="checkbox" className="sheet-pc-abilitymacros-show sheet-arrow" title="abilitymacros-show" name="attr_abilitymacros-show" defaultValue={1} />
                              <div className="sheet-table-row">
                                <span className="sheet-table-header" data-i18n="ability">Ability</span>                                
                                <span className="sheet-table-header" data-i18n="modifier">Mod</span>
                                <span className="sheet-table-header" data-i18n="base">Base</span>                                
                              </div>
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="strength-i">STR</span>                                
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_strength_modifier" 
                                defaultValue={this.state.sheetClicked.ability_strength_modifier} title="str-mod" readOnly="readonly" onChange={this.handleOnChange}/></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_strength_base" 
                                defaultValue={this.state.sheetClicked.ability_strength_base} title="str-base" onChange={this.handleOnChange}/></span>                                
                              </div>                              
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="dexterity-i">DEX</span>                                
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_dexterity_modifier" title="dex-mod" 
                                defaultValue={this.state.sheetClicked.ability_dexterity_modifier} readOnly="readonly" onChange={this.handleOnChange}/></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_dexterity_base" title="dex-base" 
                                defaultValue={this.state.sheetClicked.ability_dexterity_base} onChange={this.handleOnChange}/></span>                                
                              </div>                              
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="constitution-i">CON</span>                                
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_constitution_modifier" title="con-mod" 
                                defaultValue={this.state.sheetClicked.ability_constitution_modifier} readOnly="readonly" onChange={this.handleOnChange}/></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_constitution_base" title="con-base"
                                 defaultValue={this.state.sheetClicked.ability_constitution_base} onChange={this.handleOnChange}/></span>                                
                              </div>                              
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="intelligence-i">INT</span>                                
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_intelligence_modifier" title="int-mod" 
                                defaultValue={this.state.sheetClicked.ability_intelligence_modifier} readOnly="readonly" onChange={this.handleOnChange}/></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_intelligence_base" title="int-base" 
                                defaultValue={this.state.sheetClicked.ability_intelligence_base} onChange={this.handleOnChange}/></span>                                
                              </div>                              
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="wisdom-i">WIS</span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_wisdom_modifier" title="wis-mod" 
                                defaultValue={this.state.sheetClicked.ability_wisdom_modifier} readOnly="readonly" onChange={this.handleOnChange}/></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_wisdom_base" title="wis-base" 
                                defaultValue={this.state.sheetClicked.ability_wisdom_base} onChange={this.handleOnChange}/></span>                                
                              </div>                             
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="charisma-i">CHA</span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_charisma_modifier" title="cha-mod" 
                                defaultValue={this.state.sheetClicked.ability_charisma_modifier } readOnly="readonly" onChange={this.handleOnChange}/></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="ability_charisma_base" title="cha-base" 
                                defaultValue={this.state.sheetClicked.ability_charisma_base} onChange={this.handleOnChange}/></span>                                
                              </div>
                            </td></tr>
                        </tbody></table>
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                      <table>
                        <tbody><tr>
                            <td rowSpan={3} style={{width: '50px'}}> &nbsp; &nbsp; &nbsp; &nbsp; </td>
                            <td>
                              <table>
                                <tbody><tr>
                                    <td className="sheet-statlabel-big" style={{width: '70px'}}><span data-i18n="hit-points-i">HP</span><br /><div style={{fontSize: '0.65em'}} data-i18n="hit-points">Hit Points</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="battle_hp_current" defaultValue={this.state.sheetClicked.battle_hp_current} onChange={this.handleOnChange} title="hitpoints" style={{height: '24px', width: '117px', textAlign: 'center'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="current-hit-points">Current HP</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="battle_hp_total"  defaultValue={this.state.sheetClicked.battle_hp_total} onChange={this.handleOnChange} title="hitpoints_max; use hitpoints|max in macros" style={{height: '24px', width: '117px', textAlign: 'center'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="max">Max</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="battle_hp_nonlethal"  defaultValue={this.state.sheetClicked.battle_hp_nonlethal} onChange={this.handleOnChange} title="nonlethaldamage" style={{height: '24px', width: '140px', textAlign: 'center'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="nonlethal-damage">Nonlethal Damage</div></td>
                                  </tr>
                                  <tr>
                                    <td className="sheet-statlabel-big" style={{width: '70px'}} data-i18n="initiative-u">INITIATIVE</td>
                                    <td colSpan={2}>
                                      <table>
                                        <tbody><tr>
                                            <td><input className="sheet-inputbox" type="text" name="battle_initiative_total" style={{height: '24px', width: '30px'}} title="init" defaultValue={this.state.sheetClicked.battle_initiative_total} disabled="true" /> =<br /><div style={{fontSize: '0.5em'}} data-i18n="total">Total</div></td>
                                            <td><input className="sheet-inputbox" type="text" name="ability_dexterity_modifier" title="initdexmod" defaultValue={this.state.sheetClicked.ability_dexterity_modifier} disabled="true" style={{height: '24px', width: '30px'}} /> +<br /><div style={{fontSize: '0.5em'}} data-i18n="dexterity-modifier">Dex Mod</div></td>
                                            <td><input className="sheet-inputbox" type="text" name="battle_initiative_others" title="initmiscmod" defaultValue={this.state.sheetClicked.battle_initiative_others} style={{height: '24px', width: '30px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="miscellaneous-modifier-a">Misc Mod</div></td>                                            
                                          </tr>
                                        </tbody></table>
                                    </td>
                                    <td>
                                      <table>
                                        <tbody><tr>
                                            <td className="sheet-statlabel-big" style={{width: '50px'}} data-i18n="speed-u">SPEED</td>
                                            <td><input className="sheet-inputbox" type="text" name="battle_speed" defaultValue={this.state.sheetClicked.battle_speed} onChange={this.handleOnChange} title="speed" style={{height: '24px', width: '85px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="speed">Speed</div></td>
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
                                    <td style={{width: '38px'}} className="sheet-statlabel"><span data-i18n="armor-class-i">AC</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="battle_ca_total" title="armorclass" 
                                    defaultValue={this.state.sheetClicked.battle_ca_total} onChange={this.handleOnChange} disabled="true" style={{height: '24px', width: '35px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="total">Total</div></td>
                                    <td>=10<br /><br /></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="ability_dexterity_modifier" title="armorclassdexmod (see Ability Bonus section in AC for how value is calculated)" 
                                    defaultValue={this.state.sheetClicked.ability_dexterity_modifier} onChange={this.handleOnChange} disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="ability-modifier-a">Ability Mod</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="battle_ca_equipment_armor" title="armorclassbonus (from AC items section below)" 
                                    defaultValue={this.state.sheetClicked.battle_ca_equipment_armor} onChange={this.handleOnChange} disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="armor-bonus-a">Armor Bns</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="information_size_modifier_ca_and_attack" title="armorclasssizemod" 
                                    defaultValue={this.state.sheetClicked.information_size_modifier_ca_and_attack} onChange={this.handleOnChange} disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="size-modifier-a">Size Mod</div></td>                                    
                                    <td>+<input className="sheet-inputbox" type="text" name="battle_ca_natural_armor" title="acnaturalarmor" 
                                    defaultValue={this.state.sheetClicked.battle_ca_natural_armor} onChange={this.handleOnChange} style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="natural-armor-a">Nat. Armor</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="battle_ca_deflection_modifier" title="acdeflectionmod" 
                                    defaultValue={this.state.sheetClicked.battle_ca_deflection_modifier} onChange={this.handleOnChange} style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="deflection">Deflection</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="battle_ca_other_modifier" title="acmiscmod" 
                                    defaultValue={this.state.sheetClicked.battle_ca_other_modifier} onChange={this.handleOnChange} style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="miscellaneous-modifier-a">Misc Mod</div></td>
                                    <td> &nbsp; &nbsp; &nbsp; </td>                                    
                                  </tr>
                                </tbody></table>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <table>
                                <tbody><tr>
                                    <td style={{width: '35px', height: '24px'}} className="sheet-statlabel"><span data-i18n="touch-u">TOUCH</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                                    <td valign="top"><input className="sheet-inputbox" type="text" style={{width: '35px'}} name="battle_ca_touch" title="touchac" defaultValue={this.state.sheetClicked.battle_ca_touch} onChange={this.handleOnChange} disabled="true" /> &nbsp; </td>
                                    <td style={{width: '70px'}} className="sheet-statlabel"><span data-i18n="flat-footed-u">FLAT-FOOTED</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                                    <td valign="top"><input className="sheet-inputbox" type="text" style={{width: '35px'}} name="battle_ca_flat_footed" title="flatac" defaultValue={this.state.sheetClicked.battle_ca_flat_footed} onChange={this.handleOnChange} disabled="true" /> &nbsp; </td>                                    
                                    <td valign="top"><input className="sheet-inputbox" type="text" name="battle_damage_reduction" title="damagereduction" style={{width: '120px'}} defaultValue={this.state.sheetClicked.battle_damage_reduction} onChange={this.handleOnChange}/><br /><div style={{fontSize: '0.65em'}} data-i18n="damage-reduction">Damage Reduction</div></td>
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
            <input type="checkbox" className="sheet-pc-saveblock-show sheet-arrow" title="saveblock-show" name="attr_saveblock-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="saves-combat-notes">Saves, Combat, Notes</span>
            <div className="sheet-pc-saveblock">
              <table>
                <tbody><tr>
                    <td style={{verticalAlign: 'top'}}>
                      <div className="sheet-table-data-center" style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr>
                              <td className="sheet-table-data-left">
                                {/*Saving Throws */}
                                <table cellPadding={0} cellSpacing={0}>
                                  <tbody><tr><td style={{textAlign: 'left'}}>                                        
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-header2" data-i18n="saving-throws-s">Saving<br />Throws</span>
                                          <span className="sheet-table-header2" data-i18n="total">Total</span>
                                          <span className="sheet-table-header2" data-i18n="base-save-s">Base<br />Save</span>
                                          <span className="sheet-table-header2" data-i18n="ability-modifier-s">Ability<br />Modifier</span>                                         
                                          <span className="sheet-table-header2" data-i18n="miscellaneous-modifier-s">Misc<br />Modifier</span>
                                          <span className="sheet-table-header2" data-i18n="temporary-modifier-s">Temp<br />Modifier</span>
                                        </div>
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-row-name" style={{width: '60px'}}><span data-i18n="fortitude">Fortitude</span><br /><div style={{fontSize: '0.65em'}}>(<span data-i18n="constitution">Constitution</span>)</div></span>
                                          <span className="sheet-table-data-center"><input type="text" style={{width: '35px'}} name="saving_throws_fortitude_total" title="saving_throws_fortitude_total" defaultValue={this.state.sheetClicked.saving_throws_fortitude_total} onChange={this.handleOnChange} disabled="true" /></span>
                                          <span className="sheet-table-data-center">=<input type="text" style={{width: '35px'}} name="saving_throws_fortitude_base" title="fortitudebase" defaultValue={this.state.sheetClicked.saving_throws_fortitude_base} onChange={this.handleOnChange} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="ability_constitution_modifier" title="fortitudeability" defaultValue={this.state.sheetClicked.ability_constitution_modifier} onChange={this.handleOnChange} disabled="true" /></span>                                          
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="saving_throws_fortitude_others" title="fortitudemiscmod" defaultValue={this.state.sheetClicked.saving_throws_fortitude_others} onChange={this.handleOnChange} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="saving_throws_fortitude_temporary" title="fortitudetempmod" defaultValue={this.state.sheetClicked.saving_throws_fortitude_temporary} onChange={this.handleOnChange} /></span>
                                        </div>                                        
                                        <div className="sheet-table-row" style={{fontSize: '1em'}}>
                                          <span className="sheet-table-row-name" style={{width: '60px'}}><span data-i18n="reflex">Reflex</span><br /><div style={{fontSize: '0.65em'}}>(<span data-i18n="dexterity">Dexterity</span>)</div></span>
                                          <span className="sheet-table-data-center"><input type="text" style={{width: '35px'}} name="saving_throws_reflex_tota" title="reflex" defaultValue={this.state.sheetClicked.saving_throws_reflex_tota} onChange={this.handleOnChange} disabled="true" /></span>
                                          <span className="sheet-table-data-center">=<input type="text" style={{width: '35px'}} name="saving_throws_reflex_base" title="reflexbase" defaultValue={this.state.sheetClicked.saving_throws_reflex_base} onChange={this.handleOnChange} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="ability_dexterity_modifier" title="reflexability" defaultValue={this.state.sheetClicked.ability_dexterity_modifier} onChange={this.handleOnChange} disabled="true" /></span>                                          
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="saving_throws_reflex_other" title="reflexmiscmod" defaultValue={this.state.sheetClicked.saving_throws_reflex_other} onChange={this.handleOnChange} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="saving_throws_reflex_temporary" title="reflextempmod" defaultValue={this.state.sheetClicked.saving_throws_reflex_temporary} onChange={this.handleOnChange} /></span>
                                        </div>                                        
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-row-name" style={{width: '60px'}}><span data-i18n="will">Will</span><br /><div style={{fontSize: '0.65em'}}>(<span data-i18n="wisdom">Wisdom</span>)</div></span>
                                          <span className="sheet-table-data-center"><input type="text" style={{width: '35px'}} name="saving_throws_will_total" title="will" defaultValue={this.state.sheetClicked.saving_throws_will_total} onChange={this.handleOnChange} disabled="true" /></span>
                                          <span className="sheet-table-data-center">=<input type="text" style={{width: '35px'}} name="saving_throws_will_base" title="willbase" defaultValue={this.state.sheetClicked.saving_throws_will_base} onChange={this.handleOnChange} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="ability_wisdom_modifier" title="willability" defaultValue={this.state.sheetClicked.ability_wisdom_modifier} onChange={this.handleOnChange} disabled="true" /></span>                                          
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="saving_throws_will_others" title="willmiscmod" defaultValue={this.state.sheetClicked.saving_throws_will_others} onChange={this.handleOnChange} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="saving_throws_will_temporary" title="willtempmod" defaultValue={this.state.sheetClicked.saving_throws_will_temporary} onChange={this.handleOnChange} /></span>
                                        </div>                                        
                                      </td></tr>
                                  </tbody></table>
                                <br />
                                <table>
                                  <tbody><tr>
                                      <td className="sheet-statlabel-big" style={{width: '80px'}}><div data-i18n="spell-resistance">Spell Resist</div></td>
                                      <td style={{textAlign: 'left'}}><input className="sheet-inputbox" type="text" name="battle_spell_resistance" defaultValue={this.state.sheetClicked.battle_spell_resistance} onChange={this.handleOnChange} title="spellresistance" style={{height: '24px', width: '50px'}} /></td>
                                      <td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                                      <td className="sheet-statlabel-big" style={{width: '110px'}}><div data-i18n="arcane-spell-failure">Arcane Spell Failure</div></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_arcanespellfailure" defaultValue={this.state.sheetClicked.magic_arcane_spell_failure} onChange={this.magic_arcane_spell_failure} title="arcanespellfailure" style={{height: '24px', width: '50px'}} /></td>
                                    </tr>
                                  </tbody></table>
                                <br />
                                <table>
                                  <tbody><tr>
                                      <td className="sheet-statlabel-big" style={{width: '80px'}}><span data-i18n="base-attack">Base Attack</span></td>
                                      <td>&nbsp;<input className="sheet-inputbox" type="text" name="battle_base_attack_bonus" title="bab"  style={{height: '24px', width: '50px'}} defaultValue={this.state.sheetClicked.battle_base_attack_bonus} onChange={this.handleOnChange}/></td>                                     
                                    </tr>
                                  </tbody></table>
                                {/*Grapple, Melee Attack, and Ranged Attack*/}
                                <table cellPadding={0} cellSpacing={0}>
                                  <tbody><tr><td style={{textAlign: 'left'}}>
                                        <input type="checkbox" className="sheet-pc-baseattackmacros-show sheet-arrow" title="baseattackmacros-show" name="attr_baseattackmacros-show" defaultValue={1} />{/*span style="text-align: left;"></span*/}
                                        <div className="sheet-table-row">
                                          <td className="sheet-statlabel-big" style={{width: '80px'}}><span data-i18n="base-attack">Grapple</span></td>
                                          <span className="sheet-table-data-center"><input className="sheet-inputbox" type="text" style={{width: '45px'}} name="battle_grapple_total" title="grapple" defaultValue={this.state.sheetClicked.battle_grapple_total} onChange={this.handleOnChange} disabled="true" /></span>                                          
                                        </div>                                        
                                        <div className="sheet-pc-baseattackmacros">
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_grapplenote" title="grapplenote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_grapplemacro" title="grapplemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name} }} {{attack1=Grapple check: [[ 1d20 + [[ @{grapple} ]] ]] }} {{notes=@{grapplenote} }}"} /></span>
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
                      <div className="sheet-table-data-center" style={{verticalAlign: 'top'}}>
                        <div style={{float: 'left'}}>
                          <div style={{display: 'table', width: '39%', float: 'left'}}>
                            <div className="sheet-table-row">
                              <span className="sheet-table-data-center"><span data-i18n="languages">Languages</span><br /><textarea rows={2} cols={55} style={{width: '380px'}} name="languages" title="languages" 
                              defaultValue={this.state.sheetClicked.information_languages} onChange={this.handleOnChange} /></span>
                            </div>
                            <div className="sheet-table-row">
                              <span className="sheet-table-data-center"><span data-i18n="racial-abilities">Aparencia</span><br /><textarea rows={4} cols={55} style={{width: '380px'}} name="annotations_appearance" title="racialabilities" 
                             defaultValue={this.state.sheetClicked.annotations_appearance} onChange={this.handleOnChange} /></span>
                            </div>
                            <div className="sheet-table-row">
                              <span className="sheet-table-data-center"><span data-i18n="class-abilities">Antecendentes</span><br /><textarea rows={4} cols={55} style={{width: '380px'}} name="annotations_background" title="classabilities" 
                              defaultValue={this.state.sheetClicked.annotations_background} onChange={this.handleOnChange} /></span>
                            </div>                            
                            <div className="sheet-table-row">
                              <span className="sheet-table-data-center"><span data-i18n="other">Other</span><br /><textarea rows={4} cols={55} style={{width: '380px'}} name="annotations_others" title="other" 
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
            <input type="checkbox" className="sheet-pc-skills-show sheet-arrow" title="skills-show" name="attr_skills-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="skills">Abilidades</span>
            <div className="sheet-pc-skills">
            <table cellPadding={0} cellSpacing={0}>
          <tbody><tr>
              <div className="sheet-table-row">
                <span className="sheet-table-data-center"><span data-i18n="feats">Skills</span><br />
                <textarea rows={4} cols={55} style={{width: '790px'}} name="bigStringSkills" title="feats" 
                defaultValue={this.state.sheetClicked.bigStringSkills} onChange={this.handleOnChange} /></span>
              </div>
              <br />
              <div className="sheet-table-row">
                <span className="sheet-table-data-center"><span data-i18n="other">Feats</span><br />
                <textarea rows={4} cols={55} style={{width: '790px'}} name="talents_feats" title="other" 
                defaultValue={this.state.sheetClicked.talents_feats} onChange={this.handleOnChange} /></span>
              </div>
            </tr>
            </tbody></table>
            </div>
            <br />
            <br />
        <input type="checkbox" className="sheet-pc-weapons-show sheet-arrow" title="weapons-show" name="attr_weapons-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="weapons">Magias</span>
            <div className="sheet-pc-weapons">
             
               <table cellPadding={0} cellSpacing={0}>
          <tbody><tr>
             
                <div className="sheet-table-row">
                   <br />
                  <div className="sheet-table-row">
                <span className="sheet-table-data-center"><span data-i18n="feats">Spells Save</span><br />
                <textarea rows={1} cols={55} style={{width: '100px'}} name="magic_spell_save" title="feats" 
                defaultValue={this.state.sheetClicked.magic_spell_save} onChange={this.handleOnChange} /></span>
              </div>                
                </div>
                <br />
              <div className="sheet-table-row">
                <span className="sheet-table-data-center"><span data-i18n="feats">Slots Magicos</span><br />
                <textarea rows={4} cols={55} style={{width: '790px'}} name="magic_slots" title="feats" 
                defaultValue={this.state.sheetClicked.magic_slots} onChange={this.handleOnChange} /></span>
              </div>
              <br />
              <div className="sheet-table-row">
                <span className="sheet-table-data-center"><span data-i18n="other">Magias</span><br />
                <textarea rows={4} cols={55} style={{width: '790px'}} name="magic_spells" title="other" 
                defaultValue={this.state.sheetClicked.magic_spells} onChange={this.handleOnChange} /></span>
              </div>
            </tr>
            </tbody></table>


            </div>
          </div>          
          <div className="sheet-tab-content sheet-tab4 sheet-tab99">
            {/*Ataques e Equipamentos*/}
            <input type="checkbox" className="sheet-pc-encumbrance-show sheet-arrow" name="attr_encumbrance-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="encumbrance/load">Ataques</span>
            <div className="sheet-pc-encumbrance">
            <table cellPadding={10} cellSpacing={0}>
            <tbody><tr>        
              <br />    
              <b><span data-i18n="other">Descricão dos Ataques</span></b><br />
                <textarea rows={4} cols={55} style={{float: 'left', width: '790px'}} name="bigStringAttacks" 
                defaultValue={this.state.sheetClicked.bigStringAttacks} onChange={this.handleOnChange} />
                <br />
            </tr></tbody>
            </table>
            </div>
            <br />   
            <input type="checkbox" className="sheet-pc-equipment-show sheet-arrow" name="attr_equipment-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="equipment">Equipamentos</span>
            <div className="sheet-pc-equipment">
            

                <table cellPadding={0} cellSpacing={0}>
                  <br />
                  <tbody><tr>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="light-load"> Peso Atual </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="medium-load"> Peso Leve </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="heavy-load"> Peso Medio </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="lift-over-head-a"> Peso Alto </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="lift-off-ground"> Peso Maximo </td>
                      
                    </tr>
                    <tr>
                      
                      <td><input className="sheet-inputbox" type="text" name="inventory_weight_current" style={{height: '24px', width: '140px', textAlign: 'right'}}   
                      defaultValue={this.state.sheetClicked.inventory_weight_current} onChange={this.handleOnChange} /></td>  
                      <td><input className="sheet-inputbox" type="text" name="inventory_weight_light"  style={{height: '24px', width: '140px', textAlign: 'right'}}   
                      defaultValue={this.state.sheetClicked.inventory_weight_light} onChange={this.handleOnChange} /></td>  
                      <td><input className="sheet-inputbox" type="text" name="inventory_weight_medium"  style={{height: '24px', width: '140px', textAlign: 'right'}} 
                      defaultValue={this.state.sheetClicked.inventory_weight_medium} onChange={this.handleOnChange} /></td>  
                      <td><input className="sheet-inputbox" type="text" name="inventory_weight_heavy"  style={{height: '24px', width: '140px', textAlign: 'right'}} 
                      defaultValue={this.state.sheetClicked.inventory_weight_heavy} onChange={this.handleOnChange} /></td>  
                      <td><input className="sheet-inputbox" type="text" name="inventory_weight_maximum"  style={{height: '24px', width: '140px', textAlign: 'right'}} 
                      defaultValue={this.state.sheetClicked.inventory_weight_maximum} onChange={this.handleOnChange} /></td>                   
                    </tr>
                  </tbody></table>


                <table cellPadding={10} cellSpacing={0}>
                  <tbody><tr>                     
                    </tr>
                  </tbody></table>             
                <b><span data-i18n="money">Dinheiro</span></b>
                <div className="sheet-table-row">
                  <span className="sheet-table-data-center">
                    <input type="text" name="inventory_money" style={{width: '400px'}} 
                    defaultValue={this.state.sheetClicked.inventory_money} onChange={this.handleOnChange} /><br /><span data-i18n="copper-pieces-iu"></span></span>                
                </div>
                <br />
                <table>
                  <tbody><tr>
                    <b><span data-i18n="other">Armadura</span></b><br />
                    <textarea rows={2} cols={55} style={{float: 'left', width: '790px'}} name="bigStringInventoryArmor" 
                    defaultValue={this.state.sheetClicked.bigStringInventoryArmor} onChange={this.handleOnChange} />
                    <br />
                    <b><span data-i18n="other">Escudo</span></b><br />
                    <textarea rows={2} cols={55} style={{float: 'left', width: '790px'}} name="bigStringInventoryShield"
                    defaultValue={this.state.sheetClicked.bigStringInventoryShield} onChange={this.handleOnChange} />
                    </tr>
                  </tbody></table>
                <br />
                 <table>
                  <tbody><tr>
                <b><span data-i18n="other">Outras posses</span></b><br />
                <textarea rows={4} cols={55} style={{float: 'left', width: '790px'}} name="bigStringInventoryOthers" 
                defaultValue={this.state.sheetClicked.bigStringInventoryOthers} onChange={this.handleOnChange} />
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
