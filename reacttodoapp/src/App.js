import React from "react";
import ToDo from "./ToDo";
import './App.css';
import {Paper, List} from "@material-ui/core"


class App extends React.Component{
  constructor(props) {
    super(props);
    // 데이터 생성
    this.state = {item: [{ id: 0, title: "황치즈쿠키먹기", done: false},
                         { id: 1, title: "그릭요거트만들기", done: true}]};
  }
  
  render() {
    //데이터가 있을 때 수행한다
    var todoItems = this.state.item.length > 0 && (
      //리스트를 여러개 담을 때 Paper안에 넣는다.
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.item.map((item, idx) => (
            <ToDo item={item} />
          ))}
        </List>
      </Paper>
    );

    return (
      <div className="App">
        {todoItems}
      </div>
    );
  }
}

export default App;
