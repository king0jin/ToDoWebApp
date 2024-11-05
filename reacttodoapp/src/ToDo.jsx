import React from "react";

class ToDo extends React.Component {
    constructor(props) {
      super(props);
      this.state = { item: props.item };
    }
  
    render() {
      return (
        <div className="ToDo">
          <input 
            type="checkbox" 
            id={this.state.item.id} 
            name={this.state.item.id} 
            checked={this.state.item.done} 
          />
          <label htmlFor={this.state.item.id}>{this.state.item.title}</label>
        </div>
      );
    }
}
export default ToDo;