import React from "react";
import ToDo from "./ToDo";
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {item: { id: 0, title: "Hello React", done: true}};
  }
  
  render() {
    return (
      <div className="App">
        <ToDo item={this.state.item} />
      </div>
    );
  }
}

export default App;
