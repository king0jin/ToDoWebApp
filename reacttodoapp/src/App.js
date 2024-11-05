import React from "react";
import ToDo from "./ToDo";
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    // 데이터 생성
    this.state = {item: [{ id: 0, title: "황치즈쿠키먹기", done: false},
                         { id: 1, title: "그릭요거트만들기", done: true}]};
  }
  
  render() {
    //컴포넌트 만들기
    let todoItems = this.state.item.map((item, idx) => (<ToDo item={item} key={item.id}/>));

    return (
      <div className="App">
        {todoItems}
      </div>
    );
  }
}

export default App;
