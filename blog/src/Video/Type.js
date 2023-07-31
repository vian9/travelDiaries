import './type.css'
import React from 'react';


export default class Type extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     suggestions: [],
     text:''
   }
 }
 onSet=(city)=>{
  this.props.parentCallback(city);
 }
 onTextChange = (e) => {
   const {iteams} = this.props;
   let suggestions = [];
   const value = e.target.value;
   if (value.length > 0) {
     const regex = new RegExp(`^${value}`, `i`);
     suggestions = iteams.sort().filter(v => regex.test(v));
   }


   this.setState(() => ({
     suggestions,
     text:value
   }));
 }
 
 
 suggestionSelected=(value)=>{
   this.setState(()=>({
     text:value,
     suggestions:[]
   }))
   this.onSet(value);
 }
 
 renderSuggestions = () => {
   const { suggestions } = this.state;
   console.log("suggestions :",suggestions);
   if (suggestions.length === 0) {
     return null;
   }
   return (
     <>
       
     <ul>
       {suggestions.map(city => <li key={city} onClick={(e)=>{this.suggestionSelected(city)
      
       }}>{city}</li>)}
     </ul>
  
     </>
   )
 }
 
 
 render() {
   const {text}=this.state
   return (
   <div className="TypeAheadDropDown">
     <input onChange={this.onTextChange} placeholder="Search city name" value={text} type="text" />
     {this.renderSuggestions()}
   </div>
   );
 }
 
}