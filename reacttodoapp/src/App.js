import React from "react";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";

import './App.css';
import {Paper, List, Container} from "@material-ui/core"


class App extends React.Component{
  constructor(props) {
    super(props);
    // 데이터 삽입용 배열
    this.state = {items: []};
  }
  
  //컴포넌트가 메모리에 로드
  componentDidMount(){
    const requestoptions = {
      method:"GET",
      heraders:{"Content-Type":"application/json"}
    };

    fetch("http://localhost/todo", requestoptions)
      .then((Response) => Response.json())
      .then((respons) => {
          this.setState({items:respons.list})
        },
        //예외처리
        (error) => {
          console.log(error)
        }
      )
  }


  //데이터 추가 함수
  add = (item) => {
    //리액트의 state와 props는 불변의 객체
    //기존의 state에 있는 데이터들을 thisItems에 복사
    const thisItems = this.state.items;
    //새로운 데이터를 추가하기위한 초기상태 설정
    item.id = "ID-" + thisItems.length;
    //done 초기화
    item.done = false;
    //thisItems에 새로운 데이터 추가
    thisItems.push(item); 
    this.setState({ items: thisItems }); // 업데이트는 반드시 this.setState로 해야됨.
    console.log("items : ", this.state.items);
  };

  render() {
    //데이터가 있을 때 수행한다
    var todoItems = this.state.item.length > 0 && (
      //리스트를 여러개 담을 때 Paper안에 넣는다.
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
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
