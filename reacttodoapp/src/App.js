import React from "react";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";

import './App.css';
import {Paper, List, Container} from "@material-ui/core"


class App extends React.Component{
  constructor(props) {
    super(props);
    // 데이터 생성
    this.state = {item: [{ id: 0, title: "황치즈쿠키먹기", done: false},
                         { id: 1, title: "그릭요거트만들기", done: true}]};
  }
  
  //데이터 추가 함수
  add = (item) => {
    //리액트의 state와 props는 불변의 객체
    //기존의 state에 있는 데이터들을 thisItems에 복사
    const thisItems = this.state.item;
    //새로운 데이터를 추가하기위한 초기상태 설정
    item.id = "ID-" + thisItems.length;
    //done 초기화
    item.done = false;
    //thisItems에 새로운 데이터 추가
    thisItems.push(item); 
    this.setState({ item: thisItems }); // 업데이트는 반드시 this.setState로 해야됨.
    console.log("items : ", this.state.item);
  };

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
        <Container maxWidth="md">
          <AddToDo add={this.add}/>
          <div>{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;
