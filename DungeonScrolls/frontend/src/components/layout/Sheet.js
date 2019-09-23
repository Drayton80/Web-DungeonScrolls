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
        <input type="hidden" name="attr_currentsheetversion" title="currentsheetversion" defaultValue="7.8" />
        <input type="radio" className="sheet-switch-pc-show sheet-switch" title="npc-show" name="attr_npc-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="pc">PC </span><span> &nbsp; &nbsp; &nbsp; &nbsp;</span>
        <input type="radio" className="sheet-switch-npc-show sheet-switch" title="npc-show" name="attr_npc-show" defaultValue={2} /><span style={{textAlign: 'left'}} data-i18n="npc">{this.state.sheetClicked.id}</span>
        <div className="sheet-switch-pc">
          {/* start PC section */}
          {/* Header / Character Description */}
          <input type="checkbox" className="sheet-pc-charrpinfo-show sheet-arrow" title="charrpinfo-show" name="attr_charrpinfo-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="header">Header</span>
          <div className="sheet-pc-charrpinfo">
            <div style={{float: 'left'}}>
              <table border={0}>
                <tbody>
                  <tr><td rowSpan={4}> &nbsp; &nbsp; &nbsp; &nbsp; </td></tr>
                  <tr>
                    <td colSpan={6}>
                      <table>
                        <tbody><tr>
                            <td><div style={{float: 'left'}}>
                              <input type="text" name="information_name" title="character_name" 
                              style={{width: '125px', textAlign: 'right'}} defaultValue={this.state.sheetClicked.information_name} 
                              onChange={this.handleOnChange}/>                              
                              <br /><span data-i18n="character-name">Character Name</span></div></td>                            
                          </tr>
                          <tr>
                            <td><div style={{float: 'left'}}>
                              <input type="text" name="information_experience" title="expcurrent"
                               style={{width: '145px', textAlign: 'right'}} defaultValue={this.state.sheetClicked.information_experience} 
                              />/<input type="text" name="attr_expgoal" title="expgoal" style={{width: '150px'}} value={this.state.sheetClicked.information_level * 1000} />
                              <br /><span data-i18n="experience-points">Experience Points</span></div></td>
                            <td><div style={{float: 'left'}}><input type="text" name="attr_homeland" title="homeland" style={{width: '160px'}}   value={this.state.sheetClicked.name}/><br /><span data-i18n="homeland">Homeland</span></div> </td>
                          </tr>
                        </tbody></table>
                    </td>
                    <td colSpan={2}><div style={{float: 'left'}}><img src="http://i.imgur.com/A746uyc.png?1" style={{float: 'left', width: '200px'}} /> &nbsp; 3.5</div></td>
                  </tr>
                  <tr>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_race" title="race" style={{width: '130px'}} defaultValue={this.state.sheetClicked.information_race}/> 
                      <br /><span data-i18n="race">Race</span></div></td>                    
                    <td><div style={{float: 'left'}}><select style={{width: '90px'}} name="attr_size" title="size">
                          <option value={-8} data-i18n="colossal">Colossal</option>
                          <option value={-4} data-i18n="gargantuan">Gargantuan</option>
                          <option value={-2} data-i18n="huge">Huge</option>
                          <option value={-1} data-i18n="large">Large</option>
                          <option value={0} data-i18n="medium" selected>Medium</option>
                          <option value={1} data-i18n="small">Small</option>
                          <option value={2} data-i18n="tiny">Tiny</option>
                          <option value={4} data-i18n="diminutive">Diminutive</option>
                          <option value={8} data-i18n="fine">Fine</option>
                        </select><br /><span data-i18n="size">Size</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_gender" title="gender" style={{width: '70px'}} 
                      defaultValue={this.state.sheetClicked.information_gender}/>
                       <br /><span data-i18n="gender">Gender</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_alignment" title="alignment" style={{width: '70px'}} 
                      defaultValue={this.state.sheetClicked.information_alignment}/>
                      <br /><span data-i18n="alignment">Alignment</span></div></td>
                    <td colSpan={2}><div style={{float: 'left'}}>
                      <input type="text" name="information_deity" title="deity" style={{width: '220px'}} 
                      defaultValue={this.state.sheetClicked.information_deity}/>
                       <br /><span data-i18n="deity">Deity</span></div></td>
                  </tr>
                  <tr>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="attr_class" title="class" style={{width: '130px'}} />
                       <br /><span data-i18n="class">Class</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_level" title="level" style={{width: '85px'}} 
                      defaultValue={this.state.sheetClicked.information_level}/>
                       <br /><span data-i18n="level">Level</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="attr_hitdie" title="hitdie" style={{width: '43px'}} />
                       <br /><span data-i18n="hit-dice-i">HD</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="information_age" title="age" style={{width: '90px'}} 
                      defaultValue={this.state.sheetClicked.information_age}/>
                       <br /><span data-i18n="age">Age</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="attr_height" title="height" style={{width: '70px'}} />
                       <br /><span data-i18n="height">Height</span></div> </td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="attr_weight" title="weight" style={{width: '70px'}} />
                       <br /><span data-i18n="weight">Weight</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="attr_eyes" title="eyes" style={{width: '95px'}} />
                       <br /><span data-i18n="eyes">Eyes</span></div></td>
                    <td><div style={{float: 'left'}}>
                      <input type="text" name="attr_hair" title="hair" style={{width: '120px'}} />
                       <br /><span data-i18n="hair">Hair</span></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
          </div>
          <br />
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab1" defaultValue={1} title="Stats" defaultChecked="checked" />
          <span className="sheet-tab sheet-tab1" data-i18n="stats">Stats</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab2" defaultValue={2} title="Weapons" />
          <span className="sheet-tab sheet-tab2" data-i18n="weapons">Weapons</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab3" defaultValue={3} title="AC" />
          <span className="sheet-tab sheet-tab3" data-i18n="armor-class-i">AC</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab4" defaultValue={4} title="Equipment" />
          <span className="sheet-tab sheet-tab4" data-i18n="equipment">Equipment</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab5" defaultValue={5} title="Skills" />
          <span className="sheet-tab sheet-tab5" data-i18n="skills">Skills</span>
          <input type="radio" name="attr_tab" className="sheet-tab sheet-tab6" defaultValue={6} title="Spells" />
          <span className="sheet-tab sheet-tab6" data-i18n="spells">Spells</span>                
          {/*input type="radio" name="attr_tab" class="sheet-tab sheet-tab9" value="9" title="Other" />
		<span class="sheet-tab sheet-tab9" data-i18n="other">Other</span*/}
          {/*input type="radio" name="attr_tab" class="sheet-tab sheet-tab10" value="10" title="Notes" />
		<span class="sheet-tab sheet-tab10" data-i18n="notes">Notes</span*/}          
          <br />&nbsp;
          <div className="sheet-tab-content sheet-tab1 sheet-tab99">
            {/*Stats*/}
            <input type="checkbox" className="sheet-pc-statblock-show sheet-arrow" title="statblock-show" name="attr_statblock-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="abilities">Abilities</span>
            <div className="sheet-pc-statblock">
              {/* Stat block */}
              <table cellPadding={0} cellSpacing={0}>
                <tbody><tr>
                    <td style={{textAlign: 'left'}}>
                      <table cellPadding={0} cellSpacing={0}>
                        <tbody><tr><td style={{textAlign: 'left'}}>
                              <span className="sheet-table-name" style={{width: '315px'}} data-i18n="ability-scores">Ability Scores</span>
                              <input type="checkbox" className="sheet-pc-abilitymacros-show sheet-arrow" title="abilitymacros-show" name="attr_abilitymacros-show" defaultValue={1} />
                              <div className="sheet-table-row">
                                <span className="sheet-table-header" data-i18n="ability">Ability</span>
                                <span className="sheet-table-header" data-i18n="total">Total</span>
                                <span className="sheet-table-header" data-i18n="modifier">Mod</span>
                                <span className="sheet-table-header" data-i18n="base">Base</span>
                                <span className="sheet-table-header" data-i18n="miscellaneous">Misc</span>
                                <span className="sheet-table-header" data-i18n="temporary">Temp</span>
                              </div>
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="strength-i">STR</span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_str" defaultValue={0} title="str" readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_str-mod" defaultValue={0} title="str-mod" readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_str-base" defaultValue={10} title="str-base" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_str-misc" defaultValue={0} title="str-misc" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_str-temp" defaultValue={0} title="str-temp" /></span>
                                <span className="sheet-table-data-center"><button type="roll" name="roll_strcheck" title="strcheck" value="@{str-macro}" /></span>
                              </div>
                              <div className="sheet-pc-abilitymacros" colSpan={7}>
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_strnote" title="strnote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_str-macro" title="str-macro (modify to modify roll macro)" defaultValue={"&{template:DnD35StdRoll} {{abilityflag=true}} {{name=@{character_name} }} {{check=Strength check:}} {{checkroll= [[ 1d20 + @{str-mod} ]] }} {{notes=@{strnote} }}"} /></span>
                              </div>
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="dexterity-i">DEX</span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_dex" title="dex" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_dex-mod" title="dex-mod" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_dex-base" title="dex-base" defaultValue={10} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_dex-misc" title="dex-misc" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_dex-temp" title="dex-temp" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><button type="roll" name="roll_dexcheck" title="dexcheck" value="@{dex-macro}" /></span>
                              </div>
                              <div className="sheet-pc-abilitymacros">
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_dexnote" title="dexnote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_dex-macro" title="dex-macro (modify to modify roll macro)" defaultValue={"&{template:DnD35StdRoll} {{abilityflag=true}} {{name=@{character_name} }} {{check=Dexterity check:}} {{checkroll= [[ 1d20 + @{dex-mod} ]] }} {{notes=@{dexnote} }}"} /></span>
                              </div>
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="constitution-i">CON</span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_con" title="con" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_con-mod" title="con-mod" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_con-base" title="con-base" defaultValue={10} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_con-misc" title="con-misc" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_con-temp" title="con-temp" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><button type="roll" name="roll_concheck" title="concheck" value="@{con-macro}" /></span>
                              </div>
                              <div className="sheet-pc-abilitymacros">
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_connote" title="connote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_con-macro" title="con-macro (modify to modify roll macro)" defaultValue={"&{template:DnD35StdRoll} {{abilityflag=true}} {{name=@{character_name} }} {{check=Constitution check:}} {{checkroll= [[ 1d20 + @{con-mod} ]] }} {{notes=@{connote} }}"} /></span>
                              </div>
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="intelligence-i">INT</span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_int" title="int" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_int-mod" title="int-mod" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_int-base" title="int-base" defaultValue={10} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_int-misc" title="int-misc" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_int-temp" title="int-temp" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><button type="roll" name="roll_intcheck" title="intcheck" value="@{int-macro}" /></span>
                              </div>
                              <div className="sheet-pc-abilitymacros">
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_intnote" title="intnote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_int-macro" title="int-macro (modify to modify roll macro)" defaultValue={"&{template:DnD35StdRoll} {{abilityflag=true}} {{name=@{character_name} }} {{check=Intelligence check:}} {{checkroll= [[ 1d20 + @{int-mod} ]] }} {{notes=@{intnote} }}"} /></span>
                              </div>
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="wisdom-i">WIS</span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_wis" title="wis" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_wis-mod" title="wis-mod" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_wis-base" title="wis-base" defaultValue={10} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_wis-misc" title="wis-misc" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_wis-temp" title="wis-temp" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><button type="roll" name="roll_wischeck" title="wischeck" value="@{wis-macro}" /></span>
                              </div>
                              <div className="sheet-pc-abilitymacros">
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_wisnote" title="wisnote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_wis-macro" title="wis-macro (modify to modify roll macro)" defaultValue={"&{template:DnD35StdRoll} {{abilityflag=true}} {{name=@{character_name} }} {{check=Wisdom check:}} {{checkroll= [[ 1d20 + @{wis-mod} ]] }} {{notes=@{wisnote} }}"} /></span>
                              </div>
                              <div className="sheet-table-row">
                                <span className="sheet-table-row-name" style={{width: '60px'}} data-i18n="charisma-i">CHA</span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_cha" title="cha" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_cha-mod" title="cha-mod" defaultValue={0} readOnly="readonly" /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_cha-base" title="cha-base" defaultValue={10} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_cha-misc" title="cha-misc" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><input type="text" style={{width: '45px'}} name="attr_cha-temp" title="cha-temp" defaultValue={0} /></span>
                                <span className="sheet-table-data-center"><button type="roll" name="roll_chacheck" title="chacheck" value="@{cha-macro}" /></span>
                              </div>
                              <div className="sheet-pc-abilitymacros">
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_chanote" title="chanote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '140px', height: '20px'}} name="attr_cha-macro" title="cha-macro (modify to modify roll macro)" defaultValue={"&{template:DnD35StdRoll} {{abilityflag=true}} {{name=@{character_name} }} {{check=Charisma check:}} {{checkroll= [[ 1d20 + @{cha-mod} ]] }} {{notes=@{chanote} }}"} /></span>
                              </div>
                              <input type="checkbox" className="sheet-pc-abilitymacros-show sheet-arrow" title="abilitymacros-show" name="attr_abilitymacros-show" defaultValue={1} /><span style={{textAlign: 'left'}} data-i18n="show-ability-macros">Show Ability Macros</span>
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
                                    <td><input className="sheet-inputbox" type="text" name="attr_hitpoints" title="hitpoints" style={{height: '24px', width: '117px', textAlign: 'center'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="current-hit-points">Current HP</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_hitpoints_max" title="hitpoints_max; use hitpoints|max in macros" style={{height: '24px', width: '117px', textAlign: 'center'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="max">Max</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_nonlethaldamage" title="nonlethaldamage" style={{height: '24px', width: '140px', textAlign: 'center'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="nonlethal-damage">Nonlethal Damage</div></td>
                                  </tr>
                                  <tr>
                                    <td className="sheet-statlabel-big" style={{width: '70px'}} data-i18n="initiative-u">INITIATIVE</td>
                                    <td colSpan={2}>
                                      <table>
                                        <tbody><tr>
                                            <td><input className="sheet-inputbox" type="text" name="attr_init" style={{height: '24px', width: '30px'}} title="init" defaultValue="(@{initdexmod}+@{initmiscmod})" disabled="true" /> =<br /><div style={{fontSize: '0.5em'}} data-i18n="total">Total</div></td>
                                            <td><input className="sheet-inputbox" type="text" name="attr_initdexmod" title="initdexmod" defaultValue="floor(@{dex}/2-5)" disabled="true" style={{height: '24px', width: '30px'}} /> +<br /><div style={{fontSize: '0.5em'}} data-i18n="dexterity-modifier">Dex Mod</div></td>
                                            <td><input className="sheet-inputbox" type="text" name="attr_initmiscmod" title="initmiscmod" defaultValue={0} style={{height: '24px', width: '30px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="miscellaneous-modifier-a">Misc Mod</div></td>
                                            <td><textarea rows={1} cols={40} style={{width: '40px', height: '20px'}} title="initmacro (modify to modify initiative roll macro)" name="attr_initmacro" defaultValue={"&{template:DnD35Initiative} {{name=@{selected|character_name} }} {{check=Initiative:}} {{checkroll= [[ 1d20 + [[ @{selected|init} ]] + ( [[ (@{selected|init}) ]] /100) &{tracker} ]] }}"} /></td>
                                            <td><button className="tokenaction" type="roll" name="roll_initiative" title="initiative" value="@{initmacro}" /> &nbsp; &nbsp;<br /><div style={{fontSize: '0.5em'}}> &nbsp; </div></td>
                                          </tr>
                                        </tbody></table>
                                    </td>
                                    <td>
                                      <table>
                                        <tbody><tr>
                                            <td className="sheet-statlabel-big" style={{width: '50px'}} data-i18n="speed-u">SPEED</td>
                                            <td><input className="sheet-inputbox" type="text" name="attr_speed" title="speed" style={{height: '24px', width: '85px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="speed">Speed</div></td>
                                          </tr>
                                        </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                              <table>
                                <tbody><tr style={{height: '40px'}}>
                                    <td className="sheet-statlabel" style={{width: '70px'}} data-i18n="alternate-movement">Alternate Movement</td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_fly-speed" title="fly-speed" style={{height: '24px', width: '40px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="fly">Fly</div></td>
                                    <td align="bottom"><div style={{fontSize: '0.5em', padding: '0px', margin: '0px'}}>
                                        <select className="sheet-inputbox" style={{width: '90px'}} name="attr_fly-maneuver" title="fly-maneuver">
                                          <option value="Perfect" data-i18n="perfect">Perfect</option>
                                          <option value="Good" data-i18n="good">Good</option>
                                          <option value="Average" data-i18n="average">Average</option>
                                          <option value="Poor" data-i18n="poor">Poor</option>
                                          <option value="Clumsy" data-i18n="clumsy">Clumsy</option>
                                          <option value="None" data-i18n="none" selected>None</option>
                                        </select><br /><span data-i18n="maneuverability">Maneuverability</span></div></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_glide-speed" title="glide-speed" style={{height: '24px', width: '40px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="glide">Glide</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_climb-speed" title="climb-speed" style={{height: '24px', width: '40px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="climb">Climb</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_burrow-speed" title="burrow-speed" style={{height: '24px', width: '40px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="burrow">Burrow</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_swim-speed" title="swim-speed" style={{height: '24px', width: '40px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="swim">Swim</div></td>
                                    <td colSpan={3}> &nbsp; </td>
                                  </tr>
                                </tbody></table>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <table>
                                <tbody><tr>
                                    <td style={{width: '38px'}} className="sheet-statlabel"><span data-i18n="armor-class-i">AC</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_armorclass" title="armorclass" defaultValue="(10+@{armorclassbonus}+@{totalabilityacbonus}+@{armorclasssizemod}+@{acdodgemod}+@{acnaturalarmor}+@{acdeflectionmod}+@{acmiscmod})" disabled="true" style={{height: '24px', width: '35px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="total">Total</div></td>
                                    <td>=10<br /><br /></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="attr_armorclassdexmod" title="armorclassdexmod (see Ability Bonus section in AC for how value is calculated)" defaultValue="@{totalabilityacbonus}" disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="ability-modifier-a">Ability Mod</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="attr_armorclassbonus" title="armorclassbonus (from AC items section below)" defaultValue="(@{totalarmorbonus})" disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="armor-bonus-a">Armor Bns</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="attr_armorclasssizemod" title="armorclasssizemod" defaultValue="@{size}" disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="size-modifier-a">Size Mod</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="attr_acdodgemod" title="acdodgemod" defaultValue="@{totaldodgebonus}" style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="dodge">Dodge</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="attr_acnaturalarmor" title="acnaturalarmor" defaultValue="@{totalnaturalarmorbonus}" style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="natural-armor-a">Nat. Armor</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="attr_acdeflectionmod" title="acdeflectionmod" defaultValue="@{totaldeflectionbonus}" style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="deflection">Deflection</div></td>
                                    <td>+<input className="sheet-inputbox" type="text" name="attr_acmiscmod" title="acmiscmod" defaultValue="@{totalmiscacbonus}" style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="miscellaneous-modifier-a">Misc Mod</div></td>
                                    <td> &nbsp; &nbsp; &nbsp; </td>
                                    <td valign="top"><input type="hidden" name="attr_armorpenalty" title="armorpenalty (max of armor check penalty and encumbrance check penalty)" defaultValue="(@{armorworn}*@{acitemcheckpenalty}+@{shieldworn}*@{shieldcheckpenalty})" disabled="true" />
                                      <input className="sheet-inputbox" type="text" style={{width: '35px'}} name="attr_armorcheckpenalty" title="armorcheckpenalty" defaultValue=" (ceil((@{armorpenalty}-@{encumbracp})/10000000000)*@{encumbracp} - floor((@{armorpenalty}-@{encumbracp}-1)/10000000000)*@{armorpenalty})" disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="armor-check-penalty-i">AC Pen</div></td>
                                  </tr>
                                </tbody></table>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <table>
                                <tbody><tr>
                                    <td style={{width: '35px', height: '24px'}} className="sheet-statlabel"><span data-i18n="touch-u">TOUCH</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                                    <td valign="top"><input className="sheet-inputbox" type="text" style={{width: '35px'}} name="attr_touchac" title="touchac" defaultValue="(10+ @{totalabilitytouchacbonus} +@{armorclasssizemod} +@{acdodgemod} +@{acdeflectionmod} +@{totalmisctouchacbonus})" disabled="true" /> &nbsp; </td>
                                    <td style={{width: '70px'}} className="sheet-statlabel"><span data-i18n="flat-footed-u">FLAT-FOOTED</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                                    <td valign="top"><input className="sheet-inputbox" type="text" style={{width: '35px'}} name="attr_flatac" title="flatac" defaultValue="10 +@{totalabilityffacbonus} +@{armorclassbonus} +@{armorclasssizemod} +@{acnaturalarmor} +@{acdeflectionmod} +@{totalmiscffacbonus}" disabled="true" /> &nbsp; </td>
                                    <td style={{width: '60px'}} className="sheet-statlabel"><span data-i18n="immobile">Immobile</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                                    <td valign="top"><input className="sheet-inputbox" type="text" style={{width: '35px'}} name="attr_immoblac" title="immoblac" defaultValue="10 +@{totalabilityimmoblacbonus} +@{armorclassbonus} +@{armorclasssizemod} +@{acnaturalarmor} +@{acdeflectionmod} +@{totalmiscimmoblacbonus}" disabled="true" /> &nbsp; </td>
                                    <td valign="top"><input className="sheet-inputbox" type="text" name="attr_damagereduction" title="damagereduction" style={{width: '120px'}} /><br /><div style={{fontSize: '0.65em'}} data-i18n="damage-reduction">Damage Reduction</div></td>
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
                                        <input type="checkbox" className="sheet-pc-savemacros-show sheet-arrow" title="savemacros-show" name="attr_savemacros-show" defaultValue={1} />{/*span style="text-align: left;"></span*/}
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-header2" data-i18n="saving-throws-s">Saving<br />Throws</span>
                                          <span className="sheet-table-header2" data-i18n="total">Total</span>
                                          <span className="sheet-table-header2" data-i18n="base-save-s">Base<br />Save</span>
                                          <span className="sheet-table-header2" data-i18n="ability-modifier-s">Ability<br />Modifier</span>
                                          <span className="sheet-table-header2" data-i18n="epic-save-bonus-s">Epic Save<br />Bonus</span>
                                          <span className="sheet-table-header2" data-i18n="magic-modifier">Magic<br />Modifier</span>
                                          <span className="sheet-table-header2" data-i18n="miscellaneous-modifier-s">Misc<br />Modifier</span>
                                          <span className="sheet-table-header2" data-i18n="temporary-modifier-s">Temp<br />Modifier</span>
                                        </div>
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-row-name" style={{width: '60px'}}><span data-i18n="fortitude">Fortitude</span><br /><div style={{fontSize: '0.65em'}}>(<span data-i18n="constitution">Constitution</span>)</div></span>
                                          <span className="sheet-table-data-center"><input type="text" style={{width: '35px'}} name="attr_fortitude" title="fortitude" defaultValue="(@{fortitudebase} +@{fortitudeability} +@{fortitudeepicsavemod} +@{fortitudemagicmod} +@{fortitudemiscmod} +@{fortitudetempmod} )" disabled="true" /></span>
                                          <span className="sheet-table-data-center">=<input type="text" style={{width: '35px'}} name="attr_fortitudebase" title="fortitudebase" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_fortitudeability" title="fortitudeability" defaultValue="floor(@{con}/2-5) " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_fortitudeepicsavemod" title="fortitudeepicsavemod (Epic Level Save Bonus)" defaultValue="@{epicsavebonus}" disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_fortitudemagicmod" title="fortitudemagicmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_fortitudemiscmod" title="fortitudemiscmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_fortitudetempmod" title="fortitudetempmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center"><button type="roll" style={{width: '20px'}} name="roll_fortitudecheck" title="fortitudecheck" value="@{fortitudemacro}" /></span>
                                        </div>
                                        <div className="sheet-pc-savemacros">
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_fortitudenote" title="fortitudenote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_fortitudemacro" title="fortitudemacro" defaultValue={"&{template:DnD35StdRoll} {{saveflag=true}} {{name=@{character_name} }} {{subtags=braces against the attack}} {{check=Fortitude check:}} {{checkroll= [[ 1d20 + [[ @{fortitude} ]] ]] }} {{notes=@{fortitudenote} }}"} /></span>
                                        </div>
                                        <div className="sheet-table-row" style={{fontSize: '1em'}}>
                                          <span className="sheet-table-row-name" style={{width: '60px'}}><span data-i18n="reflex">Reflex</span><br /><div style={{fontSize: '0.65em'}}>(<span data-i18n="dexterity">Dexterity</span>)</div></span>
                                          <span className="sheet-table-data-center"><input type="text" style={{width: '35px'}} name="attr_reflex" title="reflex" defaultValue="(@{reflexbase} +@{reflexability} +@{reflexepicsavemod} +@{reflexmagicmod} +@{reflexmiscmod} +@{reflextempmod} )" disabled="true" /></span>
                                          <span className="sheet-table-data-center">=<input type="text" style={{width: '35px'}} name="attr_reflexbase" title="reflexbase" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_reflexability" title="reflexability" defaultValue="floor(@{dex}/2-5) " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_reflexepicsavemod" title="reflexepicsavemod (Epic Level Save Bonus)" defaultValue="@{epicsavebonus}" disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_reflexmagicmod" title="reflexmagicmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_reflexmiscmod" title="reflexmiscmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_reflextempmod" title="reflextempmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center"><button type="roll" style={{width: '20px'}} name="roll_reflexcheck" title="reflexcheck" value="@{reflexmacro}" /></span>
                                        </div>
                                        <div className="sheet-pc-savemacros">
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_reflexnote" title="reflexnote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_reflexmacro" title="reflexmacro" defaultValue={"&{template:DnD35StdRoll} {{saveflag=true}} {{name=@{character_name} }} {{subtags=tries to dodge}} {{check=Reflex check:}} {{checkroll= [[ 1d20 + [[ @{reflex} ]] ]] }} {{notes=@{reflexnote} }}"} /></span>
                                        </div>
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-row-name" style={{width: '60px'}}><span data-i18n="will">Will</span><br /><div style={{fontSize: '0.65em'}}>(<span data-i18n="wisdom">Wisdom</span>)</div></span>
                                          <span className="sheet-table-data-center"><input type="text" style={{width: '35px'}} name="attr_will" title="will" defaultValue="(@{willbase} +@{willability} +@{willepicsavemod} +@{willmagicmod} +@{willmiscmod} +@{willtempmod} )" disabled="true" /></span>
                                          <span className="sheet-table-data-center">=<input type="text" style={{width: '35px'}} name="attr_willbase" title="willbase" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_willability" title="willability" defaultValue="floor(@{wis}/2-5) " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_willepicsavemod" title="willepicsavemod (Epic Level Save Bonus)" defaultValue="@{epicsavebonus}" disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_willmagicmod" title="willmagicmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_willmiscmod" title="willmiscmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input type="text" style={{width: '35px'}} name="attr_willtempmod" title="willtempmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center"><button type="roll" style={{width: '20px'}} name="roll_willcheck" title="willcheck" value="@{willmacro}" /></span>
                                        </div>
                                        <div className="sheet-pc-savemacros">
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_willnote" title="willnote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_willmacro" title="willmacro" defaultValue={"&{template:DnD35StdRoll} {{saveflag=true}} {{name=@{character_name} }} {{subtags=tries to resist}} {{check=Will check:}} {{checkroll= [[ 1d20 + [[ @{will} ]] ]] }} {{notes=@{willnote} }}"} /></span>
                                        </div>
                                        <input type="checkbox" className="sheet-pc-savemacros-show sheet-arrow" title="savemacros-show" name="attr_savemacros-show" defaultValue={1} /><span style={{textAlign: 'left'}} data-i18n="show-save-macros">Show Save Macros</span>
                                      </td></tr>
                                  </tbody></table>
                                <br />
                                <table>
                                  <tbody><tr>
                                      <td className="sheet-statlabel-big" style={{width: '80px'}}><div data-i18n="spell-resistance">Spell Resist</div></td>
                                      <td style={{textAlign: 'left'}}><input className="sheet-inputbox" type="text" name="attr_spellresistance" title="spellresistance" style={{height: '24px', width: '50px'}} /></td>
                                      <td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                                      <td className="sheet-statlabel-big" style={{width: '110px'}}><div data-i18n="arcane-spell-failure">Arcane Spell Failure</div></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_arcanespellfailure" title="arcanespellfailure" style={{height: '24px', width: '50px'}} /></td>
                                    </tr>
                                  </tbody></table>
                                <br />
                                <table>
                                  <tbody><tr>
                                      <td className="sheet-statlabel-big" style={{width: '80px'}}><span data-i18n="base-attack">Base Attack</span></td>
                                      <td>&nbsp;<input className="sheet-inputbox" type="text" name="attr_bab" title="bab" defaultValue={0} style={{height: '24px', width: '50px'}} /></td>
                                      <td>/<input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_bab2" title="bab2" defaultValue="(((@{bab} -5)+abs(@{bab} -5))/2)" disabled="true" /></td>
                                      <td>/<input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_bab3" title="bab3" defaultValue="(((@{bab} -10)+abs(@{bab} -10))/2)" disabled="true" /></td>
                                      <td>/<input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_bab4" title="bab4" defaultValue="(((@{bab} -15)+abs(@{bab} -15))/2)" disabled="true" /></td>
                                    </tr>
                                  </tbody></table>
                                {/*Grapple, Melee Attack, and Ranged Attack*/}
                                <table cellPadding={0} cellSpacing={0}>
                                  <tbody><tr><td style={{textAlign: 'left'}}>
                                        <input type="checkbox" className="sheet-pc-baseattackmacros-show sheet-arrow" title="baseattackmacros-show" name="attr_baseattackmacros-show" defaultValue={1} />{/*span style="text-align: left;"></span*/}
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-row-name" style={{width: '80px'}} data-i18n="grapple">Grapple</span>
                                          <span className="sheet-table-data-center"><input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_grapple" title="grapple" defaultValue="(@{bab} +@{epicattackbonus} +@{grapplestrmod}+@{specialattacksizemod}+@{grapplemiscmod})" disabled="true" /></span>
                                          <span className="sheet-table-data-center">=<input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_grapplebab" title="grapplebab (Base Attack Bonus + Epic Attack Bonus)" disabled="true" defaultValue="@{bab} +@{epicattackbonus} " /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_grapplestrmod" title="grapplestrmod" defaultValue="floor(@{str}/2-5) " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_specialattacksizemod" title="specialattacksizemod" defaultValue="(floor((@{size} + 50) / 58) + floor((@{size} + 50) / 54) + floor((@{size} + 50) / 52) + floor((@{size} + 50) / 51) + floor((@{size} + 50) / 50) + floor((@{size} + 50) / 49) + floor((@{size} + 50) / 47) + floor((@{size} + 50) / 43) -4) * (-4) " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_grapplemiscmod" title="grapplemiscmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center"><button type="roll" name="roll_Grapplecheck" title="Grapplecheck" value="@{grapplemacro}" /></span>
                                        </div>
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-header2"> &nbsp; </span>
                                          <span className="sheet-table-header2" data-i18n="total">Total</span>
                                          <span className="sheet-table-header2" data-i18n="base-attack-bonus-epic-attack-bonus-i">BAB+ EAB</span>
                                          <span className="sheet-table-header2" data-i18n="strength-modifier-a">Str Mod</span>
                                          <span className="sheet-table-header2" data-i18n="size-modifier-a">Size Mod</span>
                                          <span className="sheet-table-header2" data-i18n="miscellaneous-modifier-a">Misc Mod</span>
                                        </div>
                                        <div className="sheet-pc-baseattackmacros">
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_grapplenote" title="grapplenote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_grapplemacro" title="grapplemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name} }} {{attack1=Grapple check: [[ 1d20 + [[ @{grapple} ]] ]] }} {{notes=@{grapplenote} }}"} /></span>
                                        </div>
                                        <br />
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-header2"> <br /> </span>
                                          <span className="sheet-table-header2" data-i18n="total">Total</span>
                                          <span className="sheet-table-header2" data-i18n="base-attack-bonus-epic-attack-bonus-a">Base AB<br />+ Epic AB</span>
                                          <span className="sheet-table-header2" data-i18n="strength-modifier">Strength<br />Modifier</span>
                                          <span className="sheet-table-header2" data-i18n="size-modifier">Size<br />Modifier</span>
                                          <span className="sheet-table-header2" data-i18n="miscellaneous-modifier">Misc<br />Modifier</span>
                                          <span className="sheet-table-header2" data-i18n="temporary-modifier">Temp<br />Modifier</span>
                                        </div>
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-row-name" style={{width: '60px'}}><span data-i18n="melee">Melee</span><div style={{fontSize: '0.65em'}} data-i18n="attack-bonus">Attack Bonus</div></span>
                                          <span className="sheet-table-data-center"><input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_meleeattackbonus" title="meleeattackbonus" defaultValue="(@{bab} +@{epicattackbonus} +@{strmodmab}+@{size}+@{mabmiscmod}+@{mabtempmod})" disabled="true" /></span>
                                          <span className="sheet-table-data-center"> =<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_babmab" title="babmab (Base Attack Bonus + Epic Attack Bonus)" defaultValue="@{bab} +@{epicattackbonus} " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_strmodmab" title="strmodmab" defaultValue="floor(@{str}/2-5) " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_sizemodmab" title="sizemodmab" defaultValue="@{size}" disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_mabmiscmod" title="mabmiscmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_mabtempmod" title="mabtempmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center"><button type="roll" name="roll_meleeattackcheck" title="meleeattackcheck" value="@{meleeattackmacro}" /></span>
                                        </div>
                                        <div className="sheet-pc-baseattackmacros">
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_meleeattacknote" title="meleeattacknote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_meleeattackmacro" title="meleeattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=makes a melee attack }} {{attack1=hitting AC [[ 1d20 + [[ @{meleeattackbonus} ]] ]] }} {{notes=@{meleeattacknote} }}"} /></span>
                                        </div>
                                        <div className="sheet-table-row">
                                          <span className="sheet-table-row-name" style={{width: '60px'}}><span data-i18n="ranged">Ranged</span><div style={{fontSize: '0.65em'}} data-i18n="attack-bonus">Attack Bonus</div></span>
                                          <span className="sheet-table-data-center"><input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_rangedattackbonus" title="rangedattackbonus" defaultValue="(@{bab} +@{epicattackbonus} +@{dexmodrab}+@{size}+@{rabmiscmod}+@{rabtempmod})" disabled="true" /></span>
                                          <span className="sheet-table-data-center"> =<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_babrab" title="babrab (Base Attack Bonus + Epic Attack Bonus)" defaultValue="@{bab} +@{epicattackbonus} " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_dexmodrab" title="dexmodrab" defaultValue="floor(@{dex}/2-5) " disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_sizemodrab" title="sizemodrab" defaultValue="@{size}" disabled="true" /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_rabmiscmod" title="rabmiscmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center">+<input className="sheet-inputbox" type="text" style={{width: '43px'}} name="attr_rabtempmod" title="rabtempmod" defaultValue={0} /></span>
                                          <span className="sheet-table-data-center"><button type="roll" name="roll_rangedattackcheck" title="rangedattackcheck" value="@{rangedattackmacro}" /></span>
                                        </div>
                                        <div className="sheet-pc-baseattackmacros">
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_rangedattacknote" title="rangedattacknote" placeholder="Note" data-i18n-placeholder="note" defaultValue={""} /></span>
                                          <span className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '175px', height: '20px'}} name="attr_rangedattackmacro" title="rangedattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=makes a ranged attack }} {{attack1=hitting AC [[ 1d20 + [[ @{rangedattackbonus} ]] ]] }} {{notes=@{rangedattacknote} }}"} /></span>
                                        </div>
                                        <input type="checkbox" className="sheet-pc-baseattackmacros-show sheet-arrow" title="baseattackmacros-show" name="attr_baseattackmacros-show" defaultValue={1} /><span style={{textAlign: 'left'}} data-i18n="show-grapple-and-base-attack-bonus-macros">Show Grapple and Base Attack Macros</span>
                                      </td></tr>
                                  </tbody></table>
                                <br />
                                <table>
                                  <tbody><tr>
                                      <td className="sheet-statlabel-big" style={{width: '50px'}}><span data-i18n="epic-levels">Epic Levels</span>:</td>
                                      <td><span data-i18n="epic-save-bonus">Epic Save Bonus</span>: <input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_epicsavebonus" title="epicsavebonus" defaultValue={0} /></td>
                                      <td><span data-i18n="epic-attack-bonus">Epic Attack Bonus</span>: <input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_epicattackbonus" title="epicattackbonus" defaultValue={0} /></td>
                                    </tr>
                                  </tbody></table>
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
                              <span className="sheet-table-data-center"><span data-i18n="languages">Languages</span><br /><textarea rows={2} cols={55} style={{width: '380px'}} name="attr_languages" title="languages" defaultValue={""} /></span>
                            </div>
                            <div className="sheet-table-row">
                              <span className="sheet-table-data-center"><span data-i18n="racial-abilities">Racial Abilities</span><br /><textarea rows={4} cols={55} style={{width: '380px'}} name="attr_racialabilities" title="racialabilities" defaultValue={""} /></span>
                            </div>
                            <div className="sheet-table-row">
                              <span className="sheet-table-data-center"><span data-i18n="class-abilities">Class Abilities</span><br /><textarea rows={4} cols={55} style={{width: '380px'}} name="attr_classabilities" title="classabilities" defaultValue={""} /></span>
                            </div>
                            <div className="sheet-table-row">
                              <span className="sheet-table-data-center"><span data-i18n="feats">Feats</span><br /><textarea rows={4} cols={55} style={{width: '380px'}} name="attr_feats" title="feats" defaultValue={""} /></span>
                            </div>
                            <div className="sheet-table-row">
                              <span className="sheet-table-data-center"><span data-i18n="other">Other</span><br /><textarea rows={4} cols={55} style={{width: '380px'}} name="attr_other" title="other" defaultValue={""} /></span>
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
            {/*Weapons*/}
            <input type="checkbox" className="sheet-pc-weapons-show sheet-arrow" title="weapons-show" name="attr_weapons-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="weapons">Weapons</span>
            <div className="sheet-pc-weapons">
              <div className="sheet-table">
                <div className="sheet-table-data-center" style={{verticalAlign: 'top'}}>
                  <div style={{float: 'left'}}>
                    <table>
                      <tbody><tr>
                          <td className="sheet-table-data-left">
                            <table cellPadding={10} cellSpacing={0}>
                              <tbody><tr>
                                  <td colSpan={6} className="sheet-statlabel-big-gray" style={{fontSize: '1.5em', width: '790px'}}><span data-i18n="weapons">Weapons</span></td>
                                </tr>
                              </tbody></table>
                            <input type="checkbox" className="sheet-pc-weapon1-show sheet-arrow" title="weapon1-show" name="attr_weapon1-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>1</span>
                            <div className="sheet-pc-weapon1">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon1name" title="weapon1name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon1type" title="weapon1type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon1enh" title="weapon1enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon1focus" title="weapon1focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon1specialize" title="weapon1specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon1critmin" title="weapon1critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon1critmult" title="weapon1critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon1range" title="weapon1range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon1ammunition" title="weapon1ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon1stat" title="weapon1stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon1damagestat" title="weapon1damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon1specialproperties" title="weapon1specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon1attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon1attackcalc" defaultValue={"1d20cs>@{weapon1critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon1stat}[Ability] +@{size}[size] +@{weapon1enh}[Weapon Enh] +@{weapon1focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon1attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon1attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon1name} }} {{attack1=hitting AC [[ @{weapon1attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon1attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon1damage} ]]dmg}} {{critdmg1=+ [[ @{weapon1crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon1attack" text="attack" title="weapon1attack" value="@{weapon1attackmacro}" style={{width: '20px'}}> </button></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon1fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon1fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon1name} }} {{attack1=A1: [[ @{weapon1attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon1attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon1damage} ]] }} {{critdmg1=+ [[ @{weapon1crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon1attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon1attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon1damage} ]] }} {{critdmg2=+ [[ @{weapon1crit} ]] }} {{attack3=A3: [[ @{weapon1attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon1attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon1damage} ]] }} {{critdmg3=+ [[ @{weapon1crit} ]] }} {{attack4=A4: [[ @{weapon1attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon1attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon1damage} ]] }} {{critdmg4=+ [[ @{weapon1crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon1fullattack" text="Full Attack" title="weapon1fullattack" value="@{weapon1fullattackmacro}" style={{width: '20px'}}> </button></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon1damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon1damage (Edit this to adjust the damage calculation.)" defaultValue={"1d6 + @{weapon1damagestat}[Weapon Dmg Ability] +@{weapon1enh}[Weapon Enh] +@{weapon1specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon1crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon1crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon1critmult}-1) ]]d6 + [[ (@{weapon1critmult}-1) ]] *( @{weapon1damagestat}[Weapon Dmg Ability] +@{weapon1enh}[Weapon Enh] +@{weapon1specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon1damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon1damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon1name} }} {{damage1=does [[ @{weapon1damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon1damageroll" title="weapon1damageroll" style={{width: '20px'}} value="@{weapon1damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon2-show sheet-arrow" title="weapon2-show" name="attr_weapon2-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>2</span>
                            <div className="sheet-pc-weapon2">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon2name" title="weapon2name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon2type" title="weapon2type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon2enh" title="weapon2enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon2focus" title="weapon2focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon2specialize" title="weapon2specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon2critmin" title="weapon2critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon2critmult" title="weapon2critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon2range" title="weapon2range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon2ammunition" title="weapon2ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon2stat" title="weapon2stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon2damagestat" title="weapon2damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon2specialproperties" title="weapon2specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon2attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon2attackcalc" defaultValue={"1d20cs>@{weapon2critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon2stat}[Ability] +@{size}[size] +@{weapon2enh}[Weapon Enh] +@{weapon2focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon2attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon2attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon2name} }} {{attack1=hitting AC [[ @{weapon2attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon2attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon2damage} ]]dmg}} {{critdmg1=+ [[ @{weapon2crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon2attack" text="attack" title="weapon2attack" value="@{weapon2attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon2fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon2fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon2name} }} {{attack1=A1: [[ @{weapon2attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon2attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon2damage} ]] }} {{critdmg1=+ [[ @{weapon2crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon2attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon2attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon2damage} ]] }} {{critdmg2=+ [[ @{weapon2crit} ]] }} {{attack3=A3: [[ @{weapon2attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon2attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon2damage} ]] }} {{critdmg3=+ [[ @{weapon2crit} ]] }} {{attack4=A4: [[ @{weapon2attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon2attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon2damage} ]] }} {{critdmg4=+ [[ @{weapon2crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon2fullattack" text="Full Attack" title="weapon2fullattack" value="@{weapon2fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon2damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon2damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon2damagestat}[Weapon Dmg Ability] +@{weapon2enh}[Weapon Enh] +@{weapon2specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon2crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon2crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon2critmult}-1) ]]d6 + [[ (@{weapon2critmult}-1) ]] *( @{weapon2damagestat}[Weapon Dmg Ability] +@{weapon2enh}[Weapon Enh] +@{weapon2specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon2damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon2damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon2name} }} {{damage1=does [[ @{weapon2damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon2damageroll" title="weapon2damageroll" style={{width: '20px'}} value="@{weapon2damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon3-show sheet-arrow" title="weapon3-show" name="attr_weapon3-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>3</span>
                            <div className="sheet-pc-weapon3">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon3name" title="weapon3name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon3type" title="weapon3type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon3enh" title="weapon3enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon3focus" title="weapon3focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon3specialize" title="weapon3specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon3critmin" title="weapon3critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon3critmult" title="weapon3critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon3range" title="weapon3range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon3ammunition" title="weapon3ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon3stat" title="weapon3stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon3damagestat" title="weapon3damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon3specialproperties" title="weapon3specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon3attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon3attackcalc" defaultValue={"1d20cs>@{weapon3critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon3stat}[Ability] +@{size}[size] +@{weapon3enh}[Weapon Enh] +@{weapon3focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon3attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon3attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon3name} }} {{attack1=hitting AC [[ @{weapon3attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon3attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon3damage} ]]dmg}} {{critdmg1=+ [[ @{weapon3crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon3attack" text="attack" title="weapon3attack" value="@{weapon3attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon3fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon3fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon3name} }} {{attack1=A1: [[ @{weapon3attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon3attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon3damage} ]] }} {{critdmg1=+ [[ @{weapon3crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon3attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon3attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon3damage} ]] }} {{critdmg2=+ [[ @{weapon3crit} ]] }} {{attack3=A3: [[ @{weapon3attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon3attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon3damage} ]] }} {{critdmg3=+ [[ @{weapon3crit} ]] }} {{attack4=A4: [[ @{weapon3attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon3attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon3damage} ]] }} {{critdmg4=+ [[ @{weapon3crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon3fullattack" text="Full Attack" title="weapon3fullattack" value="@{weapon3fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon3damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon3damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon3damagestat}[Weapon Dmg Ability] +@{weapon3enh}[Weapon Enh] +@{weapon3specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon3crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon3crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon3critmult}-1) ]]d6 + [[ (@{weapon3critmult}-1) ]] *( @{weapon3damagestat}[Weapon Dmg Ability] +@{weapon3enh}[Weapon Enh] +@{weapon3specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon3damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon3damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon3name} }} {{damage1=does [[ @{weapon3damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon3damageroll" title="weapon3damageroll" style={{width: '20px'}} value="@{weapon3damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon4-show sheet-arrow" title="weapon4-show" name="attr_weapon4-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>4</span>
                            <div className="sheet-pc-weapon4">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon4name" title="weapon4name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon4type" title="weapon4type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon4enh" title="weapon4enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon4focus" title="weapon4focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon4specialize" title="weapon4specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon4critmin" title="weapon4critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon4critmult" title="weapon4critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon4range" title="weapon4range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon4ammunition" title="weapon4ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon4stat" title="weapon4stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon4damagestat" title="weapon4damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon4specialproperties" title="weapon4specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon4attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon4attackcalc" defaultValue={"1d20cs>@{weapon4critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon4stat}[Ability] +@{size}[size] +@{weapon4enh}[Weapon Enh] +@{weapon4focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon4attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon4attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon4name} }} {{attack1=hitting AC [[ @{weapon4attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon4attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon4damage} ]]dmg}} {{critdmg1=+ [[ @{weapon4crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon4attack" text="attack" title="weapon4attack" value="@{weapon4attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon4fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon4fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon4name} }} {{attack1=A1: [[ @{weapon4attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon4attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon4damage} ]] }} {{critdmg1=+ [[ @{weapon4crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon4attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon4attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon4damage} ]] }} {{critdmg2=+ [[ @{weapon4crit} ]] }} {{attack3=A3: [[ @{weapon4attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon4attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon4damage} ]] }} {{critdmg3=+ [[ @{weapon4crit} ]] }} {{attack4=A4: [[ @{weapon4attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon4attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon4damage} ]] }} {{critdmg4=+ [[ @{weapon4crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon4fullattack" text="Full Attack" title="weapon4fullattack" value="@{weapon4fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon4damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon4damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon4damagestat}[Weapon Dmg Ability] +@{weapon4enh}[Weapon Enh] +@{weapon4specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon4crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon4crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon4critmult}-1) ]]d6 + [[ (@{weapon4critmult}-1) ]] *( @{weapon4damagestat}[Weapon Dmg Ability] +@{weapon4enh}[Weapon Enh] +@{weapon4specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon4damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon4damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon4name} }} {{damage1=does [[ @{weapon4damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon4damageroll" title="weapon4damageroll" style={{width: '20px'}} value="@{weapon4damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon5-show sheet-arrow" title="weapon5-show" name="attr_weapon5-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>5</span>
                            <div className="sheet-pc-weapon5">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon5name" title="weapon5name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon5type" title="weapon5type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon5enh" title="weapon5enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon5focus" title="weapon5focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon5specialize" title="weapon5specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon5critmin" title="weapon5critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon5critmult" title="weapon5critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon5range" title="weapon5range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon5ammunition" title="weapon5ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon5stat" title="weapon5stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon5damagestat" title="weapon5damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon5specialproperties" title="weapon5specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon5attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon5attackcalc" defaultValue={"1d20cs>@{weapon5critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon5stat}[Ability] +@{size}[size] +@{weapon5enh}[Weapon Enh] +@{weapon5focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon5attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon5attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon5name} }} {{attack1=hitting AC [[ @{weapon5attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon5attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon5damage} ]]dmg}} {{critdmg1=+ [[ @{weapon5crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon5attack" text="attack" title="weapon5attack" value="@{weapon5attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon5fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon5fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon5name} }} {{attack1=A1: [[ @{weapon5attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon5attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon5damage} ]] }} {{critdmg1=+ [[ @{weapon5crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon5attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon5attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon5damage} ]] }} {{critdmg2=+ [[ @{weapon5crit} ]] }} {{attack3=A3: [[ @{weapon5attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon5attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon5damage} ]] }} {{critdmg3=+ [[ @{weapon5crit} ]] }} {{attack4=A4: [[ @{weapon5attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon5attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon5damage} ]] }} {{critdmg4=+ [[ @{weapon5crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon5fullattack" text="Full Attack" title="weapon5fullattack" value="@{weapon5fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon5damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon5damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon5damagestat}[Weapon Dmg Ability] +@{weapon5enh}[Weapon Enh] +@{weapon5specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon5crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon5crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon5critmult}-1) ]]d6 + [[ (@{weapon5critmult}-1) ]] *( @{weapon5damagestat}[Weapon Dmg Ability] +@{weapon5enh}[Weapon Enh] +@{weapon5specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon5damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon5damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon5name} }} {{damage1=does [[ @{weapon5damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon5damageroll" title="weapon5damageroll" style={{width: '20px'}} value="@{weapon5damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon6-show sheet-arrow" title="weapon6-show" name="attr_weapon6-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>6</span>
                            <div className="sheet-pc-weapon6">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon6name" title="weapon6name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon6type" title="weapon6type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon6enh" title="weapon6enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon6focus" title="weapon6focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon6specialize" title="weapon6specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon6critmin" title="weapon6critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon6critmult" title="weapon6critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon6range" title="weapon6range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon6ammunition" title="weapon6ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon6stat" title="weapon6stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon6damagestat" title="weapon6damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon6specialproperties" title="weapon6specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon6attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon6attackcalc" defaultValue={"1d20cs>@{weapon6critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon6stat}[Ability] +@{size}[size] +@{weapon6enh}[Weapon Enh] +@{weapon6focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon6attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon6attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon6name} }} {{attack1=hitting AC [[ @{weapon6attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon6attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon6damage} ]]dmg}} {{critdmg1=+ [[ @{weapon6crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon6attack" text="attack" title="weapon6attack" value="@{weapon6attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon6fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon6fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon6name} }} {{attack1=A1: [[ @{weapon6attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon6attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon6damage} ]] }} {{critdmg1=+ [[ @{weapon6crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon6attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon6attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon6damage} ]] }} {{critdmg2=+ [[ @{weapon6crit} ]] }} {{attack3=A3: [[ @{weapon6attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon6attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon6damage} ]] }} {{critdmg3=+ [[ @{weapon6crit} ]] }} {{attack4=A4: [[ @{weapon6attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon6attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon6damage} ]] }} {{critdmg4=+ [[ @{weapon6crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon6fullattack" text="Full Attack" title="weapon6fullattack" value="@{weapon6fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon6damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon6damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon6damagestat}[Weapon Dmg Ability] +@{weapon6enh}[Weapon Enh] +@{weapon6specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon6crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon6crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon6critmult}-1) ]]d6 + [[ (@{weapon6critmult}-1) ]] *( @{weapon6damagestat}[Weapon Dmg Ability] +@{weapon6enh}[Weapon Enh] +@{weapon6specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon6damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon6damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon6name} }} {{damage1=does [[ @{weapon6damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon6damageroll" title="weapon6damageroll" style={{width: '20px'}} value="@{weapon6damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon7-show sheet-arrow" title="weapon7-show" name="attr_weapon7-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>7</span>
                            <div className="sheet-pc-weapon7">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon7name" title="weapon7name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon7type" title="weapon7type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon7enh" title="weapon7enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon7focus" title="weapon7focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon7specialize" title="weapon7specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon7critmin" title="weapon7critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon7critmult" title="weapon7critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon7range" title="weapon7range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon7ammunition" title="weapon7ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon7stat" title="weapon7stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon7damagestat" title="weapon7damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon7specialproperties" title="weapon7specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon7attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon7attackcalc" defaultValue={"1d20cs>@{weapon7critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon7stat}[Ability] +@{size}[size] +@{weapon7enh}[Weapon Enh] +@{weapon7focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon7attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon7attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon7name} }} {{attack1=hitting AC [[ @{weapon7attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon7attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon7damage} ]]dmg}} {{critdmg1=+ [[ @{weapon7crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon7attack" text="attack" title="weapon7attack" value="@{weapon7attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon7fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon7fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon7name} }} {{attack1=A1: [[ @{weapon7attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon7attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon7damage} ]] }} {{critdmg1=+ [[ @{weapon7crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon7attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon7attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon7damage} ]] }} {{critdmg2=+ [[ @{weapon7crit} ]] }} {{attack3=A3: [[ @{weapon7attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon7attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon7damage} ]] }} {{critdmg3=+ [[ @{weapon7crit} ]] }} {{attack4=A4: [[ @{weapon7attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon7attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon7damage} ]] }} {{critdmg4=+ [[ @{weapon7crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon7fullattack" text="Full Attack" title="weapon7fullattack" value="@{weapon7fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon7damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon7damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon7damagestat}[Weapon Dmg Ability] +@{weapon7enh}[Weapon Enh] +@{weapon7specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon7crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon7crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon7critmult}-1) ]]d6 + [[ (@{weapon7critmult}-1) ]] *( @{weapon7damagestat}[Weapon Dmg Ability] +@{weapon7enh}[Weapon Enh] +@{weapon7specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon7damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon7damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon7name} }} {{damage1=does [[ @{weapon7damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon7damageroll" title="weapon7damageroll" style={{width: '20px'}} value="@{weapon7damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon8-show sheet-arrow" title="weapon8-show" name="attr_weapon8-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>8</span>
                            <div className="sheet-pc-weapon8">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon8name" title="weapon8name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon8type" title="weapon8type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon8enh" title="weapon8enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon8focus" title="weapon8focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon8specialize" title="weapon8specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon8critmin" title="weapon8critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon8critmult" title="weapon8critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon8range" title="weapon8range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon8ammunition" title="weapon8ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon8stat" title="weapon8stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon8damagestat" title="weapon8damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon8specialproperties" title="weapon8specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon8attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon8attackcalc" defaultValue={"1d20cs>@{weapon8critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon8stat}[Ability] +@{size}[size] +@{weapon8enh}[Weapon Enh] +@{weapon8focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon8attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon8attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon8name} }} {{attack1=hitting AC [[ @{weapon8attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon8attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon8damage} ]]dmg}} {{critdmg1=+ [[ @{weapon8crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon8attack" text="attack" title="weapon8attack" value="@{weapon8attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon8fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon8fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon8name} }} {{attack1=A1: [[ @{weapon8attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon8attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon8damage} ]] }} {{critdmg1=+ [[ @{weapon8crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon8attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon8attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon8damage} ]] }} {{critdmg2=+ [[ @{weapon8crit} ]] }} {{attack3=A3: [[ @{weapon8attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon8attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon8damage} ]] }} {{critdmg3=+ [[ @{weapon8crit} ]] }} {{attack4=A4: [[ @{weapon8attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon8attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon8damage} ]] }} {{critdmg4=+ [[ @{weapon8crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon8fullattack" text="Full Attack" title="weapon8fullattack" value="@{weapon8fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon8damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon8damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon8damagestat}[Weapon Dmg Ability] +@{weapon8enh}[Weapon Enh] +@{weapon8specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon8crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon8crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon8critmult}-1) ]]d6 + [[ (@{weapon8critmult}-1) ]] *( @{weapon8damagestat}[Weapon Dmg Ability] +@{weapon8enh}[Weapon Enh] +@{weapon8specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon8damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon8damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon8name} }} {{damage1=does [[ @{weapon8damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon8damageroll" title="weapon8damageroll" style={{width: '20px'}} value="@{weapon8damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon9-show sheet-arrow" title="weapon9-show" name="attr_weapon9-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>9</span>
                            <div className="sheet-pc-weapon9">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon9name" title="weapon9name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon9type" title="weapon9type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon9enh" title="weapon9enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon9focus" title="weapon9focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon9specialize" title="weapon9specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon9critmin" title="weapon9critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon9critmult" title="weapon9critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon9range" title="weapon9range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon9ammunition" title="weapon9ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon9stat" title="weapon9stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon9damagestat" title="weapon9damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon9specialproperties" title="weapon9specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon9attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon9attackcalc" defaultValue={"1d20cs>@{weapon9critmin} +@{bab}[BAB] +@{epicattackbonus}[Epic AB] + @{weapon9stat}[Ability] +@{size}[size] +@{weapon9enh}[Weapon Enh] +@{weapon9focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon9attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon9attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon9name} }} {{attack1=hitting AC [[ @{weapon9attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon9attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon9damage} ]]dmg}} {{critdmg1=+ [[ @{weapon9crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon9attack" text="attack" title="weapon9attack" value="@{weapon9attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon9fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon9fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon9name} }} {{attack1=A1: [[ @{weapon9attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon9attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon9damage} ]] }} {{critdmg1=+ [[ @{weapon9crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon9attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon9attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon9damage} ]] }} {{critdmg2=+ [[ @{weapon9crit} ]] }} {{attack3=A3: [[ @{weapon9attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon9attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon9damage} ]] }} {{critdmg3=+ [[ @{weapon9crit} ]] }} {{attack4=A4: [[ @{weapon9attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon9attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon9damage} ]] }} {{critdmg4=+ [[ @{weapon9crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon9fullattack" text="Full Attack" title="weapon9fullattack" value="@{weapon9fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon9damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon9damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon9damagestat}[Weapon Dmg Ability] +@{weapon9enh}[Weapon Enh] +@{weapon9specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon9crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon9crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon9critmult}-1) ]]d6 + [[ (@{weapon9critmult}-1) ]] *( @{weapon9damagestat}[Weapon Dmg Ability] +@{weapon9enh}[Weapon Enh] +@{weapon9specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon9damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon9damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon9name} }} {{damage1=does [[ @{weapon9damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon9damageroll" title="weapon9damageroll" style={{width: '20px'}} value="@{weapon9damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon10-show sheet-arrow" title="weapon10-show" name="attr_weapon10-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="weapon">Weapon</span>10</span>
                            <div className="sheet-pc-weapon10">
                              <table cellPadding={0} cellSpacing={0}>
                                <tbody><tr>
                                    <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                    <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                    <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                    <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                    <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                    <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weapon10name" title="weapon10name" style={{height: '24px', width: '120px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon10type" title="weapon10type" style={{height: '24px', width: '44px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon10enh" title="weapon10enh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon10focus" title="weapon10focus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon10specialize" title="weapon10specialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon10critmin" title="weapon10critmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weapon10critmult" title="weapon10critmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon10range" title="weapon10range" style={{height: '24px', width: '59px'}} /></td>
                                    <td><input className="sheet-inputbox" type="text" name="attr_weapon10ammunition" title="weapon10ammunition" style={{height: '24px', width: '59px'}} /></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon10stat" title="weapon10stat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                      </select></td>
                                    <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapon10damagestat" title="weapon10damagestat">
                                        <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                        <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                        <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                        <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                      </select></td>
                                    <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weapon10specialproperties" title="weapon10specialproperties" defaultValue={"0"} /></td>
                                  </tr>
                                  <tr>
                                    <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon10attackcalc (Edit this to adjust the attack calculation)" name="attr_weapon10attackcalc" defaultValue={"1d20cs>@{weapon10critmin} +@{bab} +@{epicattackbonus} [BAB] + @{weapon10stat}[Ability] +@{size}[size] +@{weapon10enh}[Weapon Enh] +@{weapon10focus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                      <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="weapon10attackmacro (Modify this macro to modify your attack macro)" name="attr_weapon10attackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon10name} }} {{attack1=hitting AC [[ @{weapon10attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon10attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapon10damage} ]]dmg}} {{critdmg1=+ [[ @{weapon10crit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                      <button type="roll" name="roll_weapon10attack" text="attack" title="weapon10attack" value="@{weapon10attackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="weapon10fullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weapon10fullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weapon10name} }} {{attack1=A1: [[ @{weapon10attackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weapon10attackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapon10damage} ]] }} {{critdmg1=+ [[ @{weapon10crit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weapon10attackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weapon10attackcalc}-5 ]] }} {{damage2=D2: [[ @{weapon10damage} ]] }} {{critdmg2=+ [[ @{weapon10crit} ]] }} {{attack3=A3: [[ @{weapon10attackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weapon10attackcalc}-10 ]] }} {{damage3=D3: [[ @{weapon10damage} ]] }} {{critdmg3=+ [[ @{weapon10crit} ]] }} {{attack4=A4: [[ @{weapon10attackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weapon10attackcalc}-15 ]] }} {{damage4=D4: [[ @{weapon10damage} ]] }} {{critdmg4=+ [[ @{weapon10crit} ]] }} "} />
                                      <button type="roll" name="roll_weapon10fullattack" text="Full Attack" title="weapon10fullattack" value="@{weapon10fullattackmacro}" style={{width: '20px'}} /></td>
                                    <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapon10damage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon10damage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapon10damagestat}[Weapon Dmg Ability] +@{weapon10enh}[Weapon Enh] +@{weapon10specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon10crit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="weapon10crit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weapon10critmult}-1) ]]d6 + [[ (@{weapon10critmult}-1) ]] *( @{weapon10damagestat}[Weapon Dmg Ability] +@{weapon10enh}[Weapon Enh] +@{weapon10specialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                      <textarea className="sheet-inputbox" type="text" name="attr_weapon10damagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="weapon10damagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weapon10name} }} {{damage1=does [[ @{weapon10damage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                      <button type="roll" name="roll_weapon10damageroll" title="weapon10damageroll" style={{width: '20px'}} value="@{weapon10damagemacro}" /></td>
                                  </tr>
                                </tbody></table>
                            </div>
                            <br />
                            <input type="checkbox" className="sheet-pc-weapon11-show sheet-arrow" title="weapon11-show" name="attr_weapon11-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="other-weapons">Other Weapons</span>
                            <div className="sheet-pc-weapon11">
                              <fieldset className="repeating_weapons">
                                <table cellPadding={0} cellSpacing={0}>
                                  <tbody><tr>
                                      <td colSpan={2} className="sheet-statlabel-big" style={{fontSize: '1.5em', width: '120px'}} data-i18n="weapon">Weapon</td>
                                      <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="type">Type</td>
                                      <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="weapon-enhancement-a">Weapon Enh</td>
                                      <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-focus-s">Weapon<br />Focus</td>
                                      <td className="sheet-statlabel" style={{width: '41px'}} data-i18n="weapon-specialization-as">Weapon<br />Specialize</td>
                                      <td className="sheet-statlabel" style={{width: '79px'}} data-i18n="critical">Critical</td>
                                      <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="range">Range</td>
                                      <td className="sheet-statlabel" style={{width: '59px'}} data-i18n="ammunition">Ammunition</td>
                                      <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="attack-ability">Attack Ability</td>
                                      <td className="sheet-statlabel" style={{width: '44px'}} data-i18n="damage-ability">Damage Ability</td>
                                      <td colSpan={3} className="sheet-statlabel" style={{width: '205px'}} data-i18n="special-properties">Special Properties</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}><input className="sheet-inputbox" type="text" name="attr_weaponname" title="repeating_weapons_#_weaponname" style={{height: '24px', width: '120px'}} /></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_weapontype" title="repeating_weapons_#_weapontype" style={{height: '24px', width: '44px'}} /></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_weaponenh" title="repeating_weapons_#_weaponenh (affects both attack and damage)" style={{height: '24px', width: '44px'}} defaultValue={0} /></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_weaponfocus" title="repeating_weapons_#_weaponfocus (affects only attack)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_weaponspecialize" title="repeating_weapons_#_weaponspecialize (affects only damage)" style={{height: '24px', width: '41px'}} defaultValue={0} /></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_weaponcritmin" title="repeating_weapons_#_weaponcritmin" style={{height: '24px', width: '25px'}} defaultValue={20} />-20/x<input className="sheet-inputbox" type="text" name="attr_weaponcritmult" title="repeating_weapons_#_weaponcritmult" style={{height: '24px', width: '19px'}} defaultValue={2} /></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_weaponrange" title="repeating_weapons_#_weaponrange" style={{height: '24px', width: '59px'}} /></td>
                                      <td><input className="sheet-inputbox" type="text" name="attr_weaponammunition" title="repeating_weapons_#_weaponammunition" style={{height: '24px', width: '59px'}} /></td>
                                      <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weaponstat" title="repeating_weapons_#_weaponstat">
                                          <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                          <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                        </select></td>
                                      <td><select className="sheet-inputbox" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_weapondamagestat" title="repeating_weapons_#_weapondamagestat">
                                          <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                          <option type="text" style={{width: '45px'}} value="(floor(@{str-mod}/2))" data-i18n="half-strength">1/2 Str</option>
                                          <option type="text" style={{width: '45px'}} value="(@{str-mod} +floor(@{str-mod}/2))" data-i18n="strength-and-half-strength">Str+1/2Str</option>
                                          <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                          <option type="text" style={{width: '45px'}} value={0} data-i18n="none">None</option>
                                        </select></td>
                                      <td colSpan={3}><textarea input className="sheet-inputbox" rows={1} cols={45} style={{height: '20px', width: '200px'}} name="attr_weaponspecialproperties" title="repeating_weapons_#_weaponspecialproperties" defaultValue={"0"} /></td>
                                    </tr>
                                    <tr>
                                      <td colSpan={6}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="attack-calculation-a">Attack Calc</span> / <span data-i18n="macro">Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="repeating_weapons_#_weaponattackcalc (Edit this to adjust the attack calculation)" name="attr_weaponattackcalc" defaultValue={"1d20cs>@{weaponcritmin} +@{bab} +@{epicattackbonus} [BAB] + @{weaponstat}[Ability] +@{size}[size] +@{weaponenh}[Weapon Enh] +@{weaponfocus}[Weapon Focus] + ?{Flank (1=yes)|0}*2[Flank] +?{Power Attack? (put in penalty with negative sign ie -3)|0}[Pwr Attk] +?{Additional Attack Bonus?|0}[Ad'l Atk Bon] "} />
                                        <textarea rows={1} cols={45} style={{height: '18px', width: '120px'}} title="repeating_weapons_#_weaponattackmacro (Modify this macro to modify your attack macro)" name="attr_weaponattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weaponname} }} {{attack1=hitting AC [[ @{weaponattackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weaponattackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=for [[ @{weapondamage} ]]dmg}} {{critdmg1=+ [[ @{weaponcrit} ]] crit dmg}} {{fullattackflag= [[ 0d1 ]] }} "} />
                                        <button type="roll" name="roll_weaponattack" text="attack" title="repeating_weapons_#_weaponattack" value="@{weaponattackmacro}" style={{width: '20px'}} /></td>
                                      <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="full-attack-macro">Full Attack Macro</span>:<br /></div><textarea rows={1} cols={45} style={{height: '18px', width: '155px'}} title="repeating_weapons_#_weaponfullattackmacro (Modify this macro to modify your full round attack macro)" name="attr_weaponfullattackmacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}}} {{subtags=attacks with a @{weaponname} }} {{attack1=A1: [[ @{weaponattackcalc} ]] }} {{critconfirm1=Crit?: [[ @{weaponattackcalc} ]] }} {{fumbleroll=Fumble: [[ d20 ]] }} {{damage1=D1: [[ @{weapondamage} ]] }} {{critdmg1=+ [[ @{weaponcrit} ]] }} {{fullattackflag= [[ ?{Full Attack?|No, 0d1|Yes, d1} ]] }} {{attack2=A2: [[ @{weaponattackcalc}-5 ]] }} {{critconfirm2=Crit!: [[ @{weaponattackcalc}-5 ]] }} {{damage2=D2: [[ @{weapondamage} ]] }} {{critdmg2=+ [[ @{weaponcrit} ]] }} {{attack3=A3: [[ @{weaponattackcalc}-10 ]] }} {{critconfirm3=Crit!: [[ @{weaponattackcalc}-10 ]] }} {{damage3=D3: [[ @{weapondamage} ]] }} {{critdmg3=+ [[ @{weaponcrit} ]] }} {{attack4=A4: [[ @{weaponattackcalc}-15 ]] }} {{critconfirm4=Crit!: [[ @{weaponattackcalc}-15 ]] }} {{damage4=D4: [[ @{weapondamage} ]] }} {{critdmg4=+ [[ @{weaponcrit} ]] }} "} />
                                        <button type="roll" name="roll_weaponfullattack" text="Full Attack" title="repeating_weapons_#_weaponfullattack" value="@{weaponfullattackmacro}" style={{width: '20px'}} /></td>
                                      <td colSpan={3}><div style={{fontSize: '0.5em', textAlign: 'left'}}><span data-i18n="damage-calculation-a">Damage Calc</span> / <span data-i18n="critical-calculation-a">Crit Calc</span> / <span data-i18n="damage-macro">Damage Macro</span>:<br /></div><textarea className="sheet-inputbox" type="text" name="attr_weapondamage" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="repeating_weapons_#_weapondamage (Edit this to adjust the damage calculation. Ie add +floor(@{str-mod} /2) if wielding 2h weapon for 1.5str on damage.)" defaultValue={"1d6 + @{weapondamagestat}[Weapon Dmg Ability] +@{weaponenh}[Weapon Enh] +@{weaponspecialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon] "} />
                                        <textarea className="sheet-inputbox" type="text" name="attr_weaponcrit" rows={1} cols={45} style={{height: '20px', width: '65px'}} title="repeating_weapons_#_weaponcrit (Edit this to adjust the critical calculation.)" defaultValue={" [[ (@{weaponcritmult}-1) ]]d6 + [[ (@{weaponcritmult}-1) ]] *( @{weapondamagestat}[Weapon Dmg Ability] +@{weaponenh}[Weapon Enh] +@{weaponspecialize}[Weapon Spec] +?{Power Attack Bonus?|0}[Pwr Attk] +?{Additional Damage Bonus?|0}[Ad'l Dmg Bon]) "} />
                                        <textarea className="sheet-inputbox" type="text" name="attr_weapondamagemacro" rows={1} cols={45} style={{height: '20px', width: '100px'}} title="repeating_weapons_#_weapondamagemacro" defaultValue={"&{template:DnD35Attack} {{pcflag=true}} {{name=@{character_name}'s @{weaponname} }} {{damage1=does [[ @{weapondamage} ]]damage}} {{fullattackflag= [[ 0d1 ]] }}"} />
                                        <button type="roll" name="roll_weapondamageroll" title="repeating_weapons_#_weapondamageroll" style={{width: '20px'}} value="@{weapondamagemacro}" /></td>
                                    </tr>
                                  </tbody></table>
                              </fieldset>
                            </div>
                          </td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sheet-tab-content sheet-tab3 sheet-tab99">
            {/*AC*/}
            {/*AC = 10 + Armor Bonus + Shield Bonus + Dex (constrained) + Size + Dodge + Natural Armor + Deflection + Misc....... All
		<br>
		Touch AC = 10 + Dex (constrained) + Size + Dodge + Deflection + Misc......... Touch AC no Armor, Shield, Natural Armor
		<br>
		FF AC = 10 + Dex (penalty only) + Armor Bonus + Shield Bonus + Size + Natural Armor + Deflection + Misc......... FF AC no Dex (constrained) Bonus, Dodge
		<br>
		size + Deflection + Misc in AC, Touch AC, FF AC <br>
		Armor Bonus + Shield Bonus + Natural Armor in AC and FF AC NOT Touch AC <br>
		Dex (constrained) + Dodge in AC and Touch AC Not FF AC (dex pen in FF AC)<br> */}
            <table>
              <tbody><tr>
                  <td style={{width: '38px'}} className="sheet-statlabel"><span data-i18n="armor-class-i">AC</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                  <td><input className="sheet-inputbox" type="text" name="attr_armorclass" title="armorclass" defaultValue="(10+@{armorclassbonus}+@{totalabilityacbonus}+@{armorclasssizemod}+@{acdodgemod}+@{acnaturalarmor}+@{acdeflectionmod}+@{acmiscmod})" disabled="true" style={{height: '24px', width: '35px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="total">Total</div></td>
                  <td>=10<br /><br /></td>
                  <td>+<input className="sheet-inputbox" type="text" name="attr_armorclassdexmod" title="armorclassdexmod (see Ability Bonus section in AC for how value is calculated)" defaultValue="@{totalabilityacbonus}" disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="ability-modifier-a">Ability Mod</div></td>
                  <td>+<input className="sheet-inputbox" type="text" name="attr_armorclassbonus" title="armorclassbonus (from AC items section below)" defaultValue="(@{totalarmorbonus})" disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="armor-bonus-a">Armor Bns</div></td>
                  <td>+<input className="sheet-inputbox" type="text" name="attr_armorclasssizemod" title="armorclasssizemod" defaultValue="@{size}" disabled="true" style={{height: '24px', width: '28px'}} /><br /><div style={{fontSize: '0.5em'}} data-i18n="size-modifier-a">Size Mod</div></td>
                  <td>+<input className="sheet-inputbox" type="text" name="attr_acdodgemod" title="acdodgemod" defaultValue="@{totaldodgebonus}" style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="dodge">Dodge</div></td>
                  <td>+<input className="sheet-inputbox" type="text" name="attr_acnaturalarmor" title="acnaturalarmor" defaultValue="@{totalnaturalarmorbonus}" style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="natural-armor-a">Nat. Armor</div></td>
                  <td>+<input className="sheet-inputbox" type="text" name="attr_acdeflectionmod" title="acdeflectionmod" defaultValue="@{totaldeflectionbonus}" style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="deflection">Deflection</div></td>
                  <td>+<input className="sheet-inputbox" type="text" name="attr_acmiscmod" title="acmiscmod" defaultValue="@{totalmiscacbonus}" style={{height: '24px', width: '28px'}} disabled="true" /><br /><div style={{fontSize: '0.5em'}} data-i18n="miscellaneous-modifier-a">Misc Mod</div></td>
                  <td> &nbsp; &nbsp; &nbsp; </td>
                  <td style={{width: '35px', height: '24px'}} className="sheet-statlabel"><span data-i18n="touch-u">TOUCH</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                  <td valign="top"><input className="sheet-inputbox" type="text" style={{width: '35px'}} name="attr_touchac" title="touchac" defaultValue="(10+ @{totalabilitytouchacbonus} +@{armorclasssizemod} +@{acdodgemod} +@{acdeflectionmod} +@{totalmisctouchacbonus})" disabled="true" /> &nbsp; </td>
                  <td style={{width: '70px'}} className="sheet-statlabel"><span data-i18n="flat-footed-u">FLAT-FOOTED</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                  <td valign="top"><input className="sheet-inputbox" type="text" style={{width: '35px'}} name="attr_flatac" title="flatac" defaultValue="10 +@{totalabilityffacbonus} +@{armorclassbonus} +@{armorclasssizemod} +@{acnaturalarmor} +@{acdeflectionmod} +@{totalmiscffacbonus}" disabled="true" /> &nbsp; </td>
                  <td style={{width: '70px'}} className="sheet-statlabel"><span data-i18n="immobilized">Immobilized</span><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-class">Armor Class</div></td>
                  <td valign="top"><input className="sheet-inputbox" type="text" style={{width: '35px'}} name="attr_immoblac" title="immoblac" defaultValue="10 +@{totalabilityimmoblacbonus} +@{armorclassbonus} +@{armorclasssizemod} +@{acnaturalarmor} +@{acdeflectionmod} +@{totalmiscimmoblacbonus}" disabled="true" /> &nbsp; </td>
                  <td valign="top"> &nbsp;<input type="hidden" name="attr_armorpenalty" title="armorpenalty (max of armor check penalty and encumbrance check penalty)" defaultValue="(@{armorworn}*@{acitemcheckpenalty}+@{shieldworn}*@{shieldcheckpenalty})" disabled="true" /> &nbsp;
                    <input className="sheet-inputbox" type="text" style={{width: '45px'}} name="attr_armorcheckpenalty" title="armorcheckpenalty" defaultValue=" (ceil((@{armorpenalty}-@{encumbracp})/10000000000)*@{encumbracp} - floor((@{armorpenalty}-@{encumbracp}-1)/10000000000)*@{armorpenalty})" disabled="true" /><br /><div style={{fontSize: '0.65em'}} data-i18n="armor-check-penalty-a">Armor Check Pen</div></td>
                </tr>
              </tbody></table>
            <hr />
            <input type="checkbox" className="sheet-pc-acequipment-show sheet-arrow" title="acequipment-show" name="attr_acequipment-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="armor">Armor </span>
            <div className="sheet-pc-acequipment">
              <div style={{float: 'left'}}>
                <table cellPadding={10} cellSpacing={0}>
                  <tbody><tr>
                      <td colSpan={3} className="sheet-statlabel-big-gray" style={{fontSize: '1.5em', width: '790px'}} data-i18n="armor-class-items-i">AC Items</td>
                    </tr>
                  </tbody></table>
                <table cellPadding={0} cellSpacing={0}>
                  <tbody><tr>
                      <td className="sheet-statlabel" style={{fontSize: '1em', width: '180px'}} colSpan={3}><input type="checkbox" name="attr_armorworn" title="armorworn (Check if this armor is being worn.)" defaultValue={1} style={{width: '8px'}} defaultChecked /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span data-i18n="armor-name">Armor Name</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '58px'}} data-i18n="type">Type</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="bonus">Bonus</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="maximum-dexterity-a">Max Dex</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="check-penalty">Check Penalty</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="spell-failure">Spell Failure</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '70px'}} data-i18n="speed">Speed</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="weight">Weight</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '223px'}} colSpan={4} data-i18n="special-properties">Special Properties</td>
                    </tr>
                    <tr>
                      <td colSpan={3}><input className="sheet-inputbox" type="text" name="attr_acitem" title="acitem" style={{height: '24px', width: '180px'}} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_acitemtype" title="acitemtype" style={{height: '24px', width: '58px'}} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_acitembonus" title="acitembonus" style={{height: '24px', width: '54px'}} defaultValue={0} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_acitemdex" title="acitemdex" style={{height: '24px', width: '54px'}} defaultValue={20} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_acitemcheckpenalty" title="acitemcheckpenalty" style={{height: '24px', width: '54px'}} defaultValue={0} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_acitemspellfailure" title="acitemspellfailure" style={{height: '24px', width: '54px'}} defaultValue={0} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_acitemspeed" title="acitemspeed" style={{height: '24px', width: '70px'}} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_acitemweight" title="acitemweight" defaultValue={0} style={{height: '24px', width: '54px'}} /></td>
                      <td colSpan={4}><input className="sheet-inputbox" type="text" name="attr_acitemproperties" title="acitemproperties" style={{height: '24px', width: '223px'}} /></td>
                    </tr>
                  </tbody></table>
                <br />
                <table cellPadding={0} cellSpacing={0}>
                  <tbody><tr>
                      <td className="sheet-statlabel" style={{fontSize: '1em', width: '184px'}}><input type="checkbox" name="attr_shieldworn" title="shieldworn" defaultValue={1} style={{width: '8px'}} defaultChecked /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span data-i18n="shield">Shield</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="armor-bonus">Armor Bonus</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="check-penalty">Check Penalty</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="spell-failure">Spell Failure</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '54px'}} data-i18n="weight">Weight</td>
                      <td className="sheet-statlabel" style={{fontSize: '0.65em', width: '404px'}} colSpan={5} data-i18n="properties">Properties</td>
                    </tr>
                    <tr>
                      <td><input className="sheet-inputbox" type="text" name="attr_shield" title="shield" style={{height: '24px', width: '184px'}} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_shieldbonus" title="shieldbonus" defaultValue={0} style={{height: '24px', width: '54px'}} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_shieldcheckpenalty" title="shieldcheckpenalty" defaultValue={0} style={{height: '24px', width: '54px'}} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_shieldspellfailure" title="shieldspellfailure" defaultValue={0} style={{height: '24px', width: '54px'}} /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_shieldweight" title="shieldweight" defaultValue={0} style={{height: '24px', width: '54px'}} /></td>
                      <td colSpan={5}><input className="sheet-inputbox" type="text" name="attr_shieldproperties" title="shieldproperties" style={{height: '24px', width: '404px'}} /></td>
                    </tr>
                  </tbody></table>
              </div>
            </div>
            <hr />
            <br />
            <input type="checkbox" className="sheet-pc-acother-show sheet-arrow" title="acother-show" name="attr_acother-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="other-armor-class">Other Armor Class</span>
            <div className="sheet-pc-acother">
              <div style={{float: 'left'}}>
                <table cellPadding={5} cellSpacing={0}>
                  <tbody><tr>
                      <td className="sheet-statlabel-big-gray" style={{fontSize: '1em', width: '795px'}} data-i18n="other-armor-class-i">Other AC</td>
                    </tr>
                  </tbody></table>
                <input type="checkbox" className="sheet-pc-abilityaccalc-show sheet-arrow" title="abilityaccalc-show" name="attr_abilityaccalc-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left', fontWeight: 'bold'}}><span data-i18n="ability-bonuses">Ability Bonuses</span> &nbsp; &nbsp; &nbsp; </span>
                <span> <span data-i18n="bonus-for-armor-class-i">Bonus for AC</span>:<input type="text" name="attr_totalabilityacbonus" title="totalabilityacbonus" style={{width: '29px'}} defaultValue="(@{dexacbonusinuse}*@{dexacbonus} +@{abilityac1inuse}*@{cappedabilityac1bonus} +@{abilityac2inuse}*@{cappedabilityac2bonus} +@{abilityac3inuse}*@{cappedabilityac3bonus})" disabled="true" /></span>
                <span> <span data-i18n="touch-armor-class-a">Touch AC</span>:<input type="text" name="attr_totalabilitytouchacbonus" title="totalabilitytouchacbonus" style={{width: '29px'}} defaultValue="(@{dexacbonusinuse}*@{dexacbonus} +@{abilityac1touchac}*@{abilityac1inuse}*@{cappedabilityac1bonus} +@{abilityac2touchac}*@{abilityac2inuse}*@{cappedabilityac2bonus} +@{abilityac3touchac}*@{abilityac3inuse}*@{cappedabilityac3bonus})" disabled="true" /></span>
                <span> <span data-i18n="flat-footed-armor-class-i">FF AC</span>:<input type="text" name="attr_totalabilityffacbonus" title="totalabilityffacbonus" style={{width: '29px'}} defaultValue="(@{dexacbonusinuse}*@{dexacpenalty}*(1-@{dexffac}) +@{dexacbonusinuse}*@{dexffac}*@{dexacbonus} +@{abilityac1ffac}*@{abilityac1inuse}*@{cappedabilityac1bonus} +@{abilityac2ffac}*@{abilityac2inuse}*@{cappedabilityac2bonus} +@{abilityac3ffac}*@{abilityac3inuse}*@{cappedabilityac3bonus})" disabled="true" /></span>
                <span> <span data-i18n="immobilized-armor-class-i">Immobilized AC</span>:<input type="text" name="attr_totalabilityimmoblacbonus" title="totalabilityffacbonus" style={{width: '29px'}} defaultValue="(@{dexacbonusinuse}*@{dexacpenalty} )" disabled="true" /></span>
                <br />
                <span style={{fontStyle: 'italic', fontSize: '.6em'}}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span data-i18n="ability-armor-class-info">Typically: part of AC and Touch AC. Penalty is part of FF AC and Immobilized AC, bonus is not. Capped by Armor and Load.</span></span>
                <div className="sheet-pc-abilityaccalc">
                  <div style={{float: 'left'}}>
                    <table>
                      <tbody><tr>
                          <td className="sheet-table-header2" style={{width: '20px'}}> &nbsp; </td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '205px'}} data-i18n="name">Name</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '45px'}} data-i18n="armor-class-bonus-i">AC Bonus</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '25px'}} data-i18n="capped?">Capped?</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '45px'}} data-i18n="capped-armor-class-bonus-i">Capped AC Bonus</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '25px'}} data-i18n="in-touch-armor-class?-i">In Touch AC?</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '25px'}} data-i18n="in-flat-footed-armor-class?-i">In FF AC?</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '375px'}} data-i18n="source/notes">Source/Notes</td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_dexacbonusinuse" title="dexacbonusinuse (Uncheck if Dex is not used in your AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /> <input type="text" name="attr_dexacname" title="dexacname" style={{width: '180px'}} placeholder="Dex Bonus" data-i18n-placeholder="dexterity-bonus-a" readOnly="readonly" /></td>
                          <td style={{width: '45px'}}><input type="text" name="attr_dexbonus" title="dexbonus" style={{width: '45px'}} defaultValue="@{dex-mod}" disabled="true" /></td>
                          <td style={{width: '25px'}}>Y </td>
                          <td style={{width: '45px'}}><input type="text" name="attr_dexacbonus" title="dexacbonus" style={{width: '45px'}} defaultValue="@{armorclassdexmod}" disabled="true" />
                            <input type="hidden" name="attr_dexacpenalty" title="dexacpenalty" defaultValue="( [[ (0-floor((@{dex-mod} +0.1)/(abs(@{dex-mod}+0.1) +0.001))*@{dex-mod}) ]] )" disabled="true" />
                            <input type="hidden" name="attr_armordexmod" title="armordexmod (either dex-mod or max dex from AC items section below; whichever is lower)" defaultValue="(ceil((@{dex-mod} -@{acitemdex}*(100-99*@{armorworn}))/10000000000)*@{acitemdex} - floor((@{dex-mod} -@{acitemdex}*(100-99*@{armorworn})-1)/10000000000)*@{dex-mod} )" disabled="true" />
                            <input type="hidden" name="attr_armorclassdexmod" title="armorclassdexmod (either dex-mod, max dex from AC items section, or max dex from encumbrance; whichever is lower)" defaultValue="(ceil((@{armordexmod}-@{encumbrmaxdex})/10000000000)*@{encumbrmaxdex} - floor((@{armordexmod}-@{encumbrmaxdex}-1)/10000000000)*@{armordexmod})" disabled="true" /></td>
                          {/*Special Thanks to Aaron I. for the dex/maxdex calculation!*/}
                          <td style={{width: '25px'}}>Y </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_dexffac" title="dexffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} /><span />* </td>
                          <td style={{width: '375px'}}><input type="text" style={{float: 'left', width: '375px'}} name="attr_dexacnotes" title="dexacnotes" placeholder="Limited by Armor and Load; In AC and Touch AC; *Not in FF AC(except for penalty)." data-i18n-placeholder="dexterity-armor-class-modification-info" readOnly="readonly" /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_abilityac1inuse" title="abilityac1inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_abilityac1name" title="abilityac1name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '45px'}}><input type="text" name="attr_abilityac1bonus" title="abilityac1bonus" style={{width: '45px'}} defaultValue={0} /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac1capped" title="abilityac1capped (Check if this component is capped by armor and/or encumbrance.)" defaultValue={1} style={{width: '15px'}} /><span /> </td>
                          <td style={{width: '45px'}}><input type="text" name="attr_cappedabilityac1bonus" title="cappedabilityac1bonus" style={{width: '45px'}} defaultValue="(@{abilityac1capped}*@{armorclassabilityac1mod} + (1-@{abilityac1capped})*@{abilityac1bonus})" disabled="true" />
                            <input type="hidden" name="attr_armorabilityac1" title="armorabilityac1 (either abilityac1bonus or max dex from AC items section; whichever is lower)" defaultValue="(ceil((@{abilityac1bonus} -@{acitemdex}*(100-99*@{armorworn}))/10000000000)*@{acitemdex} - floor((@{abilityac1bonus} -@{acitemdex}*(100-99*@{armorworn})-1)/10000000000)*@{abilityac1bonus} )" disabled="true" />
                            <input type="hidden" name="attr_armorclassabilityac1mod" title="armorclassabilityac1mod (either abilityac1bonus, max dex from AC items section, or max dex from encumbrance; whichever is lower)" defaultValue="(ceil((@{armorabilityac1}-@{encumbrmaxdex})/10000000000)*@{encumbrmaxdex} - floor((@{armorabilityac1}-@{encumbrmaxdex}-1)/10000000000)*@{armorabilityac1})" disabled="true" /></td>
                          {/*Special Thanks to Aaron I. for the dex/maxdex calculation!*/}
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac1touchac" title="abilityac1touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac1ffac" title="abilityac1ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} /><span /> </td>
                          <td style={{width: '375px'}}> <textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '375px'}} name="attr_abilityac1notes" title="abilityac1notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_abilityac2inuse" title="abilityac2inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_abilityac2name" title="abilityac2name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '45px'}}><input type="text" name="attr_abilityac2bonus" title="abilityac2bonus" style={{width: '45px'}} defaultValue={0} /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac2capped" title="abilityac2capped (Check if this component is capped by armor and/or encumbrance.)" defaultValue={1} style={{width: '15px'}} /><span /> </td>
                          <td style={{width: '45px'}}><input type="text" name="attr_cappedabilityac2bonus" title="cappedabilityac2bonus" style={{width: '45px'}} defaultValue="(@{abilityac2capped}*@{armorclassabilityac2mod} + (1-@{abilityac2capped})*@{abilityac2bonus})" disabled="true" />
                            <input type="hidden" name="attr_armorabilityac2" title="armorabilityac2 (either abilityac2bonus or max dex from AC items section; whichever is lower)" defaultValue="(ceil((@{abilityac2bonus} -@{acitemdex}*(100-99*@{armorworn}))/10000000000)*@{acitemdex} - floor((@{abilityac2bonus} -@{acitemdex}*(100-99*@{armorworn})-1)/10000000000)*@{abilityac2bonus} )" disabled="true" />
                            <input type="hidden" name="attr_armorclassabilityac2mod" title="armorclassabilityac2mod (either abilityac2bonus, max dex from AC items section, or max dex from encumbrance; whichever is lower)" defaultValue="(ceil((@{armorabilityac2}-@{encumbrmaxdex})/10000000000)*@{encumbrmaxdex} - floor((@{armorabilityac2}-@{encumbrmaxdex}-1)/10000000000)*@{armorabilityac2})" disabled="true" /></td>
                          {/*Special Thanks to Aaron I. for the dex/maxdex calculation!*/}
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac2touchac" title="abilityac2touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac2ffac" title="abilityac2ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} /><span /> </td>
                          <td style={{width: '375px'}}> <textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '375px'}} name="attr_abilityac2notes" title="abilityac2notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_abilityac3inuse" title="abilityac3inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_abilityac3name" title="abilityac3name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '45px'}}><input type="text" name="attr_abilityac3bonus" title="abilityac3bonus" style={{width: '45px'}} defaultValue={0} /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac3capped" title="abilityac3capped (Check if this component is capped by armor and/or encumbrance.)" defaultValue={1} style={{width: '15px'}} /><span /> </td>
                          <td style={{width: '45px'}}><input type="text" name="attr_cappedabilityac3bonus" title="cappedabilityac3bonus" style={{width: '45px'}} defaultValue="(@{abilityac3capped}*@{armorclassabilityac3mod} + (1-@{abilityac3capped})*@{abilityac3bonus})" disabled="true" />
                            <input type="hidden" name="attr_armorabilityac3" title="armorabilityac3 (either abilityac3bonus or max dex from AC items section; whichever is lower)" defaultValue="(ceil((@{abilityac3bonus} -@{acitemdex}*(100-99*@{armorworn}))/10000000000)*@{acitemdex} - floor((@{abilityac3bonus} -@{acitemdex}*(100-99*@{armorworn})-1)/10000000000)*@{abilityac3bonus} )" disabled="true" />
                            <input type="hidden" name="attr_armorclassabilityac3mod" title="armorclassabilityac3mod (either abilityac3bonus, max dex from AC items section, or max dex from encumbrance; whichever is lower)" defaultValue="(ceil((@{armorabilityac3}-@{encumbrmaxdex})/10000000000)*@{encumbrmaxdex} - floor((@{armorabilityac3}-@{encumbrmaxdex}-1)/10000000000)*@{armorabilityac3})" disabled="true" /></td>
                          {/*Special Thanks to Aaron I. for the dex/maxdex calculation!*/}
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac3touchac" title="abilityac3touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_abilityac3ffac" title="abilityac3ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} /><span /> </td>
                          <td style={{width: '375px'}}> <textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '375px'}} name="attr_abilityac3notes" title="abilityac3notes" defaultValue={""} /></td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
                <hr />
                <input type="checkbox" className="sheet-pc-armorbonuscalc-show sheet-arrow" title="armorbonuscalc-show" name="attr_armorbonuscalc-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left', fontWeight: 'bold'}}><span data-i18n="armor">Armor</span> &nbsp; &nbsp; &nbsp; </span><span> <span data-i18n="total">Total</span>:<input type="text" name="attr_totalarmorbonus" title="totalarmorbonus" style={{width: '54px'}} defaultValue="(@{armorworn}*@{armorbonus} +@{shieldworn}*@{shieldacbonus} +@{armorbonus1inuse}*@{armorbonus1bonus} +@{armorbonus2inuse}*@{armorbonus2bonus} +@{armorbonus3inuse}*@{armorbonus3bonus} +@{armorbonus4inuse}*@{armorbonus4bonus})" disabled="true" /></span> <span style={{fontStyle: 'italic', fontSize: '.6em'}} data-i18n="armor-class-info"> Component of AC and FF AC; Not component of Touch AC </span>
                <div className="sheet-pc-armorbonuscalc">
                  <div style={{float: 'left'}}>
                    <table>
                      <tbody><tr>
                          <td className="sheet-table-header2" style={{width: '20px'}}> &nbsp; </td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '205px'}} data-i18n="name">Name</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '55px'}} data-i18n="armor-class-bonus-i">AC Bonus</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '500px'}} data-i18n="source/notes">Source/Notes</td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_armorworn" title="armorworn (Check if this armor is being worn.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><input type="text" name="attr_armorbonusname" title="armorbonusname" style={{width: '180px'}} placeholder="Armor" data-i18n-placeholder="armor" readOnly="readonly" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_armorbonus" title="armorbonus" style={{width: '54px'}} defaultValue="(@{acitembonus})" disabled="true" /></td>
                          <td style={{width: '500px'}}><input type="text" style={{float: 'left', width: '500px'}} name="attr_armorbonusnotes" title="armorbonusnotes" placeholder="From Armor, above. " data-i18n-placeholder="from-armor-above" readOnly="readonly" /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_shieldworn" title="shieldworn (Check if this shield is being worn.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><input type="text" name="attr_shieldbonusname" title="shieldbonusname" style={{width: '180px'}} placeholder="Shield" data-i18n-placeholder="shield" readOnly="readonly" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_shieldacbonus" title="shieldacbonus" style={{width: '54px'}} defaultValue="(@{shieldbonus})" disabled="true" /></td>
                          <td style={{width: '500px'}}><input type="text" style={{float: 'left', width: '500px'}} name="attr_shieldbonusnotes" title="shieldbonusnotes" placeholder="From Shield, above. " data-i18n-placeholder="from-shield-above" readOnly="readonly" /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_armorbonus1inuse" title="armorbonus1inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_armorbonus1name" title="armorbonus1name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_armorbonus1bonus" title="armorbonus1bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_armorbonus1notes" title="armorbonus1notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_armorbonus2inuse" title="armorbonus2inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_armorbonus2name" title="armorbonus2name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_armorbonus2bonus" title="armorbonus2bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_armorbonus2notes" title="armorbonus2notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_armorbonus3inuse" title="armorbonus3inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_armorbonus3name" title="armorbonus3name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_armorbonus3bonus" title="armorbonus3bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_armorbonus3notes" title="armorbonus3notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_armorbonus4inuse" title="armorbonus4inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_armorbonus4name" title="armorbonus4name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_armorbonus4bonus" title="armorbonus4bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_armorbonus4notes" title="armorbonus4notes" defaultValue={""} /></td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
                <hr />
                <input type="checkbox" className="sheet-pc-naturalarmorcalc-show sheet-arrow" title="naturalarmorcalc-show" name="attr_naturalarmorcalc-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left', fontWeight: 'bold'}}><span data-i18n="natural-armor">Natural Armor</span> &nbsp; &nbsp; &nbsp; </span><span> <span data-i18n="total">Total</span>:<input type="text" name="attr_totalnaturalarmorbonus" title="totalnaturalarmorbonus" style={{width: '54px'}} defaultValue="(@{naturalarmor1inuse}*@{naturalarmor1bonus} +@{naturalarmor2inuse}*@{naturalarmor2bonus} +@{naturalarmor3inuse}*@{naturalarmor3bonus} +@{naturalarmor4inuse}*@{naturalarmor4bonus})" disabled="true" /></span> <span style={{fontStyle: 'italic', fontSize: '.6em'}} data-i18n="natural-armor-class-info"> Component of AC and FF AC; Not component of Touch AC </span>
                <div className="sheet-pc-naturalarmorcalc">
                  <div style={{float: 'left'}}>
                    <table>
                      <tbody><tr>
                          <td className="sheet-table-header2" style={{width: '20px'}}> &nbsp; </td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '205px'}} data-i18n="name">Name</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '55px'}} data-i18n="armor-class-bonus-i">AC Bonus</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '500px'}} data-i18n="source/notes">Source/Notes</td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; <input type="hidden" name="attr_armorclassnaturalarmor" title="armorclassnaturalarmor" defaultValue={0} /> {/*to prevent errors if it never existed before update*/} </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_naturalarmor1inuse" title="naturalarmor1inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} defaultChecked /> <input type="text" name="attr_naturalarmor1name" title="naturalarmor1name" style={{width: '180px'}} placeholder="Current Natural Armor Bonus" data-i18n-placeholder="current-natural-armor-bonus" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_naturalarmor1bonus" title="naturalarmor1bonus" style={{width: '54px'}} defaultValue="@{armorclassnaturalarmor}" /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_naturalarmor1notes" title="naturalarmor1notes" defaultValue={"copied from original AC calc under stats/abilities; AC section if any "} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_naturalarmor2inuse" title="naturalarmor2inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_naturalarmor2name" title="naturalarmor2name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_naturalarmor2bonus" title="naturalarmor2bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_naturalarmor2notes" title="naturalarmor2notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_naturalarmor3inuse" title="naturalarmor3inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_naturalarmor3name" title="naturalarmor3name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_naturalarmor3bonus" title="naturalarmor3bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_naturalarmor3notes" title="naturalarmor3notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_naturalarmor4inuse" title="naturalarmor4inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_naturalarmor4name" title="naturalarmor4name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_naturalarmor4bonus" title="naturalarmor4bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_naturalarmor4notes" title="naturalarmor4notes" defaultValue={""} /></td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
                <hr />
                <input type="checkbox" className="sheet-pc-dodgecalc-show sheet-arrow" title="dodgecalc-show" name="attr_dodgecalc-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left', fontWeight: 'bold'}}><span data-i18n="dodge">Dodge</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span> <span data-i18n="total">Total</span>:<input type="text" name="attr_totaldodgebonus" title="totaldodgebonus" style={{width: '54px'}} defaultValue="(@{dodgebonus1inuse}*@{dodgebonus1bonus} +@{dodgebonus2inuse}*@{dodgebonus2bonus} +@{dodgebonus3inuse}*@{dodgebonus3bonus} +@{dodgebonus4inuse}*@{dodgebonus4bonus})" disabled="true" /></span> <span style={{fontStyle: 'italic', fontSize: '.6em'}} data-i18n="dodge-armor-class-info"> Component of AC and Touch AC; Not a component of FF AC. </span>
                <div className="sheet-pc-dodgecalc">
                  <div style={{float: 'left'}}>
                    <table>
                      <tbody><tr>
                          <td className="sheet-table-header2" style={{width: '20px'}}> &nbsp; </td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '205px'}} data-i18n="name">Name</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '55px'}} data-i18n="armor-class-bonus-i">AC Bonus</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '500px'}} data-i18n="source/notes">Source/Notes</td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; <input type="hidden" name="attr_armorclassdodgemod" title="armorclassdodgemod" defaultValue={0} /> {/*to prevent errors if it never existed before update*/} </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_dodgebonus1inuse" title="dodgebonus1inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} defaultChecked /> <input type="text" name="attr_dodgebonus1name" title="dodgebonus1name" style={{width: '180px'}} placeholder="Current Dodge Bonus" data-i18n-placeholder="current-dodge-bonus" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_dodgebonus1bonus" title="dodgebonus1bonus" style={{width: '54px'}} defaultValue="@{armorclassdodgemod}" /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_dodgebonus1notes" title="dodgebonus1notes" defaultValue={"copied from original AC calc under stats/abilities; AC section if any"} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_dodgebonus2inuse" title="dodgebonus2inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_dodgebonus2name" title="dodgebonus2name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_dodgebonus2bonus" title="dodgebonus2bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_dodgebonus2notes" title="dodgebonus2notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_dodgebonus3inuse" title="dodgebonus3inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_dodgebonus3name" title="dodgebonus3name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_dodgebonus3bonus" title="dodgebonus3bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_dodgebonus3notes" title="dodgebonus3notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_dodgebonus4inuse" title="dodgebonus4inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_dodgebonus4name" title="dodgebonus4name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_dodgebonus4bonus" title="dodgebonus4bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_dodgebonus4notes" title="dodgebonus4notes" defaultValue={""} /></td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
                <hr />
                <input type="checkbox" className="sheet-pc-deflectioncalc-show sheet-arrow" title="deflectioncalc-show" name="attr_deflectioncalc-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left', fontWeight: 'bold'}}><span data-i18n="deflection">Deflection</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span> <span data-i18n="total">Total</span>:<input type="text" name="attr_totaldeflectionbonus" title="totaldeflectionbonus" style={{width: '54px'}} defaultValue="(@{deflection1inuse}*@{deflection1bonus} +@{deflection2inuse}*@{deflection2bonus} +@{deflection3inuse}*@{deflection3bonus} +@{deflection4inuse}*@{deflection4bonus})" disabled="true" /></span> <span style={{fontStyle: 'italic', fontSize: '.6em'}} data-i18n="deflection-armor-class-info"> Component of AC, Touch AC, and FF AC. </span>
                <div className="sheet-pc-deflectioncalc">
                  <div style={{float: 'left'}}>
                    <table>
                      <tbody><tr>
                          <td className="sheet-table-header2" style={{width: '20px'}}> &nbsp; </td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '205px'}} data-i18n="name">Name</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '55px'}} data-i18n="armor-class-bonus-i">AC Bonus</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '500px'}} data-i18n="source/notes">Source/Notes</td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; <input type="hidden" name="attr_armorclassdeflectionmod" title="armorclassdeflectionmod" defaultValue={0} /> {/*to prevent errors if it never existed before update*/} </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_deflection1inuse" title="deflection1inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} defaultChecked /> <input type="text" name="attr_deflection1name" title="deflection1name" style={{width: '180px'}} placeholder="Current Deflection Bonus" data-i18n-placeholder="current-deflection-bonus" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_deflection1bonus" title="deflection1bonus" style={{width: '54px'}} defaultValue="@{armorclassdeflectionmod}" /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_deflection1notes" title="deflection1notes" defaultValue={"copied from original AC calc under stats/abilities; AC section if any"} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_deflection2inuse" title="deflection2inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_deflection2name" title="deflection2name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_deflection2bonus" title="deflection2bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_deflection2notes" title="deflection2notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_deflection3inuse" title="deflection3inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_deflection3name" title="deflection3name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_deflection3bonus" title="deflection3bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_deflection3notes" title="deflection3notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_deflection4inuse" title="deflection4inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_deflection4name" title="deflection4name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_deflection4bonus" title="deflection4bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '500px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '500px'}} name="attr_deflection4notes" title="deflection4notes" defaultValue={""} /></td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
                <hr />
                <input type="checkbox" className="sheet-pc-miscaccalc-show sheet-arrow" title="miscaccalc-show" name="attr_miscaccalc-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left', fontWeight: 'bold'}}><span data-i18n="miscellaneous-armor-class-i">Misc AC</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span> <span data-i18n="bonus-for-armor-class-i">Bonus for AC</span>:<input type="text" name="attr_totalmiscacbonus" title="totalmiscacbonus" style={{width: '29px'}} defaultValue="(@{miscac1inuse}*@{miscac1stdac}*@{miscac1bonus}*@{miscac1stdac} +@{miscac2inuse}*@{miscac2stdac}*@{miscac2bonus} +@{miscac3inuse}*@{miscac3stdac}*@{miscac3bonus} +@{miscac4inuse}*@{miscac4stdac}*@{miscac4bonus} +@{miscac5inuse}*@{miscac5stdac}*@{miscac5bonus} +@{miscac6inuse}*@{miscac6stdac}*@{miscac6bonus})" disabled="true" /></span>
                <span> <span data-i18n="touch-armor-class-a">Touch AC</span>:<input type="text" name="attr_totalmisctouchacbonus" title="totalmisctouchacbonus" style={{width: '29px'}} defaultValue="(@{miscac1inuse}*@{miscac1touchac}*@{miscac1bonus} +@{miscac2inuse}*@{miscac2touchac}*@{miscac2bonus} +@{miscac3inuse}*@{miscac3touchac}*@{miscac3bonus} +@{miscac4inuse}*@{miscac4touchac}*@{miscac4bonus} +@{miscac5inuse}*@{miscac5touchac}*@{miscac5bonus} +@{miscac6inuse}*@{miscac6touchac}*@{miscac6bonus})" disabled="true" /></span>
                <span> <span data-i18n="flat-footed-armor-class-i">FF AC</span>:<input type="text" name="attr_totalmiscffacbonus" title="totalmiscffacbonus" style={{width: '29px'}} defaultValue="(@{miscac1inuse}*@{miscac1ffac}*@{miscac1bonus} +@{miscac2inuse}*@{miscac2ffac}*@{miscac2bonus} +@{miscac3inuse}*@{miscac3ffac}*@{miscac3bonus} +@{miscac4inuse}*@{miscac4ffac}*@{miscac4bonus} +@{miscac5inuse}*@{miscac5ffac}*@{miscac5bonus} +@{miscac6inuse}*@{miscac6ffac}*@{miscac6bonus})" disabled="true" /></span>
                <span> <span data-i18n="immobilized-armor-class-i">Immobilized AC</span>:<input type="text" name="attr_totalmiscimmoblacbonus" title="totalmiscffacbonus" style={{width: '29px'}} defaultValue="(@{miscac1inuse}*@{miscac1immoblac}*@{miscac1bonus} +@{miscac2inuse}*@{miscac2immoblac}*@{miscac2bonus} +@{miscac3inuse}*@{miscac3immoblac}*@{miscac3bonus} +@{miscac4inuse}*@{miscac4immoblac}*@{miscac4bonus} +@{miscac5inuse}*@{miscac5immoblac}*@{miscac5bonus} +@{miscac6inuse}*@{miscac6immoblac}*@{miscac6bonus})" disabled="true" /></span>
                <span style={{fontStyle: 'italic', fontSize: '.6em'}} data-i18n="miscellaneous-armor-class-info"> Potential component of AC, Touch AC, FF or Immobilized AC. </span>
                <div className="sheet-pc-miscaccalc">
                  <div style={{float: 'left'}}>
                    <table>
                      <tbody><tr>
                          <td className="sheet-table-header2" style={{width: '20px'}}> &nbsp; </td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '205px'}} data-i18n="name">Name</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '55px'}} data-i18n="armor-class-bonus-i">AC Bonus</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '25px'}} data-i18n="in-armor-class?-i">In AC?</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '25px'}} data-i18n="in-touch-armor-class?-i">In Touch AC?</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '25px'}} data-i18n="in-flat-footed-armor-class?-i">In FF AC?</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '25px'}} data-i18n="in-immobilized-armor-class?-i">In Immobl AC?</td>
                          <td className="sheet-table-header2" style={{fontSize: '0.65em', width: '390px'}} data-i18n="source/notes">Source/Notes</td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; <input type="hidden" name="attr_armorclassmiscmod" title="armorclassmiscmod" defaultValue={0} /> {/*to prevent errors if it never existed before update*/} </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_miscac1inuse" title="miscac1inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} defaultChecked /> <input type="text" name="attr_miscac1name" title="miscac1name" style={{width: '180px'}} placeholder="Current Misc AC Bonus" data-i18n-placeholder="current-miscellaneous-armor-class-bonus" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_miscac1bonus" title="miscac1bonus" style={{width: '54px'}} defaultValue="@{armorclassmiscmod}" /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac1stdac" title="miscac1stdac (Check if this component is part of AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac1touchac" title="miscac1touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac1ffac" title="miscac1ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac1immoblac" title="miscac1immoblac (Check if this component is part of Immobilized AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '390px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '390px'}} name="attr_miscac1notes" title="miscac1notes" defaultValue={"copied from original AC calc under stats/abilities; AC section if any"} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_miscac2inuse" title="miscac2inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_miscac2name" title="miscac2name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_miscac2bonus" title="miscac2bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac2stdac" title="miscac2stdac (Check if this component is part of AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac2touchac" title="miscac2touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac2ffac" title="miscac2ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac2immoblac" title="miscac2immoblac (Check if this component is part of Immobilized AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '390px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '390px'}} name="attr_miscac2notes" title="miscac2notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_miscac3inuse" title="miscac3inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_miscac3name" title="miscac3name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_miscac3bonus" title="miscac3bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac3stdac" title="miscac3stdac (Check if this component is part of AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac3touchac" title="miscac3touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac3ffac" title="miscac3ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac3immoblac" title="miscac3immoblac (Check if this component is part of Immobilized AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '390px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '390px'}} name="attr_miscac3notes" title="miscac3notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_miscac4inuse" title="miscac4inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_miscac4name" title="miscac4name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_miscac4bonus" title="miscac4bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac4stdac" title="miscac4stdac (Check if this component is part of AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac4touchac" title="miscac4touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac4ffac" title="miscac4ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac4immoblac" title="miscac4immoblac (Check if this component is part of Immobilized AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '390px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '390px'}} name="attr_miscac4notes" title="miscac4notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_miscac5inuse" title="miscac5inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_miscac5name" title="miscac5name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_miscac5bonus" title="miscac5bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac5stdac" title="miscac5stdac (Check if this component is part of AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac5touchac" title="miscac5touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac5ffac" title="miscac5ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac5immoblac" title="miscac5immoblac (Check if this component is part of Immobilized AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '390px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '390px'}} name="attr_miscac5notes" title="miscac5notes" defaultValue={""} /></td>
                        </tr>
                        <tr className="sheet-table-row">
                          <td style={{width: '20px'}}> &nbsp; </td>
                          <td style={{width: '205px'}}><input type="checkbox" name="attr_miscac6inuse" title="miscac6inuse (Check if this component is in use.)" defaultValue={1} style={{width: '15px'}} /> <input type="text" name="attr_miscac6name" title="miscac6name" style={{width: '180px'}} placeholder="Name" data-i18n-placeholder="name" /></td>
                          <td style={{width: '55px'}}><input type="text" name="attr_miscac6bonus" title="miscac6bonus" style={{width: '54px'}} defaultValue={0} /></td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac6stdac" title="miscac6stdac (Check if this component is part of AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac6touchac" title="miscac6touchac (Check if this component is part of Touch AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac6ffac" title="miscac6ffac (Check if this component is part of Flat Footed AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '25px'}}><input type="checkbox" className="sheet-yesno" name="attr_miscac6immoblac" title="miscac6immoblac (Check if this component is part of Immobilized AC.)" defaultValue={1} style={{width: '15px'}} defaultChecked /><span /> </td>
                          <td style={{width: '390px'}}><textarea rows={1} cols={55} style={{float: 'left', height: '18px', width: '390px'}} name="attr_miscac6notes" title="miscac6notes" defaultValue={""} /></td>
                        </tr>
                      </tbody></table>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="sheet-tab-content sheet-tab4 sheet-tab99">
            {/*Equipment*/}
            <input type="checkbox" className="sheet-pc-encumbrance-show sheet-arrow" title="encumbrance-show" name="attr_encumbrance-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="encumbrance/load">Encumbrance/Load</span>
            <div className="sheet-pc-encumbrance">
              <div style={{float: 'left'}}>
                <table cellPadding={10} cellSpacing={0}>
                  <tbody><tr>
                      <td colSpan={3} className="sheet-statlabel-big-gray" style={{fontSize: '1.5em', width: '790px'}} data-i18n="encumbrance-and-load">Encumbrance and Load</td>
                    </tr>
                  </tbody></table>
                <table cellPadding={0} cellSpacing={0}>
                  <tbody><tr>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="light-load"> Light Load </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="medium-load"> Medium Load </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="heavy-load"> Heavy Load </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="lift-over-head-a"> Lift Over </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="lift-off-ground"> Lift Off Ground </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-encumbrance" data-i18n="push/drag"> Push/ Drag </td>
                    </tr>
                    <tr>
                      <td><input type="hidden" name="attr_encumbrstr" title="encumbrstr" defaultValue={0} />
                        <input className="sheet-inputbox" type="text" name="attr_lightloadmax" title="lightloadmax" style={{height: '24px', width: '53px', textAlign: 'right'}} disabled="true" defaultValue="floor(@{encumbrsize}*(floor(@{encumbrstr}/3))*(@{weightscale}))" /><span name="attr_weightunit" title="weightunit" /> <span data-i18n="or-less">or less</span>.</td>
                      <td><input className="sheet-inputbox" type="text" name="attr_medloadmin" title="medloadmin" style={{height: '24px', width: '53px', textAlign: 'right'}} disabled="true" defaultValue="floor(@{encumbrsize}*(floor(@{encumbrstr}/3)*(@{weightscale}))+1)" />-<input className="sheet-inputbox" type="text" name="attr_medloadmax" title="medloadmax" style={{height: '24px', width: '53px', textAlign: 'left'}} disabled="true" defaultValue="floor(@{encumbrsize}*(floor(2*@{encumbrstr}/3))*(@{weightscale}))" /><span name="attr_weightunit" title="weightunit" />.</td>
                      <td><input className="sheet-inputbox" type="text" name="attr_heavyloadmin" title="heavyloadmin" style={{height: '24px', width: '53px', textAlign: 'right'}} disabled="true" defaultValue="floor(@{encumbrsize}*(floor(2*@{encumbrstr}/3)*(@{weightscale}))+1)" />-<input className="sheet-inputbox" type="text" name="attr_heavyloadmax" title="heavyloadmax" style={{height: '24px', width: '53px', textAlign: 'left'}} disabled="true" defaultValue="floor(@{encumbrsize}*(@{encumbrstr})*(@{weightscale}))" /><span name="attr_weightunit" title="weightunit" />.</td>
                      <td><input className="sheet-inputbox" type="text" name="attr_liftovermax" title="liftovermax" style={{height: '24px', width: '53px', textAlign: 'right'}} disabled="true" defaultValue="floor(@{encumbrsize}*(@{encumbrstr})*(@{weightscale}))" /><span name="attr_weightunit" title="weightunit" /> <span data-i18n="or-less">or less</span>.</td>
                      <td><input className="sheet-inputbox" type="text" name="attr_liftoffmax" title="liftoffmax" style={{height: '24px', width: '53px', textAlign: 'right'}} disabled="true" defaultValue="floor(@{encumbrsize}*(2*(@{encumbrstr}))*(@{weightscale}))" /><span name="attr_weightunit" title="weightunit" /> <span data-i18n="or-less">or less</span>.</td>
                      <td><input className="sheet-inputbox" type="text" name="attr_pushdragmax" title="pushdragmax" style={{height: '24px', width: '58px', textAlign: 'right'}} disabled="true" defaultValue="floor(@{encumbrsize}*(5*(@{encumbrstr}))*(@{weightscale}))" /><span name="attr_weightunit" title="weightunit" /> <span data-i18n="or-less">or less</span>.</td>
                    </tr>
                  </tbody></table>
                <table cellPadding={0} cellSpacing={0}>
                  <tbody><tr>
                      <td className="sheet-statlabel-encumbrance" style={{width: '80px'}} data-i18n="weight-carried"> Weight Carried </td>
                      <td className="sheet-statlabel-encumbrance" style={{width: '165px'}} data-i18n="character-size-a"> Char Size </td>
                      <td className="sheet-statlabel-encumbrance" style={{width: '80px'}} data-i18n=" data-i18n="> Load </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-load" data-i18n="maximum-dexterity-a"> Max Dex </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-load" data-i18n="check-penalty"> Check Penalty </td>
                      <td className="sheet-statlabel-encumbrance sheet-table-load" data-i18n="speed-30ft"> Speed (30 ft.)</td>
                      <td className="sheet-statlabel-encumbrance sheet-table-load" data-i18n="speed-20ft"> Speed (20 ft.)</td>
                      <td className="sheet-statlabel-encumbrance sheet-table-load" data-i18n="run"> Run</td>
                    </tr>
                    <tr>
                      <td><input className="sheet-inputbox" type="text" name="attr_totalcarriedweight" title="totalcarriedweight" style={{height: '24px', width: '75px'}} defaultValue={0} /></td>
                      <td><select style={{height: '24px', width: '160px', padding: '0px'}} name="attr_encumbrsize" title="encumbrsize">
                          <option value={16} data-i18n="colossal">Colossal</option>
                          <option value={8} data-i18n="gargantuan">Gargantuan</option>
                          <option value={4} data-i18n="huge">Huge</option>
                          <option value={2} data-i18n="large">Large</option>
                          <option value={1} data-i18n="medium" selected>Medium</option>
                          <option value=".75" data-i18n="small">Small</option>
                          <option value=".5" data-i18n="tiny">Tiny</option>
                          <option value=".25" data-i18n="diminutive">Diminutive</option>
                          <option value=".125" data-i18n="fine">Fine</option>
                          <option value={24} data-i18n="colossal-quadruped">Colossal Quadruped</option>
                          <option value={12} data-i18n="gargantuan-quadruped">Gargantuan Quadruped</option>
                          <option value={6} data-i18n="huge-quadruped">Huge Quadruped</option>
                          <option value={3} data-i18n="large-quadruped">Large Quadruped</option>
                          <option value="1.5" data-i18n="medium-quadruped">Medium Quadruped</option>
                          <option value="1.00000001" data-i18n="small-quadruped">Small Quadruped</option>
                          <option value=".7500000001" data-i18n="tiny-quadruped">Tiny Quadruped</option>
                          <option value=".500000001" data-i18n="diminutive-quadruped">Diminutive Quadruped</option>
                          <option value=".2500000001" data-i18n="fine-quadruped">Fine Quadruped</option>
                        </select></td>
                      <td><select style={{height: '24px', width: '75px', padding: '0px'}} name="attr_encumbrload" title="encumbrload (choose the category from above)">
                          <option type="text" value="0.1" data-i18n="light" selected>Light</option>
                          <option type="text" value={-3} data-i18n="medium">Medium</option>
                          <option type="text" value={-6} data-i18n="heavy">Heavy</option>
                        </select></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_encumbrmaxdex" title="encumbrmaxdex" style={{height: '24px', width: '45px'}} defaultValue="floor(abs(9/(@{encumbrload})))" disabled="true" /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_encumbracp" title="encumbracp" style={{height: '24px', width: '45px'}} defaultValue="floor(@{encumbrload})" disabled="true" /></td>
                      <td><input className="sheet-inputbox" type="text" name="attr_encumbrspeed30" title="encumbrspeed30" style={{height: '24px', width: '45px', textAlign: 'right'}} defaultValue="30-floor(@{encumbrload})/(@{encumbrload})*10" disabled="true" /><span data-i18n="feet-i">ft</span>.</td>
                      <td><input className="sheet-inputbox" type="text" name="attr_encumbrspeed20" title="encumbrspeed20" style={{height: '24px', width: '45px', textAlign: 'right'}} defaultValue="20-floor(@{encumbrload})/(@{encumbrload})*5" disabled="true" /><span data-i18n="feet-i">ft</span>.</td>
                      <td>x<input className="sheet-inputbox" type="text" name="attr_encumbrrun" title="encumbrrun" style={{height: '24px', width: '45px'}} defaultValue="4-floor((@{encumbrload}+3)/3*@{encumbrload})/6" disabled="true" /></td>
                    </tr>
                  </tbody></table>
              </div>
              <hr />
            </div>
            <br />
            <input type="checkbox" className="sheet-pc-equipment-show sheet-arrow" title="equipment-show" name="attr_equipment-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="equipment">Equipment</span>
            <div className="sheet-pc-equipment">
              <div style={{float: 'left'}}>
                <table cellPadding={10} cellSpacing={0}>
                  <tbody><tr>
                      <td colSpan={3} className="sheet-statlabel-big-gray" style={{fontSize: '1.5em', width: '790px'}} data-i18n="equipment">Equipment</td>
                    </tr>
                  </tbody></table>
                <br />
                <input type="checkbox" className="sheet-pc-singleuseequipment-show sheet-arrow" title="singleuseequipment-show" name="attr_singleuseequipment-show" defaultValue={1} /><span style={{textAlign: 'left', fontWeight: 'bold'}} data-i18n="single-use-items">Single Use Items</span>
                <div className="sheet-pc-singleuseequipment">
                  <div style={{float: 'left'}}>
                    <br />
                    <fieldset className="repeating_magicitems">
                      <table>
                        <tbody><tr>
                            <td style={{width: '790px'}}><input type="text" name="attr_singleusemagicitems" title="repeating_magicitems_#_singleusemagicitem" style={{width: '790px'}} /></td>
                          </tr>
                        </tbody></table>
                    </fieldset>
                  </div>
                  <hr />
                </div>
                <br />
                <input type="checkbox" className="sheet-pc-stdequipment-show sheet-arrow" title="stdequipment-show" name="attr_stdequipment-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left', fontWeight: 'bold'}} data-i18n="equipment">Equipment</span>
                <div className="sheet-pc-stdequipment">
                  <div style={{float: 'left'}}> {/* from Chaotic Law */}
                    <table>
                      <tbody><tr className="sheet-table-header">
                          <td style={{width: '225px'}} data-i18n="name">Name</td>
                          <td style={{width: '30px'}} data-i18n="quantity-a">Qty</td>
                          <td style={{width: '45px'}} data-i18n="cost(gp)">Cost (gp)</td>
                          <td style={{width: '45px'}} data-i18n="total-cost(gp)-i">T_Cost (gp)</td>
                          <td style={{width: '40px'}} data-i18n="weight-a">Wt (<span name="attr_weightunit" title="weightunit" />)</td>
                          <td style={{width: '40px'}} data-i18n="total-weight-a">T_Wt (<span name="attr_weightunit" title="weightunit" />)</td>
                          <td style={{width: '30px'}} data-i18n="hitpoints-i">HPs</td>
                          <td style={{width: '30px'}} data-i18n="hardness-a">Hard</td>
                          <td style={{width: '90px'}} data-i18n="location">Location</td>
                          <td style={{width: '220px'}} data-i18n="notes">Notes</td>
                        </tr>
                      </tbody></table>
                    <fieldset className="repeating_equipment">
                      <table style={{width: '350px'}} className="sheet-table-row">
                        <tbody><tr className="sheet-table-row">
                            <td><input type="text" style={{width: '225px'}} name="attr_equipmentname" title="repeating_equipment_#_equipmentname" /></td>
                            <td><input type="text" style={{width: '30px'}} name="attr_equipmentquantity" title="repeating_equipment_#_equipmentquantity" defaultValue={0} /></td>
                            <td><input type="text" style={{width: '45px'}} name="attr_equipmentcost" title="repeating_equipment_#_equipmentcost" defaultValue={0} /></td>
                            <td><input type="text" style={{width: '45px'}} name="attr_equipmenttotalcost" title="repeating_equipment_#_equipmenttotalcost" defaultValue={0} /></td>
                            <td><input type="text" style={{width: '40px'}} name="attr_equipmentweight" title="repeating_equipment_#_equipmentweight" defaultValue={0} /></td>
                            <td><input type="text" style={{width: '40px'}} name="attr_equipmenttotalweight" title="repeating_equipment_#_equipmenttotalweight" defaultValue={0} /></td>
                            <td><input type="text" style={{width: '30px'}} name="attr_equipmenthitpoints" title="repeating_equipment_#_equipmenthitpoints" /></td>
                            <td><input type="text" style={{width: '30px'}} name="attr_equipmenthardness" title="repeating_equipment_#_equipmenthardness" /></td>
                            <td><input type="text" style={{width: '90px'}} name="attr_equipmentlocation" title="repeating_equipment_#_equipmentlocation" /></td>
                            <td><textarea rows={1} style={{height: '22px', width: '205px', padding: '0px', borderStyle: 'none none solid none', borderWidth: '0px 0px 1px 0px', verticalAlign: 'top'}} name="attr_equipmentnotes" title="repeating_equipment_#_equipmentnotes" defaultValue={""} /></td>
                          </tr>
                        </tbody></table>
                    </fieldset>
                    <table>
                      <tbody><tr>
                          <td style={{width: '30px'}}> </td>
                          <td style={{width: '90px'}}> &nbsp; <span data-i18n="total-cost">Total Cost</span>:</td>
                          <td><input type="text" style={{width: '55px', textAlign: 'right'}} name="attr_totalequipmentcost" title="totalequipmentcost" defaultValue={0} /><span data-i18n="gold-pieces-i">gp</span>. </td>
                          <td style={{width: '25px'}}> </td>
                          <td style={{width: '90px', textAlign: 'right'}} data-i18n="total-weight">Total Weight:</td>
                          <td><input type="text" style={{width: '55px', textAlign: 'right'}} name="attr_totalequipmentweight" title="totalequipmentweight" defaultValue={0} /><span name="attr_weightunit" title="weightunit" />. &nbsp; </td>
                          <td style={{width: '200px'}}><select style={{height: '24px', width: '160px', padding: '0px'}} name="attr_equipmentweightcopy" title="equipmentweightcopy (If you change this input to Copied, the total weight will be copied to Weight Carried above. This is not reversable! If changed back, it will merely stop copying the weight but the original value will still be lost.)">
                              <option value={0} data-i18n="not-copied" selected>Not Copied</option>
                              <option value={1} data-i18n="total-weight-copied">Total Weight Copied to Weight Carried</option>
                            </select></td>
                        </tr>
                      </tbody></table>
                  </div>
                  <hr />
                </div>
                <br />
                <input type="checkbox" className="sheet-pc-magicequipment-show sheet-arrow" title="magicequipment-show" name="attr_magicequipment-show" defaultValue={1} /><span style={{textAlign: 'left', fontWeight: 'bold'}} data-i18n="magic-items">Magic Items</span>
                <div className="sheet-pc-magicequipment">
                  <div style={{float: 'left'}}>
                    <textarea rows={6} cols={55} style={{float: 'left', width: '790px'}} name="attr_magicitems" title="magicitems" defaultValue={""} />
                  </div>
                  <hr />
                </div>
                <br />
                <input type="checkbox" className="sheet-pc-otherequipment-show sheet-arrow" title="otherequipment-show" name="attr_otherequipment-show" defaultValue={1} /><span style={{textAlign: 'left', fontWeight: 'bold'}} data-i18n="other-items">Other Items</span>
                <div className="sheet-pc-otherequipment">
                  <div style={{float: 'left'}}>
                    <textarea rows={6} cols={55} style={{float: 'left', width: '790px'}} name="attr_otheritems" title="otheritems" defaultValue={""} />
                  </div>
                  <hr />
                </div>
                <br />
                <br />
                <b><span data-i18n="money">Money</span></b><div className="sheet-table-row">
                  <span className="sheet-table-data-center"><input type="text" name="attr_copper" title="copper" style={{width: '96px'}} /><br /><span data-i18n="copper-pieces-iu">CP</span></span>
                  <span className="sheet-table-data-center"><input type="text" name="attr_silver" title="silver" style={{width: '96px'}} /><br /><span data-i18n="silver-pieces-iu">SP</span></span>
                  <span className="sheet-table-data-center"><input type="text" name="attr_gold" title="gold" style={{width: '96px'}} /><br /><span data-i18n="gold-pieces-iu">GP</span></span>
                  <span className="sheet-table-data-center"><input type="text" name="attr_platinum" title="platinum" style={{width: '96px'}} /><br /><span data-i18n="platinum-pieces-iu">PP</span></span>
                </div><table>
                  <tbody><tr>
                    </tr>
                    <tr>
                    </tr>
                  </tbody></table>
                <br />
                <b><span data-i18n="other">Other</span></b><br />
                <textarea rows={4} cols={55} style={{float: 'left', width: '790px'}} name="attr_otherinfo" title="otherinfo" defaultValue={""} />
                <br />
              </div>
              <hr />
            </div>
          </div>
          <div className="sheet-tab-content sheet-tab5 sheet-tab99">
            {/*Skills*/}
            <input type="checkbox" className="sheet-pc-skills-show sheet-arrow" title="skills-show" name="attr_skills-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="skills">Skills</span>
            <div className="sheet-pc-skills">
              <div style={{float: 'left'}}>
                <table cellPadding={0} cellSpacing={0}>
                  <tbody><tr>
                      <td colSpan={9} className="sheet-statlabel-big-gray" style={{height: '35px', width: '790px'}}><b style={{fontSize: '1.5em'}} data-i18n="skills">Skills</b></td>
                    </tr><tr>
                      <td colSpan={9} className="sheet-statlabel-big" style={{width: '790px'}}><span data-i18n="skill-points-per-level-a">skill points/lvl</span>=<input type="text" name="attr_skillpoints" title="skillpoints" defaultValue="@{skillpointsint}+@{skillpointsclass}" style={{width: '40px', color: 'white'}} disabled="true" />=(<input type="text" name="attr_skillpointsint" defaultValue="(floor((@{int-base}) / 2) - 5)[base int bonus]" title="skillpointsint (Skill points/lvl from base int.)" style={{width: '35px', color: 'white'}} disabled="true" />+<input type="text" name="attr_skillpointsclass" defaultValue={2} title="skillpointsclass (Skill points/lvl from class; humans add+1.)" style={{width: '35px', color: 'white'}} />)</td>
                    </tr>
                    <tr><td>
                        <table>
                          <tbody><tr>
                              <td className="sheet-table-header2" style={{width: '8px'}}>&nbsp;</td>
                              <td className="sheet-table-header2-left" data-i18n="skill-names">Skill Names</td>
                              <td className="sheet-table-header2" data-i18n="total-bonus-s">Total<br />Bonus</td>
                              <td className="sheet-table-header2" data-i18n="stat">Stat</td>
                              <td className="sheet-table-header2" data-i18n="ability-modifier-as">Ability<br />Mod.</td>
                              <td className="sheet-table-header2" data-i18n="ranks">Ranks</td>
                              <td className="sheet-table-header2" data-i18n="armor-penalty-s">Armor<br />Penalty</td>
                              <td className="sheet-table-header2" data-i18n="miscellaneous-modifier-as">Misc<br />Mod.</td>
                              <td className="sheet-table-header2" data-i18n="notes">Notes</td>
                              <td className="sheet-table-header2" data-i18n="macro">Macro</td>
                              <td className="sheet-table-header2">&nbsp;</td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_appraiseclassskill" title="appraiseclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="appraise">Appraise</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_appraise" title="appraise" defaultValue="(@{int-mod} +@{appraiseranks} +@{appraisemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_appraiseranks" title="appraiseranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_appraisemiscmod" title="appraisemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_appraisenote" title="appraisenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_appraisemacro" title="appraisemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Appraise](http://www.dandwiki.com/wiki/SRD:Appraise_Skill ) check:}} {{checkroll=[[1d20 + [[@{appraise}]] ]] }} {{notes=@{appraisenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_appraisecheck" title="appraisecheck" value="@{appraisemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_balanceclassskill" title="balanceclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="balance">Balance</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_balance" title="balance" defaultValue="(@{dex-mod} +@{balanceranks} +@{balancemiscmod} +@{balancearmorcheckpen} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_balanceranks" title="balanceranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_balancearmorcheckpen" title="balancearmorcheckpen" style={{width: '28px'}} defaultValue="@{armorcheckpenalty} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_balancemiscmod" title="balancemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_balancenote" title="balancenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_balancemacro" title="balancemacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Balance](http://www.dandwiki.com/wiki/SRD:Balance_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{balance} ]] ]] }} {{notes=@{balancenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_balancecheck" title="balancecheck" value="@{balancemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_bluffclassskill" title="bluffclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="bluff">Bluff</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_bluff" title="bluff" defaultValue="(@{cha-mod} +@{bluffranks} +@{bluffmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_bluffranks" title="bluffranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_bluffmiscmod" title="bluffmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_bluffnote" title="bluffnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_bluffmacro" title="bluffmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Bluff](http://www.dandwiki.com/wiki/SRD:Bluff_Skill ) check:}} {{checkroll=[[1d20 + [[@{bluff}]] ]] }} {{notes=@{bluffnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_bluffcheck" title="bluffcheck" value="@{bluffmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_climbclassskill" title="climbclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="climb">Climb</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_climb" title="climb" defaultValue="(@{climbstat} +@{climbranks} +@{climbmiscmod} +@{climbarmorcheckpen} )" disabled="true" /></td>
                              <td className="sheet-table-data-center"><select className="sheet-table-data-center-sm" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_climbstat" title="climbstat">
                                  <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                  <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                </select></td>
                              {/*td class="sheet-table-data-center-sm">= Str</td*/}
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_climbstatmod" title="climbstatmod" defaultValue="@{climbstat}" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_climbranks" title="climbranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_climbarmorcheckpen" title="climbarmorcheckpen" style={{width: '28px'}} defaultValue="@{armorcheckpenalty} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_climbmiscmod" title="climbmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_climbnote" title="climbnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_climbmacro" title="climbmacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Climb](http://www.dandwiki.com/wiki/SRD:Climb_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{climb} ]] ]] }} {{notes=@{climbnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_climbcheck" title="climbcheck" value="@{climbmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_concentrationclassskill" title="concentrationclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="concentration">Concentration</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_concentration" title="concentration" defaultValue="(@{con-mod} +@{concentrationranks} +@{concentrationmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="constitution-a">Con</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_conmod" title="conmod" defaultValue="@{con-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_concentrationranks" title="concentrationranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_concentrationmiscmod" title="concentrationmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_concentrationnote" title="concentrationnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_concentrationmacro" title="concentrationmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Concentration](http://www.dandwiki.com/wiki/SRD:Concentration_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{concentration} ]] ]] }} {{notes=@{concentrationnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_concentrationcheck" title="concentrationcheck" value="@{concentrationmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_craft1classskill" title="craft1classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="craft">Craft</span> <input type="text" name="attr_craft1name" title="craft1name" style={{fontSize: '0.95em', width: '100px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_craft1" title="craft1" defaultValue="(@{int-mod} +@{craft1ranks} +@{craft1miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_craft1ranks" title="craft1ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_craft1miscmod" title="craft1miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_craft1note" title="craft1note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_craft1macro" title="craft1macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Craft](http://www.dandwiki.com/wiki/SRD:Craft_Skill ) (@{craft1name}) check:}} {{checkroll= [[ 1d20 + [[ @{craft1} ]] +(?{Artisan's Tools? |None, -2|Normal, 0|Masterwork, 2})[Tool Circumstance Bonus] ]] }} {{notes=@{craft1note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_craft1check" title="craft1check" value="@{craft1macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_craft2classskill" title="craft2classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="craft">Craft</span> <input type="text" name="attr_craft2name" title="craft2name" style={{fontSize: '0.95em', width: '100px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_craft2" title="craft2" defaultValue="(@{int-mod} +@{craft2ranks} +@{craft2miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_craft2ranks" title="craft2ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_craft2miscmod" title="craft2miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_craft2note" title="craft2note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_craft2macro" title="craft2macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Craft](http://www.dandwiki.com/wiki/SRD:Craft_Skill ) (@{craft2name}) check:}} {{checkroll= [[ 1d20 + [[ @{craft2} ]] +(?{Artisan's Tools? |None, -2|Normal, 0|Masterwork, 2})[Tool Circumstance Bonus] ]] }} {{notes=@{craft2note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_craft2check" title="craft2check" value="@{craft2macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_craft3classskill" title="craft3classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="craft">Craft</span> <input type="text" name="attr_craft3name" title="craft3name" style={{fontSize: '0.95em', width: '100px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_craft3" title="craft3" defaultValue="(@{int-mod} +@{craft3ranks} +@{craft3miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_craft3ranks" title="craft3ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_craft3miscmod" title="craft3miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_craft3note" title="craft3note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_craft3macro" title="craft3macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Craft](http://www.dandwiki.com/wiki/SRD:Craft_Skill ) (@{craft3name}) check:}} {{checkroll= [[ 1d20 + [[ @{craft3} ]] +(?{Artisan's Tools? |None, -2|Normal, 0|Masterwork, 2})[Tool Circumstance Bonus] ]] }} {{notes=@{craft3note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_craft3check" title="craft3check" value="@{craft3macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_decipherscriptclassskill" title="decipherscriptclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="decipher-script">Decipher Script</span> <b>*</b></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_decipherscript" title="decipherscript" defaultValue="(@{int-mod} +@{decipherscriptranks} +@{decipherscriptmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_decipherscriptranks" title="decipherscriptranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_decipherscriptmiscmod" title="decipherscriptmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_decipherscriptnote" title="decipherscriptnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_decipherscriptmacro" title="decipherscriptmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Decipher Script](http://www.dandwiki.com/wiki/SRD:Decipher_Script_Skill ) check:}} {{checkroll=[[1d20 + @{decipherscript} ]]}} {{notes=If fail, [[1d20 + @{wis-mod} ]] vs dc5 to avoid drawing a false conclusion.}} {{notes=@{decipherscriptnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_decipherscriptcheck" title="decipherscriptcheck" value="@{decipherscriptmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_diplomacyclassskill" title="diplomacyclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="diplomacy">Diplomacy</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_diplomacy" title="diplomacy" defaultValue="(@{cha-mod} +@{diplomacyranks} +@{diplomacymiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_diplomacyranks" title="diplomacyranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_diplomacymiscmod" title="diplomacymiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_diplomacynote" title="diplomacynote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_diplomacymacro" title="diplomacymacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Diplomacy](http://www.dandwiki.com/wiki/SRD:Diplomacy_Skill ) check:}} {{checkroll=[[1d20 + [[@{diplomacy}]] ]] }} {{notes=@{diplomacynote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_diplomacycheck" title="diplomacycheck" value="@{diplomacymacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_disabledeviceclassskill" title="disabledeviceclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="disable-device">Disable Device</span> <b>*</b></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_disabledevice" title="disabledevice" defaultValue="(@{int-mod} +@{disabledeviceranks} +@{disabledevicemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_disabledeviceranks" title="disabledeviceranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_disabledevicemiscmod" title="disabledevicemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_disabledevicenote" title="disabledevicenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_disabledevicemacro" title="disabledevicemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Disable Device](http://www.dandwiki.com/wiki/SRD:Disable_Device_Skill ) check:}} {{checkroll=[[1d20 + [[@{disabledevice}]] ]] }} {{notes=@{disabledevicenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_disabledevicecheck" title="disabledevicecheck" value="@{disabledevicemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_disguiseclassskill" title="disguiseclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="disguise">Disguise</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" title="disguise" name="attr_disguise" defaultValue="(@{cha-mod} +@{disguiseranks} +@{disguisemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_disguiseranks" title="disguiseranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_disguisemiscmod" title="disguisemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_disguisenote" title="disguisenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_disguisemacro" title="disguisemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Disguise](http://www.dandwiki.com/wiki/SRD:Disguise_Skill ) check:}} {{checkroll=[[1d20 + [[@{disguise}]] ]] }} {{notes=@{disguisenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_disguisecheck" title="disguisecheck" value="@{disguisemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_escapeartistclassskill" title="escapeartistclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="escape-artist">Escape Artist</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_escapeartist" title="escapeartist" defaultValue="(@{dex-mod} +@{escapeartistranks} +@{escapeartistmiscmod} +@{escapeartistarmorcheckpen} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_escapeartistranks" title="escapeartistranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_escapeartistarmorcheckpen" title="escapeartistarmorcheckpen" style={{width: '28px'}} defaultValue="@{armorcheckpenalty} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_escapeartistmiscmod" title="escapeartistmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_escapeartistnote" title="escapeartistnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_escapeartistmacro" title="escapeartistmacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Escape Artist](http://www.dandwiki.com/wiki/SRD:Escape_Artist_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{escapeartist} ]] ]] }} {{notes=@{escapeartistnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_escapeartistcheck" title="escapeartistcheck" value="@{escapeartistmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_forgeryclassskill" title="forgeryclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="forgery">Forgery</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_forgery" title="forgery" defaultValue="(@{int-mod} +@{forgeryranks} +@{forgerymiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_forgeryranks" title="forgeryranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_forgerymiscmod" title="forgerymiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_forgerynote" title="forgerynote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_forgerymacro" title="forgerymacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Forgery](http://www.dandwiki.com/wiki/SRD:Forgery_Skill ) check:}} {{checkroll=[[1d20 + [[@{forgery}]] ]] }} {{notes=@{forgerynote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_forgerycheck" title="forgerycheck" value="@{forgerymacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_gatherinformationclassskill" title="gatherinformationclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="gather-information">Gather Information</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_gatherinformation" title="gatherinformation" defaultValue="(@{cha-mod} +@{gatherinformationranks} +@{gatherinformationmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_gatherinformationranks" title="gatherinformationranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_gatherinformationmiscmod" title="gatherinformationmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_gatherinformationnote" title="gatherinformationnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_gatherinformationmacro" title="gatherinformationmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Gather Information](http://www.dandwiki.com/wiki/SRD:Gather_Information_Skill ) check:}} {{checkroll=[[1d20 + [[@{gatherinformation}]] ]] }} {{notes=@{gatherinformationnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_gatherinformationcheck" title="gatherinformationcheck" value="@{gatherinformationmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_handleanimalclassskill" title="handleanimalclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="handle-animal">Handle Animal</span> <b>*</b></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_handleanimal" title="handleanimal" defaultValue="(@{cha-mod} +@{handleanimalranks} +@{handleanimalmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_handleanimalranks" title="handleanimalranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_handleanimalmiscmod" title="handleanimalmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_handleanimalnote" title="handleanimalnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_handleanimalmacro" title="handleanimalmacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Handle Animal](http://www.dandwiki.com/wiki/SRD:Handle_Animal_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{handleanimal} ]] ]] }} {{notes=@{handleanimalnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_handleanimalcheck" title="handleanimalcheck" value="@{handleanimalmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_healclassskill" title="healclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="heal">Heal</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_heal" title="heal" defaultValue="(@{wis-mod} +@{healranks} +@{healmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="wisdom-a">Wis</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_wismod" title="wismod" defaultValue="@{wis-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_healranks" title="healranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_healmiscmod" title="healmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_healnote" title="healnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_healmacro" title="healmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Heal](http://www.dandwiki.com/wiki/SRD:Heal_Skill ) check:}} {{checkroll=[[1d20 + [[@{heal}]] +(?{Healer's Kit? |No, 0|Yes, 2})[Healer's Kit Circumstance Bonus] ]] }} {{notes=@{healnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_healcheck" title="healcheck" value="@{healmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_hideclassskill" title="hideclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="hide">Hide</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_hide" title="hide" defaultValue="(@{dex-mod} +@{hideranks} +@{hidemiscmod} +@{hidearmorcheckpen} -@{specialattacksizemod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_hideranks" title="hideranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_hidearmorcheckpen" title="hidearmorcheckpen" style={{width: '28px'}} defaultValue="@{armorcheckpenalty} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_hidemiscmod" title="hidemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_hidenote" title="hidenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_hidemacro" title="hidemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Hide](http://www.dandwiki.com/wiki/SRD:Hide_Skill ) check:}} {{checkroll=[[1d20 + [[@{hide}]] ]] }} {{notes=@{hidenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_hidecheck" title="hidecheck" value="@{hidemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_intimidateclassskill" title="intimidateclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="intimidate">Intimidate</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intimidate" title="intimidate" defaultValue="(@{cha-mod} +@{intimidateranks} +@{intimidatemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_intimidateranks" title="intimidateranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_intimidatemiscmod" title="intimidatemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_intimidatenote" title="intimidatenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_intimidatemacro" title="intimidatemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Intimidate](http://www.dandwiki.com/wiki/SRD:Intimidate_Skill ) check:}} {{checkroll=[[1d20 + [[@{intimidate}]] ]] }} {{notes=@{intimidatenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_intimidatecheck" title="intimidatecheck" value="@{intimidatemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_jumpclassskill" title="jumpclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="jump">Jump</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_jump" title="jump" defaultValue="(@{jumpstat}+@{jumpranks} +@{jumpmiscmod} +@{jumparmorcheckpen} )" disabled="true" /></td>
                              <td className="sheet-table-data-center"><select className="sheet-table-data-center-sm" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_jumpstat" title="jumpstat">
                                  <option type="text" style={{width: '44px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                                  <option type="text" style={{width: '44px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                </select></td>
                              {/*td class="sheet-table-data-center-sm">= Str</td*/}
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_jumpstatmod" title="jumpstatmod" defaultValue="@{jumpstat}" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_jumpranks" title="jumpranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_jumparmorcheckpen" title="jumparmorcheckpen" style={{width: '28px'}} defaultValue="@{armorcheckpenalty} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_jumpmiscmod" title="jumpmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_jumpnote" title="jumpnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_jumpmacro" title="jumpmacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Jump](http://www.dandwiki.com/wiki/SRD:Jump_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{jump} ]] ]] }} {{notes=@{jumpnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_jumpcheck" title="jumpcheck" value="@{jumpmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knowarcanaclassskill" title="knowarcanaclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="arcana">Arcana</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knowarcana" title="knowarcana" defaultValue="(@{int-mod} +@{knowarcanaranks} +@{knowarcanamiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knowarcanaranks" title="knowarcanaranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knowarcanamiscmod" title="knowarcanamiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowarcananote" title="knowarcananote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowarcanamacro" title="knowarcanamacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (Arcana) check:}} {{checkroll=[[1d20 + [[@{knowarcana}]] ]] }} {{notes=@{knowarcananote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knowarcanacheck" title="knowarcanacheck" value="@{knowarcanamacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knowengineerclassskill" title="knowengineerclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="engineering-a">Engineer</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knowengineer" title="knowengineer" defaultValue="(@{int-mod} +@{knowengineerranks} +@{knowengineermiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knowengineerranks" title="knowengineerranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knowengineermiscmod" title="knowengineermiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowengineernote" title="knowengineernote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowengineermacro" title="knowengineermacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (Engineering) check:}} {{checkroll=[[1d20 + [[@{knowengineer}]] ]] }} {{notes=@{knowengineernote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knowengineercheck" title="knowengineercheck" value="@{knowengineermacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knowdungeonclassskill" title="knowdungeonclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="dungeoneering-a">Dungeon</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knowdungeon" title="knowdungeon" defaultValue="(@{int-mod} +@{knowdungeonranks} +@{knowdungeonmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knowdungeonranks" title="knowdungeonranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knowdungeonmiscmod" title="knowdungeonmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowdungeonnote" title="knowdungeonnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowdungeonmacro" title="knowdungeonmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (Dungeoneering) check:}} {{checkroll=[[1d20 + [[@{knowdungeon}]] ]] }} {{notes=@{knowdungeonnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knowdungeoncheck" title="knowdungeoncheck" value="@{knowdungeonmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knowgeographyclassskill" title="knowgeographyclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="geography">Geography</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knowgeography" title="knowgeography" defaultValue="(@{int-mod} +@{knowgeographyranks} +@{knowgeographymiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knowgeographyranks" title="knowgeographyranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knowgeographymiscmod" title="knowgeographymiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowgeographynote" title="knowgeographynote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowgeographymacro" title="knowgeographymacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (Geography) check:}} {{checkroll=[[1d20 + [[@{knowgeography}]] ]] }} {{notes=@{knowgeographynote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knowgeographycheck" title="knowgeographycheck" value="@{knowgeographymacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knowhistoryclassskill" title="knowhistoryclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="history">History</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knowhistory" title="knowhistory" defaultValue="(@{int-mod} +@{knowhistoryranks} +@{knowhistorymiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" defaultValue="@{int-mod} " title="intmod" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knowhistoryranks" title="knowhistoryranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knowhistorymiscmod" title="knowhistorymiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowhistorynote" title="knowhistorynote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowhistorymacro" title="knowhistorymacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (History) check:}} {{checkroll=[[1d20 + [[@{knowhistory}]] ]] }} {{notes=@{knowhistorynote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knowhistorycheck" title="knowhistorycheck" value="@{knowhistorymacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knowlocalclassskill" title="knowlocalclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="local">Local</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knowlocal" title="knowlocal" defaultValue="(@{int-mod} +@{knowlocalranks} +@{knowlocalmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knowlocalranks" title="knowlocalranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knowlocalmiscmod" title="knowlocalmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowlocalnote" title="knowlocalnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowlocalmacro" title="knowlocalmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (Local) check:}} {{checkroll=[[1d20 + [[@{knowlocal}]] ]] }} {{notes=@{knowlocalnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knowlocalcheck" title="knowlocalcheck" value="@{knowlocalmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knownatureclassskill" title="knownatureclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="nature">Nature</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knownature" title="knownature" defaultValue="(@{int-mod} +@{knownatureranks} +@{knownaturemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knownatureranks" title="knownatureranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knownaturemiscmod" title="knownaturemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knownaturenote" title="knownaturenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knownaturemacro" title="knownaturemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (Nature) check:}} {{checkroll=[[1d20 + [[@{knownature}]] ]] }} {{notes=@{knownaturenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knownaturecheck" title="knownaturecheck" value="@{knownaturemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knownobilityclassskill" title="knownobilityclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="nobility">Nobility</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knownobility" title="knownobility" defaultValue="(@{int-mod} +@{knownobilityranks} +@{knownobilitymiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knownobilityranks" title="knownobilityranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knownobilitymiscmod" title="knownobilitymiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knownobilitynote" title="knownobilitynote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knownobilitymacro" title="knownobilitymacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (Nobility) check:}} {{checkroll=[[1d20 + [[@{knownobility}]] ]] }} {{notes=@{knownobilitynote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knownobilitycheck" title="knownobilitycheck" value="@{knownobilitymacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knowreligionclassskill" title="knowreligionclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="religion">Religion</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knowreligion" title="knowreligion" defaultValue="(@{int-mod} +@{knowreligionranks} +@{knowreligionmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knowreligionranks" title="knowreligionranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knowreligionmiscmod" title="knowreligionmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowreligionnote" title="knowreligionnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowreligionmacro" title="knowreligionmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (Religion) check:}} {{checkroll=[[1d20 + [[@{knowreligion}]] ]] }} {{notes=@{knowreligionnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knowreligioncheck" title="knowreligioncheck" value="@{knowreligionmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_knowplanesclassskill" title="knowplanesclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="knowledge">Knowledge</span> (<span data-i18n="the-planes">The Planes</span>) <b>*</b> &nbsp; </td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_knowplanes" title="knowplanes" defaultValue="(@{int-mod} +@{knowplanesranks} +@{knowplanesmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_knowplanesranks" title="knowplanesranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_knowplanesmiscmod" title="knowplanesmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowplanesnote" title="knowplanesnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_knowplanesmacro" title="knowplanesmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Knowledge](http://www.dandwiki.com/wiki/SRD:Knowledge_Skill ) (The Planes) check:}} {{checkroll=[[1d20 + [[@{knowplanes}]] ]] }} {{notes=@{knowplanesnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_knowplanescheck" title="knowplanescheck" value="@{knowplanesmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_listenclassskill" title="listenclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="listen">Listen</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_listen" title="listen" defaultValue="(@{wis-mod} +@{listenranks} +@{listenmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="wisdom-a">Wis</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_wismod" title="wismod" defaultValue="@{wis-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_listenranks" title="listenranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_listenmiscmod" title="listenmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_listennote" title="listennote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_listenmacro" title="listenmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Listen](http://www.dandwiki.com/wiki/SRD:Listen_Skill ) check:}} {{checkroll=[[ 1d20 + [[ @{listen} ]] ]] }} {{notes=@{listennote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_listencheck" title="listencheck" value="@{listenmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_movesilentclassskill" title="movesilentclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="move-silently">Move Silently</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_movesilent" title="movesilent" defaultValue="(@{dex-mod} +@{movesilentranks} +@{movesilentarmorcheckpen} +@{movesilentmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_movesilentranks" title="movesilentranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_movesilentarmorcheckpen" title="movesilentarmorcheckpen" style={{width: '28px'}} defaultValue="@{armorcheckpenalty} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_movesilentmiscmod" title="movesilentmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_movesilentnote" title="movesilentnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_movesilentmacro" title="movesilentmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Move Silently](http://www.dandwiki.com/wiki/SRD:Move_Silently_Skill ) check:}} {{checkroll=[[1d20 + [[@{movesilent}]] ]] }} {{notes=@{movesilentnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_movesilentcheck" title="movesilentcheck" value="@{movesilentmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_openlockclassskill" title="openlockclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="open-lock">Open Lock</span> <b>*</b></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_openlock" title="openlock" defaultValue="(@{dex-mod} +@{openlockranks} +@{openlockmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_openlockranks" title="openlockranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_openlockmiscmod" title="openlockmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_openlocknote" title="openlocknote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_openlockmacro" title="openlockmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Open Lock](http://www.dandwiki.com/wiki/SRD:Open_Lock_Skill ) check:}} {{checkroll=[[1d20 + [[@{openlock}]] +(?{Thieves' Tools? |None, -2|Normal, 0|Masterwork, 2})[Tool Circumstance Bonus] ]] }} {{notes=@{openlocknote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_openlockcheck" title="openlockcheck" value="@{openlockmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_perform1classskill" title="perform1classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="perform">Perform</span> <input type="text" name="attr_perform1name" title="perform1name" style={{fontSize: '0.95em', width: '90px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_perform1" title="perform1" defaultValue="(@{cha-mod} +@{perform1ranks} +@{perform1miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_perform1ranks" title="perform1ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_perform1miscmod" title="perform1miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_perform1note" title="perform1note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_perform1macro" title="perform1macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Perform](http://www.dandwiki.com/wiki/SRD:Perform_Skill ) (@{perform1name}) check:}} {{checkroll= [[ 1d20 + [[ @{perform1} ]] +(?{Masterwork Instrument?|No, 0|Yes,2})[Instrument Circumstance Bonus] ]] }} {{notes=@{perform1note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_perform1check" title="perform1check" value="@{perform1macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_perform2classskill" title="perform2classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="perform">Perform</span> <input type="text" name="attr_perform2name" title="perform2name" style={{fontSize: '0.95em', width: '90px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_perform2" title="perform2" defaultValue="(@{cha-mod} +@{perform2ranks} +@{perform2miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_perform2ranks" title="perform2ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_perform2miscmod" title="perform2miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_perform2note" title="perform2note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_perform2macro" title="perform2macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Perform](http://www.dandwiki.com/wiki/SRD:Perform_Skill ) (@{perform2name}) check:}} {{checkroll= [[ 1d20 + [[ @{perform2} ]] +(?{Masterwork Instrument?|No, 0|Yes,2})[Instrument Circumstance Bonus] ]] }} {{notes=@{perform2note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_perform2check" title="perform2check" value="@{perform2macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_perform3classskill" title="perform3classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="perform">Perform</span> <input type="text" name="attr_perform3name" title="perform3name" style={{fontSize: '0.95em', width: '90px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_perform3" title="perform3" defaultValue="(@{cha-mod} +@{perform3ranks} +@{perform3miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_perform3ranks" title="perform3ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_perform3miscmod" title="perform3miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_perform3note" title="perform3note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_perform3macro" title="perform3macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Perform](http://www.dandwiki.com/wiki/SRD:Perform_Skill ) (@{perform2name}) check:}} {{checkroll= [[ 1d20 + [[ @{perform3} ]] +(?{Masterwork Instrument?|No, 0|Yes,2})[Instrument Circumstance Bonus] ]] }} {{notes=@{perform3note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_perform3check" title="perform3check" value="@{perform3macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_profession1classskill" title="profession1classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="profession">Profession</span> <b>*</b> <input type="text" name="attr_profession1name" title="profession1name" style={{fontSize: '0.95em', width: '75px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_profession1" title="profession1" defaultValue="(@{wis-mod} +@{profession1ranks} +@{profession1miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="wisdom-a">Wis</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_wismod" title="wismod" defaultValue="@{wis-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_profession1ranks" title="profession1ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_profession1miscmod" title="profession1miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_profession1note" title="profession1note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_profession1macro" title="profession1macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Profession](http://www.dandwiki.com/wiki/SRD:Profession_Skill ) (@{profession1name}) check:}} {{checkroll= [[ 1d20 + [[ @{profession1} ]] ]] }} {{notes=@{profession1note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_profession1check" title="profession1check" value="@{profession1macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_profession2classskill" title="profession2classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="profession">Profession</span> <b>*</b> <input type="text" name="attr_profession2name" title="profession2name" style={{fontSize: '0.95em', width: '75px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_profession2" title="profession2" defaultValue="(@{wis-mod} +@{profession2ranks} +@{profession2miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="wisdom-a">Wis</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_wismod" title="wismod" defaultValue="@{wis-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_profession2ranks" title="profession2ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_profession2miscmod" title="profession2miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_profession2note" title="profession2note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_profession2macro" title="profession2macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Profession](http://www.dandwiki.com/wiki/SRD:Profession_Skill ) (@{profession2name}) check:}} {{checkroll= [[ 1d20 + [[ @{profession2} ]] ]] }} {{notes=@{profession2note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_profession2check" title="profession2check" value="@{profession2macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_profession3classskill" title="profession3classskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"><span data-i18n="profession">Profession</span> <b>*</b> <input type="text" name="attr_profession3name" title="profession3name" style={{fontSize: '0.95em', width: '75px'}} /></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_profession3" title="profession3" defaultValue="(@{wis-mod} +@{profession3ranks} +@{profession3miscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="wisdom-a">Wis</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_wismod" title="wismod" defaultValue="@{wis-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_profession3ranks" title="profession3ranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_profession3miscmod" title="profession3miscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_profession3note" title="profession3note (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_profession3macro" title="profession3macro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Profession](http://www.dandwiki.com/wiki/SRD:Profession_Skill ) (@{profession3name}) check:}} {{checkroll= [[ 1d20 + [[ @{profession3} ]] ]] }} {{notes=@{profession3note} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_profession3check" title="profession3check" value="@{profession3macro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_rideclassskill" title="rideclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="ride">Ride</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_ride" title="ride" defaultValue="(@{dex-mod} +@{rideranks} +@{ridemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_rideranks" title="rideranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_ridemiscmod" title="ridemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_ridenote" title="ridenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_ridemacro" title="ridemacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Ride](http://www.dandwiki.com/wiki/SRD:Ride_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{ride} ]] ]] }} {{notes=@{ridenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_ridecheck" title="ridecheck" value="@{ridemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_searchclassskill" title="searchclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="search">Search</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_search" title="search" defaultValue="(@{int-mod} +@{searchranks} +@{searchmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_searchranks" title="searchranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_searchmiscmod" title="searchmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_searchnote" title="searchnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_searchmacro" title="searchmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Search](http://www.dandwiki.com/wiki/SRD:Search_Skill ) check:}} {{checkroll=[[1d20 + [[@{search}]] ]] }} {{notes=@{searchnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_searchcheck" title="searchcheck" value="@{searchmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_sensemotiveclassskill" title="sensemotiveclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="sense-motive">Sense Motive</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_sensemotive" title="sensemotive" defaultValue="(@{wis-mod} +@{sensemotiveranks} +@{sensemotivemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="wisdom-a">Wis</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_wismod" title="wismod" defaultValue="@{wis-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_sensemotiveranks" title="sensemotiveranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_sensemotivemiscmod" title="sensemotivemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_sensemotivenote" title="sensemotivenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_sensemotivemacro" title="sensemotivemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Sense Motive](http://www.dandwiki.com/wiki/SRD:Sense_Motive_Skill ) check:}} {{checkroll=[[1d20 + [[@{sensemotive}]] ]] }} {{notes=@{sensemotivenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_sensemotivecheck" title="sensemotivecheck" value="@{sensemotivemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_sleightofhandclassskill" title="sleightofhandclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="sleight-of-hand">Sleight of Hand</span> <b>*</b></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_sleightofhand" title="sleightofhand" defaultValue="(@{dex-mod} +@{sleightofhandranks} +@{sleightarmorcheckpen} +@{sleightofhandmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_sleightofhandranks" title="sleightofhandranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_sleightarmorcheckpen" title="sleightarmorcheckpen" style={{width: '28px'}} defaultValue="@{armorcheckpenalty} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_sleightofhandmiscmod" title="sleightofhandmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_sleightofhandnote" title="sleightofhandnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_sleightofhandmacro" title="sleightofhandmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Sleight of Hand](http://www.dandwiki.com/wiki/SRD:Sleight_of_Hand_Skill ) check:}} {{checkroll=[[1d20 + [[@{sleightofhand}]] ]] }} {{notes=@{sleightofhandnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_sleightofhandcheck" title="sleightofhandcheck" value="@{sleightofhandmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_spellcraftclassskill" title="spellcraftclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="spellcraft">Spellcraft</span> <b>*</b></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_spellcraft" title="spellcraft" defaultValue="(@{int-mod} +@{spellcraftranks} +@{spellcraftmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="intelligence-a">Int</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_intmod" title="intmod" defaultValue="@{int-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_spellcraftranks" title="spellcraftranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_spellcraftmiscmod" title="spellcraftmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_spellcraftnote" title="spellcraftnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_spellcraftmacro" title="spellcraftmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Spellcraft](http://www.dandwiki.com/wiki/SRD:Spellcraft_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{spellcraft} ]] ]] }} {{notes=@{spellcraftnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_spellcraftcheck" title="spellcraftcheck" value="@{spellcraftmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_spotclassskill" title="spotclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="spot">Spot</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_spot" title="spot" defaultValue="(@{wis-mod} +@{spotranks} +@{spotmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="wisdom-a">Wis</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_wismod" title="wismod" defaultValue="@{wis-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_spotranks" title="spotranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_spotmiscmod" title="spotmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_spotnote" title="spotnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_spotmacro" title="spotmacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Spot](http://www.dandwiki.com/wiki/SRD:Spot_Skill ) check:}} {{checkroll=[[1d20 + [[@{spot}]] ]] }} {{notes=@{spotnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_spotcheck" title="spotcheck" value="@{spotmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_survivalclassskill" title="survivalclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="survival">Survival</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_survival" title="survival" defaultValue="(@{wis-mod} +@{survivalranks} +@{survivalmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="wisdom-a">Wis</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_wismod" title="wismod" defaultValue="@{wis-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_survivalranks" title="survivalranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_survivalmiscmod" title="survivalmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_survivalnote" title="survivalnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_survivalmacro" title="survivalmacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Survival](http://www.dandwiki.com/wiki/SRD:Survival_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{survival} ]] ]] }} {{notes=@{survivalnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_survivalcheck" title="survivalcheck" value="@{survivalmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_swimclassskill" title="swimclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="swim">Swim</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_swim" title="swim" defaultValue="(@{str-mod} +@{swimranks} +@{swimarmorcheckpen} +@{swimmiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="strength-a">Str</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_strmod" title="strmod" defaultValue="@{str-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_swimranks" title="swimranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_swimarmorcheckpen" title="swimarmorcheckpen" style={{width: '28px'}} defaultValue="2*(@{armorcheckpenalty} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_swimmiscmod" title="swimmiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_swimnote" title="swimnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_swimmacro" title="swimmacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Swim](http://www.dandwiki.com/wiki/SRD:Swim_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{swim} ]] ]] }} {{notes=@{swimnote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_swimcheck" title="swimcheck" value="@{swimmacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_tumbleclassskill" title="tumbleclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="tumble">Tumble</span> <b>*</b></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_tumble" title="tumble" defaultValue="(@{dex-mod} +@{tumbleranks} +@{tumblearmorcheckpen} +@{tumblemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_tumbleranks" title="tumbleranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_tumblearmorcheckpen" title="tumblearmorcheckpen" style={{width: '28px'}} defaultValue="@{armorcheckpenalty} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_tumblemiscmod" title="tumblemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_tumblenote" title="tumblenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_tumblemacro" title="tumblemacro" defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Tumble](http://www.dandwiki.com/wiki/SRD:Tumble_Skill ) check:}} {{checkroll= [[ 1d20 + [[ @{tumble} ]] ]] }} {{notes=@{tumblenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_tumblecheck" title="tumblecheck" value="@{tumblemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_usemagicdeviceclassskill" title="usemagicdeviceclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="use-magic-device">Use Magic Device</span> <b>*</b></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_usemagicdevice" title="usemagicdevice" defaultValue="(@{cha-mod} +@{usemagicdeviceranks} +@{usemagicdevicemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="charisma-a">Cha</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_chamod" title="chamod" defaultValue="@{cha-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" style={{width: '28px'}} name="attr_usemagicdeviceranks" title="usemagicdeviceranks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_usemagicdevicemiscmod" title="usemagicdevicemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_usemagicdevicenote" title="usemagicdevicenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_usemagicdevicemacro" title="usemagicdevicemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Use Magic Device](http://www.dandwiki.com/wiki/SRD:Use_Magic_Device_Skill ) check:}} {{checkroll=[[1d20 + [[@{usemagicdevice}]] ]] }} {{notes=@{usemagicdevicenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_usemagicdevicecheck" title="usemagicdevicecheck" value="@{usemagicdevicemacro}" /></td>
                            </tr>
                            <tr>
                              <td><input type="checkbox" name="attr_useropeclassskill" title="useropeclassskill" defaultValue={1} style={{width: '8px'}} /></td>
                              <td className="sheet-table-header-left"> <span data-i18n="use-rope">Use Rope</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_userope" title="userope" defaultValue="(@{dex-mod} +@{useroperanks} +@{useropemiscmod} )" disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">= <span data-i18n="dexterity-a">Dex</span></td>
                              <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills" name="attr_dexmod" title="dexmod" defaultValue="@{dex-mod} " disabled="true" /></td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_useroperanks" title="useroperanks" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm">+ &nbsp; -<span data-i18n="not-applicable">N/A</span>- &nbsp; </td>
                              <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills" name="attr_useropemiscmod" title="useropemiscmod" defaultValue={0} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_useropenote" title="useropenote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                              <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '160px', height: '20px'}} name="attr_useropemacro" title="useropemacro" defaultValue={"/w gm &{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=[Use Rope](http://www.dandwiki.com/wiki/SRD:Use_Rope_Skill ) check:}} {{checkroll=[[1d20 + [[@{userope}]] ]] }} {{notes=@{useropenote} }}"} /></td>
                              <td className="sheet-table-data-center-sm"><button type="roll" name="roll_useropecheck" title="useropecheck" value="@{useropemacro}" /></td>
                            </tr>
                          </tbody></table>
                      </td>
                    </tr></tbody></table>
                <br />
                <table cellPadding={0} cellSpacing={0}>
                  <tbody><tr>
                      <td colSpan={9} className="sheet-statlabel-big" style={{width: '790px'}}><b data-i18n="other-skills">Other Skills</b></td>
                    </tr>
                    <tr className="sheet-table-row">
                      <td className="sheet-table-header2" style={{width: '8px'}}>&nbsp;</td>
                      <td className="sheet-table-header2-left" style={{width: '135px'}} data-i18n="skill-name">Skill Name</td>
                      <td className="sheet-table-header2" style={{width: '34px'}} data-i18n="total-bonus-s">Total<br />Bonus</td>
                      <td className="sheet-table-header2" style={{width: '44px'}} data-i18n="ability-stat-s">Ability<br />Stat</td>
                      <td className="sheet-table-header2" style={{width: '34px'}} data-i18n="ability-modifier-as">Ability<br />Mod.</td>
                      <td className="sheet-table-header2" style={{width: '34px'}} data-i18n="ranks">Ranks</td>
                      <td className="sheet-table-header2" style={{width: '34px'}} data-i18n="armor-penalty-s">Armor<br />Penalty</td>
                      <td className="sheet-table-header2" style={{width: '34px'}} data-i18n="miscellaneous-modifier-as">Misc<br />Mod.</td>
                      <td className="sheet-table-header2" style={{width: '395px'}} data-i18n="macro">Macro</td>
                    </tr>
                  </tbody></table>
                <fieldset className="repeating_skills">
                  <table cellPadding={0} cellSpacing={0}>
                    <tbody><tr>
                        <td className="sheet-table-header-left"><input type="checkbox" name="attr_otherskillskill" title="repeating_skills_#_otherskillskill" defaultValue={1} style={{width: '8px'}} /></td>
                        <td className="sheet-table-header-left"><input type="text" className="sheet-table-data-center-skills-rep" name="attr_otherskillname" title="repeating_skills_#_otherskillname" style={{width: '145px'}} /></td>
                        <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills-rep" name="attr_otherskill" title="repeating_skills_#_otherskill" defaultValue="@{otherskillstat}+@{otherskillranks} +@{otherskillarmorcheckpen} +@{otherskillmiscmod} " disabled="true" /></td>
                        <td>=<select className="sheet-table-data-center-sm" style={{height: '24px', width: '44px', fontSize: '0.75em'}} name="attr_otherskillstat" title="repeating_skills_#_otherskillstat : Ability used for skill">
                            <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a" selected>Str</option>
                            <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                            <option type="text" style={{width: '45px'}} value="@{con-mod} " data-i18n="constitution-a">Con</option>
                            <option type="text" style={{width: '45px'}} value="@{int-mod} " data-i18n="intelligence-a">Int</option>
                            <option type="text" style={{width: '45px'}} value="@{wis-mod} " data-i18n="wisdom-a">Wis</option>
                            <option type="text" style={{width: '45px'}} value="@{cha-mod} " data-i18n="charisma-a">Cha</option>
                          </select></td>
                        <td className="sheet-table-data-center-sm"><input type="text" className="sheet-table-data-center-skills-rep" name="attr_otherskillabilitymod" title="repeating_skills_#_otherskillabilitymod" defaultValue="@{otherskillstat}" disabled="true" /></td>
                        <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills-rep" name="attr_otherskillranks" title="repeating_skills_#_otherskillranks" defaultValue={0} /></td>
                        <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills-rep" name="attr_otherskillarmorcheckpen" defaultValue={0} title="repeating_skills_#_otherskillarmorcheckpen : Enter appropriate armor check penalty." /></td>
                        {/*td class="sheet-table-data-center-sm">+<select class="sheet-table-data-center-sm" style="height: 24px; width: 40px; font-size: 0.75em;" name="attr_otherskillarmorcheckpen" title="repeating_skills_#_otherskillarmorcheckpen : Armor check Penalty for Skill">
							<option type="text" value="0" selected>None</option>
							<option type="text" value="@{armorcheckpenalty} ">=Armor check Penalty</option>
							<option type="text"value="2*(@{armorcheckpenalty} )">=2x(Armor check Penalty)</option>
						</select></td*/}
                        <td className="sheet-table-data-center-sm">+<input type="text" className="sheet-table-data-center-skills-rep" name="attr_otherskillmiscmod" title="repeating_skills_#_otherskillmiscmod" defaultValue={0} /></td>
                        <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '170px', height: '20px'}} name="attr_otherskillnote" title="repeating_skills_#_otherskillnote (Notes for the note field on the default macro)" placeholder="Notes" data-i18n-placeholder="notes" defaultValue={""} /></td>
                        <td className="sheet-table-data-center-sm"><textarea rows={1} cols={50} style={{width: '190px', height: '20px'}} name="attr_otherskillmacro" title="repeating_skills_#_otherskillmacro : modify this macro to modify the skill check roll." defaultValue={"&{template:DnD35StdRoll} {{skillflag=true}} {{name=@{character_name} }} {{check=@{otherskillname} check:}} {{checkroll= [[ 1d20 + [[ @{otherskill} ]] ]] }} {{notes=@{otherskillnote} }}"} /></td>
                        <td className="sheet-table-data-center-sm"><button type="roll" name="roll_otherskillcheck" title="repeating_skills_#_otherskillcheck" value="@{otherskillmacro}" /></td>
                      </tr>
                    </tbody></table>
                </fieldset>
                <br />
                <p> <b>*</b> = <span data-i18n="trained-only">Trained Only</span> </p>
              </div>
              <hr />
            </div>
          </div>
          <div className="sheet-tab-content sheet-tab6 sheet-tab99">
            <input type="checkbox" className="sheet-pc-spells-show sheet-arrow" title="spells-show" name="attr_spells-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="spells">Spells</span>
            <div className="sheet-pc-spells">
              {/*Spells*/}
              <table style={{float: 'left'}}>
                <tbody><tr>
                    {/*spells*/}
                    <td colSpan={3}>
                      <table style={{width: '100%'}} className="sheet-table-row" cellPadding={0} cellSpacing={0}>
                        <tbody><tr>
                            <td colSpan={3} className="sheet-statlabel-big-gray" style={{width: '790px', height: '35px', fontSize: '1.5em'}} data-i18n="spells">Spells</td>
                          </tr>
                          <tr>
                            <td className="sheet-table-header3" style={{width: '10%', border: '1px solid black'}}><span data-i18n="caster-level">Caster Level</span>:<br />
                              <input type="text" style={{width: '25px'}} name="attr_casterlevel" title="casterlevel" defaultValue={1} className="sheet-table-row-small" />/
                              <input type="text" style={{width: '25px'}} name="attr_casterlevel2" title="casterlevel2" defaultValue={0} className="sheet-table-row-small" />
                            </td>
                            <td className="sheet-table-header3" colSpan={2} style={{width: '90%'}}><span data-i18n="spells-per-day">Spells/Day</span>:<br />
                              &nbsp; &nbsp; &nbsp; &nbsp; <span data-i18n="zero">0</span>:<input type="text" name="attr_spells0" title="spells0" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="first">1st</span>:<input type="text" name="attr_spells1" title="spells1" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="second">2nd</span>:<input type="text" name="attr_spells2" title="spells2" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="third">3rd</span>:<input type="text" name="attr_spells3" title="spells3" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="fourth">4th</span>:<input type="text" name="attr_spells4" title="spells4" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="fifth">5th</span>:<input type="text" name="attr_spells5" title="spells5" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="sixth">6th</span>:<input type="text" name="attr_spells6" title="spells6" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="seventh">7th</span>:<input type="text" name="attr_spells7" title="spells7" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="eighth">8th</span>:<input type="text" name="attr_spells8" title="spells8" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="ninth">9th</span>:<input type="text" name="attr_spells9" title="spells9" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td className="sheet-table-header3" style={{width: '10%', border: '1px solid black'}}><span data-i18n="casting-ability">Casting Ability</span>:<br />
                              <select className="sheet-table-data-center" style={{height: '24px', width: '64px'}} name="attr_spellcastingstat" title="spellcastingstat">
                                <option type="text" style={{width: '45px'}} value="@{str-mod} " data-i18n="strength-a">Str</option>
                                <option type="text" style={{width: '45px'}} value="@{dex-mod} " data-i18n="dexterity-a">Dex</option>
                                <option type="text" style={{width: '45px'}} value="@{con-mod} " data-i18n="constitution-a">Con</option>
                                <option type="text" style={{width: '45px'}} value="@{int-mod} " data-i18n="intelligence-a" selected>Int</option>
                                <option type="text" style={{width: '45px'}} value="@{wis-mod} " data-i18n="wisdom-a">Wis</option>
                                <option type="text" style={{width: '45px'}} value="@{cha-mod} " data-i18n="charisma-a">Cha</option>
                              </select>
                            </td>
                            <td className="sheet-table-header3" colSpan={2} style={{width: '90%'}}><span data-i18n="spell-difficulty-classes">Spell DC's</span><br />
                              &nbsp; &nbsp; &nbsp; &nbsp; <span data-i18n="zero">0</span>:<input type="text" name="attr_spelldc0" title="spelldc0" defaultValue="(10+0+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="first">1st</span>:<input type="text" name="attr_spelldc1" title="spelldc1" defaultValue="(10+1+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="second">2nd</span>:<input type="text" name="attr_spelldc2" title="spelldc2" defaultValue="(10+2+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="third">3rd</span>:<input type="text" name="attr_spelldc3" title="spelldc3" defaultValue="(10+3+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="fourth">4th</span>:<input type="text" name="attr_spelldc4" title="spelldc4" defaultValue="(10+4+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="fifth">5th</span>:<input type="text" name="attr_spelldc5" title="spelldc5" defaultValue="(10+5+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="sixth">6th</span>:<input type="text" name="attr_spelldc6" title="spelldc6" defaultValue="(10+6+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="seventh">7th</span>:<input type="text" name="attr_spelldc7" title="spelldc7" defaultValue="(10+7+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="eighth">8th</span>:<input type="text" name="attr_spelldc8" title="spelldc8" defaultValue="(10+8+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; <span data-i18n="ninth">9th</span>:<input type="text" name="attr_spelldc9" title="spelldc9" defaultValue="(10+9+@{spellcastingstat})" disabled="true" className="sheet-table-row-small" />
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td className="sheet-table-header3" style={{width: '10%', border: '1px solid black'}}><span data-i18n="spell-penetration-a">Spell Pen</span>:<br />
                              <input type="text" style={{width: '25px'}} name="attr_spellpen" title="spellpen" defaultValue={0} className="sheet-table-row-small" />
                            </td>
                            <td className="sheet-table-header3" style={{width: '75%'}}><span data-i18n="spell-focus">Spell Focus</span>:<br />
                              <span data-i18n="abjuration">Abjuration</span>:<input type="text" name="attr_sf-abjuration" title="sf-abjuration" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; &nbsp; <span data-i18n="conjuration">Conjuration</span>:<input type="text" name="attr_sf-conjuration" title="sf-conjuration" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; &nbsp; <span data-i18n="divination">Divination</span>:<input type="text" name="attr_sf-divination" title="sf-divination" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; &nbsp; <span data-i18n="enchantment">Enchantment</span>:<input type="text" name="attr_sf-enchantment" title="sf-enchantment" defaultValue={0} className="sheet-table-row-small" /><br />
                              <span data-i18n="evocation">Evocation</span>:<input type="text" name="attr_sf-evocation" title="sf-evocation" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; &nbsp; <span data-i18n="illusion">Illusion</span>:<input type="text" name="attr_sf-illusion" title="sf-illusion" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; &nbsp; <span data-i18n="necromancy">Necromancy</span>:<input type="text" name="attr_sf-necromancy" title="sf-necromancy" defaultValue={0} className="sheet-table-row-small" />
                              &nbsp; &nbsp; &nbsp; <span data-i18n="transmutation">Transmutation</span>:<input type="text" name="attr_sf-transmutation" title="sf-transmutation" defaultValue={0} className="sheet-table-row-small" />
                            </td>
                            <td className="sheet-table-header3" style={{width: '10%', border: '1px solid black'}}><br /><input type="text" className="sheet-input-noborder" name="attr_powerpointname" data-i18n-placeholder="power-points" placeholder="Power Points" title="powerpointname" /><br />
                              <div><input type="text" name="attr_powerpoints" title="powerpoints" style={{width: '30px', textAlign: 'right'}} />/<input type="text" name="attr_powerpoints_max" title="powerpoints|max" style={{width: '30px'}} /></div>
                            </td>
                          </tr>
                        </tbody></table>
                    </td>
                  </tr>
                </tbody></table>
              <br />
              <hr />
              <input type="checkbox" className="sheet-pc-spells0-show sheet-arrow" title="spells0-show" name="attr_spells0-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>0</span>
              <div className="sheet-pc-spells0">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={5}><input type="text" style={{width: '395px'}} name="attr_spellgroupname01" title="spellgroupname01" defaultValue="Level 0 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells01">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused01" title="repeating_spells01_#_spellused01" />/<input type="text" style={{width: '25px'}} name="attr_spellprep01" title="repeating_spells01_#_spellprep01" /></td>
                                <td><input type="text" style={{width: '120px'}} name="attr_spellname01" title="repeating_spells01_#_spellname01" defaultValue="Cure Minor Wounds" /></td>
                                <td><input type="text" style={{width: '20px'}} name="attr_spelllevel01" title="repeating_spells01_#_spelllevel01" defaultValue={0} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro01" title="repeating_spells01_#_spellmacro01 : Edit this field to create the macro run by the roll button" defaultValue={"&{template:DnD35StdRoll} {{spellflag=true}} {{name=@{character_name} }} {{subtags=casts [Cure Minor Wounds](http://www.dandwiki.com/wiki/Cure_minor_wounds ).}} {{School:= Conj(Healing)}} {{Level:= Cleric 0}} {{Cmpnts:=V,S}} {{Casting Time:=1 std action}} {{Range:= Touch}} {{Target:= Creature touched}} {{Duration:= Instantaneous}} {{Saving Throw:= Will Save(half) when used vs Undead}} {{Spell Resist.:= Undead can use spell resistance}} {{ Caster level check: = [[ 1d20+@{casterlevel}+@{spellpen} ]] vs spell resistance.}} {{compcheck= Conc: [[ {1d20 + [[ @{concentration} ]] }>?{Concentration DC=15+Spell Level or 10+Damage Received|16} ]] }} {{succeedcheck=Success! She casts her spell!}} {{failcheck=She fails :( }} {{notes= ?{Recipient's name|@{character_name}} receives 1 heath (or 1 point of damage if an undead creature) }} "} />
                                </td>
                                <td><button type="roll" name="roll_spellcast01" text="Spell Cast01" title="repeating_spells01_#_spellcast01" value="@{spellmacro01}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname02" title="spellgroupname02" defaultValue="Level 0 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells02">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused02" title="repeating_spells02_#_spellused02" />/<input type="text" style={{width: '25px'}} name="attr_spellprep02" title="repeating_spells02_#_spellprep02" /></td>
                                <td><input type="text" style={{width: '120px'}} name="attr_spellname02" title="repeating_spells02_#_spellname02" defaultValue="Mending" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel02" title="repeating_spells02_#_spelllevel02" defaultValue={0} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro02" title="repeating_spells02_#_spellmacro02 : Edit this field to create the macro run by the roll button" defaultValue={"&{template:DnD35StdRoll} {{spellflag=true}} {{name=@{character_name} }} {{subtags=casts [Mending](http://www.dandwiki.com/wiki/SRD:Mending ).}} {{check=One object within 10 feet of up to 1 lb. is repaired of small breaks or tears.}} {{checkroll=broken metallic objects such as a ring, a chain link, a medallion, or a slender dagger, are welded providing but one break exists. }} {{notes=Ceramic or wooden objects with multiple breaks can be invisibly rejoined to be as strong as new. A hole in a leather sack or a wineskin is completely healed over by mending. The spell can repair a magic item, but the item's magical abilities are not restored. The spell cannot mend broken magic rods, staffs, or wands, nor does it affect creatures (including constructs). }}"} />
                                </td>
                                <td><button type="roll" name="roll_spellcast02" text="Spell Cast02" title="repeating_spells02_#_spellcast02" value="@{spellmacro02}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <br />
              <input type="checkbox" className="sheet-pc-spells1-show sheet-arrow" title="spells1-show" name="attr_spells1-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>1</span>
              <div className="sheet-pc-spells1">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname11" title="spellgroupname11" defaultValue="Level 1 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused11" title="repeating_spells_#_spellused11" />/<input type="text" style={{width: '25px'}} name="attr_spellprep11" title="repeating_spells_#_spellprep11" /></td>
                                <td><input type="text" style={{width: '120px'}} name="attr_spellname11" title="repeating_spells_#_spellname11" defaultValue="Doom" /></td>
                                <td><input type="text" style={{width: '20px'}} name="attr_spelllevel11" title="repeating_spells_#_spelllevel11" defaultValue={1} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro11" title="repeating_spells_#_spellmacro11 : Edit this field to create the macro run by the roll button" defaultValue={"&{template:DnD35StdRoll} {{spellflag=true}} {{name= @{character_name} casts Doom on @{target|token_name} }} {{School:=Necromancy (Fear, Mind affecting)}} {{Level: =Cleric 1}} {{Cmpnts:=V, S, DF}} {{Casting Time:= 1 std action}} {{Range:= Medium ( [[ 100+10*@{casterlevel} ]] ft)}} {{Target:= 1 living creature}} {{Duration:= [[ @{casterlevel} ]] min.}} {{Saving Throw:= Will negates (DC= [[ @{spelldc1} ]] ) }} {{Spell Resist.:= Yes }} {{Caster level check: = [[ 1d20+@{casterlevel}+@{spellpen} ]] vs spell resistance.}} {{compcheck= Conc: [[ {1d20 + [[ @{concentration} ]] }>?{Concentration DC=15+Spell Level or 10+Damage Received|16} ]] }} {{succeedcheck=Success! She casts her spell!}} {{failcheck=She fails :( }} {{notes=Target is filled with a feeling of horrible dread that causes it to become shaken (-2 on attack rolls, saves, skill checks, ability checks).}} "} />
                                </td>
                                <td><button type="roll" name="roll_spellcast11" text="Spell Cast11" title="repeating_spells_#_spellcast11" value="@{spellmacro11}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname12" title="spellgroupname12" defaultValue="Level 1 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells12">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused12" title="repeating_spells12_#_spellused12" />/<input type="text" style={{width: '25px'}} name="attr_spellprep12" title="repeating_spells12_#_spellprep12" /></td>
                                <td><input type="text" style={{width: '120px'}} name="attr_spellname12" title="repeating_spells12_#_spellname12" defaultValue="Magic Missile" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel12" title="repeating_spells12_#_spelllevel12" defaultValue={1} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro12" title="repeating_spells12_#_spellmacro12 : Edit this field to create the macro run by the roll button" defaultValue={"&{template:DnD35StdRoll} {{spellflag=true}} {{name=@{character_name} }} {{subtags=casts [Magic Missile!](http://www.dandwiki.com/wiki/SRD:Magic_Missile ).}} {{School:= Evo (Force)}} {{Level:= Sor/Wiz 1}} {{Cmpnts:=V,S}} {{Casting Time:=1 std action}} {{Range:= Medium ( [[ 100+10*@{casterlevel2} ]] ft)}} {{Target:= Up to five creatures, no two of which can be more than 15 ft. apart }} {{Duration:= Instantaneous}} {{Saving Throw:= None}} {{Spell Resist.:= Yes}} {{Caster level check: = [[ 1d20+@{casterlevel2}+@{spellpen} ]] vs spell resistance.}} {{compcheck= Conc: [[ {1d20 + [[ @{concentration} ]] }>?{Concentration DC=15+Spell Level or 10+Damage Received|16} ]] }} {{succeedcheck=Success! She casts her spell!}} {{failcheck=She fails :( }} {{check= [[ {(d1*((@{casterlevel2}-1-((@{casterlevel2}-1)%2))/2)+1),d1*5}dh1} ]] missiles fly from the caster's fingers,}} {{checkroll=hitting for [[ 1d4+1 ]] | [[ 1d4+1 ]] | [[ 1d4+1 ]] | [[ 1d4+1 ]] | [[ 1d4+1 ]] force damage.}} {{notes= The missile strikes unerringly, even if the target is in melee combat or has less than total cover or total concealment. Specific parts of a creature can't be singled out. Inanimate objects are not damaged by the spell. If you shoot multiple missiles, you can have them strike a single creature or several creatures. A single missile can strike only one creature. You must designate targets before you check for spell resistance or roll damage. }}"} />
                                </td>
                                <td><button type="roll" name="roll_spellcast12" text="Spell Cast12" title="repeating_spells12_#_spellcast12" value="@{spellmacro12}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <br />
              <input type="checkbox" className="sheet-pc-spells2-show sheet-arrow" title="spells2-show" name="attr_spells2-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>2</span>
              <div className="sheet-pc-spells2">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname21" title="spellgroupname21" defaultValue="Level 2 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells21">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused21" title="repeating_spells21_#_spellused21" />/<input type="text" style={{width: '25px'}} name="attr_spellprep21" title="repeating_spells21_#_spellprep21" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname21" title="repeating_spells21_#_spellname21" defaultValue="Cure Moderate Wounds" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel21" title="repeating_spells21_#_spelllevel21" defaultValue={2} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro21" title="repeating_spells21_#_spellmacro21 : Edit this field to create the macro run by the roll button" defaultValue={"&{template:DnD35StdRoll} {{spellflag=true}} {{name=@{character_name} }} {{subtags=casts [Cure Moderate Wounds](http://www.dandwiki.com/wiki/SRD:Cure_Moderate_Wounds ).}} {{School:= Conj(Healing)}} {{Level:= Blg 2, Brd 2, Clr 2, Drd 3, Healing 2, Pal 3, Rgr 3 }} {{Cmpnts:=V,S}} {{Casting Time:=1 std action}} {{Range:= Touch}} {{Target:= Creature touched}} {{Duration:= Instantaneous}} {{Saving Throw:= Will Save(half) when used vs Undead}} {{Spell Resist.:= Undead can use spell resistance}} {{Caster level check: = [[ 1d20+@{casterlevel}+@{spellpen} ]] vs spell resistance.}} {{compcheck= Conc: [[ {1d20 + [[ @{concentration} ]] }>?{Concentration DC=15+Spell Level or 10+Damage Received|17} ]] }} {{succeedcheck=Success! She casts her spell!}} {{failcheck=She fails :( }} {{check=@{target|token_name} receives }} {{checkroll= [[ 2d8+{@{casterlevel},10}dh1 ]] heath. }} {{notes=Undead creatures take damage instead of gaining healing. }}"} />
                                </td>
                                <td><button type="roll" name="roll_spellcast21" text="Spell Cast21" title="repeating_spells21_#_spellcast21" value="@{spellmacro21}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname22" title="spellgroupname22" defaultValue="Level 2 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells22">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused22" title="repeating_spells22_#_spellused22" />/<input type="text" style={{width: '25px'}} name="attr_spellprep22" title="repeating_spells22_#_spellprep22" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname22" title="repeating_spells22_#_spellname22" defaultValue="Bear's Endurance" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel22" title="repeating_spells22_#_spelllevel22" defaultValue={2} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro22" title="repeating_spells22_#_spellmacro22 : Edit this field to create the macro run by the roll button" defaultValue={"&{template:DnD35StdRoll} {{spellflag=true}} {{name=@{character_name} }} {{subtags= grants ?{target|@{character_name}} [Bear's Endurance](http://www.dandwiki.com/wiki/SRD:Bear%27s_Endurance )!}} {{School:= Transmutation}} {{Level:= Clr 2, Drd 2, Rgr 2, Sor/Wiz 2}} {{Cmpnts:=V, S, DF}} {{Casting Time:=1 std action}} {{Range:= Touch}} {{Target:= 1 creature touched }} {{Duration:= @{casterlevel2} mins.}} {{Saving Throw:= Will negates(harmless)}} {{Spell Resist.:= Yes}} {{Caster level check: = [[ 1d20+@{casterlevel2}+@{spellpen} ]] vs spell resistance.}} {{compcheck= Conc: [[ {1d20 + [[ @{concentration} ]] }>?{Concentration DC=15+Spell Level or 10+Damage Received|16} ]] }} {{succeedcheck=Success! She casts her spell!}} {{failcheck=She fails :( }} {{check= ?{target|@{character_name}} gains greater vitality and stamina, }} {{checkroll= receiving a +4 enh bonus to Constitution with the usual benefits to hit points(these temp hit points go away when spell ends), fortitude saves, constitution checks, etc. }}"} />
                                </td>
                                <td><button type="roll" name="roll_spellcast22" text="Spell Cast22" title="repeating_spells22_#_spellcast22" value="@{spellmacro22}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <br />
              <input type="checkbox" className="sheet-pc-spells3-show sheet-arrow" title="spells3-show" name="attr_spells3-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>3</span>
              <div className="sheet-pc-spells3">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname31" title="spellgroupname31" defaultValue="Level 3 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells31">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused31" title="repeating_spells31_#_spellused31" />/<input type="text" style={{width: '25px'}} name="attr_spellprep31" title="repeating_spells31_#_spellprep31" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname31" title="repeating_spells31_#_spellname31" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel31" title="repeating_spells31_#_spelllevel31" defaultValue={3} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro31" title="repeating_spells31_#_spellmacro31 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast31" text="Spell Cast31" title="repeating_spells31_#_spellcast31" value="@{spellmacro31}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname32" title="spellgroupname32" defaultValue="Level 3 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells32">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused32" title="repeating_spells32_#_spellused32" />/<input type="text" style={{width: '25px'}} name="attr_spellprep32" title="repeating_spells32_#_spellprep32" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname32" title="repeating_spells32_#_spellname32" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel32" title="repeating_spells32_#_spelllevel32" defaultValue={3} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro32" title="repeating_spells32_#_spellmacro32 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast32" text="Spell Cast32" title="repeating_spells32_#_spellcast32" value="@{spellmacro32}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <br />
              <input type="checkbox" className="sheet-pc-spells4-show sheet-arrow" title="spells4-show" name="attr_spells4-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>4</span>
              <div className="sheet-pc-spells4">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname41" title="spellgroupname41" defaultValue="Level 4 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells41">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused41" title="repeating_spells41_#_spellused41" />/<input type="text" style={{width: '25px'}} name="attr_spellprep41" title="repeating_spells41_#_spellprep41" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname41" title="repeating_spells41_#_spellname41" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel41" title="repeating_spells41_#_spelllevel41" defaultValue={4} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro41" title="repeating_spells41_#_spellmacro41 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast41" text="Spell Cast41" title="repeating_spells41_#_spellcast41" value="@{spellmacro41}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname42" title="spellgroupname42" defaultValue="Level 4 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells42">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused42" title="repeating_spells42_#_spellused42" />/<input type="text" style={{width: '25px'}} name="attr_spellprep42" title="repeating_spells42_#_spellprep42" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname42" title="repeating_spells42_#_spellname42" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel42" title="repeating_spells42_#_spelllevel42" defaultValue={4} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro42" title="repeating_spells42_#_spellmacro42 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast42" text="Spell Cast42" title="repeating_spells42_#_spellcast42" value="@{spellmacro42}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <br />
              <input type="checkbox" className="sheet-pc-spells5-show sheet-arrow" title="spells5-show" name="attr_spells5-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>5</span>
              <div className="sheet-pc-spells5">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname51" title="spellgroupname51" defaultValue="Level 5 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells51">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused51" title="repeating_spells51_#_spellused51" />/<input type="text" style={{width: '25px'}} name="attr_spellprep51" title="repeating_spells51_#_spellprep51" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname51" title="repeating_spells51_#_spellname51" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel51" title="repeating_spells51_#_spelllevel51" defaultValue={5} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro51" title="repeating_spells51_#_spellmacro51 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast51" text="Spell Cast51" title="repeating_spells51_#_spellcast51" value="@{spellmacro51}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname52" title="spellgroupname52" defaultValue="Level 5 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells52">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused52" title="repeating_spells52_#_spellused52" />/<input type="text" style={{width: '25px'}} name="attr_spellprep52" title="repeating_spells52_#_spellprep52" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname52" title="repeating_spells52_#_spellname52" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel52" title="repeating_spells52_#_spelllevel52" defaultValue={5} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro52" title="repeating_spells52_#_spellmacro52 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast52" text="Spell Cast52" title="repeating_spells52_#_spellcast52" value="@{spellmacro52}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <br />
              <input type="checkbox" className="sheet-pc-spells6-show sheet-arrow" title="spells6-show" name="attr_spells6-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>6</span>
              <div className="sheet-pc-spells6">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname61" title="spellgroupname61" defaultValue="Level 6 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells61">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused61" title="repeating_spells61_#_spellused61" />/<input type="text" style={{width: '25px'}} name="attr_spellprep61" title="repeating_spells61_#_spellprep61" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname61" title="repeating_spells61_#_spellname61" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel61" title="repeating_spells61_#_spelllevel61" defaultValue={6} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro61" title="repeating_spells61_#_spellmacro61 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast61" text="Spell Cast61" title="repeating_spells61_#_spellcast61" value="@{spellmacro61}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname62" title="spellgroupname62" defaultValue="Level 6 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells62">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused62" title="repeating_spells62_#_spellused62" />/<input type="text" style={{width: '25px'}} name="attr_spellprep62" title="repeating_spells62_#_spellprep62" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname62" title="repeating_spells62_#_spellname62" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel62" title="repeating_spells62_#_spelllevel62" defaultValue={6} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro62" title="repeating_spells62_#_spellmacro62 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast62" text="Spell Cast62" title="repeating_spells62_#_spellcast62" value="@{spellmacro62}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div><br />
              <input type="checkbox" className="sheet-pc-spells7-show sheet-arrow" title="spells7-show" name="attr_spells7-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>7</span>
              <div className="sheet-pc-spells7">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname71" title="spellgroupname71" defaultValue="Level 7 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells71">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused71" title="repeating_spells71_#_spellused71" />/<input type="text" style={{width: '25px'}} name="attr_spellprep71" title="repeating_spells71_#_spellprep71" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname71" title="repeating_spells71_#_spellname71" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel71" title="repeating_spells71_#_spelllevel71" defaultValue={7} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro71" title="repeating_spells71_#_spellmacro71 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast71" text="Spell Cast71" title="repeating_spells71_#_spellcast71" value="@{spellmacro71}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname72" title="spellgroupname72" defaultValue="Level 7 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells72">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused72" title="repeating_spells72_#_spellused72" />/<input type="text" style={{width: '25px'}} name="attr_spellprep72" title="repeating_spells72_#_spellprep72" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname72" title="repeating_spells72_#_spellname72" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel72" title="repeating_spells72_#_spelllevel72" defaultValue={7} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro72" title="repeating_spells72_#_spellmacro72 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast72" text="Spell Cast72" title="repeating_spells72_#_spellcast72" value="@{spellmacro72}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div><br />
              <input type="checkbox" className="sheet-pc-spells8-show sheet-arrow" title="spells8-show" name="attr_spells8-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>8</span>
              <div className="sheet-pc-spells8">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname81" title="spellgroupname81" defaultValue="Level 8 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells81">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused81" title="repeating_spells81_#_spellused81" />/<input type="text" style={{width: '25px'}} name="attr_spellprep81" title="repeating_spells81_#_spellprep81" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname81" title="repeating_spells81_#_spellname81" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel81" title="repeating_spells81_#_spelllevel81" defaultValue={8} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro81" title="repeating_spells81_#_spellmacro81 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast81" text="Spell Cast81" title="repeating_spells81_#_spellcast81" value="@{spellmacro81}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname82" title="spellgroupname82" defaultValue="Level 8 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells82">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused82" title="repeating_spells82_#_spellused82" />/<input type="text" style={{width: '25px'}} name="attr_spellprep82" title="repeating_spells82_#_spellprep82" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname82" title="repeating_spells82_#_spellname82" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel82" title="repeating_spells82_#_spelllevel82" defaultValue={8} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro82" title="repeating_spells82_#_spellmacro82 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast82" text="Spell Cast82" title="repeating_spells82_#_spellcast82" value="@{spellmacro82}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div><br />
              <input type="checkbox" className="sheet-pc-spells9-show sheet-arrow" title="spells9-show" name="attr_spells9-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>9</span>
              <div className="sheet-pc-spells9">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname91" title="spellgroupname91" defaultValue="Level 9 Divine Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells91">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused91" title="repeating_spells91_#_spellused91" />/<input type="text" style={{width: '25px'}} name="attr_spellprep91" title="repeating_spells91_#_spellprep91" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname91" title="repeating_spells91_#_spellname91" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel91" title="repeating_spells91_#_spelllevel91" defaultValue={9} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro91" title="repeating_spells91_#_spellmacro91 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast91" text="Spell Cast91" title="repeating_spells91_#_spellcast91" value="@{spellmacro91}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname92" title="spellgroupname92" defaultValue="Level 9 Arcane Spells" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells92">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused92" title="repeating_spells92_#_spellused92" />/<input type="text" style={{width: '25px'}} name="attr_spellprep92" title="repeating_spells92_#_spellprep92" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname92" title="repeating_spells92_#_spellname92" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel92" title="repeating_spells92_#_spelllevel92" defaultValue={9} /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro92" title="repeating_spells92_#_spellmacro92 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast92" text="Spell Cast92" title="repeating_spells92_#_spellcast92" value="@{spellmacro92}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div><br />
              <input type="checkbox" className="sheet-pc-spells10-show sheet-arrow" title="spells10-show" name="attr_spells10-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="spell-section">Spell Section</span>10</span>
              <div className="sheet-pc-spells10">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname101" title="spellgroupname101" defaultValue="Spell-like Abilities" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells101">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused101" title="repeating_spells101_#_spellused101" />/<input type="text" style={{width: '25px'}} name="attr_spellprep101" title="repeating_spells101_#_spellprep101" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname101" title="repeating_spells101_#_spellname101" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel101" title="repeating_spells101_#_spelllevel101" defaultValue="*" /></td>
                                <td>
                                  <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro101" title="repeating_spells101_#_spellmacro101 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast101" text="Spell Cast101" title="repeating_spells101_#_spellcast101" value="@{spellmacro101}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                      <td> &nbsp; </td>
                      <td style={{verticalAlign: 'top'}}>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td colSpan={4}><input type="text" style={{width: '395px'}} name="attr_spellgroupname102" title="spellgroupname102" defaultValue="Spell-like Abilities" /></td>
                            </tr>
                          </tbody></table>
                        <table>
                          <tbody><tr className="sheet-table-header">
                              <td style={{width: '55px'}} data-i18n="use-prep">Use/Prep</td>
                              <td style={{width: '120px'}} data-i18n="spell-name"> Spell name </td>
                              <td style={{width: '20px'}} data-i18n="level-a">Lvl</td>
                              <td style={{width: '160px'}} data-i18n="emote-macro">Emote/macro</td>
                            </tr>
                          </tbody></table>
                        <fieldset className="repeating_spells102">
                          <table style={{width: '350px'}} className="sheet-table-row">
                            <tbody><tr>
                                <td><input type="text" style={{width: '25px'}} name="attr_spellused102" title="repeating_spells102_#_spellused102" />/<input type="text" style={{width: '25px'}} name="attr_spellprep102" title="repeating_spells102_#_spellprep102" /></td>
                                <td style={{width: '120px'}}><input type="text" name="attr_spellname102" title="repeating_spells102_#_spellname102" placeholder="Spell Name" /></td>
                                <td style={{width: '20px'}}><input type="text" name="attr_spelllevel102" title="repeating_spells102_#_spelllevel102" defaultValue="*" /></td>
                                <td><textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '150px'}} name="attr_spellmacro102" title="repeating_spells102_#_spellmacro102 : Edit this field to create the macro run by the roll button" placeholder="spell macro goes here" defaultValue={""} />
                                </td>
                                <td><button type="roll" name="roll_spellcast102" text="Spell Cast102" title="repeating_spells102_#_spellcast102" value="@{spellmacro102}" style={{height: '24px', width: '20px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
            </div>
            <br />
          </div>
          <div className="sheet-tab-content sheet-tab7 sheet-tab99">
            <input type="checkbox" className="sheet-pc-notes-show sheet-arrow" title="notes-show" name="attr_notes-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="notes">Notes</span>
            <div className="sheet-pc-notes">
              {/*Notes*/}
              <table style={{width: '100%'}} className="sheet-table-row" cellPadding={0} cellSpacing={0}>
                <tbody><tr>
                    <td colSpan={2} className="sheet-statlabel-big-gray" style={{width: '800px', height: '35px', fontSize: '1.5em'}} data-i18n="notes">Notes</td>
                  </tr>
                </tbody></table>
              <input type="checkbox" className="sheet-pc-notes1-show sheet-arrow" title="notes1-show" name="attr_notes1-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="show?">Show?</span> <input type="text" style={{width: '395px'}} name="attr_notes1groupname" title="notes1groupname" defaultValue="Notes Section Title (change it to what you want)" /></span>
              <div className="sheet-pc-notes1">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <fieldset className="repeating_notes1">
                          <div className="sheet-table-row">
                            <span className="sheet-table-col"><input style={{width: '80px'}} type="text" name="attr_note1date" title="repeating_notes1_x_note1date" placeholder="Date" data-i18n-placeholder="date" /> &nbsp; </span>
                            <span className="sheet-table-col">
                              <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '690px'}} name="attr_note1body" title="repeating_notes1_x_note1body" placeholder="Note etc" data-i18n-placeholder="note-etc" defaultValue={""} />
                            </span>
                          </div><table style={{width: '790px'}} className="sheet-table-row">
                          </table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <hr />
              <input type="checkbox" className="sheet-pc-notes2-show sheet-arrow" title="notes2-show" name="attr_notes2-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="show?">Show?</span> <input type="text" style={{width: '395px'}} name="attr_notes2groupname" title="notes2groupname" defaultValue="Notes Section Title (change it to what you want)" /></span>
              <div className="sheet-pc-notes2">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <fieldset className="repeating_notes2">
                          <div className="sheet-table-row">
                            <span className="sheet-table-col"><input style={{width: '80px'}} type="text" name="attr_note2date" title="repeating_notes2_x_note2date" placeholder="Date" data-i18n-placeholder="date" /> &nbsp; </span>
                            <span className="sheet-table-col">
                              <textarea input className="sheet-inputbox" rows={1} cols={55} style={{height: '20px', width: '690px'}} name="attr_note2body" title="repeating_notes2_x_note2body" placeholder="Note etc" data-i18n-placeholder="note-etc" defaultValue={""} />
                            </span>
                          </div><table style={{width: '790px'}} className="sheet-table-row">
                          </table>
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <hr />
            </div>
          </div>
          <div className="sheet-tab-content sheet-tab8 sheet-tab99">
            {/* Misc Stuff */}
            <input type="hidden" name="attr_sheetversion" title="sheetversion" defaultValue={1.0} />
            <input type="hidden" name="attr_character_sheet" title="character-sheet" defaultValue="D&D3.5" />
            <table>
              <tbody><tr>
                  <td style={{width: '30px'}}><input type="checkbox" name="attr_recalc" title="recalc" defaultValue={1} /> </td>
                  <td style={{textAlign: 'left'}} data-i18n="ability-recalc-info">Ability score recalc. Click this box to force a recalc of the ability scores.</td>
                </tr>
              </tbody></table>
            <hr />
            {/*- Weight unit setup -*/}
            <table>
              <tbody><tr>
                  <td colSpan={4} data-i18n="weight-setup-info1"> Weight unit setup for weight calculations.</td>
                  <td colSpan={2} data-i18n="weight-setup-info2"> Unit should be an abbreviation of 2 or 3 characters.</td>
                </tr>
                <tr>
                  <td data-i18n="scaling-factor"> Scaling factor </td>
                  <td data-i18n="unit"> Unit </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
                <tr>
                  <td><input type="text" name="attr_weightscale" title="weightscale" style={{textAlign: 'right'}} defaultValue={1} /> </td>
                  <td style={{textAlign: 'left'}}><input type="text" name="attr_weightunit" title="weightunit (up to 3 characters long abbr.)" style={{width: '3em'}} defaultValue="lbs" /></td>
                  <td> = 1 </td>
                  <td style={{textAlign: 'left'}} data-i18n="pound"> pound </td>
                  <td> </td>
                  <td> </td>
                </tr>
              </tbody></table>
            <hr />
            <input type="checkbox" className="sheet-pc-pronouns-show sheet-arrow" title="pronouns-show" name="attr_pronouns-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="pronouns">Pronouns</span>
            <div className="sheet-pc-pronouns">
              <span data-i18n="pronoun-setup-info">For use in macros if desired. Enter your preferred pronoun for the following categories.</span>
              <table>
                <tbody><tr>
                    <td><span data-i18n="subjective-pronoun">Subjective</span>:</td>
                    <td>
                      <input type="text" className="sheet-table-data-center" style={{width: '130px'}} name="attr_subjective" title="subjective" placeholder="he/she/it/they/etc" data-i18n-placeholder="he/she/it/they/etc" />
                      {/*select class="sheet-table-data-center-sm" style="height: 24px; width: 70px; font-size: 0.75em;" name="attr_subjective" title="subjective">
								<option type="text" value="@{character_name}" selected>None</option>
								<option type="text" value="he">he</option>
								<option type="text"value="she">she</option>
								<option type="text"value="it">it</option>
								<option type="text"value="they">they</option>
							</select*/}
                    </td>
                    <td> &nbsp; <span data-i18n="objective-pronoun">Objective</span>:</td>
                    <td>
                      <input type="text" className="sheet-table-data-center" style={{width: '130px'}} name="attr_objective" title="objective" placeholder="him/her/it/them/etc" data-i18n-placeholder="him/her/it/them/etc" />
                      {/*select class="sheet-table-data-center-sm" style="height: 24px; width: 70px; font-size: 0.75em;" name="attr_objective" title="objective">
								<option type="text" value="@{character_name}" selected>None</option>
								<option type="text" value="him">him</option>
								<option type="text"value="her">her</option>
								<option type="text"value="it">it</option>
								<option type="text"value="them">them</option>
							</select*/}
                    </td>
                    <td> &nbsp; <span data-i18n="possessive-pronoun">Possessive</span>:</td>
                    <td>
                      <input type="text" className="sheet-table-data-center" style={{width: '130px'}} name="attr_possessive" title="possessive" placeholder="his/hers/its/their/etc" data-i18n-placeholder="his/hers/its/their/etc" />
                      {/*select class="sheet-table-data-center-sm" style="height: 24px; width: 70px; font-size: 0.75em;" name="attr_possessive" title="possessive">
								<option type="text" value="@{character_name}'s" selected>None</option>
								<option type="text" value="his">his</option>
								<option type="text"value="hers">hers</option>
								<option type="text"value="its">its</option>
								<option type="text"value="their">their</option>
							</select*/}
                    </td>
                  </tr>
                </tbody></table>
            </div>
          </div>
          <div className="sheet-tab-content sheet-tab9">
            <input type="checkbox" className="sheet-pc-summons-show sheet-arrow" title="summons-show" name="attr_summons-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}} data-i18n="other">Other</span>
            <div className="sheet-pc-summons">
              {/*Other*/}
              <table style={{width: '100%'}} className="sheet-table-row" cellPadding={0} cellSpacing={0}>
                <tbody><tr>
                    <td colSpan={2} className="sheet-statlabel-big-gray" style={{width: '800px', height: '35px', fontSize: '1.5em'}} data-i18n="other">Other</td>
                  </tr>
                </tbody></table>
              <hr />
              <input type="checkbox" className="sheet-pc-other1-show sheet-arrow" title="other1-show" name="attr_other1-show" defaultValue={1} defaultChecked /><span style={{textAlign: 'left'}}><span data-i18n="show?">Show?</span> <input type="text" style={{width: '25px'}} name="attr_othergroup1used" title="othergroup1used" />/<input type="text" style={{width: '25px'}} name="attr_othergroup1prep" title="othergroup1prep" /> &nbsp; <input type="text" style={{width: '395px'}} name="attr_othergroup1name" title="othergroup1name" placeholder="Wild Shapes or Summons" /></span>
              <div className="sheet-pc-other1">
                <table>
                  <tbody><tr>
                      <td style={{verticalAlign: 'top'}}>
                        <fieldset className="repeating_summons1">
                          <div className="sheet-table-row">
                            <span className="sheet-table-col"><input type="text" style={{width: '360px'}} name="attr_summonname" title="repeating_summons1_#_summonname" placeholder="Name" data-i18n-placeholder="name" /> &nbsp; &nbsp; &nbsp; </span>
                            <span className="sheet-table-col"><input style={{width: '140px'}} type="text" name="attr_summonsize" title="repeating_summons1_#_summonsize" placeholder="Size" /> &nbsp; </span>
                            <span className="sheet-table-col"><input style={{width: '160px'}} type="text" name="attr_summontype" title="repeating_summons1_#_summontype" placeholder="Type" /></span>
                          </div><div className="sheet-table-row">
                            <span className="sheet-table-col">HD:<input style={{width: '50px'}} type="text" name="attr_summonhitdie" title="repeating_summons1_#_summonhitdie" placeholder="HD" />(<input style={{width: '30px'}} type="text" name="attr_summonhitpoints" title="repeating_summons1_#_summonhitpoints" placeholder="Hit Points" />) &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">Init:<input style={{width: '40px'}} type="text" name="attr_summoninitiative" title="repeating_summons1_#_summoninitiative" placeholder="Initiative" /> &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">Spd:<input style={{width: '70px'}} type="text" name="attr_summonspeed" title="repeating_summons1_#_summonspeed" placeholder="Speed" /> &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">AC:<input style={{width: '30px'}} type="text" name="attr_summonarmorclass" title="repeating_summons1_#_summonarmorclass" placeholder="AC" />(<input style={{width: '120px'}} type="text" name="attr_summonarmorclassinfo" title="repeating_summons1_#_summonarmorclassinfo" placeholder="Armor Class Mod Info" />), Touch:<input style={{width: '30px'}} type="text" name="attr_summontoucharmorclass" title="repeating_summons1_#_summontoucharmorclass" placeholder="T AC" />, FF:<input style={{width: '30px'}} type="text" name="attr_summonflatfootarmorclass" title="repeating_summons1_#_summonflatfootarmorclass" placeholder="FF AC" /> &nbsp; &nbsp;</span>
                            <span className="sheet-table-col">BAB:<input style={{width: '50px'}} type="text" name="attr_summonbaseatt" title="repeating_summons1_#_summonbaseatt" placeholder="Base Attack" />/Gr:<input style={{width: '30px'}} type="text" name="attr_summongrapple" title="repeating_summons1_#_summongrapple" placeholder="Grapple" /></span>
                          </div><div className="sheet-table-row">
                            <span className="sheet-table-col">Att<textarea input className="sheet-inputbox" rows={1} cols={55} style={{width: '750px'}} name="attr_summonattack" title="repeating_summons1_#_summonattack" placeholder="Attack" defaultValue={""} />
                              <button type="roll" name="roll_summonattackbutton" title="summonattackbutton" placeholder="@{summonattack}" style={{height: '24px', width: '20px'}} /></span>
                          </div><div className="sheet-table-row">
                            <span className="sheet-table-col">FAtt<textarea input className="sheet-inputbox" rows={1} cols={55} style={{width: '745px'}} name="attr_summonfullattack" title="repeating_summons1_#_summonfullattack" placeholder="Full Attack" defaultValue={""} />
                              <button type="roll" name="roll_summonfullattackbutton" title="summonfullattackbutton" placeholder="@{summonfullattack}" style={{height: '24px', width: '20px'}} /></span>
                          </div><div className="sheet-table-row">
                            <span className="sheet-table-col">Space/Reach:<input style={{width: '40px'}} type="text" name="attr_summonspace" title="repeating_summons1_#_summonspace" placeholder="Space" />/<input style={{width: '40px'}} type="text" name="attr_summonreach" title="repeating_summons1_#_summonreach" placeholder="Reach" /> &nbsp; &nbsp;</span>
                            <span className="sheet-table-col">Sp Att:<input style={{width: '250px'}} type="text" name="attr_summonspecialattacks" title="repeating_summons1_#_summonspecialattacks" placeholder="Special Attacks" /> &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">Sp Qual:<input style={{width: '250px'}} type="text" name="attr_summonspecialqualities" title="repeating_summons1_#_summonspecialqualities" placeholder="Special Qualities" /></span>
                          </div><div className="sheet-table-row">
                            <span className="sheet-table-col">F:<input style={{width: '40px'}} type="text" name="attr_summonfortsave" title="repeating_summons1_#_summonfortsave" placeholder="Fort" />, </span>
                            <span className="sheet-table-col">R:<input style={{width: '40px'}} type="text" name="attr_summonrefsave" title="repeating_summons1_#_summonrefsave" placeholder="Ref" />, </span>
                            <span className="sheet-table-col">W:<input style={{width: '40px'}} type="text" name="attr_summonwillsave" title="repeating_summons1_#_summonwillsave" placeholder="Will" /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">Str:<input style={{width: '40px'}} type="text" name="attr_summonstr" title="repeating_summons1_#_summonstr" placeholder="Str" />, </span>
                            <span className="sheet-table-col">Dex:<input style={{width: '40px'}} type="text" name="attr_summondex" title="repeating_summons1_#_summondex" placeholder="Dex" />, </span>
                            <span className="sheet-table-col">Con:<input style={{width: '40px'}} type="text" name="attr_summoncon" title="repeating_summons1_#_summoncon" placeholder="Con" />, </span>
                            <span className="sheet-table-col">Int:<input style={{width: '40px'}} type="text" name="attr_summonint" title="repeating_summons1_#_summonint" placeholder="Int" />, </span>
                            <span className="sheet-table-col">Wis:<input style={{width: '40px'}} type="text" name="attr_summonwis" title="repeating_summons1_#_summonwis" placeholder="Wis" />, </span>
                            <span className="sheet-table-col">Cha:<input style={{width: '40px'}} type="text" name="attr_summoncha" title="repeating_summons1_#_summoncha" placeholder="Cha" /> </span>
                          </div><div className="sheet-table-row">
                            <span className="sheet-table-col">Skills:<input style={{width: '350px'}} type="text" name="attr_summonskills" title="repeating_summons1_#_summonskills" placeholder="Skills" /> &nbsp; &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">Feats:<input style={{width: '350px'}} type="text" name="attr_summonfeats" title="repeating_summons1_#_summonfeats" placeholder="Feats" /></span>
                          </div><div className="sheet-table-row">
                            <span className="sheet-table-col">Env:<input style={{width: '250px'}} type="text" name="attr_summonenv" title="repeating_summons1_#_summonenv" placeholder="Environment" /> &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">Org:<input style={{width: '250px'}} type="text" name="attr_summonorg" title="repeating_summons1_#_summonorg" placeholder="Organization" /> &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">CR:<input style={{width: '50px'}} type="text" name="attr_summoncr" title="repeating_summons1_#_summoncr" placeholder="CR" /> &nbsp; &nbsp; </span>
                            <span className="sheet-table-col">Adv:<input style={{width: '90px'}} type="text" name="attr_summonadv" title="repeating_summons1_#_summonadv" placeholder="Advancement" /></span>
                          </div><div className="sheet-table-row">
                            <span className="sheet-table-col">
                              <textarea input className="sheet-inputbox" rows={3} cols={55} style={{height: '60px', width: '790px'}} name="attr_summondescr" title="repeating_summons1_#_summondescr" placeholder="Description etc" defaultValue={""} />
                            </span>
                          </div><table style={{width: '790px'}} className="sheet-table-row">
                          </table>
                          <hr />
                        </fieldset>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <hr />
            </div>
          </div>
          <div className="sheet-tab-content sheet-tab10">
            {/* ?? */}
          </div>
          {/* end PC section */}
        </div>
        <div className="sheet-switch-npc">
          {/* NPC's */}
          {/* start NPC section */}
          <br />
          <br />
          <table style={{width: '790px'}}>
            <tbody><tr>
                <td className="sheet-table-header-right"><span data-i18n="name">Name</span>:</td>
                <td className="sheet-table-left"><input type="text" style={{width: '650px'}} name="attr_npcname" title="npcname" placeholder="Name" data-i18n-placeholder="name" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="size">Size</span>/<span data-i18n="type">Type</span>:</td>
                <td className="sheet-table-left"><input style={{width: '140px'}} type="text" name="attr_npcsize" title="npcsize" placeholder="Size" data-i18n-placeholder="size" />/<input style={{width: '180px'}} type="text" name="attr_npctype" title="npctype" placeholder="Type" data-i18n-placeholder="type" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="hit-dice">Hit Dice</span>:</td>
                <td className="sheet-table-left"><input style={{width: '100px'}} type="text" name="attr_npchitdie" title="npchitdie" placeholder="HD" />(<input style={{width: '50px'}} type="text" name="attr_npchitpoints" title="npchitpoints" placeholder="Hit Points" />/<input style={{width: '50px'}} type="text" name="attr_npchitpoints_max" title="npchitpoints|max" placeholder="Max HP" data-i18n-placeholder="max-hit-points-a" />)</td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="initiative">Initiative</span>:</td>
                <td className="sheet-table-left"><input style={{width: '40px'}} type="text" name="attr_npcinit" title="npcinit" defaultValue={0} /> <textarea rows={1} cols={40} style={{width: '565px', height: '20px'}} title="npcinitmacro (modify to modify npc's initiative roll macro)" name="attr_npcinitmacro" defaultValue={"/w gm &{template:DnD35Initiative} {{name=@{selected|token_name} }} {{check=Initiative:}} {{checkroll= [[ 1d20 + [[ @{selected|npcinit} ]] + ( [[ (@{selected|npcinit}) ]] /100) &{tracker} ]] }}"} /><button type="roll" name="roll_npcinitiative" title="npcinitiative" value="@{npcinitmacro}" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="speed">Speed</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcspeed" title="npcspeed" placeholder="Speed" data-i18n-placeholder="speed" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="armor-class">Armor Class</span>:</td>
                <td className="sheet-table-left"><input style={{width: '40px'}} type="text" name="attr_npcarmorclass" title="npcarmorclass" placeholder="AC" data-i18n-placeholder="armor-class-i" />(<input style={{width: '290px'}} type="text" name="attr_npcarmorclassinfo" title="npcarmorclassinfo" placeholder="Armor Class Mod Info" data-i18n-placeholder="armor-class-modification-info-a" />), <span data-i18n="touch">Touch</span>:<input style={{width: '40px'}} type="text" name="attr_npctoucharmorclass" title="npctoucharmorclass" placeholder="T AC" data-i18n-placeholder="touch-armor-class-i" />, <span data-i18n="flat-footed-i">FF</span>:<input style={{width: '40px'}} type="text" name="attr_npcflatfootarmorclass" title="npcflatfootarmorclass" placeholder="FF AC" data-i18n-placeholder="flat-footed-armor-class-i" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="base-attack">Base Attack</span>/<span data-i18n="grapple">Grapple</span>:</td>
                <td className="sheet-table-left"><input style={{width: '50px'}} type="text" name="attr_npcbaseatt" title="npcbaseatt" placeholder="Base Attack" data-i18n-placeholder="base-attack" />/<input style={{width: '50px'}} type="text" name="attr_npcgrapple" title="npcgrapple" placeholder="Grapple" data-i18n-placeholder="grapple" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="attack">Attack</span>:</td>
                <td className="sheet-table-left"><input type="text" style={{width: '650px'}} name="attr_npcattack" title="npcattack" placeholder="Attack" data-i18n-placeholder="attack" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"> &nbsp; </td>
                <td className="sheet-table-left"><textarea input className="sheet-inputbox" rows={1} cols={55} style={{width: '615px'}} name="attr_npcattackmacro" title="npcattackmacro" placeholder="Attack Macro" data-i18n-placeholder="attack-macro" defaultValue={""} /><button type="roll" name="roll_npcattackbutton" title="npcattackbutton" value="@{npcattackmacro}" style={{height: '24px', width: '20px'}} /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="full-attack">Full Attack</span>:</td>
                <td className="sheet-table-left"><input type="text" style={{width: '650px'}} name="attr_npcfullattack" title="npcfullattack" placeholder="Full Attack" data-i18n-placeholder="full-attack" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"> &nbsp; </td>
                <td className="sheet-table-left"><textarea input className="sheet-inputbox" rows={1} cols={55} style={{width: '615px'}} name="attr_npcfullattackmacro" title="npcfullattackmacro" placeholder="Full Attack Macro" data-i18n-placeholder="full-attack-macro" defaultValue={""} /><button type="roll" name="roll_npcfullattackbutton" title="npcfullattackbutton" value="@{npcfullattackmacro}" style={{height: '24px', width: '20px'}} /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="space">Space</span>/<span data-i18n="reach">Reach</span>:</td>
                <td className="sheet-table-left"><input style={{width: '140px'}} type="text" name="attr_npcspace" title="npcspace" placeholder="Space" data-i18n-placeholder="space" />/<input style={{width: '140px'}} type="text" name="attr_npcreach" title="npcreach" placeholder="Reach" data-i18n-placeholder="reach" /> &nbsp; &nbsp;</td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="special-attacks">Special Attacks</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcspecialattacks" title="npcspecialattacks" placeholder="Special Attacks" data-i18n-placeholder="special-attacks" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="special-qualities">Special Qualities</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcspecialqualities" title="npcspecialqualities" placeholder="Special Qualities" data-i18n-placeholder="special-qualities" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="saves">Saves</span>:</td>
                <td className="sheet-table-left"> <span data-i18n="fortitude-a">Fort</span>:<input style={{width: '40px'}} type="text" name="attr_npcfortsave" title="npcfortsave" placeholder="Fort" data-i18n-placeholder="fortitude-a" />, &nbsp; &nbsp; <span data-i18n="reflex-a">Ref</span>:<input style={{width: '40px'}} type="text" name="attr_npcrefsave" title="npcrefsave" placeholder="Ref" data-i18n-placeholder="reflex-a" />, &nbsp; &nbsp; <span data-i18n="will">Will</span>:<input style={{width: '40px'}} type="text" name="attr_npcwillsave" title="npcwillsave" placeholder="Will" data-i18n-placeholder="will" /> </td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="abilities">Abilities</span>:</td>
                <td className="sheet-table-left"> <span data-i18n="strength-a">Str</span>:<input style={{width: '3em'}} type="text" name="attr_npcstr" title="npcstr" placeholder="Str" data-i18n-placeholder="strength-a" />(+<input style={{width: '2em'}} type="text" name="attr_npcstr-mod" title="npcstr-mod" defaultValue={0} />), &nbsp; &nbsp; <span data-i18n="dexterity-a">Dex</span>:<input style={{width: '3em'}} type="text" name="attr_npcdex" title="npcdex" placeholder="Dex" data-i18n-placeholder="dexterity-a" />(+<input style={{width: '2em'}} type="text" name="attr_npcdex-mod" title="npcdex-mod" defaultValue={0} />), &nbsp; &nbsp; <span data-i18n="constitution-a">Con</span>:<input style={{width: '3em'}} type="text" name="attr_npccon" title="npccon" placeholder="Con" data-i18n-placeholder="constitution-a" />(+<input style={{width: '2em'}} type="text" name="attr_npccon-mod" title="npccon-mod" defaultValue={0} />), &nbsp; &nbsp; <span data-i18n="intelligence-a">Int</span>:<input style={{width: '3em'}} type="text" name="attr_npcint" title="npcint" placeholder="Int" data-i18n-placeholder="intelligence-a" />(+<input style={{width: '2em'}} type="text" name="attr_npcint-mod" title="npcint-mod" defaultValue={0} />), &nbsp; &nbsp; <span data-i18n="wisdom-a">Wis</span>:<input style={{width: '3em'}} type="text" name="attr_npcwis" title="npcwis" placeholder="Wis" data-i18n-placeholder="wisdom-a" />(+<input style={{width: '2em'}} type="text" name="attr_npcwis-mod" title="npcwis-mod" defaultValue={0} />), &nbsp; &nbsp; <span data-i18n="charisma-a">Cha</span>:<input style={{width: '3em'}} type="text" name="attr_npccha" title="npccha" placeholder="Cha" data-i18n-placeholder="charisma-a" />(+<input style={{width: '2em'}} type="text" name="attr_npccha-mod" title="npccha-mod" defaultValue={0} />) </td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="skills">Skills</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcskills" title="npcskills" placeholder="Skills" data-i18n-placeholder="skills" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="feats">Feats</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcfeats" title="npcfeats" placeholder="Feats" data-i18n-placeholder="feats" /></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <hr />
                </td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="environment">Environment</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcenv" title="npcenv" placeholder="Environment" data-i18n-placeholder="environment" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="organization">Organization</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcorg" title="npcorg" placeholder="Organization" data-i18n-placeholder="organization" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="challenge-rating">Challenge Rating</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npccr" title="npccr" placeholder="CR" data-i18n-placeholder="challenge-rating-i" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="treasure">Treasure</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npctreasure" title="npctreasure" placeholder="Treasure" data-i18n-placeholder="treasure" /> &nbsp; &nbsp; </td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="alignment">Alignment</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcalignment" title="npcalignment" placeholder="Alignment" data-i18n-placeholder="alignment" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="advancement">Advancement</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npcadv" title="npcadv" placeholder="Advancement" data-i18n-placeholder="advancement" /></td>
              </tr>
              <tr>
                <td className="sheet-table-header-right"><span data-i18n="level-adjustment">Level Adjustment</span>:</td>
                <td className="sheet-table-left"><input style={{width: '650px'}} type="text" name="attr_npclvladj" title="npclvladj" placeholder="-" /></td>
              </tr>
              <tr>
                <td> </td>
              </tr>
              <tr>
                <td className="sheet-table-left" colSpan={2}><textarea input className="sheet-inputbox" rows={4} cols={55} style={{height: '60px', width: '790px'}} name="attr_npcdescr" title="npcdescr" placeholder="Description etc" data-i18n-placeholder="description-etc" defaultValue={""} /></td>
              </tr>
              <tr>
                <td> </td>
              </tr>
              <tr>
                <td className="sheet-table-header-left" colSpan={2}><span data-i18n="combat-u">COMBAT</span></td>
              </tr>
              <tr>
                <td className="sheet-table-left" colSpan={2}><textarea input className="sheet-inputbox" rows={8} cols={55} style={{height: '60px', width: '790px'}} name="attr_npccombatdescr" title="npccombatdescr" placeholder="Combat information" data-i18n-placeholder="combat-information" defaultValue={""} /></td>
              </tr>
            </tbody></table>
          {/* end NPC section*/}
        </div>       
      </div>
		);
	}
}
